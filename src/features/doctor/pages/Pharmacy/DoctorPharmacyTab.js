import React from 'react';

export default function DoctorPharmacyTab({
  lang,
  t,
  handleSendPrescription,
  prescPatientId,
  setPrescPatientId,
  patients,
  prescDiagnosis,
  setPrescDiagnosis,
  draftMedName,
  setDraftMedName,
  draftMedDosage,
  setDraftMedDosage,
  draftMedFreq,
  setDraftMedFreq,
  draftMedDuration,
  setDraftMedDuration,
  draftMedNotes,
  setDraftMedNotes,
  handleAddMedication,
  currentMedList,
  handleRemoveMedication,
  setCurrentMedList,
  filteredPrescriptions,
}) {
  return (
    <>
      {/* Breadcrumbs & Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Quầy kê đơn thuốc' : 'Prescription Desk'}</h2>
        </div>
        <div className="flex gap-md w-fit">
          <button
            onClick={() => alert('In báo cáo đơn thuốc trong ngày')}
            className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-sm rounded flex items-center gap-xs text-on-surface dark:text-slate-200 font-label-md hover:bg-surface-container-high dark:hover:bg-slate-700 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
            Print Summary
          </button>
          <button
            onClick={handleSendPrescription}
            className="bg-primary hover:bg-primary-container text-white px-lg py-sm font-label-md text-label-md rounded-lg flex items-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            Sign & Dispatch
          </button>
        </div>
      </div>

      {/* Prescription Creation Workspace */}
      <div className="grid grid-cols-12 gap-gutter text-left">

        {/* Left Column: Form (7 cols) */}
        <div className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md shadow-sm space-y-md">
          <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white pb-2 border-b border-outline-variant/35 dark:border-slate-700 flex items-center gap-sm">
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">edit_note</span>
            Prescribe Medication
          </h3>

          {/* Row 1: Target Patient & Diagnosis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Target Patient</label>
              <select
                value={prescPatientId}
                onChange={(e) => setPrescPatientId(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              >
                {patients.map(p => (
                  <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Diagnosis / Reason</label>
              <input
                type="text"
                placeholder="e.g. Hypertension, Pneumonia..."
                value={prescDiagnosis}
                onChange={(e) => setPrescDiagnosis(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-outline-variant/35 dark:border-slate-700 my-2"></div>

          {/* Row 2: Drug Name & Dosage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Drug Name</label>
              <input
                type="text"
                placeholder="Search or enter e.g. Amoxicillin, Metformin..."
                value={draftMedName}
                onChange={(e) => setDraftMedName(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
              />
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Dosage</label>
              <input
                type="text"
                placeholder="e.g. 500mg, 10mg..."
                value={draftMedDosage}
                onChange={(e) => setDraftMedDosage(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
              />
            </div>
          </div>

          {/* Row 3: Frequency & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Frequency</label>
              <select
                value={draftMedFreq}
                onChange={(e) => setDraftMedFreq(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              >
                <option>Once daily</option>
                <option>Twice daily</option>
                <option>Three times daily</option>
                <option>Four times daily</option>
                <option>Every 8 hours</option>
                <option>Every 4 hours</option>
                <option>As needed (PRN)</option>
              </select>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Duration</label>
              <select
                value={draftMedDuration}
                onChange={(e) => setDraftMedDuration(e.target.value)}
                className="h-10 px-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none dark:text-white"
              >
                <option>3 days</option>
                <option>5 days</option>
                <option>7 days</option>
                <option>14 days</option>
                <option>30 days</option>
                <option>90 days</option>
              </select>
            </div>
          </div>

          {/* Row 4: Directions / Notes */}
          <div className="flex flex-col gap-xs">
            <label className="text-body-sm font-bold text-on-surface-variant dark:text-slate-300">Directions & Special Instructions</label>
            <textarea
              rows="2"
              placeholder="e.g. Take with food, Avoid dairy products..."
              value={draftMedNotes}
              onChange={(e) => setDraftMedNotes(e.target.value)}
              className="p-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg text-body-md focus:ring-1 focus:ring-primary focus:border-transparent outline-none text-on-surface dark:text-white"
            />
          </div>

          {/* Add Medication Trigger Button */}
          <button
            onClick={handleAddMedication}
            className="w-full bg-secondary-container text-on-secondary-container dark:bg-teal-900 dark:text-teal-400 border border-secondary-container dark:border-slate-700 hover:bg-secondary/15 py-3 rounded-lg font-bold flex items-center justify-center gap-sm transition-all active:scale-[0.98] mt-4"
          >
            <span className="material-symbols-outlined">add_circle</span>
            Add to Prescription Draft
          </button>

        </div>

        {/* Right Column: Draft Summary (5 cols) */}
        <div className="col-span-12 lg:col-span-5 flex flex-col bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl shadow-sm overflow-hidden min-h-[400px]">

          {/* Draft Header */}
          <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
            <h3 className="text-label-md font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-widest">Active Prescription Draft</h3>
            <div className="mt-2 text-body-md text-on-surface dark:text-white font-semibold">
              Patient: {patients.find(p => p.id === prescPatientId)?.name || 'Unknown Patient'}
            </div>
            <div className="text-body-sm text-outline dark:text-slate-400 mt-1">
              Diagnosis: {prescDiagnosis || 'Not specified'}
            </div>
          </div>

          {/* Medications List */}
          <div className="flex-grow p-md space-y-md overflow-y-auto max-h-[300px]">
            {currentMedList.map((med, idx) => (
              <div
                key={idx}
                className="p-md bg-surface-container-low dark:bg-slate-900 border border-outline-variant/60 dark:border-slate-700 rounded-lg flex justify-between items-center group"
              >
                <div className="space-y-1">
                  <h4 className="font-bold text-primary dark:text-primary-fixed-dim">{med.name} - {med.dosage}</h4>
                  <p className="text-body-sm text-on-surface-variant dark:text-slate-300">{med.frequency} • {med.duration}</p>
                  <p className="text-[11px] text-outline dark:text-slate-400 italic">Notes: {med.notes}</p>
                </div>
                <button
                  onClick={() => handleRemoveMedication(idx)}
                  className="p-sm text-error hover:bg-error-container/20 rounded-full opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-[20px]">delete</span>
                </button>
              </div>
            ))}

            {currentMedList.length === 0 && (
              <div className="h-full flex flex-col justify-center items-center text-center text-on-surface-variant dark:text-slate-400 py-12">
                <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                  prescriptions
                </span>
                <p className="font-body-md max-w-xs">Đơn thuốc trống. Hãy chọn loại thuốc và tần suất sử dụng ở bảng bên trái.</p>
              </div>
            )}
          </div>

          {/* Submit dispatch actions */}
          <div className="p-md bg-surface-container-lowest dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex gap-md">
            <button
              onClick={() => { setCurrentMedList([]); setPrescDiagnosis(''); }}
              disabled={currentMedList.length === 0}
              className="flex-1 border border-outline-variant dark:border-slate-700 text-on-surface-variant dark:text-slate-300 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 transition-colors font-bold"
            >
              Clear Draft
            </button>
            <button
              onClick={handleSendPrescription}
              disabled={currentMedList.length === 0}
              className="flex-1 bg-primary text-white py-2.5 rounded-lg hover:bg-primary-container disabled:opacity-30 transition-all active:scale-[0.98] font-bold shadow-sm"
            >
              Dispatch Order
            </button>
          </div>

        </div>

      </div>

      {/* Prescriptions Dispatch History */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm text-left">

        {/* Table Header */}
        <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50 flex justify-between items-center">
          <h3 className="text-label-md font-bold text-on-surface dark:text-white uppercase flex items-center gap-sm">
            <span className="material-symbols-outlined text-[18px]">history</span>
            Recently Prescribed History
          </h3>
          <span className="text-body-sm text-on-surface-variant dark:text-slate-400">{filteredPrescriptions.length} Records</span>
        </div>

        {/* Dispatch Grid List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/30 text-on-surface-variant dark:text-slate-300 border-b border-outline-variant dark:border-slate-700 text-left">
                <th className="px-lg py-sm text-label-md font-bold uppercase">Presc ID</th>
                <th className="px-md py-sm text-label-md font-bold uppercase">Patient Name</th>
                <th className="px-md py-sm text-label-md font-bold uppercase">Diagnosis</th>
                <th className="px-md py-sm text-label-md font-bold uppercase">Medications</th>
                <th className="px-md py-sm text-label-md font-bold uppercase">Date Issued</th>
                <th className="px-md py-sm text-label-md font-bold uppercase">Status</th>
                <th className="px-lg py-sm text-label-md font-bold uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-body-md text-on-surface dark:text-slate-200 divide-y divide-outline-variant dark:divide-slate-700/50">
              {filteredPrescriptions.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`hover:bg-surface-container-low dark:hover:bg-slate-700/40 transition-colors ${idx % 2 === 1 ? 'bg-slate-50/30 dark:bg-slate-900/10' : ''
                    }`}
                >
                  <td className="px-lg py-md font-data-mono text-primary dark:text-primary-fixed-dim">{p.id}</td>
                  <td className="px-md py-md font-semibold">{p.patient}</td>
                  <td className="px-md py-md text-on-surface-variant dark:text-slate-300">{p.diagnosis}</td>
                  <td className="px-md py-md max-w-xs truncate">
                    {p.medications.map(m => `${m.name} (${m.dosage})`).join(', ')}
                  </td>
                  <td className="px-md py-md text-body-sm text-outline dark:text-slate-400">{p.date}</td>
                  <td className="px-md py-md">
                    {p.status === 'Dispatched' ? (
                      <span className="bg-secondary-container/50 text-on-secondary-container dark:text-teal-400 text-[10px] font-bold px-sm py-0.5 rounded border border-secondary/20 flex items-center gap-xs w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary dark:bg-teal-500"></span> Dispatched
                      </span>
                    ) : p.status === 'Preparing' ? (
                      <span className="bg-primary-fixed/30 text-primary dark:text-primary-fixed-dim text-[10px] font-bold px-sm py-0.5 rounded border border-primary/20 flex items-center gap-xs w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Preparing
                      </span>
                    ) : (
                      <span className="bg-tertiary-fixed/30 text-tertiary dark:text-amber-500 text-[10px] font-bold px-sm py-0.5 rounded border border-tertiary/20 flex items-center gap-xs w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span> Pending Review
                      </span>
                    )}
                  </td>
                  <td className="px-lg py-md text-right">
                    <button
                      onClick={() => alert(`In đơn thuốc: ${p.id}`)}
                      className="text-primary dark:text-primary-fixed-dim hover:underline font-label-md text-[12px] flex items-center gap-xs ml-auto"
                    >
                      Print Presc
                      <span className="material-symbols-outlined text-[14px]">print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
}
