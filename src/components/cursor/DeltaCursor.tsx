import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useDeltaCursorController } from '../../hooks/useDeltaCursor';
import { DeltaCursorShape, NexusDeltaTrailShape } from './DeltaCursorShapes';

export function DeltaCursor() {
  const { enabled, mode, visible, mainPos, trailPos } = useDeltaCursorController();

  if (!enabled) return null;

  const layer = (
    <div className="delta-cursor-layer" aria-hidden>
      <div
        className="delta-cursor-trail"
        style={{
          transform: `translate3d(${trailPos.x}px, ${trailPos.y}px, 0) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
      >
        <NexusDeltaTrailShape className="delta-cursor-trail-svg" />
      </div>

      <div
        className="delta-cursor-main"
        data-cursor-mode={mode}
        style={{
          transform: `translate3d(${mainPos.x}px, ${mainPos.y}px, 0) translate(-50%, -50%)`,
          opacity: visible ? 1 : 0,
        }}
      >
        <AnimatePresence mode="sync" initial={false}>
          <DeltaCursorShape key={mode} mode={mode} />
        </AnimatePresence>
      </div>
    </div>
  );

  return createPortal(layer, document.body);
}
