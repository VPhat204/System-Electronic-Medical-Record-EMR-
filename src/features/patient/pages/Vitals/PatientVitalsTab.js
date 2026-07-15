import React, { useState } from 'react';

const vitalsHistory = [
  {
    id: 'V-001',
    date: '15/07/2026',
    time: '08:00 SA',
    systolic: 128,
    diastolic: 82,
    bpm: 74,
    temp: 36.8,
    spo2: 98,
    rr: 16,
    nurse: 'Điều dưỡng Nguyễn Thị Lan',
    alert: null,
  },
  {
    id: 'V-002',
    date: '14/07/2026',
    time: '08:00 SA',
    systolic: 132,
    diastolic: 85,
    bpm: 78,
    temp: 37.1,
    spo2: 97,
    rr: 17,
    nurse: 'Điều dưỡng Trần Văn Đức',
    alert: null,
  },
  {
    id: 'V-003',
    date: '13/07/2026',
    time: '08:00 SA',
    systolic: 142,
    diastolic: 90,
    bpm: 82,
    temp: 37.4,
    spo2: 96,
    rr: 18,
    nurse: 'Điều dưỡng Phạm Thị Hoa',
    alert: 'Huyết áp cao — Đã báo bác sĩ',
  },
  {
    id: 'V-004',
    date: '12/07/2026',
    time: '08:00 SA',
    systolic: 138,
    diastolic: 88,
    bpm: 80,
    temp: 37.2,
    spo2: 97,
    rr: 16,
    nurse: 'Điều dưỡng Nguyễn Thị Lan',
    alert: null,
  },
  {
    id: 'V-005',
    date: '11/07/2026',
    time: '08:00 SA',
    systolic: 145,
    diastolic: 92,
    bpm: 88,
    temp: 37.6,
    spo2: 95,
    rr: 20,
    nurse: 'Điều dưỡng Trần Văn Đức',
    alert: 'SpO2 thấp — Đã tăng oxy liều thấp',
  },
];

function VitalTrend({ values, color, height = 40 }) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 120;
  const h = height;
  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 8) - 4;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
      {values.map((v, i) => {
        const x = (i / (values.length - 1)) * w;
        const y = h - ((v - min) / range) * (h - 8) - 4;
        return <circle key={i} cx={x} cy={y} r="3" fill={color} />;
      })}
    </svg>
  );
}

