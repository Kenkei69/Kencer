export interface VideoProject {
  id: string;
  title: string;
  category: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string; // Optional if we want to use poster image
  span?: string; // For grid layout sizing
  isPortrait?: boolean;
}

export const videosData: VideoProject[] = [
  {
    id: "video-2",
    title: "Long Format Cut 1",
    category: "Documentary / Promo",
    description: "Extended promo cut showcasing seamless transitions and audio design.",
    videoUrl: "/videos/Long 1.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "video-3",
    title: "Long Format Cut 2",
    category: "Event / Showcase",
    description: "Cinematic event showcase focusing on storytelling.",
    videoUrl: "/videos/Long 2.mp4",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: "video-1",
    title: "Terphren Ad",
    category: "Commercial",
    description: "High-impact visual commercial with dynamic pacing.",
    videoUrl: "/videos/Terphren.mp4",
    span: "md:col-span-2 md:row-span-2",
    isPortrait: true,
  }
];
