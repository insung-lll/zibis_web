import type { Metadata } from 'next';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'B2B Partnership',
  description: 'Commercial and business partnership opportunities with ZIBIS.',
};

export default function B2BPage() {
  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Business & Partnership)
          </span>
          <RevealText
            as="h1"
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-[#111111]"
          >
            {"B2B partnership\n& commercial collaboration"}
          </RevealText>
          <RevealText delay={0.2} className="text-base font-light leading-relaxed text-[#111111]/60 mt-4">
            ZIBIS partners with developers, builders, and commercial clients to deliver smart space design and lighting planning at scale. Details on our B2B services and collaboration process are coming soon.
          </RevealText>
        </div>

      </div>
    </div>
  );
}
