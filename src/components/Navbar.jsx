import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { config } from "../data/config";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const observers = NAV_LINKS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Entrance animation
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
        style={{ opacity: 0 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner container">
          {/* Logo */}
          <button
            className="navbar-logo"
            onClick={() => scrollTo("home")}
            aria-label="Go to top"
          >
            <span className="gradient-text">SR</span>
          </button>

          {/* Desktop links */}
          <ul className="navbar-links" role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <li key={id}>
                <button
                  id={`nav-${id}`}
                  className={`nav-link ${activeSection === id ? "nav-link--active" : ""}`}
                  onClick={() => scrollTo(id)}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          {/* GitHub CTA */}
          <a
            href={config.github}
            target="_blank"
            rel="noreferrer"
            className="navbar-cta"
            id="nav-github"
          >
            GitHub
          </a>

          {/* Mobile toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`} role="dialog" aria-modal="true">
        <ul role="list">
          {NAV_LINKS.map(({ label, id }) => (
            <li key={id}>
              <button
                id={`mobile-nav-${id}`}
                className={`mobile-nav-link ${activeSection === id ? "mobile-nav-link--active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
