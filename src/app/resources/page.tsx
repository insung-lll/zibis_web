import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Download brochures, catalogs, and reference materials from ZIBIS.',
};

function formatBytes(bytes: number) {
  if (!bytes) return '';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export default async function ResourcesPage() {
  const supabase = await createClient();
  const { data: resources } = await supabase
    .from('resources')
    .select('id, title, description, file_url, file_size, created_at')
    .order('created_at', { ascending: false });

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4 max-w-2xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Downloads)
          </span>
          <RevealText
            as="h1"
            className="text-4xl md:text-6xl font-light tracking-tight leading-none uppercase"
          >
            Resources
          </RevealText>
          <RevealText delay={0.25} className="text-sm font-light leading-relaxed text-[#111111]/60">
            Brochures, catalogs, and reference documents available for download.
          </RevealText>
        </div>

        {/* Resource List */}
        {!resources || resources.length === 0 ? (
          <p className="text-sm font-light text-[#111111]/40">No resources available yet.</p>
        ) : (
          <div className="divide-y divide-[#111111]/10 border-t border-b border-[#111111]/10">
            {resources.map((item) => (
              <a
                key={item.id}
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 py-6 px-2 -mx-2 hover:bg-[#111111]/[0.03] transition-colors"
              >
                <div>
                  <h3 className="text-sm font-medium tracking-normal group-hover:text-[#036CC5] transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs font-light leading-relaxed text-[#111111]/50 mt-1">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40 shrink-0 whitespace-nowrap">
                  {formatBytes(item.file_size)} · Download ↓
                </span>
              </a>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
