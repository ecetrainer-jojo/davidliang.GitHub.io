import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { heroContent } from '../../data/hero';
import { EASE_OUT_EXPO } from '../../lib/animation';

export function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, 100]);

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Subtle gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      <motion.div
        style={{ opacity, y }}
        className="text-center max-w-5xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          className="mb-6"
        >
          <span className="text-sm tracking-[0.2em] text-gray-500 uppercase">{heroContent.title}</span>
        </motion.div>
        
        <motion.h1
          className="text-7xl md:text-9xl font-light tracking-tight mb-8 text-gray-900"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          {heroContent.name}
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12 font-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          {heroContent.tagline}
          <br />
          {heroContent.subTagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="flex gap-4 justify-center items-center"
        >
          <motion.a
            href={heroContent.ctaHref}
            whileHover={{ x: 2 }}
            className="group inline-flex items-center gap-2 text-gray-900 font-medium"
          >
            {heroContent.ctaLabel}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Minimalist scroll indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-12"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-16 bg-gradient-to-b from-transparent via-gray-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
