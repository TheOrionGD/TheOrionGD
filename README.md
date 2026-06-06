<!-- BANNER -->
<div align="center">

```
 ██████╗  ██████╗ ██████╗ ███████╗██████╗ ███████╗██╗   ██╗    ████████╗██████╗
██╔════╝ ██╔═══██╗██╔══██╗██╔════╝██╔══██╗██╔════╝╚██╗ ██╔╝    ╚══██╔══╝██╔══██╗
██║  ███╗██║   ██║██║  ██║█████╗  ██████╔╝█████╗   ╚████╔╝        ██║   ██████╔╝
██║   ██║██║   ██║██║  ██║██╔══╝  ██╔══██╗██╔══╝    ╚██╔╝         ██║   ██╔══██╗
╚██████╔╝╚██████╔╝██████╔╝██║     ██║  ██║███████╗   ██║          ██║   ██║  ██║
 ╚═════╝  ╚═════╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚══════╝   ╚═╝          ╚═╝   ╚═╝  ╚═╝
```

### **GODFREY T R — Interactive Developer Portfolio**
*Turning ideas into intelligent systems and interactive realities.*

---

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-gds--portfolio.vercel.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://gds-portfolio.vercel.app)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Three.js](https://img.shields.io/badge/Three.js-0.160.0-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/OrionGD/Godfrey-Portfolio?style=for-the-badge&logo=github&color=ffd700)](https://github.com/TheOrionGD/Godfrey-Portfolio)
[![Profile Views](https://komarev.com/ghpvc/?username=OrionGD&label=PROFILE+VIEWS&color=06b6d4&style=for-the-badge)](https://github.com/TheOrionGD)

</div>

---

## 🧬 The Developer's Story

<details open>
<summary><strong>Click to expand — the full story behind Godfrey T R Portfolio</strong></summary>

### ✨ Project Inspiration

Every developer reaches a moment where their GitHub profile and a traditional resume fail to capture who they truly are. Certifications, internships, achievements, live demos — they all deserve more than a static PDF or a plain list. This portfolio was born from a single conviction: *a developer's work should be experienced, not just read*.

The inspiration came from exploring interactive media, 3D web experiences, and premium SaaS design systems. The challenge was to synthesise all of that into a single, cohesive application that felt both performant and visually extraordinary.

---

### 👨‍💻 Meet the Developer

**Godfrey T R** is a Software Engineer and B.E. Computer Science student at K. Ramakrishnan College of Technology, Tiruchirapalli, India. His specialisation spans Full-Stack Development, AI Integration, Augmented Reality, and Cybersecurity. He currently serves as Vice President of the XR Club at his university and is actively involved in NSS volunteering, software bootcamp facilitation, and mentoring junior students.

Godfrey holds a Microsoft Azure AI Engineer Associate (AI-102) certification, an Applied Generative AI Specialization, and a registered patent for an Android TV control mechanism using IR sensors. His philosophy is simple: **write code that is architectural, not just functional.**

---

### 🧗 The Challenge

Building a production-grade portfolio is deceptively complex. The challenges were multi-dimensional:

- **Asset Management at Scale:** Storing, serving, and retrieving 40+ high-resolution gallery images, 40+ PDF/image certificates, and dynamic metadata from a cloud database without bloating the repository.
- **Performance vs. Visual Richness:** Rendering particle systems, animated 3D backgrounds, smooth page transitions, and interactive certificate viewers — all without sacrificing Core Web Vitals scores.
- **Cross-Platform Consistency:** Delivering a seamless experience across desktop Chrome, mobile Safari, and every browser in between, including handling mobile-specific touch interactions for an immersive gallery.
- **Backend Without Backend:** Designing an asset-serving pipeline where the Vite dev server itself acts as a transparent proxy to MongoDB GridFS, eliminating the need for a separate Node.js development server.

---

### 🎨 Design Philosophy

The design system was built around three pillars:

1. **Cyber-Noir Aesthetic** — A deep `#020810` background with `cyan-400` (`#06b6d4`) as the primary accent, evoking a high-tech control room. Every element feels deliberate and intentional.
2. **Motion as Communication** — Framer Motion animations are not decorative; they guide the user's eye, communicate hierarchy, and provide feedback. Every entrance, hover, and exit has a purpose.
3. **Information Density with Clarity** — Certifications, skills, projects, and gallery images are all dense content. The design uses cards, modals, tabs, and filtering to expose depth without overwhelming the user on initial load.

---

### ⚙️ Engineering Journey

The engineering journey went through three distinct phases:

**Phase 1 — Foundation & Architecture**
Setting up the Vite + React + TypeScript pipeline with TailwindCSS v4 (using the new `@tailwindcss/vite` plugin instead of PostCSS). Configuring ESLint with TypeScript-aware rules, establishing the folder structure, and wiring up React Router for multi-page navigation.

**Phase 2 — Asset Pipeline Innovation**
The most technically interesting challenge: building a custom Vite plugin (`vite-plugin-mongo-assets.js`) that intercepts all `/assets/*` requests within the Vite development server and streams files directly from MongoDB GridFS. This meant zero local asset storage, zero separate backend, and a fully self-contained development experience. For production (Vercel), a serverless function in `/api/assets.js` replicates this behaviour.

**Phase 3 — UI/UX Polish**
Building the 23 React components — from the animated `NeonGridBackground` (Three.js particle system) to the immersive `FullCertificates` viewer with PDF embedding, from the masonry-style `Gallery` to the filterable `Projects` grid. Each component was built with micro-interactions, responsive behaviour, and accessibility in mind.

---

### 🔐 Security-First Thinking

From the beginning, security was a design constraint, not an afterthought:

- **Environment Variables Only:** MongoDB connection strings, database names, and API keys are never hardcoded. They live exclusively in `.env` files, which are gitignored.
- **CORS Policy:** The Express server enforces CORS; the Vite plugin mirrors this in development. No cross-origin requests are accepted without explicit policy.
- **GridFS Isolation:** Assets are served by filename lookup — the server never exposes directory listings, database names, or bucket structures to the client.
- **Content-Type Enforcement:** PDF files explicitly receive `application/pdf` content-type headers regardless of what is stored in GridFS metadata, preventing content-sniffing attacks.
- **Input Sanitisation:** All asset paths are decoded and validated before being passed to GridFS queries.

---

### 📋 Building the Certificate Workflow

The certificate archive contains 40+ credentials across 10 categories. The design challenge was accessibility without clutter:

1. A **filterable tab interface** allows visitors to navigate by category (Core Professional, AI & Generative AI, Microsoft, Internship, etc.).
2. Each certificate card shows the issuer, credential name, and a tag badge.
3. Clicking a certificate opens a **full-screen modal viewer** that embeds PDF documents via `<iframe>` with forced `inline` content-disposition, or renders PNG/JPG images directly — all streamed live from MongoDB GridFS.
4. A keyboard-accessible close mechanism and scroll-lock ensure the modal is usable without a mouse.

---

### 🖥️ User Experience Decisions

Several deliberate UX decisions shaped the final product:

| Decision | Rationale |
|---|---|
| **Full-screen loader on first visit** | Sets the tone, preloads critical resources, and creates anticipation. |
| **Sticky glassmorphism navbar** | Maintains navigation context at all scroll positions without obscuring content. |
| **Section-based scrolling on Home** | Keeps the user in a single context; routing is reserved for deep-link destinations (Gallery, Certificates). |
| **Certificate tabs vs. search** | Tab-based filtering is faster to scan at a glance; search would require typing before seeing options. |
| **Gallery masonry layout** | Photographs of varying aspect ratios look natural in a masonry grid rather than a forced square grid. |
| **Hero particle system** | Three.js particles are rendered on a dedicated canvas behind the hero content, creating depth without competing with text. |

---

### 🛠️ Technical Challenges & Solutions

**Challenge 1: PDF Streaming in Production**
Vercel serverless functions have a 50 MB response size limit and a 10-second timeout. Large PDF files required implementing streaming responses using Node.js streams piped directly to the Vercel response object, bypassing buffering entirely.

**Challenge 2: Vite HMR with Custom Plugin**
The custom `mongoAssetsPlugin` needed to coexist with Vite's Hot Module Replacement system. Careful use of `configureServer` hooks and explicit middleware ordering ensured that asset requests were intercepted before Vite's own static file handler could return a 404.

**Challenge 3: TypeScript Strict Mode with React Icons**
The `react-icons` library's TypeScript types are not always perfectly aligned with strict mode. Custom type wrappers were created in `types.ts` to handle icon component props without casting.

**Challenge 4: Framer Motion + Three.js Coexistence**
Both libraries manage their own render loops. Careful separation of the Three.js canvas (managed outside React's reconciler) from Framer Motion's DOM animations was essential to prevent jank and dropped frames.

---

### 🤝 Collaboration Story

This portfolio was designed and built entirely by Godfrey T R as a solo engineering project. The design drew inspiration from the broader developer community — including Dribbble design shots, GitHub README aesthetics, and Awwwards-winning portfolio sites. The codebase is open-source, and contributions that improve performance, accessibility, or feature completeness are welcome via Pull Request.

---

### 📚 Lessons Learned

1. **Custom Vite plugins are powerful** — The MongoDB GridFS Vite plugin saved hundreds of megabytes from the repository and made the development workflow feel seamless.
2. **TypeScript pays dividends** — Strict typing caught dozens of potential runtime errors during development, especially around the certificate and gallery data structures.
3. **Framer Motion's `LayoutGroup`** — Using `LayoutGroup` at the router level created smooth shared-layout transitions between routes without complex state management.
4. **MongoDB Atlas is a viable asset store** — For a project of this scale, Atlas GridFS is a cost-effective, globally distributed CDN replacement for media assets.
5. **Design systems before components** — Defining the colour palette, spacing scale, and typography system in `index.css` before writing a single component prevented visual inconsistency.

---

### 🔭 Future Vision

The roadmap includes several planned improvements:

- **Real-time GitHub Activity Feed** — Live commit history and contribution graph rendered directly from the GitHub API.
- **Blog Section** — A markdown-powered writing section for technical articles and project postmortems.
- **Contact Form with Email** — A serverless Nodemailer function behind a CAPTCHA to handle inbound messages.
- **Dark/Light Theme Toggle** — A full CSS variable-based theme system allowing users to switch between the default cyber-noir dark mode and a high-contrast light mode.
- **PWA Support** — Service worker registration and a Web App Manifest for installable offline access.
- **Internationalisation (i18n)** — Content translation support for Tamil and other regional languages.

---

### 🏷️ Behind the Name

The GitHub handle **OrionGD** is a fusion of *Orion* — the constellation representing a hunter and a navigator, symbolising ambition and direction — and *GD*, the initials of Godfrey. It represents the developer's drive to chart new territory at the intersection of AI, spatial computing, and the web.

---

### 💬 Message from the Developer

> *"This portfolio is more than a showcase — it's a proof of concept. A proof that a solo developer, armed with the right tools and an uncompromising design vision, can build production-quality, visually exceptional software. Every component in this codebase was written with intentionality: clear separation of concerns, type safety, accessible markup, and a user experience that I would be proud to hand to any senior engineer or hiring manager. I hope it inspires you to build something extraordinary."*
>
> — **Godfrey T R**, Software Engineer & XR Club Vice President

</details>

---

## 📋 Table of Contents

<details>
<summary>Click to expand full table of contents</summary>

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [System Architecture](#-system-architecture)
  - [High-Level Architecture](#high-level-architecture)
  - [Asset Pipeline Architecture](#asset-pipeline-architecture)
  - [Component Hierarchy](#component-hierarchy)
  - [Request Flow Diagram](#request-flow-diagram)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Configuration](#environment-configuration)
  - [Development Server](#development-server)
  - [Production Build](#production-build)
- [Configuration Reference](#-configuration-reference)
  - [Vite Configuration](#vite-configuration)
  - [TypeScript Configuration](#typescript-configuration)
  - [ESLint Configuration](#eslint-configuration)
- [Component Documentation](#-component-documentation)
  - [Core Components](#core-components)
  - [Section Components](#section-components)
  - [Utility Components](#utility-components)
- [Asset Management System](#-asset-management-system)
  - [MongoDB GridFS Integration](#mongodb-gridfs-integration)
  - [Custom Vite Plugin](#custom-vite-plugin)
  - [Vercel Serverless API](#vercel-serverless-api)
  - [Asset Upload Workflow](#asset-upload-workflow)
- [Data Architecture](#-data-architecture)
  - [Type Definitions](#type-definitions)
  - [Constants Structure](#constants-structure)
- [Routing & Navigation](#-routing--navigation)
- [Animations & Motion Design](#-animations--motion-design)
- [Styling System](#-styling-system)
- [API Reference](#-api-reference)
- [Deployment Guide](#-deployment-guide)
  - [Vercel Deployment](#vercel-deployment)
  - [Manual Deployment](#manual-deployment)
  - [Environment Variables in Production](#environment-variables-in-production)
- [Performance Optimisation](#-performance-optimisation)
- [Security & Privacy](#-security--privacy)
- [Testing](#-testing)
- [Troubleshooting](#-troubleshooting)
- [Scalability Considerations](#-scalability-considerations)
- [Contributing](#-contributing)
- [Changelog](#-changelog)
- [FAQ](#-faq)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)
- [Contact](#-contact)

</details>

---

## 🌐 Overview

**Godfrey T R Portfolio** is a high-performance, interactive personal portfolio application designed to showcase technical achievements, professional experience, and creative projects through a premium web experience. Built with a modern React ecosystem and powered by a cloud-native asset pipeline, the portfolio delivers the visual richness of a AAA design agency product with the technical depth expected of a production-grade software system.

The application features a Three.js-powered animated background, smooth Framer Motion page transitions, a MongoDB Atlas GridFS asset delivery system, a full-screen certificate archive with live PDF streaming, a masonry photography gallery, interactive project showcases, and real-time GitHub activity integration. Every component is written in TypeScript with strict type safety, and the entire codebase follows a clean, modular architecture.

This is not a static site. It is a **full-stack web application** with a custom Vite development plugin, a Vercel serverless backend, and a MongoDB cloud database — all working together to deliver a seamless, lag-free experience.

---

## 🚀 Live Demo

<div align="center">

| Environment | URL | Status |
|---|---|---|
| **Production** | [gds-portfolio.vercel.app](https://gds-portfolio.vercel.app) | 🟢 Live |
| **Home** | `/` | ✅ Active |
| **Full Gallery** | `/gallery` | ✅ Active |
| **Certificates** | `/certificates` | ✅ Active |

</div>

---

## ✨ Key Features

### Visual & Interactive

| Feature | Description |
|---|---|
| **Three.js Particle System** | An animated neon grid and particle background rendered in WebGL using Three.js, creating an immersive cyber-aesthetic atmosphere. |
| **Framer Motion Transitions** | Every route change, card entrance, and element hover is animated using Framer Motion with carefully tuned spring physics and easing curves. |
| **Glassmorphism UI** | Cards, navigation bars, and modals use CSS backdrop-filter with semi-transparent backgrounds for a premium frosted-glass aesthetic. |
| **Responsive Design** | Fully responsive from 320px mobile screens to 4K displays, using TailwindCSS utility classes and custom CSS breakpoints. |
| **Custom Loader** | A branded full-screen loader with animated text and progress indication that creates anticipation and hides the initial paint flash. |

### Content & Data

| Feature | Description |
|---|---|
| **Certificate Archive** | 40+ credentials from Microsoft, Simplilearn, HackerRank, NPTEL, Coursera, and more — categorised, tagged, and viewable inline. |
| **Project Showcase** | 12+ projects across AI/ML, Systems, XR, Web, and Cybersecurity categories with GitHub links and live demos. |
| **Masonry Gallery** | 25+ high-resolution event and campus photographs in an intelligent masonry layout with lightbox viewing. |
| **Skills Matrix** | Categorised skill display across 10 domains including languages, frameworks, AI systems, XR, and design tools. |
| **Hackathon & Leadership** | Dedicated sections for extracurricular achievements, XR Club leadership, and NSS volunteering. |
| **Coding Profiles** | Live-linked profiles for LeetCode, HackerRank, GitHub, and LinkedIn. |
| **GitHub Activity** | Real-time GitHub contribution heatmap and activity graph. |

### Technical

| Feature | Description |
|---|---|
| **MongoDB GridFS Assets** | All media assets (images, PDFs) are stored in MongoDB Atlas GridFS and streamed on demand — no repository bloat. |
| **Custom Vite Plugin** | A zero-dependency Vite plugin intercepts asset requests and proxies them to MongoDB without a separate backend process. |
| **Vercel Serverless API** | A production serverless function replicates the Vite plugin behaviour for deployed environments. |
| **TypeScript Strict Mode** | The entire codebase is written in TypeScript with strict mode enabled, ensuring maximum type safety. |
| **Environment Isolation** | All credentials are managed via `.env` files with no hardcoded secrets anywhere in the codebase. |

---

## 🛠️ Technology Stack

<div align="center">

### Core Runtime

| Technology | Version | Role |
|---|---|---|
| React | 19.2.3 | UI component framework |
| TypeScript | ~5.8.2 | Type-safe JavaScript superset |
| Vite | ^6.2.0 | Build tool and dev server |
| React Router DOM | ^7.14.0 | Client-side routing |

### Styling & Animation

| Technology | Version | Role |
|---|---|---|
| TailwindCSS | ^4.2.2 | Utility-first CSS framework |
| @tailwindcss/vite | ^4.2.2 | Tailwind v4 Vite integration |
| Framer Motion | ^12.23.26 | Production-ready motion library |
| React Icons | ^5.5.0 | Comprehensive icon library |

### 3D & Graphics

| Technology | Version | Role |
|---|---|---|
| Three.js | 0.160.0 | WebGL 3D rendering engine |

### Backend & Data

| Technology | Version | Role |
|---|---|---|
| Express | ^5.2.1 | Minimal Node.js web framework |
| MongoDB | ^7.2.0 | MongoDB Node.js driver |
| dotenv | ^17.4.2 | Environment variable management |
| cors | ^2.8.6 | Cross-Origin Resource Sharing |

### Development Tools

| Technology | Version | Role |
|---|---|---|
| ESLint | ^8.57.0 | JavaScript/TypeScript linting |
| @typescript-eslint | ^8.58.1 | TypeScript ESLint integration |
| Autoprefixer | ^10.4.27 | CSS vendor prefix automation |
| PostCSS | ^8.5.9 | CSS transformation pipeline |

### Infrastructure & Deployment

| Technology | Role |
|---|---|
| Vercel | Hosting, CDN, serverless functions |
| MongoDB Atlas | Cloud database and GridFS asset storage |
| GitHub | Source control and CI/CD trigger |

</div>

---

## 🏗️ System Architecture

### High-Level Architecture

```mermaid
graph TB
    subgraph "Client Browser"
        B[React SPA<br/>React 19 + TypeScript]
        B --> C[Three.js Canvas<br/>WebGL Background]
        B --> D[Framer Motion<br/>Animation Engine]
        B --> E[React Router<br/>Client-Side Navigation]
    end

    subgraph "Vite Dev Server (Local)"
        F[Vite Dev Server :3000]
        F --> G[Custom MongoAssets Plugin<br/>vite-plugin-mongo-assets.js]
        G --> H[(MongoDB Atlas<br/>GridFS Bucket)]
    end

    subgraph "Vercel Production"
        I[Vercel Edge Network<br/>CDN + Static Assets]
        I --> J[Serverless Function<br/>/api/assets.js]
        J --> H
    end

    subgraph "External Services"
        K[Google Fonts<br/>Inter Typeface]
        L[GitHub API<br/>Activity Feed]
    end

    B -->|"/assets/* requests"| G
    B -->|"Production /assets/*"| J
    B --> K
    B --> L
```

---

### Asset Pipeline Architecture

```mermaid
sequenceDiagram
    participant Client as Browser Client
    participant Vite as Vite Dev Server
    participant Plugin as MongoAssets Plugin
    participant Atlas as MongoDB Atlas
    participant GFS as GridFS Bucket

    Client->>Vite: GET /assets/CampusX.jpg
    Vite->>Plugin: Intercept /assets/* middleware
    Plugin->>Atlas: Connect (CONNECTION_STRING)
    Atlas-->>Plugin: Connected
    Plugin->>GFS: Find file: /assets/CampusX.jpg
    GFS-->>Plugin: File metadata (contentType, size)
    Plugin->>GFS: openDownloadStreamByName()
    GFS-->>Plugin: ReadableStream
    Plugin-->>Client: Pipe stream with Content-Type headers
    Note over Client: File renders inline in browser
```

---

### Component Hierarchy

```mermaid
graph LR
    A[App.tsx] --> B[Router]
    B --> C[NeonGridBackground]
    B --> D[Loader]
    B --> E{Routes}
    E --> F[Home /]
    E --> G[FullGallery /gallery]
    E --> H[FullCertificates /certificates]

    F --> F1[Navbar]
    F --> F2[Hero]
    F --> F3[About]
    F --> F4[Skills]
    F --> F5[Experience]
    F --> F6[Projects]
    F --> F7[AIProjects]
    F --> F8[ImmersiveSystems]
    F --> F9[ScalableSystems]
    F --> F10[Certifications]
    F --> F11[Hackathons]
    F --> F12[Academics]
    F --> F13[Gallery]
    F --> F14[CodingProfiles]
    F --> F15[GithubActivity]
    F --> F16[Leadership]
    F --> F17[LeetCodeActivity]
    F --> F18[Contact]
```

---

### Request Flow Diagram

```mermaid
flowchart TD
    A[User visits gds-portfolio.vercel.app] --> B{Is static asset?}
    B -->|Yes: JS/CSS/HTML| C[Served from Vercel CDN]
    B -->|No: /assets/* media| D[Vercel Rewrite Rule]
    D --> E[/api/assets?path=...]
    E --> F[Serverless Function]
    F --> G{MongoDB connected?}
    G -->|No| H[Connect to Atlas]
    H --> I[GridFS bucket lookup]
    G -->|Yes, cached| I
    I --> J{File found?}
    J -->|Yes| K[Stream file with headers]
    J -->|No| L[Return 404]
    K --> M[Client receives media]
    C --> N[Page renders]
    M --> N
```

---

## 📁 Project Structure

```
Godfrey-Portfolio/
│
├── 📄 index.html                    # Application shell HTML
├── 📄 index.tsx                     # React entry point, ReactDOM.render
├── 📄 App.tsx                       # Root component: Router + Loader + Theme
├── 📄 index.css                     # Global styles, CSS variables, animations
├── 📄 constants.ts                  # All data: projects, skills, certs, experience
├── 📄 types.ts                      # TypeScript type definitions
│
├── 📁 components/                   # All React UI components
│   ├── 📄 Navbar.tsx                # Sticky glassmorphism navigation bar
│   ├── 📄 Hero.tsx                  # Landing section with animated intro
│   ├── 📄 About.tsx                 # Developer bio and summary
│   ├── 📄 Skills.tsx                # Categorised skill matrix
│   ├── 📄 Experience.tsx            # Internship timeline
│   ├── 📄 Projects.tsx              # Filterable project grid
│   ├── 📄 AIProjects.tsx            # AI/ML-specific project showcase
│   ├── 📄 ImmersiveSystems.tsx      # XR/AR project showcase
│   ├── 📄 ScalableSystems.tsx       # Systems engineering showcase
│   ├── 📄 Certifications.tsx        # Top certifications summary
│   ├── 📄 FullCertificates.tsx      # Full archive with PDF viewer modal
│   ├── 📄 Hackathons.tsx            # Hackathon achievements
│   ├── 📄 Academics.tsx             # Education timeline
│   ├── 📄 Gallery.tsx               # Masonry gallery preview
│   ├── 📄 FullGallery.tsx           # Full-screen gallery page
│   ├── 📄 CodingProfiles.tsx        # LeetCode/HackerRank/GitHub links
│   ├── 📄 GithubActivity.tsx        # GitHub contribution graph
│   ├── 📄 LeetCodeActivity.tsx      # LeetCode statistics display
│   ├── 📄 Leadership.tsx            # XR Club and extracurriculars
│   ├── 📄 Contact.tsx               # Contact form and social links
│   ├── 📄 Home.tsx                  # Main page section orchestrator
│   ├── 📄 Loader.tsx                # Full-screen animated loading screen
│   └── 📄 NeonGridBackground.tsx    # Three.js WebGL particle background
│
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 useThemeManager.ts        # Dynamic meta theme-color management
│   └── 📄 useIsMobile.ts            # Mobile breakpoint detection hook
│
├── 📁 api/                          # Vercel serverless functions
│   └── 📄 assets.js                 # MongoDB GridFS asset streaming endpoint
│
├── 📁 public/                       # Static public assets
│   └── 📄 favicon.svg               # Legacy SVG favicon
│
├── 📄 logo.png                      # Brand logo (used as favicon)
├── 📄 server.js                     # Standalone Express server (legacy/dev alt)
├── 📄 vite-plugin-mongo-assets.js   # Custom Vite plugin for GridFS dev serving
├── 📄 vite.config.ts                # Vite bundler configuration
├── 📄 tsconfig.json                 # TypeScript compiler configuration
├── 📄 package.json                  # npm manifest and scripts
├── 📄 package-lock.json             # Lockfile for reproducible installs
├── 📄 .eslintrc.cjs                 # ESLint rules configuration
├── 📄 .eslintignore                 # ESLint ignore patterns
├── 📄 .gitignore                    # Git ignore rules (includes .env)
├── 📄 vercel.json                   # Vercel rewrite rules and routing
├── 📄 clean-certs.mjs               # Utility: clean certificate filenames
├── 📄 flatten-certs.mjs             # Utility: flatten certificate paths
├── 📄 getImageSizes.js              # Utility: extract image dimensions
├── 📄 metadata.json                 # Project metadata
├── 📄 oriongd.md                    # GitHub profile README source
├── 📄 LICENSE                       # MIT License
└── 📄 README.md                     # This document
```

---

## 🚦 Getting Started

### Prerequisites

Before setting up this project, ensure your development environment meets the following requirements:

| Requirement | Minimum Version | Recommended | Purpose |
|---|---|---|---|
| Node.js | 18.x | 20.x LTS | Runtime for Vite, npm scripts |
| npm | 9.x | 10.x | Package management |
| Git | 2.x | Latest | Source control |
| MongoDB Atlas | — | Free tier or above | Asset storage (GridFS) |

> **Note on MongoDB:** You do not need a locally-installed MongoDB instance. The project connects exclusively to MongoDB Atlas (cloud). You will need to create a free Atlas account and cluster if you don't already have one.

---

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/TheOrionGD/Godfrey-Portfolio.git
cd Godfrey-Portfolio
```

**2. Install dependencies**

```bash
npm install
```

This will install all production and development dependencies as specified in `package.json`.

**3. Configure environment variables**

```bash
# Copy the environment template (if provided) or create from scratch
cp .env.example .env
# Edit with your actual credentials
```

---

### Environment Configuration

Create a `.env` file in the project root directory with the following variables:

```env
# ─────────────────────────────────────────────────────────────────
#  MongoDB Atlas Configuration
#  Required for asset streaming (images, PDFs via GridFS)
# ─────────────────────────────────────────────────────────────────

# Non-SRV MongoDB connection string (required for GridFS streaming)
# Format: mongodb://username:password@host:port/?authSource=admin
CONNECTION_STRING=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

# The database name where your GridFS bucket is stored
DATABASE_NAME=portfolio_assets

# ─────────────────────────────────────────────────────────────────
#  AI / Optional Integrations
#  If using the Gemini API for contact form or AI features
# ─────────────────────────────────────────────────────────────────

# Google Gemini API Key (optional, for AI features)
GEMINI_API_KEY=your_gemini_api_key_here
```

> ⚠️ **Security Warning:** Never commit your `.env` file to version control. It is already listed in `.gitignore`. If you accidentally expose credentials, rotate them immediately in MongoDB Atlas and the Google AI Studio.

**Environment Variable Reference:**

| Variable | Required | Description |
|---|---|---|
| `CONNECTION_STRING` | ✅ Yes | MongoDB Atlas connection string (Non-SRV format recommended for GridFS) |
| `DATABASE_NAME` | ✅ Yes | Name of the Atlas database containing the GridFS bucket |
| `GEMINI_API_KEY` | ⬜ Optional | Google Gemini API key for AI-powered features |

---

### Development Server

```bash
npm run dev
```

The Vite development server will start on `http://localhost:3000`. The custom `mongoAssetsPlugin` will automatically connect to MongoDB Atlas on the first asset request and begin serving files from GridFS.

**Expected terminal output on successful startup:**

```
  VITE v6.2.x  ready in 342 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
  ➜  press h + enter to show help

[MongoAssets Plugin] Connected to database: portfolio_assets
[MongoAssets Plugin] GridFS bucket: assetsBucket — ready to serve /assets/*
```

---

### Production Build

```bash
# Build the production bundle
npm run build

# Preview the production build locally
npm run preview
```

The build output is written to the `dist/` directory. This directory is what Vercel (or any static host) serves.

---

## ⚙️ Configuration Reference

### Vite Configuration

**File:** [`vite.config.ts`](./vite.config.ts)

```typescript
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mongoAssetsPlugin from './vite-plugin-mongo-assets.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      // No proxy needed — mongoAssetsPlugin handles /assets/* internally
    },
    plugins: [
      react(),
      tailwindcss(),
      mongoAssetsPlugin(), // Intercepts /assets/* → MongoDB GridFS
    ],
    define: {
      // Expose env vars to client-side code (never expose secrets here)
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
```

**Configuration options explained:**

| Key | Value | Purpose |
|---|---|---|
| `server.port` | `3000` | Dev server listens on port 3000 |
| `server.host` | `'0.0.0.0'` | Binds to all network interfaces (accessible on LAN) |
| `plugins` | `[react, tailwindcss, mongoAssets]` | Vite plugin chain |
| `define` | Env var map | Inlines env vars into the client bundle at build time |
| `resolve.alias` | `@` → project root | Enables `@/components/Foo` style imports |

---

### TypeScript Configuration

**File:** [`tsconfig.json`](./tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules", "dist"]
}
```

**Key compiler flags:**

| Flag | Value | Effect |
|---|---|---|
| `strict` | `true` | Enables all strict type-checking options |
| `noUnusedLocals` | `true` | Error on declared but unused variables |
| `noUnusedParameters` | `true` | Error on unused function parameters |
| `jsx` | `react-jsx` | Uses the modern JSX transform (no import React needed) |
| `moduleResolution` | `bundler` | Vite-compatible module resolution strategy |

---

### ESLint Configuration

**File:** [`.eslintrc.cjs`](./.eslintrc.cjs)

The ESLint setup extends recommended rules for both JavaScript and TypeScript, with React-specific hooks rules to prevent common pitfalls:

```javascript
module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
};
```

Run the linter with:

```bash
npm run lint
```

---

## 📦 Component Documentation

### Core Components

---

#### `App.tsx` — Root Application Component

The root component initialises the routing context, theme management hook, and application-level loading state. It orchestrates the transition from the loader screen to the main application.

```typescript
// Responsibilities:
// 1. Mounts the BrowserRouter for client-side navigation
// 2. Calls useThemeManager() to sync meta theme-color with current section
// 3. Manages global loading state (shows Loader until onComplete fires)
// 4. Wraps Routes in AnimatePresence + LayoutGroup for shared-layout transitions

function App() {
  useThemeManager();
  const [loading, setLoading] = useState(true);

  return (
    <Router>
      <NeonGridBackground />  {/* Three.js canvas — always rendered */}
      <LayoutGroup>
        <AnimatePresence>
          {loading && <Loader key="loader" onComplete={() => setLoading(false)} />}
        </AnimatePresence>
        {!loading && (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<FullGallery />} />
            <Route path="/certificates" element={<FullCertificates />} />
          </Routes>
        )}
      </LayoutGroup>
    </Router>
  );
}
```

---

#### `NeonGridBackground.tsx` — Three.js WebGL Particle System

This component creates the animated neon grid and floating particle effect visible throughout the application. It uses Three.js to render:

- A perspective camera with subtle animated drift
- A particle system of 1500+ points with randomised positions
- A grid helper aligned to the XZ plane with cyan accent colours
- Mouse-following interaction that subtly tilts the camera

**Key implementation details:**

```typescript
// Canvas is positioned fixed with z-index -1, ensuring it always renders
// behind all other UI elements without affecting layout flow.

// Three.js scene is created once via useEffect with empty deps array,
// and cleaned up on unmount to prevent WebGL context leaks.

// requestAnimationFrame loop drives the animation — no Framer Motion used here
// to avoid competing render loops.
```

---

#### `Loader.tsx` — Animated Loading Screen

The loader renders a full-viewport overlay with an animated progress sequence and brand identity. It accepts an `onComplete` callback that fires when the animation sequence finishes, signalling `App.tsx` to unmount the loader and display the main content.

```typescript
interface LoaderProps {
  onComplete: () => void;
}
```

The loader uses Framer Motion's `exit` animation to smoothly fade out and slide up before unmounting, creating a polished first-impression transition.

---

### Section Components

---

#### `Hero.tsx` — Landing Section

The hero section is the first content the user sees after the loader. It contains:

- Animated typewriter-style name reveal
- Role and tagline text with staggered entrance animations
- Social links (GitHub, LinkedIn, LeetCode, HackerRank)
- A call-to-action button linking to the contact section
- The Three.js particle canvas as a background layer

**Props:** None (reads from `constants.ts` → `PERSONAL_INFO`)

---

#### `Projects.tsx` — Filterable Project Grid

Renders all 12 projects from `PROJECTS` in `constants.ts` with client-side category filtering:

```
Categories: All | AI / ML | Systems | XR | Web | Cybersecurity
```

Each project card displays:
- Project title and category badge
- Technology stack chips
- Description text
- GitHub repository link
- Live demo link (when available)
- Hover animation with scale transform and glow effect

---

#### `FullCertificates.tsx` — Certificate Archive with PDF Viewer

The most complex component in the application. It renders a paginated, filterable certificate archive and opens a full-screen modal viewer for each credential.

**Features:**
- 10 category tabs with certificate count badges
- Certificate cards with issuer logo, name, category, and optional tags (e.g., "Winner", "Top Credential")
- Full-screen modal with `<iframe>` PDF embedding (forced `inline` content-disposition)
- Image fallback for `.png` and `.jpg` certificates
- Keyboard accessible (Escape to close)
- Scroll-lock on body when modal is open

**Modal architecture:**

```mermaid
stateDiagram-v2
    [*] --> CertificateList
    CertificateList --> ModalOpen: User clicks card
    ModalOpen --> PDFViewer: fileType === 'pdf' (default)
    ModalOpen --> ImageViewer: fileType === 'image'
    PDFViewer --> CertificateList: Close modal (Escape / X button)
    ImageViewer --> CertificateList: Close modal
```

---

#### `Gallery.tsx` & `FullGallery.tsx` — Photography Gallery

The `Gallery` component renders a masonry-style preview of the first 8 images from `GALLERY_IMAGES` with a "View All" link. `FullGallery` renders all 25+ images with a lightbox-style click-to-expand viewer.

Images are served from MongoDB GridFS via `/assets/` URLs and include explicit `width` and `height` attributes to prevent layout shift during load.

---

#### `Contact.tsx` — Contact Form & Social Links

Renders a contact section with:
- Developer contact information (email, phone, location)
- Social profile links with hover animations
- A structured message composition interface

---

### Utility Components

---

#### `Navbar.tsx` — Sticky Navigation Bar

A glassmorphism sticky navbar with:
- Brand logo and name
- Section navigation links with active-state highlighting
- Mobile hamburger menu with slide-down animation
- Smooth scroll-to-section behaviour using `document.querySelector`

---

## 📡 Asset Management System

### MongoDB GridFS Integration

All media assets — photographs, certificates, and other binary files — are stored in MongoDB Atlas using **GridFS**, MongoDB's specification for storing files larger than the 16 MB BSON document limit. GridFS splits files into configurable chunks and stores them across two collections:

- `assetsBucket.files` — File metadata (filename, contentType, size, uploadDate)
- `assetsBucket.chunks` — Binary file data in 255 KB chunks

Assets are accessed by their `filename` field, which follows the path convention `/assets/<filename>.<extension>`.

**Example GridFS document (files collection):**

```json
{
  "_id": ObjectId("..."),
  "filename": "/assets/CampusX.jpg",
  "contentType": "image/jpeg",
  "length": 542681,
  "chunkSize": 261120,
  "uploadDate": "2025-01-15T10:30:00.000Z",
  "metadata": {
    "alt": "Campus Experience",
    "category": "gallery"
  }
}
```

---

### Custom Vite Plugin

**File:** [`vite-plugin-mongo-assets.js`](./vite-plugin-mongo-assets.js)

This custom Vite plugin is the engineering centrepiece of the development workflow. It intercepts all HTTP requests matching `/assets/*` within the Vite dev server's middleware chain and streams the corresponding file from MongoDB GridFS.

```javascript
// Plugin lifecycle:
// 1. configureServer hook: Registers a middleware before Vite's internal handlers
// 2. On first /assets/* request: Establishes MongoDB connection (lazy init)
// 3. GridFS lookup: Queries assetsBucket.files for matching filename
// 4. Stream: Opens a download stream and pipes it directly to ServerResponse
// 5. On connection error: Falls through to Vite's 404 handler

export default function mongoAssetsPlugin() {
  return {
    name: 'mongo-assets',
    configureServer(server) {
      server.middlewares.use('/assets', async (req, res, next) => {
        // ... MongoDB GridFS streaming logic
      });
    },
  };
}
```

**Benefits of this approach:**

| Benefit | Detail |
|---|---|
| **Zero separate processes** | No `node server.js` needed alongside `vite dev` |
| **Automatic HMR compatibility** | Middleware registers before Vite's transform chain |
| **Lazy connection** | MongoDB client connects on first request, not at startup |
| **Transparent to components** | Components use standard `<img src="/assets/...">` — no special hooks |

---

### Vercel Serverless API

**File:** [`api/assets.js`](./api/assets.js)

In production, Vercel rewrites `/assets/:path*` requests to the serverless function `/api/assets.js`. This function replicates the dev plugin's behaviour using the same MongoDB driver and GridFS streaming API.

```javascript
// vercel.json rewrite rule:
// { "source": "/assets/:path*", "destination": "/api/assets?path=:path*" }

export default async function handler(req, res) {
  const filePath = '/assets/' + req.query.path;
  // ... same GridFS lookup and streaming as the Vite plugin
}
```

**Vercel rewrite configuration:**

```json
{
  "rewrites": [
    {
      "source": "/assets/:path*",
      "destination": "/api/assets?path=:path*"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

The catch-all rewrite `/(.*) → /index.html` ensures that React Router handles all non-asset, non-API URLs on the client side, enabling deep linking to `/gallery` and `/certificates`.

---

### Asset Upload Workflow

To add new assets to the portfolio, follow this workflow:

```mermaid
flowchart LR
    A[Local File] --> B[flatten-certs.mjs<br/>or manual MongoDB Compass]
    B --> C[MongoDB Atlas<br/>GridFS Upload]
    C --> D[Update constants.ts<br/>with new asset path]
    D --> E[Component renders<br/>via /assets/* URL]
```

**Using the utility scripts:**

```bash
# Flatten and normalise certificate filenames before upload
node flatten-certs.mjs

# Clean certificate filenames (remove special characters)
node clean-certs.mjs

# Extract image dimensions for constants.ts GALLERY_IMAGES entries
node getImageSizes.js
```

---

## 🗂️ Data Architecture

### Type Definitions

**File:** [`types.ts`](./types.ts)

All data structures used across the application are strongly typed:

```typescript
export interface Project {
  title: string;
  category: string;
  tech: string[];
  description: string;
  github: string;
  demo: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  details: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  year: string;
  description: string;
}

export interface CertificateFile {
  name: string;
  file: string;
  fileType?: 'pdf' | 'image';
  category: string;
  issuer: string;
  tag?: string;
}
```

---

### Constants Structure

**File:** [`constants.ts`](./constants.ts)

All portfolio content is centralised in `constants.ts`, acting as the application's single source of truth. This architecture means content updates never require touching component code:

```
constants.ts
├── getAssetUrl()           — Root-relative URL helper for GridFS assets
├── PERSONAL_INFO           — Name, role, tagline, contact details, social URLs
├── SOCIAL_LINKS            — Icon + URL + label array for social profile links
├── EDUCATION               — Degree, institution, and period array
├── EXPERIENCE              — Role, company, period, and detail points array
├── SKILLS                  — Categorised skill arrays (10 categories)
├── LEADERSHIP_XR           — Leadership roles and activities list
├── PROJECTS                — 12 projects with tech, description, links
├── CERTIFICATIONS          — Top 3 certifications for homepage summary
├── GALLERY_IMAGES          — 25+ images with src, alt, width, height
└── CERTIFICATE_ARCHIVE     — 40+ certificates with name, file, category, issuer
```

To add a new project, simply append an object to `PROJECTS`:

```typescript
{
  title: "My New Project",
  category: "AI / ML",             // or "Systems" | "XR" | "Web" | "Cybersecurity"
  tech: ["React", "Python", "FastAPI"],
  description: "A detailed description of what the project does and its impact.",
  github: "https://github.com/TheOrionGD/my-new-project",
  demo: "https://my-project.vercel.app"
}
```

---

## 🗺️ Routing & Navigation

The application uses React Router DOM v7 with `BrowserRouter`. Three routes are defined:

| Route | Component | Description |
|---|---|---|
| `/` | `Home` | Main single-page portfolio with all sections |
| `/gallery` | `FullGallery` | Full-screen photography gallery page |
| `/certificates` | `FullCertificates` | Complete certificate archive with PDF viewer |

**Deep linking is fully supported.** Vercel's catch-all rewrite ensures that direct navigation to `/gallery` or `/certificates` returns `index.html`, allowing React Router to handle the routing client-side.

**Section navigation on the Home page** uses smooth scroll with `document.querySelector` and `scrollIntoView`:

```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.querySelector(`#${sectionId}`);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};
```

---

## 🎬 Animations & Motion Design

The animation system is built on **Framer Motion 12** with the following patterns:

### Page Transitions

```typescript
// Standard page entrance (used across section components)
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};
```

### Staggered Children

```typescript
// Used in skills, project cards, certificate cards
const containerVariants = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};
```

### Hover Interactions

```typescript
// Card hover: subtle lift with glow border intensification
<motion.div
  whileHover={{ y: -4, scale: 1.02 }}
  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
>
```

### Shared Layout Transitions

`LayoutGroup` wraps the entire route tree, enabling Framer Motion's shared-layout animation engine to smoothly animate elements that persist across route changes (e.g., the navigation bar).

---

## 🎨 Styling System

The styling system is built on **TailwindCSS v4** with a custom design token set defined in `index.css`.

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| Background | `#020810` | Page background, deepest dark |
| Surface | `#0a1628` | Card and panel backgrounds |
| Surface Elevated | `#0f1e3a` | Hover state surfaces |
| Border | `#1e3a5f` | Card borders, dividers |
| Primary | `#06b6d4` | Cyan-400, primary accent |
| Primary Glow | `#0891b2` | Cyan-600, deeper accent |
| Secondary | `#3b82f6` | Blue-500, secondary accent |
| Text Primary | `#f0f6fc` | Headlines and body text |
| Text Muted | `#8b949e` | Subtext and labels |

### Typography

```css
/* Primary typeface: Inter from Google Fonts */
font-family: 'Inter', system-ui, -apple-system, sans-serif;

/* Weights used: 300, 400, 500, 600, 700, 800, 900 */
```

### Glassmorphism Recipe

```css
/* Standard glass card style */
.glass-card {
  background: rgba(10, 22, 40, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(6, 182, 212, 0.15);
  border-radius: 12px;
}
```

### Neon Glow Effects

```css
/* Cyan text glow — used on headings and accent elements */
.text-glow-cyan {
  text-shadow: 0 0 20px rgba(6, 182, 212, 0.7),
               0 0 40px rgba(6, 182, 212, 0.4),
               0 0 80px rgba(6, 182, 212, 0.2);
}

/* Box glow — used on card hover states */
.box-glow-cyan {
  box-shadow: 0 0 20px rgba(6, 182, 212, 0.3),
              0 0 40px rgba(6, 182, 212, 0.1);
}
```

---

## 📡 API Reference

### Serverless Asset Endpoint

**`GET /api/assets?path={filePath}`**

Streams a file from MongoDB GridFS. Used internally by the Vercel rewrite — not called directly by client code.

**Request Parameters:**

| Parameter | Type | Required | Description |
|---|---|---|---|
| `path` | `string` | ✅ Yes | Relative path of the asset (e.g., `CampusX.jpg`, `certi/AI-102.pdf`) |

**Response Headers:**

| Header | Value | Notes |
|---|---|---|
| `Content-Type` | `image/jpeg`, `application/pdf`, etc. | Determined from GridFS metadata; PDF forced to `application/pdf` |
| `Content-Disposition` | `inline; filename="..."` | Forces inline browser rendering, not download |
| `Cache-Control` | `public, max-age=31536000` | One-year cache for immutable assets |

**Response Status Codes:**

| Code | Meaning |
|---|---|
| `200 OK` | File found and stream initiated |
| `404 Not Found` | File does not exist in GridFS |
| `500 Internal Server Error` | MongoDB connection error or stream failure |

**Example direct call:**

```http
GET /api/assets?path=CampusX.jpg
Host: gds-portfolio.vercel.app

HTTP/1.1 200 OK
Content-Type: image/jpeg
Content-Disposition: inline; filename="/assets/CampusX.jpg"
```

---

## 🚀 Deployment Guide

### Vercel Deployment

This project is optimised for deployment on Vercel with zero configuration beyond environment variables.

**Step 1: Connect repository**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `OrionGD/Godfrey-Portfolio` GitHub repository
3. Vercel will automatically detect the Vite framework

**Step 2: Configure build settings**

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |

**Step 3: Set environment variables**

In the Vercel project dashboard → Settings → Environment Variables:

| Key | Value | Environment |
|---|---|---|
| `CONNECTION_STRING` | `mongodb+srv://...` | Production, Preview |
| `DATABASE_NAME` | `portfolio_assets` | Production, Preview |
| `GEMINI_API_KEY` | `AIza...` | Production (if needed) |

**Step 4: Deploy**

Click **Deploy**. Vercel will build the project, deploy the static bundle to its CDN edge network, and register the `api/assets.js` file as a serverless function.

**Step 5: Verify**

Visit your deployment URL and check:
- [ ] Home page loads with Three.js background
- [ ] Gallery images load from GridFS
- [ ] Certificates page opens PDFs inline
- [ ] Deep links (`/gallery`, `/certificates`) resolve correctly

---

### Manual Deployment

For self-hosted deployments (e.g., a VPS running Nginx):

```bash
# Build the production bundle
npm run build

# Serve the dist/ directory with Nginx
# Example Nginx config:
```

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/godfrey-portfolio/dist;
    index index.html;

    # Proxy /assets/* to the Node.js backend
    location /assets/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_cache_bypass $http_upgrade;
    }

    # Fallback to index.html for React Router
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# Start the Express backend (handles /assets/* in self-hosted mode)
node server.js
```

---

### Environment Variables in Production

```mermaid
flowchart LR
    A[.env file<br/>Local Dev] --> B[Vite build process<br/>loadEnv]
    B --> C[GEMINI_API_KEY<br/>injected into bundle via define]

    D[Vercel Dashboard<br/>Env Settings] --> E[Vercel Build<br/>process.env.*]
    E --> F[Serverless Function<br/>api/assets.js]
    E --> C
```

> ⚠️ **Important:** `CONNECTION_STRING` and `DATABASE_NAME` are **never** injected into the client bundle — they are only read server-side (in the Vite plugin during development, and in `api/assets.js` in production). Only `GEMINI_API_KEY` is exposed to the client bundle.

---

## ⚡ Performance Optimisation

### Core Web Vitals Targets

| Metric | Target | Strategy |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Preconnect to fonts, lazy-load below-fold images |
| **FID** (First Input Delay) | < 100ms | Defer non-critical JS, minimal main-thread work |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Explicit `width`/`height` on all images, skeleton placeholders |
| **FCP** (First Contentful Paint) | < 1.8s | Minified CSS, preloaded Inter font |

### Implemented Optimisations

**Image Loading:**
```typescript
// All GALLERY_IMAGES include explicit width/height to prevent CLS
{ src: "/assets/CampusX.jpg", alt: "Campus Experience", width: 1164, height: 655 }
```

**Font Loading:**
```html
<!-- Preconnect reduces font handshake latency -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

**Code Splitting:**
Vite automatically performs code-splitting at the route level. `FullGallery` and `FullCertificates` are only loaded when the user navigates to those routes.

**Three.js Optimisation:**
- The Three.js scene uses `THREE.BufferGeometry` for particles (most memory-efficient representation)
- `requestAnimationFrame` is cancelled on component unmount to prevent ghost render loops
- Particle count is capped based on device capability detection

**MongoDB Asset Caching:**
Assets served from GridFS are set with aggressive `Cache-Control` headers in production, so images and PDFs are cached by the browser and Vercel's CDN after the first request.

---

## 🔐 Security & Privacy

### Security Architecture

```mermaid
graph TB
    A[Browser] -->|HTTPS only| B[Vercel Edge]
    B -->|TLS 1.3| C[Serverless Function]
    C -->|TLS + Auth| D[MongoDB Atlas]

    E[.env file] -.->|Never committed| F[Git Repository]
    E -->|loadEnv| G[Vite Build]
    E -->|process.env| C
```

### Security Measures

| Layer | Measure |
|---|---|
| **Transport** | HTTPS enforced on Vercel (automatic TLS via Let's Encrypt) |
| **Credentials** | All secrets in `.env`, listed in `.gitignore`, never in source code |
| **MongoDB** | Atlas network access restricted to Vercel IP ranges; credentials use least-privilege |
| **Content-Type** | PDF files explicitly typed to prevent content-sniffing attacks |
| **Asset Access** | GridFS queries use exact filename matching; no directory traversal possible |
| **CORS** | Express server enforces CORS; Vite plugin mirrors policy in development |
| **Dependencies** | `package-lock.json` ensures reproducible, auditable installs |

### Privacy

- No user tracking or analytics scripts are included by default
- No cookies are set by the application
- Contact form submissions (when implemented) are handled server-side without client-side logging
- MongoDB connection strings and credentials are never exposed to the browser bundle

---

## 🧪 Testing

### Current Test Coverage

This project is in active development. A formal testing suite is planned for the next major version. The current quality assurance strategy consists of:

| Method | Scope |
|---|---|
| **TypeScript strict mode** | Compile-time type safety across all components |
| **ESLint** | Static analysis for code quality and hook rule compliance |
| **Manual browser testing** | Chrome, Firefox, Safari (desktop and mobile) |
| **Lighthouse CI** | Performance, accessibility, and SEO scoring |

### Running Quality Checks

```bash
# TypeScript type checking (no output on success)
npx tsc --noEmit

# ESLint analysis
npm run lint

# Lighthouse CLI audit (requires a running server)
npx lighthouse http://localhost:3000 --output html --output-path ./lighthouse-report.html
```

### Planned Testing Additions

```
Testing Roadmap
├── Unit Tests (Vitest)
│   ├── constants.ts data validation
│   ├── useIsMobile hook
│   └── useThemeManager hook
├── Component Tests (React Testing Library)
│   ├── Navbar render and navigation
│   ├── FullCertificates tab filtering
│   └── Projects category filtering
└── E2E Tests (Playwright)
    ├── Home page section navigation
    ├── Gallery image loading
    └── Certificate PDF viewer modal
```

---

## 🔧 Troubleshooting

### Common Issues

---

#### Assets return 404 in development

**Symptoms:** Gallery images don't load, certificates show broken links.

**Diagnosis:**
```bash
# Check that .env exists and has correct values
cat .env

# Check MongoDB Atlas IP whitelist — your local IP must be whitelisted
# Atlas → Network Access → Add current IP address
```

**Resolution:**
1. Ensure `.env` contains a valid `CONNECTION_STRING` and `DATABASE_NAME`
2. Whitelist your local machine's IP address in MongoDB Atlas Network Access
3. Confirm that files exist in GridFS using MongoDB Compass or Atlas Data Explorer

---

#### Three.js background causes performance issues on mobile

**Symptoms:** Jank or dropped frames on low-end mobile devices.

**Resolution:**
The `NeonGridBackground` component should detect device performance and reduce particle count on mobile:

```typescript
// In NeonGridBackground.tsx — add mobile performance detection
const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);
const PARTICLE_COUNT = isMobile ? 500 : 1500;
```

---

#### `npm run build` fails with TypeScript errors

**Symptoms:** Build exits with TS errors referencing unused variables.

**Resolution:**
```bash
# Run type checking separately to see all errors
npx tsc --noEmit

# Fix identified errors, then rebuild
npm run build
```

---

#### PDFs open as downloads instead of inline viewing

**Symptoms:** Clicking a certificate triggers a file download rather than showing the embedded PDF viewer.

**Diagnosis:** The `Content-Disposition` header in the serverless function or Vite plugin may not be set correctly.

**Resolution:**
Ensure both `api/assets.js` and `vite-plugin-mongo-assets.js` set:
```javascript
res.setHeader('Content-Disposition', `inline; filename="${encodedFilename}"`);
```

---

#### Vercel deployment shows blank page

**Symptoms:** The production URL returns a blank white page.

**Diagnosis:** React Router's catch-all route may not be configured in `vercel.json`.

**Resolution:**
Verify `vercel.json` contains the SPA fallback rewrite:
```json
{ "source": "/(.*)", "destination": "/index.html" }
```

---

#### Environment variables undefined in production

**Symptoms:** Features depending on `GEMINI_API_KEY` silently fail in production.

**Resolution:**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add `GEMINI_API_KEY` with the correct value
3. Redeploy: Vercel → Deployments → Redeploy

---

## 📈 Scalability Considerations

### Current Architecture Limits

| Resource | Current Limit | Scaling Path |
|---|---|---|
| **Vercel Serverless** | 50 MB response, 10s timeout | Migrate large PDFs to Vercel Blob or Cloudflare R2 |
| **MongoDB Atlas Free** | 512 MB storage | Upgrade to M10+ or migrate to S3-compatible object storage |
| **GridFS Concurrency** | Single Atlas connection pool | Add connection pooling and replica set routing |
| **Static Assets** | CDN-cached after first request | Near-infinite via Vercel CDN edge network |

### Scaling to Higher Traffic

For a portfolio receiving substantial traffic, the following architectural improvements are recommended:

```mermaid
graph LR
    A[Vercel Edge] --> B[Vercel CDN Cache]
    B -->|Cache miss| C[Serverless Function]
    C --> D[MongoDB Atlas]
    
    A -->|Static assets| E[Vercel Global CDN]
    
    F[Future: S3/R2] --> G[Presigned URL]
    G --> A
    
    style F fill:#1e3a5f,stroke:#06b6d4
    style G fill:#1e3a5f,stroke:#06b6d4
```

**Recommended migration path for high traffic:**

1. **Phase 1:** Upgrade MongoDB Atlas to M10+ (dedicated cluster with better connection limits)
2. **Phase 2:** Add a Redis caching layer between the serverless function and Atlas for frequently requested assets
3. **Phase 3:** Migrate binary assets from GridFS to Cloudflare R2 or AWS S3 with pre-signed URLs for direct browser download (bypassing the serverless function entirely)
4. **Phase 4:** Implement a CDN in front of the asset endpoint with aggressive cache headers

---

## 🤝 Contributing

Contributions are welcome and appreciated. This project follows standard open-source contribution patterns.

### Contribution Guidelines

**1. Fork and clone:**
```bash
git clone https://github.com/<your-username>/Godfrey-Portfolio.git
cd Godfrey-Portfolio
```

**2. Create a feature branch:**
```bash
git checkout -b feature/add-blog-section
# or
git checkout -b fix/mobile-gallery-performance
```

**3. Make your changes following these principles:**
- Write TypeScript, not JavaScript (strict mode must pass)
- Follow the existing component pattern (functional components, hooks)
- Keep components focused and single-responsibility
- Add JSDoc comments to non-trivial functions
- Test your changes in both Chrome and Firefox

**4. Run quality checks:**
```bash
npx tsc --noEmit   # TypeScript check
npm run lint        # ESLint check
```

**5. Commit with a descriptive message:**
```bash
git commit -m "feat(gallery): add lightbox keyboard navigation support"
# Format: <type>(<scope>): <description>
# Types: feat, fix, refactor, docs, style, test, chore
```

**6. Open a Pull Request:**
- Describe what you changed and why
- Reference any related issues
- Include screenshots for UI changes

---

### Areas Open for Contribution

| Area | Priority | Complexity |
|---|---|---|
| Blog/writing section | High | Medium |
| Dark/light theme toggle | Medium | Low |
| Contact form with serverless email | High | Medium |
| PWA / Service Worker | Medium | Medium |
| Unit tests with Vitest | High | Medium |
| E2E tests with Playwright | Medium | High |
| i18n support (Tamil) | Low | High |
| Real-time GitHub stats | Medium | Low |

---

## 📋 Changelog

### v1.0.0 — Initial Production Release

**Released:** 2025

**New Features:**
- Full portfolio application with 23 React components
- MongoDB GridFS asset pipeline with custom Vite plugin
- Three.js WebGL particle background system
- Framer Motion page transitions and micro-animations
- Certificate archive with 40+ credentials and PDF viewer modal
- Masonry photography gallery with 25+ images
- Interactive project showcase with category filtering
- Responsive design for mobile, tablet, and desktop
- Vercel deployment with serverless asset API
- TailwindCSS v4 styling system with cyber-noir design language

**Technical:**
- TypeScript strict mode throughout
- React 19 with concurrent features
- Vite 6 with custom plugin API
- React Router DOM v7
- ESLint configuration with TypeScript rules

---

## ❓ FAQ

**Q: Why is MongoDB used for storing images and PDFs instead of the repository or a CDN?**

A: Storing binary assets directly in a Git repository significantly increases clone times, repository size, and GitHub LFS costs at scale. MongoDB Atlas GridFS provides a free-tier cloud storage solution that is globally distributed and accessible from any deployment environment. The custom Vite plugin makes the development experience as seamless as if the files were local.

---

**Q: Why not use Next.js instead of Vite + React Router?**

A: Next.js excels at content-heavy sites that benefit from server-side rendering (SSR) and static site generation (SSG). A personal portfolio is a single-page application with no SEO-critical dynamic content — client-side rendering is entirely appropriate. Vite's development experience is significantly faster than Next.js for this use case.

---

**Q: Can I use this codebase as a template for my own portfolio?**

A: Yes, this project is MIT-licensed. Fork the repository, update `constants.ts` with your own information, replace assets in MongoDB GridFS with your own media, and deploy to Vercel. Please retain the original license attribution in the `LICENSE` file.

---

**Q: How do I add a new certificate to the archive?**

A: 
1. Upload the PDF or image to MongoDB Atlas GridFS under the path `/assets/certi/your-cert.pdf`
2. Add a new entry to the `CERTIFICATE_ARCHIVE` array in `constants.ts`:
```typescript
{
  name: "My New Certification",
  file: getAssetUrl("/assets/certi/my-cert.pdf"),
  category: "AI & Generative AI",  // or any existing category
  issuer: "Issuing Organisation",
  tag: "Optional Tag"  // e.g., "Top Credential", "Winner"
}
```
3. The certificate will automatically appear in the relevant category tab.

---

**Q: How do I add a new gallery image?**

A:
1. Upload the image to MongoDB Atlas GridFS under `/assets/YourImage.jpg`
2. Run `node getImageSizes.js` to get the image dimensions (or note them manually)
3. Add an entry to `GALLERY_IMAGES` in `constants.ts`:
```typescript
{ src: getAssetUrl("/assets/YourImage.jpg"), alt: "Event Description", width: 1280, height: 720 }
```

---

**Q: The Three.js background is causing my laptop fan to spin up. Is there a performance mode?**

A: The particle system is GPU-rendered via WebGL and should be lightweight. If you are experiencing performance issues, check that your browser's hardware acceleration is enabled. A future update will add a reduced-motion mode that disables the Three.js background for users with the `prefers-reduced-motion` media query set.

---

**Q: Why does the Vercel deployment need a separate `vercel.json` rewrite for assets?**

A: Vercel's static file serving does not know about MongoDB GridFS — it can only serve files from the `dist/` build output. The rewrite rule redirects all `/assets/*` requests to the `api/assets.js` serverless function, which then connects to MongoDB and streams the appropriate file. Without this rule, asset URLs would return 404 in production.

---

## 📄 License

```
MIT License

Copyright (c) 2025 Godfrey T R

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the full [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

| Resource | Contribution |
|---|---|
| [React](https://react.dev) | UI component framework |
| [Vite](https://vitejs.dev) | Lightning-fast build tooling |
| [Three.js](https://threejs.org) | WebGL rendering engine |
| [Framer Motion](https://www.framer.com/motion/) | Production-ready animation library |
| [TailwindCSS](https://tailwindcss.com) | Utility-first styling framework |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Cloud database and GridFS storage |
| [Vercel](https://vercel.com) | Deployment, CDN, and serverless functions |
| [React Icons](https://react-icons.github.io/react-icons/) | Comprehensive icon library |
| [Google Fonts](https://fonts.google.com) | Inter typeface |
| [Shields.io](https://shields.io) | README badge generation |
| [Capsule Render](https://github.com/kyechan99/capsule-render) | Animated header SVGs |
| [Skillicons.dev](https://skillicons.dev) | Technology icon SVGs |

---

## 📬 Contact

<div align="center">

**Godfrey T R** — Software Engineer

[![Portfolio](https://img.shields.io/badge/Portfolio-gds--portfolio.vercel.app-2563EB?style=for-the-badge&logo=vercel&logoColor=white)](https://gds-portfolio.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-godfrey192607-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/godfrey192607)
[![GitHub](https://img.shields.io/badge/GitHub-OrionGD-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TheOrionGD)
[![Email](https://img.shields.io/badge/Email-godfreytr.prof%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:godfreytr.prof@gmail.com)
[![LeetCode](https://img.shields.io/badge/LeetCode-OrionGD-FFA116?style=for-the-badge&logo=leetcode&logoColor=white)](https://leetcode.com/u/OrionGD/)
[![HackerRank](https://img.shields.io/badge/HackerRank-OrionGD07-00EA64?style=for-the-badge&logo=hackerrank&logoColor=white)](https://hackerrank.com/OrionGD07)

📍 Tiruchirapalli, Tamil Nadu, India &nbsp;|&nbsp; 📞 +91 93444 62238

*Open to full-time roles, internships, and collaboration in AI, full-stack, and XR.*

</div>

---

<div align="center">

*Built with ❤️ and a lot of ☕ by **Godfrey T R***

*"Architecting scalable systems, intelligent integrations, and immersive user experiences."*

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/powered-by-coffee.svg)](https://forthebadge.com)

</div>
