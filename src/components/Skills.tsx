'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Code, 
  Database, 
  Cloud, 
  LineChart, 
  Braces, 
  Server,
  Globe,
  Terminal,
  Cpu,
  PenTool,
  Star,
  StarHalf,
  CircleDot
} from "lucide-react";

interface Skill {
  name: string;
  level: 'proficient' | 'good' | 'beginner';
}

interface SkillCategory {
  icon: React.ReactNode;
  name: string;
  description: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    icon: <Code className="h-6 w-6" />,
    name: "Programming Languages",
    description: "Proficient in various programming languages for software development",
    skills: [
      { name: "Python", level: "proficient" },
      { name: "JavaScript", level: "proficient" },
      { name: "TypeScript", level: "proficient" },
      { name: "C++", level: "good" },
      { name: "C", level: "good" },
      { name: "HTML", level: "proficient" },
      { name: "CSS", level: "proficient" },
      { name: "SQL", level: "good" }
    ]
  },
  {
    icon: <Globe className="h-6 w-6" />,
    name: "Frontend Technologies",
    description: "Building modern, responsive user interfaces and web applications",
    skills: [
      { name: "React", level: "proficient" },
      { name: "Next.js", level: "proficient" },
      { name: "Vite", level: "good" },
      { name: "Tailwind CSS", level: "proficient" },
      { name: "Material UI", level: "good" },
      { name: "Redux", level: "good" },
      { name: "React Router", level: "proficient" }
    ]
  },
  {
    icon: <Server className="h-6 w-6" />,
    name: "Backend Technologies",
    description: "Creating scalable and efficient server-side applications",
    skills: [
      { name: "Node.js", level: "proficient" },
      { name: "Express", level: "proficient" },
      { name: "Django", level: "good" },
      { name: "FastAPI", level: "proficient" },
      { name: "Flask", level: "good" },
      { name: "RESTful APIs", level: "proficient" },
      { name: "GraphQL", level: "good" }
    ]
  },
  {
    icon: <Database className="h-6 w-6" />,
    name: "Databases",
    description: "Working with various database systems for data storage",
    skills: [
      { name: "MongoDB", level: "proficient" },
      { name: "PostgreSQL", level: "good" },
      { name: "MySQL", level: "good" },
      { name: "SQLite", level: "good" },
      { name: "Firebase", level: "proficient" },
      { name: "Supabase", level: "good" }
    ]
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    name: "Data Science & ML",
    description: "Analyzing data and building predictive models",
    skills: [
      { name: "TensorFlow", level: "proficient" },
      { name: "PyTorch", level: "good" },
      { name: "scikit-learn", level: "proficient" },
      { name: "Pandas", level: "proficient" },
      { name: "NumPy", level: "proficient" },
      { name: "LangChain", level: "good" }
    ]
  },
  {
    icon: <Cloud className="h-6 w-6" />,
    name: "Cloud & DevOps",
    description: "Deploying and managing applications in the cloud",
    skills: [
      { name: "AWS", level: "good" },
      { name: "Docker", level: "proficient" },
      { name: "Git", level: "proficient" },
      { name: "GitHub Actions", level: "good" },
      { name: "CI/CD", level: "good" },
      { name: "Vercel", level: "proficient" }
    ]
  }
];

const SkillBadge = ({ skill }: { skill: Skill }) => {
  const colors = {
    proficient: "bg-accent/10 text-accent border-accent/20 hover:bg-accent/20",
    good: "bg-accent2/10 text-accent2 border-accent2/20 hover:bg-accent2/20",
    beginner: "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
  };

  const icons = {
    proficient: <Star className="h-3 w-3" />,
    good: <StarHalf className="h-3 w-3" />,
    beginner: <CircleDot className="h-3 w-3" />
  };

  return (
    <motion.span 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`px-3 py-1.5 rounded-full border flex items-center gap-1.5 text-sm transition-colors duration-300 ${colors[skill.level]}`}
    >
      {icons[skill.level]}
      {skill.name}
    </motion.span>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="skills"
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
          <h2 className="section-heading mx-auto text-center">Skills & Expertise<span className="text-accent">.</span></h2>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-accent" />
              <span className="text-white/70">Proficient</span>
            </div>
            <div className="flex items-center gap-2">
              <StarHalf className="h-4 w-4 text-accent2" />
              <span className="text-white/70">Good</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-accent/30 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                  <p className="text-white/50 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBadge key={skillIndex} skill={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}