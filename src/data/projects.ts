export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  span?: string;
  tools?: string[];
  metrics?: string[];
  timeline?: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Neon Cyberpunk Identity",
    category: "Branding / Visual Identity",
    image: "/projects/Screenshot_20260731_183526_Drive.jpg",
    description: "A bold, futuristic brand identity designed to cut through the noise.",
    span: "md:col-span-2 md:row-span-2",
    tools: ['Photoshop', 'Illustrator'],
    metrics: ['2.5M impressions', '180% engagement'],
    timeline: '1 week'
  },
  {
    id: "2",
    title: "Minimalist Typeface Study",
    category: "Typography",
    image: "/projects/Screenshot_20260731_183539_Drive.jpg",
    description: "Exploring the boundaries of modern typography and negative space.",
    span: "md:col-span-1 md:row-span-1",
    tools: ['Figma', 'Illustrator'],
    metrics: ['Featured on Behance'],
    timeline: '3 days'
  },
  {
    id: "3",
    title: "Ethereal Motion Graphics",
    category: "Digital Art",
    image: "/projects/Screenshot_20260731_183551_Drive.jpg",
    description: "Fluid motion graphics designed for an immersive digital campaign.",
    span: "md:col-span-1 md:row-span-1",
    tools: ['After Effects', 'Cinema 4D'],
    metrics: ['500K views', '95% retention'],
    timeline: '2 weeks'
  },
  {
    id: "4",
    title: "Avant-Garde Campaign",
    category: "Advertising",
    image: "/projects/Screenshot_20260731_183606_Drive.jpg",
    description: "Striking visual campaign for a high-end fashion label.",
    span: "md:col-span-1 md:row-span-2",
    tools: ['Photoshop', 'Lightroom'],
    metrics: ['3x ROAS', '1.2M reach'],
    timeline: '1 week'
  },
  {
    id: "5",
    title: "Vogue Editorial Layout",
    category: "Editorial Design",
    image: "/projects/Screenshot_20260731_183621_Drive.jpg",
    description: "A conceptual magazine layout pushing editorial boundaries.",
    span: "md:col-span-1 md:row-span-1",
    tools: ['InDesign', 'Photoshop'],
    metrics: ['Print featured'],
    timeline: '5 days'
  },
  {
    id: "6",
    title: "Abstract Conceptual",
    category: "3D / CGI",
    image: "/projects/Screenshot_20260731_183639_Drive.jpg",
    description: "Surreal 3D environments crafted for brand storytelling.",
    span: "md:col-span-2 md:row-span-1",
    tools: ['Blender', 'Cinema 4D'],
    metrics: ['Awwwards Nominee'],
    timeline: '3 weeks'
  }
];
