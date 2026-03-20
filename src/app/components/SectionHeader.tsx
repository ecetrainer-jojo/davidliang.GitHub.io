import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../../lib/animation';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = false }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
      viewport={{ once: true }}
      className={centered ? 'text-center max-w-4xl mx-auto' : ''}
    >
      <h2
        className={`font-light tracking-tight text-gray-900 mb-4 ${
          centered
            ? 'text-6xl md:text-8xl mb-6'
            : 'text-5xl md:text-6xl'
        }`}
      >
        {title}
      </h2>
      <div
        className={`h-[1px] bg-gray-900 ${
          centered ? 'w-16 mx-auto mb-6' : 'w-12'
        }`}
      />
      {subtitle && (
        <p className="text-xl md:text-2xl text-gray-600 font-light mt-4">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
