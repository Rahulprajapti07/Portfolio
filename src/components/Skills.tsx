import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

interface Skill {
  name: string;
  level: number;
  icon: string;
}

const Skills: React.FC = () => {
  const skillsRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsGridRef = useRef<HTMLDivElement>(null);

  const skills: Skill[] = [
    { name: 'Java', level: 4, icon: '☕' },
    { name: 'JavaScript', level: 3, icon: '🟨' },
    { name: 'React', level: 3, icon: '⚛️' },
    { name: 'Python', level: 3, icon: '🐍' },
    { name: 'HTML', level: 4, icon: '🌐' },
    { name: 'CSS', level: 3, icon: '🎨' },
    { name: 'MongoDB', level: 3, icon: '🍃' },
    { name: 'SQL', level: 4, icon: '🗄️' }
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

      // Skills grid animation
      const skillItems = skillsGridRef.current?.children;
      if (skillItems) {
        gsap.fromTo(skillItems,
          { y: 80, opacity: 0, scale: 0.8 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: skillsGridRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Hover animations for skill items
        Array.from(skillItems).forEach((item) => {
          const skillItem = item as HTMLElement;
          
          skillItem.addEventListener('mouseenter', () => {
            gsap.to(skillItem, {
              scale: 1.05,
              y: -10,
              duration: 0.3,
              ease: 'power2.out'
            });
          });

          skillItem.addEventListener('mouseleave', () => {
            gsap.to(skillItem, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: 'power2.out'
            });
          });
        });
      }
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={`star ${index < level ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  return (
    <section id="skills" ref={skillsRef} className="skills section">
      <div className="container">
        <h2 ref={titleRef} className="section-title">
          My <span className="highlight">Skills</span>
        </h2>
        <p className="skills-description">
          Passionate about leveraging cutting-edge technologies to build scalable, 
          user-centric applications that solve real-world problems.
        </p>
        <div ref={skillsGridRef} className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-icon">{skill.icon}</div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-rating">
                {renderStars(skill.level)}
              </div>
              <p className="skill-level">
                {skill.level === 5 ? 'Expert' : skill.level === 4 ? 'Advanced' : skill.level === 3 ? 'Intermediate' : 'Beginner'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;