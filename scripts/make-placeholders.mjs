// Generates swappable placeholder images (film stills, posters, portrait).
// Run once with: node scripts/make-placeholders.mjs
// Real images simply replace these files (same name) or get new names in film.yaml.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const jobs = [
  // [path, width, height, label, hue]
  ['src/content/films/occupy-toronto/poster.jpg', 1000, 1500, 'OCCUPY TORONTO · POSTER', 210],
  ['src/content/films/occupy-toronto/stills/still-01.jpg', 1920, 1080, 'OCCUPY TORONTO · STILL 01', 210],
  ['src/content/films/occupy-toronto/stills/still-02.jpg', 1920, 1080, 'OCCUPY TORONTO · STILL 02', 200],
  ['src/content/films/occupy-toronto/stills/still-03.jpg', 1920, 1080, 'OCCUPY TORONTO · STILL 03', 220],
  ['src/content/films/what-i-owe-to-my-mother/poster.jpg', 1000, 1500, 'WHAT I OWE TO MY MOTHER · POSTER', 25],
  ['src/content/films/what-i-owe-to-my-mother/stills/still-01.jpg', 1920, 1080, 'WHAT I OWE TO MY MOTHER · STILL 01', 25],
  ['src/content/films/what-i-owe-to-my-mother/stills/still-02.jpg', 1920, 1080, 'WHAT I OWE TO MY MOTHER · STILL 02', 15],
  ['src/assets/portrait.jpg', 1200, 1500, 'PORTRAIT', 30],
  ['src/assets/hero.jpg', 2400, 1350, 'HERO IMAGE', 30],
];

for (const [path, w, h, label, hue] of jobs) {
  const fs = Math.round(Math.min(w, h) / 28);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <defs>
      <radialGradient id="g" cx="35%" cy="40%" r="80%">
        <stop offset="0" stop-color="hsl(${hue} 18% 22%)"/>
        <stop offset="1" stop-color="hsl(${hue} 20% 6%)"/>
      </radialGradient>
      <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/></filter>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" filter="url(#n)"/>
    <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
      font-family="Georgia, serif" font-size="${fs}" letter-spacing="${fs / 4}"
      fill="hsl(${hue} 15% 70%)" fill-opacity="0.55">${label}</text>
    <text x="50%" y="${50 + 100 / 18}%" text-anchor="middle" dominant-baseline="middle"
      font-family="Helvetica, Arial, sans-serif" font-size="${fs * 0.45}" letter-spacing="${fs / 8}"
      fill="hsl(${hue} 10% 60%)" fill-opacity="0.45">PLACEHOLDER · REPLACE ME</text>
  </svg>`;
  mkdirSync(dirname(path), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toFile(path);
  console.log('wrote', path);
}
