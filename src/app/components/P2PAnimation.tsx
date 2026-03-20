import { motion } from 'motion/react';
import { User } from 'lucide-react';

export function P2PAnimation() {
  const users = [
    { id: 1, x: 20, y: 30, delay: 0 },
    { id: 2, x: 80, y: 20, delay: 0.5 },
    { id: 3, x: 50, y: 70, delay: 1 },
    { id: 4, x: 75, y: 65, delay: 1.5 },
    { id: 5, x: 30, y: 80, delay: 2 },
  ];

  const connections = [
    { from: 1, to: 2, delay: 0.3 },
    { from: 2, to: 3, delay: 1 },
    { from: 3, to: 4, delay: 1.5 },
    { from: 1, to: 5, delay: 2.2 },
  ];

  return (
    <div className="relative w-full h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border border-gray-200">
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {connections.map((conn, index) => {
          const fromUser = users.find(u => u.id === conn.from);
          const toUser = users.find(u => u.id === conn.to);
          if (!fromUser || !toUser) return null;

          return (
            <motion.line
              key={index}
              x1={`${fromUser.x}%`}
              y1={`${fromUser.y}%`}
              x2={`${toUser.x}%`}
              y2={`${toUser.y}%`}
              stroke="#d1d5db"
              strokeWidth="1"
              strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ delay: conn.delay, duration: 1, ease: 'easeInOut' }}
            />
          );
        })}
      </svg>

      {/* User nodes */}
      {users.map((user) => (
        <motion.div
          key={user.id}
          className="absolute"
          style={{
            left: `${user.x}%`,
            top: `${user.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: user.delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1 }}
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 bg-blue-500 rounded-full"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{
                delay: user.delay + 0.5,
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
            
            {/* User avatar */}
            <div className="relative w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Payment indicator */}
      {connections.map((conn, index) => {
        const fromUser = users.find(u => u.id === conn.from);
        const toUser = users.find(u => u.id === conn.to);
        if (!fromUser || !toUser) return null;

        return (
          <motion.div
            key={`payment-${index}`}
            className="absolute"
            style={{
              left: `${fromUser.x}%`,
              top: `${fromUser.y}%`,
            }}
            initial={{ opacity: 0 }}
            animate={{
              left: `${toUser.x}%`,
              top: `${toUser.y}%`,
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              delay: conn.delay + 0.5,
              duration: 1.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-white text-xs font-bold">$</span>
            </div>
          </motion.div>
        );
      })}

      {/* Label */}
      <div className="absolute bottom-4 left-4 text-xs text-gray-500 font-medium">
        P2P Payment Network
      </div>
    </div>
  );
}
