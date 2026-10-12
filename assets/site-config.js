/* Replace null with a URL/path when a resource is ready. No build step needed. */
window.GEOMEM_CONFIG = {
  authors: [], // [{ name: 'Author Name', url: 'https://...', affiliation: '1' }]
  affiliations: [], // ['1 University / Institute']
  links: { arxiv: null, code: 'https://github.com/GeoMem-VLA/GeoMem-VLA' },
  videos: {
    teaser: null, // 'assets/videos/teaser.mp4'
    reconstruction: null, eef: null, memory: null,
    sticks: 'assets/videos/sticks-4x.mp4',
    cup: 'assets/videos/cup-4x.mp4?v=20261012-trim',
    pockets: 'assets/videos/pockets-4x.mp4',
    cube: null, apple: null
  },
  posters: {sticks: 'assets/images/video-sticks.webp', cup: 'assets/images/video-cup.webp', pockets: 'assets/images/video-pockets.webp'},
  videoSpeeds: {sticks: 4, cup: 4, pockets: 4}, // Encoded speed relative to the uploaded files.
  bibtex: null // Add the official entry when publication metadata is available.
};
