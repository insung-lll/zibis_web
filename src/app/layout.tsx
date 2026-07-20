import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
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
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
      className={`${outfit.variable} h-full antialiased`}
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
