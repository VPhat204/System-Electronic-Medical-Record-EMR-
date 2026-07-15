import React, { useState } from 'react';

const noteTypes = [
  { key: 'progress', viLabel: 'Ghi chú tiến triển', enLabel: 'Progress Note', icon: 'edit_note' },
  { key: 'discharge', viLabel: 'Tóm tắt xuất viện', enLabel: 'Discharge Summary', icon: 'assignment_return' },
  { key: 'consultation', viLabel: 'Ghi chú hội chẩn', enLabel: 'Consultation Note', icon: 'groups' },
  { key: 'procedure', viLabel: 'Biên bản thủ thuật', enLabel: 'Procedure Note', icon: 'surgical' },
];

const initialNotes = [
  {
    id: 'CN-001',
    patientName: 'Arthur Morgan',
    patientId: 'MC-40192',
    type: 'progress',
    title: 'Post-Hypertension Follow-up — Week 3',
    content: 'Patient reports improved compliance with medication schedule. BP trending downward (158/94 → 142/88 over 3 weeks). Continuing Lisinopril 10mg OD. Next review in 2 weeks. Patient counselled on low-sodium diet.',
    date: '15 Jul 2026',
    time: '09:15 AM',
    isFinalized: true,
    tags: ['Cardiology', 'HTN'],
  },
  {
    id: 'CN-002',
    patientName: 'Margaret Thatcher',
    patientId: 'MC-88334',
    type: 'consultation',
    title: 'Cardiology–Neurology Joint Consult',
    content: 'Requested cardiology consult for co-management. Patient has concurrent atrial fibrillation and new TIA symptoms. Recommended 48-hour Holter monitor and brain MRI contrast. Anticoagulation therapy initiation pending imaging results.',
    date: '14 Jul 2026',
    time: '03:40 PM',
    isFinalized: true,
    tags: ['CRITICAL', 'Neurology'],
  },
  {
    id: 'CN-003',
    patientName: 'Elena Rodriguez',
    patientId: 'MC-99210',
    type: 'procedure',
    title: 'Lumbar Puncture — Procedure Note',
    content: 'Procedure performed under sterile technique. Patient in left lateral decubitus. L4-L5 interspace used. Clear CSF obtained, opening pressure 18 cm H2O. Sent for cell count, glucose, protein, and culture. Patient tolerated procedure without complications.',
    date: '13 Jul 2026',
    time: '11:00 AM',
    isFinalized: true,
    tags: ['Neurology', 'Procedure'],
  },
  {
    id: 'CN-004',
    patientName: 'James Wilson',
    patientId: 'MC-77215',
    type: 'discharge',
    title: 'Discharge Summary — Cycle 3 Chemotherapy',
    content: 'Draft in progress...',
    date: '15 Jul 2026',
    time: '02:20 PM',
    isFinalized: false,
    tags: ['Oncology'],
  },
];

const typeColor = {
  progress: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-700',
  discharge: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-700',
  consultation: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-700',
  procedure: 'bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-700',
};

