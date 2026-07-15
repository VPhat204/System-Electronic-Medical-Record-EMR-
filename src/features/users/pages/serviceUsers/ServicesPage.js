import React, { useState } from 'react';

export default function ServicesPage({ onNavigate, onBookConsultation }) {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null);
    } else {
      setActiveFaq(index);
    }
  };

  const faqs = [
    {
      question: 'Làm thế nào để đặt lịch khám chuyên khoa?',
      answer: 'Quý khách có thể đặt lịch qua ứng dụng Patient Portal, gọi đến hotline hoặc nhấn vào nút "Đặt Lịch Hẹn" trên trang web. Chúng tôi khuyến khích đặt trước ít nhất 24 giờ.'
    },
    {
      question: 'Bệnh viện có chấp nhận bảo hiểm quốc tế không?',
      answer: 'ClinicalPrecision HMS liên kết với hơn 50 đơn vị bảo hiểm trong và ngoài nước. Vui lòng mang theo thẻ bảo hiểm và giấy tờ tùy thân khi đến khám.'
    },
    {
      question: 'Quy trình xét nghiệm tại bệnh viện mất bao lâu?',
      answer: 'Đối với các xét nghiệm cơ bản, kết quả sẽ có sau 1-2 giờ. Các xét nghiệm chuyên sâu hoặc nuôi cấy vi sinh có thể mất từ 1-3 ngày làm việc.'
    },
    {
      question: 'Bệnh viện có dịch vụ cấp cứu 24/7 không?',
      answer: 'Có, trung tâm cấp cứu của chúng tôi hoạt động 24/7 với đội ngũ bác sĩ trực chiến và xe cứu thương trang bị đầy đủ thiết bị hồi sức cấp cứu.'
    }
  ];

  return (
    <main className="pt-24 pb-xl bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="relative overflow-hidden rounded-xl bg-surface-container dark:bg-slate-800 h-[400px] flex items-center border border-outline-variant dark:border-slate-700">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-60 dark:opacity-40" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAXYR8m1HqgdLH5cLaABFhU32HPZm5CVgb17CUR4hXIr1Y_NwR65uWHkW5Ew0G2nzOs7vITeECwB7IhApezvTiFq-LGUSWmpNTkO5kksn3afS41fu1ZoCnXrZd0lZJYUpwJRwNdSOPzVj2WfRmdaoSIyLDhSOAFU7W44uYT6nmJAOeHPZFsfePCWsCB5c5bTu8xuze87Ydlgfyw8J7CZmJsjQxVYSXN1TA7nCiFXx8_UeGW79Ascmlw')" }}
              data-alt="Clean professional hospital interior lobby"
            />
          </div>
          <div className="relative z-10 px-xl max-w-2xl">
            <h1 className="font-headline-xl text-headline-xl text-primary dark:text-primary-fixed-dim mb-md">
              Dịch Vụ Y Tế Chuyên Sâu
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 mb-xl">
              Chúng tôi cam kết cung cấp các giải pháp chăm sóc sức khỏe toàn diện với công nghệ tiên tiến nhất và đội ngũ chuyên gia đầu ngành.
            </p>
            <div className="flex gap-md">
              <button 
                onClick={() => onBookConsultation('', '')}
                className="bg-primary hover:bg-primary-container text-white px-lg py-md rounded-lg font-label-md text-label-md flex items-center gap-sm transition-all active:scale-[0.98] shadow-sm"
              >
                Đặt Lịch Hẹn
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid (Bento Style) */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          
          {/* Cardiology */}
          <div className="md:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-xl rounded-xl hover:shadow-md transition-all group flex flex-col justify-between">
            <div className="flex flex-col md:flex-row gap-xl h-full">
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[48px] mb-md" style={{ fontVariationSettings: "'FILL' 1" }}>
                    cardiology
                  </span>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-sm">
                    Khoa Tim Mạch
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mb-xl">
                    Chẩn đoán và điều trị chuyên sâu các bệnh lý về tim mạch và hệ tuần hoàn với hệ thống can thiệp hiện đại.
                  </p>
                </div>
                <button 
                  onClick={() => onBookConsultation('', 'Cardiology')}
                  className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs group-hover:gap-sm transition-all text-left hover:underline"
                >
                  Tìm hiểu thêm <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
              <div className="w-full md:w-64 h-48 md:h-full overflow-hidden rounded-lg shrink-0">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt="Cardiology lab" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuChm4r7W0e7H3PHhTNy6BlhaSqafJ0RJXk0vowS22l6kKVDLmzJXQZ5-h488yw7qsr4nF_-GO_nqOzrgL7Em_8OLsPgtD3LM08s92H1E9TwRSXjxPTWcXXhfvZt-0vfm70MLvhXTHTGz020EePKdUH2B2GCdWriD4zl6GgoW2-jBOquvrnD0z4DJgne-dR5B75_gzkMS2PmzBxo6BqF5u5zL-P-2uFPlM0NRZPM6vl8GYxk0QdawfIe"
                />
              </div>
            </div>
          </div>

          {/* Pediatrics */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-xl rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-tertiary dark:text-amber-500 text-[40px] mb-md">
                child_care
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-sm">
                Khoa Nhi
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mb-md">
                Chăm sóc sức khỏe toàn diện cho trẻ em từ sơ sinh đến vị thành niên trong môi trường thân thiện.
              </p>
            </div>
            <button 
              onClick={() => onBookConsultation('', 'Pediatrics')}
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline text-left"
            >
              Chi tiết <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Neurology */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-xl rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-secondary dark:text-teal-400 text-[40px] mb-md">
                neurology
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-sm">
                Khoa Thần Kinh
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mb-md">
                Nghiên cứu và điều trị các rối loạn hệ thần kinh với công nghệ chẩn đoán hình ảnh 3.0T MRI.
              </p>
            </div>
            <button 
              onClick={() => onBookConsultation('', 'Neurology')}
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline text-left"
            >
              Đặt tư vấn <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Oncology */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-xl rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-error dark:text-red-400 text-[40px] mb-md">
                medical_services
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-sm">
                Khoa Ung Bướu
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mb-md">
                Cá nhân hóa phác đồ điều trị ung thư bằng phương pháp đa mô thức và liệu pháp miễn dịch.
              </p>
            </div>
            <button 
              onClick={() => onBookConsultation('', 'Ung bướu')}
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline text-left"
            >
              Thông tin thêm <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Orthopedics */}
          <div className="md:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-xl rounded-xl hover:shadow-md transition-all flex flex-col justify-between">
            <div>
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[40px] mb-md">
                orthopedics
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white mb-sm">
                Chấn Thương Chỉnh Hình
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-300 mb-md">
                Điều trị các bệnh lý cơ xương khớp và phục hồi chức năng sau chấn thương thể thao.
              </p>
            </div>
            <button 
              onClick={() => onBookConsultation('', 'Orthopedics')}
              className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline text-left"
            >
              Tìm bác sĩ <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Diagnostics Center */}
          <div className="md:col-span-12 bg-primary dark:bg-slate-800 text-on-primary dark:text-slate-100 p-xl rounded-xl flex flex-col md:flex-row items-center justify-between gap-xl border border-transparent dark:border-slate-700">
            <div className="max-w-2xl">
              <div className="flex items-center gap-sm mb-sm">
                <span className="material-symbols-outlined text-[32px] text-white">biotech</span>
                <h3 className="font-headline-lg text-headline-lg text-white">Trung Tâm Chẩn Đoán Hình Ảnh &amp; Xét Nghiệm</h3>
              </div>
              <p className="font-body-lg text-body-lg opacity-90 text-white/90">Kết quả chính xác, nhanh chóng với hệ thống phòng Lab đạt tiêu chuẩn quốc tế ISO 15189.</p>
            </div>
            <button 
              onClick={() => onBookConsultation('', 'Xét nghiệm')}
              className="bg-white dark:bg-slate-700 text-primary dark:text-white px-xl py-md rounded-lg font-label-md text-label-md hover:bg-slate-100 dark:hover:bg-slate-600 transition-all flex items-center gap-sm shrink-0"
            >
              Đặt lịch xét nghiệm
              <span className="material-symbols-outlined text-[20px]">microwave</span>
            </button>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-lg py-xl">
        <h2 className="font-headline-xl text-headline-xl text-center text-primary dark:text-primary-fixed-dim mb-xl">
          Câu Hỏi Thường Gặp
        </h2>
        <div className="space-y-md">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index}
                className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md cursor-pointer transition-all duration-200 shadow-sm"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center font-headline-md text-headline-md select-none text-on-surface dark:text-white">
                  <span>{faq.question}</span>
                  <span className={`material-symbols-outlined transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                    expand_more
                  </span>
                </div>
                {isOpen && (
                  <div className="mt-md pt-md border-t border-outline-variant dark:border-slate-700 font-body-md text-on-surface-variant dark:text-slate-300 leading-relaxed animate-in slide-in-from-top-2 duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
