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
  links: { arxiv: 'https://arxiv.org/abs/2610.29866', code: 'https://github.com/GeoMem-VLA/GeoMem-VLA', huggingface: 'https://huggingface.co/rxc205/GEOMEM-VLA' },
  videos: {
    teaser: null, // 'assets/videos/teaser.mp4'
    reconstruction: null, eef: null, memory: null,
    sticks: 'assets/videos/sticks-2x.mp4',
    cup: 'assets/videos/cup-2x.mp4',
    pockets: 'assets/videos/pockets-2x.mp4',
    cube4: 'assets/videos/pickn-4-2x.mp4', cube: 'assets/videos/pickn-2x.mp4', apple: 'assets/videos/apple-2x.mp4?v=20261021'
  },
  posters: {cube4: 'assets/images/video-cube4.webp', cube: 'assets/images/video-cube.webp', sticks: 'assets/images/video-sticks.webp', cup: 'assets/images/video-cup.webp', pockets: 'assets/images/video-pockets.webp'},
  videoSpeeds: {sticks: 2, cup: 2, pockets: 2, apple: 2, cube: 2, cube4: 2}, // Displayed speed relative to the original recording.
  videoEncodedSpeeds: {sticks: 2, cup: 2, pockets: 2, apple: 2, cube: 2, cube4: 2}, // Speed already encoded in the MP4 files.
  bibtex: `@misc{zhang2026geomemvlainternalizing3dscene,
      title={GeoMem-VLA: Internalizing 3D Scene Understanding into Temporal Memory for Vision-Language-Action Models},
      author={Qinfan Zhang and Yifan Luo and Haoyuan Shi and Guanlin Liu and Han Dong and Haozhe Shan and Yong Dai and Xiangcong Ren and Xiaozhu Ju},
      year={2026},
      eprint={2610.29866},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2610.29866},
}`
};
