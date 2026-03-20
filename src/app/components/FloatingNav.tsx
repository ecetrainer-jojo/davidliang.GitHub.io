import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Experience', href: '#experience' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

export function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
      
      // Determine active section
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-full px-2 py-2 shadow-lg shadow-black/5">
        <div className="flex items-center gap-1">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive ? 'text-gray-900' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-gray-100 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </motion.a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
