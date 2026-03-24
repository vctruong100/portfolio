# Vinh Chieu Truong — Portfolio

A modern, responsive, accessible personal portfolio built with vanilla HTML, CSS, and minimal JavaScript. No build steps, no frameworks — just clean, production-ready static files.

---

## File Structure

```
portfolio/
├── index.html                                  # Homepage
├── assets/
│   ├── css/
│   │   └── styles.css                          # Complete design system
│   ├── js/
│   │   └── script.js                           # Dark mode, nav, form, utilities
│   └── images/
│       └── placeholder.txt                     # Image specs & naming guide
├── projects/
│   ├── cv-manager/
│   │   └── index.html                          # Curriculum Vitae Manager
│   ├── tampermonkey-automator/
│   │   └── index.html                          # Tampermonkey Automator
│   ├── workplace-efficiency-scripts/
│   │   └── index.html                          # Workplace Efficiency Scripts
│   ├── ics-scheduler/
│   │   └── index.html                          # ICS Scheduler
│   ├── game-on/
│   │   └── index.html                          # Game-On Sports Buddy App
│   └── fablix-movie-db/
│       └── index.html                          # Fablix Movie DB
├── pictures/                                   # Images for each project
├── sitemap.xml
├── robots.txt
├── README.md
```

---

## Running Locally
No build step needed. Any of these methods work:

### Option 1: Open Directly
Double-click `index.html` in your file explorer.

### Option 2: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

### Option 3: Python HTTP Server
```bash
cd portfolio
python -m http.server 8000
# Open http://localhost:8000
```

### Option 4: Node.js HTTP Server
```bash
npx serve .
# Open the URL shown in terminal
```

## Design System

### Colors
| Token | Light | Dark |
|-------|-------|------|
| Background | `#f8fafc` | `#0f172a` |
| Surface | `#ffffff` | `#1e293b` |
| Text | `#0f172a` | `#f1f5f9` |
| Accent | `#2563eb` | `#3b82f6` |
| Muted text | `#64748b` | `#94a3b8` |

### Typography
- **Font:** Inter (Google Fonts) with system-ui fallback
- **Scale:** 0.75rem – 3.052rem (1.25 ratio from 16px base)
- **Spacing:** 8px grid system

