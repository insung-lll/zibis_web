import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjectDetailClient from '@/components/ProjectDetailClient';

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main className="min-h-screen bg-[#F9F9F7] text-[#111111]">
      <Header />
      <ProjectDetailClient projectId={id} />
      <Footer />
    </main>
  );
}
