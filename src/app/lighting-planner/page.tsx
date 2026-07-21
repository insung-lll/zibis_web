import type { Metadata } from 'next';
import RevealText from '@/components/RevealText';

export const metadata: Metadata = {
  title: 'Lighting Planner Process',
  description: 'Discover the structured design methodology and smart lighting planning strategy of ZIBIS.',
};

export default function LightingPlannerPage() {
  const steps = [
    {
      step: "01",
      title: "Consultation & Site Analysis",
      desc: "We analyze the physical scale of the space, daylight flow, resident activity paths, and lifestyle requirements through customized consultation."
    },
    {
      step: "02",
      title: "Spatial & Illumination Concept",
      desc: "Based on a minimalist space segmentation, we simulate daylight inflow and structure the spatial allocation of necessary light intensity."
    },
    {
      step: "03",
      title: "Lighting Design Spec & Circuitry",
      desc: "We detail target puncture positions, indirect light fixtures, and specify hardware circuits for dimmer configurations."
    },
    {
      step: "04",
      title: "Smart System Integration",
      desc: "We integrate automated smart control systems that adjust color temperature from 2200K to 5700K dynamically based on seasons and diurnal rhythms."
    },
    {
      step: "05",
      title: "Site Inspection & Tuning",
      desc: "We directly participate in on-site construction inspection and perform fine illumination tuning to deliver ultimate light contrast."
    }
  ];

  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="space-y-4 max-w-3xl border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Our Methodology)
          </span>
          <RevealText 
            as="h1" 
            className="text-4xl md:text-6xl font-light tracking-tight leading-none uppercase"
          >
            {"Lighting Planner\n& Design Process"}
          </RevealText>
          <RevealText delay={0.25} className="text-base font-light leading-relaxed text-[#111111]/60 mt-4">
            Architecture is a vessel that holds light. ZIBIS assigns a dedicated lighting planner to guide you through our unique lighting design and smart control automation engineering from concept to completion.
          </RevealText>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          {steps.map((step, idx) => (
            <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 border-b border-[#111111]/5 pb-16 last:border-none">
              
              {/* Step info */}
              <div className="lg:col-span-4 flex items-start space-x-6">
                <span className="text-2xl font-mono font-light text-[#111111]/30">
                  ({step.step})
                </span>
                <div>
                  <h3 className="text-lg md:text-xl font-medium tracking-[-0.01em] leading-snug text-[#111111]">
                    {step.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <div className="lg:col-span-5 flex items-center">
                <p className="text-sm font-light leading-relaxed text-[#111111]/60">
                  {step.desc}
                </p>
              </div>

              {/* Visual Placeholder (monochrome block) */}
              <div className="lg:col-span-3 bg-[#E5E5E3] aspect-video w-full relative flex items-center justify-center">
                <span className="text-[8px] font-mono tracking-widest text-[#111111]/40 uppercase">
                  [ Process Visual {step.step} ]
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