export default function PatientVitalsTab({ lang, t }) {
  const [activeRange, setActiveRange] = useState('7d');

  const sortedHistory = [...vitalsHistory].reverse();
  const latest = vitalsHistory[0];

  const bpValues = sortedHistory.map(v => v.systolic);
  const bpmValues = sortedHistory.map(v => v.bpm);
  const spo2Values = sortedHistory.map(v => v.spo2);
  const tempValues = sortedHistory.map(v => v.temp);

  const getBPStatus = (sys, dia) => {
    if (sys < 120 && dia < 80) return { viLabel: 'Bình thường', enLabel: 'Normal', color: 'text-green-600 dark:text-green-400' };
    if (sys < 130 && dia < 80) return { viLabel: 'Hơi cao', enLabel: 'Elevated', color: 'text-amber-500 dark:text-amber-400' };
    return { viLabel: 'Cao', enLabel: 'High', color: 'text-red-500 dark:text-red-400' };
  };
  const bpStatus = getBPStatus(latest.systolic, latest.diastolic);

  const summaryCards = [
    {
      label: lang === 'vi' ? 'Huyết áp' : 'Blood Pressure',
      value: `${latest.systolic}/${latest.diastolic}`,
      unit: 'mmHg',
      icon: 'ecg_heart',
      iconColor: 'text-red-500',
      bg: 'bg-red-50 dark:bg-red-900/10',
      border: 'border-red-200 dark:border-red-800',
      trend: bpValues,
      trendColor: '#ef4444',
      sub: bpStatus[lang === 'vi' ? 'viLabel' : 'enLabel'],
      subColor: bpStatus.color,
    },
    {
      label: lang === 'vi' ? 'Nhịp tim' : 'Heart Rate',
      value: latest.bpm,
      unit: 'bpm',
      icon: 'monitor_heart',
      iconColor: 'text-pink-500',
      bg: 'bg-pink-50 dark:bg-pink-900/10',
      border: 'border-pink-200 dark:border-pink-800',
      trend: bpmValues,
      trendColor: '#ec4899',
      sub: latest.bpm < 100 && latest.bpm > 60 ? (lang === 'vi' ? 'Bình thường' : 'Normal') : (lang === 'vi' ? 'Bất thường' : 'Abnormal'),
      subColor: latest.bpm < 100 && latest.bpm > 60 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400',
    },
    {
      label: 'SpO₂',
      value: latest.spo2,
      unit: '%',
      icon: 'air',
      iconColor: 'text-sky-500',
      bg: 'bg-sky-50 dark:bg-sky-900/10',
      border: 'border-sky-200 dark:border-sky-800',
      trend: spo2Values,
      trendColor: '#0ea5e9',
      sub: latest.spo2 >= 95 ? (lang === 'vi' ? 'Bình thường' : 'Normal') : (lang === 'vi' ? 'Thấp' : 'Low'),
      subColor: latest.spo2 >= 95 ? 'text-green-600 dark:text-green-400' : 'text-red-500 dark:text-red-400',
    },
    {
      label: lang === 'vi' ? 'Nhiệt độ' : 'Temperature',
      value: latest.temp,
      unit: '°C',
      icon: 'thermometer',
      iconColor: 'text-orange-500',
      bg: 'bg-orange-50 dark:bg-orange-900/10',
      border: 'border-orange-200 dark:border-orange-800',
      trend: tempValues,
      trendColor: '#f97316',
      sub: latest.temp < 37.5 ? (lang === 'vi' ? 'Bình thường' : 'Normal') : (lang === 'vi' ? 'Sốt nhẹ' : 'Low Fever'),
      subColor: latest.temp < 37.5 ? 'text-green-600 dark:text-green-400' : 'text-amber-500 dark:text-amber-400',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface dark:text-white">
          {lang === 'vi' ? 'Chỉ Số Sinh Tồn Của Tôi' : 'My Vital Signs'}
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 mt-1">
          {lang === 'vi' ? 'Theo dõi lịch sử chỉ số sức khỏe được điều dưỡng ghi nhận trong quá trình điều trị' : 'Track your health metrics recorded by nurses during your treatment'}
        </p>
      </div>

      {/* Latest Reading Notice */}
      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/30 rounded-xl p-4 flex items-center gap-3">
        <span className="material-symbols-outlined text-primary text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>update</span>
        <div>
          <p className="text-sm font-semibold text-primary dark:text-primary-fixed-dim">
            {lang === 'vi' ? 'Đo lần gần nhất' : 'Latest Reading'}
          </p>
          <p className="text-xs text-on-surface-variant dark:text-slate-400">
            {latest.date} · {latest.time} — {latest.nurse}
          </p>
        </div>
      </div>

      {/* Summary Vitals Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map(card => (
          <div key={card.label} className={'rounded-xl border p-4 ' + card.bg + ' ' + card.border}>
            <div className="flex items-center justify-between mb-2">
              <span className={'material-symbols-outlined text-[20px] ' + card.iconColor} style={{ fontVariationSettings: "'FILL' 1" }}>
                {card.icon}
              </span>
              <VitalTrend values={card.trend} color={card.trendColor} height={30} />
            </div>
            <p className="text-2xl font-black text-on-surface dark:text-white">{card.value} <span className="text-sm font-normal text-on-surface-variant dark:text-slate-400">{card.unit}</span></p>
            <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-0.5">{card.label}</p>
            <p className={'text-[11px] font-semibold mt-1 ' + card.subColor}>{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Range Selector */}
      <div className="flex items-center justify-between">
        <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface dark:text-white">
          {lang === 'vi' ? 'Lịch sử đo' : 'Measurement History'}
        </h3>
        <div className="flex gap-1 bg-surface-container-low dark:bg-slate-800 rounded-lg p-1">
          {['7d', '14d', '30d'].map(r => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={'px-3 py-1 rounded text-xs font-semibold transition-colors ' + (activeRange === r ? 'bg-white dark:bg-slate-700 text-on-surface dark:text-white shadow-sm' : 'text-on-surface-variant dark:text-slate-400')}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white dark:bg-slate-900 border border-outline-variant dark:border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-container-low dark:bg-slate-800 border-b border-outline-variant dark:border-slate-700">
              <tr>
                {[
                  lang === 'vi' ? 'Ngày / Giờ' : 'Date / Time',
                  lang === 'vi' ? 'Huyết áp' : 'Blood Pressure',
                  lang === 'vi' ? 'Nhịp tim' : 'Heart Rate',
                  'SpO₂',
                  lang === 'vi' ? 'Nhiệt độ' : 'Temperature',
                  lang === 'vi' ? 'Nhịp thở' : 'Resp Rate',
                  lang === 'vi' ? 'Điều dưỡng' : 'Nurse',
                ].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-semibold text-on-surface-variant dark:text-slate-400 text-left whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant dark:divide-slate-800">
              {vitalsHistory.map(v => (
                <React.Fragment key={v.id}>
                  <tr className={'transition-colors ' + (v.alert ? 'bg-amber-50/50 dark:bg-amber-900/5' : 'hover:bg-surface-container-low dark:hover:bg-slate-800/50')}>
                    <td className="px-4 py-3 text-xs text-on-surface dark:text-white whitespace-nowrap">
                      <p className="font-semibold">{v.date}</p>
                      <p className="text-on-surface-variant dark:text-slate-400">{v.time}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={'font-bold text-sm ' + (v.systolic >= 140 ? 'text-red-600 dark:text-red-400' : 'text-on-surface dark:text-white')}>
                        {v.systolic}/{v.diastolic}
                      </span>
                      <span className="text-xs text-on-surface-variant dark:text-slate-400 ml-1">mmHg</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-on-surface dark:text-white">{v.bpm}</span>
                      <span className="text-xs text-on-surface-variant dark:text-slate-400 ml-1">bpm</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={'font-semibold ' + (v.spo2 < 95 ? 'text-red-600 dark:text-red-400' : 'text-on-surface dark:text-white')}>{v.spo2}%</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={'font-semibold ' + (v.temp >= 37.5 ? 'text-amber-600 dark:text-amber-400' : 'text-on-surface dark:text-white')}>{v.temp}°C</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-on-surface dark:text-white">{v.rr}</span>
                      <span className="text-xs text-on-surface-variant dark:text-slate-400 ml-1">/min</span>
                    </td>
                    <td className="px-4 py-3 text-xs text-on-surface-variant dark:text-slate-400">{v.nurse}</td>
                  </tr>
                  {v.alert && (
                    <tr className="bg-amber-50/50 dark:bg-amber-900/5">
                      <td colSpan={7} className="px-4 pb-2">
                        <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                          <span className="material-symbols-outlined text-[14px]">info</span>
                          {v.alert}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Notice */}
      <div className="bg-surface-container-low dark:bg-slate-800 rounded-xl p-4 flex items-start gap-3">
        <span className="material-symbols-outlined text-on-surface-variant dark:text-slate-400 text-[20px] mt-0.5">info</span>
        <p className="text-xs text-on-surface-variant dark:text-slate-400">
          {lang === 'vi'
            ? 'Các chỉ số sinh tồn được ghi nhận bởi đội ngũ điều dưỡng trong mỗi ca trực. Nếu có thắc mắc về kết quả, vui lòng liên hệ điều dưỡng phụ trách hoặc bác sĩ điều trị.'
            : 'Vital signs are recorded by nursing staff during each shift. If you have questions about your readings, please contact your assigned nurse or attending physician.'}
        </p>
      </div>
    </div>
  );
}
