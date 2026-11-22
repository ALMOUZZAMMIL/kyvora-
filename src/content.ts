// All site text lives here. Edit freely: FR is the default language, EN is the toggle.

// Replace with the real WhatsApp number (international format, digits only).
export const WHATSAPP_NUMBER = '000000000000'
export const whatsappLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`

export type Lang = 'fr' | 'en'

const fr = {
  nav: { services: 'Services', process: 'Méthode', work: 'Projets', contact: 'Contact', cta: 'Discutons' },
  hero: {
    kicker: 'Studio créatif · augmenté par l’IA',
    title: ['Votre business', 'mérite d’être', 'vu.'],
    sub: 'Kyvora relie stratégie, design et intelligence artificielle pour créer des sites, visuels et vidéos qui captent l’attention et la transforment en clients.',
    primary: 'Lancer mon projet',
    secondary: 'Voir nos projets',
    waMsg: 'Bonjour Kyvora, je veux rendre mon business visible.',
    scroll: 'Défiler',
    hud: ['Signal', 'Créativité', 'Impact'],
  },
  marquee: ['Sites web', 'Identité visuelle', 'Vidéos IA', 'Flyers', 'Réseaux sociaux', 'Landing pages', 'Motion design', 'Branding'],
  services: {
    label: '01 — Le noyau',
    title: 'Quatre connexions pour être vu partout.',
    items: [
      { tag: 'WEB', name: 'Sites web', text: 'Sites vitrines et landing pages rapides, animés, pensés pour convertir sur mobile.', points: ['Design sur-mesure', 'SEO de base', 'Mise en ligne incluse'] },
      { tag: 'DESIGN', name: 'Flyers & design', text: 'Flyers, affiches, menus et identités visuelles qui se remarquent dans la rue comme en ligne.', points: ['Print & digital', 'Charte graphique', 'Livraison rapide'] },
      { tag: 'IA', name: 'Vidéos IA', text: 'Spots publicitaires et vidéos produits générés par IA, sans tournage ni gros budget.', points: ['Formats Reels / TikTok', 'Voix off', 'Sous-titres'] },
      { tag: 'SOCIAL', name: 'Contenu social', text: 'Posts, carrousels et stories cohérents qui gardent votre marque active chaque semaine.', points: ['Calendrier éditorial', 'Templates de marque', 'Visuels prêts à publier'] },
    ],
  },
  process: {
    label: '02 — La méthode',
    title: 'Du premier signal au lancement.',
    steps: [
      { k: 'Signal', t: 'On écoute', d: 'Un échange WhatsApp pour comprendre votre activité, vos clients et votre objectif.' },
      { k: 'Synapse', t: 'On connecte', d: 'Concept, direction artistique et plan de contenu validés avec vous avant de produire.' },
      { k: 'Forge', t: 'On crée', d: 'Design, développement et génération IA, avec des retours rapides à chaque étape.' },
      { k: 'Lancement', t: 'On propulse', d: 'Mise en ligne, fichiers finaux et conseils pour que votre présence continue de grandir.' },
    ],
  },
  work: {
    label: '03 — Projets récents',
    title: 'Des marques qui se font remarquer.',
    items: [
      { name: 'CFPMA', type: 'Centre de formation · site web', year: '2025', hue: 18, url: 'https://cfpma-maloum.com', image: 'work/cfpma-1.jpg' },
    ],
    cta: 'Visiter le site',
  },
  stats: [
    { v: 48, s: 'h', l: 'pour un premier rendu' },
    { v: 4, s: '', l: 'expertises sous un même toit' },
    { v: 100, s: '%', l: 'pensé pour le mobile' },
    { v: 2, s: '', l: 'langues : FR & EN' },
  ],
  cta: {
    label: '04 — Connexion',
    title: ['Prêt à être', 'vu ?'],
    sub: 'Écrivez-nous sur WhatsApp. Réponse rapide, devis clair, sans engagement.',
    button: 'Écrire sur WhatsApp',
  },
  footer: { tagline: 'Votre business mérite d’être vu.', rights: 'Tous droits réservés.', demo: 'Studio créatif' },
}

const en: typeof fr = {
  nav: { services: 'Services', process: 'Method', work: 'Work', contact: 'Contact', cta: 'Let’s talk' },
  hero: {
    kicker: 'Creative studio · AI-augmented',
    title: ['Your business', 'deserves to be', 'seen.'],
    sub: 'Kyvora connects strategy, design and artificial intelligence to build websites, visuals and videos that capture attention and turn it into customers.',
    primary: 'Start my project',
    secondary: 'See our work',
    waMsg: 'Hi Kyvora, I want my business to be seen.',
    scroll: 'Scroll',
    hud: ['Signal', 'Creativity', 'Impact'],
  },
  marquee: ['Websites', 'Visual identity', 'AI videos', 'Flyers', 'Social media', 'Landing pages', 'Motion design', 'Branding'],
  services: {
    label: '01 — The core',
    title: 'Four connections to be seen everywhere.',
    items: [
      { tag: 'WEB', name: 'Websites', text: 'Fast, animated showcase sites and landing pages built to convert on mobile.', points: ['Custom design', 'SEO basics', 'Launch included'] },
      { tag: 'DESIGN', name: 'Flyers & design', text: 'Flyers, posters, menus and visual identities that stand out on the street and online.', points: ['Print & digital', 'Brand guidelines', 'Fast delivery'] },
      { tag: 'AI', name: 'AI videos', text: 'AI-generated ads and product videos, no film crew or big budget needed.', points: ['Reels / TikTok formats', 'Voice-over', 'Captions'] },
      { tag: 'SOCIAL', name: 'Social content', text: 'Consistent posts, carousels and stories that keep your brand active every week.', points: ['Content calendar', 'Brand templates', 'Ready-to-post visuals'] },
    ],
  },
  process: {
    label: '02 — The method',
    title: 'From first signal to launch.',
    steps: [
      { k: 'Signal', t: 'We listen', d: 'A WhatsApp chat to understand your business, your customers and your goal.' },
      { k: 'Synapse', t: 'We connect', d: 'Concept, art direction and content plan agreed with you before production.' },
      { k: 'Forge', t: 'We create', d: 'Design, development and AI generation, with quick feedback at every step.' },
      { k: 'Launch', t: 'We propel', d: 'Go-live, final files and advice so your presence keeps growing.' },
    ],
  },
  work: {
    label: '03 — Recent work',
    title: 'Brands that get noticed.',
    items: fr.work.items.map((w, i) => ({ ...w, type: ['Training centre · website'][i] })),
    cta: 'View project',
  },
  stats: [
    { v: 48, s: 'h', l: 'to a first draft' },
    { v: 4, s: '', l: 'skills under one roof' },
    { v: 100, s: '%', l: 'mobile-first' },
    { v: 2, s: '', l: 'languages: FR & EN' },
  ],
  cta: {
    label: '04 — Connect',
    title: ['Ready to be', 'seen?'],
    sub: 'Message us on WhatsApp. Fast reply, clear quote, no commitment.',
    button: 'Message on WhatsApp',
  },
  footer: { tagline: 'Your business deserves to be seen.', rights: 'All rights reserved.', demo: 'Creative studio' },
}

export const content = { fr, en }
export type Content = typeof fr
