export interface Project {
  id: string;
  title: string;
  description: string;
  url: string | null;
  status: 'live' | 'upcoming';
}

export const projects: Project[] = [
  {
    id: 'project-carb',
    title: 'Project Carb',
    description: 'Autocorrect for 3D printing',
    url: 'https://projectcarb.com',
    status: 'live',
  },
  {
    id: 'brain-tunnel',
    title: 'Brain-Tunnel',
    description: 'Speed reading, reimagined',
    url: 'https://brain-tunnel.vercel.app',
    status: 'live',
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    description: '',
    url: null,
    status: 'upcoming',
  },
];
