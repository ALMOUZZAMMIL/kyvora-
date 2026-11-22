# Kyvora Synapse — 3D showcase site

A one-page showcase site for Kyvora with an interactive 3D "neural network" hero (three.js via React Three Fiber), scroll animations (Framer Motion) and an FR/EN toggle.

- All text, the WhatsApp number and project names: `src/content.ts`
- 3D scene: `src/components/NeuralCore.tsx`
- Styles and colours: `src/index.css` (tokens at the top)

```bash
npm install
npm run dev     # local preview
npm run build   # production build in dist/
```

Deploy: import the repo on Vercel (framework preset Vite, defaults are fine).
