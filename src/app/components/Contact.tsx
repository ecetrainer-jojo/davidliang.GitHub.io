import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useInView } from './useInView';
import { contactItems } from '../../data/contact';
import { SectionHeader } from './SectionHeader';
import { EASE_OUT_EXPO } from '../../lib/animation';

export function Contact() {
  const [ref, isInView] = useInView({ threshold: 0.2 });

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32 bg-white">
      <div className="max-w-4xl w-full">
        <div className="mb-24">
          <SectionHeader title="Get in Touch" />
        </div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 mb-20">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8, ease: EASE_OUT_EXPO }}
            >
              <div className="text-sm text-gray-500 mb-2 tracking-wide">{item.label}</div>
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 transition-colors"
                >
                  <span>{item.value}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              ) : (
                <div className="text-gray-900">{item.value}</div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.8, ease: EASE_OUT_EXPO }}
          className="pt-20 border-t border-gray-200"
        >
          <p className="text-sm text-gray-500">
            © 2026 David Liang
          </p>
        </motion.div>
      </div>
    </section>
  );
}
