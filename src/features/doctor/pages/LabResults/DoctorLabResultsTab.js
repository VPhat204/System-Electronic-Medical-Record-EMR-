import React from 'react';

export default function DoctorLabResultsTab({
  lang,
  t,
  labFilter,
  setLabFilter,
  filteredLabTests,
  labTests,
}) {
  return (
    <>
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Theo dõi Xét nghiệm' : 'Laboratory Command'}</h2>
          <p className="text-body-md text-on-surface-variant dark:text-slate-400">Real-time diagnostics and specimen monitoring for Facility A-102</p>
        </div>
        <div className="flex gap-sm w-fit">
          <button onClick={() => alert('Lọc kết quả xét nghiệm')} className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-sm rounded flex items-center gap-xs text-on-surface dark:text-slate-200 font-label-md hover:bg-surface-container-high dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            Filter View
          </button>
          <button onClick={() => alert('Xuất báo cáo tổng quan lab')} className="bg-primary hover:bg-primary-container text-white px-md py-sm rounded flex items-center gap-xs font-label-md shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
            <span className="material-symbols-outlined text-[20px]">file_download</span>
            Export Summary
          </button>
        </div>
      </div>

      {/* Bento Grid Metrics */}
      <div className="grid grid-cols-12 gap-gutter text-left">

        {/* Critical Alerts Widget */}
        <div className="col-span-12 lg:col-span-4 bg-error-container/20 border border-error/20 p-md rounded-lg flex flex-col justify-between min-h-[140px] relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-bold text-error uppercase tracking-widest">Critical Results</span>
            <span className="bg-error text-white text-[11px] font-bold px-2 py-0.5 rounded">04 Urgent</span>
          </div>
          <div className="flex items-center gap-md z-10">
            <span className="material-symbols-outlined text-error text-[44px]">priority_high</span>
            <div>
              <div className="text-headline-md font-bold text-on-error-container dark:text-red-300">Urgent Review</div>
              <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Avg turnaround: 18m (Target: &lt; 15m)</p>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-5 dark:opacity-10 text-error">
            <span className="material-symbols-outlined text-[100px]">ecg</span>
          </div>
        </div>

        {/* Pending Specimen Queue Widget */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-lg flex flex-col justify-between min-h-[140px]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase">Specimen Queue</span>
            <span className="text-primary dark:text-primary-fixed-dim font-bold text-body-md">28 Pending</span>
          </div>
          <div className="w-full bg-surface-container dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-primary dark:bg-primary-fixed-dim h-full w-[66%]"></div>
          </div>
          <div className="grid grid-cols-3 gap-xs text-center border-t border-outline-variant/30 dark:border-slate-700 pt-2">
            <div>
              <div className="text-headline-md font-bold text-on-surface dark:text-white">12</div>
              <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Hematology</div>
            </div>
            <div className="border-x border-outline-variant dark:border-slate-700">
              <div className="text-headline-md font-bold text-on-surface dark:text-white">09</div>
              <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Biopsy</div>
            </div>
            <div>
              <div className="text-headline-md font-bold text-on-surface dark:text-white">07</div>
              <div className="text-[9px] text-outline dark:text-slate-400 font-bold uppercase">Cytology</div>
            </div>
          </div>
        </div>

        {/* Process Efficiency Widget */}
        <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-lg flex items-center gap-md min-h-[140px]">
          <div className="w-16 h-16 rounded-full border-[6px] border-secondary dark:border-teal-500 border-t-outline-variant dark:border-t-slate-700 flex items-center justify-center">
            <span className="text-body-md font-bold text-secondary dark:text-teal-400">94%</span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-outline dark:text-slate-400 uppercase block">Process Efficiency</span>
            <div className="text-headline-md font-bold text-on-surface dark:text-white">Optimum Flow</div>
            <p className="text-body-sm text-on-surface-variant dark:text-slate-400">+2.4% from last shift</p>
          </div>
        </div>

      </div>

      {/* Split view diagnostic queue + Specimen tracking */}
      <div className="grid grid-cols-12 gap-gutter text-left">

        {/* Left diagnostic list */}
        <div className="col-span-12 xl:col-span-8 space-y-gutter">

          {/* Table Queue */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden shadow-sm flex flex-col">
            <div className="px-md py-sm border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex items-center justify-between flex-wrap gap-sm">
              <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase flex items-center gap-sm">
                <span className="material-symbols-outlined text-[18px]">list_alt</span>
                Diagnostic Review Queue
              </h3>
              <div className="flex bg-surface-container dark:bg-slate-700 rounded p-0.5 border border-outline-variant dark:border-slate-600">
                {['All', 'Pending', 'Completed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setLabFilter(tab)}
                    className={`px-md py-1 rounded text-body-sm font-bold transition-all ${labFilter === tab
                      ? 'bg-white dark:bg-slate-600 shadow-xs text-primary dark:text-white'
                      : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                      }`}
                  >
                    {tab === 'All' ? 'All Tests' : tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b border-outline-variant dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 text-on-surface-variant dark:text-slate-300">
                    <th className="px-md py-sm text-label-md font-bold uppercase">Patient ID</th>
                    <th className="px-md py-sm text-label-md font-bold uppercase">Test Type</th>
                    <th className="px-md py-sm text-label-md font-bold uppercase">Requesting Doctor</th>
                    <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                    <th className="px-md py-sm text-label-md font-bold uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-body-md text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700/50">
                  {filteredLabTests.map((test, index) => {
                    const isCrit = test.status === 'CRITICAL' || test.status === 'ABNORMAL';
                    const isComp = test.status === 'COMPLETED';
                    return (
                      <tr
                        key={test.id}
                        className={`hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors ${index % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''
                          }`}
                      >
                        <td className="px-md py-sm font-data-mono text-primary dark:text-primary-fixed-dim">{test.id}</td>
                        <td className="px-md py-sm">
                          <div className="flex flex-col">
                            <span className="font-bold">{test.type}</span>
                            <span className="text-body-sm text-on-surface-variant dark:text-slate-400">Specimen: {test.specimen}</span>
                          </div>
                        </td>
                        <td className="px-md py-sm text-on-surface-variant dark:text-slate-300">{test.doctor}</td>
                        <td className="px-md py-sm">
                          {isCrit ? (
                            <span className="bg-error-container text-on-error-container text-[10px] font-bold px-sm py-0.5 rounded border border-error/20 flex items-center gap-xs w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-error animate-pulse"></span>
                              {test.status}
                            </span>
                          ) : isComp ? (
                            <span className="bg-secondary-container/50 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-sm py-0.5 rounded border border-secondary/20 flex items-center gap-xs w-fit">
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-teal-500"></span>
                              COMPLETED
                            </span>
                          ) : (
                            <span className="bg-surface-container-highest dark:bg-slate-700 text-on-surface-variant dark:text-slate-300 text-[10px] font-bold px-sm py-0.5 rounded flex items-center gap-xs w-fit border border-outline-variant/30">
                              <span className="w-1.5 h-1.5 rounded-full bg-outline dark:bg-slate-400"></span>
                              {test.status}
                            </span>
                          )}
                        </td>
                        <td className="px-md py-sm text-right">
                          {isComp || isCrit ? (
                            <button
                              onClick={() => alert(`Đang tải kết quả chẩn đoán hình ảnh và phân tích cho: ${test.id}`)}
                              className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-[12px] flex items-center gap-xs ml-auto"
                            >
                              {test.type.includes('MRI') ? 'Review DICOM' : 'View Result'}
                              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                            </button>
                          ) : (
                            <span className="text-body-sm text-outline dark:text-slate-400 italic">Processing...</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="px-md py-sm border-t border-outline-variant dark:border-slate-700 flex justify-between items-center text-body-sm text-on-surface-variant dark:text-slate-400">
              <span>Showing {filteredLabTests.length} of {labTests.length} results</span>
              <div className="flex gap-xs">
                <button disabled className="p-1 border border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700 rounded disabled:opacity-30">
                  <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                </button>
                <button disabled className="p-1 border border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700 rounded disabled:opacity-30">
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>

          {/* Trends Visualizer */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md shadow-sm">
            <div className="flex items-center justify-between mb-lg flex-wrap gap-sm">
              <div>
                <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Glucose &amp; A1c Trends</h3>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">Aggregate diagnostic values for the current patient cohort</p>
              </div>
              <select className="bg-surface-container dark:bg-slate-700 border border-outline-variant dark:border-slate-600 rounded px-md py-sm text-body-sm text-on-surface-variant dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary">
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            {/* Chart Container */}
            <div className="h-64 flex items-end justify-between gap-2 relative border-b border-outline-variant dark:border-slate-700 pb-1">

              {/* Grid background lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">MAX 180 mg/dL</div>
                <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">AVG 120 mg/dL</div>
                <div className="border-b border-outline-variant/20 dark:border-slate-700/30 h-0 w-full text-[9px] text-outline font-bold text-left">MIN 70 mg/dL</div>
              </div>

              {/* Mock Chart Columns */}
              {[40, 55, 48, 65, 72, 85, 95, 60, 45, 50].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 bg-primary/10 dark:bg-primary-fixed-dim/10 rounded-t hover:bg-primary/30 dark:hover:bg-primary-fixed-dim/30 transition-all cursor-pointer relative group"
                >
                  <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface dark:bg-slate-900 text-white dark:text-slate-100 text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap z-20">
                    Week {i + 1}: {Math.floor(70 + h * 1.15)} mg/dL
                  </div>
                </div>
              ))}

            </div>

            <div className="flex justify-between mt-sm text-body-sm font-bold text-outline dark:text-slate-400">
              <span>MAR 01</span>
              <span>MAR 15</span>
              <span>MAR 31</span>
            </div>
          </div>

        </div>

        {/* Right Side: Specimen Tracking & Logistics */}
        <div className="col-span-12 xl:col-span-4 space-y-gutter">

          {/* Logistics tracker */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md overflow-hidden relative shadow-sm">
            <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase mb-md">Specimen Logistics</h3>
            <div className="space-y-md">

              <div className="flex gap-md">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-secondary dark:bg-teal-500 text-on-secondary dark:text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div className="w-[2px] h-full bg-secondary dark:bg-teal-500 min-h-[30px]"></div>
                </div>
                <div className="pb-md">
                  <div className="text-body-md font-bold text-on-surface dark:text-white">Arrived at Central Lab</div>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">#SPEC-9921 (Blood) | 08:42 AM</p>
                </div>
              </div>

              <div className="flex gap-md">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">science</span>
                  </div>
                  <div className="w-[2px] h-full bg-outline-variant dark:bg-slate-700 min-h-[30px]"></div>
                </div>
                <div className="pb-md">
                  <div className="text-body-md font-bold text-on-surface dark:text-white">Under Analysis</div>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-400">#SPEC-9877 (Histology) | In Centrifuge</p>
                </div>
              </div>

              <div className="flex gap-md">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-surface-container-high dark:bg-slate-700 border border-outline-variant dark:border-slate-700 text-outline dark:text-slate-400 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  </div>
                </div>
                <div>
                  <div className="text-body-md font-bold text-outline dark:text-slate-400">Awaiting Courier</div>
                  <p className="text-body-sm text-outline dark:text-slate-400">#SPEC-0012 (Scheduled for 11:30 AM)</p>
                </div>
              </div>

            </div>
          </div>

          {/* Audit activity feed */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg p-md shadow-sm">
            <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase mb-md">Clinical Activity</h3>
            <div className="space-y-sm">

              <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                <div className="flex justify-between items-start mb-xs">
                  <span className="text-body-sm font-bold text-primary dark:text-primary-fixed-dim">Dr. Chen Reviewed MRI</span>
                  <span className="text-[10px] text-outline dark:text-slate-400">2m ago</span>
                </div>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-300">Final report uploaded for PAT-90122. No significant lesions found.</p>
              </div>

              <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                <div className="flex justify-between items-start mb-xs">
                  <span className="text-body-sm font-bold text-error">New Critical Result</span>
                  <span className="text-[10px] text-outline dark:text-slate-400">15m ago</span>
                </div>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-300">PAT-11023 Potassium: 6.8 mmol/L. Alert sent to Dr. Stone.</p>
              </div>

              <div className="p-sm bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg">
                <div className="flex justify-between items-start mb-xs">
                  <span className="text-body-sm font-bold text-on-surface dark:text-white">Equipment Status</span>
                  <span className="text-[10px] text-outline dark:text-slate-400">1h ago</span>
                </div>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-300">Analyzer-B calibration complete. Ready for routine testing.</p>
              </div>

            </div>
            <button onClick={() => alert('Đang tải nhật ký kiểm tra đầy đủ...')} className="w-full mt-md text-primary dark:text-primary-fixed-dim font-label-md text-label-md hover:underline text-center">
              View Full Audit Log
            </button>
          </div>

          {/* Microscopic slide visual insight */}
          <div className="relative h-48 rounded-lg overflow-hidden group border border-outline-variant dark:border-slate-800">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 filter brightness-[0.5]"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA-yQF9Wreu6t09iXNJdduAb95JiKErceOEArT2tHnOJ6aqHH7dTUjWuPKGUiomSnjKsnvH7uExwL30jupoVUJX5NtTpR80LxmsDbMRJdBvoU5x_Fu87qkIsklGgsyoiUaxGDAMDY1sqVb5xcZdx2ou2DqmcSrh4C76HTxD3ZxqnF53r_sXr_5ezzhStjiaw58x8ytLoZYFo9TWrpTlolUcccwWu9NP0pcmIHe-s0WP7GAUbAE2WUyY')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent p-4 flex flex-col justify-end text-white z-10">
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-xs block">Clinical Insight</span>
              <h4 className="text-white text-body-md font-bold">Hematology Accuracy Update</h4>
              <p className="text-white/80 text-body-sm">
                New calibration protocols are active for all blood panels.
              </p>
            </div>
          </div>

        </div>

      </div>
    </>
  );
}
