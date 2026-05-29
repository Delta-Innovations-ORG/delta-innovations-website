import { useCallback, useEffect, useRef, useState } from 'react';

export type CursorMode = 'default' | 'interactive' | 'text';

const LERP_MAIN = 0.18;
const LERP_TRAIL = 0.08;
const LERP_MAIN_REDUCED = 0.45;

function lerp(current: number, target: number, factor: number) {
  return current + (target - current) * factor;
}

export function resolveCursorMode(el: Element | null): CursorMode {
  if (!el) return 'default';
  if (el.closest('[data-cursor="none"]')) return 'default';

  if (
    el.closest(
      'a, button, [role="button"], summary, input[type="submit"], input[type="button"], [data-cursor="interactive"]'
    )
  ) {
    return 'interactive';
  }

  if (
    el.closest(
      'p, h1, h2, h3, h4, h5, h6, span, li, label, input, textarea, [data-cursor="text"]'
    )
  ) {
    return 'text';
  }

  return 'default';
}

function readCursorEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wideEnough = window.matchMedia('(min-width: 768px)').matches;
  return finePointer && wideEnough;
}

function applyCursorTransform(el: HTMLElement | null, x: number, y: number, opacity: number) {
  if (!el) return;
  el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  el.style.opacity = String(opacity);
}

export function useDeltaCursorController() {
  const [enabled, setEnabled] = useState(readCursorEnabled);
  const [mode, setMode] = useState<CursorMode>('default');
  const [visible, setVisible] = useState(false);

  const mainElRef = useRef<HTMLDivElement | null>(null);
  const trailElRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const mainRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef({ x: 0, y: 0 });
  const visibleRef = useRef(false);
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const pendingHitTestRef = useRef(false);
  const modeRef = useRef<CursorMode>('default');

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const wideScreen = window.matchMedia('(min-width: 768px)');

    const update = () => setEnabled(finePointer.matches && wideScreen.matches);

    update();
    finePointer.addEventListener('change', update);
    wideScreen.addEventListener('change', update);

    return () => {
      finePointer.removeEventListener('change', update);
      wideScreen.removeEventListener('change', update);
    };
  }, []);

  const tick = useCallback(() => {
    const factor = reducedMotionRef.current ? LERP_MAIN_REDUCED : LERP_MAIN;
    const trailFactor = reducedMotionRef.current ? LERP_MAIN_REDUCED : LERP_TRAIL;

    if (pendingHitTestRef.current) {
      pendingHitTestRef.current = false;
      const hit = document.elementFromPoint(pointerRef.current.x, pointerRef.current.y);
      const nextMode = resolveCursorMode(hit);
      if (nextMode !== modeRef.current) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
    }

    mainRef.current.x = lerp(mainRef.current.x, targetRef.current.x, factor);
    mainRef.current.y = lerp(mainRef.current.y, targetRef.current.y, factor);
    trailRef.current.x = lerp(trailRef.current.x, targetRef.current.x, trailFactor);
    trailRef.current.y = lerp(trailRef.current.y, targetRef.current.y, trailFactor);

    const opacity = visibleRef.current ? 1 : 0;
    applyCursorTransform(mainElRef.current, mainRef.current.x, mainRef.current.y, opacity);
    applyCursorTransform(trailElRef.current, trailRef.current.x, trailRef.current.y, opacity);

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!enabled) {
      initializedRef.current = false;
      visibleRef.current = false;
      setVisible(false);
      return;
    }

    reducedMotionRef.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      targetRef.current = { x, y };
      pointerRef.current = { x, y };
      pendingHitTestRef.current = true;

      if (!initializedRef.current) {
        mainRef.current = { x, y };
        trailRef.current = { x, y };
        initializedRef.current = true;
      }

      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onDocumentLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', onDocumentLeave);

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onDocumentLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, tick]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('delta-cursor-on');
      return;
    }
    document.body.classList.add('delta-cursor-on');
    return () => document.body.classList.remove('delta-cursor-on');
  }, [enabled]);

  return { enabled, mode, visible, mainElRef, trailElRef };
}
