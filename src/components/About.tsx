'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
      id="about"
      className="w-full py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 rounded-full bg-accent2/5 blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image side */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative rounded-md overflow-hidden h-[400px] md:h-[500px] bg-gradient-to-r from-black to-black/40">
              <Image
                src="/images/1744196313548-removebg.png"
                alt="About Me"
                fill
                style={{ objectFit: 'contain' }}
                className="transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/60 mix-blend-multiply"></div>
              
              <div className="absolute bottom-8 left-8 z-10">
                <h2 className="text-3xl font-bold mb-2">Pre-final Year<br/><span className="text-accent">@IIT Kharagpur</span></h2>
                <p className="text-white/70">Manufacturing Science & Engineering</p>
              </div>
            </div>
          </motion.div>

          {/* Text side */}
          <motion.div variants={itemVariants}>
            <h2 className="section-heading">About Me</h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              I am  a pre-final year student pursuing a B.Tech in Manufacturing Science and Engineering at 
              Indian Institute of Technology, Kharagpur.
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              My expertise lies in Full Stack Development, where I work with advanced frameworks and technologies including 
              MongoDB, Supabase, Firebase, React, TypeScript, JavaScript, HTML, CSS, Vite, Tailwind, NextJS, and backend 
              frameworks like Node, Express, FastAPI, Docker, and Django.
            </p>
            <p className="text-white/70 mb-6 leading-relaxed">
              Additionally, I have strong proficiency in Data Analytics and Machine Learning, with specialized knowledge in 
              Time Series Analysis and Multi-agent Orchestration.
            </p>
            <p className="text-white/70 mb-8 leading-relaxed">
              Outside of technology, I have a passion for music and play multiple instruments including the guitar, piano, 
              drums, and harmonium. My musical talents have been recognized at state and national level competitions.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div>
                <h3 className=" text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Education
                </h3>
                <ul className="space-y-2">
                  <li className="text-white/70">
                    <span className="text-accent">2022-2026:</span> B.Tech
                  </li>
                  <li className="text-white/70">
                    <span className="text-accent">2020-2022:</span> HSC
                  </li>
                  <li className="text-white/70">
                    <span className="text-accent">2014-2020:</span> ICSE
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2"></span>
                  Positions
                </h3>
                <ul className="space-y-2">
                  <li className="text-white/70">Executive Head @ Kharagpur Data Analytics Group</li>
                  <li className="text-white/70">AI and Metaverse Head @ KodeinKGP</li>
                  <li className="text-white/70">General Secretary Technology @ HJB Hall</li>
                  <li className="text-white/70">AI Head @ 10X Club by Coding Ninjas</li>
                </ul>
              </div>
            </div>
            
            <a
              href="#experience"
              className="inline-flex items-center text-accent hover:underline gap-1 group"
            >
              View my experience
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 