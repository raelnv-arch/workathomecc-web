'use client';
import { motion, useReducedMotion } from 'framer-motion';

/* Soft fade on route entry (Home <-> Careers). Opacity-only on purpose:
   a transform here would create a containing block and break the fixed nav. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
