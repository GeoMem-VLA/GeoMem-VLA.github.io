# GeoMem-VLA

Project website: **https://geomem-vla.github.io/**

Internalizing 3D Scene Understanding into Temporal Memory for Vision-Language-Action Models.

## Preview

Run `python -m http.server 8000 --bind 127.0.0.1` and open http://127.0.0.1:8000/.

## Update

- `index.html`: paper content, figures, and experiment sections.
- `assets/site-config.js`: authors, affiliations, arXiv/GitHub/Hugging Face links, videos, posters, and BibTeX. Keep unavailable resources as `null`. Setting `links.huggingface` enables its button; setting `bibtex` replaces the Citation placeholder and enables copying.
- `assets/main.js`: benchmark data, galleries, figure viewer, and video playback.
- `assets/cases.js` / `assets/cases.css`: keyboard-accessible case switchers and the shared case-study layout.
- `assets/style.css`: base styles; `assets/chapters.css` and `assets/chapters.js`: continuous section layout and reveal animations.
- `assets/images/` and `assets/videos/`: published media only.
- `assets/icons/README.md`: icon sources and licenses.

The reconstruction, EEF, and memory sections use curated static case panels from RoboTwin simulation runs. The analysis sections intentionally exclude AGX real-robot cases for now. Published case images and lightweight metadata live under `assets/images/cases/` and `assets/data/`; raw checkpoints, NPZ files, and extraction scripts stay outside this repository. Real-world videos are encoded at 2× speed, play muted on entering view, loop, and pause when hidden. `videoSpeeds` sets the effective playback speed (currently 2×); `videoEncodedSpeeds` records the 2× speed already baked into the files. The player uses their ratio.

## Deployment

Static HTML/CSS/JavaScript with no build step or frontend dependencies. GitHub Pages publishes the root of `main`; pushing updates triggers the existing Pages deployment. `.nojekyll` keeps the site static.

Original papers, source videos, planning notes, extraction scripts, and temporary files are not published in this repository.

## Selected analysis cases

All three analysis sections use these cases, in order:

1. `Clean_open_microwave_ep000` (geometry / EEF frame 0)
2. `Randomized_stack_blocks_three_ep000` (frame 126)
3. `Randomized_open_microwave_ep000` (frame 0)
4. `Randomized_open_laptop_ep000` (frame 0)

`assets/data/selected-cases.json` records source paths and SHA256 hashes verified against the development machine. Memory panels are the original `memory/event_frames_panel.png` exports, without replotting. The PNGs are used directly for display and zoom; the source PDFs remain on the development machine. Superseded local case assets are archived under ignored `work/retired-cases/`.
