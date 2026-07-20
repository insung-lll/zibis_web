import type { Metadata } from 'next';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'Gallery Archive',
  description: 'Visual references of proportions, details, and lighting shadows created by ZIBIS.',
};

export default function GalleryPage() {
  const galleryItems = [
    { name: "Texture Study 01", colorClass: "bg-[#2A2B2D]" },
    { name: "Void & Shadows", colorClass: "bg-[#3D3A38]" },
    { name: "Cove Illumination", colorClass: "bg-[#1E2124]" },
    { name: "Monolith Form", colorClass: "bg-[#2F2E2C]" },
    { name: "Circadian Warmth", colorClass: "bg-[#2E3135]" },
    { name: "Structural Rhythm", colorClass: "bg-[#232426]" },
    { name: "Daylight Inflow", colorClass: "bg-[#383A3C]" },
    { name: "Material Contrast", colorClass: "bg-[#242527]" },
    { name: "Minimal Interface", colorClass: "bg-[#2D2E30]" }
  ];

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 max-w-2xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Visual Archive)
          </span>
          <RevealText 
            as="h1" 
            className="text-4xl md:text-6xl font-light tracking-tight uppercase"
          >
            {"Gallery Archive\nof spatial form"}
          </RevealText>
          <p className="text-sm font-light leading-relaxed text-[#111111]/60">
            An archive showcasing the harmony of spatial proportions, materials, textures, and shading contrasts through geometric monochrome studies.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {galleryItems.map((item, idx) => (
            <div 
              key={idx} 
              className="group relative overflow-hidden aspect-square bg-[#1A1A1A] cursor-pointer"
            >
              <div 
                className={`absolute inset-0 ${item.colorClass} opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out`}
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[10px] font-mono text-[#F9F9F7]/60 tracking-wider">
                  (REFERENCE {idx + 1})
                </span>
                <h3 className="text-sm font-light text-[#F9F9F7] uppercase tracking-widest mt-1">
                  {item.name}
                </h3>
              </div>
              
              {/* Default Index */}
              <div className="absolute top-4 left-4 text-[9px] font-mono text-[#F9F9F7]/30 group-hover:text-[#F9F9F7]/70 transition-colors">
                [ {idx < 9 ? `0${idx + 1}` : idx + 1} ]
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
