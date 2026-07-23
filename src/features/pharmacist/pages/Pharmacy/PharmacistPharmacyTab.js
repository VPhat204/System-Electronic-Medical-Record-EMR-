import React, { useState, useEffect, useMemo } from 'react';
import prescriptionService from '../../../../shared/services/prescriptionService';

const localTranslations = {
  vi: {
    title: 'Quản Lý Kho Dược Phẩm',
    subtitle: 'Trạng thái tồn kho và theo dõi thuốc thời gian thực.',
    lowStock: 'Hết/Sắp hết',
    totalValue: 'Tổng giá trị',
    searchPlaceholder: 'Tìm kiếm tên thuốc, SKU hoặc lô...',
    addNewMedicine: 'Thêm Thuốc Mới',
    exportCsv: 'Xuất CSV',
    filterCategory: 'Tất cả danh mục',
    filterStatus: 'Tất cả trạng thái',
    filterExpiry: 'Hạn dùng: Tất cả',
    statusInStock: 'CÒN HÀNG',
    statusLowStock: 'CẦN NHẬP',
    statusExpiringSoon: 'SẮP HẾT HẠN',
    statusOutOfStock: 'HẾT HÀNG',
    tableMedicineName: 'Tên Thuốc',
    tableCategory: 'Danh mục',
    tableSku: 'SKU / Lô',
    tableQuantity: 'Số lượng',
    tableExpiry: 'Hạn dùng',
    tablePrice: 'Đơn giá',
    tableStatus: 'Trạng thái',
    tableActions: 'Hành động',
    reorderThresholdText: 'Ngưỡng đặt hàng',
    expiresDays: 'Hết hạn sau {days} ngày',
    showingText: 'Hiển thị {count} trên tổng số {total} loại thuốc',
    supplyTrend: 'Xu hướng Cung ứng',
    nextAuditDate: 'Ngày kiểm kho tiếp theo',
    auditWarning: 'Yêu cầu tuân thủ kiểm kho sau {days} ngày nữa.',
    quickTip: 'Mẹo nhanh',
    quickTipContent: 'Sử dụng máy quét mã vạch tích hợp trên ứng dụng di động để đối soát kho nhanh hơn.',
    modalAddTitle: 'Thêm Dược Phẩm Mới',
    modalEditTitle: 'Chỉnh Sửa Dược Phẩm',
    save: 'Lưu',
    cancel: 'Hủy',
    name: 'Tên thuốc',
    formType: 'Dạng bào chế (ví dụ: Viên nang, Viên nén, Lọ)',
    category: 'Danh mục',
    sku: 'SKU / Lô',
    qty: 'Số lượng',
    threshold: 'Ngưỡng báo cần nhập',
    expiry: 'Hạn sử dụng',
    price: 'Đơn giá ($)',
    actionConfirmDelete: 'Bạn có chắc chắn muốn xóa thuốc này khỏi hệ thống?',
    items: 'mặt hàng',
    categories: {
      Antibiotics: 'Kháng sinh',
      Painkillers: 'Giảm đau',
      Cardiovascular: 'Tim mạch',
      Respiratory: 'Hô hấp',
      Endocrine: 'Nội tiết'
    },
    statusOptions: {
      all: 'Tất cả trạng thái',
      inStock: 'Còn hàng',
      lowStock: 'Cần nhập',
      outOfStock: 'Hết hàng'
    },
    expiryOptions: {
      any: 'Hạn dùng: Tất cả',
      under30: 'Hết hạn dưới 30 ngày',
      under90: 'Hết hạn dưới 90 ngày'
    }
  },
  en: {
    title: 'Inventory Management',
    subtitle: 'Real-time medication stock status and tracking.',
    lowStock: 'Low Stock',
    totalValue: 'Total Value',
    searchPlaceholder: 'Search medicine names or SKUs...',
    addNewMedicine: 'Add New Medicine',
    exportCsv: 'Export CSV',
    filterCategory: 'All Categories',
    filterStatus: 'All Stock Status',
    filterExpiry: 'Expiry: Any',
    statusInStock: 'IN STOCK',
    statusLowStock: 'LOW STOCK',
    statusExpiringSoon: 'EXPIRING SOON',
    statusOutOfStock: 'OUT OF STOCK',
    tableMedicineName: 'Medicine Name',
    tableCategory: 'Category',
    tableSku: 'SKU / Batch',
    tableQuantity: 'Quantity',
    tableExpiry: 'Expiry Date',
    tablePrice: 'Unit Price',
    tableStatus: 'Status',
    tableActions: 'Actions',
    reorderThresholdText: 'Reorder threshold',
    expiresDays: 'Expires in {days} days',
    showingText: 'Showing {count} of {total} items',
    supplyTrend: 'Supply Trend',
    nextAuditDate: 'Next Audit Date',
    auditWarning: 'Audit compliance required in {days} days.',
    quickTip: 'Quick Tip',
    quickTipContent: 'Use the barcode scanner integrated in the mobile app for faster inventory reconciliation.',
    modalAddTitle: 'Add New Medication',
    modalEditTitle: 'Edit Medication',
    save: 'Save',
    cancel: 'Cancel',
    name: 'Medicine Name',
    formType: 'Form (e.g. Capsules, Tablets, Bottle)',
    category: 'Category',
    sku: 'SKU / Batch',
    qty: 'Quantity',
    threshold: 'Reorder Threshold',
    expiry: 'Expiry Date',
    price: 'Unit Price ($)',
    actionConfirmDelete: 'Are you sure you want to delete this medicine from the system?',
    items: 'items',
    categories: {
      Antibiotics: 'Antibiotics',
      Painkillers: 'Painkillers',
      Cardiovascular: 'Cardiovascular',
      Respiratory: 'Respiratory',
      Endocrine: 'Endocrine'
    },
    statusOptions: {
      all: 'All Stock Status',
      inStock: 'In Stock',
      lowStock: 'Low Stock',
      outOfStock: 'Out of Stock'
    },
    expiryOptions: {
      any: 'Expiry: Any',
      under30: 'Expiring < 30 days',
      under90: 'Expiring < 90 days'
    }
  }
};

