import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import profilePhoto from '../assets/profile.jpg';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });

    // Animate hero elements
    tl.fromTo(photoRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
    )
    .fromTo(titleRef.current?.children || [], 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    // Floating animation for CTA button
    gsap.to(ctaRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    // Simple fade in animation for hero section
    gsap.fromTo(heroRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' }
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="hero section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div ref={titleRef}>
              <p className="hero-greeting">Hello, I'm</p>
              <h1 className="hero-name">
                <span className="highlight">Rahul</span> Prajapti
              </h1>
              <h2 className="hero-title">Full Stack Developer & AI Enthusiast</h2>
            </div>
            <div ref={subtitleRef}>
              <p className="hero-description">
                Passionate about creating innovative web solutions and AI applications. 
                Specialized in Java, JavaScript, React, Python, and modern web technologies.
              </p>
            </div>
            <div ref={ctaRef} className="hero-actions">
              <a href="#projects" className="hero-cta" onClick={() => scrollToSection('projects')}>
                View My Work
              </a>
              <a href="#contact" className="hero-cta-secondary" onClick={() => scrollToSection('contact')}>
                Get In Touch
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div ref={photoRef} className="hero-photo">
              <img src={profilePhoto} alt="Rahul Prajapti - Full Stack Developer" />
            </div>
            <div className="floating-elements">
              <div className="floating-icon">💻</div>
              <div className="floating-icon">⚙️</div>
              <div className="floating-icon">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;