# Shalini's Birthday Surprise ❤️

A romantic, interactive birthday website made with love by Gocool.
A "love quiz" unlocks the surprise, then scrolls through your whole story.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## The experience

1. **Love Quiz gate** (`/`) — a playful quiz that unlocks the surprise.
2. **Birthday site** (`/surprise`) — hero, love-story timeline, typewriter
   love letter, 20 reasons (flip cards), memory gallery, birthday wishes,
   love meter, gift-box reveal, and a night-sky finale with confetti.

Extras: floating hearts, heart cursor trail (desktop), confetti, typewriter
text, and a romantic background-music toggle (bottom-right, muted by default).

## Personalize it

- **Text, names, questions, reasons, wishes, the letter** → edit
  [`src/data.js`](src/data.js). Everything reads from there.
- **Photos** → click **"Add our photos"** in the gallery to preview your own
  images, or drop files in `public/photos/` and set their paths in the
  `initialPhotos` array in [`src/sections/Gallery.jsx`](src/sections/Gallery.jsx).

## Deploy (shareable link)

Push this folder to GitHub and import it on [Vercel](https://vercel.com).
`vercel.json` already handles SPA routing so `/surprise` works on refresh.

Build command: `npm run build` · Output dir: `dist`
