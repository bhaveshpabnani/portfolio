'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Briefcase, 
  CalendarRange, 
  MapPin, 
  ExternalLink 
} from "lucide-react";

// Experience data
const experiences = [
  {
    company: "Finaiance",
    logo: "",
    title: "Founding Engineer",
    period: "Sep 2025 - Dec 2025",
    location: "Remote",
    remote: true,
    description: "Built an agentic financial intelligence workspace with Meridian multi-agent orchestration, Docker-isolated execution, SSE streaming, document workflows, GitHub Actions, Infisical secrets, Supabase RLS, Redis, Qdrant, Neo4j and ClickHouse-backed retrieval.",
    skills: ["LangGraph", "FastAPI", "Docker", "Supabase", "Redis", "Qdrant", "Neo4j", "Infisical"]
  },
  {
    company: "VoiceEval",
    logo: "",
    title: "Technical Lead",
    period: "Dec 2025 - Feb 2026",
    location: "Remote",
    remote: true,
    description: "Led a persona-based evaluation platform for voice agents, generating scenario-specific test cases, extracting conversation signals and automating simulation-driven scoring across ElevenLabs, Sarvam, LiveKit, SIP, MongoDB, Redis and ASR/TTS pipelines.",
    skills: ["Voice AI", "ElevenLabs", "Sarvam", "LiveKit", "MongoDB", "Redis", "Evaluation"]
  },
  {
    company: "Amazon",
    logo: "https://logo.clearbit.com/amazon.com",
    title: "SDE Intern",
    period: "May 2025 - Jul 2025",
    location: "Bengaluru, India",
    description: "Worked with the FinAuto team on finance and payments automation, optimizing Java/Python service workflows, DynamoDB batch querying, AWS infrastructure and Bedrock prompt routing for low-latency, production-grade automation.",
    skills: ["AWS", "Java", "Python", "DynamoDB", "Bedrock", "Microservices"]
  },
  {
    company: "PUMA Group",
    logo: "https://logo.clearbit.com/puma.com",
    title: "Customer Acquisition Analyst",
    period: "Mar 2025 - Present",
    location: "India",
    description: "Performed in-store marketing analysis for customer acquisition cost prediction, KPI/KRA detection and customer-feedback dataset analysis to improve acquisition strategy and store-level decision making.",
    skills: ["Data Analysis", "Marketing Analytics", "KPI Tracking", "Predictive Modeling"]
  },
  {
    company: "Mansio.ai",
    logo: "",
    title: "Backend Intern",
    period: "Aug 2025 - Sep 2025",
    location: "Remote",
    remote: true,
    description: "Built backend workflows for MITRA, a WhatsApp and voice agent system using FastAPI, Redis, Gupshup, VAPI, Deepgram STT, ElevenLabs TTS and GPT-4o to support real-time conversational automation.",
    skills: ["FastAPI", "Redis", "WhatsApp", "VAPI", "Deepgram", "ElevenLabs"]
  },
  {
    company: "Cambridge Judge Business School",
    logo: "https://logo.clearbit.com/jbs.cam.ac.uk",
    title: "Research Assistant",
    period: "Jan 2025 - Present",
    location: "United Kingdom",
    remote: true,
    description: "Compiled satellite datasets for frugality and ablation studies of Indian satellites and led an agentic AI chatbot effort to gather validated satellite information from government-authorized sources.",
    skills: ["Data Collection", "Research Methodology", "AI Development", "Team Leadership"]
  },
  {
    company: "Deakin University",
    logo: "https://logo.clearbit.com/deakin.edu.au",
    title: "Research Intern",
    period: "Mar 2024 - Aug 2024",
    location: "Victoria, Australia",
    remote: true,
    description: "Analyzed anomaly detection methods for DDoS attack detection under Prof. Gang Li, implementing Deep Residual Networks with Dice Loss, LUCID and FLAD models for security classification.",
    skills: ["DDoS", "Anomaly Detection", "Deep Residual Networks", "LUCID", "FLAD", "CNN"]
  },
  {
    company: "Sabre Corporation",
    logo: "https://logo.clearbit.com/sabre.com",
    title: "Software Engineer / Data Analytics Intern",
    period: "May 2024 - Jul 2024, Jan 2026 - Present",
    location: "Remote",
    remote: true,
    description: "Built airline analytics systems across non-stop share prediction, RAG-based schedule querying and Vectora schedule intelligence using Aurora/PostgreSQL, Redis caching, AWS EC2, route-pair analytics, graph features and dashboard integrations.",
    skills: ["Aurora", "PostgreSQL", "Redis", "AWS EC2", "NetworkX", "RAG", "Analytics"]
  },
  {
    company: "Indian Institute of Management, Ranchi",
    logo: "https://logo.clearbit.com/iimranchi.ac.in",
    title: "Research Intern",
    period: "Nov 2023 - Jul 2024",
    location: "Ranchi",
    remote: true,
    description: "Contributed to crowdfunding campaign success research using multimodal sentiment analysis, OpenCV face detection, ResNet50 object recognition, CLIP congruency analysis and SQRankBoost ranking.",
    skills: ["Computer Vision", "Sentiment Analysis", "ResNet50", "CLIP", "Statistical Analysis"]
  },
  {
    company: "Data Analytics Centre",
    logo: "",
    title: "Student Researcher / Executive Head",
    period: "2023 - Present",
    location: "IIT Kharagpur",
    remote: true,
    description: "Led applied analytics and AI initiatives spanning predictive modeling, financial analysis, research workflows and student engineering projects, while mentoring teams on data pipelines, ML systems and product-oriented experimentation.",
    skills: ["Leadership", "Data Analytics", "ML", "Product Engineering", "Mentoring"]
  }
];

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="experience"
      ref={ref}
      className="w-full py-4 md:py-16 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-48 h-48 rounded-full bg-accent2/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mx-auto text-center">Experience<span className="text-accent">.</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            My professional journey across various organizations and roles, showcasing my
            growth and expertise development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-accent/50 transition-all duration-300 group h-full flex"
            >
              <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/4 p-6 flex flex-col items-center justify-start bg-white/5 md:h-full">
                  <div className="relative w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center p-2 mb-4">
                    {experience.logo ? (
                      <img 
                        src={experience.logo}
                        alt={`${experience.company} logo`}
                        className="w-full h-full object-contain rounded-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://via.placeholder.com/150?text=${experience.company.charAt(0)}`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-accent text-2xl font-bold rounded-full">
                        {experience.company.charAt(0)}
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-full bg-transparent border border-accent/50 animate-pulse"></div>
                  </div>
                  <span className="text-sm text-white/70 text-center">{experience.company}</span>
                </div>

                <div className="flex-1 p-6">
                  <h3 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                    {experience.title}
                    <ExternalLink size={16} className="text-white/50" />
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <CalendarRange size={14} className="text-accent" />
                      {experience.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} className="text-accent" />
                      {experience.location} {experience.remote && experience.location !== "Remote" && "(Remote)"}
                    </span>
                  </div>
                  
                  <p className="text-white/70 mb-4">{experience.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
