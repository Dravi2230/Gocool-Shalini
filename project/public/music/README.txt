Put your background song here.

REQUIRED FILENAME:  song.mp3
So the final path is:  public/music/song.mp3

Steps:
1. Get your "Deema Deema" audio file as an .mp3
2. Rename it exactly to:  song.mp3
3. Place it in this folder (public/music/), replacing nothing else.
4. Restart `npm run dev` (or rebuild) and it will play automatically:
   - it starts on the LAST login quiz question
   - it keeps playing through Ready -> Surprise (and the cat page)
   - the 🎵 button (bottom-right) pauses/plays it

If no song.mp3 is found here, a soft generative melody plays instead,
so the site is never silent.

Tip: use an .mp3 (best browser support). Keep the file reasonably sized
(a few MB) so it loads quickly on her phone.
