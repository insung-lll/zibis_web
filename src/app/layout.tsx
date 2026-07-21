import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// 한글 렌더링용 — Manrope/Plus Jakarta Sans/시스템 폰트는 라틴 문자 전용이라 한글은 이 폰트로 대체됨
const pretendard = localFont({
  src: "../../node_modules/pretendard/dist/web/variable/woff2/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ZIBIS — Premium Smart Space Architect & Planner",
    template: "%s | ZIBIS",
  },
  description: "지비스(ZIBIS)는 사용자 맞춤형 프리미엄 스마트 공간 및 건축 디자인 스튜디오입니다. 미니멀한 아키텍처와 최첨단 라이팅 플래닝으로 차별화된 가치를 창출합니다.",
  keywords: ["지비스", "ZIBIS", "공간 기획", "건축 디자인", "라이팅 플래너", "조명 설계", "인테리어 스튜디오", "무료 견적 상담"],
  metadataBase: new URL("https://zibis.co.kr"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ZIBIS — Premium Smart Space Architect & Planner",
    description: "지비스(ZIBIS)는 사용자 맞춤형 프리미엄 스마트 공간 및 건축 디자인 스튜디오입니다. 미니멀한 아키텍처와 라이팅 플래닝을 만나보세요.",
    url: "https://zibis.co.kr",
    siteName: "ZIBIS",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZIBIS — Premium Smart Space Architect & Planner",
    description: "지비스(ZIBIS)는 프리미엄 스마트 공간 및 조명 설계 건축 디자인 스튜디오입니다.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ZIBIS",
  "url": "https://zibis.co.kr",
  "description": "지비스(ZIBIS)는 사용자 맞춤형 프리미엄 스마트 공간 및 건축 디자인 스튜디오입니다. 미니멀한 아키텍처와 최첨단 라이팅 플래닝으로 차별화된 가치를 창출합니다.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Seoul",
    "addressCountry": "KR"
  },
  "knowsAbout": [
    "Architecture",
    "Interior Design",
    "Lighting Planning",
    "Smart Home Design"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${manrope.variable} ${plusJakartaSans.variable} ${pretendard.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans antialiased text-[#111111] bg-[#F9F9F7]">
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
