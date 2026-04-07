import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Tilt from 'react-parallax-tilt';
import { ReactTyped } from 'react-typed'; // Changed this line
import { 
  FaSun, FaMoon, FaDownload, FaGithub, FaLinkedin, FaEnvelope, 
  FaTwitter, FaCode, FaServer, FaDatabase, FaCloud,
  FaArrowUp, FaHeart, FaStar, FaBriefcase,
  FaAward, FaLaptopCode, FaUsers, FaRocket, FaTools, FaPaintBrush
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import emailjs from 'emailjs-com';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

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
      <Testimonials />
      <Blog />
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
        {'<DevPortfolio />'}
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
    { icon: <FaGithub />, url: "https://github.com/yourusername", color: "#333" },
    { icon: <FaLinkedin />, url: "https://linkedin.com/in/yourprofile", color: "#0077b5" },
    { icon: <FaTwitter />, url: "https://twitter.com/yourusername", color: "#1DA1F2" },
    { icon: <SiLeetcode />, url: "https://leetcode.com/yourusername", color: "#FFA116" },
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
            John <span className="highlight">Doe</span>
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
                'MERN Stack Expert 🚀',
                'Problem Solver 💡',
                'Tech Enthusiast 💻',
                'Open Source Contributor 🌟'
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
            <img src="https://via.placeholder.com/400x400" alt="Profile" />
            <div className="floating-card card1">
              <FaCode /> 10+ Projects
            </div>
            <div className="floating-card card2">
              <FaUsers /> 50+ Clients
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
    { icon: <FaBriefcase />, value: "4+", label: "Years Experience" },
    { icon: <FaCode />, value: "50+", label: "Projects Completed" },
    { icon: <FaUsers />, value: "30+", label: "Happy Clients" },
    { icon: <FaAward />, value: "15+", label: "Awards Won" },
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
              I'm a passionate Full-Stack Developer with 4+ years of experience in building 
              robust and scalable web applications. I love solving complex problems and 
              creating elegant solutions that make a difference.
            </p>
            <p>
              My journey in tech started with a curiosity about how things work, which led 
              me to dive deep into programming. Today, I specialize in the MERN stack and 
              cloud technologies, helping businesses bring their ideas to life.
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
        { name: "Node.js", level: 88, color: "#339933" },
        { name: "Python", level: 85, color: "#3776AB" },
        { name: "Express.js", level: 87, color: "#000000" },
        { name: "Django", level: 80, color: "#092E20" },
      ]
    },
    {
      title: "Database",
      icon: <FaDatabase />,
      skills: [
        { name: "MongoDB", level: 85, color: "#47A248" },
        { name: "PostgreSQL", level: 82, color: "#336791" },
        { name: "MySQL", level: 80, color: "#4479A1" },
        { name: "Redis", level: 75, color: "#DC382D" },
      ]
    },
    {
      title: "DevOps & Cloud",
      icon: <FaCloud />,
      skills: [
        { name: "Docker", level: 80, color: "#2496ED" },
        { name: "AWS", level: 75, color: "#FF9900" },
        { name: "Git/GitHub", level: 90, color: "#F05032" },
        { name: "CI/CD", level: 78, color: "#2088FF" },
      ]
    }
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
      title: "Senior Full-Stack Developer",
      company: "Tech Solutions Inc.",
      period: "2022 - Present",
      description: "Leading development of enterprise web applications, mentoring junior developers, and implementing best practices.",
      achievements: [
        "Increased application performance by 40%",
        "Led team of 5 developers",
        "Implemented CI/CD pipeline"
      ]
    },
    {
      title: "MERN Stack Developer",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description: "Developed and maintained full-stack applications using React, Node.js, and MongoDB.",
      achievements: [
        "Built 10+ client projects",
        "Reduced load time by 50%",
        "Implemented real-time features"
      ]
    },
    {
      title: "Freelance Web Developer",
      company: "Self-Employed",
      period: "2019 - 2020",
      description: "Worked with various clients to build custom web solutions and e-commerce platforms.",
      achievements: [
        "Completed 20+ successful projects",
        "Maintained 100% client satisfaction",
        "Delivered projects ahead of schedule"
      ]
    }
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
      title: 'AI-Powered E-Commerce',
      category: 'fullstack',
      tech: ['React', 'Node.js', 'MongoDB', 'AI'],
      desc: 'Smart e-commerce platform with AI recommendations and chatbot',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      title: 'TaskFlow Pro',
      category: 'frontend',
      tech: ['React', 'Redux', 'Material-UI'],
      desc: 'Advanced project management tool with real-time updates',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      title: 'Social Analytics Dashboard',
      category: 'backend',
      tech: ['Python', 'Django', 'PostgreSQL', 'D3.js'],
      desc: 'Analytics platform for social media metrics',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      title: 'Real-Time Chat App',
      category: 'fullstack',
      tech: ['Socket.io', 'Express', 'React'],
      desc: 'Messaging app with video calls and file sharing',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      title: 'Portfolio Generator',
      category: 'frontend',
      tech: ['React', 'Tailwind', 'Framer'],
      desc: 'Drag-and-drop portfolio builder for developers',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      title: 'API Gateway',
      category: 'backend',
      tech: ['Node.js', 'Redis', 'JWT'],
      desc: 'Scalable API gateway with rate limiting',
      image: 'https://via.placeholder.com/400x300',
      github: 'https://github.com',
      demo: 'https://demo.com',
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
    { icon: <FaUsers />, value: 50, label: "Happy Clients", suffix: "+" },
    { icon: <FaRocket />, value: 100, label: "Projects", suffix: "+" },
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

