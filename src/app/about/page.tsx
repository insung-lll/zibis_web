import type { Metadata } from 'next';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'About Studio',
  description: 'Learn about the design philosophy, team, and architecture approach of ZIBIS.',
};

export default function AboutPage() {
  const team = [
    { name: "Min Woo Ji", role: "Principal Architect", details: "M.Arch, KIRA" },
    { name: "Sarah Kim", role: "Lead Lighting Designer", details: "IALD, Associate" },
    { name: "John Park", role: "Senior Space Planner", details: "B.Arch, Spatial Strategy" }
  ];

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Studio & Identity)
          </span>
          <RevealText 
            as="h1" 
            className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-[#111111]"
          >
            {"About our studio\n& creative vision"}
          </RevealText>
          <RevealText delay={0.2} className="text-base font-light leading-relaxed text-[#111111]/60 mt-4">
            ZIBIS is a premium architectural design and space planning studio. We focus on shaping architectural spaces for people, stripping away unnecessary decorations to emphasize raw geometries, line-works, and natural daylight.
          </RevealText>
        </div>

        {/* Visual & Paragraph */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-6 bg-[#2B2B2C] aspect-[4/3] w-full relative flex items-center justify-center">
            <span className="text-[9px] font-mono tracking-widest text-[#F9F9F7]/30 uppercase">
              [ Studio Space Media Block ]
            </span>
          </div>
          <div className="md:col-span-6 space-y-6">
            <RevealText as="h2" className="text-xl md:text-2xl font-light tracking-[-0.01em] leading-snug text-[#111111]">
              Harmony of space, human scale, and daylight
            </RevealText>
            <RevealText delay={0.25} className="text-sm font-light leading-relaxed text-[#111111]/60">
              We focus on the essential meaning of dwelling. Rather than complex decorations, we combine smart space planning algorithms with physical structures to allow residents to dwell, work, and discover true inspiration.
            </RevealText>
            <RevealText delay={0.4} className="text-sm font-light leading-relaxed text-[#111111]/60">
              In particular, we carefully analyze daylight flow and local light temperature to hide bulky lighting fixtures, embedding only the soft reflection of illumination into the geometric canvas. This lighting strategy is the defining signature of ZIBIS.
            </RevealText>
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#111111]/10">
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#111111]/40 block">(01) MINIMAL SILHOUETTE</span>
            <h3 className="text-base font-medium">Minimal Silhouette</h3>
            <p className="text-xs font-light text-[#111111]/60 leading-relaxed">We strip away unnecessary layers, maximizing the structural void and proportion.</p>
          </div>
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#111111]/40 block">(02) LIGHT ARCHITECTURE</span>
            <h3 className="text-base font-medium">Light Architecture</h3>
            <p className="text-xs font-light text-[#111111]/60 leading-relaxed">Utilizing hidden indirect light sources, we convert spatial walls into canvas.</p>
          </div>
          <div className="space-y-3">
            <span className="text-[10px] font-mono tracking-widest text-[#111111]/40 block">(03) SMART ALGORITHM</span>
            <h3 className="text-base font-medium">Smart Algorithm</h3>
            <p className="text-xs font-light text-[#111111]/60 leading-relaxed">Circadian rhythm dimming and smart automation systems seamlessly integrated.</p>
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="border-b border-[#111111]/10 pb-4">
            <RevealText as="h3" className="text-lg md:text-xl font-light tracking-[-0.01em] uppercase">
              Our People
            </RevealText>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="space-y-2 border-b border-[#111111]/5 pb-6">
                <div className="h-48 bg-[#222222]/90 w-full relative flex items-center justify-center mb-4">
                  <span className="text-[8px] font-mono tracking-widest text-[#F9F9F7]/30 uppercase">[ PROFILE ]</span>
                </div>
                <h4 className="text-sm font-semibold text-[#111111]">{member.name}</h4>
                <p className="text-xs font-light text-[#111111]/60">{member.role}</p>
                <p className="text-[10px] font-mono text-[#111111]/40">{member.details}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
