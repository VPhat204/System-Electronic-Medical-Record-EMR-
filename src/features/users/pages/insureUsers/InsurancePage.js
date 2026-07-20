import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/LanguageContext';

export default function InsurancePage({ onNavigate }) {
  const { lang } = useContext(LanguageContext);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const partners = [
    { name: 'HealthCore', icon: 'verified_user' },
    { name: 'LunaInsure', icon: 'brightness_3' },
    { name: 'Global Guard', icon: 'public' },
    { name: 'BaoViet Care', icon: 'shield_moon' },
    { name: 'PVI Insurance', icon: 'safety_check' },
    { name: 'AIA Health', icon: 'security' }
  ];

  const tLocal = {
    vi: {
      title: "Đối tác Bảo hiểm & Thanh toán Trực tiếp",
      subtitle: "Chúng tôi hợp tác với các nhà cung cấp bảo hiểm hàng đầu để đảm bảo trải nghiệm chăm sóc sức khỏe của bạn diễn ra suôn sẻ và minh bạch nhất có thể.",
      partnersTitle: "Các đối tác liên kết",
      partnersSub: "+25 đối tác toàn cầu",
      processTitle: "Quy trình Bảo lãnh Viện phí",
      step1Title: "Xuất trình giấy tờ",
      step1Desc: "Vui lòng xuất trình thẻ bảo hiểm và CCCD/Hộ chiếu tại quầy tiếp nhận bảo hiểm trước khi thăm khám.",
      step2Title: "Xác nhận phạm vi bảo hiểm",
      step2Desc: "Nhân viên của chúng tôi sẽ liên hệ với công ty bảo hiểm để xác nhận mức quyền lợi được chi trả.",
      step3Title: "Ký xác nhận & Thanh toán phần chênh lệch",
      step3Desc: "Bệnh nhân chỉ cần thanh toán các khoản phí ngoài phạm vi bảo hiểm (nếu có) trước khi ra về.",
      step4Title: "Hoàn tất hồ sơ và nhận kết quả",
      step4Desc: "Nhân viên sẽ cung cấp hóa đơn, bảng kê chi phí và hướng dẫn nếu bạn cần làm thủ tục bồi thường sau này.",
      docsTitle: "Hồ sơ cần thiết",
      doc1: "Thẻ bảo hiểm còn hiệu lực (bản gốc)",
      doc2: "CCCD hoặc Hộ chiếu (bản gốc)",
      doc3: "Giấy khai sinh (đối với trẻ em dưới 15 tuổi)",
      doc4: "Giấy chuyển viện (nếu áp dụng BHYT Nhà nước)",
      note: "Lưu ý: Một số loại hình bảo hiểm đặc thù có thể yêu cầu thêm các biểu mẫu riêng từ nhà cung cấp.",
      faqTitle: "Câu hỏi thường gặp (FAQ)",
      ctaTitle: "Cần hỗ trợ về thủ tục bảo hiểm?",
      ctaDesc: "Đội ngũ chuyên viên bảo hiểm của chúng tôi luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn trong suốt quá trình thăm khám.",
      ctaCall: "Hotline: 1800 1234",
      ctaEmail: "Gửi email hỗ trợ"
    },
    en: {
      title: "Insurance Partners & Direct Billing",
      subtitle: "We partner with top insurance providers to make your healthcare experience as seamless and transparent as possible.",
      partnersTitle: "Affiliated Partners",
      partnersSub: "+25 global partners",
      processTitle: "Direct Billing Process",
      step1Title: "Present documents",
      step1Desc: "Please present your insurance card and National ID/Passport at the insurance desk before consultation.",
      step2Title: "Confirm coverage limits",
      step2Desc: "Our staff will contact your insurer to verify the exact coverage benefit for your services.",
      step3Title: "Sign confirmation & Pay difference",
      step3Desc: "Patients only need to pay the fees outside of the covered benefits (if any) before departure.",
      step4Title: "Complete file & receive bills",
      step4Desc: "Staff will provide bills, cost breakdowns, and instructions if you need claim reimbursement later.",
      docsTitle: "Required Documents",
      doc1: "Valid insurance card (original copy)",
      doc2: "National ID or Passport (original copy)",
      doc3: "Birth certificate (for children under 15 years old)",
      doc4: "Transfer document (if applying State Health Insurance)",
      note: "Note: Some specific insurance packages may require additional custom forms from the provider.",
      faqTitle: "Frequently Asked Questions (FAQ)",
      ctaTitle: "Need assistance with insurance?",
      ctaDesc: "Our dedicated insurance officers are always ready to answer your questions and assist you throughout the process.",
      ctaCall: "Hotline: 1800 1234",
      ctaEmail: "Send email support"
    }
  };

  const faqs = [
    {
      question: lang === 'vi' ? 'Bệnh viện có hỗ trợ bảo lãnh ngoại trú không?' : 'Do you support outpatient direct billing?',
      answer: lang === 'vi' ? 'Có, chúng tôi hỗ trợ bảo lãnh trực tiếp cho cả dịch vụ ngoại trú và nội trú với hầu hết các đối tác bảo hiểm tư nhân. Tuy nhiên, quyền lợi cụ thể phụ thuộc vào gói bảo hiểm mà bạn đã tham gia.' : 'Yes, we support direct billing for both outpatient and inpatient services with most private insurance partners. However, specific benefits depend on your insurance package.'
    },
    {
      question: lang === 'vi' ? 'Thời gian chờ phản hồi từ công ty bảo hiểm là bao lâu?' : 'How long does the response time from insurer take?',
      answer: lang === 'vi' ? 'Đối với dịch vụ ngoại trú, thời gian phản hồi thường từ 15-30 phút. Đối với dịch vụ nội trú (nhập viện), quá trình này có thể mất từ 2-4 giờ làm việc tùy thuộc vào quy trình thẩm định của công ty bảo hiểm.' : 'For outpatient services, response time is usually 15-30 minutes. For inpatient services (admission), the process may take 2-4 business hours depending on the insurer assessment process.'
    },
    {
      question: lang === 'vi' ? 'Nếu bảo hiểm từ chối bảo lãnh, tôi phải làm gì?' : 'What if my insurer declines direct billing?',
      answer: lang === 'vi' ? 'Trong trường hợp từ chối bảo lãnh trực tiếp, bệnh nhân sẽ thanh toán chi phí cho bệnh viện trước. Chúng tôi sẽ cung cấp đầy đủ hóa đơn, chứng từ y tế và hồ sơ bệnh án để bạn có thể tự làm thủ tục yêu cầu bồi thường với công ty bảo hiểm sau đó.' : 'If direct billing is declined, patients will pay the bills to the hospital first. We will provide full invoices, medical documents, and charts so you can submit a reimbursement claim afterwards.'
    }
  ];

  const currentT = tLocal[lang] || tLocal['vi'];

  return (
    <main className="pt-24 pb-xl bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200 min-h-screen">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="relative rounded-xl overflow-hidden h-80 bg-primary flex items-center border border-outline-variant dark:border-slate-700">
          <div className="absolute inset-0 opacity-40">
            <img 
              className="w-full h-full object-cover" 
              alt="Hospital atrium lobby" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrx8-TzGXZTAa9hV3RJ3OfYQu2Ej3Igv-ZlgM1oirCmegU51bNhkZ4rWUFBaE_BeUqvBI3o6oMpp-4e9lQA_Mplc0-XnLhlwmKJLfj9gxxULCgJJf2GJJxR9Y50lADLSJQgwrJcYGYawtWWxtYiBFaXpHo2FKTNMrAPwFVqnbjAHEi7uYh7rXt7Kdu0Cg-4s7kC3x20UFx23YiwqGbkulyaRtWlxYZiONQQQCf3X_79g_QG7Vie7IE"
            />
          </div>
          <div className="relative z-10 p-xl max-w-2xl text-left">
            <h1 className="font-headline-xl text-headline-xl text-white mb-md leading-tight">
              {currentT.title}
            </h1>
            <p className="font-body-lg text-body-lg text-white/90">
              {currentT.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="flex items-center justify-between mb-lg select-none">
          <h2 className="font-headline-lg text-headline-lg text-primary dark:text-sky-400">{currentT.partnersTitle}</h2>
          <span className="text-on-surface-variant dark:text-slate-400 font-body-sm">{currentT.partnersSub}</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
          {partners.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-lg flex flex-col items-center justify-center hover:border-primary dark:hover:border-sky-400 transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 mb-sm flex items-center justify-center bg-surface-container dark:bg-slate-700 rounded-full group-hover:bg-primary-fixed dark:group-hover:bg-slate-600 transition-colors">
                <span className="material-symbols-outlined text-primary dark:text-sky-400 text-3xl">
                  {p.icon}
                </span>
              </div>
              <span className="font-label-md text-label-md text-center text-on-surface dark:text-white truncate max-w-full">
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Process & Documents (Bento Layout) */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Direct Billing Process */}
          <div className="col-span-12 md:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl flex flex-col justify-between text-left">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-sky-400 mb-lg flex items-center gap-sm">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              {currentT.processTitle}
            </h3>
            <div className="space-y-md">
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">{currentT.step1Title}</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">{currentT.step1Desc}</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">{currentT.step2Title}</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">{currentT.step2Desc}</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">{currentT.step3Title}</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">{currentT.step3Desc}</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">{currentT.step4Title}</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">{currentT.step4Desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="col-span-12 md:col-span-5 bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl text-left">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-sky-400 mb-lg flex items-center gap-sm">
              <span className="material-symbols-outlined">description</span>
              {currentT.docsTitle}
            </h3>
            <ul className="space-y-sm">
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300 truncate">{currentT.doc1}</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300 truncate">{currentT.doc2}</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300 truncate">{currentT.doc3}</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300 truncate">{currentT.doc4}</span>
              </li>
            </ul>
            <div className="mt-lg p-md bg-primary/5 dark:bg-slate-700/30 rounded-lg border-l-4 border-primary">
              <p className="font-body-sm text-primary dark:text-sky-400 italic">
                {currentT.note}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-lg mb-xl animate-fade-in">
        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-sky-400 text-center mb-xl">
          {currentT.faqTitle}
        </h2>
        <div className="space-y-md">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="border border-outline-variant dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 overflow-hidden shadow-sm"
              >
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full px-xl py-md text-left flex justify-between items-center hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors select-none cursor-pointer gap-md"
                >
                  <span className="font-label-md text-label-md text-on-surface dark:text-white">
                    {faq.question}
                  </span>
                  <span className={`material-symbols-outlined shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary dark:text-sky-400' : 'text-on-surface-variant dark:text-slate-400'}`}>
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-xl py-md border-t border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 font-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed text-left animate-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-lg">
        <div className="bg-primary-container dark:bg-slate-800 rounded-xl p-xl text-center text-on-primary-container dark:text-slate-100 border border-transparent dark:border-slate-700">
          <h3 className="font-headline-md text-headline-md text-white dark:text-white mb-md">{currentT.ctaTitle}</h3>
          <p className="font-body-lg mb-lg max-w-2xl mx-auto text-slate-300 dark:text-slate-300">
            {currentT.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-md">
            <a 
              className="flex items-center gap-sm bg-white dark:bg-slate-700 text-primary dark:text-sky-400 px-xl py-md rounded-full font-label-md shadow-lg hover:shadow-xl transition-all cursor-pointer" 
              href="tel:18001234"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              {currentT.ctaCall}
            </a>
            <a 
              className="flex items-center gap-sm bg-primary dark:bg-slate-950 text-white px-xl py-md rounded-full font-label-md shadow-lg hover:shadow-xl transition-all cursor-pointer border border-white/10" 
              href="mailto:insurance@clinicalprecision.com"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              {currentT.ctaEmail}
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
