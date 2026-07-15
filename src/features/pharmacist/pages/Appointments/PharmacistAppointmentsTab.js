import React, { useState } from 'react';

export default function PharmacistAppointmentsTab({ lang, t }) {
  const [selectedAppointmentIndex, setSelectedAppointmentIndex] = useState(0);

  const [appointments, setAppointments] = useState([
    {
      id: '#APT-2901',
      time: '08:30 AM',
      date: '15/10/2023',
      name: 'Võ Hoàng Nam',
      patId: 'MF-98231',
      genderAge: lang === 'vi' ? 'Nam • 68 tuổi • Cao huyết áp' : 'Male • 68y • Hypertension',
      purpose: lang === 'vi' ? 'Tư vấn sử dụng thuốc' : 'Medication Consultation',
      purposeClass: 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 border-outline-variant dark:border-slate-600',
      status: 'SCHEDULED',
      statusText: lang === 'vi' ? 'Đã đặt lịch' : 'Scheduled',
      statusClass: 'bg-primary-container dark:bg-blue-950 text-on-primary-container dark:text-blue-400',
      room: lang === 'vi' ? 'P.02 - Khu Dược' : 'Room 02 - Pharmacy Dept.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCYIECHzS9qNhvKi16uMiNcBluFYcjp06KmDJaYJUpK9NLPWiXP38SVw7FsAJATS-rLcRSFDd_asa4qj-_LOFsPVKVPjWzz5fPN8xjaL_nKrD57qjuDy4KCtQjE4ryFQIbtssUdyR16M-wYBkj41uZnty6ynk3fA12All-lqVjKATDHtmue-9cz8jF-1QwEHVTt55ixXqySGvh4Xi4XpkWz-Efo57C2lRJEsWty9iN_2fLY3Glt2Rrp',
      notes: [
        lang === 'vi' ? 'Bệnh nhân Võ Hoàng Nam có tiền sử dị ứng với Penicillin. Cần kiểm tra kỹ đơn thuốc thay thế.' : 'Patient Vo Hoang Nam has a history of Penicillin allergy. Verify alternative medication prescriptions.',
        lang === 'vi' ? 'Nhắc bệnh nhân mang theo các loại thực phẩm chức năng đang sử dụng để dược sĩ đối soát.' : 'Remind patient to bring currently used dietary supplements for pharmacist cross-checking.'
      ],
      initials: 'VN',
      color: 'bg-primary-container text-on-primary-container'
    },
    {
      id: '#APT-3022',
      time: '09:15 AM',
      date: lang === 'vi' ? 'Hôm nay' : 'Today',
      name: 'Lê Thị Hạnh',
      patId: 'MF-44120',
      genderAge: lang === 'vi' ? 'Nữ • 29 tuổi • Viêm phế quản' : 'Female • 29y • Bronchitis',
      purpose: lang === 'vi' ? 'Nhận thuốc khẩn cấp' : 'Emergency Pickup',
      purposeClass: 'bg-error-container dark:bg-red-950/60 text-on-error-container dark:text-red-400 border-error/20 dark:border-red-800',
      status: 'PENDING',
      statusText: lang === 'vi' ? 'Đang chờ' : 'Pending',
      statusClass: 'bg-tertiary-fixed dark:bg-amber-950 text-on-tertiary-fixed dark:text-amber-400',
      room: lang === 'vi' ? 'Quầy nhận số 1' : 'Pickup Counter 1',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCWBx--muJr6FqcILr-lvj4712YIjEDVXqQKvIbKSG5TRx-kBu4nbxAeWZWT2nRVSROrVxf-O6j-90ZNMgM5Nvpn54rVEVG5Uofek8_3c_iULCSeWQZc7uPzXrKFNj2y-tSl0WwAeOxWsxjejTqpHr-f3imD3HvQCwCdi2S0VfsWznnrSOeAfZvA1BneHutXAyVSWQhS0AIS06MXC3UqpjSaYIiFWuYUdcFuKGQ_EJk4hpb_VZ5tPQ',
      notes: [
        lang === 'vi' ? 'Đơn thuốc kháng sinh khẩn cấp cần chuẩn bị nhanh chóng.' : 'Emergency antibiotic prescription needs fast preparation.'
      ],
      initials: 'LH',
      color: 'bg-error-container text-on-error-container'
    },
    {
      id: '#APT-2804',
      time: '08:00 AM',
      date: lang === 'vi' ? 'Hoàn thành' : 'Completed',
      name: 'Nguyễn Mạnh',
      patId: 'MF-77312',
      genderAge: lang === 'vi' ? 'Nam • 62 tuổi • Khớp gối' : 'Male • 62y • Knee Osteoarthritis',
      purpose: lang === 'vi' ? 'Tái cấp đơn' : 'Prescription Refill',
      purposeClass: 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 border-transparent',
      status: 'COMPLETED',
      statusText: lang === 'vi' ? 'Hoàn thành' : 'Completed',
      statusClass: 'bg-secondary-container dark:bg-teal-950 text-on-secondary-container dark:text-teal-400',
      room: lang === 'vi' ? 'P.02 - Khu Dược' : 'Room 02 - Pharmacy Dept.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWOKGr4eFw24ufFZ3OHijnUKu55NtKnmsXXr6jOsRucLnhGBvOlh3LxcSJ6hCu7uk6Qd0bOtENCvxawWyw91aY4BCV3EB_HoQAGmAA42pQF04JWk1f150FIMUTjmGLXDHMQN1iGw6wMiBlDulRGXk90v7Rhear2euEhROfCsUnJEmmEattQMDE8lKq_o73xfdtQHygRPCr09kHlWBj8UAs4Kz5Yg4kDHBZeE_HFA7pLp-9zi-evCwe',
      notes: [
        lang === 'vi' ? 'Đã tư vấn dùng thuốc khớp gối định kỳ và bổ sung Calci.' : 'Consultation for knee osteoarthritis meds and calcium completed.'
      ],
      initials: 'NM',
      color: 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
    },
    {
      id: '#APT-3140',
      time: '10:45 AM',
      date: '15/10/2023',
      name: 'Phạm Kim Chi',
      patId: 'MF-12093',
      genderAge: lang === 'vi' ? 'Nữ • 34 tuổi • Rối loạn nhịp' : 'Female • 34y • Arrhythmia',
      purpose: lang === 'vi' ? 'Kiểm tra tương tác thuốc' : 'Drug Interaction Check',
      purposeClass: 'bg-surface-container-high dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 border-outline-variant dark:border-slate-600',
      status: 'CONFIRMED',
      statusText: lang === 'vi' ? 'Đã xác nhận' : 'Confirmed',
      statusClass: 'bg-primary-container dark:bg-blue-950 text-on-primary-container dark:text-blue-400',
      room: lang === 'vi' ? 'Quầy nhận số 2' : 'Pickup Counter 2',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUkeNWod5k33bWhHL5OvPKYYEeQnoxQosiu9R5L5Bn7RMne8gG3iq9BlTS0P76KHQO0Ig-pTGqp4g_Ep6TGkpd1EaZg-TLrykXfh6Z2x6jD8y08m0Dz3dXem-0n1sFOXlUjXsGUxyxGJNlpGDtDSh8uI9VccmbYFafvxXueytKK2gEwvF_KWlI3cLNVBGYnIp0peOd4An709uAl6AdfMbwSpzvVPH01ZJD486qJVkTWHGm5AOEocNc',
      notes: [
        lang === 'vi' ? 'Đơn thuốc phức tạp có sử dụng nhiều thuốc chống đông máu.' : 'Complex prescription involving multiple anticoagulants.'
      ],
      initials: 'PK',
      color: 'bg-primary-container text-on-primary-container'
    }
  ]);

  const activeAppt = appointments[selectedAppointmentIndex];

  const handleStartConsultation = () => {
    alert(lang === 'vi' 
      ? `Đang khởi tạo phiên tư vấn thuốc trực tuyến cho bệnh nhân ${activeAppt.name}...`
      : `Initializing medication consultation session for ${activeAppt.name}...`
    );
  };

  return (
    <div className="space-y-lg text-left">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-md mb-8">
        <div>
          <h2 className="text-headline-xl font-headline-xl text-on-surface dark:text-white mb-xs">
            {lang === 'vi' ? 'Quản lý Lịch hẹn' : 'Manage Appointments'}
          </h2>
          <p className="text-body-lg text-on-surface-variant dark:text-slate-400">
            {lang === 'vi' ? 'Theo dõi và điều phối tư vấn thuốc cho bệnh nhân.' : 'Track and coordinate medication consultations for patients.'}
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert(lang === 'vi' ? 'Bộ lọc lịch hẹn...' : 'Appointments filters...')}
            className="flex items-center gap-2 px-4 py-2 border border-outline-variant dark:border-slate-700 rounded-lg text-on-surface dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined">filter_list</span>
            <span className="text-label-md font-label-md">{lang === 'vi' ? 'Bộ lọc' : 'Filters'}</span>
          </button>
          <button 
            onClick={() => alert(lang === 'vi' ? 'Tạo lịch tư vấn thuốc mới...' : 'Creating new consultation appointment...')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg shadow-sm hover:opacity-95 transition-opacity cursor-pointer border-none font-label-md text-label-md active:scale-95"
          >
            <span className="material-symbols-outlined">add</span>
            <span>{lang === 'vi' ? 'Tạo lịch mới' : 'Create Appointment'}</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 border border-outline-variant dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-on-surface-variant dark:text-slate-400">
            <span className="text-label-md uppercase tracking-wider">{lang === 'vi' ? 'Tổng hôm nay' : 'Total Today'}</span>
            <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim">event_note</span>
          </div>
          <div className="text-headline-lg font-headline-lg font-bold text-on-surface dark:text-white">24</div>
          <div className="text-body-sm text-on-secondary-container dark:text-teal-400 bg-secondary-container dark:bg-teal-950/40 px-2 py-0.5 rounded-full self-start">
            {lang === 'vi' ? '+12% so với hôm qua' : '+12% vs yesterday'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-outline-variant dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-on-surface-variant dark:text-slate-400">
            <span className="text-label-md uppercase tracking-wider">{lang === 'vi' ? 'Chờ nhận thuốc' : 'Pending Pickup'}</span>
            <span className="material-symbols-outlined text-amber-600 dark:text-amber-400">pending_actions</span>
          </div>
          <div className="text-headline-lg font-headline-lg font-bold text-on-surface dark:text-white">08</div>
          <div className="text-body-sm text-amber-600 dark:text-amber-400 font-medium">
            {lang === 'vi' ? 'Cần xử lý ngay' : 'Requires action'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-outline-variant dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-on-surface-variant dark:text-slate-400">
            <span className="text-label-md uppercase tracking-wider">{lang === 'vi' ? 'Tư vấn khẩn cấp' : 'Emergency Consultation'}</span>
            <span className="material-symbols-outlined text-error">emergency</span>
          </div>
          <div className="text-headline-lg font-headline-lg font-bold text-on-surface dark:text-white">02</div>
          <div className="text-body-sm text-error font-medium">
            {lang === 'vi' ? 'Bệnh nhân đang đợi' : 'Patients waiting'}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 border border-outline-variant dark:border-slate-700 rounded-xl flex flex-col gap-2 shadow-xs">
          <div className="flex justify-between items-center text-on-surface-variant dark:text-slate-400">
            <span className="text-label-md uppercase tracking-wider">{lang === 'vi' ? 'Tỉ lệ hoàn thành' : 'Completion Rate'}</span>
            <span className="material-symbols-outlined text-secondary dark:text-teal-400">check_circle</span>
          </div>
          <div className="text-headline-lg font-headline-lg font-bold text-on-surface dark:text-white">85%</div>
          <div className="w-full bg-surface-container-highest dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-secondary dark:bg-teal-500 h-full" style={{ width: '85%' }}></div>
          </div>
        </div>
      </div>

      {/* Appointment Content Area */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Calendar/List Tabs */}
        <div className="col-span-12 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center border-b border-outline-variant dark:border-slate-700 px-6 h-14 bg-surface-container-low dark:bg-slate-900/40">
            <div className="flex gap-8">
              <button className="h-14 flex items-center gap-2 text-primary dark:text-primary-fixed-dim border-b-2 border-primary dark:border-primary-fixed-dim font-bold text-label-md bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">view_list</span> 
                {lang === 'vi' ? 'Danh sách' : 'List View'}
              </button>
              <button 
                onClick={() => alert('Chuyển sang chế độ xem lịch biểu...')}
                className="h-14 flex items-center gap-2 text-on-surface-variant dark:text-slate-400 hover:text-on-surface dark:hover:text-white transition-colors text-label-md bg-transparent border-none cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">calendar_month</span> 
                {lang === 'vi' ? 'Lịch biểu' : 'Calendar'}
              </button>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <div className="flex bg-surface-container-highest dark:bg-slate-900 p-1 rounded-lg">
                <button className="px-3 py-1 bg-white dark:bg-slate-800 shadow-sm rounded-md text-label-md font-bold dark:text-white border-none cursor-pointer">
                  {lang === 'vi' ? 'Hôm nay' : 'Today'}
                </button>
                <button 
                  onClick={() => alert('Lọc theo tuần...')}
                  className="px-3 py-1 text-label-md text-on-surface-variant dark:text-slate-400 bg-transparent border-none cursor-pointer hover:text-on-surface dark:hover:text-white"
                >
                  {lang === 'vi' ? 'Tuần' : 'Week'}
                </button>
              </div>
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse text-body-md">
              <thead>
                <tr className="bg-surface-container-low dark:bg-slate-900 text-on-surface-variant dark:text-slate-400 font-label-md text-label-md border-b border-outline-variant dark:border-slate-700 uppercase">
                  <th className="px-6 py-4">{lang === 'vi' ? 'Thời gian' : 'Time'}</th>
                  <th className="px-6 py-4">{lang === 'vi' ? 'Bệnh nhân' : 'Patient'}</th>
                  <th className="px-6 py-4">{lang === 'vi' ? 'Mục đích' : 'Purpose'}</th>
                  <th className="px-6 py-4">{lang === 'vi' ? 'Trạng thái' : 'Status'}</th>
                  <th className="px-6 py-4 text-right pr-6">{lang === 'vi' ? 'Thao tác' : 'Action'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant dark:divide-slate-700 text-on-surface dark:text-slate-200">
                {appointments.map((appt, idx) => {
                  const isSelected = selectedAppointmentIndex === idx;
                  return (
                    <tr 
                      key={appt.id}
                      onClick={() => setSelectedAppointmentIndex(idx)}
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors cursor-pointer ${
                        isSelected ? 'bg-primary/5 dark:bg-slate-900/40 font-semibold' : ''
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="text-body-md font-bold text-on-surface dark:text-white">{appt.time}</div>
                        <div className="text-body-sm text-on-surface-variant dark:text-slate-400">{appt.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${appt.color}`}>
                            {appt.initials}
                          </div>
                          <div>
                            <div className="text-body-md font-bold text-on-surface dark:text-white">{appt.name}</div>
                            <div className="text-body-sm text-on-surface-variant dark:text-slate-400">ID: {appt.patId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${appt.purposeClass}`}>
                          {appt.purpose}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${appt.statusClass}`}>
                          {appt.status === 'PENDING' && <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>}
                          {appt.status === 'SCHEDULED' && <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-fixed-dim animate-pulse"></span>}
                          {appt.status === 'CONFIRMED' && <span className="w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-fixed-dim"></span>}
                          {appt.status === 'COMPLETED' && <span className="material-symbols-outlined text-[12px]">done</span>}
                          {appt.statusText}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right pr-6" onClick={(e) => e.stopPropagation()}>
                        {appt.status === 'PENDING' ? (
                          <button 
                            onClick={() => { setSelectedAppointmentIndex(idx); handleStartConsultation(); }}
                            className="px-3 py-1.5 bg-primary text-white rounded text-label-md font-bold hover:shadow-md transition-shadow border-none cursor-pointer active:scale-95"
                          >
                            {lang === 'vi' ? 'Bắt đầu xử lý' : 'Start Dispense'}
                          </button>
                        ) : appt.status === 'SCHEDULED' || appt.status === 'CONFIRMED' ? (
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => {
                                setSelectedAppointmentIndex(idx);
                                alert(lang === 'vi' ? 'Đã phê duyệt lịch hẹn!' : 'Appointment approved!');
                              }}
                              className="p-2 text-primary dark:text-primary-fixed-dim hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors bg-transparent border-none cursor-pointer" 
                              title={lang === 'vi' ? 'Xác nhận' : 'Confirm'}
                            >
                              <span className="material-symbols-outlined">check</span>
                            </button>
                            <button 
                              onClick={() => alert(lang === 'vi' ? 'Dời lịch hẹn...' : 'Rescheduling appointment...')}
                              className="p-2 text-on-surface-variant dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors bg-transparent border-none cursor-pointer" 
                              title={lang === 'vi' ? 'Dời lịch' : 'Reschedule'}
                            >
                              <span className="material-symbols-outlined">schedule_send</span>
                            </button>
                          </div>
                        ) : (
                          <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400">more_vert</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          
          <div className="px-6 py-4 bg-surface-container-low dark:bg-slate-900 border-t border-outline-variant dark:border-slate-700 flex justify-between items-center">
            <span className="text-body-sm text-on-surface-variant dark:text-slate-400">
              {lang === 'vi' ? 'Hiển thị 1 - 4 trong tổng số 24 lịch hẹn' : 'Showing 1 - 4 of 24 appointments'}
            </span>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold text-xs border-none cursor-pointer">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 bg-transparent border-none cursor-pointer font-medium text-xs">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 bg-transparent border-none cursor-pointer font-medium text-xs">3</button>
              <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 bg-transparent cursor-pointer">
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detail Grid: Appointment Quick View Card & Note Card & Chart Card */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Active Appointment Card */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-sm flex flex-col gap-4 text-left">
            <div className="flex justify-between items-start">
              <span className="text-label-md font-bold text-primary dark:text-primary-fixed-dim uppercase tracking-wider">
                {lang === 'vi' ? 'Đang tiến hành' : 'In Progress'}
              </span>
              <span className="text-body-sm text-on-surface-variant dark:text-slate-400">{activeAppt.id}</span>
            </div>
            <div className="flex gap-4">
              <img 
                className="w-16 h-16 rounded-xl object-cover border border-outline-variant dark:border-slate-700" 
                alt="Patient headshot" 
                src={activeAppt.avatar}
              />
              <div>
                <h4 className="text-headline-md font-headline-md font-bold text-on-surface dark:text-white">{activeAppt.name}</h4>
                <p className="text-body-sm text-on-surface-variant dark:text-slate-400">{apptDetailGenderAge(activeAppt)}</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-body-md text-on-surface dark:text-slate-200">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">history</span>
                <span>{lang === 'vi' ? `Thời gian: ${activeAppt.time} (Hôm nay)` : `Time: ${activeAppt.time} (Today)`}</span>
              </div>
              <div className="flex items-center gap-3 text-body-md text-on-surface dark:text-slate-200">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">medication</span>
                <span>{lang === 'vi' ? `Nội dung: ${activeAppt.purpose}` : `Purpose: ${activeAppt.purpose}`}</span>
              </div>
              <div className="flex items-center gap-3 text-body-md text-on-surface dark:text-slate-200">
                <span className="material-symbols-outlined text-primary dark:text-primary-fixed-dim text-[20px]">location_on</span>
                <span>{lang === 'vi' ? `Phòng tư vấn: ${apptDetailRoom(activeAppt)}` : `Location: ${activeAppt.room}`}</span>
              </div>
            </div>
            
            <div className="pt-4 grid grid-cols-2 gap-3 mt-auto">
              <button 
                onClick={handleStartConsultation}
                className="py-2.5 bg-primary text-white rounded-lg font-bold text-label-md hover:bg-primary-container transition-all cursor-pointer border-none active:scale-95"
              >
                {lang === 'vi' ? 'Bắt đầu tư vấn' : 'Start Consulting'}
              </button>
              <button 
                onClick={() => alert(lang === 'vi' ? `Đang mở hồ sơ bệnh án bệnh nhân ${activeAppt.name}...` : `Opening medical files of ${activeAppt.name}...`)}
                className="py-2.5 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 rounded-lg font-bold text-label-md hover:bg-slate-100 dark:hover:bg-slate-700 bg-transparent cursor-pointer transition-all active:scale-95"
              >
                {lang === 'vi' ? 'Xem hồ sơ' : 'View Profile'}
              </button>
            </div>
          </div>

          {/* Card 2: Note Card */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-sm overflow-hidden relative text-left flex flex-col">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-on-surface dark:text-white">
              <span className="material-symbols-outlined text-8xl">assignment</span>
            </div>
            <h4 className="text-label-md font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-4 tracking-wider">
              {lang === 'vi' ? 'Ghi chú quan trọng' : 'Critical Notes'}
            </h4>
            <ul className="space-y-4">
              {activeAppt.notes.map((note, i) => (
                <li key={i} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0"></div>
                  <p className="text-body-md text-on-surface dark:text-slate-200 leading-relaxed">{note}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Performance bar chart */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-6 shadow-sm text-left flex flex-col">
            <h4 className="text-label-md font-bold text-on-surface-variant dark:text-slate-400 uppercase mb-4 tracking-wider">
              {lang === 'vi' ? 'Hiệu suất tư vấn (Giờ)' : 'Consultations Performance (Hour)'}
            </h4>
            <div className="h-32 flex items-end justify-between gap-2 mt-auto">
              <div className="bg-primary/40 dark:bg-slate-700 w-full h-[30%] rounded-t-sm" title="08h: 2 ca"></div>
              <div className="bg-primary/40 dark:bg-slate-700 w-full h-[60%] rounded-t-sm" title="09h: 5 ca"></div>
              <div className="bg-primary dark:bg-teal-500 w-full h-[90%] rounded-t-sm" title="10h: 8 ca"></div>
              <div className="bg-primary/40 dark:bg-slate-700 w-full h-[45%] rounded-t-sm" title="11h: 4 ca"></div>
              <div className="bg-surface-container-highest dark:bg-slate-600 w-full h-[15%] rounded-t-sm" title="12h: 1 ca"></div>
              <div className="bg-primary/40 dark:bg-slate-700 w-full h-[55%] rounded-t-sm" title="13h: 5 ca"></div>
              <div className="bg-primary dark:bg-teal-500 w-full h-[75%] rounded-t-sm" title="14h: 7 ca"></div>
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-on-surface-variant dark:text-slate-500 font-bold uppercase">
              <span>08h</span>
              <span>10h</span>
              <span>12h</span>
              <span>14h</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );

  // Translation helpers
  function apptDetailGenderAge(appt) {
    if (lang === 'vi') return appt.genderAge;
    const parts = appt.genderAge.split(' • ');
    return `${parts[0]} • ${parts[1]} • ${parts[2]}`;
  }

  function apptDetailRoom(appt) {
    return appt.room;
  }
}
