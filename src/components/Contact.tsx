import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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

  return (
    <section id="contact" ref={contactRef} className="contact section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          Contact <span>Info</span>
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
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" className="form-input" />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <select className="form-input">
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>AI/ML Project</option>
                <option>Consultation</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Project Details</label>
              <textarea placeholder="Tell me about your project requirements..." className="form-textarea" rows={5}></textarea>
            </div>
            <button type="submit" className="btn form-submit">
              <span>Send Message</span>
              <span className="btn-icon">→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;