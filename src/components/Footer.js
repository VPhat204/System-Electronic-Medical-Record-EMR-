import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Success simulation
    setSubscribed(true);
    setEmail('');
    setError('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-inverse-surface dark:bg-slate-950 text-inverse-on-surface dark:text-slate-300 pt-xl pb-lg transition-colors duration-200">
      <div className="container mx-auto px-lg grid grid-cols-1 md:grid-cols-4 gap-xl mb-xl">
        
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-md mb-md">
            <span className="material-symbols-outlined text-primary-fixed dark:text-primary-fixed-dim text-headline-md">
              medical_services
            </span>
            <span className="font-headline-sm text-headline-sm font-bold text-white">
              HMS Admin
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-surface-variant dark:text-slate-400">
            Providing world-class medical services since 1995. Committed to patient safety, ethical practice, and innovative healthcare.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">Quick Links</h6>
          <ul className="font-body-sm text-body-sm flex flex-col gap-sm text-surface-variant dark:text-slate-400">
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#about">About Us</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#doctors">Our Doctors</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#services">Medical Services</a></li>
            <li><a className="hover:text-primary-fixed dark:hover:text-white transition-colors" href="#404">Patient Portal</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">Contact Info</h6>
          <ul className="font-body-sm text-body-sm flex flex-col gap-sm text-surface-variant dark:text-slate-400">
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">location_on</span> 
              123 Healthcare Way, Medical District
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">phone</span> 
              +1 (555) 000-8888
            </li>
            <li className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-[16px] text-primary-fixed">mail</span> 
              info@hms-admin.portal
            </li>
            <li className="flex items-center gap-xs text-red-400 font-semibold">
              <span className="material-symbols-outlined text-[16px]">emergency</span> 
              Emergency: 911 (24/7)
            </li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div>
          <h6 className="font-label-md text-label-md mb-md text-white">Newsletter</h6>
          <p className="font-body-sm text-body-sm text-surface-variant dark:text-slate-400 mb-md">
            Stay updated with the latest health news.
          </p>
          
          {subscribed ? (
            <div className="bg-green-950/40 border border-green-500/50 text-green-300 p-sm rounded text-body-sm flex items-center gap-xs animate-pulse">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              Thank you for subscribing!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-xs">
              <div className="flex bg-white/10 dark:bg-white/5 border border-white/20 rounded overflow-hidden focus-within:border-primary-fixed transition-all">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  placeholder="Email address" 
                  className="bg-transparent border-none text-white text-body-sm flex-1 px-md py-sm focus:ring-0 outline-none placeholder-slate-400"
                />
                <button type="submit" className="bg-primary-container hover:bg-primary px-md py-sm transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-[18px]">send</span>
                </button>
              </div>
              {error && (
                <div className="text-red-400 text-body-sm mt-[2px] flex items-center gap-xs">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </div>
              )}
            </form>
          )}
        </div>

      </div>
      
      {/* Footer Bottom copyright */}
      <div className="container mx-auto px-lg pt-lg border-t border-white/10 dark:border-slate-800 text-center font-body-sm text-body-sm text-surface-variant dark:text-slate-500">
        © 2026 HMS Institutional Portal. All Rights Reserved. Managed by EMR Admin Console.
      </div>
    </footer>
  );
}
