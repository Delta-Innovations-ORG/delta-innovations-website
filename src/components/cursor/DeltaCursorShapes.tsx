import type { CursorMode } from '../../hooks/useDeltaCursor';
import { cursorColors } from './cursorColors';

type ShapeProps = {
  className?: string;
};

export function NexusDeltaShape({ className = '' }: ShapeProps) {
  const c = cursorColors.default;
  return (
    <svg
      viewBox="0 0 32 32"
      className={`delta-cursor-svg ${className}`}
      aria-hidden
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke={c.ring}
        strokeOpacity={c.ringOpacity}
        strokeWidth="2"
        strokeDasharray="4 6"
        className="delta-cursor-ring"
      />
      <path
        d="M16 6 L26 24 L6 24 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="17" r="2.5" fill={c.dot} />
    </svg>
  );
}

export function ImpulseDeltaShape({ className = '' }: ShapeProps) {
  const c = cursorColors.interactive;
  return (
    <svg
      viewBox="0 0 32 32"
      className={`delta-cursor-svg ${className}`}
      aria-hidden
    >
      <path
        d="M16 5 L27 25 L5 25 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="18" r="3" fill={c.dot} />
    </svg>
  );
}

export function GlyphDeltaShape({ className = '' }: ShapeProps) {
  const c = cursorColors.text;
  return (
    <svg
      viewBox="0 0 32 32"
      className={`delta-cursor-svg ${className}`}
      aria-hidden
    >
      <path
        d="M6 14 L16 10 L26 14 L22 22 L10 22 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <line
        x1="10"
        y1="22"
        x2="22"
        y2="22"
        stroke={c.beam}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="16" cy="16" r="2" fill={c.dot} />
    </svg>
  );
}

export function NexusDeltaTrailShape({ className = '' }: ShapeProps) {
  const c = cursorColors.trail;
  return (
    <svg
      viewBox="0 0 32 32"
      className={`delta-cursor-svg ${className}`}
      aria-hidden
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        fill="none"
        stroke={c.ring}
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <path
        d="M16 6 L26 24 L6 24 Z"
        fill={c.fill}
        stroke={c.stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="17" r="2" fill={c.dot} />
    </svg>
  );
}

const shapeMap = {
  default: NexusDeltaShape,
  interactive: ImpulseDeltaShape,
  text: GlyphDeltaShape,
} as const;

type DeltaCursorShapeProps = {
  mode: CursorMode;
};

export function DeltaCursorShape({ mode }: DeltaCursorShapeProps) {
  const Shape = shapeMap[mode];

  return (
    <div className="delta-cursor-shape-wrap" data-cursor-shape={mode}>
      <Shape />
    </div>
  );
}
