import type { Metadata } from 'next';
import ProjectsClient from '@/components/ProjectsClient';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the selected residential and commercial portfolios designed by ZIBIS.',
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
