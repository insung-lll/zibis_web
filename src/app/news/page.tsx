import type { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'News',
  description: 'Latest news, announcements, and press from ZIBIS.',
};

export default async function NewsPage() {
  const supabase = await createClient();
  const { data: newsItems } = await supabase
    .from('news')
    .select('id, title, thumbnail_url, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4 max-w-2xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Studio Updates)
          </span>
          <RevealText
            as="h1"
            className="text-4xl md:text-6xl font-light tracking-tight leading-none uppercase"
          >
            News
          </RevealText>
          <RevealText delay={0.25} className="text-sm font-light leading-relaxed text-[#111111]/60">
            Announcements, press coverage, and updates from the ZIBIS studio.
          </RevealText>
        </div>

        {/* News Grid */}
        {!newsItems || newsItems.length === 0 ? (
          <p className="text-sm font-light text-[#111111]/40">No news articles yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-14">
            {newsItems.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="group block space-y-4">
                <div className="relative overflow-hidden aspect-[4/3] bg-[#1A1A1A]">
                  {item.thumbnail_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.thumbnail_url}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[9px] font-mono tracking-widest text-[#F9F9F7]/30 uppercase">ZIBIS</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-[#111111]/40 block mb-1">
                    {new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </span>
                  <h3 className="text-sm font-medium tracking-normal group-hover:text-[#036CC5] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
