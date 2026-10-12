# GeoMem-VLA

Project website: **https://geomem-vla.github.io/**

Internalizing 3D Scene Understanding into Temporal Memory for Vision-Language-Action Models.

## Preview

Run `python -m http.server 8000 --bind 127.0.0.1` and open http://127.0.0.1:8000/.

## Update

- `index.html`: paper content, figures, and experiment sections.
- `assets/site-config.js`: authors, affiliations, arXiv/GitHub links, videos, posters, and BibTeX. Keep unavailable resources as `null`.
- `assets/main.js`: benchmark data, galleries, figure viewer, and video playback.
- `assets/style.css`: base styles; `assets/chapters.css` and `assets/chapters.js`: continuous section layout and reveal animations.
- `assets/images/` and `assets/videos/`: published media only.
- `assets/icons/README.md`: icon sources and licenses.

The reconstruction, EEF, and memory sections await final cases. Assigning their video paths in the configuration replaces the placeholders. Real-world videos are encoded at 4× speed, play muted on entering view, loop, and pause when hidden. `videoSpeeds` labels the encoded speed; it does not apply additional acceleration.

## Deployment

Static HTML/CSS/JavaScript with no build step or frontend dependencies. GitHub Pages publishes the root of `main`; pushing updates triggers the existing Pages deployment. `.nojekyll` keeps the site static.

Original papers, source videos, planning notes, extraction scripts, and temporary files are not published in this repository.
