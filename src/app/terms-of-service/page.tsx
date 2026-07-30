import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'ZIBIS 이용약관',
};

const sections = [
  {
    title: '제1조 (목적)',
    body: '본 약관은 ZIBIS(이하 "회사")가 제공하는 웹사이트 및 조명 플래너 서비스의 이용 조건과 절차, 회사와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 (서비스의 내용)',
    body: '회사는 스마트 공간 및 조명 설계 관련 정보 제공, 조명 배치 플래너, 견적 산출, 상담 신청 등의 서비스를 제공합니다. 서비스의 내용은 회사 사정에 따라 변경될 수 있습니다.',
  },
  {
    title: '제3조 (견적의 성격)',
    body: '조명 플래너를 통해 산출되는 견적은 참고용 예상 금액이며, 실제 시공 금액은 현장 상황 및 상담 결과에 따라 달라질 수 있습니다.',
  },
  {
    title: '제4조 (이용자의 의무)',
    body: '이용자는 상담 신청 시 정확한 정보를 제공해야 하며, 타인의 정보를 도용하거나 서비스 운영을 방해하는 행위를 해서는 안 됩니다.',
  },
  {
    title: '제5조 (지식재산권)',
    body: '웹사이트에 게시된 콘텐츠, 디자인, 도면 템플릿 등에 대한 저작권 및 지식재산권은 회사에 귀속되며, 회사의 사전 동의 없이 무단 복제·배포할 수 없습니다.',
  },
  {
    title: '제6조 (면책)',
    body: '회사는 천재지변, 시스템 장애 등 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임이 면제됩니다.',
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="space-y-4 border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Terms of Service)
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-[#111111]">
            이용약관
          </h1>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <h2 className="text-lg font-medium tracking-tight">{section.title}</h2>
              <p className="text-base font-light leading-relaxed text-[#111111]/60">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
