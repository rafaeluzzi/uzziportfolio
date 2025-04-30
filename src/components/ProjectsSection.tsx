import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
  category: 'web' | 'mobile' | 'all';
  details: string;
  features: string[];
}

const ProjectsSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'web' | 'mobile'>('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A fully featured e-commerce solution with cart, payment processing, and order management.",
      image: "https://images.pexels.com/photos/5076516/pexels-photo-5076516.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Stripe"],
      link: "#",
      github: "#",
      category: 'web',
      details: "An enterprise-grade e-commerce platform designed for scalability and performance. Features include real-time inventory management, secure payment processing with Stripe, and comprehensive admin dashboard.",
      features: [
        "User authentication and authorization",
        "Product catalog with filtering and search",
        "Shopping cart and checkout flow",
        "Payment processing with Stripe",
        "Order history and tracking",
        "Admin dashboard for product and order management"
      ]
    },
    {
      id: 2,
      title: "Finance Management App",
      description: "A mobile application for personal finance tracking, budgeting, and investment monitoring.",
      image: "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["React Native", "Firebase", "Chart.js", "Redux"],
      link: "#",
      github: "#",
      category: 'mobile',
      details: "A comprehensive personal finance app that helps users track expenses, create budgets, and monitor investments. The app uses encryption to protect sensitive financial data and provides insightful analytics.",
      features: [
        "Expense tracking with receipt scanning",
        "Budget creation and monitoring",
        "Investment portfolio tracking",
        "Financial goals and milestones",
        "Detailed reports and analytics",
        "Bank account synchronization",
        "Recurring transaction management"
      ]
    },
    {
      id: 3,
      title: "Task Management System",
      description: "A collaborative project management tool with real-time updates, task assignment, and progress tracking.",
      image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL"],
      link: "#",
      github: "#",
      category: 'web',
      details: "A real-time collaboration tool designed for development teams. The platform includes task management, time tracking, and reporting features with a focus on improving team productivity.",
      features: [
        "Task creation and assignment",
        "Project boards with drag-and-drop functionality",
        "Time tracking and reporting",
        "Team collaboration features",
        "File sharing and document management",
        "Integration with version control systems",
        "Automated notifications and reminders"
      ]
    },
    {
      id: 4,
      title: "Health & Fitness Tracker",
      description: "A mobile app for tracking workouts, nutrition, and health metrics with personalized recommendations.",
      image: "https://images.pexels.com/photos/1756959/pexels-photo-1756959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["React Native", "GraphQL", "Apollo", "MongoDB"],
      link: "#",
      github: "#",
      category: 'mobile',
      details: "A comprehensive health and fitness tracking application that helps users monitor workouts, nutrition, and wellness metrics. The app includes AI-powered recommendations and integrates with wearable devices.",
      features: [
        "Workout planning and tracking",
        "Nutrition logging and meal planning",
        "Health metrics monitoring",
        "Sleep quality analysis",
        "Progress visualization and reports",
        "Wearable device integration",
        "Personalized recommendations"
      ]
    },
    {
      id: 5,
      title: "Real Estate Platform",
      description: "A web platform for property listings, virtual tours, and real estate transaction management.",
      image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["Next.js", "Tailwind CSS", "Firebase", "Google Maps API"],
      link: "#",
      github: "#",
      category: 'web',
      details: "A modern real estate platform that connects buyers, sellers, and agents. Features include property listings, virtual tours, neighborhood analytics, and secure document management for transactions.",
      features: [
        "Property listings with advanced filters",
        "Virtual tours and 3D property walkthroughs",
        "Agent profiles and messaging",
        "Appointment scheduling",
        "Neighborhood analytics and insights",
        "Document management for transactions",
        "Mortgage calculator and financing options"
      ]
    },
    {
      id: 6,
      title: "Social Media Dashboard",
      description: "An analytics dashboard for social media management with content scheduling and performance tracking.",
      image: "https://images.pexels.com/photos/330771/pexels-photo-330771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      technologies: ["React", "D3.js", "Node.js", "Express", "Redis"],
      link: "#",
      github: "#",
      category: 'web',
      details: "A comprehensive social media management dashboard that helps businesses track analytics, schedule content, and monitor engagement across multiple platforms. Features include automated reporting and AI-powered content recommendations.",
      features: [
        "Multi-platform social media analytics",
        "Content scheduling and calendar",
        "Engagement monitoring and reporting",
        "Competitor analysis",
        "Audience insights and demographics",
        "AI-powered content recommendations",
        "Automated reporting and alerts"
      ]
    },
  ];

  const filteredProjects = currentFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === currentFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute right-1/4 top-1/3 w-96 h-96 bg-secondary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/3 w-80 h-80 bg-primary-500/5 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <motion.span 
            className="text-sm uppercase font-medium text-primary-400 tracking-wider"
            variants={itemVariants}
          >
            What I Build
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gradient"
            variants={itemVariants}
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed"
            variants={itemVariants}
          >
            As a full-stack engineer, I turn ideas into scalable, production-ready products with elegant front ends, powerful back ends, and production-ready systems. Featured here is a selection of some of my recent work across web and mobile platforms.
          </motion.p>
          
          <motion.div 
            className="flex justify-center mt-8 space-x-4"
            variants={itemVariants}
          >
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentFilter === 'all' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-dark-100 text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setCurrentFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All Projects
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentFilter === 'web' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-dark-100 text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setCurrentFilter('web')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Web Development
            </motion.button>
            <motion.button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                currentFilter === 'mobile' 
                  ? 'bg-primary-500 text-white' 
                  : 'bg-dark-100 text-light-300 hover:bg-dark-200'
              }`}
              onClick={() => setCurrentFilter('mobile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mobile Apps
            </motion.button>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentFilter}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id} 
                className="glass-card group overflow-hidden rounded-xl h-full flex flex-col"
                variants={itemVariants}
                whileHover={{ y: -8, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
                transition={{ duration: 0.3 }}
                layoutId={`project-container-${project.id}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="overflow-hidden h-48 relative">
                  <motion.img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform duration-500 group-hover:scale-110"
                    layoutId={`project-image-${project.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-70"></div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <motion.h3 
                    className="text-xl font-semibold mb-2"
                    layoutId={`project-title-${project.id}`}
                  >
                    {project.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-light-300 text-sm mb-4 flex-grow"
                    layoutId={`project-description-${project.id}`}
                  >
                    {project.description}
                  </motion.p>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2 mb-4"
                    layoutId={`project-tech-${project.id}`}
                  >
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 rounded-full bg-primary-500/20 text-primary-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-dark-100 text-light-300">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </motion.div>
                  
                  <motion.button 
                    className="text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors self-start"
                    layoutId={`project-button-${project.id}`}
                  >
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <AnimatePresence>
          {selectedProject && (
            <MotionConfig transition={{ duration: 0.4, ease: [0.36, 0.66, 0.4, 1] }}>
              <motion.div 
                className="fixed inset-0 bg-dark-300/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
              >
                <motion.div 
                  className="relative bg-dark-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
                  layoutId={`project-container-${selectedProject.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button 
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-dark-300/50 text-light-100 hover:bg-dark-300 transition-colors"
                    onClick={() => setSelectedProject(null)}
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="relative h-60 sm:h-80">
                    <motion.img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full h-full object-cover"
                      layoutId={`project-image-${selectedProject.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-300 to-transparent opacity-70"></div>
                  </div>
                  
                  <div className="p-6 sm:p-8">
                    <motion.h3 
                      className="text-2xl sm:text-3xl font-bold mb-2"
                      layoutId={`project-title-${selectedProject.id}`}
                    >
                      {selectedProject.title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-light-300 mb-6"
                      layoutId={`project-description-${selectedProject.id}`}
                    >
                      {selectedProject.description}
                    </motion.p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-2">Project Details</h4>
                      <p className="text-light-300 mb-4">{selectedProject.details}</p>
                      
                      <h4 className="text-lg font-semibold mb-2">Key Features</h4>
                      <ul className="list-disc pl-5 text-light-300 space-y-1">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-6"
                      layoutId={`project-tech-${selectedProject.id}`}
                    >
                      {selectedProject.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="text-sm px-3 py-1 rounded-full bg-primary-500/20 text-primary-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </motion.div>
                    
                    <div className="flex space-x-4">
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-500 text-white rounded-lg flex items-center hover:bg-primary-600 transition-colors"
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Visit Project
                      </a>
                      <a 
                        href={selectedProject.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-light-300 text-light-100 rounded-lg flex items-center hover:bg-dark-100 transition-colors"
                      >
                        <Github size={16} className="mr-2" />
                        View Code
                      </a>
                    </div>
                  </div>
                  
                  <div className="p-4 border-t border-dark-100 flex justify-between">
                    <button 
                      className="p-2 text-light-300 hover:text-light-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={selectedProject.id === Math.min(...projects.map(p => p.id))}
                      onClick={() => {
                        const prevProject = projects.find(p => p.id === selectedProject.id - 1);
                        if (prevProject) setSelectedProject(prevProject);
                      }}
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <button 
                      className="p-2 text-light-300 hover:text-light-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      disabled={selectedProject.id === Math.max(...projects.map(p => p.id))}
                      onClick={() => {
                        const nextProject = projects.find(p => p.id === selectedProject.id + 1);
                        if (nextProject) setSelectedProject(nextProject);
                      }}
                    >
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            </MotionConfig>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProjectsSection;