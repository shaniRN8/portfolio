import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { config } from "../data/config";
// import Scene3D from "./Scene3D"; // Replaced by global GalaxyBackground

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);
  const socialRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-badge",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
        .fromTo(
          ".hero-title span",
          { opacity: 0, y: 60, skewY: 6 },
          { opacity: 1, y: 0, skewY: 0, stagger: 0.15, duration: 1 },
          "-=0.3"
        )
        .fromTo(
          ".hero-subtitle",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.4"
        )
        .fromTo(
          ".hero-desc",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          ".hero-social a",
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        )
        .fromTo(
          ".scroll-indicator",
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.2"
        );

      // Scroll-triggered fade
      gsap.to(".hero-content", {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0,
        y: -60,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="hero-section"
      aria-label="Hero"
    >
      {/* 3-D canvas with Spiral Galaxy provided by fixed GalaxyBackground in App.jsx */}
      {/* <Scene3D /> */}

      {/* Gradient overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-content container">
        {/* Badge */}
        <div className="hero-badge" style={{ opacity: 0 }}>
          <span className="badge-dot" />
          <span>Open to Internships</span>
        </div>

        {/* Name / Title */}
        <h1 ref={titleRef} className="hero-title">
          <span>Hi, I'm</span>
          <br />
          <span className="gradient-text">Shani Randika.</span>
        </h1>

        <p ref={subtitleRef} className="hero-subtitle" style={{ opacity: 0 }}>
          {config.tagline}
        </p>

        <p ref={descRef} className="hero-desc" style={{ opacity: 0 }}>
          {config.shortBio}
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hero-ctas">
          <button
            id="cta-explore"
            className="hero-cta btn-primary"
            style={{ opacity: 0 }}
            onClick={() => scrollToSection("projects")}
          >
            Explore My Work
          </button>
          <button
            id="cta-contact"
            className="hero-cta btn-outline"
            style={{ opacity: 0 }}
            onClick={() => scrollToSection("contact")}
          >
            Contact Me
          </button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="hero-social">
          {config.github && (
            <a href={config.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GithubIcon size={20} />
            </a>
          )}
          {config.linkedin && (
            <a href={config.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedinIcon size={20} />
            </a>
          )}
          {config.email && (
            <a href={`mailto:${config.email}`} aria-label="Email">
              <Mail size={20} />
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        ref={scrollRef}
        className="scroll-indicator"
        style={{ opacity: 0 }}
        onClick={() => scrollToSection("about")}
        aria-label="Scroll to About section"
      >
        <ChevronDown size={24} className="scroll-chevron" />
      </button>
    </section>
  );
}
