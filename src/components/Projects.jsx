import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, X, ChevronRight, Eye, Layers, Sparkles } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// ─── Project Modal with 3D Pop ────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (modalContentRef.current) {
      gsap.fromTo(
        modalContentRef.current,
        { opacity: 0, scale: 0.88, rotateX: 12, y: 40 },
        { opacity: 1, scale: 1, rotateX: 0, y: 0, duration: 0.45, ease: "back.out(1.4)" }
      );
    }

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalContentRef}
        className="modal-content glass-card modal-wrapper-3d"
        style={{ "--project-color": project.color }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {/* Modal Window Mockup */}
        <div className="modal-window-frame">
          <div className="window-dots" aria-hidden="true">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
            <span className="window-address-bar">{project.title.toLowerCase().replace(/[^a-z0-9]/g, "")}.app</span>
          </div>

          <div className="modal-image-container">
            <img
              src={project.image}
              alt={`${project.title} preview`}
              className="modal-project-img"
              loading="lazy"
            />
            <div className="modal-image-glow" style={{ background: `radial-gradient(circle, ${project.color}33 0%, transparent 70%)` }} />
          </div>
        </div>

        {/* Modal Details */}
        <div className="modal-header">
          <div className="modal-tags-row">
            <span className="modal-category">{project.category}</span>
            {project.badge && <span className="modal-badge">{project.badge}</span>}
          </div>
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-subtitle">{project.subtitle}</p>
        </div>

        {project.stats && (
          <div className="modal-stats-pill">
            <Sparkles size={14} className="stats-icon" />
            <span>{project.stats}</span>
          </div>
        )}

        <p className="modal-desc">{project.longDescription}</p>

        <div className="modal-tech-wrap">
          <h4 className="modal-tech-label">Technologies & Architecture</h4>
          <div className="modal-tech">
            {project.tech.map((t) => (
              <span key={t} className="tech-badge">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="btn-primary modal-action-btn glow-btn"
              id={`modal-demo-${project.id}`}
            >
              <ExternalLink size={16} /> Launch Live Demo
            </a>
          ) : (
            <span className="btn-disabled">
              <span>Demo Staged Locally</span>
            </span>
          )}

          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="btn-outline modal-action-btn"
              id={`modal-repo-${project.id}`}
            >
              <GithubIcon size={16} /> Inspect Repository
            </a>
          ) : (
            <span className="btn-disabled">
              <span>Internal / Academic Repo</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── 3D Parallax Tilt Card Component ──────────────────────────────────────────
function ProjectCard({ project, onClick }) {
  const cardRef = useRef(null);
  const glareRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalised coordinate from -1 to 1
    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    // 3D rotation with gentle snappy easing
    gsap.to(card, {
      rotateY: normX * 12,
      rotateX: -normY * 12,
      scale3d: 1.025,
      duration: 0.2,
      ease: "power1.out",
      transformPerspective: 1000,
    });

    // Specular holographic sheen tracker
    if (glareRef.current) {
      glareRef.current.style.opacity = "0.75";
      glareRef.current.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(255,255,255,0.18), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale3d: 1,
      duration: 0.6,
      ease: "power3.out",
    });

    if (glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      className={`project-card-3d glass-card ${project.featured ? "project-card-3d--featured" : ""}`}
      style={{ "--project-color": project.color }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      role="article"
      aria-label={project.title}
      onClick={() => onClick(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(project);
        }
      }}
    >
      {/* Specular Glare layer */}
      <div ref={glareRef} className="card-glare" aria-hidden="true" />

      {/* 3D Visual Header Mockup */}
      <div className="card-mockup-wrapper">
        <div className="mockup-header-bar" aria-hidden="true">
          <div className="mockup-dots">
            <span className="dot dot--red" />
            <span className="dot dot--yellow" />
            <span className="dot dot--green" />
          </div>
          <span className="mockup-url">{project.badge || project.category}</span>
          {project.featured && <span className="featured-pill">Featured</span>}
        </div>

        <div className="card-image-box">
          <img
            src={project.image}
            alt={`${project.title} UI screenshot`}
            className="card-image"
            loading="lazy"
          />
          <div className="card-image-overlay">
            <span className="quick-preview-badge">
              <Eye size={15} /> Quick View
            </span>
          </div>
          <div
            className="ambient-color-glow"
            style={{
              background: `radial-gradient(circle at 50% 100%, ${project.color}40 0%, transparent 75%)`,
            }}
          />
        </div>
      </div>

      {/* Card Content - 3D Lifted */}
      <div className="card-inner-body">
        <div className="card-meta-row">
          <span className="card-category-tag">{project.category}</span>
          {project.stats && <span className="card-stats-tag">{project.stats.split("·")[0].trim()}</span>}
        </div>

        <h3 className="card-title">{project.title}</h3>
        <p className="card-subtitle">{project.subtitle}</p>
        <p className="card-desc">{project.description}</p>

        {/* Tech Stack */}
        <div className="card-tech-badges">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="tech-badge">
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="tech-badge tech-badge--more">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="card-bottom-bar" onClick={(e) => e.stopPropagation()}>
        <button
          className="btn-card-details"
          id={`project-details-${project.id}`}
          onClick={() => onClick(project)}
        >
          <span>View Case Study</span>
          <ChevronRight size={16} className="arrow-icon" />
        </button>

        <div className="card-direct-links">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="direct-link-btn"
              title="Live Demo"
              aria-label={`Live demo for ${project.title}`}
            >
              <ExternalLink size={16} />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="direct-link-btn"
              title="View Code on GitHub"
              aria-label={`Source code for ${project.title}`}
            >
              <GithubIcon size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const sectionRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    return ["All", "AI & ML", "AI & Multi-Agent", "Full-Stack & QA", "Full-Stack & Web"];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".projects-heading",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".projects-heading", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".projects-filter-bar",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".projects-filter-bar", start: "top 88%" },
        }
      );

      gsap.fromTo(
        ".project-card-3d",
        { opacity: 0, y: 45, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid-3d",
            start: "top 85%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section id="projects" ref={sectionRef} className="section projects-section">
      {/* 3D background lighting orbs */}
      <div className="section-3d-glow section-3d-glow--1" aria-hidden="true" />
      <div className="section-3d-glow section-3d-glow--2" aria-hidden="true" />

      <div className="container">
        {/* Section Heading */}
        <div className="section-heading projects-heading" style={{ opacity: 0 }}>
          <div className="section-tag-wrap">
            <span className="section-tag">
              <Layers size={13} style={{ display: "inline-block", marginRight: "6px" }} />
              Portfolio Showcase
            </span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects & Systems</span>
          </h2>
          <p className="section-subtitle">
            Engineered with modern frontend architectures, real-time testing telemetry,
            multi-agent autonomous workflows, and machine learning intelligence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="projects-filter-bar" style={{ opacity: 0 }}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${activeFilter === cat ? "filter-pill--active" : ""}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
              <span className="filter-count">
                {cat === "All"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* 3D Grid */}
        <div className="projects-grid-3d">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={setActiveProject}
            />
          ))}
        </div>
      </div>

      {/* 3D Modal */}
      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
