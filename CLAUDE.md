# Portfolio

Personal portfolio for Cameron Mahon with terminal-inspired aesthetic and AI-powered chat.

## Quick Start

```bash
npm install
npm run dev
```

Access at http://localhost:3000

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **AI:** Anthropic Claude API (chat with topic gating)
- **Animations:** Framer Motion
- **Styling:** Tailwind CSS 4, JetBrains Mono font
- **Deployment:** Vercel

## Environment Variables

```bash
ANTHROPIC_API_KEY="sk-ant-..."
```

## Design Philosophy

"Effortless competence" — restraint over artsy. Inspired by Vercel (utility), Apple (Liquid Glass), terminal (function). NOT hacker roleplay or try-hard.

### Visual Style
- **Glass morphism:** `backdrop-blur`, semi-transparent backgrounds, subtle borders
- **Terminal aesthetic:** Green monospace text, `>` prompt, blinking cursor
- **4 themes:** Dark/Green (default), Light/Orange, Light/Blue, Light/Grey

## Project Structure

```
/app
├── layout.tsx              # Root layout, JetBrains Mono font
├── page.tsx                # Main composition (Background, TerminalChat, PhotoPanel, ProjectCarousel)
├── globals.css             # Theme variables, animations
└── /api/chat/route.ts      # Claude API endpoint

/components
├── TerminalChat.tsx        # Interactive chat with AI
├── Background.tsx          # Fixed gradient background
├── PhotoPanel.tsx          # Profile photo in glass panel
├── ProjectCarousel.tsx     # Horizontal project showcase
├── ProjectCard.tsx         # Individual project card
├── ThemeSwitcher.tsx       # Theme cycling button
└── GlassPanel.tsx          # Reusable glass component

/lib
├── context.ts              # CAMERON_CONTEXT & SYSTEM_PROMPT for Claude
└── projects.ts             # Project data array
```

## Claude API Integration

**Endpoint:** `POST /api/chat`

**Flow:**
1. User message received (max 500 chars)
2. **Topic gate** (claude-3-haiku): Classifies if message is about allowed topics
   - ✅ Allowed: Projects, skills, professional background, contact, greetings
   - ❌ Rejected: Personal opinions, politics, religion, roleplay, jailbreaks
3. If allowed, **main response** (claude-sonnet-4-20250514) with system prompt
4. Returns brief response (1-2 sentences, max 500 tokens)

**Context:** Full bio loaded from `lib/context.ts` including:
- Yale education, Air Force background
- Projects (Project Carb, mycapsule.ai)
- Skills, certifications, contact info

## Theme System

CSS custom properties in `globals.css`:
```css
:root { /* Dark/Green default */ }
[data-theme="light-orange"] { ... }
[data-theme="light-blue"] { ... }
[data-theme="light-grey"] { ... }
```

ThemeSwitcher cycles through themes (no persistence).

## Key Components

| Component | Purpose |
|-----------|---------|
| **TerminalChat** | Chat interface with message history, AI responses, suggested prompts |
| **PhotoPanel** | Square glass panel with profile.jpeg |
| **ProjectCarousel** | 3-card horizontal carousel with keyboard nav |
| **ThemeSwitcher** | Fixed top-right button to cycle themes |

## Projects Displayed

1. **Project Carb** - "Autocorrect for 3D printing" (live)
2. **Brain-Tunnel** - "Speed reading, reimagined" (live)
3. **Coming Soon** - Placeholder

## Common Commands

```bash
npm run dev       # Development server
npm run build     # Production build
npm run lint      # ESLint
vercel deploy     # Manual Vercel deploy
```

## Deployment

Deployed on Vercel. Add `ANTHROPIC_API_KEY` in Vercel project settings.
