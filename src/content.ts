// All page text and images live here, so swapping in your own details is one file.

export const site = {
  // Big hero heading after "Hi, i'm" is replaced by this full line
  heroHeading: 'kyvora',
  tagline: 'your business deserves to be seen. websites, design, ai videos and social content',
  about:
    "Kyvora is a creative tech agency helping businesses get seen. We design websites, flyers and visual identities, produce AI videos and run social content, for brands in French and English. Let's build something incredible together!",
  // Replace 000000000 with your WhatsApp number in international format, digits only (e.g. 2376XXXXXXXX)
  contactHref: 'https://wa.me/000000000',
  contactLabel: 'WhatsApp',
  portrait:
    'https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png',
};

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#projects' },
  { label: 'Contact', href: site.contactHref },
];

const m = (slug: string) => `https://motionsites.ai/assets/${slug}.gif`;
export const marqueeImages = [
  m('hero-space-voyage-preview-eECLH3Yc'),
  m('hero-codenest-preview-Cgppc2qV'),
  m('hero-vex-ventures-preview-BczMFIiw'),
  m('hero-stellar-ai-v2-preview-DjvxjG3C'),
  m('hero-asme-preview-B_nGDnTP'),
  m('hero-transform-data-preview-Cx5OU29N'),
  m('hero-vitara-preview-Cjz2QYyU'),
  m('hero-terra-preview-BFjrCr7T'),
  m('hero-skyelite-preview-DHaZIgUv'),
  m('hero-aethera-preview-DknSlcTa'),
  m('hero-designpro-preview-D8c5_een'),
  m('hero-stellar-ai-preview-D3HL6bw1'),
  m('hero-xportfolio-preview-D4A8maiC'),
  m('hero-orbit-web3-preview-BXt4OttD'),
  m('hero-nexora-preview-cx5HmUgo'),
  m('hero-evr-ventures-preview-DZxeVFEX'),
  m('hero-planet-orbit-preview-DWAP8Z1P'),
  m('hero-new-era-preview-CocuDUm9'),
  m('hero-wealth-preview-B70idl_u'),
  m('hero-luminex-preview-CxOP7ce6'),
  m('hero-celestia-preview-0yO3jXO8'),
];

const f = (file: string) =>
  `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/${file}`;
export const aboutDecor = {
  moon: f('moon_icon.11395d36.png'),
  object: f('p59_1.4659672e.png'),
  lego: f('lego_icon-1.703bb594.png'),
  group: f('Group_134-1.2e04f3ce.png'),
};

export const services = [
  { name: 'Websites', description: 'Fast, modern websites that make your business look credible and bring you clients, from one-page sites to full online shops.' },
  { name: 'Flyers & Design', description: 'Flyers, posters, logos and visual identities that grab attention online and in print.' },
  { name: 'AI Videos', description: 'Eye-catching AI-powered video ads and promos made fast, ready for Instagram, TikTok and WhatsApp status.' },
  { name: 'Social Content', description: 'Posts, stories and campaigns that keep your brand active and growing on social media.' },
];

export type Project = { name: string; category: string; href: string; images: [string, string, string] };
export const projects: Project[] = [
  {
    name: 'CFPMA',
    category: 'Training center website',
    href: 'https://cfpma-maloum.com',
    // Real screenshots of the Centre de Formation Professionnelle Maloum & Ayena site (public/work/)
    images: ['work/cfpma-1.jpg', 'work/cfpma-2.jpg', 'work/cfpma-3.jpg'],
  },
  {
    name: 'Kyvora Synapse',
    category: 'Interactive 3D showcase site · 2026',
    href: 'https://kyvora-synaptic-yb7p.vercel.app',
    images: ['work/synapse-1.jpg', 'work/synapse-2.jpg', 'work/synapse-3.jpg'],
  },
];
