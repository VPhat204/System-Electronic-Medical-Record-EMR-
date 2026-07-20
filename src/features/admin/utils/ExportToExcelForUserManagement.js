import XLSX from 'xlsx-js-style';

export const exportToExcel = (filteredUsers, lang) => {
  const headers = [
    'STT',
    lang === 'vi' ? 'Họ và tên' : 'Full Name',
    lang === 'vi' ? 'Email' : 'Email Address',
    lang === 'vi' ? 'Vai trò' : 'Role',
    lang === 'vi' ? 'Khoa / Phòng' : 'Department',
    lang === 'vi' ? 'Trạng thái' : 'Status',
    lang === 'vi' ? 'Số điện thoại' : 'Phone Number'
  ];

  // Helper function to map role into Vietnamese
  const getRoleDisplayName = (role, currentLang) => {
    if (!role) return '';
    if (currentLang !== 'vi') {
      return role.charAt(0).toUpperCase() + role.slice(1);
    }
    const roleMap = {
      admin: 'Quản trị viên',
      doctor: 'Bác sĩ',
      nurse: 'Điều dưỡng',
      receptionist: 'Lễ tân',
      pharmacist: 'Dược sĩ',
      patient: 'Bệnh nhân',
      guest: 'Khách'
    };
    return roleMap[role.toLowerCase()] || role;
  };

  const rows = filteredUsers.map((user, idx) => [
    idx + 1,
    user.fullName || user.name || '',
    user.email || '',
    getRoleDisplayName(user.role, lang),
    user.dept || '-',
    lang === 'vi' ? user.status || '' : user.statusEn || user.status || '',
    user.phone || '-'
  ]);

  // Combine headers and rows
  const data = [headers, ...rows];

  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Set style definitions matching client standards:
  // Header: 14pt Times New Roman, bold, center aligned
  const headerStyle = {
    font: {
      name: 'Times New Roman',
      sz: 14,
      bold: true
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    },
    border: {
      top: { style: 'thin', color: { rgb: 'CCCCCC' } },
      bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
      left: { style: 'thin', color: { rgb: 'CCCCCC' } },
      right: { style: 'thin', color: { rgb: 'CCCCCC' } }
    },
    fill: {
      fgColor: { rgb: 'F2F2F2' }
    }
  };

  // Content: 13pt Times New Roman, center aligned
  const cellStyle = {
    font: {
      name: 'Times New Roman',
      sz: 13
    },
    alignment: {
      horizontal: 'center',
      vertical: 'center'
    },
    border: {
      top: { style: 'thin', color: { rgb: 'CCCCCC' } },
      bottom: { style: 'thin', color: { rgb: 'CCCCCC' } },
      left: { style: 'thin', color: { rgb: 'CCCCCC' } },
      right: { style: 'thin', color: { rgb: 'CCCCCC' } }
    }
  };

  // Walk through the worksheet cells and apply styles
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
      const cell = ws[cellRef];
      if (!cell) continue;

      if (R === 0) {
        cell.s = headerStyle;
      } else {
        cell.s = cellStyle;
      }
    }
  }

  // Set grid column widths
  ws['!cols'] = [
    { wch: 8 },  // STT
    { wch: 25 }, // Họ và tên
    { wch: 30 }, // Email
    { wch: 18 }, // Vai trò
    { wch: 22 }, // Khoa / Phòng
    { wch: 15 }, // Trạng thái
    { wch: 18 }  // Số điện thoại
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Danh sach tai khoan');

  // Save as real binary XLSX
  XLSX.writeFile(wb, 'DS_NguoiDung.xlsx');
};
