import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, MapPin, Phone, Globe, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    focus: { scale: 1.01, boxShadow: "0 0 10px rgba(139, 92, 246, 0.3)" },
    blur: { scale: 1, boxShadow: "none" },
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      title: "Email",
      content: "john.doe@example.com",
      link: "mailto:john.doe@example.com",
    },
    {
      icon: <Phone size={20} />,
      title: "Phone",
      content: "+1 (555) 123-4567",
      link: "tel:+15551234567",
    },
    {
      icon: <MapPin size={20} />,
      title: "Location",
      content: "San Francisco, CA",
      link: "#",
    },
    {
      icon: <Globe size={20} />,
      title: "Website",
      content: "www.johndoe.dev",
      link: "https://www.johndoe.dev",
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-primary-500/5 rounded-full filter blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-secondary-500/5 rounded-full filter blur-3xl"></div>
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
            Get In Touch
          </motion.span>
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-gradient"
            variants={itemVariants}
          >
            Contact Me
          </motion.h2>
          <motion.p 
            className="text-lg text-light-300 leading-relaxed"
            variants={itemVariants}
          >
            Have a project in mind or want to discuss potential opportunities?
            Feel free to reach out through any of the channels below.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              variants={itemVariants}
            >
              Send me a message
            </motion.h3>
            
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email</label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message</label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-dark-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all resize-none"
                  whileFocus="focus"
                  whileBlur="blur"
                  variants={inputVariants}
                />
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg font-medium flex items-center justify-center disabled:opacity-70"
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(139, 92, 246, 0.5)" }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="ml-2" />
                    </>
                  )}
                </motion.button>
                
                {isSubmitted && (
                  <motion.div 
                    className="mt-4 p-3 bg-primary-500/20 text-primary-400 rounded-lg flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </motion.div>
            </motion.form>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ delay: 0.4 }}
          >
            <motion.h3 
              className="text-2xl font-semibold mb-6"
              variants={itemVariants}
            >
              Contact Information
            </motion.h3>
            
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  className="glass-card p-5 flex items-center group block"
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-xl bg-primary-500/10 text-primary-400 mr-4 group-hover:bg-primary-500/20 transition-colors">
                    {info.icon}
                  </div>
                  <div>
                    <div className="text-sm text-light-300 mb-1">{info.title}</div>
                    <div className="font-medium">{info.content}</div>
                  </div>
                </motion.a>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-10"
              variants={itemVariants}
            >
              <h3 className="text-2xl font-semibold mb-6">Follow Me</h3>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="p-3 rounded-xl bg-dark-100 text-light-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="p-3 rounded-xl bg-dark-100 text-light-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="p-3 rounded-xl bg-dark-100 text-light-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                </motion.a>
                
                <motion.a 
                  href="#" 
                  className="p-3 rounded-xl bg-dark-100 text-light-300 hover:bg-primary-500/10 hover:text-primary-400 transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              className="mt-10"
              variants={itemVariants}
            >
              <Link
                to="/hero-variations"
                className="glass-card p-4 flex items-center justify-between hover:bg-primary-500/10 transition-colors group"
              >
                <span className="font-medium">View Hero Variations</span>
                <ExternalLink size={20} className="text-primary-400 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;