import React, { useState, useEffect } from 'react';

const articlesData = [
  {
    id: 1,
    title: 'Siêu thực phẩm cho một trái tim khỏe mạnh',
    category: 'Dinh Dưỡng',
    date: '15 Tháng 10, 2024',
    readTime: '5 phút đọc',
    desc: 'Tìm hiểu về danh sách các loại thực phẩm đã được chứng minh lâm sàng giúp tăng cường sức khỏe tim mạch và hạ cholesterol.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwxvbWgXOWRXseqKGO5GIBI1iW_wMIWkOpg9vtycyTPpbJqNUsAxut05uyslkMtGKN6pjRdRc9fHbUJNVDpn1Qc174NszxQVM3orso2ZxEhTS-5rETmH3aPWy7RyNMGLYpmVmmdN3eyKnfY065dP0pET93ZgkpBvG8LDpenN5CWKpoYemb4TSLA6t8FAaUTNrOKZTcujrs_0UkBbETR50Ql1Rk_Cqk1Yx7Wzhz2_Ny4IHN59mNgTc-',
  },
  {
    id: 2,
    title: 'AI trong Chẩn đoán Hình ảnh',
    category: 'Đổi Mới',
    date: '12 Tháng 10, 2024',
    readTime: '8 phút đọc',
    desc: 'Trí tuệ nhân tạo đang giúp các bác sĩ phát hiện bệnh sớm hơn 30% so với các phương pháp truyền thống như thế nào.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-g4VCTBWpxusGm5S2tw_9-G3ytEsM_ihlGl-OkIk5x5uWs94DsGt2IM2lX62R2axBTWQrRf_JqTBQjfW0uiirwpOPMQVDsww9TaWKlJhzhITtRkc50Le51avkiy_d1MDGdypH_2VNfxlrEA-xHOZwzfy0FWFqdqA3VIPM5RpTalIkyCcapjuaPrz0ZrEm7pMkcDbOTirfr0PrF_TT2cmGeb3o4HkD3sAIJuVg3oU5CyQP1HSi47kO',
  },
  {
    id: 3,
    title: 'Cập nhật mùa cúm 2024',
    category: 'Cảnh Báo',
    date: '10 Tháng 10, 2024',
    readTime: '3 phút đọc',
    desc: 'Những điều bạn cần biết về các biến thể mới nhất và lịch tiêm chủng khuyến nghị để bảo vệ gia đình bạn.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOSn5T8DwKr8OmlA4xycdKUvz21vP_B-E6WAazCEkS3ZdLNQ0ikwETfei7t6n_HYqamP98VyNegqerLwYoLANwGNyPOvu10Fptkvl7_XIG2K8GqmfrI3CzN7gGiF1RITmWSjTa65lc-cvClQe8Hotu6h3dxD0Lhrx3eOwCqgvkNvx8eUyS6iCXkmzrPJhsMPw-9L4TPvpAsrvd2W0Qmu1Usq_bZv1qRe5RcNXAuF65_UiepKNxmwR',
  },
  {
    id: 4,
    title: 'Tương lai của Y tế Từ xa',
    category: 'Sức Khỏe',
    date: '08 Tháng 10, 2024',
    readTime: '6 phút đọc',
    desc: 'Khám bệnh trực tuyến không chỉ là một giải pháp tạm thời, mà là một cuộc cách mạng trong tiếp cận y tế.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBKLDdqAvkoUPiVxEzwSz4d39zWXw1IV-Xz_XxSTsrWVSIBkMdDIGHkvyZUmrh6fQA7K4iLFYO0pSlLvDazZPiuQO-pBm78GWFDElksRasZUvp0Awdq4PSODQv-td6pKTiCdY4jOCay9IiRx-UEIFAvDJHLHQFtQ_ZmNhV7S_7r-qk4YrX65Vfjtv0qagVPRoqdc99ke2l4g_oM7MhirpJjUYbTpGUFAs1iG0uhC4zpIhzv7It0CTRa',
  },
  {
    id: 5,
    title: 'Quản lý căng thẳng công sở',
    category: 'Lối Sống',
    date: '05 Tháng 10, 2024',
    readTime: '4 phút đọc',
    desc: 'Các bài tập thở đơn giản và kỹ thuật chánh niệm giúp bạn giữ bình tĩnh trong môi trường làm việc áp lực cao.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBriP4U7O2IftFquDCNaj253fNeLsyu0X1S3V3rS5C59xYAG63ZgUx45SGwbSHR74ZGlbXkf8ObLzkBvN1psfLfa0ubI0ZXmEBjmkACwK0You58-FqdR31Q3SuSDYCusqhTOPea-UNF6wMzjmLM2EbFZ7S4JLCW4WQDkY_3J1Lu11G4dGUz-PlTTrrPFUV43fQNs3cZ2ZnWCBBfU2Qu3FXlK8N58w3PxVay3t_64E6TteutTe-6HqD3',
  },
  {
    id: 6,
    title: 'Sự thật về các loại Vitamin',
    category: 'Khoa Học',
    date: '01 Tháng 10, 2024',
    readTime: '7 phút đọc',
    desc: 'Chúng ta có thực sự cần thực phẩm chức năng? Một cái nhìn khoa học về thói quen bổ sung vi chất hàng ngày.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDb6wKWleekPWZn2p5VVzKAumgYs-qsAT0z3uL_D4Ntd32JDryJEvRCdkYOwbzLDflT3FVWUafGPFksTXbdWZDuRt1dba8SMACtnh7bIMe0Svr_5LvAOv6wugycfluNki95Fta4-x4PZXaFzaZvCQmgqHvSpkDjFk2-JRu6ds74lhCAHvIQkmgSgzni-0IEviG8qtOaFQjmGolmy4hDAVzEyjn2K1tCOXjHh2DDtDHU6kS2j1vqQbR_',
  }
];

