// ─── Project Data ────────────────────────────────────────────────────────────
// Each project appears in the Projects section with 3D tilt effects and photo preview.
// Demo or repo can be empty strings if not publicly hosted.

export const projects = [
  {
    id: 1,
    title: "TestTrack",
    subtitle: "Live QA Test Execution & Health Hub",
    description:
      "A comprehensive QA engineering platform for creating test suites, logging execution runs in real time, and visualizing pass/fail analytics with interactive status donuts.",
    longDescription:
      "TestTrack is a full-stack QA execution and reporting dashboard designed around real-world software testing workflows. It features live staging telemetry, dynamic test run breakdown (passed, failed, blocked, skipped), test case management, and database query sync. Built with a responsive React frontend and a robust Node/Express/MongoDB backend.",
    tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs", "QA Testing", "Data Viz"],
    image: "/projects/testtrack.png",
    demo: "https://testtrack-app-eight.vercel.app/",
    repo: "https://github.com/shaniRN8/TestTrack",
    category: "Full-Stack & QA",
    color: "#3b82f6",
    badge: "QA Execution",
    stats: "17% Pass Rate · 6 Runs · Live Staging",
    featured: true,
  },
  {
    id: 2,
    title: "SkyPulse AI & Environmental Metrics",
    subtitle: "Climate Radar Telemetry & Smart Advisory System",
    description:
      "An intelligent environmental monitoring dashboard featuring dynamic circular gauges, multi-metric climate radar profiles, and an automated AI advisor providing comfort and outdoor suitability insights.",
    longDescription:
      "SkyPulse AI merges machine learning and real-time meteorological sensing into an immersive dark-mode dashboard. It tracks temperature, humidity, wind velocity, barometric pressure, cloud density, and rainfall with animated radial gauges. A spider radar chart plots multi-variable climate signatures while an AI Smart Advisory delivers context-aware outdoor recommendations.",
    tech: ["Python", "Machine Learning", "Streamlit", "Plotly", "Radar Charts", "AI Insights"],
    image: "/projects/skypulse.png",
    demo: "https://shanirn8-weather-prediction-app-g2eaed.streamlit.app/",
    repo: "",
    category: "AI & ML",
    color: "#06b6d4",
    badge: "Climate AI",
    stats: "6 Metrics · AI Advisory · Radar Profiler",
    featured: true,
  },
  {
    id: 3,
    title: "QuickBite",
    subtitle: "Ultra-Fast Food Delivery Platform",
    description:
      "A modern, high-conversion food delivery ecosystem with rapid ordering flows, dynamic dish showcasing, real-time delivery estimates, and a microservices-driven backend architecture.",
    longDescription:
      "QuickBite delivers an appetizing, high-performance UI coupled with a distributed microservices architecture. It showcases restaurant storefronts, real-time dish ratings, free delivery triggers, and an optimized 25-minute delivery dispatch tracker. The architecture decouples auth, cart, payments, and restaurant services using Docker and REST APIs.",
    tech: ["React", "Node.js", "Microservices", "Docker", "REST APIs", "UI/UX Design"],
    image: "/projects/quickbite.png",
    demo: "",
    repo: "",
    category: "Full-Stack & Web",
    color: "#f97316",
    badge: "Food Tech",
    stats: "25 Min Delivery · 4.9 Rating · Microservices",
    featured: false,
  },
  {
    id: 4,
    title: "Internship AI Assistant",
    subtitle: "Autonomous Multi-Agent Career & RAG Suite",
    description:
      "A sophisticated 5-agent autonomous suite empowering university IT students with instant RAG-powered knowledge Q&A, automated CV scoring & bullet revision, and STAR mock interview coaching.",
    longDescription:
      "Internship AI Assistant leverages multi-agent orchestration to guide tech undergraduates through every internship milestone. The 5-agent pipeline includes: 1) Router Agent for query classification, 2) RAG Worker Agent for grounded knowledge retrieval, 3) Reflection Agent for quality polishing, 4) CV Analysis Agent for scoring and bullet optimization, and 5) Interview Coach Agent for real-time STAR evaluation.",
    tech: ["Python", "Multi-Agent System", "RAG", "LLMs", "Vector DB", "Streamlit", "LangChain"],
    image: "/projects/internship-ai.png",
    demo: "https://internship-ai-assistant-yd74qsp7c9kxsyxrmxccxg.streamlit.app/",
    repo: "",
    category: "AI & Multi-Agent",
    color: "#8b5cf6",
    badge: "5-Agent AI",
    stats: "5-Agent Pipeline · RAG Q&A · STAR Coaching",
    featured: true,
  },
  {
    id: 5,
    title: "GreenLeaf Organic Market",
    subtitle: "Farm-Fresh Organic Living & Storefront",
    description:
      "A clean, vibrant e-commerce platform connecting ethical local organic farms directly to consumers with subscription baskets, USDA-certified fresh catalogs, and same-day delivery.",
    longDescription:
      "GreenLeaf provides an eco-conscious shopping experience emphasizing sustainability and farm freshness. Features include weekly farm-fresh basket subscriptions, interactive category filtering (produce, dairy, bakery, superfoods), promo discount incentives, and verified certifications (100% Non-GMO, USDA Organic, Eco-Friendly packaging).",
    tech: ["React", "JavaScript", "E-Commerce", "Responsive UI", "CSS Modern Architecture"],
    image: "/projects/greenleaf.png",
    demo: "",
    repo: "",
    category: "Full-Stack & Web",
    color: "#10b981",
    badge: "E-Commerce",
    stats: "100% Organic · Farm-to-Table · Fresh Catalog",
    featured: false,
  },
];
