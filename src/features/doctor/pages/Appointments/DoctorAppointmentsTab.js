import React, { useState } from 'react';
import medicalRecordService from '../../../../shared/services/medicalRecordService';

export default function DoctorAppointmentsTab({
  lang,
  t,
  token,
  setActiveTab,
  apptView,
  setApptView,
  shiftSelectedDate,
  selectedDate,
  getWeekDates,
  toDateKey,
  appointments,
  visibleAppointments,
  handleToggleApptStatus,
  calculateTopOffset,
  apptWaiting,
  apptInRoom,
  apptCompleted,
  filteredAgenda,
  setSelectedDate
}) {
  const isDark = document.documentElement.classList.contains('dark');
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [selectedAgendaItem, setSelectedAgendaItem] = useState(null);
  const [fetchedRecord, setFetchedRecord] = useState(null);
  const [loadingRecord, setLoadingRecord] = useState(false);

  const handleOpenClinicalNotes = async (item) => {
    setSelectedAgendaItem(item);
    setIsNoteModalOpen(true);
    setFetchedRecord(null);

    if (token) {
      setLoadingRecord(true);
      try {
        // Fetch all medical records for doctor
        const records = await medicalRecordService.getAllMedicalRecords(token);
        
        const targetApptId = item.id || item.appointmentId;
        const targetPatientDbId = item.patientDbId || item.patientId;
        const targetName = (item.patient || item.name || '').toLowerCase().trim();

        // 1. Match by appointmentId
        let match = records.find(r => r.appointmentId === Number(targetApptId));

        // 2. Match by patientId
        if (!match && targetPatientDbId) {
          match = records.find(r => r.patientId === Number(targetPatientDbId));
        }

        // 3. Match by patient name
        if (!match && targetName) {
          match = records.find(r => r.patient?.fullName?.toLowerCase().trim() === targetName);
        }

        // 4. Fallback to patient history endpoint directly
        if (!match && targetPatientDbId) {
          const history = await medicalRecordService.getPatientHistory(token, targetPatientDbId);
          if (history && history.length > 0) match = history[0];
        }

        setFetchedRecord(match || null);
      } catch (err) {
        console.error('Failed to fetch clinical note for agenda item:', err);
      } finally {
        setLoadingRecord(false);
      }
    }
  };

  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md text-left">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mb-xs">
            {lang === 'vi' ? 'Quản lý lịch hẹn của tôi' : 'My Schedule'}
          </h1>
          <p className="text-on-surface-variant font-body-sm dark:text-slate-400">
            {lang === 'vi' 
              ? 'Theo dõi lịch hẹn khám lâm sàng và quản lý trạng thái tiếp nhận bệnh nhân.' 
              : 'Track clinical appointments and manage patient consultation statuses.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-md">
          {/* View Selector segmented control */}
          <div className="flex bg-surface-container dark:bg-slate-800 rounded-lg p-xs border border-outline-variant dark:border-slate-700">
            {[
              { key: 'day', label: lang === 'vi' ? 'Ngày' : 'Day' },
              { key: 'week', label: lang === 'vi' ? 'Tuần' : 'Week' },
              { key: 'month', label: lang === 'vi' ? 'Tháng' : 'Month' },
              { key: 'year', label: lang === 'vi' ? 'Năm' : 'Year' }
            ].map(viewOpt => (
              <button
                key={viewOpt.key}
                onClick={() => setApptView(viewOpt.key)}
                className={`px-md py-xs rounded transition-all font-body-md text-body-md ${apptView === viewOpt.key
                  ? 'bg-surface-container-lowest dark:bg-slate-700 shadow-sm font-bold text-primary dark:text-primary-fixed-dim'
                  : 'text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-700'
                  }`}
              >
                {viewOpt.label}
              </button>
            ))}
          </div>

          {/* Date Navigation Pill */}
          <div className="flex items-center bg-surface-container-lowest dark:bg-slate-800 px-sm py-xs rounded-lg border border-outline-variant dark:border-slate-700 gap-xs">
            <button
              onClick={() => shiftSelectedDate(-1)}
              className="p-1 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-primary-fixed-dim transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">chevron_left</span>
            </button>
            <span className="inline-block w-[180px] text-center px-sm font-bold text-body-md text-on-surface dark:text-white select-none">
              {apptView === 'day'
                ? selectedDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })
                : apptView === 'week'
                  ? `${getWeekDates(selectedDate)[0].toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit' })} - ${getWeekDates(selectedDate)[6].toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { day: '2-digit', month: '2-digit' })}`
                  : apptView === 'month'
                    ? selectedDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { month: 'long', year: 'numeric' })
                    : selectedDate.getFullYear()}
            </span>
            <button
              onClick={() => shiftSelectedDate(1)}
              className="p-1 rounded hover:bg-surface-container-high dark:hover:bg-slate-700 text-primary dark:text-primary-fixed-dim transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[20px] font-bold">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter items-stretch">
        {/* Left Column (8/12 Cols) */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter flex flex-col justify-between">
          {/* Calendar Widget Container */}
          <section className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg overflow-hidden shadow-sm flex flex-col text-left flex-grow">
            {/* Header bar of calendar */}
            <div className="grid grid-cols-7 border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60 items-center">
              <div className="col-span-1 p-md text-right border-r border-outline-variant dark:border-slate-700 font-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider">
                {lang === 'vi' ? 'Giờ' : 'Time'}
              </div>
              <div className="col-span-6 p-md font-bold text-primary dark:text-primary-fixed-dim text-body-md uppercase tracking-wider">
                {apptView === 'day' ? (lang === 'vi' ? 'LỊCH KHÁM TRONG NGÀY' : 'TODAY\'S CLINICAL APPOINTMENTS') : (
                  apptView === 'week' ? (lang === 'vi' ? 'LỊCH TRÌNH TRONG TUẦN' : 'WEEKLY SCHEDULE') : (
                    apptView === 'month' ? (lang === 'vi' ? 'LỊCH TRÌNH TRONG THÁNG' : 'MONTHLY OVERVIEW') : (
                      lang === 'vi' ? 'TỔNG QUAN CẢ NĂM' : 'YEARLY SUMMARY'
                    )
                  )
                )}
              </div>
            </div>

            {/* Scrollable contents grid */}
            <div className={`relative flex-1 ${apptView === 'day' ? 'overflow-y-auto custom-scrollbar' : ''} bg-surface-container-lowest dark:bg-slate-900`}>
              {apptView === 'day' ? (
                <div className="grid grid-cols-7 min-h-full">
                  {/* Hour lines labels */}
                  <div className="col-span-1 border-r border-outline-variant dark:border-slate-700 divide-y divide-outline-variant/60 dark:divide-slate-800 select-none bg-surface-container-lowest dark:bg-slate-900">
                    {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(slot => (
                      <div key={slot} className="h-20 p-sm text-right text-body-sm text-outline dark:text-slate-400 font-medium">
                        {slot}
                      </div>
                    ))}
                  </div>

                  {/* Grid slots area */}
                  <div
                    className="col-span-6 p-md relative bg-repeat min-h-full"
                    style={{
                      backgroundImage: isDark 
                        ? "radial-gradient(circle, #475569 0.8px, transparent 0.8px)" 
                        : "radial-gradient(circle, #c2c6d4 0.8px, transparent 0.8px)",
                      backgroundSize: "20px 20px"
                    }}
                  >
                    {visibleAppointments.length > 0 ? (
                      visibleAppointments.map(appt => {
                        const isPending = appt.rawStatus === 'PENDING';
                        const isConfirmed = appt.rawStatus === 'CONFIRMED';
                        const isCheckedIn = appt.rawStatus === 'CHECKED_IN';
                        const isInProgress = appt.rawStatus === 'IN_PROGRESS';
                        const isCompleted = appt.rawStatus === 'COMPLETED';
                        const isCancelled = appt.rawStatus === 'CANCELLED';

                        return (
                          <div
                            key={appt.id}
                            onClick={() => handleToggleApptStatus(appt.id)}
                            className={`absolute left-4 right-4 p-sm rounded-lg border flex justify-between items-start hover:shadow-md hover:translate-y-[-1px] active:scale-[0.99] transition-all cursor-pointer group select-none border-l-[6px] ${isCheckedIn
                              ? 'bg-teal-500/5 dark:bg-teal-950/10 border-teal-500 text-teal-800 dark:text-teal-300'
                              : isPending
                                ? 'bg-amber-500/5 dark:bg-amber-950/10 border-amber-500 text-amber-800 dark:text-amber-300'
                                : isConfirmed
                                  ? 'bg-blue-500/5 dark:bg-blue-950/10 border-blue-500 text-blue-800 dark:text-blue-300'
                                  : isInProgress
                                    ? 'bg-orange-500/5 dark:bg-orange-950/10 border-orange-500 text-orange-800 dark:text-orange-300'
                                    : isCancelled
                                      ? 'bg-error-container/10 dark:bg-red-950/20 border-error text-error opacity-60'
                                      : 'bg-green-500/5 dark:bg-green-950/10 border-green-500 text-green-700 dark:text-green-300 opacity-70 hover:opacity-100'
                              }`}
                            style={{ top: calculateTopOffset(appt.time), height: `${Math.max(60, (appt.durationMins || 45) / 60 * 80)}px` }}
                            title={lang === 'vi' ? 'Nhấp để cập nhật trạng thái buổi khám' : 'Click to update consultation status'}
                          >
                            <div className="text-left flex-1 min-w-0 pr-sm">
                              <div className="flex items-center gap-xs mb-[2px]">
                                <p className="font-bold text-body-md truncate group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors">
                                  {appt.name}
                                </p>
                                <span className="text-body-sm font-semibold opacity-80 select-none">
                                  ({appt.time})
                                </span>
                              </div>
                              <p className="text-body-sm opacity-90 truncate leading-normal">
                                {appt.type}
                              </p>
                            </div>
                            <span className={`text-[10px] font-bold px-sm py-[2px] rounded uppercase tracking-wider border select-none ${isCheckedIn
                              ? 'bg-teal-100 dark:bg-teal-950/40 border-teal-500/20 text-teal-700 dark:text-teal-300'
                              : isPending
                                ? 'bg-amber-100 dark:bg-amber-950/40 border-amber-500/20 text-amber-700 dark:text-amber-300'
                                : isConfirmed
                                  ? 'bg-blue-100 dark:bg-blue-950/40 border-blue-500/20 text-blue-700 dark:text-blue-300'
                                  : isInProgress
                                    ? 'bg-orange-100 dark:bg-orange-950/40 border-orange-500/20 text-orange-705 dark:text-orange-300'
                                    : isCancelled
                                      ? 'bg-error-container/20 border-error/20 text-error'
                                      : 'bg-green-100 dark:bg-green-950/40 border-green-500/20 text-green-750 dark:text-green-300'
                              }`}>
                              {lang === 'vi' ? appt.status : (
                                isCheckedIn ? 'Checked In' :
                                  isPending ? 'Pending' :
                                    isConfirmed ? 'Confirmed' :
                                      isInProgress ? 'In Progress' :
                                        isCancelled ? 'Cancelled' : 'Completed'
                              )}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant dark:text-slate-500 bg-surface-container-lowest/50 dark:bg-slate-900/40 select-none">
                        <span className="material-symbols-outlined text-[48px] mb-sm opacity-50">calendar_today</span>
                        <p className="font-body-md">{lang === 'vi' ? 'Không có lịch hẹn khám nào hôm nay.' : 'No medical slots scheduled for today.'}</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : apptView === 'week' ? (
                <div className="grid grid-cols-7 gap-sm p-md h-full">
                  {getWeekDates(selectedDate).map(day => {
                    const dayKey = toDateKey(day);
                    const dayAppointments = visibleAppointments.filter(appt => appt.date === dayKey);
                    const isToday = toDateKey(new Date()) === dayKey;
                    return (
                      <div 
                        key={dayKey} 
                        className={`rounded-lg border p-sm min-h-[360px] flex flex-col transition-all ${isToday
                          ? 'border-primary bg-primary-container/5 dark:border-primary-fixed-dim dark:bg-blue-950/10 shadow-xs'
                          : 'border-outline-variant dark:border-slate-700 bg-surface-container-low/40 dark:bg-slate-900/20'
                          }`}
                      >
                        <div className="text-center border-b border-outline-variant/60 dark:border-slate-700/60 pb-sm mb-sm flex flex-col items-center justify-center">
                          <p className={`text-[11px] uppercase tracking-wider font-semibold ${isToday ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface-variant dark:text-slate-400'}`}>
                            {day.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { weekday: 'short' })}
                          </p>
                          <p className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-body-lg mt-xs ${isToday ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface dark:text-white'}`}>
                            {day.getDate()}
                          </p>
                        </div>
                        <div className="space-y-sm flex-1 overflow-y-auto custom-scrollbar max-h-[260px]">
                          {dayAppointments.length > 0 ? (
                            dayAppointments.sort((a, b) => a.time.localeCompare(b.time)).map(appt => {
                              const isPending = appt.rawStatus === 'PENDING';
                              const isConfirmed = appt.rawStatus === 'CONFIRMED';
                              const isCheckedIn = appt.rawStatus === 'CHECKED_IN';
                              const isInProgress = appt.rawStatus === 'IN_PROGRESS';
                              const isCompleted = appt.rawStatus === 'COMPLETED';
                              const isCancelled = appt.rawStatus === 'CANCELLED';
                              
                              return (
                                <div 
                                  key={appt.id} 
                                  onClick={() => handleToggleApptStatus(appt.id)}
                                  className={`rounded border p-xs text-left cursor-pointer transition-all hover:translate-y-[-1px] hover:shadow-xs border-l-4 ${isCheckedIn
                                    ? 'bg-teal-500/5 border-teal-500 dark:bg-teal-950/10'
                                    : isPending
                                      ? 'bg-amber-500/5 border-amber-500 dark:bg-amber-950/10'
                                      : isConfirmed
                                        ? 'bg-blue-500/5 border-blue-500 dark:bg-blue-950/10'
                                        : isInProgress
                                          ? 'bg-orange-500/5 border-orange-500 dark:bg-orange-950/10'
                                          : isCancelled
                                            ? 'bg-error-container/10 border-error dark:bg-red-950/20 opacity-50'
                                            : 'bg-green-500/5 border-green-500 dark:bg-green-950/10 opacity-70'
                                    }`}
                                  title={lang === 'vi' ? 'Nhấp để cập nhật trạng thái buổi khám' : 'Click to update consultation status'}
                                >
                                  <p className="font-bold text-body-sm truncate text-on-surface dark:text-white">
                                    {appt.time} • {appt.name}
                                  </p>
                                  <p className="text-[11px] text-on-surface-variant dark:text-slate-400 truncate">
                                    {appt.type}
                                  </p>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-center text-[11px] text-on-surface-variant/60 dark:text-slate-500 mt-md italic">
                              {lang === 'vi' ? 'Không có ca' : 'No Slots'}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : apptView === 'month' ? (
                <div className="p-md h-full">
                  <div className="grid grid-cols-7 gap-sm">
                    {Array.from({ length: 35 }, (_, index) => {
                      const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                      const startOffset = (firstDay.getDay() + 6) % 7;
                      const date = new Date(firstDay);
                      date.setDate(firstDay.getDate() + index - startOffset);
                      const isCurrentMonth = date.getMonth() === selectedDate.getMonth();
                      const dayKey = toDateKey(date);
                      const dayAppointments = appointments.filter(appt => appt.date === dayKey);
                      const isToday = toDateKey(new Date()) === dayKey;
                      const isSelected = toDateKey(selectedDate) === dayKey;

                      return (
                        <div 
                          key={dayKey + index} 
                          onClick={() => setSelectedDate(date)}
                          className={`min-h-24 rounded-lg border p-sm flex flex-col text-left transition-all cursor-pointer ${isCurrentMonth 
                            ? isSelected
                              ? 'border-primary bg-primary-container/10 dark:border-primary-fixed-dim dark:bg-blue-950/20 shadow-xs'
                              : isToday
                                ? 'border-primary/50 bg-primary/5 dark:border-primary-fixed-dim/50'
                                : 'border-outline-variant dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-primary dark:hover:border-primary-fixed-dim' 
                            : 'border-transparent bg-surface-container-low/20 dark:bg-slate-900/10 opacity-40 hover:opacity-60'
                            }`}
                        >
                          <div className="flex items-center justify-between text-body-sm mb-xs select-none">
                            <span className={`font-bold ${isToday ? 'text-primary dark:text-primary-fixed-dim' : 'text-on-surface dark:text-white'}`}>
                              {date.getDate()}
                            </span>
                            {dayAppointments.length > 0 && (
                              <span className="rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-fixed-dim px-2 py-0.5 text-[10px] font-bold">
                                {dayAppointments.length}
                              </span>
                            )}
                          </div>
                          <div className="space-y-1 flex-1 overflow-y-auto custom-scrollbar max-h-[60px]">
                            {dayAppointments.slice(0, 3).map(appt => (
                              <div key={appt.id} className="text-[10px] rounded bg-surface-container-high dark:bg-slate-700 px-xs py-0.5 truncate text-on-surface dark:text-slate-200 font-medium">
                                {appt.time} • {appt.name}
                              </div>
                            ))}
                            {dayAppointments.length > 3 && (
                              <p className="text-[9px] text-primary dark:text-primary-fixed-dim font-bold pl-xs">
                                + {dayAppointments.length - 3} {lang === 'vi' ? 'lịch hẹn' : 'more'}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="p-md grid grid-cols-4 gap-sm h-full">
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthDate = new Date(selectedDate.getFullYear(), index, 1);
                    const monthAppointments = appointments.filter(appt => {
                      return appt.date.split('-')[1] === String(index + 1).padStart(2, '0') && appt.date.split('-')[0] === String(selectedDate.getFullYear());
                    });
                    const isCurrentMonth = new Date().getMonth() === index && new Date().getFullYear() === selectedDate.getFullYear();

                    return (
                      <div 
                        key={monthDate.toString()} 
                        onClick={() => {
                          setSelectedDate(monthDate);
                          setApptView('month');
                        }}
                        className={`rounded-lg border p-md flex flex-col text-left transition-colors cursor-pointer hover:border-primary dark:hover:border-primary-fixed-dim ${isCurrentMonth
                          ? 'border-primary bg-primary-container/5 dark:border-primary-fixed-dim dark:bg-blue-950/10 shadow-xs'
                          : 'border-outline-variant dark:border-slate-700 bg-surface-container-low/40 dark:bg-slate-900/20 hover:bg-white dark:hover:bg-slate-800'
                          }`}
                      >
                        <p className="text-body-sm font-bold text-on-surface dark:text-white uppercase tracking-wider mb-xs">
                          {monthDate.toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { month: 'long' })}
                        </p>
                        <div className="mt-auto flex items-center gap-xs text-[12px] font-semibold text-primary dark:text-primary-fixed-dim">
                          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                          {monthAppointments.length} {lang === 'vi' ? 'lịch hẹn' : 'appointments'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Bento Status Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-md text-left">
            {/* Waiting card */}
            <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
              <div className="w-12 h-12 rounded-lg bg-surface-container-high dark:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-300 flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">hourglass_empty</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-xs">
                  {lang === 'vi' ? 'Chờ khám' : 'Awaiting Exam'}
                </p>
                <p className="font-headline-xl text-[28px] font-bold text-on-surface dark:text-white leading-none mb-sm">{apptWaiting}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân đang chờ trong hàng đợi tiếp tiếp đón.' : 'Patients waiting in queue.'}
                </p>
              </div>
            </div>

            {/* In Room card */}
            <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-secondary dark:hover:border-secondary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
              <div className="w-12 h-12 rounded-lg bg-secondary-container dark:bg-teal-950/40 flex items-center justify-center text-on-secondary-container dark:text-teal-300 flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">meeting_room</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-[11px] text-on-secondary-container dark:text-teal-300 uppercase tracking-wider mb-xs">
                  {lang === 'vi' ? 'Đang khám' : 'In Consult'}
                </p>
                <p className="font-headline-xl text-[28px] font-bold text-secondary dark:text-teal-400 leading-none mb-sm">{apptInRoom}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân hiện đang được bác sĩ khám bệnh.' : 'Patients inside consultation room.'}
                </p>
              </div>
            </div>

            {/* Completed card */}
            <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container dark:bg-blue-950/40 flex items-center justify-center text-on-primary-container dark:text-primary-fixed-dim flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-[11px] text-primary dark:text-primary-fixed-dim uppercase tracking-wider mb-xs">
                  {lang === 'vi' ? 'Hoàn tất' : 'Completed'}
                </p>
                <p className="font-headline-xl text-[28px] font-bold text-primary dark:text-primary-fixed-dim leading-none mb-sm">{apptCompleted}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân đã hoàn thành buổi khám hôm nay.' : 'Patients who finished checks today.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4/12 Cols) - Daily Agenda list */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter text-left">
          <section className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60 flex justify-between items-center">
              <h3 className="font-bold text-primary dark:text-primary-fixed-dim text-body-lg uppercase tracking-wider">
                {lang === 'vi' ? 'Lịch làm việc chi tiết' : 'Daily Agenda'}
              </h3>
            </div>
            
            <div className="flex-grow overflow-y-auto p-md space-y-md h-[450px] custom-scrollbar">
              {filteredAgenda && filteredAgenda.map(item => {
                const isConfirmed = item.status === 'Confirmed';
                const isPending = item.status === 'Pending';
                const isCancelled = item.status === 'Cancelled';

                return (
                  <div
                    key={item.id}
                    className={`p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group ${isCancelled ? 'opacity-50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-sm">
                      {isConfirmed && (
                        <span className="bg-secondary-container/20 text-on-secondary-container dark:text-teal-400 px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-secondary-container dark:bg-teal-500"></span> Confirmed
                        </span>
                      )}
                      {isPending && (
                        <span className="bg-tertiary-fixed/30 text-tertiary dark:text-amber-500 px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary dark:bg-amber-500"></span> Pending
                        </span>
                      )}
                      {isCancelled && (
                        <span className="bg-error-container text-on-error-container px-sm py-base rounded text-label-md font-label-md flex items-center gap-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-on-error-container"></span> Cancelled
                        </span>
                      )}
                      <span className="text-body-sm font-body-sm text-outline dark:text-slate-400">{item.time}</span>
                    </div>

                    <h4 className={`text-body-lg font-bold group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors ${isCancelled ? 'line-through' : 'text-on-surface dark:text-white'}`}>
                      {item.patient}
                    </h4>
                    <p className="text-body-md font-body-md text-on-surface-variant dark:text-slate-300">{item.type}</p>
                    
                    {/* View Clinical Notes Button */}
                    <div className="mt-3 pt-2 border-t border-outline-variant/50 dark:border-slate-700/60 flex items-center justify-between">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenClinicalNotes(item);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim hover:bg-primary/20 rounded-lg transition-colors active:scale-95 shadow-2xs"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit_note</span>
                        {lang === 'vi' ? 'Xem Ghi Chú Lâm Sàng' : 'View Clinical Note'}
                      </button>
                    </div>
                  </div>
                );
              })}

              {(!filteredAgenda || filteredAgenda.length === 0) && (
                <div className="py-xl text-center text-on-surface-variant dark:text-slate-400 h-full flex flex-col justify-center items-center">
                  <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                    calendar_today
                  </span>
                  <p className="font-body-md">
                    {lang === 'vi' ? 'Không có ca hẹn chi tiết cho ngày này.' : 'No agenda items for this day.'}
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ══ CLINICAL NOTES PREVIEW MODAL ════════════════════════════════════ */}
      {isNoteModalOpen && selectedAgendaItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-left">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-outline-variant dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-fixed-dim flex items-center justify-center font-bold text-sm">
                  {selectedAgendaItem.patient?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'BN'}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-on-surface dark:text-white leading-tight">
                    {selectedAgendaItem.patient}
                  </h3>
                  <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">
                    {selectedAgendaItem.time} · {selectedAgendaItem.type}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="py-4 space-y-4 overflow-y-auto custom-scrollbar flex-1">
              {loadingRecord ? (
                <div className="py-12 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[32px] text-primary animate-spin">sync</span>
                </div>
              ) : fetchedRecord ? (
                <div className="space-y-4">
                  {/* Diagnosis */}
                  {fetchedRecord.diagnosesICD10 && (
                    <div className="p-3 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                      <p className="text-[10px] font-bold text-primary dark:text-primary-fixed-dim uppercase tracking-wider">
                        {lang === 'vi' ? 'Chẩn đoán (ICD-10)' : 'Diagnosis (ICD-10)'}
                      </p>
                      <p className="text-sm font-bold text-on-surface dark:text-white mt-0.5">
                        {fetchedRecord.diagnosesICD10}
                      </p>
                    </div>
                  )}

                  {/* Vitals */}
                  {fetchedRecord.vitals && (
                    <div>
                      <p className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-error">monitor_heart</span>
                        {lang === 'vi' ? 'Dấu hiệu sinh tồn' : 'Vital Signs'}
                      </p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {fetchedRecord.vitals.bloodPressure && (
                          <div className="p-2.5 bg-surface-container-low dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700">
                            <p className="text-[9px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">{lang === 'vi' ? 'Huyết áp' : 'BP'}</p>
                            <p className="text-xs font-bold text-on-surface dark:text-white">{fetchedRecord.vitals.bloodPressure} mmHg</p>
                          </div>
                        )}
                        {fetchedRecord.vitals.pulse && (
                          <div className="p-2.5 bg-surface-container-low dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700">
                            <p className="text-[9px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">{lang === 'vi' ? 'Nhịp tim' : 'Pulse'}</p>
                            <p className="text-xs font-bold text-on-surface dark:text-white">{fetchedRecord.vitals.pulse} bpm</p>
                          </div>
                        )}
                        {fetchedRecord.vitals.temperature && (
                          <div className="p-2.5 bg-surface-container-low dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700">
                            <p className="text-[9px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">{lang === 'vi' ? 'Nhiệt độ' : 'Temp'}</p>
                            <p className="text-xs font-bold text-on-surface dark:text-white">{fetchedRecord.vitals.temperature} °C</p>
                          </div>
                        )}
                        {fetchedRecord.vitals.spO2 && (
                          <div className="p-2.5 bg-surface-container-low dark:bg-slate-800 rounded-lg border border-outline-variant dark:border-slate-700">
                            <p className="text-[9px] text-on-surface-variant dark:text-slate-400 uppercase font-semibold">SpO₂</p>
                            <p className="text-xs font-bold text-on-surface dark:text-white">{fetchedRecord.vitals.spO2} %</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chief Complaint */}
                  {fetchedRecord.chiefComplaint && (
                    <div>
                      <p className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-1">
                        {lang === 'vi' ? 'Lý do khám' : 'Chief Complaint'}
                      </p>
                      <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-low dark:bg-slate-800 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                        {fetchedRecord.chiefComplaint}
                      </p>
                    </div>
                  )}

                  {/* Clinical Notes */}
                  {fetchedRecord.clinicalNotes && (
                    <div>
                      <p className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-1">
                        {lang === 'vi' ? 'Ghi chú diễn tiến lâm sàng' : 'Clinical Notes'}
                      </p>
                      <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-low dark:bg-slate-800 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                        {fetchedRecord.clinicalNotes}
                      </p>
                    </div>
                  )}

                  {/* Treatment Plan */}
                  {fetchedRecord.treatmentPlan && (
                    <div>
                      <p className="text-[11px] font-bold text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-1">
                        {lang === 'vi' ? 'Kế hoạch điều trị & Đơn thuốc' : 'Treatment Plan'}
                      </p>
                      <p className="text-xs text-on-surface dark:text-slate-200 bg-surface-container-low dark:bg-slate-800 p-3 rounded-lg leading-relaxed whitespace-pre-wrap">
                        {fetchedRecord.treatmentPlan}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-2">description</span>
                  <p className="text-sm text-on-surface-variant dark:text-slate-400">
                    {lang === 'vi'
                      ? 'Bệnh nhân này chưa có ghi chú lâm sàng cho ca khám này.'
                      : 'No clinical notes recorded yet for this appointment.'}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-outline-variant dark:border-slate-800 flex justify-between items-center">
              {setActiveTab && (
                <button
                  onClick={() => {
                    setIsNoteModalOpen(false);
                    setActiveTab('Clinical Notes');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary dark:bg-primary/20 text-xs font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                  {lang === 'vi' ? 'Mở trong trang Ghi Chú Lâm Sàng' : 'Open in Clinical Notes'}
                </button>
              )}
              <button
                onClick={() => setIsNoteModalOpen(false)}
                className="px-4 py-1.5 bg-surface-container-high dark:bg-slate-800 text-on-surface-variant dark:text-slate-300 text-xs font-semibold rounded-lg hover:bg-surface-variant transition-colors ml-auto"
              >
                {lang === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
