'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Award } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  issuerLogo: string;
  date: string;
  credentialId?: string;
  link?: string;
}

const certifications: Certification[] = [
  {
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services (AWS)",
    issuerLogo: "https://logo.clearbit.com/aws.amazon.com",
    date: "Jan 2025",
    link: "#"
  },
  {
    title: "Programming with Java",
    issuer: "Amazon",
    issuerLogo: "https://logo.clearbit.com/amazon.com",
    date: "Jan 2025",
    credentialId: "DSBSZ0L3Z5YW",
    link: "#"
  },
  {
    title: "Generative AI with Large Language Models",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://logo.clearbit.com/deeplearning.ai",
    date: "Oct 2024",
    link: "#"
  },
  {
    title: "DeepLearning.AI TensorFlow Developer Specialization",
    issuer: "Google Career Certificates",
    issuerLogo: "https://logo.clearbit.com/google.com",
    date: "Oct 2023",
    credentialId: "F7FYK9PQURVL",
    link: "#"
  },
  {
    title: "Deep Learning Specialization",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://logo.clearbit.com/deeplearning.ai",
    date: "Sep 2023",
    credentialId: "C8N6GJFWTNQ4",
    link: "#"
  },
  {
    title: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    issuerLogo: "https://logo.clearbit.com/deeplearning.ai",
    date: "Aug 2023",
    link: "#"
  }
];

export default function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="certifications"
      ref={ref}
      className="w-full py-12 md:py-20 bg-black relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 right-10 w-80 h-80 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-accent2/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mx-auto text-center">Certifications<span className="text-accent">.</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Industry-recognized certifications that validate my expertise in various technologies and domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-accent/30 transition-all duration-300 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                  <img 
                    src={cert.issuerLogo} 
                    alt={cert.issuer}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://via.placeholder.com/150?text=${cert.issuer.charAt(0)}`;
                    }}
                  />
                </div>
                <span className="bg-white/5 text-white/70 text-xs px-2 py-1 rounded-full">
                  {cert.date}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                {cert.title}
              </h3>
              
              <p className="text-white/50 mb-3 text-sm">
                Issued by {cert.issuer}
              </p>
              
              {/* {cert.credentialId && (
                <div className="mb-3">
                  <p className="text-xs text-white/40">
                    Credential ID: {cert.credentialId}
                  </p>
                </div>
              )} */}
              
              <div className="mt-4">
                <a 
                  href={cert.link} 
                  className="inline-flex items-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Award size={14} />
                  Show credential
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="/docs/Bhavesh_Pabnani_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-full text-white transition-colors duration-300"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            Download Complete CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}