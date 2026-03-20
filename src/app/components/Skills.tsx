import { motion } from 'motion/react';
import { useInView } from './useInView';
import { skillCategories } from '../../data/skills';
import { SectionHeader } from './SectionHeader';
import { EASE_OUT_EXPO } from '../../lib/animation';

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.15 });

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center justify-center px-6 py-32 bg-gray-50">
      <div className="max-w-5xl w-full">
        <div className="mb-24">
          <SectionHeader title="Expertise" />
        </div>

        <div className="grid md:grid-cols-3 gap-16">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8, ease: EASE_OUT_EXPO }}
            >
              <h3 className="text-lg font-medium text-gray-900 mb-6 tracking-wide">{category.category}</h3>
              <div className="space-y-2">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1 + i * 0.03, duration: 0.5, ease: EASE_OUT_EXPO }}
                    className="text-gray-600 font-light"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
