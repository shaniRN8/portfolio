import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Layout, Server, TestTube2, BookOpen } from "lucide-react";
import { skillCategories } from "../data/skills";

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP = {
  Code2,
  Layout,
  Server,
  TestTube2,
  BookOpen,
};

export default function Skills() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("programming");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".skills-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skills-heading",
            start: "top 80%",
          },
        }
      );

      gsap.fromTo(
        ".category-tab",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".category-tabs",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate skill cards when category changes
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    gsap.fromTo(
      ".skill-card",
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.45, ease: "power2.out" }
    );
  }, [activeCategory]);

  const active = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section id="skills" ref={sectionRef} className="section skills-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading skills-heading" style={{ opacity: 0 }}>
          <span className="section-tag">Skills</span>
          <h2 className="section-title">
            My{" "}
            <span className="gradient-text">technical toolkit</span>
          </h2>
          <p className="section-subtitle">
            Technologies I use in practice, plus areas I'm actively exploring.
          </p>
        </div>

        {/* Category tabs */}
        <div className="category-tabs" role="tablist" aria-label="Skill categories">
          {skillCategories.map(({ id, label, icon, color }) => {
            const Icon = ICON_MAP[icon] || Code2;
            return (
              <button
                key={id}
                id={`skills-tab-${id}`}
                role="tab"
                aria-selected={activeCategory === id}
                className={`category-tab ${activeCategory === id ? "category-tab--active" : ""}`}
                style={{ "--tab-color": color }}
                onClick={() => setActiveCategory(id)}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Skill cards */}
        <div
          role="tabpanel"
          id={`skills-panel-${activeCategory}`}
          aria-labelledby={`skills-tab-${activeCategory}`}
          className="skills-grid"
        >
          {active?.skills.map(({ name, icon, level }) => (
            <div
              key={name}
              className={`skill-card glass-card ${level === "learning" ? "skill-card--learning" : ""}`}
              style={{ "--card-accent": active.color }}
            >
              <span className="skill-emoji" aria-hidden="true">{icon}</span>
              <span className="skill-name">{name}</span>
              {level === "learning" && (
                <span className="learning-badge" title="Currently learning">
                  Learning
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="skills-legend">
          <span className="legend-item legend-established">
            <span className="legend-dot" /> Established
          </span>
          <span className="legend-item legend-learning">
            <span className="legend-dot" /> Currently Learning
          </span>
        </div>
      </div>
    </section>
  );
}
