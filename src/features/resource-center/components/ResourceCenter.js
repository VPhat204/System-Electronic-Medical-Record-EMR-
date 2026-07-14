import React from 'react';

export default function ResourceCenter() {
  const sideArticles = [
    {
      category: 'Nutrition',
      colorClass: 'text-secondary dark:text-teal-400',
      title: 'Dietary Habits for a Healthy Heart',
      desc: 'Simple swaps that can significantly lower your risk of cardiovascular events.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYC2Jva4bzI1hVlf0RYXep3CSRss77I7XkUGRIbwUu2cH7NwUDMDELFZ3m9FQNsKJWpEGRzB5qoDzyX3p4dO-ZiyR17venzkj7XU_WXTlGsRYz85nBnP3ihuEx8Gpfa0h4ndtKZ3INn79JtLmI_hdgaqfUM_ovUba2sb0QMKXxFADm4MERenZJEHWqW3RsyOr0Vdt9jqHeN1ZO-VHiSL8_cq3MVvc2wEQiVFrg6n63qeN56kte-hAO',
    },
    {
      category: 'Innovation',
      colorClass: 'text-tertiary dark:text-amber-400',
      title: 'The Future of Genetic Mapping',
      desc: 'How personalized medicine is changing the way we treat rare diseases.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBep41VQgSpK94zKs7Hy_7y4Vj__sXD6haQtXHLxHrgLUHwo0dRzyajHYqgTBOCebGkRAchh4VsFGVM_KIdDlAJ3ZIsvwXaz9VsPC1l5-0E2HtAtOckOFiWp99qXGYeJzKhDrSEMH-ve_ZaxhGXV6sQAEGkWaqIYX7EQc2bdHbnDFIn1oynBgHNaH4Wm79lgdyS6_rgPdXrVB0gLY0NCl3j5C2GYqhjxWGwPBjUjWTslFfXSSjj2Jd9',
    },
    {
      category: 'Alert',
      colorClass: 'text-error dark:text-red-400',
      title: 'Flu Season Survival Guide 2024',
      desc: "Everything you need to know about this year's strains and vaccinations.",
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1jDaPeUU4uydQ25R-oWuf6ujI5xIQKmztDCa1qgEVIG3tIwB2-O58kd0jPWCSXYWL_5_-WqOgxwVKN8mHwzdSpw7dnWbvK6aGR4qL5JWfdDiG9MUfl7Ka1ajwXBizw4eItKLUaQlIZvJCqUrNm0XqxGOM0FJT_chfwFORjbEbptQT0XhpnQpq0HEvkm431gQm_H9nRTidtQjmtXpt5zSIaRCOuGdQt_ymtdeuSGZKK1dhsCKTotvQ',
    },
  ];

  return (
    <section className="py-xl container mx-auto px-lg transition-colors duration-200" id="resource-center">
      <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white mb-xl">
        Health Resource Center
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-xl">
        
        {/* Featured Article */}
        <div className="lg:col-span-7">
          <div className="relative rounded-xl overflow-hidden group cursor-pointer h-full min-h-[400px] shadow-sm hover:shadow-md transition-shadow">
            <div 
              className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWmvHczFnAekrBPJSP-uDA0ATCkCL1wblx6L6lExEnvWoajhIQmHuWWOO1DgJM10B_XGGPdDnZ4PaOZ2jarFiBIApW5_xgmDQ6kUhybctEusW1TdU5pX6MIIe0NVUy1gVRfgAA3qb-9rnz7ipUnOwuvo2ABJjQlXZsx5r8IXnxO150x1e0z_1XAZTxXFPHQ-8s6yfpA4rdM5Bz-yGie_Cd6JRgKq_kP64hfRMPV3hBSazyAI3OTupi')" }}
              data-alt="Mindfulness meditation"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-xl">
              <span className="bg-primary-container text-white px-md py-xs rounded-full text-label-md w-fit mb-md">
                Wellness
              </span>
              <h4 className="text-white font-headline-lg text-headline-lg mb-md group-hover:text-primary-fixed-dim transition-colors">
                Modern Approaches to Mental Health and Mindfulness
              </h4>
              <p className="text-slate-300 font-body-md text-body-md mb-lg max-w-lg">
                Discover how clinical mindfulness programs are revolutionizing outpatient therapy for chronic stress and anxiety management.
              </p>
              <a className="text-white font-label-md text-label-md flex items-center gap-sm hover:underline" href="#read-more">
                Read Full Article <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>

        {/* Side Articles */}
        <div className="lg:col-span-5 flex flex-col gap-lg justify-between">
          {sideArticles.map((article, idx) => (
            <div key={idx} className="flex gap-md group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-sm rounded-lg transition-colors">
              <div 
                className="w-32 h-32 rounded-lg bg-cover bg-center shrink-0 border border-slate-100 dark:border-slate-700 shadow-sm"
                style={{ backgroundImage: `url('${article.image}')` }}
                data-alt={`Article thumbnail for ${article.title}`}
              />
              <div className="flex flex-col justify-center">
                <span className={`font-label-md text-label-md ${article.colorClass} uppercase tracking-wider`}>
                  {article.category}
                </span>
                <h5 className="font-headline-md text-headline-md text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors mt-xs leading-snug">
                  {article.title}
                </h5>
                <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-xs line-clamp-2">
                  {article.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
