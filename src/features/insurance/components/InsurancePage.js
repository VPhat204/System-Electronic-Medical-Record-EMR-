import React, { useState } from 'react';

export default function InsurancePage({ onNavigate }) {
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

  const faqs = [
    {
      question: 'Bệnh viện có hỗ trợ bảo lãnh ngoại trú không?',
      answer: 'Có, chúng tôi hỗ trợ bảo lãnh trực tiếp cho cả dịch vụ ngoại trú và nội trú với hầu hết các đối tác bảo hiểm tư nhân. Tuy nhiên, quyền lợi cụ thể phụ thuộc vào gói bảo hiểm mà bạn đã tham gia.'
    },
    {
      question: 'Thời gian chờ phản hồi từ công ty bảo hiểm là bao lâu?',
      answer: 'Đối với dịch vụ ngoại trú, thời gian phản hồi thường từ 15-30 phút. Đối với dịch vụ nội trú (nhập viện), quá trình này có thể mất từ 2-4 giờ làm việc tùy thuộc vào quy trình thẩm định của công ty bảo hiểm.'
    },
    {
      question: 'Nếu bảo hiểm từ chối bảo lãnh, tôi phải làm gì?',
      answer: 'Trong trường hợp từ chối bảo lãnh trực tiếp, bệnh nhân sẽ thanh toán chi phí cho bệnh viện trước. Chúng tôi sẽ cung cấp đầy đủ hóa đơn, chứng từ y tế và hồ sơ bệnh án để bạn có thể tự làm thủ tục yêu cầu bồi hoàn (reimbursement) với công ty bảo hiểm sau đó.'
    }
  ];

  return (
    <main className="pt-24 pb-xl bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="relative rounded-xl overflow-hidden h-80 bg-primary flex items-center border border-outline-variant dark:border-slate-700">
          <div className="absolute inset-0 opacity-40">
            <img 
              className="w-full h-full object-cover" 
              alt="Hospital atrium lobby visual" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrx8-TzGXZTAa9hV3RJ3OfYQu2Ej3Igv-ZlgM1oirCmegU51bNhkZ4rWUFBaE_BeUqvBI3o6oMpp-4e9lQA_Mplc0-XnLhlwmKJLfj9gxxULCgJJf2GJJxR9Y50lADLSJQgwrJcYGYawtWWxtYiBFaXpHo2FKTNMrAPwFVqnbjAHEi7uYh7rXt7Kdu0Cg-4s7kC3x20UFx23YiwqGbkulyaRtWlxYZiONQQQCf3X_79g_QG7Vie7IE"
            />
          </div>
          <div className="relative z-10 p-xl max-w-2xl">
            <h1 className="font-headline-xl text-headline-xl text-white mb-md">
              Đối tác Bảo hiểm &amp; Thanh toán Trực tiếp
            </h1>
            <p className="font-body-lg text-body-lg text-white/90">
              Chúng tôi hợp tác với các nhà cung cấp bảo hiểm hàng đầu để đảm bảo trải nghiệm chăm sóc sức khỏe của bạn diễn ra suôn sẻ và minh bạch nhất có thể.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="flex items-center justify-between mb-lg">
          <h2 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim">Các đối tác liên kết</h2>
          <span className="text-on-surface-variant dark:text-slate-400 font-body-sm">+25 đối tác toàn cầu</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-gutter">
          {partners.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-slate-800 p-md border border-outline-variant dark:border-slate-700 rounded-lg flex flex-col items-center justify-center hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group"
            >
              <div className="w-16 h-16 mb-sm flex items-center justify-center bg-surface-container dark:bg-slate-700 rounded-full group-hover:bg-primary-fixed dark:group-hover:bg-slate-600 transition-colors">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl">
                  {p.icon}
                </span>
              </div>
              <span className="font-label-md text-label-md text-center text-on-surface dark:text-white">
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
          <div className="col-span-12 md:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl flex flex-col justify-between">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mb-lg flex items-center gap-sm">
              <span className="material-symbols-outlined">account_balance_wallet</span>
              Quy trình Bảo lãnh Viện phí
            </h3>
            <div className="space-y-md">
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">Xuất trình giấy tờ</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">Vui lòng xuất trình thẻ bảo hiểm và CCCD/Hộ chiếu tại quầy tiếp nhận bảo hiểm trước khi thăm khám.</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">Xác nhận phạm vi bảo hiểm</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">Nhân viên của chúng tôi sẽ liên hệ với công ty bảo hiểm để xác nhận mức quyền lợi được chi trả.</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">Ký xác nhận &amp; Thanh toán phần chênh lệch</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">Bệnh nhân chỉ cần thanh toán các khoản phí ngoài phạm vi bảo hiểm (nếu có) trước khi ra về.</p>
                </div>
              </div>
              <div className="flex gap-md">
                <div className="flex-none w-8 h-8 rounded-full bg-primary dark:bg-slate-700 text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface dark:text-white">Hoàn tất hồ sơ và nhận kết quả</p>
                  <p className="font-body-md text-on-surface-variant dark:text-slate-300">Nhân viên sẽ cung cấp hóa đơn, bảng kê chi phí và hướng dẫn nếu bạn cần làm thủ tục bồi thường sau này.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Required Documents */}
          <div className="col-span-12 md:col-span-5 bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-xl">
            <h3 className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim mb-lg flex items-center gap-sm">
              <span className="material-symbols-outlined">description</span>
              Hồ sơ cần thiết
            </h3>
            <ul className="space-y-sm">
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300">Thẻ bảo hiểm còn hiệu lực (bản gốc)</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300">CCCD hoặc Hộ chiếu (bản gốc)</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300">Giấy khai sinh (đối với trẻ em dưới 15 tuổi)</span>
              </li>
              <li className="flex items-center gap-sm p-sm bg-white dark:bg-slate-900 rounded-lg border border-outline-variant/30 dark:border-slate-800">
                <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
                <span className="font-body-md text-on-surface dark:text-slate-300">Giấy chuyển viện (nếu áp dụng BHYT Nhà nước)</span>
              </li>
            </ul>
            <div className="mt-lg p-md bg-primary/5 dark:bg-slate-700/30 rounded-lg border-l-4 border-primary">
              <p className="font-body-sm text-primary dark:text-primary-fixed-dim italic">
                Lưu ý: Một số loại hình bảo hiểm đặc thù có thể yêu cầu thêm các biểu mẫu riêng từ nhà cung cấp.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-lg mb-xl animate-fade-in">
        <h2 className="font-headline-lg text-headline-lg text-primary dark:text-primary-fixed-dim text-center mb-xl">
          Câu hỏi thường gặp (FAQ)
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
                  className="w-full px-xl py-md text-left flex justify-between items-center hover:bg-surface-container-low dark:hover:bg-slate-700 transition-colors select-none"
                >
                  <span className="font-label-md text-label-md text-on-surface dark:text-white">
                    {faq.question}
                  </span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-xl py-md border-t border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 font-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed animate-in slide-in-from-top-2 duration-200">
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
          <h3 className="font-headline-md text-headline-md text-white dark:text-white mb-md">Cần hỗ trợ về thủ tục bảo hiểm?</h3>
          <p className="font-body-lg mb-lg max-w-2xl mx-auto text-slate-300 dark:text-slate-300">
            Đội ngũ chuyên viên bảo hiểm của chúng tôi luôn sẵn sàng giải đáp thắc mắc và hỗ trợ bạn trong suốt quá trình thăm khám.
          </p>
          <div className="flex flex-wrap justify-center gap-md">
            <a 
              className="flex items-center gap-sm bg-white dark:bg-slate-700 text-primary dark:text-primary px-xl py-md rounded-full font-label-md shadow-lg hover:shadow-xl transition-all" 
              href="tel:18001234"
            >
              <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
              Hotline: 1800 1234
            </a>
            <a 
              className="flex items-center gap-sm bg-primary dark:bg-slate-700 text-white px-xl py-md rounded-full font-label-md shadow-lg hover:shadow-xl transition-all" 
              href="mailto:insurance@clinicalprecision.com"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Gửi email hỗ trợ
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
