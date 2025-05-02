'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';

const instruments = [
  {
    name: 'Guitar',
    icon: '🎸',
    description: 'Playing both acoustic and electric guitar, with a focus on fingerstyle techniques.',
    color: '#5e5ce6',
  },
  {
    name: 'Piano',
    icon: '🎹',
    description: 'Classical training with a passion for contemporary compositions and improvisation.',
    color: '#e65ce2',
  },
  {
    name: 'Drums',
    icon: '🥁',
    description: 'Rhythm exploration and percussion techniques across various music styles.',
    color: '#5ce6e2',
  },
  {
    name: 'Harmonium',
    icon: '🎵',
    description: 'Traditional Indian music instrument with formal training and certification.',
    color: '#e65c5c',
  },
  {
    name: 'Vocals',
    icon: '🎤',
    description: 'Vocal training in both classical and contemporary singing styles.',
    color: '#e6c45c',
  },
];

export default function Passions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const audioVisualizerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView && audioVisualizerRef.current) {
      const bars = audioVisualizerRef.current.querySelectorAll('.audio-bar');
      
      gsap.from(bars, {
        height: 2,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.2,
      });
    }
  }, [isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  return (
    <section
      id="passions"
      ref={ref}
      className="w-full py-12 md:py-20 bg-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-accent2/5 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mx-auto text-center">Passions</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Beyond technology, I have a deep passion for music and have dedicated years to mastering various instruments.
          </p>
        </motion.div>

        {/* Audio visualizer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex justify-center"
        >
          <div 
            ref={audioVisualizerRef}
            className="h-40 flex items-end justify-center gap-1 w-full max-w-3xl bg-white/5 rounded-lg p-8 border border-white/10"
          >
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`audio-bar w-2 rounded-t-full bg-gradient-to-t ${
                  i % 2 === 0 ? 'from-accent to-accent2' : 'from-accent2 to-accent'
                }`}
                style={{ 
                  height: `${Math.floor(Math.random() * 70) + 10}px`,
                  animationDuration: `${0.5 + Math.random() * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </motion.div>

        {/* Instruments */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {instruments.map((instrument, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-white/10 flex flex-col items-center text-center hover:border-white/30 transition-all duration-300"
              style={{
                background: `radial-gradient(circle at center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.8) 100%), 
                            linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)`,
              }}
            >
              <div 
                className="text-5xl mb-5 rounded-full w-20 h-20 flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${instrument.color}30, ${instrument.color}10)`,
                  boxShadow: `0 0 20px ${instrument.color}20`
                }}
              >
                {instrument.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{instrument.name}</h3>
              <p className="text-white/70">{instrument.description}</p>

              {instrument.name === 'Harmonium' && (
                <div className="mt-4 text-sm text-accent italic">
                  Passed Madhyama Pratham with distinction
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 text-center max-w-xl mx-auto"
        >
          <blockquote className="text-white/80 italic">
            "My involvement in music has been beneficial in raising the standards of my life, teaching me discipline, 
            creativity, and the value of consistent practice—skills that translate directly to my technical work."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}