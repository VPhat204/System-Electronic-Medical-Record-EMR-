import React from 'react';

export default function UserPagination({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  startIndex,
  endIndex,
  totalItems,
  totalPages,
  lang
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-md p-md bg-white dark:bg-slate-800 border-t border-outline-variant dark:border-slate-700/60 text-body-sm font-semibold select-none text-on-surface-variant dark:text-slate-400">
      <div className="flex items-center gap-md">
        <span>
          {lang === 'vi'
            ? `Hiển thị ${startIndex + 1}-${endIndex} trong tổng số ${totalItems} người dùng`
            : `Showing ${startIndex + 1}-${endIndex} of ${totalItems} users`}
        </span>
        <div className="flex items-center gap-xs">
          <span>{lang === 'vi' ? 'Số dòng:' : 'Show:'}</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded px-sm py-xs text-body-sm font-semibold dark:text-white outline-none focus:ring-1 focus:ring-primary cursor-pointer"
          >
            <option value={5}>5</option>
            <option value={15}>15</option>
            <option value={25}>25</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-sm">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1 || totalPages <= 1}
          className="p-xs border border-outline-variant dark:border-slate-700 rounded disabled:opacity-50 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <div className="flex items-center gap-xs select-none">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 flex items-center justify-center rounded font-label-md transition-colors cursor-pointer ${
                currentPage === page
                  ? 'bg-primary text-on-primary font-bold'
                  : 'hover:bg-surface-container-low dark:hover:bg-slate-800 dark:text-white font-semibold'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages <= 1}
          className="p-xs border border-outline-variant dark:border-slate-700 rounded disabled:opacity-50 hover:bg-surface-container-low dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
