import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../../../../shared/context/LanguageContext';
import { AuthContext } from '../../../auth/context/AuthContext';
import { ToastContext } from '../../../../shared/context/ToastContext';

export default function BlogsPage({ onNavigate }) {
  const { user } = useContext(AuthContext);
  const { t, lang } = useContext(LanguageContext);
  const { success: toastSuccess, warning: toastWarning, info: toastInfo } = useContext(ToastContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');

  const articlesData = [
    {
      id: 1,
      title: t('blogs.articles.dietary.title'),
      category: 'Nutrition',
      categoryLabel: t('blogs.nutrition'),
      date: lang === 'vi' ? '15 Tháng 10, 2024' : 'Oct 15, 2024',
      readTime: lang === 'vi' ? '5 phút đọc' : '5 min read',
      desc: t('blogs.articles.dietary.desc'),
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwxvbWgXOWRXseqKGO5GIBI1iW_wMIWkOpg9vtycyTPpbJqNUsAxut05uyslkMtGKN6pjRdRc9fHbUJNVDpn1Qc174NszxQVM3orso2ZxEhTS-5rETmH3aPWy7RyNMGLYpmVmmdN3eyKnfY065dP0pET93ZgkpBvG8LDpenN5CWKpoYemb4TSLA6t8FAaUTNrOKZTcujrs_0UkBbETR50Ql1Rk_Cqk1Yx7Wzhz2_Ny4IHN59mNgTc-',
    },
    {
      id: 2,
      title: t('blogs.articles.genetic.title'),
      category: 'Innovation',
      categoryLabel: t('blogs.innovation'),
      date: lang === 'vi' ? '12 Tháng 10, 2024' : 'Oct 12, 2024',
      readTime: lang === 'vi' ? '8 phút đọc' : '8 min read',
      desc: t('blogs.articles.genetic.desc'),
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-g4VCTBWpxusGm5S2tw_9-G3ytEsM_ihlGl-OkIk5x5uWs94DsGt2IM2lX62R2axBTWQrRf_JqTBQjfW0uiirwpOPMQVDsww9TaWKlJhzhITtRkc50Le51avkiy_d1MDGdypH_2VNfxlrEA-xHOZwzfy0FWFqdqA3VIPM5RpTalIkyCcapjuaPrz0ZrEm7pMkcDbOTirfr0PrF_TT2cmGeb3o4HkD3sAIJuVg3oU5CyQP1HSi47kO',
    },
    {
      id: 3,
      title: t('blogs.articles.flu.title'),
      category: 'Alert',
      categoryLabel: t('blogs.alert'),
      date: lang === 'vi' ? '10 Tháng 10, 2024' : 'Oct 10, 2024',
      readTime: lang === 'vi' ? '3 phút đọc' : '3 min read',
      desc: t('blogs.articles.flu.desc'),
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLOSn5T8DwKr8OmlA4xycdKUvz21vP_B-E6WAazCEkS3ZdLNQ0ikwETfei7t6n_HYqamP98VyNegqerLwYoLANwGNyPOvu10Fptkvl7_XIG2K8GqmfrI3CzN7gGiF1RITmWSjTa65lc-cvClQe8Hotu6h3dxD0Lhrx3eOwCqgvkNvx8eUyS6iCXkmzrPJhsMPw-9L4TPvpAsrvd2W0Qmu1Usq_bZv1qRe5RcNXAuF65_UiepKNxmwR',
    },
  ];

  const filteredArticles = articlesData.filter((article) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = article.title.toLowerCase().includes(query) ||
                          article.desc.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitNewsletter = (e) => {
    e.preventDefault();
    if (!user) {
      toastWarning(lang === 'vi' ? 'Vui lòng đăng nhập trước khi thực hiện thao tác này!' : 'Please log in before performing this action!');
      return;
    }
    if (email) {
      toastSuccess(lang === 'vi' ? `Đăng ký thành công bản tin sức khỏe cho email: ${email}` : `Successfully subscribed to wellness newsletter for email: ${email}`);
      setEmail('');
    }
  };

  const categories = [
    { id: 'All', label: lang === 'vi' ? 'Tất cả' : 'All' },
    { id: 'Nutrition', label: t('blogs.nutrition') },
    { id: 'Innovation', label: t('blogs.innovation') },
    { id: 'Alert', label: t('blogs.alert') }
  ];

  return (
    <main className="pt-24 pb-xl bg-background dark:bg-slate-900 text-on-surface dark:text-slate-100 transition-colors duration-200 min-h-screen">
      
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
            <span className="inline-block bg-primary dark:bg-primary-fixed text-white dark:text-slate-950 px-sm py-xs rounded text-label-md font-label-md mb-md select-none">
              {t('blogs.wellness')}
            </span>
            <h1 className="font-headline-xl text-headline-xl text-white mb-md leading-tight">
              {t('blogs.featured.title')}
            </h1>
            <p className="text-white/90 font-body-lg text-body-lg mb-xl min-h-[48px]">
              {t('blogs.featured.desc')}
            </p>
            <button 
              onClick={() => {
                if (!user) {
                  toastWarning(lang === 'vi' ? 'Vui lòng đăng nhập trước khi thực hiện thao tác này!' : 'Please log in before performing this action!');
                  return;
                }
                toastInfo(t('blogs.featured.title'));
              }}
              className="inline-flex items-center gap-xs bg-white text-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary-fixed-dim transition-colors cursor-pointer"
            >
              {t('blogs.readMore')}
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
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-md py-sm rounded-full font-label-md text-label-md transition-all cursor-pointer whitespace-nowrap ${
                    isActive 
                      ? 'bg-primary text-white shadow-sm' 
                      : 'bg-surface-container dark:bg-slate-800 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high'
                  }`}
                >
                  {cat.label}
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
              placeholder={lang === 'vi' ? 'Tìm kiếm bài viết...' : 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-surface-container-lowest dark:bg-slate-900 text-body-md text-on-surface dark:text-white transition-all placeholder-slate-400 dark:placeholder-slate-500"
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
                <div className="h-48 relative overflow-hidden shrink-0 select-none">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    alt={article.title} 
                    src={article.image}
                  />
                  <span className="absolute top-sm left-sm bg-secondary dark:bg-teal-700 text-white px-sm py-xs rounded text-body-sm font-semibold shadow-sm">
                    {article.categoryLabel}
                  </span>
                </div>
                <div className="p-md flex flex-col flex-grow justify-between min-h-[220px]">
                  <div>
                    <span className="text-outline dark:text-slate-400 font-body-sm text-body-sm mb-xs block">
                      {article.date} • {article.readTime}
                    </span>
                    <h3 className="font-headline-md text-headline-md mb-sm text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors line-clamp-2" title={article.title}>
                      {article.title}
                    </h3>
                    <p className="text-on-surface-variant dark:text-slate-300 font-body-md text-body-md mb-md leading-relaxed line-clamp-3">
                      {article.desc}
                    </p>
                  </div>
                  <button 
                    onClick={() => {
                      if (!user) {
                        toastWarning(lang === 'vi' ? 'Vui lòng đăng nhập trước khi thực hiện thao tác này!' : 'Please log in before performing this action!');
                        return;
                      }
                      toastInfo(`${article.title}`);
                    }}
                    className="text-primary dark:text-sky-400 font-label-md text-label-md flex items-center gap-xs hover:underline text-left cursor-pointer w-fit"
                  >
                    {t('blogs.readMore')} <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-xl bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 max-w-xl mx-auto rounded-xl p-md">
            <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md block">
              find_in_page
            </span>
            <h4 className="font-headline-md text-headline-md text-on-surface dark:text-white">
              {lang === 'vi' ? 'Không tìm thấy bài viết' : 'No Articles Found'}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-sm">
              {lang === 'vi' ? 'Không có bài viết nào khớp với từ khóa tìm kiếm của bạn.' : 'No articles matched your search query.'}
            </p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-md text-primary dark:text-sky-400 font-label-md text-label-md hover:underline cursor-pointer"
            >
              {lang === 'vi' ? 'Xem tất cả bài viết' : 'View all articles'}
            </button>
          </div>
        )}
      </section>

      {/* Newsletter Subscription Section */}
      <section className="max-w-7xl mx-auto px-lg">
        <div className="bg-primary-container/10 border border-primary-container/20 dark:border-slate-700 dark:bg-slate-800 rounded-xl p-xl flex flex-col items-center text-center shadow-sm">
          <div className="max-w-2xl">
            <span className="material-symbols-outlined text-primary dark:text-sky-400 text-[48px] mb-md block">
              mail
            </span>
            <h2 className="font-headline-lg text-headline-lg mb-md text-primary dark:text-white leading-tight">
              {t('footer.newsletter')}
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 mb-xl min-h-[56px]">
              {t('footer.newsletterSub')}
            </p>
            <form onSubmit={handleSubmitNewsletter} className="flex flex-col sm:flex-row gap-sm w-full">
              <input 
                type="email"
                placeholder={t('footer.emailPlaceholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-grow px-md py-sm rounded-lg border border-outline-variant dark:border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none bg-white dark:bg-slate-900 text-body-md text-on-surface dark:text-white font-body-md"
              />
              <button 
                type="submit"
                className="bg-primary hover:bg-primary-container text-white px-xl py-sm rounded-lg font-label-md text-label-md shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
              >
                {t('footer.subscribeBtn')}
              </button>
            </form>
            <p className="mt-md font-body-sm text-body-sm text-outline dark:text-slate-500">
              {lang === 'vi' ? 'Chúng tôi tôn trọng quyền riêng tư của bạn. Bạn có thể hủy đăng ký bất cứ lúc nào.' : 'We value your privacy. You can unsubscribe at any time.'}
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
