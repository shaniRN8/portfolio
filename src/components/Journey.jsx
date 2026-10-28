import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  Code2,
  TestTube2,
  Brain,
  Rocket,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE_ITEMS = [
  {
    id: 1,
    icon: GraduationCap,
    color: "#3b82f6",
    title: "Information Technology — Undergraduate",
    org: "Horizon Campus, Sri Lanka",
    description:
      "Pursuing a bachelor's degree in Information Technology, covering software engineering, databases, computer networks, and systems analysis.",
    status: "In Progress",
  },
  {
    id: 2,
    icon: Code2,
    color: "#8b5cf6",
    title: "Full-Stack Projects",
    org: "Personal & Academic Work",
    description:
      "Built TestTrack (QA dashboard), QuickBite (microservices food delivery), and other projects using React, Node.js, and MongoDB — applying software engineering best practices throughout.",
    status: "Ongoing",
  },
  {
    id: 3,
    icon: TestTube2,
    color: "#06b6d4",
    title: "QA Engineering & API Testing",
    org: "Self-Directed Learning",
    description:
      "Deepened skills in manual testing, test case design, and API testing with Postman. Exploring Selenium for browser automation. Applied these skills hands-on within personal projects.",
    status: "Ongoing",
  },
  {
    id: 4,
    icon: Brain,
    color: "#10b981",
    title: "AI-Powered Applications",
    org: "Exploration",
    description:
      "Built SkyPulse AI, a weather prediction system using Python, Scikit-learn, and Streamlit. Expanded understanding of machine learning pipelines and interactive data visualisation.",
    status: "Completed",
  },
  {
    id: 5,
    icon: Rocket,
    color: "#f59e0b",
    title: "IT Internship — Next Goal",
    org: "Target: Software / QA / BA Role",
    description:
      "Actively seeking an IT internship where I can contribute to a professional engineering team, grow as a software developer or QA engineer, and gain real-world industry experience.",
    status: "Upcoming",
  },
];

const STATUS_COLORS = {
  "In Progress": "#3b82f6",
  "Ongoing": "#06b6d4",
  "Completed": "#10b981",
  "Upcoming": "#f59e0b",
};

export default function Journey() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".journey-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".journey-heading", start: "top 80%" },
        }
      );

      // Animate the spine
      gsap.fromTo(
        ".timeline-spine",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".timeline-spine",
            start: "top 80%",
          },
          transformOrigin: "top center",
        }
      );

      // Animate each item
      gsap.fromTo(
        ".timeline-item",
        { opacity: 0, x: (i) => (i % 2 === 0 ? -50 : 50) },
        {
          opacity: 1,
          x: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".timeline-list",
            start: "top 75%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="section journey-section">
      <div className="container">
        {/* Heading */}
        <div className="section-heading journey-heading" style={{ opacity: 0 }}>
          <span className="section-tag">Learning Journey</span>
          <h2 className="section-title">
            My path in{" "}
            <span className="gradient-text">technology</span>
          </h2>
          <p className="section-subtitle">
            Education, projects, and milestones that have shaped my skills and
            direction as an IT professional.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-wrapper">
          <div className="timeline-spine" aria-hidden="true" />

          <ol className="timeline-list" aria-label="Learning journey timeline">
            {TIMELINE_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li
                  key={item.id}
                  className={`timeline-item timeline-item--${idx % 2 === 0 ? "left" : "right"}`}
                  style={{ "--item-color": item.color, opacity: 0 }}
                >
                  {/* Connector dot */}
                  <div className="timeline-dot" aria-hidden="true">
                    <Icon size={18} style={{ color: item.color }} />
                  </div>

                  {/* Card */}
                  <div className="timeline-card glass-card">
                    <div className="timeline-card-header">
                      <h3 className="timeline-title">{item.title}</h3>
                      <span
                        className="timeline-status"
                        style={{
                          color: STATUS_COLORS[item.status],
                          borderColor: STATUS_COLORS[item.status],
                        }}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="timeline-org">{item.org}</p>
                    <p className="timeline-desc">{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
