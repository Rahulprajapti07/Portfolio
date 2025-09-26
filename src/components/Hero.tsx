import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import profilePlaceholder from '../assets/profile-placeholder.svg';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
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

    // Parallax effect on scroll
    gsap.to(heroRef.current, {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="hero section">
      <div className="hero-bg"></div>
      <div className="container">
        <div className="hero-content">
          <div ref={photoRef} className="hero-photo">
            <img src={profilePlaceholder} alt="Rahul Prajapti" />
          </div>
          <div ref={titleRef} className="hero-title">
            <h1>Hello,</h1>
            <h1>My Name is</h1>
            <h1 className="name">Rahul Prajapti</h1>
          </div>
          <div ref={subtitleRef} className="hero-subtitle">
            <p>Full Stack Developer | Java | JavaScript | React | Python</p>
          </div>
          <a 
            ref={ctaRef} 
            href="#about" 
            className="btn hero-cta"
            onClick={scrollToAbout}
          >
            View Portfolio
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;