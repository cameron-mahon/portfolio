# Task Spec: Portfolio Website

## Summary

A personal portfolio website with a terminal-inspired aesthetic that feels like a well-made tool rather than a hacker costume. Features frosted glass panels (Apple Liquid Glass style) over a dark background with a noise-to-clarity radial gradient. Includes an AI-powered chat terminal for visitors to ask questions, a contextual photo, and a 3-card carousel linking to projects.

---

## Design Decisions

### Aesthetic
- **Influence**: Vercel's restraint + Apple's Liquid Glass + terminal utility
- **Feel**: Tasteful, not artsy. Effortless competence. You have to dig in to understand the person.
- **What it's NOT**: Hacker roleplay, try-hard, overly "designed"

### Background: Noise to Clarity
- Radial gradient with film grain/noise at the periphery fading to pure dark at the center
- Represents "linearizing" - clearing away everything that doesn't matter to find the signal
- Implementation: SVG noise filter with radial gradient mask
- Subtle: ~3-5% base opacity on noise
- Center slightly offset (asymmetric, natural)

### Glass Panels
- Frosted dark translucent panels (Liquid Glass style)
- `backdrop-filter: blur(16px)`
- Semi-transparent dark background: `rgba(0, 0, 0, 0.6)` or similar
- Subtle border: `1px solid rgba(255, 255, 255, 0.1)`
- Soft glow/highlight on top edge

