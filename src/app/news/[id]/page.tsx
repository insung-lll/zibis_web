import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from('news')
    .select('id, title, content, thumbnail_url, created_at, is_published')
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (!item) notFound();

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-3xl mx-auto space-y-10">

        <Link href="/news" className="text-xs font-semibold tracking-widest uppercase text-[#111111]/60 hover:text-[#111111] transition">
          ← Back to News
        </Link>

        <div className="space-y-4 border-b border-[#111111]/10 pb-10">
          <span className="text-[10px] font-mono tracking-wider text-[#111111]/40 block">
            {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <h1 className="text-3xl md:text-5xl font-light tracking-tight leading-none text-[#111111]">
            {item.title}
          </h1>
        </div>

        {item.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumbnail_url} alt={item.title} className="w-full aspect-[16/9] object-cover" />
        )}

        <div
          className="text-sm font-light leading-relaxed text-[#111111]/80 space-y-4 [&_h2]:text-xl [&_h2]:font-medium [&_h2]:tracking-[-0.01em] [&_h2]:leading-snug [&_h2]:text-[#111111] [&_img]:w-full [&_a]:text-[#036CC5] [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: item.content || '' }}
        />

      </div>
    </div>
  );
}
