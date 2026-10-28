import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Target, Lightbulb, Users } from "lucide-react";
import { config } from "../data/config";
import profileImg from "../assets/profile.jpg";

gsap.registerPlugin(ScrollTrigger);

const HIGHLIGHTS = [
  {
    icon: GraduationCap,
    title: "IT Undergraduate",
    text: "Studying Information Technology at Horizon Campus, Sri Lanka. Focused on building solid foundations across software engineering, databases, and system design.",
    color: "#3b82f6",
  },
  {
    icon: Target,
    title: "QA Enthusiast",
    text: "Deeply interested in software quality assurance. I practise test case design, manual testing, and API testing with Postman as part of every project I build.",
    color: "#8b5cf6",
  },
  {
    icon: Lightbulb,
    title: "Business Analyst Mindset",
    text: "I enjoy bridging the gap between business needs and technical solutions, understanding requirements before writing a single line of code.",
    color: "#06b6d4",
  },
  {
    icon: Users,
    title: "Team-Ready",
    text: "My goal is to contribute to a professional engineering team as an IT intern — bringing curiosity, a detail-oriented approach, and a willingness to keep learning every day.",
    color: "#10b981",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Section heading reveal
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-heading",
            start: "top 80%",
          },
        }
      );

      // Profile card tilt setup
      gsap.fromTo(
        ".profile-card",
        { opacity: 0, scale: 0.92, rotateY: -15 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".profile-card",
            start: "top 80%",
          },
        }
      );

      // Highlight cards
      gsap.fromTo(
        ".highlight-card",
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".highlights-grid",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse tilt for profile card
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, {
      rotateY: x * 12,
      rotateX: -y * 12,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleCardMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading about-heading" style={{ opacity: 0 }}>
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Turning curiosity into{" "}
            <span className="gradient-text">quality software</span>
          </h2>
          <p className="section-subtitle">
            An IT student who believes the best software comes from understanding
            people, processes, and systems — not just writing code.
          </p>
        </div>

        {/* Main split */}
        <div className="about-grid">
          {/* Profile card */}
          <div
            className="profile-card glass-card"
            style={{ opacity: 0 }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Profile Avatar */}
            <div className="profile-avatar">
              <div className="avatar-glow" />
              <img
                src={profileImg}
                alt={config.name}
                className="profile-img"
              />
            </div>

            <h3 className="profile-name">{config.name}</h3>
            <p className="profile-role">{config.role}</p>
            <p className="profile-uni">🎓 {config.university}</p>

            <div className="profile-tags">
              {["QA Engineering", "Business Analysis", "Frontend Dev", "AI/ML"].map(
                (tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                )
              )}
            </div>

            <div className="profile-actions">
              <a
                href={config.github}
                target="_blank"
                rel="noreferrer"
                className="btn-primary profile-btn"
                id="about-github-link"
              >
                GitHub
              </a>
              {config.linkedin && (
                <a
                  href={config.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline profile-btn"
                  id="about-linkedin-link"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div className="highlights-grid">
            {HIGHLIGHTS.map(({ icon: Icon, title, text, color }) => (
              <div
                key={title}
                className="highlight-card glass-card"
                style={{ "--card-accent": color, opacity: 0 }}
              >
                <div className="highlight-icon" style={{ color }}>
                  <Icon size={24} />
                </div>
                <h4 className="highlight-title">{title}</h4>
                <p className="highlight-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
