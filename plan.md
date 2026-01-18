MASTER SPECIFICATION: THE NEURAL-MONOCHROME PORTFOLIO (V2.0)
1. PROJECT IDENTITY
Persona: Fullstack Developer & AI Engineer.

Education: SMK Telkom Purwokerto (Identity: Technical Excellence & Innovation).

Core Aesthetic: Absolute Monochrome (Deep Black #000000 / Pure White #FFFFFF).

Atmosphere: Cinematic, High-Performance, Intelligent, Minimalist.

2. NEW: DUAL-MODE LOGIC (UX/PERFORMANCE)
Recruiter Mode (Default OFF): * A prominent toggle switch on the header.

IF ON: Disable heavy GSAP ScrollTrigger, remove background particles, switch to a fast-loading Bento Grid layout. Focus on readability.

IF OFF: Full immersive experience with all animations and AI visualizers active.

3. VISUAL & AUDIO DESIGN
Texture: Subtle "Film Grain" overlay (CSS Noise) to prevent flat colors.

Typography: Kinetic warping on headers. Main fonts: Inter (Sans) & JetBrains Mono (for code/tech feel).

Audio Design: * Haptic UI: Ultra-short, high-frequency "click" sounds (monochrome-synth style) on button hovers.

Background: Very low-volume ambient "neural hum" (optional/mute by default).

4. CORE GSAP MOTION ENGINE
Horizontal Transition: Vertical scroll locks at 50% height, morphing into a horizontal "Project Gallery" with magnetic pinning.

The "Invert" Cursor: A circular custom cursor using mix-blend-mode: difference. It expands and reveals "Metadata" when hovering over project cards.

SVG Morphing: Organic blobs that transform into rigid geometric code-structures as user scrolls from "About" to "Tech Stack".

5. REVOLUTIONARY SECTIONS
A. The "Growth Graph" (SMK Telkom Journey)
Visual: An interactive GSAP Line Chart showing skill progression from year 1 at SMK Telkom Purwokerto to the present.

Interaction: Hovering on nodes reveals milestones (e.g., "First AI Model," "Fullstack Internship").

B. Interactive AI Playground (Live Proof)
Feature: A "Terminal" style input field.

Logic: Users can ask: "What tools do you use?" or "Summarize your projects."

Execution: Integration with a lightweight LLM API or a pre-defined RAG (Retrieval-Augmented Generation) system to answer based on your CV data.

C. "Inspect Mode" (The Developer's Reveal)
Feature: A "Debug" icon at the corner.

Logic: When clicked, the site shows "Under the Hood" data overlays:

Current GSAP FPS counter.

Tech stack icons (Next.js, Tailwind, PyTorch) floating over relevant sections.

API response times for the Live Stats (Spotify/GitHub).

6. TECHNICAL INTEGRATIONS (LIVE DATA)
GitHub Engine: Monochrome contribution graph + Repo cards with real-time "Stars" and "Language" stats.

Spotify Pulse: A live waveform visualizer that reacts to the "Now Playing" track (Mocked via GSAP if API latency is high).

Contact CLI: A functional command-line interface for sending messages (e.g., typing send --message "Hello").

7. EXECUTION GUIDELINES FOR AI ENGINE
"To the AI executing this: Use React/Next.js 14 with App Router. Implement GSAP 3 with ScrollTrigger and Flip plugins. Ensure the entire DOM is accessible (ARIA). Style using Tailwind CSS. Priority is 60fps performance on 'Immersive Mode' and sub-1s TTI (Time to Interactive) on 'Recruiter Mode'."
