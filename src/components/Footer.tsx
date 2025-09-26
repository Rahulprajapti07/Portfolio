import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const footerElements = footerRef.current?.children;
      if (footerElements) {
        gsap.fromTo(footerElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-social">
            <a 
              href="https://www.linkedin.com/in/rahul-prajapti/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              title="LinkedIn Profile"
            >
              <span>💼</span>
            </a>
            <a 
              href="https://github.com/rahulprajapti" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              title="GitHub Profile"
            >
              <span>💻</span>
            </a>
            <a 
              href="https://www.instagram.com/_rahul._prajapati/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              title="Instagram Profile"
            >
              <span>📷</span>
            </a>
            <a 
              href="mailto:prajaptirahul514@gmail.com" 
              className="social-link"
              title="Send Email"
            >
              <span>✉️</span>
            </a>
          </div>
          <div className="footer-divider"></div>
          <div className="footer-text">
            <p>Designed & Built with ❤️ by <strong>Rahul Prajapti</strong></p>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 All rights reserved. Built with React & TypeScript</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;