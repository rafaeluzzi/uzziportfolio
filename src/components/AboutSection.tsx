import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Server, Smartphone, Layers, Users } from 'lucide-react';

const AboutSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const services = [
    {
      icon: <Code size={24} />,
      title: "Web Development",
      description: "Creating responsive, interactive web applications with modern frameworks and libraries.",
    },
    {
      icon: <Smartphone size={24} />,
      title: "Mobile Development",
      description: "Building native and cross-platform mobile apps for iOS and Android using React Native.",
    },
    {
      icon: <Database size={24} />,
      title: "Backend Development",
      description: "Designing robust APIs, database architecture, and server-side solutions.",
    },
    {
      icon: <Server size={24} />,
      title: "DevOps",
      description: "Implementing CI/CD pipelines, containerization, and cloud infrastructure management.",
    },
    {
      icon: <Layers size={24} />,
      title: "Architecture Design",
      description: "Planning scalable system architecture and technical solutions for complex projects.",
    },
    {
      icon: <Users size={24} />,
      title: "Team Leadership",
      description: "Leading development teams, mentoring junior developers, and project management.",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute right-0 top-1/4 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute left-1/3 bottom-1/4 w-80 h-80 bg-secondary-500/5 rounded-full filter blur-3xl"></div>
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
            About Me
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gradient"
            variants={itemVariants}
          >
            My Journey
          </motion.h2>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed"
            variants={itemVariants}
          >
            I'm a passionate full-stack developer with over 8 years of experience in building
            sophisticated web and mobile applications. My journey began with a fascination for creating
            user-friendly interfaces and evolved into mastering both frontend and backend technologies.
          </motion.p>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed mt-4"
            variants={itemVariants}
          >
            I specialize in creating scalable applications with React, React Native, Node.js, and modern cloud 
            technologies. My approach emphasizes clean code, thoughtful architecture, and seamless user experiences.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="glass-card p-6 flex flex-col h-full"
              variants={itemVariants}
              whileHover={{ y: -8, boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3 rounded-xl bg-primary-500/10 w-fit mb-4 text-primary-400">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-light-300 text-sm flex-grow">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;