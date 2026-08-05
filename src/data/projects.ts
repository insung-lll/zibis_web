export interface ProjectData {
  id: string;
  title: string;
  location: string;
  partner: string;
  date: string;
  thumbnailImage: string; // 리스트에서 기본으로 보여지는 썸네일 (상세페이지 히어로 다음 순서 이미지)
  heroImage: string;      // 리스트에서 호버 시 올라오는 이미지 (상세페이지 히어로 이미지)
  category: string;
  year: string;
  width: string;
  colorClass: string;
  aspect: "aspect-[3/4]" | "aspect-square" | "aspect-video" | "aspect-[16/10]" | "aspect-[4/5]" | "aspect-[4/3]";
  brief: string; // "휴식과 집중이 모두 가능한..."
  briefSub: string; // "시간과 상황에 따라..."
  whyZibisTitle1: string; // 왜 지비스 스마트 조명인가요?
  whyZibisDesc1: string;
  whyZibisTitle2: string; // 공간을 확장하는 빛의 시나리오
  whyZibisDesc2: string;
  products: {
    name: string;
    image: string;
    aspect?: string;
  }[];
  gallery: {
    image: string;
    colSpan: string; // "col-span-1 md:col-span-12" or "col-span-1 md:col-span-6"
    aspect: string; // "aspect-[16/9]" or "aspect-[3/4]"
  }[];
}

