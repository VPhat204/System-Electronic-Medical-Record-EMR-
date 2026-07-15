import React from 'react';

export default function NurseClinicalNotesTab({
  lang,
  t,
  isDark,
  patients,
  selectedNotesPatId,
  setSelectedNotesPatId,
  soapSubjective,
  setSoapSubjective,
  soapObjective,
  setSoapObjective,
  soapAssessment,
  setSoapAssessment,
  soapPlan,
  setSoapPlan,
  isSoapSaving,
  soapFinished,
  handleFinalizeSoapNote
}) {
  const pat = patients.find(p => p.id === selectedNotesPatId) || patients[0];

  return (
    <div className="space-y-lg text-left">
      {/* PATIENT SUMMARY HEADER */}
      <section className="bg-white dark:bg-slate-900 p-lg rounded-xl border border-outline-variant dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-md transition-colors">
        <div className="flex items-center gap-lg">
          <div className="w-16 h-16 bg-primary-fixed dark:bg-primary-container rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant dark:border-slate-800 flex-shrink-0">
            {pat.avatar ? (
              <img className="w-full h-full object-cover" src={pat.avatar} alt={pat.name} />
            ) : (
              <span className="material-symbols-outlined text-primary text-[32px]">person</span>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-headline-lg text-headline-lg text-on-surface dark:text-white font-bold">{pat.name}</h3>
            <div className="flex flex-wrap gap-md text-on-surface-variant dark:text-slate-400 text-body-sm">
              <span className="px-2 py-0.5 bg-surface-container-high dark:bg-slate-800 rounded-full text-xs font-semibold">ID: {pat.id}</span>
              <span>{lang === 'vi' ? 'Tuổi' : 'Age'}: {pat.age}</span>
              <span>{lang === 'vi' ? 'Giới tính' : 'Sex'}: {pat.gender === 'M' ? (lang === 'vi' ? 'Nam' : 'Male') : (lang === 'vi' ? 'Nữ' : 'Female')}</span>
              <span className="font-bold text-primary dark:text-primary-fixed-dim">{lang === 'vi' ? 'Nhóm máu' : 'Blood'}: {pat.bloodType || 'A+'}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <p className="text-label-md text-outline dark:text-slate-400 uppercase tracking-wider text-[10px] font-bold">{lang === 'vi' ? 'Chẩn đoán chính' : 'Primary Diagnosis'}</p>
          <span className="text-headline-md font-bold text-on-surface dark:text-white">{pat.diagnosis}</span>
          {pat.condition === 'High Risk' && (
            <span className="text-body-sm text-error dark:text-red-400 flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {lang === 'vi' ? 'Nguy cơ cao: Hệ tim mạch' : 'High Risk: Cardiovascular'}
            </span>
          )}
        </div>
      </section>

      {/* MAIN WORKING AREA */}
      <div className="flex flex-col lg:flex-row gap-lg">

        {/* LEFT COLUMN: NOTE TIMELINE */}
        <div className="w-full lg:w-1/3 flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <h4 className="font-headline-sm text-on-surface dark:text-white font-bold">{lang === 'vi' ? 'Lịch sử lâm sàng' : 'Clinical History'}</h4>
            <div className="text-body-sm text-on-surface-variant dark:text-slate-400">
              <select
                value={selectedNotesPatId}
                onChange={(e) => setSelectedNotesPatId(e.target.value)}
                className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 dark:text-white rounded-lg px-2 py-1 text-xs outline-none cursor-pointer"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.roomBed})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2 max-h-[600px]">
            {pat.notes && pat.notes.length > 0 ? (
              pat.notes.map((note) => (
                <div
                  key={note.id}
                  className={`bg-white dark:bg-slate-900 p-md rounded-lg border border-outline-variant dark:border-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim transition-all cursor-pointer group shadow-sm ${note.type === 'Specialist Consultation' ? 'border-l-4 border-l-tertiary dark:border-l-amber-500' : ''
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded uppercase ${note.type === 'Daily Round'
                        ? 'bg-primary-fixed text-on-primary-fixed'
                        : note.type === 'Specialist Consultation'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300'
                      }`}>
                      {note.type}
                    </span>
                    <span className="text-[10px] text-outline dark:text-slate-400">{note.date}</span>
                  </div>
                  <h5 className="font-bold text-on-surface dark:text-white group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors text-sm">{note.title}</h5>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 leading-relaxed">{note.text}</p>
                  <div className="flex items-center gap-2 mt-3 pt-2 border-t border-outline-variant dark:border-slate-800">
                    <div className={`w-5 h-5 rounded-full ${note.avatarColor || 'bg-secondary-fixed'} flex items-center justify-center text-[10px] font-bold text-white uppercase`}>
                      {note.author.split(' ').pop().charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-on-surface dark:text-slate-300">{note.author}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-on-surface-variant dark:text-slate-500 text-center py-8">{lang === 'vi' ? 'Không có ghi chú nào.' : 'No notes written yet.'}</p>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE NOTE ENTRY (SOAP) */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-xl border border-outline-variant dark:border-slate-800 flex flex-col shadow-sm">

          {/* EDITOR HEADER */}
          <div className="p-md border-b border-outline-variant dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-950 rounded-t-xl">
            <div className="flex items-center gap-md">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">edit_note</span>
              <div>
                <h4 className="font-bold text-on-surface dark:text-white text-sm">{lang === 'vi' ? 'Ghi chú SOAP mới' : 'New SOAP Note'}</h4>
                <p className="text-xs text-outline dark:text-slate-400">Editor: Nurse Nguyen, RN • <span className="text-primary dark:text-primary-fixed-dim font-bold">Drafting</span></p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => alert('Attachments')} className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
                <span className="material-symbols-outlined">attachment</span>
              </button>
              <button type="button" onClick={() => alert('Templates')} className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-surface-container dark:hover:bg-slate-800 rounded-lg transition-colors border-none bg-transparent cursor-pointer flex items-center justify-center">
                <span className="material-symbols-outlined">history_edu</span>
              </button>
            </div>
          </div>

          {/* EDITOR BODY */}
          <form onSubmit={handleFinalizeSoapNote} className="flex-1 flex flex-col justify-between p-lg space-y-md">

            <div className="space-y-md overflow-y-auto max-h-[500px] pr-2 custom-scrollbar">
              {/* SUBJECTIVE */}
              <div className="border border-outline-variant dark:border-slate-800 rounded-lg p-md transition-all focus-within:border-primary dark:focus-within:border-primary-fixed-dim focus-within:ring-1 focus-within:ring-primary">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-[12px] font-black rounded">S</span>
                  <label className="font-bold text-on-surface dark:text-white uppercase text-xs tracking-widest">Subjective</label>
                </div>
                <textarea
                  value={soapSubjective}
                  onChange={(e) => setSoapSubjective(e.target.value)}
                  className="w-full border-none p-0 focus:ring-0 text-body-md placeholder:text-outline-variant bg-transparent resize-y min-h-[60px] dark:text-white"
                  placeholder={lang === 'vi' ? 'Nhập các triệu chứng, mối quan tâm và lịch sử bệnh hiện tại...' : "Enter patient's symptoms, concerns, and history of present illness..."}
                  rows="3"
                ></textarea>
              </div>

              {/* OBJECTIVE */}
              <div className="border border-outline-variant dark:border-slate-800 rounded-lg p-md transition-all focus-within:border-primary dark:focus-within:border-primary-fixed-dim focus-within:ring-1 focus-within:ring-primary">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-[12px] font-black rounded">O</span>
                  <label className="font-bold text-on-surface dark:text-white uppercase text-xs tracking-widest">Objective</label>
                </div>
                <textarea
                  value={soapObjective}
                  onChange={(e) => setSoapObjective(e.target.value)}
                  className="w-full border-none p-0 focus:ring-0 text-body-md placeholder:text-outline-variant bg-transparent resize-y min-h-[60px] dark:text-white"
                  placeholder={lang === 'vi' ? 'Nhập kết quả khám thực thể, dấu hiệu sinh tồn và xét nghiệm...' : 'Enter physical exam findings, vital signs, and laboratory results...'}
                  rows="3"
                ></textarea>

                {/* ATTACHMENTS PREVIEW */}
                <div className="mt-4 flex gap-sm">
                  <div className="relative group w-24 h-24 rounded border border-outline-variant dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden">
                    <img className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Clinical microscopy lab evidence sample" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvFK7hkraPgYgSqL6VhoIAj61mN31ZH4uu1M5evQw37PqgEzTeZbeY38JkRqYe7SLlYiQBCGFYRqrhgF4sMW1vR4cd2YjvG063TlSwH7s2klmE5jbW2vB9nmh2Sos64TTdDzNyBscLcKeFMTPowPgDtaMxa5VDZIG6yTEUJ62UHviYNuvdwX-YuLUxVi97vEu0Go60npoh0aTLwkgMm6vN7Ni0XbmhpVdITKZkM3zbSpFaI74grD3Q" />
                    <button type="button" onClick={() => alert('Remove attachment')} className="absolute top-1 right-1 bg-on-surface/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity border-none cursor-pointer flex items-center justify-center">
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                  <button type="button" onClick={() => alert('Upload File')} className="w-24 h-24 border-2 border-dashed border-outline-variant dark:border-slate-800 rounded flex flex-col items-center justify-center text-outline dark:text-slate-400 hover:border-primary dark:hover:border-primary-fixed-dim hover:text-primary dark:hover:text-primary-fixed-dim bg-transparent transition-all cursor-pointer">
                    <span className="material-symbols-outlined">add_photo_alternate</span>
                    <span className="text-[9px] font-bold mt-1 uppercase">UPLOAD</span>
                  </button>
                </div>
              </div>

              {/* ASSESSMENT */}
              <div className="border border-outline-variant dark:border-slate-800 rounded-lg p-md transition-all focus-within:border-primary dark:focus-within:border-primary-fixed-dim focus-within:ring-1 focus-within:ring-primary">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-[12px] font-black rounded">A</span>
                  <label className="font-bold text-on-surface dark:text-white uppercase text-xs tracking-widest">Assessment</label>
                </div>
                <textarea
                  value={soapAssessment}
                  onChange={(e) => setSoapAssessment(e.target.value)}
                  className="w-full border-none p-0 focus:ring-0 text-body-md placeholder:text-outline-variant bg-transparent resize-y min-h-[60px] dark:text-white"
                  placeholder={lang === 'vi' ? 'Nhập chẩn đoán lâm sàng và chẩn đoán phân biệt...' : 'Enter clinical assessment and differential diagnoses...'}
                  rows="3"
                ></textarea>
              </div>

              {/* PLAN */}
              <div className="border border-outline-variant dark:border-slate-800 rounded-lg p-md transition-all focus-within:border-primary dark:focus-within:border-primary-fixed-dim focus-within:ring-1 focus-within:ring-primary">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 flex items-center justify-center bg-primary text-white text-[12px] font-black rounded">P</span>
                  <label className="font-bold text-on-surface dark:text-white uppercase text-xs tracking-widest">Plan</label>
                </div>
                <textarea
                  value={soapPlan}
                  onChange={(e) => setSoapPlan(e.target.value)}
                  className="w-full border-none p-0 focus:ring-0 text-body-md placeholder:text-outline-variant bg-transparent resize-y min-h-[60px] dark:text-white"
                  placeholder={lang === 'vi' ? 'Nhập kế hoạch điều trị, đơn thuốc và hướng dẫn tái khám...' : 'Enter treatment plan, medications, and follow-up instructions...'}
                  rows="3"
                ></textarea>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="pt-md border-t border-outline-variant dark:border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
              <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-400 italic text-xs">
                <span className="material-symbols-outlined text-[16px] text-outline">verified_user</span>
                <span>{lang === 'vi' ? 'Tác giả: Nguyễn, RN (Bằng số #88215)' : 'Authored by Nguyen, RN (License #88215)'}</span>
              </div>
              <div className="flex gap-md w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => alert(lang === 'vi' ? 'Đang lưu bản nháp...' : 'Saving draft...')}
                  className="flex-1 sm:flex-none px-lg py-2 border border-outline-variant dark:border-slate-700 rounded-lg font-bold text-xs text-on-surface dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 bg-transparent transition-all cursor-pointer"
                >
                  {lang === 'vi' ? 'Lưu bản nháp' : 'Save Draft'}
                </button>
                <button
                  type="submit"
                  disabled={isSoapSaving}
                  className={`flex-1 sm:flex-none px-lg py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all border-none cursor-pointer ${soapFinished
                      ? 'bg-secondary text-white cursor-default'
                      : 'bg-primary text-white hover:bg-primary-container'
                    }`}
                >
                  {isSoapSaving ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-[16px]">progress_activity</span>
                      <span>{lang === 'vi' ? 'Đang hoàn tất...' : 'Finalizing...'}</span>
                    </>
                  ) : soapFinished ? (
                    <>
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>{lang === 'vi' ? 'Đã Ký & Hoàn Tất' : 'Finalized & Signed'}</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-[16px]">draw</span>
                      <span>{lang === 'vi' ? 'Ký & Hoàn tất' : 'Finalize & Sign'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
}
