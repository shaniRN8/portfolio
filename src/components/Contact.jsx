import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Copy, Check, ExternalLink } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { config } from "../data/config";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-heading", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-card", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".contact-link-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-links", start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    if (!config.email) return;
    navigator.clipboard.writeText(config.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const LINKS = [
    {
      id: "contact-github",
      icon: GithubIcon,
      label: "GitHub",
      sub: "@shaniRN8",
      href: config.github,
      color: "#3b82f6",
      show: !!config.github,
    },
    {
      id: "contact-linkedin",
      icon: LinkedinIcon,
      label: "LinkedIn",
      sub: "Connect with me",
      href: config.linkedin,
      color: "#0ea5e9",
      show: !!config.linkedin,
      placeholder: "LinkedIn — add your URL in src/data/config.js",
    },
    {
      id: "contact-email",
      icon: Mail,
      label: "Email",
      sub: config.email || "Add your email in src/data/config.js",
      href: config.email ? `mailto:${config.email}` : null,
      color: "#8b5cf6",
      show: true,
      copyable: !!config.email,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section contact-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading contact-heading" style={{ opacity: 0 }}>
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let's{" "}
            <span className="gradient-text">connect</span>
          </h2>
          <p className="section-subtitle">
            I'm open to internship opportunities, collaborations, and
            conversations about software quality and development.
          </p>
        </div>

        {/* Card */}
        <div className="contact-card glass-card" style={{ opacity: 0 }}>
          <div className="contact-card-inner">
            {/* Left: message */}
            <div className="contact-message">
              <div className="contact-avatar" aria-hidden="true">SR</div>
              <h3 className="contact-invite">
                Ready to build something great together?
              </h3>
              <p className="contact-body">
                Whether you're looking for a detail-oriented QA-focused developer
                or want to discuss an exciting project — I'd love to hear from
                you. Reach out through any of the channels on the right.
              </p>
              <div className="contact-availability">
                <span className="availability-dot" />
                <span>Available for internships & freelance projects</span>
              </div>
            </div>

            {/* Right: links */}
            <div className="contact-links">
              {LINKS.map(({ id, icon: Icon, label, sub, href, color, show, copyable, placeholder }) => {
                if (!show && !placeholder) return null;
                return (
                  <div
                    key={id}
                    id={id}
                    className="contact-link-item glass-card"
                    style={{ "--link-color": color, opacity: 0 }}
                  >
                    <div className="contact-link-icon" style={{ color }}>
                      <Icon size={22} />
                    </div>
                    <div className="contact-link-text">
                      <span className="contact-link-label">{label}</span>
                      <span className="contact-link-sub">
                        {placeholder && !href ? placeholder : sub}
                      </span>
                    </div>
                    {copyable ? (
                      <button
                        className="contact-link-action"
                        onClick={handleCopyEmail}
                        aria-label="Copy email address"
                        title="Copy email"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    ) : href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="contact-link-action"
                        aria-label={`Open ${label}`}
                      >
                        <ExternalLink size={16} />
                      </a>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
