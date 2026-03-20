import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { useInView } from './useInView';
import { useRef } from 'react';
import { CoinbaseAnimation } from './CoinbaseAnimation';
import { DoorDashAnimation } from './DoorDashAnimation';

const experiences = [
  {
    company: 'Coinbase',
    role: 'Software Development Engineer II',
    period: 'April 2025 — Present',
    description: 'Led backend development for new payment experiences',
    highlights: [
      '15× increase in off-chain payment volume through simplified UX',
      '20K+ new accounts onboarded via phone number payments',
      'Built PayLink lifecycle management system in DynamoDB',
    ],
    animation: 'coinbase',
  },
  {
    company: 'DoorDash',
    role: 'Software Development Engineer',
    period: 'January 2022 — April 2025',
    description: 'Scaled platforms across multiple teams and markets',
    highlights: [
      '$128M annual GMV from route-based delivery coverage system',
      '95K MAU growth via AI-powered store recommendations',
      'Launched internationalization across 4 countries',
    ],
    animation: 'doordash',
  },
];

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [inViewRef, isInView] = useInView({ threshold: 0.2 });
  
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Fade in/out for background
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  
  // Parallax for text
  const textY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const setRefs = (node: HTMLDivElement) => {
    cardRef.current = node;
    inViewRef.current = node;
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={setRefs}
      className="relative py-8 md:py-12"
    >
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="relative px-6 py-16 md:p-20">
          
          {/* Background Animation - appears on scroll */}
          <motion.div
            style={{ 
              opacity: backgroundOpacity,
              scale: backgroundScale,
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden bg-gray-50/30 ring-1 ring-gray-900/[0.03] shadow-[0_8px_32px_rgba(0,0,0,0.02)]"
          >
            <div className="w-full h-full max-w-none">
              {exp.animation === 'coinbase' && <CoinbaseAnimation scrollYProgress={scrollYProgress} />}
              {exp.animation === 'doordash' && <DoorDashAnimation scrollYProgress={scrollYProgress} />}
            </div>
          </motion.div>

          {/* Text Content - overlays the background */}
          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 max-w-2xl"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Tag */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block mb-6"
              >
                <div className="px-3 py-1 bg-gray-900 rounded-full">
                  <span className="text-xs font-medium text-white tracking-wider uppercase">
                    {exp.animation === 'coinbase' ? 'Fintech' : 'Logistics'}
                  </span>
                </div>
              </motion.div>

              <h3 className="text-5xl md:text-7xl font-light text-gray-900 mb-3 tracking-tight">
                {exp.company}
              </h3>
              
              <p className="text-sm text-gray-500 tracking-wide mb-8">{exp.period}</p>
              
              <p className="text-2xl md:text-3xl text-gray-800 mb-3 font-light leading-snug">
                {exp.role}
              </p>
              
              <p className="text-gray-600 mb-10 leading-relaxed text-lg max-w-xl">
                {exp.description}
              </p>
              
              {/* Highlights */}
              <div className="space-y-5">
                {exp.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 mt-2">
                      <div className="w-1 h-1 bg-gray-900 rounded-full" />
                    </div>
                    <p className="text-gray-700 text-base leading-relaxed">{highlight}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="experience" ref={sectionRef} className="bg-white">
      {/* Section header */}
      <div className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-6xl md:text-8xl font-light tracking-tight text-gray-900 mb-6">
            Experience
          </h2>
          <div className="w-16 h-[1px] bg-gray-900 mx-auto mb-6" />
          <p className="text-xl md:text-2xl text-gray-600 font-light">
            Building products at scale
          </p>
        </motion.div>
      </div>

      {/* Experience cards with spacing */}
      <div className="space-y-16 md:space-y-24">
        {experiences.map((exp, index) => (
          <ExperienceCard key={index} exp={exp} index={index} />
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-24" />
    </section>
  );
}