export const projects: ProjectData[] = [
  {
    id: "1", // Use string ID for routing
    title: "신촌 아이파크",
    location: "SEOUL, KOREA",
    partner: "@HOMELUDENCE",
    date: "2026.01",
    thumbnailImage: "/img/projects/homeludence_2.jpg", // 호버 전 기본 썸네일 (히어로 다음 갤러리 이미지)
    heroImage: "/img/projects/homeludence_1.jpg",      // 호버 시 올라오는 이미지 (히어로 메인 이미지)

    category: "INTERIOR",
    year: "2026",
    width: "w-[85vw] md:w-[400px]",
    colorClass: "bg-[#2A2B2D]",
    aspect: "aspect-[3/4]",
    brief: "휴식과 집중이 모두 가능한 다목적 공간.",
    briefSub: "시간과 상황에 따라 빛의 온도와 밝기가 자연스럽게 바뀌는 집을 완성했습니다",
    whyZibisTitle1: "왜 지비스 스마트 조명인가요?",
    whyZibisDesc1: "신촌 아이파크 현장은 24평의 아담한 평수를 최대한 넓고 쾌적하게 활용하는 것이 핵심이었습니다. 물리적인 공간 확장의 한계를 넘기 위해, 하나의 조명으로 다양한 색온도(2700K~6500K)와 조도(밝기)를 자유롭게 조절할 수 있는 지비스 IoT 스마트 조명 시스템을 도입했습니다.",
    whyZibisTitle2: "공간을 확장하는 빛의 시나리오",
    whyZibisDesc2: "아침에는 활기찬 주광색(6500K)의 'M15 스마트'로 집중도를 높이고, 저녁에는 따뜻한 전구색(2700K)의 간접 조명으로 아늑한 휴식 공간을 연출합니다. 복잡한 물리적 공사 없이, 앱과 전용 컨트롤러를 통한 원터치 시나리오 변경만으로 완전히 다른 분위기의 공간들을 만들어냅니다.",
    products: [
      { name: "M15 스마트", image: "", aspect: "aspect-square" },
      { name: "슬롯6구", image: "", aspect: "aspect-[16/9]" },
      { name: "다운라이트 3", image: "", aspect: "aspect-square" },
      { name: "컨트롤러", image: "", aspect: "aspect-video" }
    ],
    gallery: [
      { image: "/img/projects/homeludence_2.jpg", colSpan: "col-span-1 md:col-span-12", aspect: "aspect-[16/9]" },
      { image: "/img/projects/homeludence_1.jpg", colSpan: "col-span-1 md:col-span-6", aspect: "aspect-[3/4]" },
      { image: "", colSpan: "col-span-1 md:col-span-6", aspect: "aspect-[3/4]" }
    ]
  },
  {
    id: "2",
    title: "PROJECT 02",
    location: "BUSAN, KOREA",
    partner: "@DESIGN_STUDIO",
    date: "2025.11",
    thumbnailImage: "/img/hero_2.jpg",
    heroImage: "/img/hero_2.jpg",
    category: "COMMERCIAL",
    year: "2025",
    width: "w-[85vw] md:w-[600px]",
    colorClass: "bg-[#D6D0C4]",
    aspect: "aspect-[16/10]",
    brief: "자연 채광과 조화롭게 어우러지는 상업 공간.",
    briefSub: "고객의 발길을 머물게 하는 매력적인 빛의 레이어를 설계했습니다",
    whyZibisTitle1: "왜 지비스 스마트 조명인가요?",
    whyZibisDesc1: "날씨와 시간에 따라 유동적으로 변하는 자연광에 맞춰 실내 조도를 자동 최적화하기 위해 센서 연동이 가능한 지비스 IoT 시스템을 도입했습니다.",
    whyZibisTitle2: "브랜드 경험을 극대화하는 조명",
    whyZibisDesc2: "매장 내 제품이 돋보일 수 있도록 고연색성(CRI 95+) 다운라이트를 매치하였으며, 야간에는 파사드 조명을 스케줄링하여 브랜드 아이덴티티를 지속적으로 노출합니다.",
    products: [
      { name: "다운라이트 3", image: "", aspect: "aspect-square" },
      { name: "센서", image: "", aspect: "aspect-square" }
    ],
    gallery: [
      { image: "/img/hero_2.jpg", colSpan: "col-span-1 md:col-span-12", aspect: "aspect-[16/9]" }
    ]
  },
  {
    id: "3",
    title: "PROJECT 03",
    location: "JEJU, KOREA",
    partner: "@STAY_ARCHITECTS",
    date: "2025.08",
    thumbnailImage: "/img/hero_1.jpg",
    heroImage: "/img/hero_1.jpg",
    category: "EXHIBITION",
    year: "2025",
    width: "w-[85vw] md:w-[400px]",
    colorClass: "bg-[#A3B19B]",
    aspect: "aspect-[3/4]",
    brief: "작품의 본질에 집중하게 만드는 전시 조명.",
    briefSub: "정밀한 각도 조절과 빛의 제어를 통해 관람객의 몰입도를 높였습니다",
    whyZibisTitle1: "왜 지비스 스마트 조명인가요?",
    whyZibisDesc1: "전시물마다 다른 최적의 조명 환경을 중앙에서 통합 관리하고, 전시 구성 변경 시 유연하게 대처하기 위해 마그네틱 트랙 기반의 지비스 시스템을 채택했습니다.",
    whyZibisTitle2: "관람의 흐름을 유도하는 빛",
    whyZibisDesc2: "은은한 통로 조명과 강렬한 스포트라이트의 대비를 통해 자연스러운 동선을 유도합니다.",
    products: [
      { name: "마그네틱 트랙", image: "", aspect: "aspect-[16/9]" },
      { name: "트랙 스포트", image: "", aspect: "aspect-square" }
    ],
    gallery: [
      { image: "/img/hero_1.jpg", colSpan: "col-span-1 md:col-span-12", aspect: "aspect-[16/9]" }
    ]
  },
  {
    id: "4",
    title: "PROJECT 04",
    location: "SEOUL, KOREA",
    partner: "@UPCOMING",
    date: "2025.04",
    thumbnailImage: "/img/projects/homeludence_2.jpg", // placeholder
    heroImage: "/img/projects/homeludence_1.jpg", // placeholder
    category: "UPCOMING PROJECT",
    year: "2025",
    width: "w-[85vw] md:w-[600px]",
    colorClass: "bg-[#2F2E2C]",
    aspect: "aspect-[16/10]",
    brief: "빛의 리듬이 살아 숨쉬는 공간.",
    briefSub: "사용자의 동선과 라이프스타일에 맞춘 섬세한 조명 디자인",
    whyZibisTitle1: "왜 지비스 스마트 조명인가요?",
    whyZibisDesc1: "일상적인 공간의 한계를 넘어 감성적인 빛의 연출을 위해 다양한 환경 시나리오 설정이 가능한 지비스 시스템을 채택했습니다.",
    whyZibisTitle2: "입체적인 공간감 부여",
    whyZibisDesc2: "시간대에 따라 달라지는 자연광에 맞춰 인공 조명이 부드럽게 개입하여 일관된 시각적 안정감을 제공합니다.",
    products: [
      { name: "M15 스마트", image: "", aspect: "aspect-square" }
    ],
    gallery: [
      { image: "/img/projects/homeludence_1.jpg", colSpan: "col-span-1 md:col-span-12", aspect: "aspect-[16/9]" }
    ]
  }
];
