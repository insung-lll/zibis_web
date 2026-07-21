'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CategoryKey = 'collab' | 'quote' | 'product' | 'expert';

const CATEGORIES: { key: CategoryKey; label: string; desc: string }[] = [
  { key: 'collab', label: '협업문의', desc: '브랜드/시공사/설계사와의 파트너십' },
  { key: 'quote', label: '견적문의', desc: '조명 설계 및 시공 견적' },
  { key: 'product', label: '제품문의', desc: 'ZIBIS 제품 관련 문의' },
  { key: 'expert', label: '전문가상담', desc: '전문가와 1:1 상담' },
];

const PRODUCT_OPTIONS = ['IoT 조명', '일반 조명', '마그네틱 / 라인 조명', '기타'];

const LIGHTING_PLANNER_URL = 'https://zibis-lighting-planner.pages.dev/';

const initialFormData = {
  company: '',
  name: '',
  phone: '',
  email: '',
  collabDetail: '',
  area: '',
  constructionDate: '',
  constructionSpace: '',
  productType: '',
  productMessage: '',
};

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const next: Record<string, string> = {};
    if (!formData.name.trim()) next.name = '성함을 입력해주세요.';
    if (!formData.phone.trim()) next.phone = '연락처를 입력해주세요.';
    if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) {
      next.email = '유효한 이메일 형식이 아닙니다.';
    }
    if (category === 'collab') {
      if (!formData.company.trim()) next.company = '업체명을 입력해주세요.';
      if (!formData.collabDetail.trim()) next.collabDetail = '희망하시는 협업 방식을 입력해주세요.';
    }
    if (category === 'product' && !formData.productType) {
      next.productType = '문의하실 제품을 선택해주세요.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, ...formData }),
      });
      if (res.ok) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // 리셋
    setTimeout(() => {
      setCategory(null);
      setFormData(initialFormData);
      setErrors({});
      setIsSubmitted(false);
    }, 500);
  };

  const inputClass =
    'border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]';

  const renderField = (
    label: string,
    name: keyof typeof initialFormData,
    options?: { placeholder?: string; type?: string; required?: boolean }
  ) => (
    <div className="flex flex-col space-y-2">
      <label className="text-xs tracking-wider text-[#F9F9F7]/80">
        {label}{options?.required ? ' *' : ''}
      </label>
      <input
        type={options?.type ?? 'text'}
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        placeholder={options?.placeholder}
        className={inputClass}
      />
      {errors[name] && <span className="text-[11px] text-red-400">{errors[name]}</span>}
    </div>
  );

  const activeCategory = CATEGORIES.find((c) => c.key === category);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-end bg-black/60 backdrop-blur-sm"
        >
          {/* 외부 클릭 영역 */}
          <div className="absolute inset-0" onClick={handleClose} />

          {/* 모달 컨텐츠 시트 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 170 }}
            className="relative z-10 flex h-full w-full flex-col bg-[#111111] text-[#F9F9F7] md:max-w-2xl lg:max-w-3xl"
          >
            {/* 상단 닫기바 */}
            <div className="flex items-center justify-between border-b border-[#F9F9F7]/10 p-6">
              <span className="text-xs font-semibold tracking-widest text-[#F9F9F7]/50 uppercase">
                (Contact Us)
              </span>
              <button
                onClick={handleClose}
                className="group flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#F9F9F7]/60 transition hover:text-[#F9F9F7]"
              >
                <span>Close</span>
                <X className="h-4 w-4 transition-transform group-hover:rotate-90" />
              </button>
            </div>

            {/* 레이아웃 분할: 상단 텍스트 및 로고 영역 (단색 처리) */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-[#F9F9F7]/10">
              <div className="col-span-2 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-lg font-light tracking-[-0.01em] text-[#F9F9F7]/90 mb-3">
                  문의하기
                </h3>
                <p className="text-xs font-light leading-relaxed text-[#F9F9F7]/60">
                  지비스(ZIBIS)에 관심 가져주셔서 감사합니다.
                  아래 4가지 문의 유형 중 해당하는 항목을 선택해 주시면, 내용을 검토하여 빠르게 연락드리겠습니다.
                </p>
              </div>
              <div className="hidden md:block col-span-1 bg-[#222222] min-h-[140px] relative overflow-hidden flex items-center justify-center">
                <span className="text-[10px] tracking-widest text-[#F9F9F7]/30 uppercase font-mono">
                  [ ZIBIS Visual Block ]
                </span>
              </div>
            </div>

            {/* 메인 */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
              {isSubmitted ? (
                /* 제출 성공 화면 */
                <div className="flex h-full flex-col items-center justify-center text-center space-y-6 py-16">
                  <div className="h-16 w-16 bg-[#F9F9F7] rounded-full flex items-center justify-center text-[#111111]">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-light tracking-[-0.01em]">문의가 성공적으로 접수되었습니다.</h4>
                  <p className="text-sm font-light text-[#F9F9F7]/60 max-w-md leading-relaxed">
                    작성해주신 문의 내용이 담당자에게 안전하게 전달되었습니다.
                    검토 후 기재해주신 연락처로 5영업일 이내에 회신드리겠습니다. 감사합니다.
                  </p>
                  <button
                    onClick={handleClose}
                    className="border border-[#F9F9F7]/20 px-8 py-3 text-xs tracking-widest uppercase text-[#F9F9F7] hover:border-[#F9F9F7] transition"
                  >
                    확인 및 닫기
                  </button>
                </div>
              ) : !category ? (
                /* 1단계: 문의 유형 선택 */
                <div className="space-y-6">
                  <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">문의 유형 선택</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.key}
                        type="button"
                        onClick={() => setCategory(cat.key)}
                        className="group border border-[#F9F9F7]/20 p-6 text-left transition hover:border-[#F9F9F7] hover:bg-[#F9F9F7]/5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-medium tracking-wide">{cat.label}</span>
                        </div>
                        <p className="text-xs font-light text-[#F9F9F7]/50 mt-2">{cat.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* 2단계: 유형별 폼 */
                <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between">
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">
                        {activeCategory?.label}
                      </h4>
                      <button
                        type="button"
                        onClick={() => { setCategory(null); setErrors({}); }}
                        className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7]/60 transition hover:text-[#F9F9F7]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>유형 다시 선택</span>
                      </button>
                    </div>

                    {/* 견적문의: 조명 플래너 유도 배너 */}
                    {category === 'quote' && (
                      <a
                        href={LIGHTING_PLANNER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between border border-[#036CC5] bg-[#036CC5]/10 p-5 transition hover:bg-[#036CC5]/20"
                      >
                        <div>
                          <span className="text-sm font-medium text-[#F9F9F7] block">
                            조명 플래너로 직접 견적 받아보기
                          </span>
                          <span className="text-xs font-light text-[#F9F9F7]/60 mt-1 block">
                            도면을 업로드하면 즉시 조명 배치와 견적을 확인할 수 있습니다.
                          </span>
                        </div>
                      </a>
                    )}

                    <div className="space-y-6">
                      {/* 기본 정보 */}
                      {category === 'collab' && renderField('업체명', 'company', { placeholder: '업체명을 입력해주세요', required: true })}
                      {renderField('성함', 'name', { placeholder: '홍길동', required: true })}
                      {renderField('연락처', 'phone', { placeholder: '010-0000-0000', type: 'tel', required: true })}
                      {renderField('이메일', 'email', { placeholder: 'example@zibis.co.kr', type: 'email' })}

                      {/* 협업문의 전용 */}
                      {category === 'collab' && (
                        <div className="flex flex-col space-y-2">
                          <label className="text-xs tracking-wider text-[#F9F9F7]/80">어떤 방식으로 협업하기를 원하시나요? *</label>
                          <textarea
                            name="collabDetail"
                            value={formData.collabDetail}
                            onChange={handleInputChange}
                            placeholder="협업 형태, 목적, 일정 등을 자유롭게 기재해주세요."
                            rows={5}
                            className="border border-[#F9F9F7]/20 bg-transparent p-3 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7] rounded-none resize-none"
                          />
                          {errors.collabDetail && <span className="text-[11px] text-red-400">{errors.collabDetail}</span>}
                        </div>
                      )}

                      {/* 견적문의 전용 */}
                      {category === 'quote' && (
                        <>
                          {renderField('평수', 'area', { placeholder: '예: 32평' })}
                          {renderField('시공일', 'constructionDate', { placeholder: '예: 2026년 9월 초 예정' })}
                          {renderField('시공할 공간', 'constructionSpace', { placeholder: '예: 아파트 거실/침실, 상업 공간 등' })}
                        </>
                      )}

                      {/* 제품문의 전용 */}
                      {category === 'product' && (
                        <>
                          <div className="space-y-3">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">어떤 제품이 궁금하신가요? *</label>
                            <div className="grid grid-cols-2 gap-3">
                              {PRODUCT_OPTIONS.map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, productType: option }));
                                    setErrors((prev) => { const n = { ...prev }; delete n.productType; return n; });
                                  }}
                                  className={`border p-4 text-left text-xs tracking-wider transition ${
                                    formData.productType === option
                                      ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                      : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {errors.productType && <span className="text-[11px] text-red-400">{errors.productType}</span>}
                          </div>
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">문의 내용</label>
                            <textarea
                              name="productMessage"
                              value={formData.productMessage}
                              onChange={handleInputChange}
                              placeholder="궁금하신 내용을 자유롭게 남겨주세요."
                              rows={5}
                              className="border border-[#F9F9F7]/20 bg-transparent p-3 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7] rounded-none resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* 하단 제출 버튼 */}
                  <div className="flex justify-end border-t border-[#F9F9F7]/10 pt-6 mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase bg-[#F9F9F7] text-[#111111] px-6 py-3 transition hover:opacity-90 disabled:opacity-50"
                    >
                      {isSubmitting ? '전송 중...' : '문의 제출 →'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
