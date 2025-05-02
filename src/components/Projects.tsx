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
  category: 'ml' | 'fullstack';
}

const projects: Project[] = [
  {
    title: "MORAY - Multi-agent Orchestration",
    description: "Developed Multi-agent Orchestrated Retrieval and DAG sYntesis to enable parallelized execution of agents and tools using a DAG. Built with FastAPI, Docker, AWS, and Modal for hosting the Stella 1.5B contextual embedding model.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["LangChain", "LangGraph", "CrewAI", "FastAPI", "Docker", "AWS"],
    github: "https://github.com/username/moray",
    category: 'ml'
  },
  {
    title: "ReefChat: Multi-Agent Retrieval System",
    description: "A full-stack chatbot using Next.js, React, and TypeScript for UI, with Google Authentication and PDF viewer functionalities. Built for InterIIT High Prep.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "React", "TypeScript", "Google Auth", "PDF Processing"],
    demo: "https://reefchat.example.com",
    github: "https://github.com/username/reefchat",
    category: 'fullstack'
  },
  {
    title: "DDoS Attack Detection System",
    description: "Secured 100% accuracy using Deep Residual Network with Dice Loss on CSE-CIC-IDS 2018 dataset after SMOTE augmentation. Part of research at Deakin University.",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Deep Learning", "Security", "Python", "TensorFlow", "LUCID", "FLAD"],
    github: "https://github.com/username/ddos-detection",
    category: 'ml'
  },
  {
    title: "Breadth Recommendation App",
    description: "Web application to optimize breadth selection at IIT Kharagpur using Next.js and Tailwind CSS for frontend interface with Flask backend and GPT integration.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Next.js", "Tailwind CSS", "Flask", "OpenAI API"],
    demo: "https://breadth-recommender.example.com",
    category: 'fullstack'
  },
  {
    title: "KIK Bot: AI Content Generator",
    description: "AI-powered chatbot using Streamlit, LangChain, and OpenAI GPT-3.5-turbo for personalized content generation with conversation management.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["Streamlit", "LangChain", "OpenAI", "Python"],
    github: "https://github.com/username/kik-bot",
    category: 'ml'
  },
  {
    title: "Advanced Image Processing App",
    description: "Streamlit application featuring custom mask generator, black-and-white colorization, and Stable Diffusion XL models for text-to-image generation.",
    image: "https://images.unsplash.com/photo-1561518776-e76a5e48f731?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["OpenCV", "Stable Diffusion", "Streamlit", "Kandinsky"],
    demo: "https://image-processor.example.com",
    github: "https://github.com/username/image-processor",
    category: 'ml'
  },
  {
    title: "Portfolio Website",
    description: "A stunning portfolio website built with React, TypeScript, Tailwind CSS and shadcn components. Features smooth animations and responsive design.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Vite"],
    demo: "https://example.com",
    category: 'fullstack'
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
            {['all', 'ml', 'fullstack', ].map((tab) => (
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