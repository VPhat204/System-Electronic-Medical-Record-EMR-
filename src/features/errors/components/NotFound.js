import React, { useState, useEffect } from 'react';

export default function NotFound({ onNavigateHome }) {
  const [animate, setAnimate] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Trigger smooth entrance animation after mount
    const timer = setTimeout(() => setAnimate(true), 100);
    
    // Add mouse move listener for parallax effect
    const handleMouseMove = (e) => {
      const mouseX = e.clientX / window.innerWidth - 0.5;
      const mouseY = e.clientY / window.innerHeight - 0.5;
      setCoords({ x: mouseX, y: mouseY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getEntranceStyle = (delay) => ({
    opacity: animate ? 1 : 0,
    transform: animate ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
  });

  return (
    <div className="bg-background min-h-screen flex flex-col overflow-x-hidden text-on-surface transition-colors duration-200">
      
      {/* Top Header */}
      <header className="w-full h-16 flex justify-between items-center px-6 border-b border-outline-variant dark:border-slate-800 bg-surface dark:bg-slate-900 shrink-0 transition-colors duration-200">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigateHome()}>
          <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-3xl">
            medical_services
          </span>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim">
            MedCore EMR
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <button className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors cursor-pointer">
            Help Center
          </button>
          <button className="font-label-md text-label-md text-on-surface-variant dark:text-slate-300 hover:text-primary dark:hover:text-primary-fixed-dim transition-colors cursor-pointer">
            Status Page
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-6 md:p-lg">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Message */}
            <div className="md:col-span-6 lg:col-span-5 order-2 md:order-1 text-center md:text-left space-y-6">
              
              {/* Error Badge */}
              <div 
                className="inline-flex items-center px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-label-md"
                style={getEntranceStyle(0)}
              >
                <span className="material-symbols-outlined text-sm mr-2">error</span>
                LỖI 404
              </div>

              {/* Title */}
              <h1 
                className="font-headline-xl text-headline-xl text-on-surface dark:text-white leading-tight"
                style={getEntranceStyle(100)}
              >
                Trang không tồn tại
              </h1>

              {/* Description */}
              <p 
                className="font-body-lg text-body-lg text-on-surface-variant dark:text-slate-300 leading-relaxed"
                style={getEntranceStyle(200)}
              >
                Có vẻ như đường dẫn bạn truy cập không còn tồn tại hoặc đã được di chuyển. Vui lòng kiểm tra lại URL hoặc liên hệ với quản trị viên hệ thống.
              </p>

              {/* Action Buttons */}
              <div 
                className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start"
                style={getEntranceStyle(300)}
              >
                <button 
                  onClick={() => onNavigateHome()}
                  className="inline-flex items-center justify-center px-6 py-3 bg-primary dark:bg-primary-container text-white rounded-lg font-label-md text-label-md hover:bg-primary-container dark:hover:bg-primary transition-all active:scale-95 clinical-shadow"
                >
                  <span className="material-symbols-outlined mr-2">home</span>
                  Về trang chủ
                </button>
                <button 
                  onClick={() => window.location.href = 'mailto:support@medcore.emr'}
                  className="inline-flex items-center justify-center px-6 py-3 border border-outline dark:border-slate-600 text-on-surface dark:text-slate-200 rounded-lg font-label-md text-label-md hover:bg-surface-container dark:hover:bg-slate-800 transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined mr-2">support_agent</span>
                  Liên hệ hỗ trợ
                </button>
              </div>

              {/* Quick Navigation Utility */}
              <div 
                className="pt-8 border-t border-outline-variant dark:border-slate-800 mt-12"
                style={getEntranceStyle(400)}
              >
                <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 mb-4">
                  Hoặc truy cập nhanh:
                </p>
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button 
                    onClick={() => onNavigateHome()}
                    className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-full font-body-sm text-body-sm text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
                  >
                    Danh sách bệnh nhân
                  </button>
                  <button 
                    onClick={() => onNavigateHome()}
                    className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-full font-body-sm text-body-sm text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
                  >
                    Lịch hẹn hôm nay
                  </button>
                  <button 
                    onClick={() => onNavigateHome()}
                    className="px-4 py-2 bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-full font-body-sm text-body-sm text-on-surface-variant dark:text-slate-300 hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors"
                  >
                    Báo cáo xét nghiệm
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Medical Illustration */}
            <div className="md:col-span-6 lg:col-span-7 order-1 md:order-2 flex justify-center items-center relative">
              {/* Parallax Background Blur Element */}
              <div 
                className="absolute inset-0 bg-primary/5 rounded-full blur-3xl transform scale-75 -z-10 transition-transform duration-200 ease-out"
                style={{ transform: `scale(0.75) translate3d(${coords.x * -20}px, ${coords.y * -20}px, 0)` }}
              />
              
              {/* Illustration container with parallax translation */}
              <div 
                className="relative w-full max-w-lg aspect-square flex items-center justify-center transition-transform duration-200 ease-out"
                style={{ transform: `translate3d(${coords.x * 15}px, ${coords.y * 15}px, 0)` }}
              >
                <div className="w-full h-full rounded-2xl bg-white dark:bg-slate-800 clinical-shadow overflow-hidden border border-outline-variant dark:border-slate-700 relative">
                  
                  {/* Image and Floating Icons */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-800 transition-colors duration-200">
                    <img 
                      className="w-full h-full object-contain mb-8 dark:brightness-[0.9]" 
                      alt="3D medical cabinet with open drawer and blue stethoscope" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDT1wiZ1D7L0k9jYjlXpxq5_xxc-HyhrSiYOdDRVSZ2lAydLSmT5mLgfsYS3pe1-ShW80rp0s5X1BiytPhH_QmPCzKHcfjXW4MXJKvsmR7oS4JzAbnjGBtFwwNp16OFCAqhAZzGrr4zbaX1ZebjquEO7euz0dCd1iZPo38B6_SWg52w29YkAfr8WK14qT2sQhm99vMyXcJM_GP7Mj6qIaxgU-GADBnLQFlUhmgcHrMTwpQvZq28iyt0"
                    />
                    
                    {/* Floating icons */}
                    <div className="absolute top-10 left-10 opacity-20 dark:opacity-40 animate-pulse">
                      <span className="material-symbols-outlined text-4xl text-primary dark:text-primary-fixed-dim">
                        folder_off
                      </span>
                    </div>
                    <div className="absolute bottom-12 right-12 opacity-20 dark:opacity-40 rotate-12 animate-pulse">
                      <span className="material-symbols-outlined text-5xl text-primary dark:text-primary-fixed-dim">
                        search_off
                      </span>
                    </div>
                    <div className="absolute top-20 right-20 opacity-10 dark:opacity-30">
                      <span className="material-symbols-outlined text-3xl text-secondary dark:text-secondary-fixed-dim">
                        clinical_notes
                      </span>
                    </div>
                  </div>

                  {/* Grid Overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.06]" 
                    style={{ 
                      backgroundImage: 'radial-gradient(#00478d 0.5px, transparent 0.5px)', 
                      backgroundSize: '20px 20px' 
                    }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 bg-surface-container-highest dark:bg-slate-950 border-t border-outline-variant dark:border-slate-800 shrink-0 mt-auto transition-colors duration-200">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-label-md text-label-md font-bold text-on-surface dark:text-white">
              MedCore Systems
            </span>
            <p 
              className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400"
              style={getEntranceStyle(500)}
            >
              © 2026 MedCore Systems. HIPAA Compliant Interface.
            </p>
          </div>
          <div className="flex gap-6">
            <a 
              className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-all hover:underline" 
              href="#security"
              style={getEntranceStyle(600)}
            >
              Security Standards
            </a>
            <a 
              className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-all hover:underline" 
              href="#privacy"
              style={getEntranceStyle(600)}
            >
              Privacy Policy
            </a>
            <a 
              className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-primary-fixed-dim transition-all hover:underline" 
              href="#support"
              style={getEntranceStyle(600)}
            >
              Support
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
