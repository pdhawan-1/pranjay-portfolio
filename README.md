<div align="center">

# Pranjay Dhawan — Portfolio

**Electronics · Robotics · Embedded Systems**

Personal portfolio of an electronics and robotics engineer who builds hardware that moves: Martian rovers, drones, and EV monitoring systems.

[![Live site](https://img.shields.io/badge/live-pd--dev.vercel.app-5BC4FF?style=for-the-badge&logo=vercel&logoColor=white)](https://pd-dev.vercel.app)
[![Deployed on Vercel](https://img.shields.io/badge/deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-pranjay--dhawan-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pranjay-dhawan-r720)

</div>

---

## About

This repository holds the source of my personal portfolio site, **[pd-dev.vercel.app](https://pd-dev.vercel.app)**. It presents my work in hardware design, embedded firmware, and robotics: the rovers and drones I've built with Team MARS at Thapar Institute, my PCB designs, my research papers, and my experience.

The site is intentionally simple: one hand-written HTML file, no framework, no build step, plus a single serverless function that powers the contact form.

## What's on the site

| Section | Contents |
| --- | --- |
| **About** | Background, education (B.E. ECE at Thapar Institute, Diploma in ECE at CCET), and key numbers |
| **Experience** | Research Associate at Thapar Institute (exoskeleton system integration); Product R&D Engineer at Zipbolt Innovation; Core Electronics Engineer at The MindCrafters |
| **Projects** | Martian Rovers *Ganga* and *Alaknanda*, Drone *Garud*, and *VocalEyes* (assistive device), each with an image gallery |
| **Hardware** | PCB design gallery (main board, PDU, current-limiting protection, solid-state relay, sensor boards) and mechanical CAD |
| **Research** | Conference publications (ICSCPS 2026, AIR 2025, IFToMM 2025) |
| **Skills** | EDA tools, mechanical/3D, firmware, platforms, and core domains |
| **Honors** | IRC 2026 Champion, ISDC 2026 1st Runner Up, IRC 2025 1st Runner Up, Thapar merit scholarship |

## Features

- **Light / Dark / Auto theme.** Auto follows the device's colour scheme and falls back to the local clock (light 07:00–19:00). The choice is remembered in `localStorage`.
- **Animated circuit-trace background** in the hero section, drawn with inline SVG and styled for both themes.
- **Project galleries** with auto-advancing sliders, dot and arrow controls, and a click-to-enlarge lightbox with captions.
- **Contact form** in a modal, validated in the browser and again on the server, which emails me through a Vercel serverless function.
- **Resume viewer.** The Resume button opens `resume.pdf` from this repo, so updating the file updates the site.
- **MARS-Bot**, a small SVG robot mascot that tracks the cursor, blinks, and comments as you scroll through each section.
- **Scroll-reveal animations** and active-section highlighting in the navigation.
- **Responsive layout**, and animations are reduced for visitors who prefer reduced motion.

## Tech stack

| Layer | Technology |
| --- | --- |
| Front end | HTML5, CSS3 (custom properties for theming), vanilla JavaScript |
| Fonts | Space Grotesk, Inter, JetBrains Mono (Google Fonts) |
| Backend | Vercel Serverless Function (Node.js) |
| Email | [Nodemailer](https://nodemailer.com) over Gmail SMTP |
| Hosting | [Vercel](https://vercel.com), auto-deployed from this repo |

## Project structure

```text
pranjay-portfolio/
├── index.html        # The whole site: markup, styles, and scripts
├── api/
│   └── contact.js    # Serverless function behind the contact form
├── images/           # Image assets (drone, rover, and PCB photos)
├── resume.pdf        # Opened by the Resume button
├── package.json      # Dependencies (nodemailer)
└── vercel.json       # Function settings (256 MB memory, 10 s max duration)
```

## Run it locally

You need [Node.js](https://nodejs.org) and the [Vercel CLI](https://vercel.com/docs/cli).

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/pranjay-portfolio.git
cd pranjay-portfolio

# 2. Install dependencies
npm install

# 3. Start the local dev server (serves the site and /api/contact)
npx vercel dev
```

The site will be available at `http://localhost:3000`.

If you only want to look at the front end, opening `index.html` in a browser works too. The contact form needs the `/api/contact` function, so it only works under `vercel dev` or on Vercel.

## Contact form setup

The `/api/contact` function accepts a `POST` request with `name`, `email`, `subject` (optional), and `message`. It validates the input, escapes HTML, and sends the message by email using Gmail SMTP.

It reads its credentials from two environment variables:

| Variable | Description |
| --- | --- |
| `GMAIL_USER` | The Gmail address the messages are sent from |
| `GMAIL_APP_PASSWORD` | A 16-character [Google App Password](https://support.google.com/accounts/answer/185833) for that account (requires 2-step verification) |

**On Vercel:** add both under *Project → Settings → Environment Variables*, then redeploy.

**Locally:** put them in a `.env.local` file in the project root, or run `vercel env pull` to fetch them from your Vercel project. Never commit this file or any real credentials to the repository.

## Updating the content

| To change… | Edit… |
| --- | --- |
| Text, sections, projects, skills | `index.html` |
| Resume | Replace `resume.pdf` with the new file, keeping the same name |
| Recipient of contact emails, email template | `api/contact.js` |
| Function memory or timeout | `vercel.json` |

## Deployment

The site is deployed on Vercel. Pushing to the `main` branch triggers a new production deployment automatically; other branches get preview deployments.

## Contact

- Email: [pdhawan50_be23@thapar.edu](mailto:pdhawan50_be23@thapar.edu)
- LinkedIn: [pranjay-dhawan-r720](https://www.linkedin.com/in/pranjay-dhawan-r720)
- Or use the contact form on the [live site](https://pd-dev.vercel.app)

## License

Copyright © 2026 Pranjay Dhawan. All rights reserved. The code, text, images, and resume in this repository are not licensed for reuse without permission.
