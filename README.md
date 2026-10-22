# RYZE Ignition

### ROLE & OBJECTIVE

You are an expert full-stack developer and UI/UX designer. Your task is to build a highly scalable, conversion-optimized multi-page application for "RYZE Advisory" (an AI Consulting firm) using the exact brand guidelines, color system, and layout structures defined below. 

You need to generate a scalable architecture capable of supporting 30 individual service pages and 30 targeted blog pages, ensuring absolute visual consistency, fast loading times, and a premium B2B tech aesthetic.

---

### BRAND IDENTITY & DESIGN SYSTEM

#### 1. Color Palette (Extracted from RYZE Logo)

Apply these exact hexadecimal values across the UI components to maintain strict brand continuity:

- **Primary / Dominant Color (Navy):** `#062446` (Deep Navy Blue from the R, Z, E, and Arrow)

  - *Usage:* Global navigation, primary headers, major section backgrounds, primary buttons.

- **Accent Color (Gold):** `#C59E3F` (Textured Gold from the '>' symbol and 'ADVISORY' text)

  - *Usage:* Icons, micro-interactions, active states, button hover effects, strategic text highlights.

- **Neutral Light Background:** `#F8FAFC` or `#FFFFFF` (For high-contrast readability)

- **Neutral Dark / Text:** `#0F172A` (For body text, ensuring proper accessibility ratios)

#### 2. Typography & Fonts

- **Headings (H1, H2, H3):** Use a sharp, modern, geometric sans-serif font like **"Inter"** or **"Montserrat"** with heavy weights (Bold/Extra Bold) and slight letter-spacing adjustments to mimic the tech-forward, angular nature of the RYZE logo lettering.

- **Body Text:** Use a clean, highly readable font like **"Inter"** or **"Roboto"** at a minimum base size of 16px for optimal scanning.

#### 3. Design Visual Style

- **Aesthetic:** Corporate, trustworthy, premium, and highly cutting-edge. 

- **Design Elements:** Use crisp, sharp geometric borders, subtle 3D gold accents, and upward-trending graphical accents (inspired by the RYZE arrow) for section dividers or background motifs.

---

### PAGE STRUCTURE & CORE COPY

#### Global Hero Framework (To be dynamically populated)

- **Main Value Proposition (H1):** "Your Competitors Are Already Using AI. Our AI Consulting Keeps You Ahead."

- **Supporting Subheadline:** "Our expert AI consultants cut through the noise, build a winning AI strategy, and ship AI solutions that drive real automation, efficiency, and growth, built around how your business actually works."

- **Primary CTA Button:** "Book Your AI Strategy Call" (Styled in Primary Navy `#062446` with a Gold `#C59E3F` border/hover effect).

---

### MULTI-PAGE ARCHITECTURE REQUIREMENTS

Create a clean router architecture that seamlessly maps out the following 60 pages:

#### 1. 30x Service Pages Layout (`/services/[service-slug]`)

Every service page must follow a high-conversion B2B landing page format:

- **Hero Section:** Clear service-specific H1, the global subheadline variant, and the "Book Your AI Strategy Call" CTA.

- **The Problem Statement:** A section detailing what manual inefficiencies the business faces without this specific AI service.

- **Our AI Solution:** A structured grid showing how RYZE implements automation, builds strategy, and ships the solution.

- **Core Benefits:** 3 to 4 metric-driven blocks (e.g., "Reduce Costs by 40%", "24/7 Automation").

- **Sticky / Bottom CTA:** A final high-impact section re-iterating the "Book Your AI Strategy Call".

#### 2. 30x Blog Pages Layout (`/blog/[blog-slug]`)

Every article page must be built for maximum readability and content authority:

- **Article Header:** Large title, author tag, publish date, and reading time indicator.

- **Sidebar or Inline Widget:** A sticky or floating "Free AI Strategy Call" lead capture form styled in the brand colors.

- **Content Area:** Rich text rendering formatting (clean margins, beautiful H2/H3 styling, blockquotes using the Gold accent border, and clean bullet points).

- **Related Articles Grid:** A 3-card dynamic layout at the bottom pulling in other relevant blog entries.

---

### TECHNICAL & UI/UX REQUIREMENTS

- **Responsive Design:** Native mobile-first responsiveness. Navigation transforms into a clean burger menu on smaller viewports.

- **State Management / Templates:** Use a clean, modular template structure where the navigation header and footer are global components, while the page layouts pull dynamic content based on the active slug.

- **Interactions:** Smooth transitions on hover for all buttons (e.g., smooth background color shifts between the navy and gold elements).

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://riseadvisory.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/50e07535-c23d-4e28-a504-a79c5707f3bc).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