const Testimonials = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "https://via.placeholder.com/100",
      text: "John is an exceptional developer! He delivered our project ahead of schedule and exceeded our expectations. His technical expertise and problem-solving skills are outstanding.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CTO, InnovateLabs",
      image: "https://via.placeholder.com/100",
      text: "Working with John was a pleasure. He's not only skilled in full-stack development but also great at communicating complex technical concepts. Highly recommended!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Product Manager, StartupHub",
      image: "https://via.placeholder.com/100",
      text: "John's attention to detail and commitment to quality is impressive. He consistently delivered high-quality code and was always proactive in suggesting improvements.",
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="testimonials-header"
        >
          <h2>What <span className="highlight">Clients Say</span></h2>
          <div className="underline"></div>
        </motion.div>
        
        <div className="testimonial-slider">
          <motion.button 
            className="slider-btn prev"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ←
          </motion.button>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-image">
                <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
              </div>
              <div className="testimonial-content">
                <p>"{testimonials[currentIndex].text}"</p>
                <h4>{testimonials[currentIndex].name}</h4>
                <div className="testimonial-role">{testimonials[currentIndex].role}</div>
                <div className="testimonial-rating">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <FaStar key={i} className="star" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          <motion.button 
            className="slider-btn next"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const blogPosts = [
    {
      title: "Building Scalable MERN Applications",
      date: "Dec 15, 2024",
      excerpt: "Best practices for structuring large-scale MERN applications...",
      image: "https://via.placeholder.com/300x200",
      readTime: "5 min read"
    },
    {
      title: "Mastering React Hooks",
      date: "Dec 10, 2024",
      excerpt: "Deep dive into advanced React Hook patterns and optimizations...",
      image: "https://via.placeholder.com/300x200",
      readTime: "7 min read"
    },
    {
      title: "Docker for Developers",
      date: "Dec 5, 2024",
      excerpt: "Containerize your development environment with Docker...",
      image: "https://via.placeholder.com/300x200",
      readTime: "6 min read"
    }
  ];

  return (
    <section className="blog">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="blog-header"
        >
          <h2>Latest <span className="highlight">Blog Posts</span></h2>
          <div className="underline"></div>
          <p>Sharing knowledge and experiences</p>
        </motion.div>
        
        <div className="blog-grid">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="blog-image">
                <img src={post.image} alt={post.title} />
                <div className="read-time">{post.readTime}</div>
              </div>
              <div className="blog-content">
                <div className="blog-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <motion.a 
                  href="#" 
                  className="read-more"
                  whileHover={{ x: 5 }}
                >
                  Read More →
                </motion.a>
              </div>
            </motion.article>
          ))}
        </div>
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
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_TEMPLATE_ID';
    const userID = 'YOUR_USER_ID';
    
    try {
      await emailjs.send(serviceID, templateID, formData, userID);
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
    { icon: <FaEnvelope />, text: "john.doe@example.com", link: "mailto:john.doe@example.com" },
    { icon: <FaGithub />, text: "/yourusername", link: "https://github.com/yourusername" },
    { icon: <FaLinkedin />, text: "/in/yourprofile", link: "https://linkedin.com/in/yourprofile" },
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
            <h3>John Doe</h3>
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
            <motion.a href="#" whileHover={{ y: -3 }}><FaGithub /></motion.a>
            <motion.a href="#" whileHover={{ y: -3 }}><FaLinkedin /></motion.a>
            <motion.a href="#" whileHover={{ y: -3 }}><FaTwitter /></motion.a>
          </div>
          <div className="footer-bottom">
            <p>&copy; {currentYear} John Doe. Built with <FaHeart /> using React & Framer Motion</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default App;