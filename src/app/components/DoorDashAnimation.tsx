import { motion, MotionValue, useTransform } from 'motion/react';
import { useMemo } from 'react';

// Generates tightly packed flat-topped hexagons
const generateHexagons = (cols: number, rows: number, size: number) => {
  const hexagons = [];
  const width = 2 * size;
  const height = Math.sqrt(3) * size;
  
  const maxX = (cols - 1) * width * 0.75;
  const maxY = (rows - 1) * height;
  
  // Shift the origin of the isochrone to the right (75% of the total generated width)
  const centerX = maxX * 0.75;
  const centerY = maxY * 0.5;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const x = col * width * 0.75;
      const y = row * height + (col % 2 === 1 ? height / 2 : 0);
      
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Calculate max distance from this shifted center so the edge expansion works right
      const maxDistance = Math.max(
        Math.sqrt(centerX * centerX + centerY * centerY),
        Math.sqrt((maxX - centerX) * (maxX - centerX) + centerY * centerY)
      );
      
      hexagons.push({
        id: `hex-${row}-${col}`,
        x,
        y,
        distanceRatio: distance / maxDistance,
      });
    }
  }

  return { hexagons, svgWidth: maxX + width, svgHeight: maxY + height, centerX, centerY };
};

export function DoorDashAnimation({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  // Config
  const size = 30; // Slightly larger for better visual weight
  const cols = 28;
  const rows = 14;
  
  const { hexagons, svgWidth, svgHeight, centerX, centerY } = useMemo(() => generateHexagons(cols, rows, size), []);

  const bgOpacity = useTransform(scrollYProgress, [0, 1], [0.0, 0.25]);
  const expansionThreshold = useTransform(scrollYProgress, [0.1, 0.9], [0, 1.2]);
  const mapLinesOpacity = useTransform(scrollYProgress, [0, 1], [0.08, 0.15]);

  // Mask perfectly clears out the left side for crisp text reading
  const maskStyle = {
    WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 25%, black 55%)',
    maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.02) 25%, black 55%)'
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={maskStyle}
    >
      
      {/* Background dark overlay */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-900/30 to-orange-900/60"
        style={{ opacity: bgOpacity }}
      />

      {/* Abstract Map Background */}
      <motion.div className="absolute inset-0" style={{ opacity: mapLinesOpacity }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="street-grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#000" strokeWidth="0.5" />
              <path d="M 0 60 L 120 60" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.5" />
              <path d="M 60 0 L 60 120" fill="none" stroke="#000" strokeWidth="0.5" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#street-grid)" />
        </svg>
      </motion.div>

      {/* Hexagon Grid Container */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.35] mix-blend-multiply">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          {hexagons.map((hex) => (
            <Hexagon 
              key={hex.id} 
              hex={hex} 
              size={size} 
              expansionThreshold={expansionThreshold} 
            />
          ))}
          
          {/* Center Pin Marker strictly bound to SVG coordinates */}
          <motion.circle 
            cx={centerX} 
            cy={centerY} 
            r={6} 
            fill="#dc2626" 
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 0.8]) }}
          />
          <motion.circle 
            cx={centerX} 
            cy={centerY} 
            r={20} 
            fill="none" 
            stroke="#dc2626" 
            strokeWidth="2.5"
            style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [0, 0.4]) }}
          />
        </svg>
      </div>
    </div>
  );
}

// Renders the specific math-based hexagon and maps its visibility to distance
function Hexagon({ hex, size, expansionThreshold }: { 
  hex: { x: number, y: number, distanceRatio: number }, 
  size: number, 
  expansionThreshold: MotionValue<number> 
}) {
  const s = size + 0.5; // Slight overlap to prevent anti-aliasing rendering gaps
  const points = [
    [hex.x + s, hex.y],
    [hex.x + s/2, hex.y + (Math.sqrt(3)*s)/2],
    [hex.x - s/2, hex.y + (Math.sqrt(3)*s)/2],
    [hex.x - s, hex.y],
    [hex.x - s/2, hex.y - (Math.sqrt(3)*s)/2],
    [hex.x + s/2, hex.y - (Math.sqrt(3)*s)/2],
  ].map(p => p.join(',')).join(' ');

  const fillOpacity = useTransform(
    expansionThreshold,
    [hex.distanceRatio, hex.distanceRatio + 0.3],
    [0, 1 - (hex.distanceRatio * 0.6)]
  );

  return (
    <motion.polygon
      points={points}
      fill="#ea580c" // Deep Orange
      style={{ opacity: fillOpacity }}
      stroke="#ea580c"
      strokeWidth="1.5"
    />
  );
}