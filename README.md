# Shani Randika — 3D Interactive Portfolio

A premium, fully interactive 3D portfolio built with **React**, **Three.js**, **React Three Fiber**, **GSAP**, and **vanilla CSS**. Designed to make a strong first impression on recruiters for IT internship applications.

## ✨ Features

- **Full-screen 3D hero** — distorted sphere, particle field, floating rings, mouse-reactive
- **GSAP animations** — staggered text reveals, scroll-triggered section transitions, smooth page feel
- **Tabbed Skills section** — categorised with learning/established distinction
- **Project cards** — 3D hover tilt, animated modals, tech badges
- **Animated Timeline** — zigzag journey section with scroll reveals
- **Contact section** — social links, copy-email interaction
- **Responsive** — desktop, tablet, and mobile layouts
- **WebGL fallback** — graceful degradation when WebGL is unavailable
- **Reduced-motion** — respects OS accessibility preference
- **SEO optimised** — meta tags, semantic HTML, heading hierarchy

## 🗂️ Project Structure

```
src/
├── components/
│   ├── Navbar.jsx       # Sticky nav, active section, mobile menu
│   ├── Hero.jsx         # Hero with 3D scene, GSAP entrance
│   ├── Scene3D.jsx      # React Three Fiber canvas, particles, sphere
│   ├── About.jsx        # Profile card (3D tilt), highlight cards
│   ├── Skills.jsx       # Tabbed skills with animated cards
│   ├── Projects.jsx     # 3D hover project cards + modal
│   ├── Journey.jsx      # Animated vertical timeline
│   ├── Contact.jsx      # Social links, copy-email
│   └── Footer.jsx
├── data/
│   ├── config.js        # ← Edit contact info, social links here
│   ├── projects.js      # ← Add/edit projects here
│   └── skills.js        # ← Add/edit skills here
├── hooks/
│   └── useAnimation.js
├── styles/
│   └── index.css        # All styles (design tokens, components)
├── App.jsx
└── main.jsx
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will open at [http://localhost:5173](http://localhost:5173).

### Build for Production

```bash
npm run build
npm run preview   # Preview the production build locally
```

## ⚙️ Customisation

### Add your contact details
Edit [`src/data/config.js`](src/data/config.js):

```js
export const config = {
  github: "https://github.com/shaniRN8",
  linkedin: "https://linkedin.com/in/your-profile", // ← add this
  email: "your@email.com",                           // ← add this
};
```

### Add a new project
Edit [`src/data/projects.js`](src/data/projects.js) and add a new object to the `projects` array.

### Add/edit skills
Edit [`src/data/skills.js`](src/data/skills.js).

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the `dist/` folder into Netlify's dashboard
```

### GitHub Pages
```bash
npm install --save-dev gh-pages
# Add to package.json scripts: "deploy": "gh-pages -d dist"
npm run build && npm run deploy
```

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| Three.js | 3D rendering engine |
| React Three Fiber | React renderer for Three.js |
| @react-three/drei | Helpers (Points, MeshDistortMaterial, etc.) |
| GSAP + ScrollTrigger | Animations |
| Lucide React | Icons |
| Vanilla CSS | Styling (custom design system) |

## 📝 License

MIT — free to use and adapt for your own portfolio.
