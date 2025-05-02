'use client';

import { useState, useEffect, useRef } from 'react';
import fileContents from '@/components/codes'
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code,
  Terminal,
  FolderOpen,
  Search,
  GitBranch,
  Settings,
  ListOrdered,
  ChevronRight,
  Music,
  Briefcase,
  Award,
  Cpu,
  Heart,
  Mail,
  FileIcon,
  FileText,
  FileJson,
  FileCode,
  Server,
  Database,
  Download
} from "lucide-react";

// Add global styles for VS Code-like scrollbars
const vsCodeScrollbarStyles = `
  /* Width */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    background-color: transparent;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
  }
  
  /* Corner */
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  
  /* Hide scrollbar when not in use */
  .vs-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
    transition: scrollbar-color 0.3s ease;
  }
  
  .vs-scrollbar:hover {
    scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
  }
  
  /* Ensure code blocks have consistent line height */
  .code-content {
    line-height: 1.4;
  }
  
  .code-content span {
    white-space: pre;
  }
`;

// Add syntax highlighting styles
const syntaxHighlightingStyles = `
  .token-keyword { color: #569cd6; }
  .token-string { color: #ce9178; }
  .token-comment { color: #6a9955; }
  .token-number { color: #b5cea8; }
  .token-function { color: #dcdcaa; }
  .token-type { color: #4ec9b0; }
  .token-tag { color: #4ec9b0; }
  .token-jsxtag { color: #9cdcfe; }
  .token-literal { color: #c586c0; }
  .token-operator { color: #d4d4d4; }
  .token-prop { color: #9cdcfe; }
  .token-punctuation { color: #d4d4d4; }
`;

// Define TypeScript interfaces for our items
interface ExplorerItem {
  name: string;
  type: 'file' | 'folder';
  parent?: string;
  section?: string;
  isOpen?: boolean;
}

interface ActivityItem {
  icon: React.ReactNode;
  tooltip: string;
  id: string;
  color: string;
}

interface StatusItem {
  content: React.ReactNode | string;
  tooltip: string;
}

