import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePlaceholder from '../assets/profile-placeholder.svg';
import './About.css';

const About: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

      // Image animation
      gsap.fromTo(imageRef.current,
        { x: -100, opacity: 0, rotationY: -15 },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current,
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Floating animation for the image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  const handleResumeClick = () => {
    window.open('https://drive.google.com/drive/folders/10rDSGaoPwwk_b01bA4PGF1djivoyijjY?dmr=1&ec=wgc-drive-globalnav-goto', '_blank');
  };

  return (
    <section id="about" ref={aboutRef} className="about section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          About <span>Me</span>
        </h2>
        <div className="about-content">
          <div ref={imageRef} className="about-image">
            <div className="image-container">
              <div className="profile-image">
                <img src={profilePlaceholder} alt="Rahul Prajapti - Software Developer" />
              </div>
              <div className="image-border"></div>
            </div>
          </div>
          <div ref={contentRef} className="about-text">
            <h3 className="about-subtitle">Software Developer</h3>
            <p className="about-description">
              Passionate Software Developer with a B.Tech in Computer Science & Engineering (AI & ML) from 
              Technocrats Institute of Technology Excellence. With a strong foundation in full-stack development 
              and emerging technologies, I specialize in creating innovative solutions that bridge the gap between 
              traditional software development and cutting-edge AI applications.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">7.47</span>
                <span className="stat-label">CGPA</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">8+</span>
                <span className="stat-label">Technologies</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">2+</span>
                <span className="stat-label">Projects</span>
              </div>
            </div>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-icon">🎓</span>
                <div>
                  <h4>Education</h4>
                  <p>B.Tech in CSE (AI & ML)</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">💼</span>
                <div>
                  <h4>Experience</h4>
                  <p>Full Stack Development</p>
                </div>
              </div>
              <div className="highlight-item">
                <span className="highlight-icon">🌟</span>
                <div>
                  <h4>Passion</h4>
                  <p>AI & Machine Learning</p>
                </div>
              </div>
            </div>
            <button className="btn about-cta" onClick={handleResumeClick}>
              View Resume
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;