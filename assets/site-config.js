/* Replace null with a URL/path when a resource is ready. No build step needed. */
window.GEOMEM_CONFIG = {
  authors: [
    { name: 'Qinfan Zhang', affiliation: '1,5', marker: '†' },
    { name: 'Yifan Luo', affiliation: '2,5', marker: '†' },
    { name: 'Haoyuan Shi', affiliation: '3,5' },
    { name: 'Guanlin Liu', affiliation: '4,5' },
    { name: 'Han Dong', affiliation: '5' },
    { name: 'Haozhe Shan', affiliation: '5,6' },
    { name: 'Yong Dai', affiliation: '5' },
    { name: 'Xiangcong Ren', affiliation: '5', marker: '‡' },
    { name: 'Xiaozhu Ju', affiliation: '5', marker: '✉' }
  ],
  affiliations: [
    { id: '1', name: 'Beihang University' },
    { id: '2', name: 'Renmin University of China' },
    { id: '3', name: 'University of Science and Technology of China' },
    { id: '4', name: 'The Chinese University of Hong Kong, Shenzhen' },
    { id: '5', name: 'X-humanoid' },
    { id: '6', name: 'Fudan University' }
  ],
  links: { arxiv: null, code: 'https://github.com/GeoMem-VLA/GeoMem-VLA', huggingface: null },
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
