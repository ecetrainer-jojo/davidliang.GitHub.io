import { motion, MotionValue, useTransform } from 'motion/react';
import { Mail, Smartphone, User } from 'lucide-react';

export function CoinbaseAnimation({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const transferProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);
  
  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.0, 0.18]);
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.03, 0.08]);

  // Animate the 'left' position from 40% to 85% to keep it entirely on the right side
  const leftPos = useTransform(transferProgress, [0, 1], ["40%", "85%"]);
  const yUpper = useTransform(transferProgress, [0, 0.5, 1], [0, -60, 0]);
  const yLower = useTransform(transferProgress, [0, 0.5, 1], [0, 60, 0]);

  const leftAvatarScale = useTransform(transferProgress, [0, 0.1, 0.2], [1, 1.1, 1]);
  const rightAvatarScale = useTransform(transferProgress, [0.8, 0.9, 1], [1, 1.1, 1]);

  // Mask gradient perfectly fades out the left side, hiding elements behind the text completely
  // while smoothly blending into the full animation on the right.
  const maskStyle = {
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 25%, black 55%)',
    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.05) 25%, black 55%)'
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={maskStyle}
    >
      {/* Background overlay that gets darker */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/40 to-blue-900/80"
        style={{ opacity: bgOpacity }}
      />
      
      {/* Grid pattern */}
      <motion.div className="absolute inset-0" style={{ opacity: gridOpacity }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="cb-grid-new" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e40af" strokeWidth="1.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cb-grid-new)" />
        </svg>
      </motion.div>

      {/* Main visualization container focused on the right half */}
      <div className="relative w-full h-full opacity-[0.55]">
        
        {/* Connection line spans 40% to 85% width */}
        <div className="absolute left-[40%] right-[15%] h-[2px] bg-gradient-to-r from-blue-200/50 via-indigo-300 to-purple-200/50 top-1/2 -translate-y-1/2 rounded-full" />
        
        {/* Sender Avatar fixed at 40% width */}
        <motion.div 
          style={{ scale: leftAvatarScale }}
          className="absolute left-[40%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-20 md:h-28 rounded-full border border-blue-200/60 bg-white/70 flex items-center justify-center shadow-md backdrop-blur-md"
        >
          <User className="w-8 h-8 text-blue-500" />
        </motion.div>

        {/* Receiver Avatar fixed at 85% width */}
        <motion.div 
          style={{ scale: rightAvatarScale }}
          className="absolute left-[85%] -translate-x-1/2 top-1/2 -translate-y-1/2 w-20 md:w-28 h-20 md:h-28 rounded-full border border-indigo-200/60 bg-white/70 flex items-center justify-center shadow-md backdrop-blur-md"
        >
          <User className="w-8 h-8 text-indigo-500" />
        </motion.div>

        {/* Moving Email Transfer */}
        <motion.div
          style={{ 
            left: leftPos, 
            y: yUpper,
            x: "-50%", // Anchor its physical center to the animated `left` percentage
          }}
          className="absolute top-1/2 -mt-6 md:-mt-7 w-12 md:w-14 h-12 md:h-14 bg-white/95 rounded-2xl shadow-xl border border-blue-50 flex items-center justify-center backdrop-blur-sm"
        >
          <Mail className="w-5 md:w-6 h-5 md:h-6 text-indigo-500" />
        </motion.div>

        {/* Moving Payment Transfer */}
        <motion.div
          style={{ 
            left: leftPos, 
            y: yLower,
            x: "-50%",
          }}
          className="absolute top-1/2 -mt-6 md:-mt-7 w-12 md:w-14 h-12 md:h-14 bg-white/95 rounded-2xl shadow-xl border border-blue-50 flex items-center justify-center backdrop-blur-sm"
        >
          <Smartphone className="w-5 md:w-6 h-5 md:h-6 text-blue-500" />
        </motion.div>

      </div>
    </div>
  );
}