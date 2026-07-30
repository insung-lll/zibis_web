import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'ZIBIS 개인정보처리방침',
};

const sections = [
  {
    title: '1. 수집하는 개인정보 항목',
    body: 'ZIBIS는 견적 상담 신청 시 다음의 개인정보를 수집합니다: 성함, 연락처(전화번호), 시공지 주소. 서비스 이용 과정에서 접속 기록, 브라우저 정보가 자동으로 생성·수집될 수 있습니다.',
  },
  {
    title: '2. 개인정보의 수집 및 이용 목적',
    body: '수집한 개인정보는 견적 상담 및 시공 문의 응대, 상담 진행 상태 안내, 서비스 개선을 위한 통계 분석 목적으로만 이용됩니다.',
  },
  {
    title: '3. 개인정보의 보유 및 이용 기간',
    body: '개인정보는 상담 목적 달성 후 지체 없이 파기합니다. 다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관합니다.',
  },
  {
    title: '4. 개인정보의 제3자 제공',
    body: 'ZIBIS는 이용자의 동의가 있거나 법령에 근거한 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.',
  },
  {
    title: '5. 이용자의 권리',
    body: '이용자는 언제든지 본인의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다. 관련 문의는 아래 연락처로 접수해 주세요.',
  },
  {
    title: '6. 문의처',
    body: '개인정보 처리에 관한 문의는 ZIBIS 웹사이트의 상담 신청 폼 또는 대표 연락처를 통해 접수하실 수 있습니다.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#F9F9F7] text-[#111111] px-6 py-28 md:px-12 md:py-36">
      <div className="max-w-3xl mx-auto space-y-16">
        <div className="space-y-4 border-b border-[#111111]/10 pb-12">
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#111111]/40">
            (Privacy Policy)
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none text-[#111111]">
            개인정보처리방침
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