export default function BlogsPage({ onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [filteredArticles, setFilteredArticles] = useState(articlesData);
  const [email, setEmail] = useState('');

  const handleSearch = () => {
    const filtered = articlesData.filter((article) => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            article.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Tất cả' || article.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredArticles(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedCategory]);

  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Đăng ký thành công bản tin sức khỏe cho email: ${email}`);
      setEmail('');
    }
  };

  const categories = ['Tất cả', 'Sức Khỏe', 'Dinh Dưỡng', 'Đổi Mới', 'Cảnh Báo'];

  return (
    <main className="pt-24 pb-xl bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200">
      
      {/* Hero Article Section */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="relative w-full h-[500px] rounded-xl overflow-hidden group cursor-pointer border border-outline-variant dark:border-slate-700">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCLFeRu6YNkniSIVuNUDJ4U5zF2dlm7OI7B0szH3tL-Xd3Fn-a8E07j8QCkUODlXMhyBR5Ou8CBM0c3c51Rj_DGNw0jbpDuHAhSVTzkT5m4AhxuzrIYzNPPeNXFalHegYHiXfcBd5AFLgKimpHg3YKzMxx6Cux3Eg2oV2CUR9iteNQczY7D6OLUHhJNDUK1ycmbzLiyPy-SqpZtn0vEqGoFfd7QhXSAMC71yaiakPYmysGp7pPpqXRI')" }}
            data-alt="Modern serene therapy room with windows"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-xl w-full md:w-3/4 lg:w-2/3 z-10 text-left">
            <span className="inline-block bg-primary dark:bg-primary-fixed text-white dark:text-slate-950 px-sm py-xs rounded text-label-md font-label-md mb-md">
              Sức Khỏe Tâm Thần
            </span>
            <h1 className="font-headline-xl text-headline-xl text-white mb-md leading-tight">
              Các Cách Tiếp Cận Hiện Đại Đối Với Sức Khỏe Tâm Thần
            </h1>
            <p className="text-white/90 font-body-lg text-body-lg mb-xl">
              Khám phá cách công nghệ và trị liệu cá nhân hóa đang định hình lại cách chúng ta chăm sóc tâm trí trong kỷ nguyên số.
            </p>
            <button 
              onClick={() => alert('Đọc bài viết: Các cách tiếp cận hiện đại đối với sức khỏe tâm thần')}
              className="inline-flex items-center gap-xs bg-white text-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary-fixed-dim transition-colors"
            >
              Đọc Toàn Bộ Bài Viết
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Search & Filter Area */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md">
          <div className="flex flex-wrap gap-sm">
            {categories.map((cat, idx) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-md py-sm rounded-full font-label-md text-label-md transition-all ${
                    isActive 
                      ? 'bg-primary text-white' 
                      : 'bg-surface-container dark:bg-slate-800 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline dark:text-slate-400">
              search
            </span>
            <input 
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest dark:bg-slate-900 text-body-md text-on-surface dark:text-white transition-all"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-lg mb-xl">
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white dark:bg-slate-800 rounded-xl border border-outline-variant dark:border-slate-700 overflow-hidden flex flex-col group hover:border-primary dark:hover:border-primary-fixed-dim transition-colors duration-200"
              >
                <div className="h-48 relative overflow-hidden shrink-0">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={article.title} 
                    src={article.image}
                  />
                  <span className="absolute top-sm left-sm bg-secondary dark:bg-teal-700 text-white px-sm py-xs rounded text-body-sm font-semibold">
                    {article.category}
                  </span>
                </div>
                <div className="p-md flex flex-col flex-grow justify-between">
                  <div>
                    <span className="text-outline dark:text-slate-400 font-body-sm text-body-sm mb-xs block">
                      {article.date} • {article.readTime}
                    </span>
                    <h3 className="font-headline-md text-headline-md mb-sm text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant dark:text-slate-300 font-body-md text-body-md mb-md leading-relaxed">
                      {article.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => alert(`Đọc bài viết: ${article.title}`)}
                    className="text-primary dark:text-primary-fixed-dim font-label-md text-label-md flex items-center gap-xs hover:underline text-left"
                  >
                    Đọc Full Bài Viết <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-xl bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 max-w-xl mx-auto rounded-xl">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
              find_in_page
            </span>
            <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">Không tìm thấy bài viết</h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-sm">
              Không có bài viết nào khớp với từ khóa tìm kiếm của bạn.
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('Tất cả'); }}
              className="mt-md text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-lg">
        <div className="bg-primary-container/10 border border-primary-container/20 dark:border-slate-700 dark:bg-slate-800 rounded-xl p-xl flex flex-col items-center text-center">
          <div className="max-w-2xl">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[48px] mb-md block">
              mail
            </span>
            <h2 className="font-headline-lg text-headline-lg mb-md text-primary dark:text-white">
              Đăng Ký Nhận Bản Tin Sức Khỏe
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 mb-xl">
              Nhận những cập nhật y tế mới nhất, lời khuyên dinh dưỡng và ưu tiên các bài viết chuyên sâu trực tiếp vào hộp thư của bạn.
            </p>
            <form onSubmit={handleSubmitNewsletter} className="flex flex-col sm:flex-row gap-sm w-full">
              <input 
                type="email"
                placeholder="Địa chỉ email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white dark:bg-slate-900 text-body-md text-on-surface dark:text-white font-body-md"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-container text-white px-xl py-sm rounded-lg font-label-md text-label-md shadow-md transition-all active:scale-[0.98]"
              >
                Đăng Ký Ngay
              </button>
            </form>
            <p className="mt-md font-body-sm text-body-sm text-outline dark:text-slate-400">
              Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
