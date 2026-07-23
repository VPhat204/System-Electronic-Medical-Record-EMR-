import React, { useState } from 'react';

export default function ReceptionistAppointmentsTab({
  lang,
  t,
  apptView,
  setApptView,
  shiftSelectedDate,
  selectedDate,
  getWeekDates,
  toDateKey,
  appointments,
  visibleAppointments,
  handleToggleApptStatus,
  handleConfirmAppt,
  handleCheckInAppt,
  calculateTopOffset,
  apptWaiting,
  apptInRoom,
  apptCompleted,
  apptForm,
  setApptForm,
  doctorsList,
  handleToggleDoctorStatus,
  handleBookingConfirmSubmit,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <>
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-lg gap-md text-left">
        <div>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold mb-xs">{t.appointmentsTitle}</h1>
          <p className="text-on-surface-variant font-body-sm dark:text-slate-400">
            {lang === 'vi' ? 'Quản lý lịch khám, tiếp nhận bệnh nhân và theo dõi phòng khám trực quan.' : 'Manage consultation slots, check in patients, and view live clinic metrics.'}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-md">
          {/* View Selector segmented control */}
          <div className="flex bg-surface-container dark:bg-slate-800 rounded-lg p-xs border border-outline-variant dark:border-slate-700">
            {[
              { key: 'day', label: t.dayTab },
              { key: 'week', label: t.weekTab },
              { key: 'month', label: t.monthTab },
              { key: 'year', label: t.yearTab }
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
                {t.timeHeader}
              </div>
              <div className="col-span-6 p-md font-bold text-primary dark:text-primary-fixed-dim text-body-md uppercase tracking-wider">
                {apptView === 'day' ? t.appointmentsListHeader : (
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

                        const isMenuOpen = openMenuId === appt.id;

                        return (
                          <div
                            key={appt.id}
                            className={`absolute left-3 right-3 rounded-xl border bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition-all duration-200 select-none p-3 border-l-4 flex flex-col justify-between ${
                              isCheckedIn
                                ? 'border-l-teal-500 border-teal-200 dark:border-teal-800/60'
                                : isPending
                                  ? 'border-l-amber-500 border-amber-200 dark:border-amber-800/60'
                                  : isConfirmed
                                    ? 'border-l-blue-500 border-blue-200 dark:border-blue-800/60'
                                    : isInProgress
                                      ? 'border-l-orange-500 border-orange-200 dark:border-orange-800/60'
                                      : isCancelled
                                        ? 'border-l-slate-400 border-slate-200 dark:border-slate-700 opacity-60'
                                        : 'border-l-emerald-500 border-emerald-200 dark:border-emerald-800/60'
                            }`}
                            style={{ top: calculateTopOffset(appt.time), minHeight: '64px', height: `${Math.max(64, (appt.durationMins || 45) / 60 * 75)}px` }}
                          >
                            {/* Backdrop overlay to close menu when clicking outside */}
                            {isMenuOpen && (
                              <div
                                className="fixed inset-0 z-20 cursor-default"
                                onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}
                              />
                            )}

                            {/* Card Content Row */}
                            <div className="flex items-center justify-between gap-3 relative">
                              {/* Left: Avatar + Details */}
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs ${
                                  isCheckedIn ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/60 dark:text-teal-300'
                                    : isPending ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/60 dark:text-amber-300'
                                      : isConfirmed ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300'
                                        : isInProgress ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/60 dark:text-orange-300'
                                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300'
                                }`}>
                                  {appt.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'BN'}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm text-slate-800 dark:text-white truncate leading-tight">
                                      {appt.name}
                                    </p>
                                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 whitespace-nowrap bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                                      ⏰ {appt.time}
                                    </span>
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                                    {appt.type} · <span className="font-medium text-slate-700 dark:text-slate-300">{appt.doctor}</span>
                                  </p>
                                </div>
                              </div>

                              {/* Right: Status Badge & 3-Dots Action Menu */}
                              <div className="flex items-center gap-2 flex-shrink-0 relative">
                                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border flex items-center gap-1.5 ${
                                  isCheckedIn ? 'bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-700 text-teal-700 dark:text-teal-300'
                                    : isPending ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300'
                                      : isConfirmed ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300'
                                        : isInProgress ? 'bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-700 text-orange-700 dark:text-orange-300'
                                          : isCancelled ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 text-slate-500'
                                            : 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                                }`}>
                                  <span className={`w-1.5 h-1.5 rounded-full ${
                                    isCheckedIn ? 'bg-teal-500' : isPending ? 'bg-amber-500 animate-pulse' : isConfirmed ? 'bg-blue-500' : 'bg-emerald-500'
                                  }`}></span>
                                  {lang === 'vi' ? appt.status : (
                                    isCheckedIn ? t.checkedInStatus
                                      : isPending ? t.waitingAppt
                                        : isConfirmed ? 'Confirmed'
                                          : isInProgress ? 'In Progress'
                                            : isCancelled ? 'Cancelled' : t.completed
                                  )}
                                </span>

                                {/* 3-Dots Button */}
                                {!isCompleted && !isCancelled && (
                                  <div className="relative">
                                    <button
                                      id={`action-menu-btn-${appt.id}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenuId(isMenuOpen ? null : appt.id);
                                      }}
                                      className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors flex items-center justify-center"
                                      title={lang === 'vi' ? 'Tùy chọn thao tác' : 'Actions menu'}
                                    >
                                      <span className="material-symbols-outlined text-[18px]">more_vert</span>
                                    </button>

                                    {/* Action Dropdown Menu */}
                                    {isMenuOpen && (
                                      <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 py-1.5 animate-in fade-in zoom-in-95 duration-100">
                                        {isPending && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenMenuId(null);
                                              handleConfirmAppt(appt.id);
                                            }}
                                            className="w-full px-3 py-2 text-left text-xs font-semibold text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2 transition-colors"
                                          >
                                            <span className="material-symbols-outlined text-[16px] text-blue-600">check_circle</span>
                                            {lang === 'vi' ? 'Duyệt lịch hẹn' : 'Confirm Appt'}
                                          </button>
                                        )}

                                        {isConfirmed && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setOpenMenuId(null);
                                              handleCheckInAppt(appt.id);
                                            }}
                                            className="w-full px-3 py-2 text-left text-xs font-semibold text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40 flex items-center gap-2 transition-colors"
                                          >
                                            <span className="material-symbols-outlined text-[16px] text-teal-600">how_to_reg</span>
                                            {lang === 'vi' ? 'Tiếp đón Check-in' : 'Check In'}
                                          </button>
                                        )}

                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setOpenMenuId(null);
                                            handleToggleApptStatus(appt.id);
                                          }}
                                          className="w-full px-3 py-2 text-left text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 flex items-center gap-2 transition-colors"
                                        >
                                          <span className="material-symbols-outlined text-[16px] text-red-500">cancel</span>
                                          {lang === 'vi' ? 'Hủy lịch hẹn' : 'Cancel Appt'}
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant dark:text-slate-500 bg-surface-container-lowest/50 dark:bg-slate-900/40 select-none">
                        <span className="material-symbols-outlined text-[48px] mb-sm opacity-50">calendar_today</span>
                        <p className="font-body-md">{lang === 'vi' ? 'Không có lịch hẹn nào trong ngày này.' : 'No appointments scheduled for this day.'}</p>
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
                                  className={`rounded border p-xs text-left transition-all border-l-4 ${
                                    isCheckedIn
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
                                >
                                  <p className="font-bold text-body-sm truncate text-on-surface dark:text-white">
                                    {appt.time} • {appt.name}
                                  </p>
                                  <p className="text-[11px] text-on-surface-variant dark:text-slate-400 truncate">
                                    {appt.type}
                                  </p>
                                  {/* Inline action buttons */}
                                  <div className="flex gap-1 mt-1.5">
                                    {isPending && (
                                      <button
                                        id={`week-confirm-${appt.id}`}
                                        onClick={() => handleConfirmAppt(appt.id)}
                                        className="flex items-center gap-0.5 px-1.5 py-0.5 bg-blue-600 text-white text-[9px] font-bold rounded active:scale-95"
                                      >
                                        <span className="material-symbols-outlined text-[10px]">check</span>
                                        {lang === 'vi' ? 'Duyệt' : 'Confirm'}
                                      </button>
                                    )}
                                    {isConfirmed && (
                                      <button
                                        id={`week-checkin-${appt.id}`}
                                        onClick={() => handleCheckInAppt(appt.id)}
                                        className="flex items-center gap-0.5 px-1.5 py-0.5 bg-teal-600 text-white text-[9px] font-bold rounded active:scale-95"
                                      >
                                        <span className="material-symbols-outlined text-[10px]">how_to_reg</span>
                                        Check-in
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <p className="text-center text-[11px] text-on-surface-variant/60 dark:text-slate-500 mt-md italic">
                              {lang === 'vi' ? 'Không có hẹn' : 'No Appts'}
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
                      const apptDate = new Date(`${appt.date}T00:00:00`);
                      return apptDate.getMonth() === monthDate.getMonth() && apptDate.getFullYear() === monthDate.getFullYear();
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
                <p className="font-label-md text-[11px] text-on-surface-variant dark:text-slate-400 uppercase tracking-wider mb-xs">{t.waitingAppt}</p>
                <p className="font-headline-xl text-[28px] font-bold text-on-surface dark:text-white leading-none mb-sm">{apptWaiting}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân đang chờ tới lượt khám tại sảnh.' : 'Patients waiting in the lobby for their turn.'}
                </p>
              </div>
            </div>

            {/* In Room card */}
            <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-secondary dark:hover:border-secondary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
              <div className="w-12 h-12 rounded-lg bg-secondary-container dark:bg-teal-950/40 flex items-center justify-center text-on-secondary-container dark:text-teal-300 flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">meeting_room</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-[11px] text-on-secondary-container dark:text-teal-300 uppercase tracking-wider mb-xs">{t.inRoom}</p>
                <p className="font-headline-xl text-[28px] font-bold text-secondary dark:text-teal-400 leading-none mb-sm">{apptInRoom}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân hiện đang được bác sĩ thăm khám.' : 'Patients currently inside active consultation rooms.'}
                </p>
              </div>
            </div>

            {/* Completed card */}
            <div className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-md transition-all duration-300 flex items-start gap-md">
              <div className="w-12 h-12 rounded-lg bg-primary-container dark:bg-blue-950/40 flex items-center justify-center text-on-primary-container dark:text-primary-fixed-dim flex-shrink-0">
                <span className="material-symbols-outlined text-[28px]">check_circle</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-label-md text-[11px] text-primary dark:text-primary-fixed-dim uppercase tracking-wider mb-xs">{t.completed}</p>
                <p className="font-headline-xl text-[28px] font-bold text-primary dark:text-primary-fixed-dim leading-none mb-sm">{apptCompleted}</p>
                <p className="font-body-sm text-[12px] text-on-surface-variant dark:text-slate-400 leading-tight">
                  {lang === 'vi' ? 'Bệnh nhân đã hoàn tất lượt khám & thanh toán.' : 'Patients who finished checks & billing today.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4/12 Cols) */}
        <div className="col-span-12 lg:col-span-4 space-y-gutter text-left">
          {/* Quick Action buttons */}
          <div className="grid grid-cols-2 gap-sm">
            <button
              onClick={() => {
                const el = document.getElementById('quick-booking-card');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-on-primary font-bold py-md rounded-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-surface-tint shadow-md hover:shadow-lg text-label-md select-none"
            >
              <span className="material-symbols-outlined text-[20px]">add_box</span>
              {t.bookAppointmentAction}
            </button>
            <button
              onClick={() => alert(lang === 'vi' ? 'Đang in phiếu số thứ tự tiếp nhận...' : 'Printing receipt queue ticket...')}
              className="bg-surface-container-lowest dark:bg-slate-800 border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim font-bold py-md rounded-lg flex items-center justify-center gap-sm active:scale-[0.98] transition-all hover:bg-primary/5 shadow-sm text-label-md select-none"
            >
              <span className="material-symbols-outlined text-[20px]">print</span>
              {t.printSlip}
            </button>
          </div>

          {/* Quick Booking Form Card */}
          <section id="quick-booking-card" className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60 flex justify-between items-center">
              <h3 className="font-bold text-primary dark:text-primary-fixed-dim text-body-lg uppercase tracking-wider">{t.quickBookHeader}</h3>
              <button
                type="button"
                onClick={() => alert(lang === 'vi' ? 'Nhấp vào một lịch hẹn trong danh sách bên trái để hủy/dời lịch khám.' : 'Click on an appointment item in the left scheduler to cancel/reschedule.')}
                className="text-error font-bold text-body-sm flex items-center gap-xs hover:underline transition-colors"
              >
                <span className="material-symbols-outlined text-body-sm">cancel</span>
                {t.cancelReschedule}
              </button>
            </div>

            <form onSubmit={handleBookingConfirmSubmit} className="p-md space-y-md">
              <div>
                <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.patientTypeLabel}</label>
                {/* Custom Selectable Cards styled like Language settings */}
                <div className="grid grid-cols-2 gap-sm">
                  <label
                    className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${apptForm.patientType === 'new'
                      ? 'border-primary bg-primary-container/10 font-bold dark:border-primary-fixed-dim dark:bg-blue-950/20'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700'
                      }`}
                  >
                    <input
                      type="radio"
                      name="appt_patient_type"
                      className="sr-only"
                      checked={apptForm.patientType === 'new'}
                      onChange={() => setApptForm({ ...apptForm, patientType: 'new' })}
                    />
                    <span className="font-body-md text-body-md text-on-surface dark:text-white">{t.newPatRadio}</span>
                    {apptForm.patientType === 'new' ? (
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">check_circle</span>
                    ) : (
                      <span className="w-5 h-5 rounded-[9999px] border-2 border-outline dark:border-slate-600"></span>
                    )}
                  </label>

                  <label
                    className={`flex items-center justify-between p-sm border rounded-lg cursor-pointer transition-all ${apptForm.patientType === 'returning'
                      ? 'border-primary bg-primary-container/10 font-bold dark:border-primary-fixed-dim dark:bg-blue-950/20'
                      : 'border-outline-variant dark:border-slate-700 hover:bg-surface-container-low dark:hover:bg-slate-700'
                      }`}
                  >
                    <input
                      type="radio"
                      name="appt_patient_type"
                      className="sr-only"
                      checked={apptForm.patientType === 'returning'}
                      onChange={() => setApptForm({ ...apptForm, patientType: 'returning' })}
                    />
                    <span className="font-body-md text-body-md text-on-surface dark:text-white">{t.returningPatRadio}</span>
                    {apptForm.patientType === 'returning' ? (
                      <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">check_circle</span>
                    ) : (
                      <span className="w-5 h-5 rounded-[9999px] border-2 border-outline dark:border-slate-600"></span>
                    )}
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.patientNameField} *</label>
                <input
                  type="text"
                  required
                  placeholder={t.patientNamePlaceholder}
                  value={apptForm.name}
                  onChange={(e) => setApptForm({ ...apptForm, name: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all placeholder:text-outline/70 dark:placeholder:text-slate-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div>
                  <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.phoneNumberField} *</label>
                  <input
                    type="tel"
                    required
                    placeholder="09xx..."
                    value={apptForm.phone}
                    onChange={(e) => setApptForm({ ...apptForm, phone: e.target.value })}
                    className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all placeholder:text-outline/70 dark:placeholder:text-slate-500"
                  />
                </div>
                <div>
                  <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.apptTimeField}</label>
                  <select
                    value={apptForm.time}
                    onChange={(e) => setApptForm({ ...apptForm, time: e.target.value })}
                    className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all dark:bg-slate-800"
                  >
                    {['08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45', '11:00', '11:15', '11:30', '11:45', '12:00', '13:00', '13:30', '14:00', '14:30', '15:00'].map(tSlot => (
                      <option key={tSlot} value={tSlot} className="dark:bg-slate-800">{tSlot}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-label-md text-on-surface-variant dark:text-slate-400 mb-xs uppercase tracking-wider">{t.specialtyDoctorField}</label>
                <select
                  value={apptForm.doctor}
                  onChange={(e) => setApptForm({ ...apptForm, doctor: e.target.value })}
                  className="w-full border border-outline-variant dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-900 rounded-lg p-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none dark:text-white text-body-md transition-all dark:bg-slate-800"
                >
                  {doctorsList.map(doc => (
                    <option key={doc.id} value={doc.name} className="dark:bg-slate-800">{doc.name} ({doc.clinic.split(' - ')[1]})</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-sm rounded-lg font-label-md text-label-md shadow-md active:scale-95 hover:bg-surface-tint transition-all"
              >
                {t.confirmBookingBtn}
              </button>
            </form>
          </section>

          {/* Doctors List Registry Panel */}
          <section className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-lg shadow-sm overflow-hidden flex flex-col">
            <div className="p-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/60">
              <h3 className="font-bold text-primary dark:text-primary-fixed-dim text-body-lg uppercase tracking-wider">{t.doctorsClinicsHeader}</h3>
            </div>
            <div className="p-md space-y-sm">
              {doctorsList.map(doc => {
                const isAvail = doc.status === 'Trống';
                return (
                  <div
                    key={doc.id}
                    onClick={() => handleToggleDoctorStatus(doc.id)}
                    className="flex items-center gap-md p-sm hover:bg-surface-container-low dark:hover:bg-slate-700 border border-outline-variant/60 dark:border-slate-700/60 rounded-lg cursor-pointer transition-all hover:border-primary dark:hover:border-primary-fixed-dim hover:shadow-xs group"
                    title={lang === 'vi' ? 'Nhấp để đổi trạng thái bác sĩ' : 'Click to toggle availability'}
                  >
                    {doc.avatar ? (
                      <img className="w-12 h-12 rounded-[9999px] object-cover border-2 border-outline-variant dark:border-slate-700 flex-shrink-0 shadow-sm" alt={doc.name} src={doc.avatar} />
                    ) : (
                      <div className="w-12 h-12 rounded-[9999px] bg-primary-container/20 dark:bg-blue-950/40 border-2 border-outline-variant dark:border-slate-700 flex items-center justify-center flex-shrink-0 text-primary dark:text-primary-fixed-dim shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">medical_services</span>
                      </div>
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-[2px]">
                        <p className="font-bold text-on-surface dark:text-white text-body-md group-hover:text-primary dark:group-hover:text-primary-fixed-dim transition-colors truncate">
                          {doc.name}
                        </p>
                        <span className={`flex items-center gap-xs text-[10px] font-bold uppercase px-sm py-[2px] rounded border ${isAvail 
                          ? 'bg-secondary-container/20 border-secondary/20 text-on-secondary-container dark:text-teal-300' 
                          : 'bg-error-container/20 border-error/20 text-error'
                          }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isAvail ? 'bg-secondary dark:bg-teal-500' : 'bg-error'}`}></span>
                          {lang === 'vi' ? doc.status : doc.statusEn}
                        </span>
                      </div>
                      <p className="text-body-sm text-on-surface-variant dark:text-slate-400 truncate">{doc.clinic}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
