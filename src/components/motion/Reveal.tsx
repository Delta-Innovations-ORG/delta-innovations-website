import React from 'react';
import { motion, type MotionProps } from 'framer-motion';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
} & Pick<MotionProps, 'whileInView' | 'viewport'>;

const offsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

export function Reveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  viewport = { once: true, margin: '-40px' },
}: RevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
