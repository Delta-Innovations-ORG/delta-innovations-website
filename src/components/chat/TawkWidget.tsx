import { useEffect, useRef } from 'react';
import { useUser } from '@clerk/react';

type TawkWidgetProps = {
  enabled: boolean;
};

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      setAttributes?: (
        attributes: Record<string, string>,
        callback?: (error?: Error) => void,
      ) => void;
      showWidget?: () => void;
      hideWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
    __tawkLoaded?: boolean;
    __tawkScriptAdded?: boolean;
  }
}

function getTawkIds() {
  const propertyId =
    import.meta.env.VITE_TAWK_PROPERTY_ID?.trim() || '6a19f7b6bfd8e61c339dc6b9';
  const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID?.trim() || '1jpqmv8b7';
  return { propertyId, widgetId };
}

function markTawkNoCursor() {
  document
    .querySelectorAll('#tawk-bubble-container, .tawk-min-container, iframe[title*="chat"]')
    .forEach((el) => {
      el.setAttribute('data-cursor', 'none');
    });
}

function applyTawkUserAttributes(
  isSignedIn: boolean,
  user: ReturnType<typeof useUser>['user'],
) {
  if (!isSignedIn || !user || !window.Tawk_API?.setAttributes) return;
  try {
    window.Tawk_API.setAttributes({
      name: user.fullName || user.username || 'User',
      email: user.primaryEmailAddress?.emailAddress ?? '',
      userId: user.id,
    });
  } catch {
    // Tawk layout race — safe to ignore
  }
}

export function TawkWidget({ enabled }: TawkWidgetProps) {
  const { isSignedIn, user } = useUser();
  const userRef = useRef(user);
  const signedInRef = useRef(isSignedIn);

  userRef.current = user;
  signedInRef.current = isSignedIn;

  useEffect(() => {
    if (!enabled || window.__tawkScriptAdded) return;

    let cancelled = false;

    const injectTawk = () => {
      if (cancelled || window.__tawkScriptAdded) return;
      window.__tawkScriptAdded = true;

      const { propertyId, widgetId } = getTawkIds();
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_LoadStart = new Date();

      window.Tawk_API.onLoad = () => {
        window.__tawkLoaded = true;
        markTawkNoCursor();
        applyTawkUserAttributes(signedInRef.current, userRef.current);
      };

      const script = document.createElement('script');
      script.async = true;
      script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    };

    const scheduleId =
      typeof requestIdleCallback !== 'undefined'
        ? requestIdleCallback(injectTawk, { timeout: 1200 })
        : window.setTimeout(injectTawk, 800);

    return () => {
      cancelled = true;
      if (typeof requestIdleCallback !== 'undefined' && typeof scheduleId === 'number') {
        cancelIdleCallback(scheduleId);
      } else {
        window.clearTimeout(scheduleId);
      }
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !window.__tawkLoaded) return;
    applyTawkUserAttributes(isSignedIn, user);
  }, [enabled, isSignedIn, user]);

  return null;
}
