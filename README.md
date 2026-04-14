# 🕷️ SPIDEY — The Spider-Verse

An immersive, animated Spider-Man fan website built with React, GSAP, and Tailwind CSS. Features cinematic scroll animations, a custom spider-themed cursor, 3D card effects, and a multi-universe character explorer.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)

---

## ✨ Features

- **Cinematic Loader** — Full-screen loading screen with animated spider icon, rotating web lines, and a progress counter
- **Custom Spider Cursor** — Replaces the default cursor with an animated spider dot, trailing web effects, and radial web bursts on click
- **Hero Section** — Auto-rotating image carousel with parallax mouse tracking and particle effects
- **Scroll Banner** — Direction-aware scrolling marquee that reverses based on scroll direction
- **Origin Story** — Scroll-triggered animated cards with parallax imagery and stat counters
- **3D Gallery** — Horizontal carousel of Spider-Man variants with tilt-on-hover 3D card effects
- **Universe Explorer** — Multi-universe character profiles (Peter Parker, Miles Morales, Gwen Stacy & more) with alternating layouts and scrolling marquee backgrounds
- **Smooth Animations** — Powered by GSAP ScrollTrigger throughout the entire site

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **GSAP 3.12** | Scroll & motion animations |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ProbhakarRoy145/Spider-Verse.git

# Navigate into the project
cd Spider-Verse

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
spidey/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── components/
│   │   ├── Loader.jsx      # Animated loading screen
│   │   ├── SpiderCursor.jsx# Custom spider-themed cursor
│   │   ├── Navbar.jsx      # Fixed navigation bar
│   │   ├── Hero.jsx        # Hero section with image carousel
│   │   ├── ScrollBanner.jsx# Scrolling text marquee
│   │   ├── About.jsx       # Origin story & stats section
│   │   ├── Gallery.jsx     # 3D card gallery carousel
│   │   ├── Universe.jsx    # Multi-universe character explorer
│   │   └── Footer.jsx      # Footer with newsletter signup
│   ├── App.jsx             # Root component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html
├── package.json
└── vite.config.js
```

---

## 📸 Sections Overview

| Section | Description |
|---|---|
| **Loader** | Spider icon animation with progress counter |
| **Hero** | Rotating carousel, parallax, particles |
| **Scroll Banner** | "WELCOME TO THE SPIDER-VERSE" marquee |
| **About** | Origin story cards with animated stats |
| **Gallery** | 3D tilt cards of Spider-Man variants |
| **Universe** | Character profiles across the multiverse |
| **Footer** | Links, newsletter, animated web SVG |

---

## 📄 License

This project is for educational and fan purposes only. Spider-Man and all related characters are trademarks of Marvel/Sony.

---

**Made with 🕸️ by [Probhakar Roy](https://github.com/ProbhakarRoy145)**
