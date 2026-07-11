'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Github, ExternalLink } from "lucide-react";
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  category: 'ai' | 'ml' | 'fullstack';
}

const projects: Project[] = [
  {
    title: "Humungousaur: Proactive Cognitive Agent",
    description: "Built a proactive desktop-first cognitive agent with memory-based, Git-backed contextual orchestration, native macOS Swift/SwiftUI and Windows WinUI 3/.NET apps, browser execution control, selectors and skill integrations.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["SwiftUI", "WinUI 3", ".NET", "Python", "FastAPI", "Browser Automation", "Agents"],
    category: 'ai'
  },
  {
    title: "Finaiance: Multi-Agent Financial Workspace",
    description: "Engineered an AI-native finance workspace with Meridian contextual orchestration, Docker execution sandboxes, RAG over documents, Supabase RLS, Redis, Qdrant, Neo4j, ClickHouse, Infisical and CI/CD-backed cloud deployment.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["LangGraph", "FastAPI", "Docker", "Supabase", "Redis", "Qdrant", "Neo4j", "ClickHouse"],
    category: 'ai'
  },
  {
    title: "VoiceEval: Persona-Based Voice Agent Testing",
    description: "Led a voice-agent evaluation framework for persona-driven scenario generation, ElevenLabs/Sarvam-based simulation, transcript extraction and automated scoring across LiveKit, SIP, MongoDB and Redis pipelines.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Voice AI", "ElevenLabs", "Sarvam", "LiveKit", "MongoDB", "Redis"],
    github: "https://github.com/shivam-eval/voiceeval-frontend",
    category: 'ai'
  },
  {
    title: "Axon / AB: AI Analytics Platform",
    description: "Built an AI analytics platform across Axon frontend and backend services with Next.js, Vite, FastAPI, PostgreSQL, Redis, pgvector, OpenAI, Anthropic, LiteLLM, SQL parsing, dashboards and data workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "pgvector", "OpenAI", "Anthropic"],
    github: "https://github.com/bhaveshpabnani/axon-insight-suite",
    category: 'ai'
  },
  {
    title: "Frammer AI: Product Analytics Dashboard",
    description: "Developed a production-style B2B media analytics dashboard for short-form video workflows with KPI views, content performance, channel analytics, language breakdowns, team productivity and client portals.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Recharts", "TanStack Query"],
    github: "https://github.com/bhaveshpabnani/Frammer",
    category: 'fullstack'
  },
  {
    title: "Flash: AI Presentation Agent",
    description: "Built an AI-powered presentation generation system with FastAPI and Next.js services, document upload context, PPTX export, Docker deployment and pluggable OpenAI, Gemini, Anthropic and image-provider integrations.",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["FastAPI", "Next.js", "Docker", "OpenAI", "Gemini", "Anthropic", "PPTX"],
    github: "https://github.com/bhaveshpabnani/Flash",
    category: 'ai'
  },
  {
    title: "RealFlow: CRE Voice Agent System",
    description: "Implemented a production VAPI-powered commercial real estate voice agent with Twilio phone routing, FastAPI workflow APIs, caller-type branching, structured data extraction and Google Sheets logging.",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["VAPI", "Twilio", "FastAPI", "Google Sheets", "Voice AI", "Workflows"],
    github: "https://github.com/bhaveshpabnani/RealFlow",
    category: 'ai'
  },
  {
    title: "ReefChat: Multi-Agent Retrieval System",
    description: "Developed MORAY, a multi-agent retrieval and DAG synthesis system for equity analysis with parallel tool execution, Pathway-backed document pipelines, Next.js, TypeScript, LangGraph-style orchestration and PDF-grounded workflows.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "React", "TypeScript", "Pathway", "LangChain", "LangGraph"],
    demo: "https://pathway.com/framework/blog/ai-tools-for-equity-analysis",
    github: "https://github.com/SubarnoMaji/reef-chat-pathway",
    category: 'ai'
  },
  {
    title: "Vectora: Aviation Analytics Platform",
    description: "Built Sabre schedule intelligence with Aurora/PostgreSQL, Redis caching, AWS EC2, route-pair heatmaps, multi-tenant analytics and departure-wave dashboards for airline network planning workflows.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Aurora", "PostgreSQL", "Redis", "AWS EC2", "Analytics", "Dashboards"],
    category: 'fullstack'
  },
  {
    title: "Mansio: Property Discovery Platform",
    description: "Developed a real-estate listing and roommate discovery platform with property search, listing workflows and a Tinder-like flatmate interface for faster matching and discovery.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["TypeScript", "Next.js", "Prisma", "Authentication", "Product Design"],
    demo: "https://mansio.vercel.app/",
    github: "https://github.com/bhaveshpabnani/mansio",
    category: 'fullstack'
  },
  {
    title: "Portfolio Website",
    description: "A dark VS Code-inspired portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion and Firebase hosting, designed to keep projects, CV and technical work easy to browse.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Firebase"],
    github: "https://github.com/bhaveshpabnani/portfolio",
    demo: "https://bhavesh-pabnani-portfolio.web.app",
    category: 'fullstack'
  },
  {
    title: "Market Lens",
    description: "Built a market analysis and visualization tool for stock-market insights, combining financial data ingestion, dashboards and investor-facing decision support for faster market exploration.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["React", "TypeScript", "D3.js", "API Integration", "Data Visualization"],
    demo: "https://market-lens-optimizer.web.app/",
    github: "https://github.com/bhaveshpabnani/Market-Lens",
    category: 'fullstack'
  },
  {
    title: "Vibe Sense",
    description: "Built an emotion and sentiment analysis application for text and speech signals, using React/TypeScript interfaces and machine-learning workflows for conversational mood detection.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["TypeScript", "React", "NLP", "Sentiment Analysis", "TensorFlow.js"],
    demo: "https://vibe-converse.web.app/",
    github: "https://github.com/bhaveshpabnani/Vibe-Sense",
    category: 'ml'
  },
  {
    title: "Catalyst Ambulance Optimizer",
    description: "An emergency response optimization system that uses real-time data and predictive algorithms to improve ambulance routing and response times.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["TypeScript", "React", "Google Maps API", "Optimization Algorithms", "Real-time Data"],
    demo: "https://catalyst-ambulance-optimizer.vercel.app/",
    github: "https://github.com/bhaveshpabnani/catalyst-ambulance-optimizer",
    category: 'fullstack'
  },
  {
    title: "Breadth Recommendation App",
    description: "Web application to optimize breadth selection at IIT Kharagpur using Next.js and Tailwind CSS for frontend interface with Flask backend and GPT integration.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "Tailwind CSS", "Flask", "OpenAI API"],
    demo: "https://breadth-selection.netlify.app/",
    category: 'fullstack'
  },
  {
    title: "KIK Bot: AI Content Generator",
    description: "AI-powered chatbot using Streamlit, LangChain, and OpenAI GPT-3.5-turbo for personalized content generation with conversation management.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Streamlit", "LangChain", "OpenAI", "Python"],
    github: "https://github.com/bhaveshpabnani/KIK-Bot",
    category: 'ml'
  },
  {
    title: "Image Processing & Generation App",
    description: "Streamlit application featuring custom mask generator, black-and-white colorization, and Stable Diffusion XL models for text-to-image generation.",
    image: "https://images.unsplash.com/photo-1561518776-e76a5e48f731?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["OpenCV", "Stable Diffusion", "Streamlit", "Kandinsky"],
    github: "https://github.com/bhaveshpabnani/Image-Processing-and-Generation-Application",
    category: 'ml'
  },
  {
    title: "BTC-INR Trading",
    description: "A cryptocurrency trading analysis tool that uses machine learning to predict Bitcoin to Indian Rupee exchange rates and identify optimal trading opportunities.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Python", "Jupyter Notebook", "Pandas", "Scikit-learn", "Cryptocurrency"],
    github: "https://github.com/bhaveshpabnani/BTC-INR-Trading",
    category: 'ml'
  },
  {
    title: "Social Care Scorecard",
    description: "A comprehensive evaluation system for social care services that provides metrics, analytics, and reporting tools to improve service quality and outcomes.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["React", "D3.js", "Data Analysis", "Healthcare", "Dashboard"],
    github: "https://github.com/bhaveshpabnani/Social-Care-Scorecard",
    category: 'fullstack'
  },
  {
    title: "Tourism Demand Forecast",
    description: "A predictive analytics system that forecasts tourism demand based on historical data, seasonal patterns, and external factors to help the tourism industry plan effectively.",
    image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Python", "Jupyter Notebook", "Time Series Analysis", "Forecasting", "Data Visualization"],
    github: "https://github.com/bhaveshpabnani/Tourism-Demand-Forecast",
    category: 'ml'
  },
  {
    title: "Airline Demand & Fare Prediction",
    description: "A machine learning system that predicts airline ticket demand and optimal pricing strategies based on multiple factors including seasonality, events, and competitor pricing.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Python", "Jupyter Notebook", "Machine Learning", "Regression Analysis", "Data Mining"],
    github: "https://github.com/bhaveshpabnani/Airline-Demand-and-Fare-Prediction",
    category: 'ml'
  },
  {
    title: "Exoplanets Detection",
    description: "A deep learning project that analyzes astronomical data to detect and classify exoplanets, contributing to the search for habitable worlds beyond our solar system.",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Python", "Jupyter Notebook", "Deep Learning", "Astronomy", "Signal Processing"],
    github: "https://github.com/bhaveshpabnani/Exoplanets-Detection",
    category: 'ml'
  }
];

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden group h-full flex flex-col"
    >
      <div className="w-full h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center gap-4">
          {project.github && (
            <a 
              href={project.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <Github className="h-5 w-5 text-white" />
            </a>
          )}
          {project.demo && (
            <a 
              href={project.demo} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <ExternalLink className="h-5 w-5 text-white" />
            </a>
          )}
        </div>
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, idx) => (
            <span 
              key={idx} 
              className="px-2 py-1 bg-white/5 text-xs rounded-full text-white/80"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-2 py-1 bg-white/5 text-xs rounded-full text-white/80">
              +{project.tags.length - 4} more
            </span>
          )}
        </div>
      </div>
      
      <div className="px-6 pb-6 flex justify-end mt-auto">
        <a 
          href={project.demo || project.github || "#"} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-white/50 hover:text-accent transition-colors text-sm"
        >
          <Eye size={16} className="mr-2" /> View Project
        </a>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section
      id="projects"
      ref={ref}
      className="w-full py-20 md:py-32 bg-black relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 rounded-full bg-accent2/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading mx-auto text-center">Projects<span className="text-accent">.</span></h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            A showcase of my projects, ranging from machine learning applications to full-stack web development.
          </p>
        </motion.div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1">
            {['all', 'ai', 'fullstack', 'ml'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  activeTab === tab 
                    ? 'bg-accent text-white' 
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {tab === 'all' ? 'All Projects' : 
                 tab === 'ai' ? 'AI Agents' :
                 tab === 'ml' ? 'Machine Learning' :
                 tab === 'fullstack' ? 'Full Stack' : 'All Projects'}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