const CATEGORIES_LIST = ['Kháng sinh', 'Giảm đau', 'Tim mạch', 'Hô hấp', 'Nội tiết', 'Thần kinh', 'Tiêu hóa', 'Dược phẩm'];
const MEDICINE_API = 'http://localhost:5000/api/medicines';

export default function PharmacistPharmacyTab({ lang = 'vi', token }) {
  const t = localTranslations[lang];
  const activeToken = token || localStorage.getItem('token');

  // Real medicines from DB
  const [medications, setMedications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' });

  // Fetch medicines from real DB
  const fetchMedicines = async () => {
    if (!activeToken) return;
    setIsLoading(true);
    try {
      const res = await fetch(MEDICINE_API, {
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        const mapped = data.map(m => ({
          id: m.id,
          name: m.name,
          form: m.unit || 'Viên',
          activeIngredient: m.activeIngredient || '',
          category: m.category || 'Dược phẩm',
          sku: m.code,
          quantity: m.stockQuantity,
          threshold: m.reorderThreshold || 20,
          expiryDate: m.expiryDate || null,
          unitPrice: parseFloat(m.price) || 0
        }));
        setMedications(mapped);
      }
    } catch (err) {
      console.error('Fetch medicines error:', err);
      setAlertMsg({ type: 'error', text: 'Không thể tải danh sách thuốc từ CSDL.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { fetchMedicines(); }, [activeToken]);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedExpiry, setSelectedExpiry] = useState('Any');

  // Pagination State (Default 5 items/page, adjustable 5, 10, 15, 20)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Reset to Page 1 when filters or page size change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedStatus, selectedExpiry, pageSize]);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'restock'
  const [currentMed, setCurrentMed] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form Fields State (Add/Edit)
  const [formName, setFormName] = useState('');
  const [formForm, setFormForm] = useState('');
  const [formActiveIngredient, setFormActiveIngredient] = useState('');
  const [formCategory, setFormCategory] = useState('Dược phẩm');
  const [formSku, setFormSku] = useState('');
  const [formQuantity, setFormQuantity] = useState('');
  const [formThreshold, setFormThreshold] = useState('20');
  const [formExpiryDate, setFormExpiryDate] = useState('');
  const [formUnitPrice, setFormUnitPrice] = useState('');

  // Restock Form State
  const [restockQty, setRestockQty] = useState('');
  const [restockExpiry, setRestockExpiry] = useState('');
  const [restockPrice, setRestockPrice] = useState('');

  // Date Parsing Helpers
  const TODAY = new Date();

  const getDaysToExpiry = (dateStr) => {
    if (!dateStr || dateStr === 'N/A') return Infinity;
    const expiry = new Date(dateStr);
    const timeDiff = expiry.getTime() - TODAY.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  const getStatus = (med) => {
    if (med.quantity === 0) return 'OUT_OF_STOCK';
    const days = getDaysToExpiry(med.expiryDate);
    if (days >= 0 && days <= 30) return 'EXPIRING_SOON';
    if (med.quantity <= med.threshold) return 'LOW_STOCK';
    return 'IN_STOCK';
  };

  // Dynamic calculations for summary cards
  const lowStockCount = useMemo(() => {
    return medications.filter(med => {
      const status = getStatus(med);
      return status === 'LOW_STOCK' || status === 'OUT_OF_STOCK' || status === 'EXPIRING_SOON';
    }).length;
  }, [medications]);

  const totalInventoryValue = useMemo(() => {
    const sum = medications.reduce((total, med) => total + (med.quantity * med.unitPrice), 0);
    return sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }, [medications]);

  // Handle Opening Modal for Add
  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentMed(null);
    setFormName(''); setFormForm('Viên'); setFormActiveIngredient('');
    setFormCategory('Dược phẩm');
    setFormSku(`MED-${Math.floor(100000 + Math.random() * 900000)}`);
    setFormQuantity('100'); setFormThreshold('20');
    setFormExpiryDate(''); setFormUnitPrice('0');
    setAlertMsg({ type: '', text: '' });
    setIsModalOpen(true);
  };

  // Handle Opening Modal for Edit
  const handleOpenEditModal = (med) => {
    setModalMode('edit');
    setCurrentMed(med);
    setFormName(med.name); setFormForm(med.form);
    setFormActiveIngredient(med.activeIngredient || '');
    setFormCategory(med.category);
    setFormSku(med.sku); setFormQuantity(med.quantity.toString());
    setFormThreshold(med.threshold.toString());
    setFormExpiryDate(med.expiryDate || '');
    setFormUnitPrice(med.unitPrice.toString());
    setAlertMsg({ type: '', text: '' });
    setIsModalOpen(true);
  };

  // Handle Opening Restock Modal
  const handleOpenRestockModal = (med) => {
    setModalMode('restock');
    setCurrentMed(med);
    setRestockQty('');
    setRestockExpiry(med.expiryDate || '');
    setRestockPrice(med.unitPrice.toString());
    setAlertMsg({ type: '', text: '' });
    setIsModalOpen(true);
  };

  // Handle Delete (soft delete → INACTIVE)
  const handleDeleteMed = async (id) => {
    if (!window.confirm(t.actionConfirmDelete)) return;
    try {
      const res = await fetch(`${MEDICINE_API}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${activeToken}` }
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', text: data.message || 'Đã xóa thuốc thành công.' });
        fetchMedicines();
      } else {
        setAlertMsg({ type: 'error', text: data.message || 'Xóa thuốc thất bại.' });
      }
    } catch (err) {
      setAlertMsg({ type: 'error', text: 'Lỗi kết nối máy chủ khi xóa thuốc.' });
    }
  };

  // Handle Save Form (Add or Edit)
  const handleSave = async (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setAlertMsg({ type: 'error', text: 'Vui lòng nhập Tên thuốc.' });
      return;
    }
    const finalCode = formSku.trim() || `MED-${Math.floor(100000 + Math.random() * 900000)}`;
    setIsSaving(true);
    try {
      const payload = {
        name: formName.trim(),
        unit: formForm.trim() || 'Viên',
        activeIngredient: formActiveIngredient.trim() || null,
        category: formCategory,
        code: finalCode,
        stockQuantity: parseInt(formQuantity) || 0,
        reorderThreshold: parseInt(formThreshold) || 20,
        expiryDate: formExpiryDate || null,
        price: parseFloat(formUnitPrice) || 0,
      };

      let res;
      if (modalMode === 'add') {
        res = await fetch(MEDICINE_API, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`${MEDICINE_API}/${currentMed.id}`, {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', text: data.message || (modalMode === 'add' ? 'Thêm thuốc thành công!' : 'Cập nhật thành công!') });
        fetchMedicines();
        setIsModalOpen(false);
      } else {
        setAlertMsg({ type: 'error', text: data.message || 'Lưu thất bại.' });
      }
    } catch (err) {
      setAlertMsg({ type: 'error', text: 'Lỗi kết nối máy chủ.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Restock
  const handleRestock = async (e) => {
    e.preventDefault();
    if (!restockQty || Number(restockQty) <= 0) {
      setAlertMsg({ type: 'error', text: 'Vui lòng nhập số lượng nhập kho hợp lệ (> 0).' });
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(`${MEDICINE_API}/${currentMed.id}/restock`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${activeToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          addQuantity: Number(restockQty),
          expiryDate: restockExpiry || null,
          price: restockPrice ? parseFloat(restockPrice) : undefined,
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAlertMsg({ type: 'success', text: data.message || 'Nhập kho thành công!' });
        fetchMedicines();
        setIsModalOpen(false);
      } else {
        setAlertMsg({ type: 'error', text: data.message || 'Nhập kho thất bại.' });
      }
    } catch (err) {
      setAlertMsg({ type: 'error', text: 'Lỗi kết nối máy chủ.' });
    } finally {
      setIsSaving(false);
    }
  };

  // Filter & Search Logic
  const filteredMedications = useMemo(() => {
    return medications.filter(med => {
      const searchStr = `${med.name} ${med.sku} ${med.category} ${med.form} ${med.activeIngredient}`.toLowerCase();
      if (searchQuery && !searchStr.includes(searchQuery.toLowerCase())) return false;
      if (selectedCategory !== 'All' && med.category !== selectedCategory) return false;
      const status = getStatus(med);
      if (selectedStatus !== 'All') {
        if (selectedStatus === 'In Stock' && status !== 'IN_STOCK' && status !== 'EXPIRING_SOON') return false;
        if (selectedStatus === 'Low Stock' && status !== 'LOW_STOCK') return false;
        if (selectedStatus === 'Out of Stock' && status !== 'OUT_OF_STOCK') return false;
      }
      if (selectedExpiry !== 'Any') {
        const days = getDaysToExpiry(med.expiryDate);
        if (selectedExpiry === 'under30' && (days < 0 || days > 30)) return false;
        if (selectedExpiry === 'under90' && (days < 0 || days > 90)) return false;
      }
      return true;
    });
  }, [medications, searchQuery, selectedCategory, selectedStatus, selectedExpiry]);

  // Dynamic Pagination Calculation
  const totalFilteredCount = filteredMedications.length;
  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalFilteredCount);

  const paginatedMedications = useMemo(() => {
    return filteredMedications.slice(startIndex, endIndex);
  }, [filteredMedications, startIndex, endIndex]);

  // Export CSV
  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Tên Thuốc,Đơn vị,Danh mục,SKU,Số lượng,Hạn dùng,Đơn giá,Trạng thái\n';
    filteredMedications.forEach(m => {
      csvContent += `"${m.name}","${m.form}","${m.category}","${m.sku}",${m.quantity},"${m.expiryDate || 'N/A'}",${m.unitPrice},"${getStatus(m)}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `kho_thuoc_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };




  return (
    <div className="space-y-lg text-left">

      {alertMsg.text && (
        <div className={`p-3 rounded-xl text-sm font-medium flex items-center gap-2 border ${
          alertMsg.type === 'success' ? 'bg-green-50 border-green-300 text-green-800 dark:bg-green-950/30 dark:border-green-700 dark:text-green-300' :
          alertMsg.type === 'error' ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-300' :
          'bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950/30 dark:border-blue-700 dark:text-blue-300'
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {alertMsg.type === 'success' ? 'check_circle' : alertMsg.type === 'error' ? 'error' : 'info'}
          </span>
          {alertMsg.text}
          <button onClick={() => setAlertMsg({ type: '', text: '' })} className="ml-auto opacity-60 hover:opacity-100">✕</button>
        </div>
      )}


      <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-md mb-lg">
        <div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface dark:text-white mb-xs">{t.title}</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">{t.subtitle}</p>
        </div>
        <div className="flex gap-md">
          {/* Status Cards */}
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-2 flex items-center gap-md rounded-xl shadow-sm transition-colors duration-150">
            <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-error dark:text-red-400">priority_high</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider text-[10px]">{t.lowStock}</p>
              <p className="font-headline-md text-headline-md text-error dark:text-red-400 leading-tight font-bold">{lowStockCount} {t.items}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 px-md py-2 flex items-center gap-md rounded-xl shadow-sm transition-colors duration-150">
            <div className="w-10 h-10 rounded-full bg-secondary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary dark:text-teal-400">inventory</span>
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface-variant dark:text-slate-400 uppercase tracking-wider text-[10px]">{t.totalValue}</p>
              <p className="font-headline-md text-headline-md text-primary dark:text-primary-fixed-dim leading-tight font-bold">{totalInventoryValue}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Filter, Search & Action Bar */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl p-md mb-lg flex flex-wrap items-center gap-md transition-colors shadow-sm">
        
        {/* Local Search Input */}
        <div className="relative flex-grow max-w-xs min-w-[200px]">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline dark:text-slate-500 text-[20px]">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-body-md text-on-surface dark:text-white focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder={t.searchPlaceholder}
            type="text"
          />
        </div>

        {/* Categories Dropdown */}
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-transparent border border-outline-variant dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-body-md px-md py-1.5 focus:ring-primary focus:border-primary outline-none min-w-[160px] cursor-pointer"
        >
          <option value="All">{t.filterCategory}</option>
          {CATEGORIES_LIST.map(cat => (
            <option key={cat} value={cat}>{t.categories[cat] || cat}</option>
          ))}
        </select>

        {/* Stock Status Dropdown */}
        <select 
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-transparent border border-outline-variant dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-body-md px-md py-1.5 focus:ring-primary focus:border-primary outline-none min-w-[160px] cursor-pointer"
        >
          <option value="All">{t.statusOptions.all}</option>
          <option value="In Stock">{t.statusOptions.inStock}</option>
          <option value="Low Stock">{t.statusOptions.lowStock}</option>
          <option value="Out of Stock">{t.statusOptions.outOfStock}</option>
        </select>

        {/* Expiry Dropdown */}
        <select 
          value={selectedExpiry}
          onChange={(e) => setSelectedExpiry(e.target.value)}
          className="bg-transparent border border-outline-variant dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg text-body-md px-md py-1.5 focus:ring-primary focus:border-primary outline-none min-w-[160px] cursor-pointer"
        >
          <option value="Any">{t.expiryOptions.any}</option>
          <option value="under30">{t.expiryOptions.under30}</option>
          <option value="under90">{t.expiryOptions.under90}</option>
        </select>

        <div className="flex-1"></div>

        <div className="flex gap-sm w-full sm:w-auto justify-end">
          <button 
            onClick={handleExportCSV}
            className="text-primary dark:text-primary-fixed-dim hover:bg-primary-container/20 p-2 rounded-lg flex items-center gap-sm transition-colors cursor-pointer border-none font-semibold text-label-md bg-transparent"
          >
            <span className="material-symbols-outlined">download</span>
            <span>{t.exportCsv}</span>
          </button>
          
          <button 
            onClick={handleOpenAddModal}
            className="flex items-center gap-xs bg-primary dark:bg-primary-container text-white dark:text-on-primary-container px-md py-2 rounded-lg font-label-md hover:brightness-110 transition-all cursor-pointer border-none shadow-sm font-semibold"
          >
            <span className="material-symbols-outlined">add</span>
            <span>{t.addNewMedicine}</span>
          </button>
        </div>
      </div>

      {/* 3. Inventory Data Table */}
      <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-colors duration-150">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-surface-container-low dark:bg-slate-900 border-b border-outline-variant dark:border-slate-700">
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableMedicineName}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableCategory}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableSku}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableQuantity}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableExpiry}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tablePrice}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider">{t.tableStatus}</th>
                <th className="px-md py-3 font-label-md text-label-md text-on-surface-variant dark:text-slate-300 uppercase tracking-wider text-right">{t.tableActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant dark:divide-slate-700">
              {paginatedMedications.length > 0 ? (
                paginatedMedications.map(med => {
                  const status = getStatus(med);
                  const daysToExpiry = getDaysToExpiry(med.expiryDate);

                  // Formatting helper for Expiry string
                  let formattedExpiryText = med.expiryDate;
                  let isExpiringAlert = false;
                  if (status === 'EXPIRING_SOON') {
                    isExpiringAlert = true;
                    formattedExpiryText = t.expiresDays.replace('{days}', daysToExpiry);
                  }

                  // Determine row class based on status
                  let rowClass = 'inventory-row hover:bg-surface-container-low dark:hover:bg-slate-800 transition-all';
                  if (status === 'LOW_STOCK') {
                    rowClass += ' bg-error-container/10 dark:bg-red-950/10';
                  } else if (status === 'EXPIRING_SOON') {
                    rowClass += ' bg-tertiary-fixed/15 dark:bg-amber-900/10';
                  } else if (status === 'OUT_OF_STOCK') {
                    rowClass += ' opacity-60 bg-slate-50 dark:bg-slate-900/40';
                  }

                  return (
                    <tr key={med.id} className={rowClass}>
                      <td className="px-md py-3 font-body-md">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary dark:text-primary-fixed-dim">{med.name}</span>
                          <span className="text-[11px] text-on-surface-variant dark:text-slate-400">{med.form}</span>
                        </div>
                      </td>
                      <td className="px-md py-3 font-body-md text-on-surface dark:text-slate-300">
                        {t.categories[med.category] || med.category}
                      </td>
                      <td className="px-md py-3 font-data-mono text-data-mono dark:text-slate-400 text-xs">
                        {med.sku}
                      </td>
                      <td className="px-md py-3 font-body-md text-on-surface dark:text-slate-300">
                        {status === 'OUT_OF_STOCK' ? (
                          <span className="text-slate-500 font-bold">0 Units</span>
                        ) : status === 'LOW_STOCK' ? (
                          <div className="flex flex-col">
                            <span className="text-error dark:text-red-400 font-bold">{med.quantity} Units</span>
                            <span className="text-[10px] text-error dark:text-red-400/80">{t.reorderThresholdText}: {med.threshold}</span>
                          </div>
                        ) : (
                          <span>{med.quantity} Units</span>
                        )}
                      </td>
                      <td className="px-md py-3 font-body-md text-on-surface dark:text-slate-300">
                        {isExpiringAlert ? (
                          <div className="flex flex-col">
                            <span className="text-tertiary dark:text-amber-400 font-bold">{new Date(med.expiryDate).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                            <span className="text-[10px] text-tertiary dark:text-amber-400/80">{formattedExpiryText}</span>
                          </div>
                        ) : med.expiryDate === 'N/A' ? (
                          <span className="text-slate-400 dark:text-slate-500">N/A</span>
                        ) : (
                          <span>{new Date(med.expiryDate).toLocaleDateString(lang === 'vi' ? 'vi-VN' : 'en-US', { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                        )}
                      </td>
                      <td className="px-md py-3 font-data-mono text-data-mono dark:text-slate-400 text-xs">
                        ${med.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-md py-3">
                        {status === 'LOW_STOCK' ? (
                          <span className="bg-error text-on-error dark:bg-red-600 dark:text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider inline-block">
                            {t.statusLowStock}
                          </span>
                        ) : status === 'EXPIRING_SOON' ? (
                          <span className="bg-tertiary-container text-on-tertiary-container dark:bg-amber-600 dark:text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider inline-block">
                            {t.statusExpiringSoon}
                          </span>
                        ) : status === 'OUT_OF_STOCK' ? (
                          <span className="bg-outline text-surface-container-lowest dark:bg-slate-600 dark:text-slate-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider inline-block">
                            {t.statusOutOfStock}
                          </span>
                        ) : (
                          <span className="bg-secondary-container text-on-secondary-container dark:bg-teal-700 dark:text-teal-100 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider inline-block">
                            {t.statusInStock}
                          </span>
                        )}
                      </td>
                      <td className="px-md py-3 text-right">
                        <div className="flex justify-end gap-xs opacity-70 hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleOpenRestockModal(med)}
                            className="px-2 py-1 bg-teal-600 hover:bg-teal-700 text-white rounded text-[11px] font-bold flex items-center gap-0.5 transition-colors"
                            title="Nhập kho"
                          >
                            <span className="material-symbols-outlined text-[15px]">add_box</span>
                            Nhập Kho
                          </button>
                          <button 
                            onClick={() => handleOpenEditModal(med)}
                            className="p-1 hover:text-primary dark:hover:text-primary-fixed-dim hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors cursor-pointer border-none bg-transparent"
                            title="Chỉnh sửa"
                          >
                            <span className="material-symbols-outlined text-[20px]">edit</span>
                          </button>
                          <button 
                            onClick={() => handleDeleteMed(med.id)}
                            className="p-1 hover:text-error dark:hover:text-red-400 hover:bg-surface-container-high dark:hover:bg-slate-800 rounded transition-colors cursor-pointer border-none bg-transparent"
                            title="Xóa"
                          >
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-md py-10 text-center">
                    {isLoading ? (
                      <div className="flex flex-col items-center gap-2 text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[40px] animate-spin">refresh</span>
                        <span className="text-sm">Đang tải danh sách thuốc từ CSDL...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-on-surface-variant dark:text-slate-400">
                        <span className="material-symbols-outlined text-[40px]">medication</span>
                        <span className="text-sm">{lang === 'vi' ? 'Không tìm thấy thuốc phù hợp. Bấm "Thêm Thuốc Mới" để bắt đầu nhập kho.' : 'No medications found. Click Add New Medicine to get started.'}</span>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        <div className="px-lg py-3 bg-surface-container-low dark:bg-slate-900 flex flex-col sm:flex-row justify-between items-center gap-md transition-colors border-t border-outline-variant/60 dark:border-slate-800">
          <div className="flex items-center gap-md text-xs text-on-surface-variant dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-medium">
              <span>Hiển thị:</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 rounded px-2 py-1 text-xs font-bold text-primary dark:text-primary-fixed-dim outline-none cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
            <span>
              {totalFilteredCount > 0
                ? `Hiển thị ${startIndex + 1} - ${endIndex} trên tổng số ${totalFilteredCount} sản phẩm`
                : 'Hiển thị 0 sản phẩm'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={safeCurrentPage === 1}
              className="p-1.5 rounded hover:bg-surface-variant dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer dark:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              title="Trang trước"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
              if (totalPages > 7) {
                if (pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - safeCurrentPage) > 1) {
                  if (pageNum === 2 && safeCurrentPage > 3) return <span key={pageNum} className="text-xs px-1 text-slate-400">...</span>;
                  if (pageNum === totalPages - 1 && safeCurrentPage < totalPages - 2) return <span key={pageNum} className="text-xs px-1 text-slate-400">...</span>;
                  return null;
                }
              }
              const isActive = pageNum === safeCurrentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all border-none cursor-pointer ${
                    isActive
                      ? 'bg-primary dark:bg-primary-container text-white dark:text-on-primary-container shadow-xs'
                      : 'hover:bg-surface-variant dark:hover:bg-slate-800 dark:text-slate-300 bg-transparent'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={safeCurrentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded hover:bg-surface-variant dark:hover:bg-slate-800 transition-colors border-none bg-transparent cursor-pointer dark:text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center"
              title="Trang sau"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Bento Style Float Contextual Info Panel */}
      <div className="grid grid-cols-12 gap-lg pb-lg">
        {/* Supply Trend Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 p-lg rounded-xl transition-colors shadow-sm">
          <h3 className="font-label-md text-label-md text-primary dark:text-primary-fixed-dim uppercase tracking-widest mb-md font-bold">{t.supplyTrend}</h3>
          <div className="w-full h-48 flex items-end gap-2 px-md">
            {/* Styled bar chart representing demand trends */}
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[60%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Jan: 60%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[40%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Feb: 40%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[85%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Mar: 85%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[30%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Apr: 30%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[55%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="May: 55%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[70%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Jun: 70%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[95%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Jul: 95%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[45%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Aug: 45%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[20%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Sep: 20%"></div>
            <div className="flex-1 bg-primary-fixed dark:bg-primary-container/40 rounded-t h-[65%] hover:bg-primary dark:hover:bg-primary-container transition-all" title="Oct: 65%"></div>
          </div>
          <div className="flex justify-between mt-sm px-md text-[10px] text-on-surface-variant dark:text-slate-400 font-bold">
            <span>JAN</span><span>FEB</span><span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span><span>OCT</span>
          </div>
        </div>

        {/* Right Info Cards */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">
          {/* Next Audit Date */}
          <div className="bg-inverse-surface text-inverse-on-surface p-lg rounded-xl flex-1 flex flex-col justify-center shadow-sm">
            <p className="font-label-md text-label-md opacity-75 mb-sm uppercase tracking-wide font-bold">{t.nextAuditDate}</p>
            <p className="font-headline-lg text-headline-lg font-bold mb-base">August 24, 2026</p>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-[18px]">alarm</span>
              <span className="text-body-sm font-body-sm opacity-90">{t.auditWarning.replace('{days}', '40')}</span>
            </div>
          </div>

          {/* Quick Tip Barcode scanner */}
          <div className="bg-secondary-container dark:bg-slate-700 dark:text-teal-100 p-lg rounded-xl flex-1 relative overflow-hidden group shadow-sm transition-colors">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[120px] opacity-10 rotate-12 group-hover:rotate-0 transition-transform duration-500 text-on-secondary-container dark:text-teal-100">local_pharmacy</span>
            <p className="font-label-md text-label-md text-on-secondary-container dark:text-teal-300 mb-sm uppercase tracking-wide font-bold">{t.quickTip}</p>
            <p className="font-body-md text-body-md text-on-secondary-container dark:text-slate-300 relative z-10">{t.quickTipContent}</p>
          </div>
        </div>
      </div>

      {/* 5. Add/Edit Medicine Modal Overlay */}
      {isModalOpen && modalMode !== 'restock' && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-md">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden transition-all text-left">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-surface-container-low dark:bg-slate-900/80 flex justify-between items-center">
              <h3 className="font-headline-md text-headline-md text-on-surface dark:text-white font-bold">
                {modalMode === 'add' ? t.modalAddTitle : t.modalEditTitle}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant dark:text-slate-400 hover:bg-surface-container-high dark:hover:bg-slate-800 p-1 rounded-full border-none bg-transparent cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-lg space-y-md">
              {alertMsg.text && (
                <div className={`p-2 rounded-lg text-xs font-medium border ${
                  alertMsg.type === 'error' ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-300' : 'bg-green-50 border-green-300 text-green-800'
                }`}>{alertMsg.text}</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                
                {/* Name */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.name} *</label>
                  <input 
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    type="text" 
                    placeholder="e.g. Amoxicillin 500mg"
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Form type */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.formType}</label>
                  <input 
                    value={formForm}
                    onChange={(e) => setFormForm(e.target.value)}
                    type="text" 
                    placeholder="Viên nang, Viên nén, Lọ..."
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Active Ingredient */}
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Hoạt chất / Thành phần chính</label>
                  <input 
                    value={formActiveIngredient}
                    onChange={(e) => setFormActiveIngredient(e.target.value)}
                    type="text" 
                    placeholder="Amoxicillin, Paracetamol..."
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.category}</label>
                  <select 
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none cursor-pointer"
                  >
                    {CATEGORIES_LIST.map(cat => (
                      <option key={cat} value={cat}>{t.categories[cat] || cat}</option>
                    ))}
                  </select>
                </div>

                {/* SKU */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.sku} *</label>
                  <input 
                    required
                    value={formSku}
                    onChange={(e) => setFormSku(e.target.value)}
                    type="text" 
                    placeholder="e.g. AMX-00234-P"
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.qty}</label>
                  <input 
                    value={formQuantity}
                    onChange={(e) => setFormQuantity(e.target.value)}
                    type="number" 
                    min="0"
                    placeholder="e.g. 100"
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Reorder Threshold */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.threshold}</label>
                  <input 
                    value={formThreshold}
                    onChange={(e) => setFormThreshold(e.target.value)}
                    type="number" 
                    min="0"
                    placeholder="e.g. 20"
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.expiry}</label>
                  <input 
                    value={formExpiryDate}
                    onChange={(e) => setFormExpiryDate(e.target.value)}
                    type="date" 
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">{t.price}</label>
                  <input 
                    value={formUnitPrice}
                    onChange={(e) => setFormUnitPrice(e.target.value)}
                    type="number" 
                    step="0.01" 
                    min="0"
                    placeholder="e.g. 4.50"
                    className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>

              </div>

              {/* Actions Footer */}
              <div className="flex justify-end gap-md pt-md border-t border-outline-variant dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-lg py-2 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 rounded-lg font-label-md text-label-md bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                 >
                  {t.cancel}
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-lg py-2 bg-primary text-white rounded-lg font-label-md text-label-md hover:brightness-110 shadow-sm transition-all cursor-pointer border-none font-semibold disabled:opacity-60 flex items-center gap-2"
                >
                  {isSaving && <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>}
                  {isSaving ? 'Đang lưu...' : t.save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Restock Modal */}
      {isModalOpen && modalMode === 'restock' && currentMed && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[100] p-md">
          <div className="bg-white dark:bg-slate-800 border border-outline-variant dark:border-slate-700 w-full max-w-md rounded-xl shadow-2xl overflow-hidden text-left">
            <div className="px-lg py-md border-b border-outline-variant dark:border-slate-700 bg-teal-50 dark:bg-teal-950/40 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add_box</span>
                  Nhập Kho Thuốc
                </h3>
                <p className="text-xs text-teal-700 dark:text-teal-400 mt-0.5">{currentMed.name} — Tồn kho hiện tại: <strong>{currentMed.quantity} {currentMed.form}</strong></p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/40 p-1 rounded-full border-none bg-transparent cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleRestock} className="p-lg space-y-md">
              {alertMsg.text && (
                <div className={`p-2 rounded-lg text-xs font-medium border ${
                  alertMsg.type === 'error' ? 'bg-red-50 border-red-300 text-red-800 dark:bg-red-950/30 dark:border-red-700 dark:text-red-300' : 'bg-green-50 border-green-300 text-green-800'
                }`}>{alertMsg.text}</div>
              )}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Số lượng nhập thêm <span className="text-error">*</span></label>
                <input 
                  required
                  value={restockQty}
                  onChange={(e) => setRestockQty(e.target.value)}
                  type="number"
                  min="1"
                  placeholder="Ví dụ: 200"
                  className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                />
                {restockQty && Number(restockQty) > 0 && (
                  <p className="text-xs text-teal-700 dark:text-teal-400 mt-1 font-medium">
                    Sau nhập: <strong>{currentMed.quantity + Number(restockQty)} {currentMed.form}</strong>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Hạn sử dụng lô mới (tùy chọn)</label>
                <input 
                  value={restockExpiry}
                  onChange={(e) => setRestockExpiry(e.target.value)}
                  type="date"
                  className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant dark:text-slate-400 mb-1">Đơn giá nhập mới (VNĐ, tùy chọn)</label>
                <input 
                  value={restockPrice}
                  onChange={(e) => setRestockPrice(e.target.value)}
                  type="number"
                  step="1"
                  min="0"
                  placeholder="Để trống nếu giữ nguyên"
                  className="w-full bg-surface-container-low dark:bg-slate-900 border border-outline-variant dark:border-slate-700 dark:text-white rounded-lg px-3 py-2 text-body-md focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div className="flex justify-end gap-md pt-md border-t border-outline-variant dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-lg py-2 border border-outline-variant dark:border-slate-700 text-on-surface dark:text-slate-200 rounded-lg font-label-md bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Hủy
                </button>
                <button 
                  type="submit"
                  disabled={isSaving}
                  className="px-lg py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-label-md shadow-sm transition-all cursor-pointer border-none font-bold disabled:opacity-60 flex items-center gap-2"
                >
                  {isSaving && <span className="material-symbols-outlined text-[16px] animate-spin">refresh</span>}
                  {isSaving ? 'Đang lưu...' : '✓ Xác Nhận Nhập Kho'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
