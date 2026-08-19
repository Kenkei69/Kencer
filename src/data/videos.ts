export interface VideoProject {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string; // Optional if we want to use poster image
  span?: string; // For grid layout sizing
  isPortrait?: boolean;
  tools?: string[];
  metrics?: string[];
  timeline?: string;
}

export const videosData: VideoProject[] = [
  {
    id: "video-2",
    title: "Long Format Cut 1",
    category: "Documentary / Promo",
    description: "Extended promo cut showcasing seamless transitions and audio design.",
    videoUrl: "/videos/Long 1.mp4",
    span: "md:col-span-1 md:row-span-1",
    tools: ['Premiere Pro', 'After Effects'],
    metrics: ['800K views'],
    timeline: '2 weeks'
  },
  {
    id: "video-3",
    title: "Long Format Cut 2",
    category: "Event / Showcase",
    description: "Cinematic event showcase focusing on storytelling.",
    videoUrl: "/videos/Long 2.mp4",
    span: "md:col-span-1 md:row-span-1",
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    metrics: ['1.2M views', '4.8★ rating'],
    timeline: '3 weeks'
  },
  {
    id: "video-1",
    title: "Terphren Ad",
    category: "Commercial",
    description: "High-impact visual commercial with dynamic pacing.",
    videoUrl: "/videos/Terphren.mp4",
    span: "md:col-span-2 md:row-span-2",
    isPortrait: true,
    tools: ['Premiere Pro', 'After Effects', 'Audition'],
    metrics: ['2M views', '300% engagement'],
    timeline: '1 week'
  }
];
