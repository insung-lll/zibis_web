'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 8;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    workedWithArchitect: '',
    projectTypes: [] as string[],
    location: '',
    timeline: '',
    budget: '',
    builderEngaged: '',
    builderDetails: '',
    designBrief: '',
    referral: '',
    referralOther: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleCheckboxChange = (type: string) => {
    setFormData((prev) => {
      const current = prev.projectTypes;
      const next = current.includes(type)
        ? current.filter((item) => item !== type)
        : [...current, type];
      return { ...prev, projectTypes: next };
    });
    if (errors.projectTypes) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.projectTypes;
        return next;
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateStep = () => {
    const stepErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name.trim()) stepErrors.name = '이름을 입력해주세요.';
      if (!formData.email.trim()) {
        stepErrors.email = '이메일 주소를 입력해주세요.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = '유효한 이메일 형식이 아닙니다.';
      }
    } else if (step === 2) {
      if (!formData.workedWithArchitect) {
        stepErrors.workedWithArchitect = '옵션을 선택해주세요.';
      }
    } else if (step === 3) {
      if (formData.projectTypes.length === 0) {
        stepErrors.projectTypes = '최소 한 개 이상의 프로젝트 타입을 선택해주세요.';
      }
    } else if (step === 4) {
      if (!formData.location.trim()) {
        stepErrors.location = '건축 예정 지역을 입력해주세요.';
      }
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      // Mock API call
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
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
      setStep(1);
      setFormData({
        name: '',
        email: '',
        phone: '',
        workedWithArchitect: '',
        projectTypes: [] as string[],
        location: '',
        timeline: '',
        budget: '',
        builderEngaged: '',
        builderDetails: '',
        designBrief: '',
        referral: '',
        referralOther: '',
      });
      setIsSubmitted(false);
      setErrors({});
    }, 500);
  };

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
                (무료 견적 상담 신청)
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
                <h3 className="text-lg font-light tracking-wide text-[#F9F9F7]/90 mb-3">
                  프로젝트 견적 문의하기
                </h3>
                <p className="text-xs font-light leading-relaxed text-[#F9F9F7]/60">
                  지비스(ZIBIS) 스튜디오에 관심 가져주셔서 감사합니다. 아래의 상세 질문에 답변해주시면, 
                  내용을 면밀히 검토하여 5영업일 이내에 연락드리겠습니다.
                </p>
              </div>
              <div className="hidden md:block col-span-1 bg-[#222222] min-h-[140px] relative overflow-hidden flex items-center justify-center">
                <span className="text-[10px] tracking-widest text-[#F9F9F7]/30 uppercase font-mono">
                  [ ZIBIS Visual Block ]
                </span>
              </div>
            </div>

            {/* 폼 메인 */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-8">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="flex h-full flex-col justify-between">
                  <div className="space-y-8">
                    {/* 진행 상황 바 */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-semibold tracking-widest uppercase text-[#F9F9F7]/50">
                        <span>진행도</span>
                        <span>{step} / {totalSteps}</span>
                      </div>
                      <div className="h-[2px] w-full bg-[#F9F9F7]/10">
                        <motion.div 
                          className="h-full bg-[#F9F9F7]" 
                          animate={{ width: `${(step / totalSteps) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* 단계별 입력 양식 */}
                    <div className="min-h-[280px]">
                      {/* Step 1: Personal Details */}
                      {step === 1 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(01/08) 개인 인적사항</h4>
                          
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">성함 *</label>
                            <input 
                              type="text" 
                              name="name" 
                              value={formData.name} 
                              onChange={handleInputChange}
                              placeholder="홍길동"
                              className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                              required
                            />
                            {errors.name && <span className="text-[11px] text-red-400">{errors.name}</span>}
                          </div>

                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">이메일 주소 *</label>
                            <input 
                              type="email" 
                              name="email" 
                              value={formData.email} 
                              onChange={handleInputChange}
                              placeholder="example@zibis.co.kr"
                              className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                              required
                            />
                            {errors.email && <span className="text-[11px] text-red-400">{errors.email}</span>}
                          </div>

                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">전화번호</label>
                            <input 
                              type="tel" 
                              name="phone" 
                              value={formData.phone} 
                              onChange={handleInputChange}
                              placeholder="010-0000-0000"
                              className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 2: Architect Experience */}
                      {step === 2 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(02/08) 이전 경험</h4>
                          <div className="space-y-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">이전에 건축가와 일해보신 적이 있습니까? *</label>
                            <div className="grid grid-cols-2 gap-4">
                              {['예 (Yes)', '아니오 (No)'].map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => handleRadioChange('workedWithArchitect', option)}
                                  className={`border p-4 text-xs tracking-wider transition ${
                                    formData.workedWithArchitect === option
                                      ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                      : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {errors.workedWithArchitect && (
                              <span className="text-[11px] text-red-400">{errors.workedWithArchitect}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Step 3: Project Types */}
                      {step === 3 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(03/08) 프로젝트 타입</h4>
                          <div className="space-y-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">
                              어떤 형태의 공간 설계/상담을 원하십니까? (중복 선택 가능) *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                '신축 단독주택 (New Home)',
                                '리노베이션 및 증축 (Renovation & Extension)',
                                '상업 공간 (Commercial Project)',
                                '인테리어 스타일링 (Interior Design Only)',
                                '기타 / 미정 (Other / Unsure)'
                              ].map((type) => {
                                const selected = formData.projectTypes.includes(type);
                                return (
                                  <button
                                    type="button"
                                    key={type}
                                    onClick={() => handleCheckboxChange(type)}
                                    className={`border p-4 text-left text-xs tracking-wider transition flex items-center justify-between ${
                                      selected
                                        ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                        : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                    }`}
                                  >
                                    <span>{type}</span>
                                    {selected && <Check className="h-3 w-3" />}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.projectTypes && (
                              <span className="text-[11px] text-red-400">{errors.projectTypes}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Step 4: Location & Timeline */}
                      {step === 4 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(04/08) 지역 및 타임라인</h4>
                          
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">건축/설계 예정 지역 *</label>
                            <input 
                              type="text" 
                              name="location" 
                              value={formData.location} 
                              onChange={handleInputChange}
                              placeholder="예: 서울시 강남구 신사동"
                              className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                            />
                            {errors.location && <span className="text-[11px] text-red-400">{errors.location}</span>}
                          </div>

                          <div className="flex flex-col space-y-2 pt-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">희망 프로젝트 일정</label>
                            <input 
                              type="text" 
                              name="timeline" 
                              value={formData.timeline} 
                              onChange={handleInputChange}
                              placeholder="예: 6개월 이내 착공, 혹은 미정"
                              className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                            />
                            <p className="text-[10px] text-[#F9F9F7]/40 leading-normal mt-1">
                              * 주의: 설계에서 건설 인허가 서류 납품까지 프로젝트 성격에 따라 최소 4~8개월의 디자인 조율 기간이 필요할 수 있습니다.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Step 5: Budget */}
                      {step === 5 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(05/08) 예산 범위</h4>
                          <div className="space-y-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">프로젝트 예산 범위 (토지 구매 비용 제외) *</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {[
                                '3억 미만',
                                '3억 ~ 5억',
                                '5억 ~ 10억',
                                '10억 ~ 20억',
                                '20억 이상'
                              ].map((budgetOption) => (
                                <button
                                  type="button"
                                  key={budgetOption}
                                  onClick={() => handleRadioChange('budget', budgetOption)}
                                  className={`border p-4 text-left text-xs tracking-wider transition ${
                                    formData.budget === budgetOption
                                      ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                      : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                  }`}
                                >
                                  {budgetOption}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Step 6: Builder Engagement */}
                      {step === 6 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(06/08) 시공사 계약 상태</h4>
                          <div className="space-y-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">이미 계약된 시공사가 있습니까? *</label>
                            <div className="grid grid-cols-1 gap-3">
                              {[
                                '예, 시공 계약을 완료했습니다.',
                                '아직 없지만 염두에 둔 곳이 있습니다.',
                                '아니오, 시공사 추천 및 매칭 지원을 원합니다.'
                              ].map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => handleRadioChange('builderEngaged', option)}
                                  className={`border p-4 text-left text-xs tracking-wider transition ${
                                    formData.builderEngaged === option
                                      ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                      : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                          {formData.builderEngaged.includes('예') && (
                            <div className="flex flex-col space-y-2 pt-2 animate-fadeIn">
                              <label className="text-xs tracking-wider text-[#F9F9F7]/80">시공사 세부 정보 (시공사명 등)</label>
                              <input 
                                type="text" 
                                name="builderDetails" 
                                value={formData.builderDetails} 
                                onChange={handleInputChange}
                                placeholder="예: OO종합건설"
                                className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                              />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 7: Design Brief */}
                      {step === 7 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(07/08) 요구사항 기술</h4>
                          <div className="flex flex-col space-y-2">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80">디자인 브리프 (요구사항 및 추가 의견) *</label>
                            <textarea 
                              name="designBrief" 
                              value={formData.designBrief} 
                              onChange={handleInputChange}
                              placeholder="원하시는 스타일, 필요로 하는 공간 크기나 방 갯수, 디자인 방향성 등을 입력해 주세요."
                              rows={6}
                              className="border border-[#F9F9F7]/20 bg-transparent p-3 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7] rounded-none resize-none"
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Step 8: Referral */}
                      {step === 8 && (
                        <div className="space-y-6">
                          <h4 className="text-sm font-semibold tracking-widest text-[#F9F9F7]/40 uppercase">(08/08) 유입 경로</h4>
                          <div className="space-y-4">
                            <label className="text-xs tracking-wider text-[#F9F9F7]/80 block">어디서 지비스 스튜디오를 소개받거나 알게 되셨습니까?</label>
                            <div className="grid grid-cols-2 gap-3">
                              {['인스타그램', '구글 검색', '지인 추천', '블로그/카페', '기타'].map((option) => (
                                <button
                                  type="button"
                                  key={option}
                                  onClick={() => handleRadioChange('referral', option)}
                                  className={`border p-4 text-left text-xs tracking-wider transition ${
                                    formData.referral === option
                                      ? 'border-[#F9F9F7] bg-[#F9F9F7] text-[#111111]'
                                      : 'border-[#F9F9F7]/20 hover:border-[#F9F9F7]/60'
                                  }`}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                            {formData.referral === '기타' && (
                              <div className="flex flex-col space-y-2 pt-2">
                                <input 
                                  type="text" 
                                  name="referralOther" 
                                  value={formData.referralOther} 
                                  onChange={handleInputChange}
                                  placeholder="기타 유입경로를 작성해주세요."
                                  className="border-b border-[#F9F9F7]/20 bg-transparent py-2 text-sm text-[#F9F9F7] outline-none transition focus:border-[#F9F9F7]"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 하단 네비게이션 버튼 */}
                  <div className="flex justify-between border-t border-[#F9F9F7]/10 pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7]/60 transition hover:text-[#F9F9F7]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        <span>이전 (Back)</span>
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < totalSteps ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase text-[#F9F9F7] hover:opacity-80"
                      >
                        <span>다음 (Next)</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase bg-[#F9F9F7] text-[#111111] px-6 py-3 transition hover:opacity-90 disabled:opacity-50"
                      >
                        {isSubmitting ? '전송 중...' : '신청서 제출 →'}
                      </button>
                    )}
                  </div>
                </form>
              ) : (
                /* 제출 성공 화면 */
                <div className="flex h-full flex-col items-center justify-center text-center space-y-6 py-16 animate-fadeIn">
                  <div className="h-16 w-16 bg-[#F9F9F7] rounded-full flex items-center justify-center text-[#111111]">
                    <Check className="h-8 w-8" />
                  </div>
                  <h4 className="text-xl font-light tracking-wider">신청이 성공적으로 접수되었습니다.</h4>
                  <p className="text-sm font-light text-[#F9F9F7]/60 max-w-md leading-relaxed">
                    작성해주신 소중한 상담 요청서가 담당 디자이너에게 안전하게 전달되었습니다. 
                    검토 후 기재해주신 이메일 또는 연락처로 5영업일 이내에 회신드리도록 하겠습니다. 감사합니다.
                  </p>
                  <button
                    onClick={handleClose}
                    className="border border-[#F9F9F7]/20 px-8 py-3 text-xs tracking-widest uppercase text-[#F9F9F7] hover:border-[#F9F9F7] transition"
                  >
                    확인 및 닫기
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
