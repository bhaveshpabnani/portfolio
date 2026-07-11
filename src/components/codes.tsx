// File content for different tabs
const fileContents: Record<string, string> = {
    'portfolio.tsx': `<span class="text-blue-500">import</span> <span class="text-teal-400">React</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'react'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Head</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'next/head'</span>;
<span class="text-blue-500">import</span> <span class="text-white">{ motion }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'framer-motion'</span>;

<span class="text-green-400">// Components</span>
<span class="text-blue-500">import</span> <span class="text-white">Navbar</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Navbar'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Hero</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Hero'</span>;
<span class="text-blue-500">import</span> <span class="text-white">About</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/About'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Experience</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Experience'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Projects</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Projects'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Skills</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Skills'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Contact</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'./components/Contact'</span>;

<span class="text-blue-500">const</span> <span class="text-yellow-300">Home</span> = <span class="text-white">()</span> => <span class="text-white">{</span>
  <span class="text-blue-500">return</span> <span class="text-white">(</span>
    <span class="text-teal-400">&lt;div</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"bg-black text-white"</span><span class="text-teal-400">&gt;</span>
      <span class="text-teal-400">&lt;Head&gt;</span>
        <span class="text-teal-400">&lt;title&gt;</span><span class="text-white">Bhavesh Pabnani | Portfolio</span><span class="text-teal-400">&lt;/title&gt;</span>
        <span class="text-teal-400">&lt;meta</span> <span class="text-sky-300">name</span>=<span class="text-orange-300">"description"</span> <span class="text-sky-300">content</span>=<span class="text-orange-300">"AI agents, cloud systems, voice AI and product engineering"</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;link</span> <span class="text-sky-300">rel</span>=<span class="text-orange-300">"icon"</span> <span class="text-sky-300">href</span>=<span class="text-orange-300">"/favicon.ico"</span> <span class="text-teal-400">/&gt;</span>
      <span class="text-teal-400">&lt;/Head&gt;</span>

      <span class="text-teal-400">&lt;main&gt;</span>
        <span class="text-teal-400">&lt;Hero</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;About</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;Experience</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;Projects</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;Skills</span> <span class="text-teal-400">/&gt;</span>
        <span class="text-teal-400">&lt;Contact</span> <span class="text-teal-400">/&gt;</span>
      <span class="text-teal-400">&lt;/main&gt;</span>
    <span class="text-teal-400">&lt;/div&gt;</span>
  <span class="text-white">)</span>;
<span class="text-white">}</span>;

<span class="text-blue-500">export</span> <span class="text-blue-500">default</span> <span class="text-white">Home</span>;`,
    'About.tsx': `<span class="text-blue-500">import</span> <span class="text-white">{ useRef }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'react'</span>;
<span class="text-blue-500">import</span> <span class="text-white">{ motion, useInView }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'framer-motion'</span>;
<span class="text-blue-500">import</span> <span class="text-white">Image</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'next/image'</span>;

<span class="text-blue-500">const</span> <span class="text-yellow-300">About</span> = <span class="text-white">()</span> => <span class="text-white">{</span>
  <span class="text-blue-500">const</span> <span class="text-white">ref</span> = <span class="text-yellow-300">useRef</span><span class="text-white">(</span><span class="text-purple-400">null</span><span class="text-white">)</span>;
  <span class="text-blue-500">const</span> <span class="text-white">isInView</span> = <span class="text-yellow-300">useInView</span><span class="text-white">(</span><span class="text-white">ref</span><span class="text-white">,</span> <span class="text-white">{ once: </span><span class="text-purple-400">true</span><span class="text-white">, amount: </span><span class="text-lime-400">0.3</span> <span class="text-white">}</span><span class="text-white">)</span>;
  
  <span class="text-blue-500">const</span> <span class="text-white">variants</span> = <span class="text-white">{</span>
    <span class="text-white">hidden:</span> <span class="text-white">{ opacity: </span><span class="text-lime-400">0</span><span class="text-white">, y: </span><span class="text-lime-400">50</span> <span class="text-white">},</span>
    <span class="text-white">visible:</span> <span class="text-white">{ opacity: </span><span class="text-lime-400">1</span><span class="text-white">, y: </span><span class="text-lime-400">0</span><span class="text-white">, transition: { duration: </span><span class="text-lime-400">0.8</span> <span class="text-white">} }</span>
  <span class="text-white">};</span>

  <span class="text-blue-500">return</span> <span class="text-white">(</span>
    <span class="text-teal-400">&lt;section</span> <span class="text-sky-300">id</span>=<span class="text-orange-300">"about"</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"w-full py-20 md:py-32 bg-black relative"</span><span class="text-teal-400">&gt;</span>
      <span class="text-teal-400">&lt;div</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"container mx-auto px-6"</span><span class="text-teal-400">&gt;</span>
        <span class="text-teal-400">&lt;motion.div</span> 
          <span class="text-sky-300">ref</span>=<span class="text-white">{ref}</span>
          <span class="text-sky-300">initial</span>=<span class="text-orange-300">"hidden"</span>
          <span class="text-sky-300">animate</span>=<span class="text-white">{isInView ? </span><span class="text-orange-300">"visible"</span><span class="text-white"> : </span><span class="text-orange-300">"hidden"</span><span class="text-white">}</span>
          <span class="text-sky-300">variants</span>=<span class="text-white">{variants}</span>
          <span class="text-sky-300">className</span>=<span class="text-orange-300">"grid grid-cols-1 md:grid-cols-2 gap-10"</span>
        <span class="text-teal-400">&gt;</span>
          <span class="text-teal-400">&lt;div&gt;</span>
            <span class="text-teal-400">&lt;h2</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"text-3xl font-bold mb-6"</span><span class="text-teal-400">&gt;</span><span class="text-white">About Me</span><span class="text-teal-400">&lt;/h2&gt;</span>
            <span class="text-teal-400">&lt;p</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"mb-4"</span><span class="text-teal-400">&gt;</span>
              <span class="text-white">I am a software engineer and builder at Indian Institute of Technology, Kharagpur.</span>
            <span class="text-teal-400">&lt;/p&gt;</span>
            <span class="text-teal-400">&lt;p</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"mb-6"</span><span class="text-teal-400">&gt;</span>
              <span class="text-white">My work spans AI agents, cloud systems, voice AI, finance workflows, </span>
              <span class="text-white">Next.js, TypeScript, FastAPI, Docker, Redis, Supabase and AWS.</span>
            <span class="text-teal-400">&lt;/p&gt;</span>
          <span class="text-teal-400">&lt;/div&gt;</span>
        <span class="text-teal-400">&lt;/motion.div&gt;</span>
      <span class="text-teal-400">&lt;/div&gt;</span>
    <span class="text-teal-400">&lt;/section&gt;</span>
  <span class="text-white">)</span>;
<span class="text-white">}</span>;

<span class="text-blue-500">export</span> <span class="text-blue-500">default</span> <span class="text-white">About</span>;`,
    'Navbar.tsx': `'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, DownloadCloud } from 'lucide-react';

const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Experience', href: '#experience' },
  { title: 'Projects', href: '#projects' },
  { title: 'Skills', href: '#skills' },
  { title: 'Contact', href: '#contact' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={\`fixed top-0 w-full z-50 \${scrolled ? "bg-black/95" : "bg-black"}\`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="text-xl font-bold flex items-center">
          <Code className="text-blue-500 mr-2" size={20} />
          <span className="text-blue-500">B</span>havesh
        </a>
        
        <div className="hidden md:flex space-x-6">
          {navItems.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className="text-white hover:text-blue-500 transition-all"
            >
              {item.title}
            </a>
          ))}
          
          <a
            href="/docs/Bhavesh_Pabnani_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center bg-black text-white hover:bg-white hover:text-black px-3 py-1 rounded border border-white"
          >
            <DownloadCloud size={16} className="mr-1" />
            CV
          </a>
        </div>
        
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
    </motion.nav>
  );
}`,
    'Skills.tsx': `import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Next.js", level: 80 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 75 }
    ]
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "FastAPI", level: 75 },
      { name: "Django", level: 70 },
      { name: "Spring Boot", level: 65 }
    ]
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "MySQL", level: 75 },
      { name: "Supabase", level: 80 },
      { name: "Firebase", level: 85 }
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-black p-6 rounded-lg border border-white"
            >
              <h3 className="text-xl font-semibold mb-4">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: \`\${skill.level}%\` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;`,
    'Contact.tsx': `<span class="text-blue-500">import</span> <span class="text-white">{ useRef, useState }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'react'</span>;
<span class="text-blue-500">import</span> <span class="text-white">{ motion, useInView }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'framer-motion'</span>;
<span class="text-blue-500">import</span> <span class="text-white">{ createClient }</span> <span class="text-blue-500">from</span> <span class="text-orange-300">'@supabase/supabase-js'</span>;

<span class="text-green-400">// Initialize Supabase client</span>
<span class="text-blue-500">const</span> <span class="text-white">supabaseUrl</span> = <span class="text-orange-300">'https://your-project-url.supabase.co'</span>;
<span class="text-blue-500">const</span> <span class="text-white">supabaseKey</span> = <span class="text-white">process.env.NEXT_PUBLIC_SUPABASE_KEY;</span>
<span class="text-blue-500">const</span> <span class="text-white">supabase</span> = <span class="text-yellow-300">createClient</span><span class="text-white">(</span><span class="text-white">supabaseUrl</span><span class="text-white">, </span><span class="text-white">supabaseKey </span><span class="text-blue-500">as</span><span class="text-teal-400"> string</span><span class="text-white">)</span>;

<span class="text-blue-500">const</span> <span class="text-yellow-300">Contact</span> = <span class="text-white">()</span> => <span class="text-white">{</span>
  <span class="text-blue-500">const</span> <span class="text-white">ref</span> = <span class="text-yellow-300">useRef</span><span class="text-white">(</span><span class="text-purple-400">null</span><span class="text-white">)</span>;
  <span class="text-blue-500">const</span> <span class="text-white">isInView</span> = <span class="text-yellow-300">useInView</span><span class="text-white">(</span><span class="text-white">ref</span><span class="text-white">, { once: </span><span class="text-purple-400">true</span><span class="text-white">, amount: </span><span class="text-lime-400">0.1</span> <span class="text-white">}</span><span class="text-white">)</span>;
  <span class="text-blue-500">const</span> <span class="text-white">[formState, setFormState]</span> = <span class="text-yellow-300">useState</span><span class="text-white">({</span>
    <span class="text-white">name: </span><span class="text-orange-300">''</span><span class="text-white">,</span>
    <span class="text-white">email: </span><span class="text-orange-300">''</span><span class="text-white">,</span>
    <span class="text-white">message: </span><span class="text-orange-300">''</span><span class="text-white">,</span>
  <span class="text-white">});</span>
  <span class="text-blue-500">const</span> <span class="text-white">[loading, setLoading]</span> = <span class="text-yellow-300">useState</span><span class="text-white">(</span><span class="text-purple-400">false</span><span class="text-white">);</span>
  <span class="text-blue-500">const</span> <span class="text-white">[formStatus, setFormStatus]</span> = <span class="text-yellow-300">useState</span><span class="text-white">({ </span>
    <span class="text-white">type: </span><span class="text-orange-300">''</span><span class="text-white">, </span>
    <span class="text-white">message: </span><span class="text-orange-300">''</span><span class="text-white"> </span>
  <span class="text-white">});</span>

  <span class="text-blue-500">const</span> <span class="text-yellow-300">handleChange</span> = <span class="text-white">(e)</span> => <span class="text-white">{</span>
    <span class="text-blue-500">const</span> <span class="text-white">{ name, value }</span> = <span class="text-white">e.target;</span>
    <span class="text-yellow-300">setFormState</span><span class="text-white">((prev) => ({ ...prev, [name]: value }));</span>
  <span class="text-white">};</span>

  <span class="text-blue-500">const</span> <span class="text-yellow-300">handleSubmit</span> = <span class="text-blue-500">async</span> <span class="text-white">(e)</span> => <span class="text-white">{</span>
    <span class="text-white">e.preventDefault();</span>
    <span class="text-yellow-300">setLoading</span><span class="text-white">(</span><span class="text-purple-400">true</span><span class="text-white">);</span>
    
    <span class="text-blue-500">try</span> <span class="text-white">{</span>
      <span class="text-green-400">// Insert the form data into Supabase</span>
      <span class="text-blue-500">const</span> <span class="text-white">{ data, error }</span> = <span class="text-blue-500">await</span> <span class="text-white">supabase</span>
        <span class="text-white">.from(</span><span class="text-orange-300">'contact_submissions'</span><span class="text-white">)</span>
        <span class="text-white">.insert([</span>
          <span class="text-white">{ </span>
            <span class="text-white">name: formState.name,</span>
            <span class="text-white">email: formState.email,</span>
            <span class="text-white">message: formState.message</span>
          <span class="text-white">}</span>
        <span class="text-white">]);</span>
        
      <span class="text-blue-500">if</span> <span class="text-white">(error) </span><span class="text-blue-500">throw</span><span class="text-white"> error;</span>
      
      <span class="text-yellow-300">setFormStatus</span><span class="text-white">({</span>
        <span class="text-white">type: </span><span class="text-orange-300">'success'</span><span class="text-white">,</span>
        <span class="text-white">message: </span><span class="text-orange-300">'Thank you for your message! I will get back to you soon.'</span>
      <span class="text-white">});</span>
      
      <span class="text-green-400">// Reset form</span>
      <span class="text-yellow-300">setFormState</span><span class="text-white">({ name: </span><span class="text-orange-300">''</span><span class="text-white">, email: </span><span class="text-orange-300">''</span><span class="text-white">, message: </span><span class="text-orange-300">''</span><span class="text-white"> });</span>
    <span class="text-white">} </span><span class="text-blue-500">catch</span><span class="text-white"> (error) {</span>
      <span class="text-yellow-300">console.error</span><span class="text-white">(</span><span class="text-orange-300">'Error submitting form:'</span><span class="text-white">, error);</span>
      <span class="text-yellow-300">setFormStatus</span><span class="text-white">({</span>
        <span class="text-white">type: </span><span class="text-orange-300">'error'</span><span class="text-white">,</span>
        <span class="text-white">message: </span><span class="text-orange-300">'Something went wrong. Please try again later.'</span>
      <span class="text-white">});</span>
    <span class="text-white">} </span><span class="text-blue-500">finally</span><span class="text-white"> {</span>
      <span class="text-yellow-300">setLoading</span><span class="text-white">(</span><span class="text-purple-400">false</span><span class="text-white">);</span>
    <span class="text-white">}</span>
  <span class="text-white">};</span>

  <span class="text-blue-500">return</span> <span class="text-white">(</span>
    <span class="text-teal-400">&lt;section</span>
      <span class="text-sky-300">id</span>=<span class="text-orange-300">"contact"</span>
      <span class="text-sky-300">ref</span>=<span class="text-white">{ref}</span>
      <span class="text-sky-300">className</span>=<span class="text-orange-300">"w-full py-20 bg-black relative"</span>
    <span class="text-teal-400">&gt;</span>
      <span class="text-teal-400">&lt;div</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"container mx-auto px-6"</span><span class="text-teal-400">&gt;</span>
        <span class="text-teal-400">&lt;h2</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"text-3xl font-bold mb-8 text-center"</span><span class="text-teal-400">&gt;</span><span class="text-white">Get In Touch</span><span class="text-teal-400">&lt;/h2&gt;</span>
        <span class="text-teal-400">&lt;form</span> <span class="text-sky-300">onSubmit</span>=<span class="text-white">{handleSubmit}</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"max-w-lg mx-auto"</span><span class="text-teal-400">&gt;</span>
          <span class="text-teal-400">&lt;div</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"mb-4"</span><span class="text-teal-400">&gt;</span>
            <span class="text-teal-400">&lt;label</span> <span class="text-sky-300">htmlFor</span>=<span class="text-orange-300">"name"</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"block mb-2"</span><span class="text-teal-400">&gt;</span><span class="text-white">Name</span><span class="text-teal-400">&lt;/label&gt;</span>
            <span class="text-teal-400">&lt;input</span>
              <span class="text-sky-300">type</span>=<span class="text-orange-300">"text"</span>
              <span class="text-sky-300">id</span>=<span class="text-orange-300">"name"</span>
              <span class="text-sky-300">name</span>=<span class="text-orange-300">"name"</span>
              <span class="text-sky-300">value</span>=<span class="text-white">{formState.name}</span>
              <span class="text-sky-300">onChange</span>=<span class="text-white">{handleChange}</span>
              <span class="text-sky-300">required</span>
              <span class="text-sky-300">className</span>=<span class="text-orange-300">"w-full px-4 py-2 bg-black border border-white/30 rounded"</span>
            <span class="text-teal-400">/&gt;</span>
          <span class="text-teal-400">&lt;/div&gt;</span>
          
          <span class="text-teal-400">&lt;div</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"mb-4"</span><span class="text-teal-400">&gt;</span>
            <span class="text-teal-400">&lt;label</span> <span class="text-sky-300">htmlFor</span>=<span class="text-orange-300">"email"</span> <span class="text-sky-300">className</span>=<span class="text-orange-300">"block mb-2"</span><span class="text-teal-400">&gt;</span><span class="text-white">Email</span><span class="text-teal-400">&lt;/label&gt;</span>
            <span class="text-teal-400">&lt;input</span>
              <span class="text-sky-300">type</span>=<span class="text-orange-300">"email"</span>
              <span class="text-sky-300">id</span>=<span class="text-orange-300">"email"</span>
              <span class="text-sky-300">name</span>=<span class="text-orange-300">"email"</span>
              <span class="text-sky-300">value</span>=<span class="text-white">{formState.email}</span>
              <span class="text-sky-300">onChange</span>=<span class="text-white">{handleChange}</span>
              <span class="text-sky-300">required</span>
              <span class="text-sky-300">className</span>=<span class="text-orange-300">"w-full px-4 py-2 bg-black border border-white/30 rounded"</span>
            <span class="text-teal-400">/&gt;</span>
          <span class="text-teal-400">&lt;/div&gt;</span>
          
          <span class="text-teal-400">&lt;button</span> 
            <span class="text-sky-300">type</span>=<span class="text-orange-300">"submit"</span>
            <span class="text-sky-300">disabled</span>=<span class="text-white">{loading}</span>
            <span class="text-sky-300">className</span>=<span class="text-orange-300">"mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"</span>
          <span class="text-teal-400">&gt;</span>
            <span class="text-white">{loading ? 'Sending...' : 'Send Message'}</span>
          <span class="text-teal-400">&lt;/button&gt;</span>
        <span class="text-teal-400">&lt;/form&gt;</span>
      <span class="text-teal-400">&lt;/div&gt;</span>
    <span class="text-teal-400">&lt;/section&gt;</span>
  <span class="text-white">);</span>
<span class="text-white">};</span>

<span class="text-blue-500">export</span> <span class="text-blue-500">default</span> <span class="text-white">Contact;</span>`,
  };

export default fileContents;
