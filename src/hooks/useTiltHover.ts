import { useCallback, useRef, useState } from 'react';

export function useTiltHover(intensity = 10) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTransform(
        `perspective(800px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) scale(1.02)`
      );
    },
    [intensity]
  );

  const onMouseLeave = useCallback(() => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)');
  }, []);

  return { ref, transform, onMouseMove, onMouseLeave };
}
