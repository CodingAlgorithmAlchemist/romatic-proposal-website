import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Enhanced FloatingHearts with multiple types
const FloatingHearts = ({ isActive = false }: { isActive?: boolean }) => {
  const hearts = Array.from({ length: isActive ? 20 : 12 }, (_, i) => ({
    id: i,
    emoji: ['💕', '💖', '💗', '💘', '💝', '💞', '💟', '❤️', '🤍', '💜'][i % 10],
    size: Math.random() * 25 + 20,
    left: Math.random() * 100,
    animationDelay: Math.random() * 5,
    duration: Math.random() * 4 + 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
          }}
          animate={{
            y: [-100, window.innerHeight + 100],
            x: [0, Math.sin(Date.now() * 0.001 + heart.id) * 50],
            rotate: [0, 360],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.animationDelay,
            ease: "easeInOut",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Celebration Component with confetti and hearts
const CelebrationAnimation = () => {
  const confetti = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    emoji: ['🎉', '🎊', '✨', '🌟', '💫', '⭐', '🎈', '🎆'][i % 8],
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {confetti.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-2xl"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -100, 100, -50],
            x: [0, 50, -50, 25],
            rotate: [0, 360, -360, 180],
            scale: [0, 1.5, 0.5, 1, 0],
            opacity: [0, 1, 0.8, 0.3, 0],
          }}
          transition={{
            duration: 4,
            ease: "easeOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

// Pulsing Heart Border Component
const PulsingHeartBorder = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="relative p-1 rounded-3xl"
    animate={{
      background: [
        'linear-gradient(45deg, #ff6b6b, #feca57)',
        'linear-gradient(45deg, #ff9ff3, #f368e0)',
        'linear-gradient(45deg, #ff6b6b, #feca57)',
      ],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

const App: React.FC = () => {
  const [response, setResponse] = useState<'yes' | 'not-yet' | null>(null);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [sparkles, setSparkles] = useState<Array<{id: number, x: number, y: number}>>([]);

  const handleYesClick = () => {
    setResponse('yes');
    // Trigger celebration hearts
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  };
  
  const handleNotYetClick = () => {
    setResponse('not-yet');
    
    setTimeout(() => {
      const whatsappMessage = `💔 Update from your romantic proposal website:

She clicked "Not yet 😔" 

But don't worry - she still got to see your beautiful message, and sometimes the best things take time. ❤️

Keep being amazing, and maybe she'll be ready soon! 🌹`;
      
      const encodedMessage = encodeURIComponent(whatsappMessage);
      const phoneNumber = '254114041589';
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      window.open(whatsappURL, '_blank');
    }, 2000);
  };

  const handleSendLove = () => {
    const whatsappMessage = `🎉 YES! SHE SAID YES! 🎉

💕 Her response: "YES! I want to be your girlfriend!" ❤️

💌 Her sweet message to you:
"${message || 'She chose to send her love without words, but her YES says it all! 💕'}"

🥰 This message was sent from your romantic proposal website!`;
    
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const phoneNumber = '254114041589';
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    setSubmitted(true);
    createSparkles();
  };

  const createSparkles = () => {
    const newSparkles = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setSparkles(newSparkles);
    
    setTimeout(() => setSparkles([]), 5000);
  };

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingHearts isActive={response === 'yes'} />
      
      {showCelebration && <CelebrationAnimation />}
      
      <motion.div 
        className="max-w-3xl mx-auto z-10"
        animate={{ 
          scale: response === 'yes' && !submitted ? [1, 1.02, 1] : 1,
        }}
        transition={{ 
          duration: 2, 
          repeat: response === 'yes' && !submitted ? Infinity : 0 
        }}
      >
        <AnimatePresence mode="wait">
          {!response && (
            <motion.div
              key="proposal"
              initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotateY: 180 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              <PulsingHeartBorder>
                <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <h1 className="text-5xl md:text-7xl font-bold text-deep-rose mb-8 dancing-script">
                      Will you be my girlfriend?
                    </h1>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-6xl mb-8"
                    >
                      💕
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex gap-8 justify-center flex-wrap">
                    <motion.button
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: [0, -5, 5, 0],
                        boxShadow: "0 15px 40px rgba(220, 20, 60, 0.5)" 
                      }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleYesClick}
                      className="px-10 py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-full text-2xl font-bold shadow-2xl hover:shadow-xl transition-all duration-300 transform relative overflow-hidden"
                    >
                      <motion.span
                        animate={{ x: [0, 5, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        Yes ❤️
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 10px 30px rgba(128, 128, 128, 0.4)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNotYetClick}
                      className="px-10 py-5 bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded-full text-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform"
                    >
                      Not yet 😔
                    </motion.button>
                  </div>
                </div>
              </PulsingHeartBorder>
            </motion.div>
          )}

          {response === 'yes' && !submitted && (
            <motion.div
              key="message"
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -100, scale: 0.8 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 120,
              }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 182, 193, 0.3)",
                    "0 0 40px rgba(255, 182, 193, 0.6)",
                    "0 0 20px rgba(255, 182, 193, 0.3)",
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border-2 border-pink-300"
              >
                <motion.h2 
                  className="text-4xl md:text-5xl text-deep-rose mb-8 dancing-script"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    color: ["#DC143C", "#FF69B4", "#DC143C"],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Aww, you just made my day! 🥰
                </motion.h2>
                
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-2xl text-gray-700 mb-8">
                    Write a sweet message to me:
                  </p>
                  
                  <motion.textarea
                    whileFocus={{ 
                      scale: 1.02,
                      boxShadow: "0 0 30px rgba(255, 182, 193, 0.8)",
                    }}
                    className="w-full p-6 text-xl rounded-2xl border-3 border-pink-300 focus:border-deep-rose focus:outline-none focus:ring-4 focus:ring-pink-200 bg-white/90 mb-8 resize-none transition-all duration-300"
                    rows={5}
                    placeholder="Type your sweet message here... 💌"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </motion.div>
                
                <motion.button
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, -2, 2, 0],
                    boxShadow: "0 15px 40px rgba(255, 215, 0, 0.6)" 
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendLove}
                  className="px-12 py-6 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-red-900 rounded-full text-2xl font-bold shadow-2xl hover:shadow-xl transition-all duration-300 transform relative overflow-hidden"
                >
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Send my love 💕
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {response === 'yes' && submitted && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 1,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              {/* Enhanced Sparkles */}
              {sparkles.map((sparkle, index) => (
                <motion.div
                  key={sparkle.id}
                  className="fixed pointer-events-none z-50"
                  style={{ left: sparkle.x, top: sparkle.y }}
                  animate={{
                    y: [-80, 0, -120],
                    x: [0, Math.sin(index) * 100, Math.cos(index) * 50],
                    opacity: [0, 1, 0.5, 0],
                    scale: [0, 2, 1, 0],
                    rotate: [0, 360, -180, 720],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                >
                  {['✨', '🌟', '💫', '⭐', '🎊'][index % 5]}
                </motion.div>
              ))}
              
              <motion.div
                animate={{ 
                  background: [
                    "rgba(255, 255, 255, 0.95)",
                    "rgba(255, 240, 245, 0.95)",
                    "rgba(255, 228, 225, 0.95)",
                    "rgba(255, 255, 255, 0.95)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="backdrop-blur-lg rounded-3xl p-12 shadow-2xl border-2 border-pink-300"
              >
                <motion.h2 
                  className="text-5xl md:text-7xl text-deep-rose mb-12 dancing-script"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 2, -2, 0],
                    textShadow: [
                      "0 0 10px rgba(220, 20, 60, 0.5)",
                      "0 0 30px rgba(220, 20, 60, 0.8)",
                      "0 0 10px rgba(220, 20, 60, 0.5)",
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🎉 She Said Yes! 🎉
                </motion.h2>
                
                <motion.div 
                  className="text-lg md:text-2xl text-gray-800 leading-relaxed max-w-5xl mx-auto space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                >
                  <motion.p
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                  >
                    <strong className="text-deep-rose text-2xl">Happy Girlfriend's Day my love.</strong> Every day with you feels like a blessing but today I just want to pause and remind you how much you mean to me. You're more than just my girlfriend; you're my peace, my motivation, my happiness and my heart in human form.
                  </motion.p>
                  
                  <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                  >
                    Your smile calms my storms. Your love gives me strength. And your presence makes life feel lighter and more beautiful.
                  </motion.p>
                  
                  <motion.p
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.8 }}
                  >
                    Thank you for being patient with me, for believing in me and for loving me even in the moments I don't feel deserving. I'm proud to love you and I'm even prouder to be loved by you.
                  </motion.p>
                  
                  <motion.p
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 3, duration: 0.8 }}
                  >
                    Today is for you. But every day I promise to show you just how deeply I care for you.
                  </motion.p>
                  
                  <motion.p 
                    className="text-3xl md:text-4xl font-bold text-deep-rose pt-8"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.2, 1],
                      opacity: 1,
                      textShadow: [
                        "0 0 10px rgba(220, 20, 60, 0.5)",
                        "0 0 30px rgba(220, 20, 60, 1)",
                        "0 0 10px rgba(220, 20, 60, 0.5)",
                      ]
                    }}
                    transition={{ 
                      delay: 3.5, 
                      duration: 1,
                      textShadow: { duration: 2, repeat: Infinity }
                    }}
                  >
                    <motion.span
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      I love you. Always and all ways. ❤️
                    </motion.span>
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}

          {response === 'not-yet' && (
            <motion.div
              key="patience"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(220, 20, 60, 0.3)",
                    "0 0 40px rgba(220, 20, 60, 0.1)",
                    "0 0 20px rgba(220, 20, 60, 0.3)",
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-pink-200"
              >
                <motion.h3 
                  className="text-3xl md:text-4xl text-deep-rose dancing-script"
                  animate={{ 
                    scale: [1, 1.02, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  That's okay. You'll always be special to me. Take your time ❤️
                </motion.h3>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;
