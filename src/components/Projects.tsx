import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  features: string[];
}

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectsGridRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      title: 'E-Canteen Management',
      description: 'A comprehensive online food ordering system with payment integration and inventory management.',
      technologies: ['Java', 'MySQL', 'Razorpay', 'HTML', 'CSS', 'JavaScript'],
      features: [
        'Online Food Ordering: Browse menu, add to cart, place orders',
        'Payment Integration: Secure payments through Razorpay',
        'Database Management: MySQL for user data and inventory',
        'Admin Panel: Manage menu items and orders'
      ]
    },
    {
      title: 'FullStack Service Booking App',
      description: 'A complete service booking application with user authentication and role-based access control.',
      technologies: ['React', 'Node.js', 'MongoDB', 'JWT', 'Express'],
      features: [
        'User Authentication: Secure login/signup with JWT',
        'Role-Based Access: Separate access for users and admins',
        'CRUD Operations: Create, read, update, delete bookings',
        'Service Management: Browse and book available services'
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Projects animation
      const projectItems = projectsGridRef.current?.children;
      if (projectItems) {
        Array.from(projectItems).forEach((item, index) => {
          gsap.fromTo(item,
            { 
              x: index % 2 === 0 ? -100 : 100, 
              opacity: 0,
              rotationY: index % 2 === 0 ? -15 : 15
            },
            {
              x: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        });
      }
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={projectsRef} className="projects section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Recent <span>Projects</span>
        </h2>
        <div ref={projectsGridRef} className="projects-grid">
          {projects.map((project, index) => (
            <div key={index} className="project-item">
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-actions">
                  <button className="btn project-btn">View Details</button>
                </div>
              </div>
              <div className="project-image">
                <div className="project-placeholder">
                  <span className="project-icon">🚀</span>
                  <p>Project Demo</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;