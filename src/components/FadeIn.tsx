import { motion } from 'framer-motion';
import { useMemo, type ElementType, type ReactNode, type CSSProperties } from 'react';

type Props = {
  children?: ReactNode;
  as?: ElementType;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  [key: string]: unknown;
};

export default function FadeIn({ children, as = 'div', delay = 0, duration = 0.7, x = 0, y = 30, className, style, ...rest }: Props) {
  const Comp = useMemo(() => motion.create(as), [as]);
  return (
    <Comp
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