export default function DoctorClinicalNotesTab({ lang, t, patients = [] }) {
  const [notes, setNotes] = useState(initialNotes);
  const [selectedNoteId, setSelectedNoteId] = useState('CN-001');
  const [filterType, setFilterType] = useState('all');
  const [showNewForm, setShowNewForm] = useState(false);
  const [newNote, setNewNote] = useState({ patientId: '', type: 'progress', title: '', content: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  const selectedNote = notes.find(n => n.id === selectedNoteId);
  const filteredNotes = filterType === 'all' ? notes : notes.filter(n => n.type === filterType);

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 2000);
    }, 900);
  };

  const handleFinalizeNote = (noteId) => {
    setNotes(prev => prev.map(n => n.id === noteId ? { ...n, isFinalized: true } : n));
  };

  const handleAddNote = () => {
    const id = 'CN-' + String(notes.length + 1).padStart(3, '0');
    const now = new Date();
    const created = {
      id,
      patientName: newNote.patientId || 'Unknown Patient',
      patientId: newNote.patientId || 'N/A',
      type: newNote.type,
      title: newNote.title || (lang === 'vi' ? 'Ghi chú không tên' : 'Untitled Note'),
      content: newNote.content,
      date: now.getDate() + ' ' + now.toLocaleString('default', { month: 'short' }) + ' ' + now.getFullYear(),
      time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isFinalized: false,
      tags: [],
    };
    setNotes(prev => [created, ...prev]);
    setSelectedNoteId(id);
    setShowNewForm(false);
    setNewNote({ patientId: '', type: 'progress', title: '', content: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
            {lang === 'vi' ? 'Ghi Chú Lâm Sàng' : 'Clinical Notes'}
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
            {lang === 'vi'
              ? 'Ghi chú tiến triển, tóm tắt xuất viện và tài liệu hội chẩn của bác sĩ'
              : "Doctor's progress notes, discharge summaries and consultation documentation"}
          </p>
        </div>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary-container transition-all active:scale-95 font-label-md text-label-md shadow-sm whitespace-nowrap"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {lang === 'vi' ? 'Tạo ghi chú mới' : 'New Note'}
        </button>
      </div>

      {/* New Note Form */}
      {showNewForm && (
        <div className="bg-white dark:bg-slate-900 border border-primary/30 dark:border-primary/20 rounded-xl p-6 shadow-md space-y-4">
          <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">post_add</span>
            {lang === 'vi' ? 'Tạo Ghi Chú Mới' : 'Create New Note'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant dark:text-slate-400 mb-1 uppercase tracking-wide">
                {lang === 'vi' ? 'Bệnh nhân' : 'Patient'}
              </label>
              <select
                value={newNote.patientId}
                onChange={e => setNewNote(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">{lang === 'vi' ? '— Chọn bệnh nhân —' : '— Select Patient —'}</option>
                <option value="MC-40192">Arthur Morgan (MC-40192)</option>
                <option value="MC-99210">Elena Rodriguez (MC-99210)</option>
                <option value="MC-88334">Margaret Thatcher (MC-88334)</option>
                <option value="MC-77215">James Wilson (MC-77215)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant dark:text-slate-400 mb-1 uppercase tracking-wide">
                {lang === 'vi' ? 'Loại ghi chú' : 'Note Type'}
              </label>
              <select
                value={newNote.type}
                onChange={e => setNewNote(prev => ({ ...prev, type: e.target.value }))}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary"
              >
                {noteTypes.map(nt => (
                  <option key={nt.key} value={nt.key}>{lang === 'vi' ? nt.viLabel : nt.enLabel}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface-variant dark:text-slate-400 mb-1 uppercase tracking-wide">
                {lang === 'vi' ? 'Tiêu đề' : 'Title'}
              </label>
              <input
                type="text"
                value={newNote.title}
                onChange={e => setNewNote(prev => ({ ...prev, title: e.target.value }))}
                placeholder={lang === 'vi' ? 'Nhập tiêu đề...' : 'Enter note title...'}
                className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-on-surface-variant dark:text-slate-400 mb-1 uppercase tracking-wide">
              {lang === 'vi' ? 'Nội dung ghi chú' : 'Note Content'}
            </label>
            <textarea
              rows={4}
              value={newNote.content}
              onChange={e => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              placeholder={lang === 'vi' ? 'Nhập nội dung lâm sàng...' : 'Enter clinical note content...'}
              className="w-full bg-surface-container-low dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-on-surface dark:text-white outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => setShowNewForm(false)}
              className="px-4 py-2 text-sm text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {lang === 'vi' ? 'Hủy' : 'Cancel'}
            </button>
            <button
              onClick={handleAddNote}
              className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-container transition-colors"
            >
              {lang === 'vi' ? 'Lưu ghi chú' : 'Save Note'}
            </button>
          </div>
        </div>
      )}

      {/* Main Layout: List + Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
          <div className="border-b border-outline-variant dark:border-slate-800 p-3 flex gap-1 overflow-x-auto">
            <button
              onClick={() => setFilterType('all')}
              className={'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ' + (filterType === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
            >
              {lang === 'vi' ? 'Tất cả' : 'All'} ({notes.length})
            </button>
            {noteTypes.map(nt => (
              <button
                key={nt.key}
                onClick={() => setFilterType(nt.key)}
                className={'px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ' + (filterType === nt.key ? 'bg-primary text-white' : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800')}
              >
                {lang === 'vi' ? nt.viLabel : nt.enLabel}
              </button>
            ))}
          </div>
          <div className="divide-y divide-outline-variant dark:divide-slate-800 max-h-[600px] overflow-y-auto">
            {filteredNotes.map(note => (
              <button
                key={note.id}
                onClick={() => setSelectedNoteId(note.id)}
                className={'w-full text-left p-4 transition-colors ' + (selectedNoteId === note.id ? 'bg-primary/5 dark:bg-primary/10 border-l-2 border-primary' : 'hover:bg-surface-container-low dark:hover:bg-slate-800')}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-semibold text-sm text-on-surface dark:text-white leading-tight">{note.title}</p>
                  {!note.isFinalized && (
                    <span className="flex-shrink-0 text-[9px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded-full font-bold uppercase">Draft</span>
                  )}
                </div>
                <p className="text-xs text-on-surface-variant dark:text-slate-400 mb-2">{note.patientName} · {note.patientId}</p>
                <div className="flex items-center justify-between">
                  <span className={'text-[10px] px-2 py-0.5 rounded-full border font-semibold ' + typeColor[note.type]}>
                    {noteTypes.find(nt => nt.key === note.type)?.[lang === 'vi' ? 'viLabel' : 'enLabel']}
                  </span>
                  <span className="text-[10px] text-on-surface-variant dark:text-slate-500">{note.date}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Note Viewer/Editor */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl flex flex-col min-h-[500px]">
          {selectedNote ? (
            <>
              <div className="border-b border-outline-variant dark:border-slate-800 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={'text-[10px] px-2 py-0.5 rounded-full border font-bold ' + typeColor[selectedNote.type]}>
                        {noteTypes.find(nt => nt.key === selectedNote.type)?.[lang === 'vi' ? 'viLabel' : 'enLabel']}
                      </span>
                      {selectedNote.isFinalized ? (
                        <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold border border-green-200 dark:border-green-700">
                          {lang === 'vi' ? '✓ Đã xác nhận' : '✓ Finalized'}
                        </span>
                      ) : (
                        <span className="text-[10px] bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full font-bold border border-amber-200 dark:border-amber-700">
                          {lang === 'vi' ? 'Nháp' : 'Draft'}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">{selectedNote.title}</h3>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                      {selectedNote.patientName} ({selectedNote.patientId}) · {selectedNote.date} {selectedNote.time}
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    {!selectedNote.isFinalized && (
                      <button
                        onClick={() => handleFinalizeNote(selectedNote.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
                      >
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        {lang === 'vi' ? 'Xác nhận' : 'Finalize'}
                      </button>
                    )}
                    <button
                      onClick={handleSaveDraft}
                      className={'flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors font-semibold ' + (savedFlash ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 hover:bg-surface-variant dark:hover:bg-slate-700')}
                    >
                      <span className="material-symbols-outlined text-[14px]">{isSaving ? 'sync' : savedFlash ? 'check' : 'save'}</span>
                      {isSaving ? (lang === 'vi' ? 'Đang lưu...' : 'Saving...') : savedFlash ? (lang === 'vi' ? 'Đã lưu!' : 'Saved!') : (lang === 'vi' ? 'Lưu nháp' : 'Save Draft')}
                    </button>
                  </div>
                </div>
                {selectedNote.tags.length > 0 && (
                  <div className="flex gap-1.5 mt-3">
                    {selectedNote.tags.map(tag => (
                      <span key={tag} className={'text-[10px] px-2 py-0.5 rounded-full font-semibold ' + (tag === 'CRITICAL' ? 'bg-error/10 text-error border border-error/30' : 'bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-400')}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-grow p-5">
                {selectedNote.isFinalized ? (
                  <p className="text-on-surface dark:text-slate-200 leading-relaxed text-sm whitespace-pre-wrap">{selectedNote.content}</p>
                ) : (
                  <textarea
                    defaultValue={selectedNote.content}
                    onChange={e => setNotes(prev => prev.map(n => n.id === selectedNote.id ? { ...n, content: e.target.value } : n))}
                    rows={14}
                    className="w-full text-sm text-on-surface dark:text-slate-200 bg-surface-container-lowest dark:bg-slate-800/50 border border-outline-variant dark:border-slate-700 rounded-lg p-4 outline-none focus:ring-2 focus:ring-primary resize-none leading-relaxed font-mono"
                    placeholder={lang === 'vi' ? 'Nhập nội dung ghi chú lâm sàng...' : 'Enter clinical note content...'}
                  />
                )}
              </div>
              <div className="border-t border-outline-variant dark:border-slate-800 p-4 flex items-center justify-between text-[11px] text-on-surface-variant dark:text-slate-500">
                <span>ID: {selectedNote.id}</span>
                <span>{lang === 'vi' ? 'Bác sĩ Nguyễn Hữu Nghĩa' : 'Dr. Nguyen Huu Nghia'}</span>
                <span>{selectedNote.date} · {selectedNote.time}</span>
              </div>
            </>
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
              <span className="material-symbols-outlined text-[64px] text-outline dark:text-slate-600 mb-4">edit_note</span>
              <p className="font-body-md text-body-md text-on-surface-variant dark:text-slate-400">
                {lang === 'vi' ? 'Chọn ghi chú để xem hoặc chỉnh sửa.' : 'Select a note to view or edit.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