// Improved syntax highlighting helper function with proper color coding
const syntaxHighlight = (code: string) => {
  let tokenized = code;
  
  // Handle strings - needs to be first to avoid conflicts
  tokenized = tokenized.replace(/'([^'\\]*(\\.[^'\\]*)*)'|"([^"\\]*(\\.[^"\\]*)*)"|`([^`\\]*(\\.[^`\\]*)*)`/g, 
    match => `<span class="token-string">${match}</span>`);
  
  // Handle comments
  tokenized = tokenized.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, 
    match => `<span class="token-comment">${match}</span>`);
  
  // Handle keywords
  const keywords = ['import', 'export', 'from', 'default', 'const', 'let', 'var', 'function', 'return', 
    'if', 'else', 'switch', 'case', 'break', 'for', 'while', 'do', 'continue', 'class', 
    'interface', 'type', 'extends', 'implements', 'new', 'this', 'super', 'instanceof', 
    'typeof', 'as', 'async', 'await', 'of', 'in', 'try', 'catch', 'finally', 'throw', 
    'static', 'public', 'private', 'protected', 'get', 'set', 'yield'];
  
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span class="token-keyword">${keyword}</span>`);
  });
  
  // Handle types
  const types = ['string', 'number', 'boolean', 'any', 'void', 'never', 'null', 'undefined', 
    'object', 'symbol', 'bigint', 'React', 'JSX', 'ReactNode', 'Element', 'FC', 'FunctionComponent'];
  
  types.forEach(type => {
    const regex = new RegExp(`\\b${type}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span class="token-type">${type}</span>`);
  });
  
  // Handle literals
  const literals = ['true', 'false', 'null', 'undefined'];
  
  literals.forEach(literal => {
    const regex = new RegExp(`\\b${literal}\\b`, 'g');
    tokenized = tokenized.replace(regex, `<span class="token-literal">${literal}</span>`);
  });
  
  // Handle numbers
  tokenized = tokenized.replace(/\b\d+\b/g, match => `<span class="token-number">${match}</span>`);
  
  // Handle function calls
  tokenized = tokenized.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\s*\()/g, 
    (_, name) => `<span class="token-function">${name}</span>`);
  
  // Handle JSX tags - must escape < and > first
  tokenized = tokenized.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Now handle JSX tags after escaping
  tokenized = tokenized.replace(/&lt;([\/]?)([A-Z][A-Za-z0-9]*)/g, 
    (_, slash, name) => `&lt;${slash}<span class="token-tag">${name}</span>`);
    
  tokenized = tokenized.replace(/&lt;([\/]?)([a-z][A-Za-z0-9]*)/g, 
    (_, slash, name) => `&lt;${slash}<span class="token-jsxtag">${name}</span>`);
  
  // Handle JSX props
  tokenized = tokenized.replace(/(\s+)([a-zA-Z0-9_$]+)(?==)/g, 
    (_, space, name) => `${space}<span class="token-prop">${name}</span>`);
  
  // Handle punctuation
  tokenized = tokenized.replace(/(\{|\}|\[|\]|\(|\))/g, 
    match => `<span class="token-punctuation">${match}</span>`);
  
  return tokenized;
};

export default function Hero() {
  const [activeTab, setActiveTab] = useState('portfolio.tsx');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [activeSidebar, setActiveSidebar] = useState('explorer');
  const [terminalOpen, setTerminalOpen] = useState(true);
  
  

  const fullText = fileContents[activeTab] || fileContents['portfolio.tsx'];
  
  // Explorer folders
  const explorerItems: ExplorerItem[] = [
    { name: 'src', type: 'folder', isOpen: true },
    { name: 'components', type: 'folder', isOpen: true, parent: 'src' },
    { name: 'styles', type: 'folder', isOpen: false, parent: 'src' },
    { name: 'About.tsx', type: 'file', parent: 'components', section: 'about' },
    { name: 'Experience.tsx', type: 'file', parent: 'components', section: 'experience' },
    { name: 'Projects.tsx', type: 'file', parent: 'components', section: 'projects' },
    { name: 'Skills.tsx', type: 'file', parent: 'components', section: 'skills' },
    { name: 'Passions.tsx', type: 'file', parent: 'components', section: 'passions' },
    { name: 'Contact.tsx', type: 'file', parent: 'components', section: 'contact' },
    { name: 'Navbar.tsx', type: 'file', parent: 'components', section: 'navbar' },
    { name: 'index.ts', type: 'file', parent: 'src' },
    { name: 'package.json', type: 'file' },
    { name: 'tsconfig.json', type: 'file' },
    { name: 'README.md', type: 'file' },
  ];

  // Activity bar items with color coding
  const activityItems: ActivityItem[] = [
    { icon: <FolderOpen size={22} />, tooltip: 'Explorer', id: 'explorer', color: 'text-blue-500' },
    { icon: <Search size={22} />, tooltip: 'Search', id: 'search', color: 'text-white' },
    { icon: <GitBranch size={22} />, tooltip: 'Source Control', id: 'git', color: 'text-blue-500' },
    { icon: <Terminal size={22} />, tooltip: 'Terminal', id: 'terminal', color: 'text-white' },
    { icon: <Settings size={22} />, tooltip: 'Settings', id: 'settings', color: 'text-gray-400' },
  ];

  // Status bar items
  const statusItems: StatusItem[] = [
    { content: <><GitBranch size={14} className="mr-1 text-blue-500" /> main</>, tooltip: 'Current Branch' },
    { content: 'TypeScript React', tooltip: 'Language Mode' },
    { content: 'UTF-8', tooltip: 'Encoding' },
    { content: 'Tab Size: 2', tooltip: 'Tab Size' },
  ];

  // Function to scroll to section when file is clicked
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle file click in explorer
  const handleFileClick = (item: { name: string; section?: string }) => {
    setActiveTab(item.name);
    // Only scroll to section if it's not About.tsx
    if (item.section && item.name !== 'About.tsx') {
      scrollToSection(item.section);
    }
    setTypedText(''); // Reset typed text when switching files
  };

  useEffect(() => {
    setCursorVisible(true);
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [activeTab]);

  // Preview content based on active tab
  const renderPreviewContent = () => {
    switch (activeTab) {
      case 'About.tsx':
        return (
          <div className="p-4 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <Code size={18} className="mr-2 text-green-500" />
              About Me
            </h2>
            
            <div className="w-full bg-black rounded p-3 mb-4 text-sm border border-white/30">
              <p className="text-white mb-3 leading-relaxed">
                I am a pre-final year student pursuing a B.Tech in Manufacturing Science and Engineering at 
                <span className="text-green-500"> Indian Institute of Technology, Kharagpur</span>.
              </p>
              <p className="text-white mb-3 leading-relaxed">
                My expertise lies in <span className="text-green-500">Full Stack Development</span>, with advanced frameworks and technologies including 
                MongoDB, Supabase, Firebase, React, TypeScript, NextJS, and backend 
                frameworks like Node, Express, FastAPI, and Django.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <ChevronRight size={16} className="text-green-500 mr-1" />
                  Education
                </h3>
                <ul className="space-y-1 text-xs border-l-2 border-green-500/50 pl-2">
                  <li className="text-white">
                    <span className="text-green-500">2022-2026:</span> B.Tech IIT Kharagpur
                  </li>
                  <li className="text-white">
                    <span className="text-green-500">2020-2022:</span> HSC
                  </li>
                  <li className="text-white">
                    <span className="text-green-500">2014-2020:</span> ICSE
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <ChevronRight size={16} className="text-green-500 mr-1" />
                  Positions
                </h3>
                <ul className="space-y-1 text-xs border-l-2 border-green-500/50 pl-2">
                  <li className="text-white">Executive Head @ KDAG</li>
                  <li className="text-white">AI and Metaverse Head @ KodeinKGP</li>
                  <li className="text-white">General Secretary Technology @ HJB Hall</li>
                  <li className="text-white">AI Head @ 10X Club</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-auto pt-2">
              <div className="flex items-center px-3 py-2 bg-black border border-white/30 rounded">
                <Music size={18} className="text-green-500 mr-2" />
                <p className="text-white text-xs">
                  Outside of technology, I have a passion for music and play multiple instruments including the guitar, piano, 
                  drums, and harmonium. My musical talents have been recognized at state and national level competitions.
                </p>
              </div>
            </div>
          </div>
        );
      case 'Navbar.tsx':
        return (
          <div className="p-4 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <Code size={18} className="mr-2 text-green-500" />
              Navigation Component
            </h2>
            
            <div className="space-y-3">
              <div className="bg-black p-3 rounded border border-white/30">
                <h3 className="font-semibold text-white flex items-center">
                  <ChevronRight size={16} className="text-green-500 mr-1" />
                  Navigation Items
                </h3>
                <ul className="mt-2 space-y-1">
                  {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Passions', 'Contact'].map((item, idx) => (
                    <li key={idx} className="text-xs text-white flex items-center">
                      <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 bg-green-500`}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-auto pt-4 text-center">
              <a 
                href="#home" 
                className="text-xs bg-black text-white hover:bg-green-500 hover:text-black px-3 py-1 rounded border border-green-500 transition-colors"
              >
                View Navigation In Action
              </a>
            </div>
          </div>
        );
      case 'Skills.tsx':
        return (
          <div className="p-4 flex flex-col">
            <h2 className="text-xl font-bold text-white mb-3 flex items-center">
              <Code size={18} className="mr-2 text-green-500" />
              Skills
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-black p-3 rounded border border-white/30">
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <Code size={16} className="text-blue-500 mr-1" />
                  Frontend
                </h3>
                <div className="space-y-2">
                  {['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'].map((skill, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <span className="text-xs text-white ml-2 w-24">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-black p-3 rounded border border-white/30">
                <h3 className="text-md font-semibold mb-2 flex items-center">
                  <Server size={16} className="text-blue-500 mr-1" />
                  Backend
                </h3>
                <div className="space-y-2">
                  {['Node.js', 'Express', 'FastAPI', 'Django', 'Spring Boot'].map((skill, idx) => (
                    <div key={idx} className="flex items-center">
                      <div className="w-full bg-[#1a1a1a] rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${85 - idx * 5}%` }}></div>
                      </div>
                      <span className="text-xs text-white ml-2 w-24">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-black p-3 rounded border border-white/30">
              <h3 className="text-md font-semibold mb-2 flex items-center">
                <Database size={16} className="text-blue-500 mr-1" />
                Databases
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Redis'].map((db, idx) => (
                  <div key={idx} className="bg-[#1a1a1a] p-2 rounded text-center border border-[#323232]">
                    <span className="text-xs text-white">{db}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-4 flex flex-col items-center">
            <div className="w-36 h-36 md:w-48 md:h-48 relative mb-4 rounded-full overflow-hidden border-3 border-white">
              <Image
                src="/images/ChatGPT Image .png"
                alt="Bhavesh Pabnani"
                fill
                style={{ objectFit: 'contain' }}
                className="drop-shadow-md"
                priority
              />
            </div>
            
            <h2 className="text-xl font-bold text-white mb-1">Bhavesh Pabnani</h2>
            <p className="text-green-400 mb-3 text-center">Full Stack Developer & Machine Learning Engineer</p>
            
            <div className="w-full bg-black rounded p-3 mb-3 text-sm border border-white/30">
              <div className="grid grid-cols-2 gap-y-2 text-white">
                <div className="text-white font-semibold flex items-center">
                  <Award size={14} className="mr-1 text-green-500" /> Education:
                </div>
                <div>IIT Kharagpur</div>
                
                <div className="text-white font-semibold flex items-center">
                  <Briefcase size={14} className="mr-1 text-blue-500" /> Role:
                </div>
                <div>SDE Intern @Amazon</div>
                
                <div className="text-white font-semibold flex items-center">
                  <Cpu size={14} className="mr-1 text-blue-500" /> Research:
                </div>
                <div>CJBS, IIM Ranchi, Deakin</div>
                
                <div className="text-white font-semibold flex items-center">
                  <Heart size={14} className="mr-1 text-green-500" /> Positions:
                </div>
                <div>AI Head @10X Club by Coding Ninjas</div>
              </div>
            </div>
            
            {/* Technologies section */}
            <div className="w-full bg-black rounded p-3 mb-3 text-sm border-l-4 border border-white/30 border-l-green-500">
              <h3 className="text-md font-semibold mb-2 text-white">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Next.js', 'Node.js', 'Python', 'MongoDB', 'Firebase'].map((tech, idx) => (
                  <span key={idx} className={`px-2 py-1 bg-[#1a1a1a] text-white text-xs border border-[#323232] hover:${idx % 2 === 0 ? 'border-green-500 hover:text-green-300' : 'border-blue-500 hover:text-blue-300'} transition-colors duration-200 rounded cursor-default`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Achievements section */}
            <div className="w-full bg-black rounded p-3 mb-3 text-sm border-l-4 border border-white/30 border-l-blue-500">
              <h3 className="text-md font-semibold mb-2 text-white">Achievements</h3>
              <ul className="space-y-1 text-white text-xs">
                <li className="flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-green-500"></span>
                  <span className="text-white hover:text-green-300 transition-colors duration-200">Winner, Innovate4Swadeshi 2024 - National Hackathon</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-blue-500"></span>
                  <span className="text-white hover:text-blue-300 transition-colors duration-200">3rd Place, FinAlytics - Optima⨯Sabre</span>
                </li>
                <li className="flex items-center">
                  <span className="inline-block w-1.5 h-1.5 rounded-full mr-2 bg-green-500"></span>
                  <span className="text-white hover:text-green-300 transition-colors duration-200">1st place, St. Chavara Mega Expo-2019</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3 mt-2">
              <a
                href="#projects"
                className="bg-black hover:bg-green-500 text-white hover:text-black px-4 py-2 rounded text-sm transition-colors border border-green-500"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="bg-black hover:bg-white hover:text-black text-white px-4 py-2 rounded text-sm transition-colors border border-white/30"
              >
                Contact
              </a>
            </div>
          </div>
        );
    }
  };
  // Sidebar content based on active selection
  const renderSidebarContent = () => {
    switch (activeSidebar) {
      case 'explorer':
        return (
          <>
            <div className="p-2 text-white uppercase text-xs font-semibold tracking-wider border-b border-white/20">
              Explorer: Portfolio
            </div>
            <div className="text-white text-sm">
              <div className="px-2 py-1 hover:bg-black hover:text-white cursor-pointer flex items-center">
                <ListOrdered size={16} className="mr-1 text-blue-500" />
                <span className="select-none">OPEN EDITORS</span>
              </div>
              
              <div className="mt-2">
                <div className="px-2 py-1 hover:bg-black hover:text-white cursor-pointer flex items-center text-white">
                  <FolderOpen size={16} className="mr-1 text-blue-500" />
                  <span className="select-none">PORTFOLIO</span>
                </div>
                
                <div className="ml-2">
                  {explorerItems.map((item, idx) => {
                    if (!item.parent) {
                      return (
                        <div key={idx} className="px-2 py-1 hover:bg-black hover:text-white cursor-pointer flex items-center">
                          {item.type === 'folder' ? (
                            <FolderOpen size={16} className="mr-1 text-blue-500" />
                          ) : (
                            getFileIcon(item.name)
                          )}
                          <span className={`select-none ${item.type === 'file' && item.name === activeTab ? 'text-white' : ''}`}>
                            {item.name}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                  
                  <div className="ml-2">
                    {explorerItems
                      .filter(item => item.parent === 'src')
                      .map((item, idx) => (
                        <div key={idx} className="px-2 py-1 hover:bg-black hover:text-white cursor-pointer flex items-center">
                          {item.type === 'folder' ? (
                            <FolderOpen size={16} className="mr-1 text-blue-500" />
                          ) : (
                            getFileIcon(item.name)
                          )}
                          <span className="select-none">{item.name}</span>
                        </div>
                      ))}
                    
                    <div className="ml-2">
                      {explorerItems
                        .filter(item => item.parent === 'components')
                        .map((item, idx) => {
                          const getTextColor = (name: string) => {
                            if (name === activeTab) return 'text-blue-500';
                            return 'text-white';
                          };

                          return (
                          <div 
                            key={idx} 
                              className={`px-2 py-1 hover:bg-black hover:text-white cursor-pointer flex items-center ${
                                item.name === activeTab ? 'bg-black' : ''
                              }`}
                              onClick={() => handleFileClick(item)}
                            >
                              {getFileIcon(item.name)}
                              <span className={`select-none ${getTextColor(item.name)}`}>
                              {item.name}
                            </span>
                          </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      case 'search':
        return (
          <div className="p-4 text-white">
            <h3 className="text-white font-semibold mb-2">Search</h3>
            <div className="border border-white bg-black rounded mb-4">
              <input 
                type="text" 
                placeholder="Search in files" 
                className="w-full bg-transparent p-2 text-sm outline-none text-white"
              />
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-white italic">Try searching for:</p>
              <div className="pl-2 border-l-2 border-blue-500/30">
                <p>• Skills & Technologies</p>
                <p>• Project Experience</p>
                <p>• Contact Information</p>
              </div>
            </div>
          </div>
        );
      case 'git':
        return (
          <div className="p-4 text-white">
            <h3 className="text-white font-semibold mb-2">Source Control</h3>
            <div className="space-y-4">
              <div className="border-b border-white/20 pb-2">
                <p className="text-sm mb-1">Current Branch:</p>
                <div className="flex items-center">
                  <GitBranch size={16} className="mr-1 text-blue-500" />
                  <span className="font-mono">main</span>
                </div>
              </div>
              <div className="text-sm">
                <p className="text-white mb-2">Recent Commits:</p>
                <div className="space-y-2">
                  <div className="bg-black p-2 rounded border border-white/30">
                    <div className="flex justify-between">
                      <span>Portfolio update</span>
                      <span className="text-gray-400">3d ago</span>
                    </div>
                  </div>
                  <div className="bg-black p-2 rounded border border-white/30">
                    <div className="flex justify-between">
                      <span>Project showcase</span>
                      <span className="text-gray-400">1w ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'terminal':
        return (
          <div className="p-4 text-white">
            <h3 className="text-green font-semibold mb-2">Terminal</h3>
            <div className="bg-black p-3 rounded font-mono text-sm border border-white/30">
              <p className="text-blue-500">$ npm run portfolio</p>
              <p className="text-white mt-1">Starting development server...</p>
              <p className="text-white mt-1">Portfolio running at <span className="text-blue-500 underline">https://bhavesh-pabnani.com</span></p>
              <p className="mt-2 text-white flex items-center">
                <span className="mr-1 text-blue-500">$</span>
                <span className="inline-block w-2 h-4 bg-blue-500 animate-pulse"></span>
              </p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 text-white">
            <h3 className="text-white font-semibold mb-2">Settings</h3>
            <div className="space-y-3">
              <div className="border-b border-white/20 pb-2">
                <p className="text-sm mb-1">Theme:</p>
                <select className="bg-black text-white p-1 rounded w-full border border-white/30">
                  <option>High Contrast Black/White</option>
                  <option>Dark+ (default)</option>
                  <option>Light+</option>
                </select>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Preferences:</p>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked readOnly />
                  <span>Auto-save</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked readOnly />
                  <span>Format on save</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" checked readOnly />
                  <span>Terminal at bottom</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Get file icon based on file extension
  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.tsx') || fileName.endsWith('.ts')) {
  return (
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          <div className="text-blue-500 text-xs font-bold">TS</div>
        </div>
      );
    } else if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
      return (
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          <div className="text-green-500 text-xs font-bold">JS</div>
        </div>
      );
    } else if (fileName.endsWith('.json')) {
      return <FileJson size={16} className="mr-1 text-yellow-500" />;
    } else if (fileName.endsWith('.md')) {
      return <FileText size={16} className="mr-1 text-gray-400" />;
    } else if (fileName.endsWith('.css') || fileName.endsWith('.scss')) {
      return (
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          <div className="text-blue-400 text-xs font-bold">CSS</div>
        </div>
      );
    } else if (fileName.endsWith('.html')) {
      return (
        <div className="w-4 h-4 mr-1 flex items-center justify-center">
          <div className="text-green-400 text-xs font-bold">HTML</div>
        </div>
      );
    } else {
      return <FileIcon size={16} className="mr-1 text-gray-400" />;
    }
  };

  return (
    <section id="home" className="w-full bg-black overflow-hidden">
      {/* Add VS Code scrollbar styles */}
      <style jsx global>{vsCodeScrollbarStyles}</style>
      
      {/* VS Code Layout with Integrated Navbar */}
      <div className="h-[calc(100vh-0rem)] max-h-[calc(100vh-0rem)] flex flex-col border border-white shadow-xl">
        {/* VS Code Top Bar / Navbar */}
        <div className="h-10 bg-black flex items-center justify-between px-4 border-b border-[#323232]">
          {/* Left side - Logo and menu items */}
          <div className="flex items-center">
            <div className="mr-6 text-white font-semibold">BP</div>
            <div className="hidden md:flex space-x-4 text-white text-sm">
              <a href="#" className="hover:text-green-500">File</a>
              <a href="#" className="hover:text-green-500">Edit</a>
              <a href="#" className="hover:text-green-500">View</a>
              <a href="#" className="hover:text-green-500">Go</a>
              <a href="#" className="hover:text-green-500">Run</a>
            </div>
          </div>
          
          {/* Center - File name */}
          <div className="text-white text-sm hidden sm:block">
            {activeTab} - Bhavesh Pabnani
          </div>
          
          {/* Right side - Social links */}
          <div className="flex space-x-4 text-white">
            <a href="https://github.com/bhaveshpabnani" target="_blank" className="hover:text-green-500">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" className="inline-block">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/bhavesh-pabnani-97a033250/" target="_blank" className="hover:text-green-500">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" className="inline-block">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href="https://x.com/bhaveshpabnani" target="_blank" className="hover:text-green-500">
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" className="inline-block">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
              </svg>
            </a>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1 flex min-h-0 overflow-hidden">
          {/* Activity Bar */}
          <div className="w-12 bg-black flex flex-col items-center py-2 border-r border-[#323232]">
            {activityItems.map((item, idx) => (
              <div 
                key={idx} 
                className={`w-full py-3 flex justify-center hover:bg-[#1a1a1a] hover:text-white cursor-pointer group relative 
                  ${activeSidebar === item.id ? item.color : 'text-white'}`}
                title={item.tooltip}
                onClick={() => setActiveSidebar(item.id)}
              >
                {activeSidebar === item.id && (
                  <div className={`absolute left-0 w-[2px] h-full ${activeSidebar === item.id && item.id === 'explorer' || activeSidebar === item.id && item.id === 'git' ? 'bg-green-500' : 'bg-white'}`}></div>
                )}
                {item.icon}
                <span className="absolute left-12 px-2 py-1 bg-black text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-10 border border-[#323232]">
                  {item.tooltip}
                </span>
              </div>
            ))}
          </div>
          
          {/* Explorer Panel */}
          <div className="w-64 bg-black border-r border-[#323232] hidden md:block overflow-y-auto vs-scrollbar">
            {renderSidebarContent()}
          </div>
          
          {/* Editor Area */}
          <div className="flex-1 bg-black flex flex-col min-h-0 overflow-hidden">
            {/* Tabs */}
            <div className="bg-black flex text-white border-b border-[#323232] overflow-x-auto vs-scrollbar">
              <div 
                className={`px-3 py-2 flex items-center ${activeTab === 'portfolio.tsx' ? 'bg-black text-white border-t border-l border-r border-white' : 'hover:bg-[#1a1a1a]'}`} 
                onClick={() => setActiveTab('portfolio.tsx')}
              >
                {getFileIcon('portfolio.tsx')}
                <span className="select-none text-sm">portfolio.tsx</span>
                <span className="ml-2 text-lg leading-none cursor-pointer hover:text-green-400">&times;</span>
              </div>
              
              {activeTab === 'About.tsx' && (
                <div 
                  className="px-3 py-2 flex items-center bg-black text-white border-t border-l border-r border-white"
                >
                  {getFileIcon('About.tsx')}
                  <span className="select-none text-sm">About.tsx</span>
                  <span className="ml-2 text-lg leading-none cursor-pointer hover:text-green-400" onClick={() => setActiveTab('portfolio.tsx')}>&times;</span>
                </div>
              )}
              
              {activeTab === 'Navbar.tsx' && (
                <div 
                  className="px-3 py-2 flex items-center bg-black text-white border-t border-l border-r border-white"
                >
                  {getFileIcon('Navbar.tsx')}
                  <span className="select-none text-sm">Navbar.tsx</span>
                  <span className="ml-2 text-lg leading-none cursor-pointer hover:text-green-400" onClick={() => setActiveTab('portfolio.tsx')}>&times;</span>
                </div>
              )}
              
              {activeTab === 'Skills.tsx' && (
                <div 
                  className="px-3 py-2 flex items-center bg-black text-white border-t border-l border-r border-white"
                >
                  {getFileIcon('Skills.tsx')}
                  <span className="select-none text-sm">Skills.tsx</span>
                  <span className="ml-2 text-lg leading-none cursor-pointer hover:text-green-400" onClick={() => setActiveTab('portfolio.tsx')}>&times;</span>
                </div>
              )}
              
              {activeTab !== 'portfolio.tsx' && activeTab !== 'About.tsx' && activeTab !== 'Navbar.tsx' && activeTab !== 'Skills.tsx' && (
                <div 
                  className="px-3 py-2 flex items-center bg-black text-white border-t border-l border-r border-white"
                >
                  {getFileIcon(activeTab)}
                  <span className="select-none text-sm">{activeTab}</span>
                  <span className="ml-2 text-lg leading-none cursor-pointer hover:text-green-400" onClick={() => setActiveTab('portfolio.tsx')}>&times;</span>
                </div>
              )}
            </div>
            
            {/* Editor Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden p-2 min-h-0">
              {/* Code Area */}
              <div className="flex-1 font-mono text-sm text-white md:h-full overflow-hidden mb-4 md:mb-0 bg-black">
                {/* Line numbers and code */}
                <div className="relative h-full">
                  {/* Single scrollable container */}
                  <div className="overflow-y-auto h-full vs-scrollbar scroll-smooth" style={{ scrollbarGutter: 'stable' }}>
                <div className="flex">
                  {/* Line numbers */}
                      <div className="mr-4 text-right text-[#858585] select-none px-2 bg-black w-10 flex-shrink-0">
                        {fullText.split('\n').map((_, i: number) => (
                          <div key={i} className="code-line-number px-2">{i + 1}</div>
                    ))}
                  </div>
                  
                  {/* Code with syntax highlighting */}
                  <div className="flex-1">
                        <pre className="whitespace-pre text-white py-0">
                          <code 
                            className="code-content block" 
                            dangerouslySetInnerHTML={{ __html: fullText }}
                          />
                          {cursorVisible && (
                            <span className="inline-block w-[2px] h-[14px] bg-white ml-[1px] animate-pulse"></span>
                          )}
                        </pre>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Profile Area */}
              <motion.div 
                className="md:w-[520px] w-full bg-black rounded overflow-hidden md:ml-4 border border-white/30 h-[500px] md:h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-black text-white px-3 py-2 text-sm font-semibold flex items-center justify-between border-b border-white/30">
                  <div className="flex items-center">
                    <Terminal size={16} className="mr-2 text-white" />
                  Developer Preview
                  </div>
                  <a
                    href="/docs/Bhavesh_Pabnani_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-black hover:bg-green-500 text-white hover:text-black px-2 py-1 rounded text-xs font-medium transition-colors border border-green-500 gap-1.5"
                  >
                    <Download size={12} className="text-white" />
                    CV
                  </a>
                </div>
                <div className="h-[calc(100%-32px)] overflow-y-auto vs-scrollbar">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderPreviewContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
            
            {/* Terminal - Now always visible */}
            <div className="h-30 bg-black border-t border-white/20">
              <div className="bg-black text-white flex justify-between items-center px-3 py-1 border-b border-white/20">
                  <div className="flex items-center">
                  <Terminal size={14} className="text-white mr-1" />
                    <span className="text-xs">TERMINAL</span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-white mr-2">bash</span>
                  <span className="text-xs text-white">portfolio-dev</span>
                </div>
              </div>
              <div className="p-2 font-mono text-xs text-white h-[calc(100%-28px)] overflow-auto vs-scrollbar">
                <p className="text-white">$ npm run dev</p>
                <p className="text-white mt-1"><span className='text-green'>✓ </span> Ready in 8.2s</p>
                <p className="text-white mt-1">Welcome to <span className="text-green-400 font-bold">Bhavesh Pabnani's</span> interactive CV! 🚀</p>
                <p className="text-white mt-1">Scroll down to experience the <span className="text-blue-400">portfolio!</span></p>
                <p className="text-white mt-1">Click on any file in the explorer to view its content</p>
                <p className="mt-2 text-white flex items-center">
                  <span className="mr-1 text-white">$</span>
                  <span className="inline-block w-2 h-4 bg-green-500 animate-pulse"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-black text-white flex items-center text-xs border-t border-white/20">
          <div className="flex-1 flex items-center">
            {statusItems.map((item, idx) => (
              <div 
                key={idx} 
                className="px-2 flex items-center hover:bg-[#1a1a1a] hover:text-white h-full cursor-default"
                title={item.tooltip}
              >
                {typeof item.content === 'string' ? item.content : item.content}
              </div>
            ))}
          </div>
          <div className="px-2 flex items-center">
            <Code size={14} className="mr-1 text-white" /> Ready
          </div>
        </div>
      </div>
      
      {/* Navigation for scrolling */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black backdrop-blur-sm border-b border-white/20 hidden md:block transform translate-y-[-100%] transition-transform duration-300" id="navbar-sticky">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <a href="#home" className="text-xl font-bold text-white flex items-center">
            <Code className="text-green-500 mr-2" size={20} />
            <span className="text-green-500">B</span>havesh
          </a>

          <ul className="flex space-x-6">
            {[
              { title: 'Home', href: '#home' },
              { title: 'About', href: '#about' },
              { title: 'Experience', href: '#experience' },
              { title: 'Projects', href: '#projects' },
              { title: 'Skills', href: '#skills' },
              { title: 'Contact', href: '#contact' }
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className="text-sm text-white hover:text-green-500 transition-colors duration-300 px-2 py-1 rounded"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="/docs/Bhavesh_Pabnani_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black hover:bg-green-500 text-white hover:text-black px-3 py-1.5 rounded text-sm font-medium transition-colors border border-green-500 gap-1.5"
          >
            <Download size={14} />
            CV
          </a>
        </div>
      </div>
      
      <motion.div
        className="container mx-auto px-3 mt-4 text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
      >
        <p className="text-sm mb-1">Scroll down to explore more</p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-6 mx-auto text-green-500"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}