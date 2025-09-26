import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Toast from './Toast';
import './Contact.css';

interface ContactInfo {
  icon: string;
  title: string;
  details: string[];
}

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contactGridRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Development',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const contactInfo: ContactInfo[] = [
    {
      icon: '📞',
      title: 'Phone',
      details: ['+91 7024155704', '+91 9713297612']
    },
    {
      icon: '✉️',
      title: 'Email',
      details: ['prajaptirahul514@gmail.com']
    },
    {
      icon: '📍',
      title: 'Location',
      details: ['BTM Layout, Bangalore', 'Karnataka, India']
    },
    {
      icon: '🔗',
      title: 'Connect',
      details: ['LinkedIn Profile', 'GitHub Repository']
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

      // Contact items animation
      const contactItems = contactGridRef.current?.children;
      if (contactItems) {
        gsap.fromTo(contactItems,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: contactGridRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Hover animations
        Array.from(contactItems).forEach((item) => {
          const contactItem = item as HTMLElement;
          
          contactItem.addEventListener('mouseenter', () => {
            gsap.to(contactItem, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          contactItem.addEventListener('mouseleave', () => {
            gsap.to(contactItem, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setToast({
        message: `Thank you ${formData.name}! Your message has been sent. I'll get back to you soon!`,
        type: 'success'
      });
      setFormData({ name: '', email: '', projectType: 'Web Development', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section id="contact" ref={contactRef} className="contact section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Get In <span className="highlight">Touch</span>
        </h2>
        <div ref={contactGridRef} className="contact-grid">
          {contactInfo.map((info, index) => (
            <div key={index} className="contact-item">
              <div className="contact-icon">
                <span>{info.icon}</span>
              </div>
              <div className="contact-details">
                <h3 className="contact-title">{info.title}</h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="contact-detail">{detail}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="contact-form-section">
          <h3 className="form-title">Let's Work Together</h3>
          <p className="form-subtitle">Ready to bring your ideas to life? Let's discuss your next project!</p>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="John Doe" 
                  className="form-input" 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="john@example.com" 
                  className="form-input" 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <select 
                className="form-input"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
              >
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>AI/ML Project</option>
                <option>Consultation</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Project Details</label>
              <textarea 
                placeholder="Tell me about your project requirements..." 
                className="form-textarea" 
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn form-submit" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
};

export default Contact;