import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useDeltaCursorController } from '../../hooks/useDeltaCursor';
import { DeltaCursorShape, NexusDeltaTrailShape } from './DeltaCursorShapes';

export function DeltaCursor() {
  const { enabled, mode, mainElRef, trailElRef } = useDeltaCursorController();

  if (!enabled) return null;

  const layer = (
    <div className="delta-cursor-layer" aria-hidden>
      <div ref={trailElRef} className="delta-cursor-trail" style={{ opacity: 0 }}>
        <NexusDeltaTrailShape className="delta-cursor-trail-svg" />
      </div>

      <div
        ref={mainElRef}
        className="delta-cursor-main"
        data-cursor-mode={mode}
        style={{ opacity: 0 }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <DeltaCursorShape key={mode} mode={mode} />
        </AnimatePresence>
      </div>
    </div>
  );

  return createPortal(layer, document.body);
}
