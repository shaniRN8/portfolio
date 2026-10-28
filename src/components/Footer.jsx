import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { Mail } from "lucide-react";
import { config } from "../data/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="gradient-text">SR</span>
          <span className="footer-name">{config.name}</span>
        </div>

        <p className="footer-copy">
          © {year} {config.name}. Built with React, Three.js & GSAP.
        </p>

        <div className="footer-socials">
          {config.github && (
            <a
              href={config.github}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="GitHub profile"
              id="footer-github"
            >
              <GithubIcon size={19} />
            </a>
          )}
          {config.linkedin && (
            <a
              href={config.linkedin}
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
              aria-label="LinkedIn profile"
              id="footer-linkedin"
            >
              <LinkedinIcon size={19} />
            </a>
          )}
          {config.email && (
            <a
              href={`mailto:${config.email}`}
              className="footer-social-link"
              aria-label="Email Shani"
              id="footer-email"
            >
              <Mail size={19} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
