// ─── Skills Data ─────────────────────────────────────────────────────────────
// `level` can be "established" | "learning"

export const skillCategories = [
  {
    id: "programming",
    label: "Programming",
    icon: "Code2",
    color: "#3b82f6",
    skills: [
      { name: "Python", icon: "🐍", level: "established" },
      { name: "Java", icon: "☕", level: "established" },
      { name: "JavaScript", icon: "⚡", level: "established" },
      { name: "C", icon: "🔧", level: "established" },
      { name: "C#", icon: "💎", level: "established" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "Layout",
    color: "#8b5cf6",
    skills: [
      { name: "React", icon: "⚛️", level: "established" },
      { name: "HTML5", icon: "🌐", level: "established" },
      { name: "CSS3", icon: "🎨", level: "established" },
      { name: "Tailwind CSS", icon: "💨", level: "established" },
      { name: "Three.js", icon: "🧊", level: "learning" },
      { name: "GSAP", icon: "✨", level: "learning" },
    ],
  },
  {
    id: "backend",
    label: "Backend & Databases",
    icon: "Server",
    color: "#06b6d4",
    skills: [
      { name: "Node.js", icon: "🟢", level: "established" },
      { name: "Express.js", icon: "🚀", level: "established" },
      { name: "MongoDB", icon: "🍃", level: "established" },
      { name: "MySQL", icon: "🗄️", level: "established" },
      { name: "REST APIs", icon: "🔌", level: "established" },
    ],
  },
  {
    id: "testing",
    label: "Testing & Tools",
    icon: "TestTube2",
    color: "#10b981",
    skills: [
      { name: "Postman", icon: "📮", level: "established" },
      { name: "Git", icon: "🌿", level: "established" },
      { name: "GitHub", icon: "🐙", level: "established" },
      { name: "MongoDB Compass", icon: "🧭", level: "established" },
      { name: "Manual Testing", icon: "🔍", level: "established" },
      { name: "Test Case Design", icon: "📋", level: "established" },
      { name: "Selenium", icon: "🤖", level: "learning" },
    ],
  },
];
