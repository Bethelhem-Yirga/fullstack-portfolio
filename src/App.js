import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { ReactTyped } from 'react-typed'; // Changed this line
import emailjs from '@emailjs/browser';
import { GitHubCalendar } from 'react-github-calendar';
import { 
  FaSun, FaMoon, FaDownload, FaGithub, FaLinkedin, FaEnvelope, 
 FaCode, FaServer, FaDatabase, FaCloud,
  FaArrowUp, FaHeart, FaStar, FaBriefcase,
  FaLaptopCode, FaUsers, FaRocket, FaTools, FaPaintBrush
} from 'react-icons/fa';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className="App">
      <motion.div className="progress-bar" style={{ scaleX }} />
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Stats />
      <GitHubContributions /> 
      <Contact />
      <Footer />
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            className="scroll-top"
            onClick={scrollToTop}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <motion.div 
        className="logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {'<Bety/>'}
      </motion.div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <motion.a
            key={item.name}
            href={item.href}
            className={activeSection === item.name.toLowerCase() ? 'active' : ''}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.name}
          </motion.a>
        ))}
      </div>

      <div className="nav-actions">
        <motion.button 
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </motion.button>
        <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </motion.nav>
  );
};

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const downloadResume = () => {
    alert("Resume download - Add your PDF to public folder");
  };

  const socialLinks = [
    { icon: <FaGithub />, url: "https://github.com/Bethelhem-Yirga", color: "#333" },
    { icon: <FaLinkedin />, url: "https://www.linkedin.com/in/bethelhem-yirga", color: "#0077b5" },
    { icon: <FaEnvelope />, url: "mailto:bethelhemyirga3@gmail.com", color: "#1DA1F2" },
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <div className="gradient-bg"></div>
        <div className="animated-shapes">
          <div className="shape shape1"></div>
          <div className="shape shape2"></div>
          <div className="shape shape3"></div>
        </div>
      </div>
      
      <div className="hero-content">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="hero-text"
        >
          <motion.div 
            className="greeting"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            👋 Hello, I'm
          </motion.div>
          
          <motion.h1
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          >
            Bethelhem <span className="highlight">Yirga</span>
          </motion.h1>
          
          <motion.div 
            className="typed-container"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <ReactTyped
              strings={[
                'Full-Stack Developer ✨',
                'Problem Solver 💡',
                'Tech Enthusiast 💻',
                'Lifelong Learner 📚',
                'and a Coffee Lover ☕',
                'Always Coding, Always Improving 🔥',
                'Let\'s Build Something Amazing Together! 🤝'
              ]}
              typeSpeed={50}
              backSpeed={30}
              loop
              className="typed-text"
            />
          </motion.div>
          
          <motion.p
            initial={{ x: 100, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Building scalable web applications with modern technologies.
            Specialized in creating exceptional digital experiences.
          </motion.p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9 }}
          >
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.2)" }}
              whileTap={{ scale: 0.95 }}
              onClick={downloadResume}
            >
              <FaDownload /> Download Resume
            </motion.button>
            <motion.button 
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact Me →
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="social-links"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: social.color }}
                whileTap={{ scale: 0.9 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="hero-image"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        >
          <div className="image-wrapper">
            <div className="image-border"></div>
            <img src="img/photo_5913237916199095908_y.jpg" alt="Profile" />
            <div className="floating-card card1">
              <FaCode /> 10+ Projects
            </div>
            <div className="floating-card card2">
              <FaUsers /> 2+ years experience
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

const About = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const stats = [
    { icon: <FaBriefcase />, value: "2+", label: "Years Experience" },
    { icon: <FaCode />, value: "10+", label: "Projects Completed" },

  ];

  return (
    <section id="about" className="about">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="about-header"
        >
          <h2>About <span className="highlight">Me</span></h2>
          <div className="underline"></div>
        </motion.div>
        
        <div className="about-content">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3>Who am I?</h3>
            <p>
              I'm a passionate Full-Stack Developer with 2+ years of experience in building 
              robust and scalable web applications. I love solving complex problems and 
              creating elegant solutions that make a difference.
            </p>
            <p>
              My journey in tech started with a curiosity about how things work, which led 
              me to dive deep into programming. Over the years, I've honed my skills in both frontend and backend technologies,
            </p>
            <div className="about-features">
              <div className="feature">
                <FaRocket /> Fast Development
              </div>
              <div className="feature">
                <FaTools /> Modern Tech Stack
              </div>
              <div className="feature">
                <FaPaintBrush /> Responsive Design
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <Tilt key={index} className="stat-card" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </Tilt>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const skillCategories = [
    {
      title: "Frontend",
      icon: <FaLaptopCode />,
      skills: [
        { name: "React.js", level: 90, color: "#61DAFB" },
        { name: "Next.js", level: 85, color: "#000000" },
        { name: "TypeScript", level: 85, color: "#3178C6" },
        { name: "Tailwind CSS", level: 88, color: "#06B6D4" },
      ]
    },
    {
      title: "Backend",
      icon: <FaServer />,
      skills: [
        { name: "Django", level: 88, color: "#092E20" },
        { name: "JSF", level: 75, color: "#339933" },
        { name: "javaFX", level: 70, color: "#000000" }
      ]
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      skills: [
        { name: "MongoDB", level: 85, color: "#47A248" },
        { name: "PostgreSQL", level: 82, color: "#336791" },
        { name: "MySQL", level: 80, color: "#4479A1" },
        { name: "Oracle DB", level: 78, color: "#F80000" },
      ]
    },

        {
      title: "Programming Languages",
      icon: <FaCode />,
      skills: [
        { name: "JavaScript", level: 90, color: "#F7DF1E" },
        { name: "Python", level: 90, color: "#3776AB" },
        { name: "Java", level: 70, color: "#5F8D4E" },
        { name: "C++", level: 85, color: "#00599C" },
        { name: "go", level: 80, color: "#00ADD8" },
        { name: "PHP", level: 85, color: "#777BB4" },
        { name: "Bash", level: 90, color: "#4EAA25" },
      ]

    },
    {
      title: "Tools",
      icon: <FaCloud />,
      skills: [
        { name: "Vs Code", level: 95, color: "#2496ED" },
        { name: "Git", level: 90, color: "#F05032" },
        { name: "GitHub", level: 90, color: "#333" },
      ]
    },

  ];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="skills-header"
        >
          <h2>Technical <span className="highlight">Skills</span></h2>
          <div className="underline"></div>
          <p>Technologies and tools I work with</p>
        </motion.div>
        
        <div className="skills-container">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.1 }}
            >
              <div className="category-header">
                {category.icon}
                <h3>{category.title}</h3>
              </div>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item"
                    initial={{ width: 0 }}
                    animate={inView ? { width: "100%" } : {}}
                    transition={{ delay: catIndex * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                  >
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        style={{ 
                          width: inView ? `${skill.level}%` : "0%",
                          backgroundColor: skill.color
                        }}
                        whileHover={{ scaleY: 1.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Experience = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const experiences = [
    {
      title: "Full-Stack Developer",
      company: "INSA",
      period: "2024 - Present",
      description: "Developed and maintained full-stack applications using React,Go and PoastgreSQL.",
      achievements: [
        "system development",
        "team of 4 developers",
        
      ]
    },
    {
      title: "IT Software Engineer",
      company: "Ethiopia Customs Trade",
      period: "July 2023",
      description: "Networking maintenance asistance",
      achievements: [
        "networking maintenance",
        "IT support",
        "troubleshooting"
      ]
    },

  ];

  return (
    <section id="experience" className="experience">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="experience-header"
        >
          <h2>Work <span className="highlight">Experience</span></h2>
          <div className="underline"></div>
        </motion.div>
        
        <div className="timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: index * 0.2 }}
            >
              <div className="timeline-badge">
                <FaBriefcase />
              </div>
              <div className="timeline-content">
                <h3>{exp.title}</h3>
                <h4>{exp.company}</h4>
                <div className="timeline-period">{exp.period}</div>
                <p>{exp.description}</p>
                <ul className="achievements">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <FaStar /> {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [filter, setFilter] = useState('all');
  
  const projects = [
    {
      title: 'Dental Clinic Management System',
      category: 'fullstack',
      tech: ['React', 'tailwind', 'ReactRouter'],
      desc: 'A modern, fully responsive dental clinic management system built with React.js. Features a beautiful public-facing website with animated components, patient portal for booking appointments, and admin dashboard for managing appointments and patients.',
      image: 'img/home.gif',
      github: 'https://github.com/Bethelhem-Yirga/dental-clinic.git',
      demo: 'https://mercy-dental-clinic.vercel.app/',
      featured: true
    },

    {
      title: 'Beauty Salon service website',
      category: 'frontend',
      tech: ['React', 'React Router 6', 'React Bootstrap', 'Vite'],
      desc: 'A modern, responsive beauty salon website built with React, featuring glass morphism design, dark/light theme switching, and complete business functionality.',
      image: 'img/beauti_home.gif',
      github: 'https://github.com/Bethelhem-Yirga/beauty-salon1.git',
      demo: 'https://beauti-salon.netlify.app/',
      featured: true
    },

    {
      title: 'Ethiopian Traditional Clothing E-commerce',
      category: 'frontend',
      tech: ['react', 'Google Maps API', 'Intersection Observer API'],
      desc: 'Complete e-commerce platform for Habesha kemis (traditional dresses)',
      image: 'img/habesha.gif',
      github: 'https://github.com/Bethelhem-Yirga/-ETHIOPIAN-TRADITIONAL-DRESS',
      demo: 'https://github.com/Bethelhem-Yirga/-ETHIOPIAN-TRADITIONAL-DRESS',
      featured: true
    },
    {
      title: 'Realestate Manegement System',
      category: 'fullstack',
      tech: ['Django', 'SQLite', 'Bootstrap'],
      desc: 'Real estate management system with property listings and admin panel built with Django. Features a user-friendly interface for browsing properties, submitting inquiries, and an admin dashboard for managing listings and inquiries.',
      image: 'img/real.jpeg',
      github: 'https://github.com/Bethelhem-Yirga/Real-Estate-Management-System',
      demo: 'https://github.com/Bethelhem-Yirga/Real-Estate-Management-System',
      featured: true
    },
    
    {
      title: '🛡️ Cyber Hygiene Audit Tool',
      category: 'frontend',
      tech: ['React', 'Tailwind CSS'],
      desc: 'Cyber Hygiene Audit Tool is a cutting-edge, cyberpunk-themed web application that transforms security assessment from a boring checklist into an engaging experience.',
      image: 'img/cyber.gif',
      github: 'https://github.com/Bethelhem-Yirga/cyber-hygiene-audit',
      demo: 'https://github.com/Bethelhem-Yirga/cyber-hygiene-audit',
      featured: false
    },

    {
      title: 'ATM Simulator',
      category: 'backend',
      tech: ['Java', 'JavaFX'],
      desc: 'ATM Simulator is a desktop application built with Java and JavaFX that provides a realistic simulation of ATM operations.',
      image: 'img/atm.jpeg',
      github: 'https://github.com/Bethelhem-Yirga/ATM-Simulation',
      demo: 'https://github.com/Bethelhem-Yirga/ATM-Simulation',
      featured: false
    },
    {
      title: 'AI Chatbot Builder Platform (In Development)',
      category: 'fullstack',
      tech: ['React', 'Javascript', 'Axios', 'FastAPI (Python)','Uvicorn','Google Gemini API'],
      desc: 'A full-stack, AI Chatbot Builder platform that enables businesses to create, deploy, and manage AI-powered customer support chatbots without writing a single line of code. Built from scratch to understand the complete architecture of conversational AI systems.',
      image: 'img/ai1.png',
      github: 'https://github.com/Bethelhem-Yirga/AI-CHATBOT-BUILDER',
      demo: 'https://github.com/Bethelhem-Yirga/AI-CHATBOT-BUILDER',
      featured: false
    },

    {
      title: 'eWNETA Music Platform',
      category: 'frontend',
      tech: ['Javascript', 'CSS', 'HTML'],
      desc: 'Dynamic music streaming platform built with vanilla JavaScript, CSS, and HTML. Features a sleek, modern design with interactive elements and responsive layout.',
      image: 'img/m.jpeg',
      github: 'https://github.com/Bethelhem-Yirga/music-website',
      demo: 'https://ewneta.netlify.app/',
      featured: false
    },

    {
      title: 'vehicle rental management system',
      category: 'fullstack',
      tech: ['jsf','Javascript', 'CSS', 'HTML'],
      desc: 'A full-stack vehicle rental management system with a user-friendly interface and admin panel.',
      image: 'img/car.jpeg',
      github: 'https://github.com/Bethelhem-Yirga/car',
      demo: 'https://github.com/Bethelhem-Yirga/car',
      featured: false
    }

    
  ];

  const filters = ['all', 'frontend', 'backend', 'fullstack'];
  const filteredProjects = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="projects-header"
        >
          <h2>Featured <span className="highlight">Projects</span></h2>
          <div className="underline"></div>
          <p>Some of my best work</p>
        </motion.div>
        
        <div className="project-filters">
          {filters.map((f, index) => (
            <motion.button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </motion.button>
          ))}
        </div>
        
        <motion.div 
          className="projects-grid"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Tilt className="project-card" tiltMaxAngleX={10} tiltMaxAngleY={10}>
                  <div className="project-image">
                    <img src={project.image} alt={project.title} />
                    {project.featured && <div className="featured-badge">Featured</div>}
                    <div className="project-overlay">
                      <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub />
                        </a>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          Live Demo →
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="project-info">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const stats = [
    { icon: <FaCode />, value: 150000, label: "Lines of Code", suffix: "+" },
    { icon: <FaUsers />, value: 2, label: "Years of Experience", suffix: "+" },
    { icon: <FaRocket />, value: 10, label: "Projects", suffix: "+" },
    { icon: <FaHeart />, value: 200, label: "Coffee Cups", suffix: "+" },
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-item"
              ref={ref}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <motion.div 
                className="stat-number"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {stat.value}{stat.suffix}
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitHubContributions = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  // Add animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Custom theme for dark/light mode
  const theme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353']
  };

  return (
    <section className="github-section">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="github-header"
        >
          <motion.h2
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 200 }}
          >
            GitHub <span className="highlight">Contributions</span>
          </motion.h2>
          <motion.div 
            className="underline"
            initial={{ width: 0 }}
            animate={inView ? { width: 60 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p>My open source activity and coding journey</p>
        </motion.div>

        <motion.div 
          className="github-calendar-container"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <GitHubCalendar
            username="Bethelhem-Yirga" // REPLACE WITH YOUR GITHUB USERNAME
            blockSize={15}
            blockMargin={5}
            fontSize={14}
            theme={theme}
            labels={{
              totalCount: "{{count}} contributions in the last year"
            }}
          />
        </motion.div>

            <motion.div 
          className="github-link-wrapper"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <a 
            href={`https://github.com/${"Bethelhem-Yirga"}?tab=repositories`} // REPLACE WITH YOUR GITHUB USERNAME
            target="_blank" 
            rel="noopener noreferrer"
            className="github-view-btn"
          >
            <FaGithub /> View All Repositories
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // EmailJS configuration - replace with your credentials
    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.init(publicKey);
        // Prepare template parameters (must match your EmailJS template placeholders)
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
    };
    
    try {
      await emailjs.send(serviceID, templateID, templateParams);
      setIsSent(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSent(false), 5000);
    } catch (error) {
      console.error('Email error:', error);
      alert('Failed to send message. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaEnvelope />, text: "bethelhemyirga3@gmail.com", link: "mailto:bethelhemyirga3@gmail.com" },
    { icon: <FaGithub />, text: "BethelHem-Yirga", link: "https://github.com/BethelHem-Yirga" },
    { icon: <FaLinkedin />, text: "/in/bethelhem-yirga", link: "https://www.linkedin.com/in/bethelhem-yirga" },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="contact-header"
        >
          <h2>Get In <span className="highlight">Touch</span></h2>
          <div className="underline"></div>
          <p>Let's work together on your next project</p>
        </motion.div>
        
        <div className="contact-container">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <h3>Let's Talk</h3>
            <p>I'm always interested in hearing about new projects and opportunities.</p>
            <div className="contact-details">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-item"
                  whileHover={{ x: 5 }}
                >
                  {info.icon}
                  <span>{info.text}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
          
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <motion.button 
              type="submit"
              className="btn-submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : 'Send Message'}
            </motion.button>
            <AnimatePresence>
              {isSent && (
                <motion.div
                  className="success-message"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  ✅ Message sent successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="footer-content"
        >
          <div className="footer-text">
            <h3>Bethelhem-Yirga</h3>
            <p>Full-Stack Developer creating amazing web experiences</p>
          </div>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-social">
            <motion.a href="https://github.com/BethelHem-Yirga" whileHover={{ y: -3 }}><FaGithub /></motion.a>
            <motion.a href="https://www.linkedin.com/in/bethelhem-yirga" whileHover={{ y: -3 }}><FaLinkedin /></motion.a>
            <motion.a href="mailto:bethelhemyirga3@gmail.com" whileHover={{ y: -3 }}><FaEnvelope /></motion.a>
          </div>
          <div className="footer-bottom">
            <p>&copy; {currentYear} Bethelhem-Yirga. Built with <FaHeart /> using React & Framer Motion</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default App;