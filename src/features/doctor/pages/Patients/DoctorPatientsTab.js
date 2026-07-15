import React from 'react';

export default function DoctorPatientsTab({
  lang,
  t,
  filteredPatients,
  handleNewPatient,
  deptFilter,
  setDeptFilter,
  genderFilter,
  setGenderFilter,
  statusFilter,
  setStatusFilter,
  setSearchQuery,
  patients,
}) {
  return (
    <>
      {/* Header / Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md">
        <div className="text-left">
          <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Thư mục Bệnh nhân' : 'Patient Directory'}</h2>
          <p className="text-body-md font-body-md text-on-surface-variant dark:text-slate-400 mt-xs">
            {lang === 'vi' ? `Quản lý hồ sơ bệnh án toàn diện cho ${filteredPatients.length} bệnh nhân đăng ký.` : `Manage and access comprehensive medical records for ${filteredPatients.length} registered patients.`}
          </p>
        </div>
        <button
          onClick={handleNewPatient}
          className="bg-primary hover:bg-primary-container text-white px-lg py-md rounded-xl font-bold flex items-center justify-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-fit"
        >
          <span className="material-symbols-outlined">person_add</span>
          {lang === 'vi' ? 'Thêm Bệnh nhân' : 'New Patient'}
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-12 gap-gutter text-left">
        <div className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-md rounded-xl flex flex-wrap items-center gap-md">
          <div className="flex items-center gap-sm text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-[20px]">filter_list</span>
            <span className="text-label-md font-bold">Filters:</span>
          </div>

          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[160px]"
          >
            <option value="All Departments">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Oncology">Oncology</option>
          </select>

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[120px]"
          >
            <option value="Gender">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md text-on-surface-variant dark:text-slate-200 focus:ring-1 focus:ring-primary focus:border-transparent outline-none min-w-[120px]"
          >
            <option value="Status">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Critical Alert">Critical Alert</option>
          </select>

          <div className="h-8 w-[1px] bg-outline-variant dark:bg-slate-700 mx-base"></div>
          <button
            onClick={() => { setDeptFilter('All Departments'); setGenderFilter('Gender'); setStatusFilter('Status'); setSearchQuery(''); }}
            className="text-primary dark:text-primary-fixed-dim text-label-md font-bold hover:underline"
          >
            Clear all
          </button>

          <div className="ml-auto text-body-sm text-on-surface-variant dark:text-slate-400">
            Showing {filteredPatients.length} of {patients.length} patients
          </div>
        </div>
      </div>

      {/* Patients Data Table */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-surface-container dark:bg-slate-900/50 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700">
                <th className="px-lg py-md text-label-md font-bold">{lang === 'vi' ? 'Họ và tên bệnh nhân' : 'Patient Name'}</th>
                <th className="px-md py-md text-label-md font-bold">ID</th>
                <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Giới tính' : 'Gender'}</th>
                <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Tuổi' : 'Age'}</th>
                <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Chuyên khoa' : 'Department'}</th>
                <th className="px-md py-md text-label-md font-bold">{lang === 'vi' ? 'Lần cuối' : 'Last Visit'}</th>
                <th className="px-md py-md text-label-md font-bold">Status</th>
                <th className="px-lg py-md text-label-md font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-on-surface dark:text-slate-200 text-body-md divide-y divide-outline-variant dark:divide-slate-700">
              {filteredPatients.map((pat, idx) => (
                <tr
                  key={pat.id}
                  className={`${idx % 2 === 1 ? 'bg-slate-50/50 dark:bg-slate-900/30' : 'bg-white dark:bg-slate-800'} hover:bg-surface-container-low dark:hover:bg-slate-700/50 transition-colors group`}
                >
                  <td className="px-lg py-md">
                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 rounded-full border border-outline-variant dark:border-slate-700 overflow-hidden">
                        <img className="w-full h-full object-cover" alt={pat.name} src={pat.avatar} />
                      </div>
                      <div className="text-left">
                        <div className="font-bold text-on-surface dark:text-white">{pat.name}</div>
                        <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{pat.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-md py-md font-data-mono text-left">{pat.id}</td>
                  <td className="px-md py-md text-left">{pat.gender}</td>
                  <td className="px-md py-md text-left">{pat.age}</td>
                  <td className="px-md py-md text-left">{pat.department}</td>
                  <td className="px-md py-md text-left">{pat.lastVisit}</td>
                  <td className="px-md py-md text-left">
                    {pat.status === 'Active' ? (
                      <span className="px-sm py-base rounded bg-secondary-container/30 text-on-secondary-container dark:text-teal-400 text-body-sm font-bold border border-secondary-container/50 dark:border-teal-500/20">Active</span>
                    ) : pat.status === 'Critical Alert' ? (
                      <span className="px-sm py-base rounded bg-error-container text-on-error-container text-body-sm font-bold border border-error/20">Critical Alert</span>
                    ) : (
                      <span className="px-sm py-base rounded bg-surface-variant dark:bg-slate-700 text-on-surface-variant dark:text-slate-400 text-body-sm font-bold border border-outline-variant dark:border-slate-700">Inactive</span>
                    )}
                  </td>
                  <td className="px-lg py-md text-right">
                    <button onClick={() => alert(`Chi tiết hồ sơ bệnh án: ${pat.name}`)} className="p-base text-outline hover:text-primary dark:hover:text-primary-fixed-dim transition-colors">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
              {filteredPatients.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-lg py-xl text-center text-on-surface-variant dark:text-slate-400">
                    Không tìm thấy bệnh nhân nào khớp với bộ lọc.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-lg py-md border-t border-outline-variant dark:border-slate-700 flex items-center justify-between">
          <div className="text-body-sm text-on-surface-variant dark:text-slate-400">
            Page 1 of 1
          </div>
          <div className="flex items-center gap-sm">
            <button disabled className="p-sm rounded border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 disabled:opacity-30">
              <span className="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded bg-primary text-on-primary text-label-md font-bold">1</button>
            <button disabled className="p-sm rounded border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-400 disabled:opacity-30">
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Stats Cards at bottom */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter text-left">

        {/* Patient Inflow */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
          <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
            <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Patient Inflow</h3>
            <span className="text-secondary dark:text-teal-400 font-bold text-body-sm">+12% vs last month</span>
          </div>
          <div className="flex items-end gap-md">
            <div className="text-headline-xl font-headline-xl text-primary dark:text-primary-fixed-dim">342</div>
            <div className="text-body-sm text-on-surface-variant dark:text-slate-400 mb-base">New admissions this month</div>
          </div>
        </div>

        {/* Bed Occupancy */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
          <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
            <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Bed Occupancy</h3>
            <span className="text-on-surface-variant dark:text-slate-400 font-bold text-body-sm">Target: 85%</span>
          </div>
          <div className="flex items-end gap-md">
            <div className="text-headline-xl font-headline-xl text-primary dark:text-primary-fixed-dim">92%</div>
            <div className="flex-1">
              <div className="w-full h-2 bg-surface-container dark:bg-slate-700 rounded-full mt-base">
                <div className="h-full bg-primary dark:bg-primary-fixed-dim rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md">
          <div className="flex items-center justify-between border-b border-outline-variant dark:border-slate-700 pb-sm mb-md">
            <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">Critical Alerts</h3>
            <span className="text-error font-bold text-body-sm">Requires Attention</span>
          </div>
          <div className="flex items-end gap-md">
            <div className="text-headline-xl font-headline-xl text-error">08</div>
            <div className="text-body-sm text-on-surface-variant dark:text-slate-400 mb-base">Active emergency triggers</div>
          </div>
        </div>

      </div>
    </>
  );
}