### Typography
- **Terminal text**: Green (#00FF00 or tuned variant like #4ADE80)
- **Font**: JetBrains Mono or Berkeley Mono (monospace)
- **Feel**: CRT phosphor green, not neon

### Color Palette
```
--bg-dark: #000000 (pure black center)
--glass-bg: rgba(0, 0, 0, 0.6)
--glass-border: rgba(255, 255, 255, 0.1)
--terminal-green: #4ADE80 (or #00FF00 for classic)
--text-primary: #E5E5E5
--text-muted: #A3A3A3
```

---

## Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   ┌─────────────────────┐    ┌──────────────────────┐  │
│   │                     │    │                      │  │
│   │   Terminal / Chat   │    │   Photo (contextual) │  │
│   │                     │    │   Formula E car      │  │
│   │   > ask me anything │    │                      │  │
│   │   > _               │    │                      │  │
│   │                     │    │                      │  │
│   └─────────────────────┘    └──────────────────────┘  │
│                                                         │
│─────────────────────────────────────────────────────────│
│                                                         │
│   ┌───────────┐   ┌───────────┐   ┌───────────────┐    │
│   │           │   │           │   │               │    │
│   │  Project  │   │  Brain-   │   │  Coming Soon  │    │
│   │  Carb     │   │  Tunnel   │   │               │    │
│   │           │   │           │   │               │    │
│   └───────────┘   └───────────┘   └───────────────┘    │
│                                                         │
│                    ← carousel →                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Components

### 1. Background (`Background.tsx`)
- Full viewport fixed background
- SVG noise filter (fractal noise)
- Radial gradient mask: 100% opacity at edges → 0% at center
- Center offset slightly from true center

### 2. Terminal Chat (`TerminalChat.tsx`)
- Glass panel container
- Input field styled as terminal prompt (`> _`)
- Message history displayed above input
- Typing animation for AI responses
- Green monospace text
- Blinking cursor

### 3. Photo Panel (`PhotoPanel.tsx`)
- Glass panel container
- Profile image (`profile.jpeg` - Formula E context)
- Subtle treatment: slight desaturation or grain overlay to match aesthetic
- No caption needed - image speaks for itself

### 4. Project Carousel (`ProjectCarousel.tsx`)
- Horizontal arrangement of 3 cards
- Snap scrolling on mobile
- Keyboard navigation (arrow keys)
- Cards have generous spacing, presence

### 5. Project Card (`ProjectCard.tsx`)
- Glass panel styling
- Project title
- Brief description (1 line)
- Subtle hover state
- External link behavior
- "Coming Soon" variant with no link / subtle interaction

---

## Project Cards Data

```typescript
const projects = [
  {
    id: 'project-carb',
    title: 'Project Carb',
    description: 'Autocorrect for 3D printing',
    url: 'https://projectcarb.com',
    status: 'live'
  },
  {
    id: 'brain-tunnel',
    title: 'Brain-Tunnel',
    description: 'Speed reading, reimagined',
    url: 'https://brain-tunnel.vercel.app',
    status: 'live'
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    description: '',
    url: null,
    status: 'upcoming'
  }
]
```

---

## AI Chat Architecture

### API Route (`/api/chat`)
- POST endpoint
- Receives user message
- Calls Claude API with system prompt + context
- Streams response back

### System Prompt Strategy
The AI must ONLY answer from provided context. Structure:

```
You are an AI assistant on Cameron's portfolio website. You answer questions about Cameron based ONLY on the context provided below.

If someone asks something not covered in the context, politely say you don't have that information rather than making anything up.

Keep responses concise and conversational. Match the understated tone of the site.

---
CONTEXT ABOUT CAMERON:
[Bio, background, projects, skills, interests - all provided as structured text]
---
```

### Context Document (`/lib/context.ts`)
A structured document containing:
- Background (strategy, game theory, special operations)
- Education
- Projects and what they demonstrate
- Skills
- Interests
- What he's looking for / open to

### Restrictions (without feeling unnatural)
- No information outside provided context
- Graceful deflection: "I don't have details on that, but feel free to reach out directly"
- No hallucination - if unsure, say so
- Tone: helpful but not eager, matches site's understated vibe

---

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Framework | Next.js 14+ (App Router) | API routes for Claude, SSR for SEO, familiar from Project Carb |
| Styling | Tailwind CSS | Rapid iteration, already in your stack |
| Animation | Framer Motion | Smooth carousel, typing effects, transitions |
| AI | Claude API (Anthropic) | Best quality, your preference |
| Deployment | Vercel | One-click, edge functions, familiar |
| Font | JetBrains Mono (Google Fonts) | Free, excellent monospace |

---

## File Structure

```
portfolio/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page composition
│   ├── globals.css         # Tailwind + custom styles
│   └── api/
│       └── chat/
│           └── route.ts    # Claude API endpoint
├── components/
│   ├── Background.tsx      # Noise-to-clarity background
│   ├── TerminalChat.tsx    # AI chat terminal
│   ├── PhotoPanel.tsx      # Profile photo in glass panel
│   ├── ProjectCarousel.tsx # Card carousel container
│   ├── ProjectCard.tsx     # Individual project card
│   └── GlassPanel.tsx      # Reusable glass panel wrapper
├── lib/
│   ├── context.ts          # Cameron's bio/context for AI
│   └── projects.ts         # Project data
├── public/
│   └── profile.jpeg        # Photo (copy from Desktop)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── .env.local              # ANTHROPIC_API_KEY
```

---

## Implementation Steps

### Phase 1: Foundation
1. Initialize Next.js project with TypeScript + Tailwind
2. Set up JetBrains Mono font
3. Create `GlassPanel` component with Liquid Glass styling
4. Implement `Background` component with noise-to-clarity effect
5. Basic layout structure

### Phase 2: Static Content
6. Create `PhotoPanel` with profile image
7. Create `ProjectCard` component
8. Create `ProjectCarousel` with 3 cards
9. Add Framer Motion animations (hover states, entrance)
10. Keyboard navigation for carousel

### Phase 3: Terminal Chat
11. Create `TerminalChat` UI (input, message history, typing effect)
12. Set up `/api/chat` route
13. Write context document for AI
14. Craft system prompt with restrictions
15. Connect frontend to API with streaming
16. Test edge cases (off-topic questions, attempts to break restrictions)

### Phase 4: Polish
17. Responsive design (mobile layout)
18. Performance optimization (image optimization, lazy loading)
19. SEO metadata
20. Deploy to Vercel
21. Custom domain (if desired)

---

## Resolved Questions

1. **Domain**: Using Vercel default for now
2. **Project Carb URL**: https://projectcarb.com
3. **Context document**: Will be provided later - build chat UI first, context can be added
4. **Photo treatment**: Keep as-is
5. **Coming Soon card**: Dead click (no interaction)

---

## Anti-Hallucination Checklist

- [x] Tech stack matches your existing projects (Next.js, Tailwind, Vercel)
- [x] Glass panel implementation pattern verified in Project Carb Hero.tsx
- [x] Project URLs are real and verified
- [x] Photo file exists at ~/Desktop/profile.jpeg
- [x] Claude API is a real service you can access
- [ ] JetBrains Mono availability - will verify during implementation
- [ ] Framer Motion API patterns - will verify during implementation

---

## References

- [Apple Liquid Glass](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/) - Glass aesthetic direction
- [Vercel](https://vercel.com) - Restraint and utility reference
- [Hype4 Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator) - For dialing in glass values
- Your reference image (Desktop/reference.png) - Terminal + glass aesthetic
