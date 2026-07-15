import React from 'react';

export default function DoctorAppointmentsTab({
  lang,
  t,
  calendarMode,
  setCalendarMode,
  handleBookAppointment,
  totalPatientsCount,
  confirmedCount,
  pendingCount,
  cancelledCount,
  calMonth,
  setCalMonth,
  calYear,
  setCalYear,
  selectedDay,
  setSelectedDay,
  agenda,
  setAgenda,
  daysInMonth,
  startDayOfWeek,
  filteredAgenda,
}) {
  return (
    <>
      {/* Breadcrumbs & Header Section */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md text-left">
        <div>
          <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white">{lang === 'vi' ? 'Quản lý lịch hẹn' : 'Appointments'}</h2>
        </div>

        <div className="flex gap-md w-fit">
          <div className="bg-surface-container dark:bg-slate-800 rounded-lg p-base flex border border-outline-variant dark:border-slate-700">
            <button
              onClick={() => setCalendarMode('Monthly')}
              className={`px-md py-xs text-label-md font-label-md rounded transition-all ${calendarMode === 'Monthly'
                ? 'bg-white dark:bg-slate-700 clinical-shadow text-primary dark:text-white font-bold'
                : 'text-outline dark:text-slate-400 hover:text-on-surface'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCalendarMode('Weekly')}
              className={`px-md py-xs text-label-md font-label-md rounded transition-all ${calendarMode === 'Weekly'
                ? 'bg-white dark:bg-slate-700 clinical-shadow text-primary dark:text-white font-bold'
                : 'text-outline dark:text-slate-400 hover:text-on-surface'
                }`}
            >
              Weekly
            </button>
          </div>

          <button
            onClick={handleBookAppointment}
            className="bg-primary hover:bg-primary-container text-white px-lg py-sm font-label-md text-label-md rounded-lg flex items-center gap-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">event</span>
            {lang === 'vi' ? 'Đặt Lịch khám' : 'Book Appointment'}
          </button>
        </div>
      </div>

      {/* Dynamic Highlights Summary Grid (Full 12 cols width) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter text-left">
        {/* Total Patients */}
        <div className="bg-primary/5 dark:bg-slate-800 p-md border border-primary/20 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-sm text-primary dark:text-primary-fixed-dim mb-sm">
            <span className="material-symbols-outlined text-[20px]">groups</span>
            <span className="text-label-md font-label-md">TOTAL PATIENTS</span>
          </div>
          <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{totalPatientsCount}</p>
          <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Lượt khám hoạt động trong tháng' : 'Active appointments this month'}
          </p>
        </div>

        {/* Confirmed */}
        <div className="bg-secondary/5 dark:bg-slate-800 p-md border border-secondary/20 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-sm text-secondary dark:text-teal-400 mb-sm">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span className="text-label-md font-label-md">CONFIRMED</span>
          </div>
          <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{confirmedCount}</p>
          <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Đã xác nhận lịch hẹn' : 'Confirmed bookings'}
          </p>
        </div>

        {/* Pending */}
        <div className="bg-tertiary-container/10 dark:bg-slate-800 p-md border border-tertiary-container/30 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-sm text-tertiary dark:text-amber-500 mb-sm">
            <span className="material-symbols-outlined text-[20px]">pending_actions</span>
            <span className="text-label-md font-label-md">PENDING</span>
          </div>
          <p className="text-headline-lg font-headline-lg text-on-surface dark:text-white">{pendingCount}</p>
          <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Đang chờ xử lý' : 'Awaiting confirmation'}
          </p>
        </div>

        {/* Cancelled */}
        <div className="bg-error-container/10 dark:bg-slate-800 p-md border border-error/20 dark:border-slate-700 rounded-xl">
          <div className="flex items-center gap-sm text-error mb-sm">
            <span className="material-symbols-outlined text-[20px]">cancel</span>
            <span className="text-label-md font-label-md">CANCELLED</span>
          </div>
          <p className="text-headline-lg font-headline-lg text-error">{cancelledCount}</p>
          <p className="text-body-sm font-body-sm text-outline dark:text-slate-400">
            {lang === 'vi' ? 'Số ca đã hủy hẹn' : 'Cancelled appointments'}
          </p>
        </div>
      </div>

      {/* Dashboard Grid Layout */}
      <div className="grid grid-cols-12 gap-gutter items-stretch">

        {/* Left Side: Calendar View (8 Cols) */}
        <section className="col-span-12 lg:col-span-8 flex flex-col">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col h-full">

            {/* Calendar Month Header */}
            <div className="p-md flex justify-between items-center border-b border-outline-variant dark:border-slate-700 bg-surface dark:bg-slate-900/50">
              <div className="flex items-center gap-md">
                {/* Month Selection */}
                <select
                  value={calMonth}
                  onChange={(e) => {
                    const newM = parseInt(e.target.value);
                    setCalMonth(newM);
                    const maxDays = new Date(calYear, newM + 1, 0).getDate();
                    if (selectedDay > maxDays) {
                      setSelectedDay(maxDays);
                    }
                  }}
                  className="px-md py-xs bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded text-body-md font-bold text-on-surface dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                >
                  {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((mName, i) => {
                    const mNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
                    return (
                      <option key={i} value={i}>
                        {lang === 'vi' ? mNamesVi[i] : mName}
                      </option>
                    );
                  })}
                </select>

                {/* Year Selection */}
                <select
                  value={calYear}
                  onChange={(e) => {
                    const newY = parseInt(e.target.value);
                    setCalYear(newY);
                    const maxDays = new Date(newY, calMonth + 1, 0).getDate();
                    if (selectedDay > maxDays) {
                      setSelectedDay(maxDays);
                    }
                  }}
                  className="px-md py-xs bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded text-body-md font-bold text-on-surface dark:text-slate-200 outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                >
                  {Array.from({ length: 11 }, (_, i) => {
                    const yr = 2020 + i;
                    return (
                      <option key={yr} value={yr}>
                        {yr}
                      </option>
                    );
                  })}
                </select>

                {/* Chevrons to change month */}
                <div className="flex border border-outline-variant dark:border-slate-700 rounded bg-white dark:bg-slate-800">
                  <button
                    onClick={() => {
                      setCalMonth(prev => {
                        if (prev === 0) {
                          setCalYear(y => y - 1);
                          return 11;
                        }
                        return prev - 1;
                      });
                    }}
                    className="p-1 border-r border-outline-variant dark:border-slate-700 hover:bg-surface-container dark:hover:bg-slate-700"
                    title={lang === 'vi' ? 'Tháng trước' : 'Previous Month'}
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                  </button>
                  <button
                    onClick={() => {
                      setCalMonth(prev => {
                        if (prev === 11) {
                          setCalYear(y => y + 1);
                          return 0;
                        }
                        return prev + 1;
                      });
                    }}
                    className="p-1 hover:bg-surface-container dark:hover:bg-slate-700"
                    title={lang === 'vi' ? 'Tháng sau' : 'Next Month'}
                  >
                    <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  const today = new Date();
                  setCalMonth(today.getMonth());
                  setCalYear(today.getFullYear());
                  setSelectedDay(today.getDate());
                }}
                className="text-primary dark:text-primary-fixed-dim text-label-md font-label-md hover:underline"
              >
                {lang === 'vi' ? 'Hôm nay' : 'Today'}
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 text-center bg-outline-variant dark:bg-slate-700 gap-px flex-grow">

              {/* Weekday Titles */}
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                <div key={day} className="bg-surface-container dark:bg-slate-900/85 py-2 text-label-md font-label-md text-outline dark:text-slate-400">
                  {day}
                </div>
              ))}

              {/* Previous month padding days */}
              {Array.from({ length: startDayOfWeek }, (_, i) => {
                const prevMonthDays = new Date(calYear, calMonth, 0).getDate();
                const dNum = prevMonthDays - startDayOfWeek + 1 + i;
                return (
                  <div key={`prev-${dNum}`} className="bg-slate-50 dark:bg-slate-900/40 p-2 text-right text-outline opacity-40 text-body-sm select-none min-h-[90px] flex flex-col justify-between">
                    <span>{dNum}</span>
                    <div className="mt-1"></div>
                  </div>
                );
              })}

              {/* Current Month Active Days */}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const dayNum = i + 1;
                const isSelected = selectedDay === dayNum;
                const dayEvents = agenda.filter(ev =>
                  ev.day === dayNum &&
                  (ev.month === undefined || ev.month === calMonth) &&
                  (ev.year === undefined || ev.year === calYear)
                );

                return (
                  <div
                    key={`curr-${dayNum}`}
                    onClick={() => setSelectedDay(dayNum)}
                    className={`p-2 text-right text-body-sm flex flex-col justify-between transition-all cursor-pointer relative min-h-[90px] ${isSelected
                      ? 'bg-primary-fixed/20 dark:bg-slate-700 ring-2 ring-primary dark:ring-primary-fixed-dim ring-inset'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      }`}
                  >
                    <span className={`font-bold ${isSelected ? 'text-primary dark:text-white' : 'text-on-surface dark:text-slate-200'}`}>
                      {dayNum}
                    </span>
                    <div className="mt-1 space-y-1 text-left overflow-y-auto no-scrollbar max-h-[60px]">
                      {dayEvents.slice(0, 3).map(ev => {
                        const isErr = ev.status === 'Cancelled' || ev.type.toLowerCase().includes('emergency');
                        const isPending = ev.status === 'Pending';
                        return (
                          <div
                            key={ev.id}
                            className={`p-0.5 rounded border-l-2 text-[9px] leading-tight font-bold truncate ${isErr
                              ? 'bg-error/10 text-error border-error dark:bg-red-950/30'
                              : isPending
                                ? 'bg-tertiary-fixed/30 text-tertiary border-tertiary dark:bg-amber-950/20'
                                : 'bg-primary/10 text-primary border-primary dark:bg-slate-900/50 dark:text-primary-fixed-dim'
                              }`}
                          >
                            {ev.time.split(' ')[0]} {ev.patient}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Next month padding days */}
              {Array.from({ length: (Math.ceil((startDayOfWeek + daysInMonth) / 7) * 7) - (startDayOfWeek + daysInMonth) }, (_, i) => {
                const dNum = i + 1;
                return (
                  <div key={`next-${dNum}`} className="bg-slate-50 dark:bg-slate-900/40 p-2 text-right text-outline opacity-40 text-body-sm select-none min-h-[90px] flex flex-col justify-between">
                    <span>{dNum}</span>
                    <div className="mt-1"></div>
                  </div>
                );
              })}

            </div>
          </div>
        </section>

        {/* Right Side: Daily Agenda List (4 Cols) */}
        <section className="col-span-12 lg:col-span-4 flex flex-col">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden clinical-shadow flex flex-col h-full text-left">

            {/* Agenda Header */}
            <div className="p-md border-b border-outline-variant dark:border-slate-700 flex justify-between items-center bg-surface dark:bg-slate-900/50">
              <h3 className="text-headline-md font-headline-md text-on-surface dark:text-white">Daily Agenda</h3>
              <span className="text-label-md font-label-md text-outline dark:text-slate-400 uppercase font-bold">
                {(() => {
                  const mNamesVi = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
                  const mNamesEn = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
                  return lang === 'vi' ? `${mNamesVi[calMonth]} ${selectedDay}, ${calYear}` : `${mNamesEn[calMonth]} ${selectedDay}, ${calYear}`;
                })()}
              </span>
            </div>

            {/* Scrollable list area */}
            <div className="flex-grow overflow-y-auto p-md space-y-md h-[400px] lg:h-0 min-h-[350px]">
              {filteredAgenda.map(item => {
                const isConfirmed = item.status === 'Confirmed';
                const isPending = item.status === 'Pending';
                const isCancelled = item.status === 'Cancelled';

                return (
                  <div
                    key={item.id}
                    className={`p-md border border-outline-variant dark:border-slate-700 rounded-lg hover:border-primary dark:hover:border-primary-fixed-dim transition-colors cursor-pointer group ${isCancelled ? 'opacity-50' : ''
                      }`}
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

                    <div className="mt-md flex items-center gap-sm pt-sm border-t border-outline-variant/30 dark:border-slate-700">
                      <img className="w-6 h-6 rounded-full object-cover" alt={item.doctor} src={item.avatar} />
                      <span className="text-label-md font-label-md text-outline dark:text-slate-400">{item.doctor}</span>
                    </div>
                  </div>
                );
              })}

              {filteredAgenda.length === 0 && (
                <div className="py-xl text-center text-on-surface-variant dark:text-slate-400 h-full flex flex-col justify-center items-center">
                  <span className="material-symbols-outlined text-[48px] text-slate-300 dark:text-slate-600 mb-md">
                    calendar_today
                  </span>
                  <p className="font-body-md">{lang === 'vi' ? 'Không có lịch hẹn nào cho ngày này.' : 'No appointments registered for this day.'}</p>
                </div>
              )}
            </div>

            <div className="p-md bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 mt-auto">
              <button
                onClick={() => alert(lang === 'vi' ? 'Xem danh sách lịch hẹn chi tiết' : 'View detailed list of appointments')}
                className="w-full border border-primary dark:border-primary-fixed-dim text-primary dark:text-primary-fixed-dim py-sm font-label-md text-label-md rounded-lg hover:bg-primary/5 transition-colors"
              >
                {lang === 'vi' ? 'Xem Danh Sách Chi Tiết' : 'View Detailed List'}
              </button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
