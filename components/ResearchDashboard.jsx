'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell
} from 'recharts';

const COLOR_PALETTE = ['#00D2FF', '#0072FF', '#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

export default function ResearchDashboard({ initialData = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStaff, setSelectedStaff] = useState('ALL');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2025);
  const [groupBy, setGroupBy] = useState('type'); // 'type' หรือ 'indexing'
  const [tableSearch, setTableSearch] = useState('');

  // State สำหรับ Modal แสดงรายละเอียดผลงานเมื่อคลิกแท่งกราฟ
  const [selectedBarDetails, setSelectedBarDetails] = useState(null);

  const dropdownRef = useRef(null);

  // 1. ดึงช่วงปีที่มีจริงจาก Google Sheets
  const availableYears = useMemo(() => {
    const years = initialData
      .map(item => item.Year)
      .filter(y => y && !isNaN(y));
    const uniqueYears = Array.from(new Set(years)).sort((a, b) => a - b);
    return uniqueYears.length > 0 ? uniqueYears : [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
  }, [initialData]);

  // 2. ดึงรายชื่ออาจารย์ทั้งหมด
  const allStaffList = useMemo(() => {
    const names = initialData
      .map(item => item['Staff name'])
      .filter(name => name && name.trim() !== '');
    return Array.from(new Set(names)).sort();
  }, [initialData]);

  // 3. กรองชื่ออาจารย์ตามคำค้นหา
  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return allStaffList;
    return allStaffList.filter(name => 
      name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [allStaffList, searchQuery]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 4. กรองข้อมูลหลักตามอาจารย์และช่วงปี
  const filteredData = useMemo(() => {
    return initialData.filter(item => {
      const year = item.Year;
      const matchStaff = selectedStaff === 'ALL' || item['Staff name'] === selectedStaff;
      const matchYear = year && year >= startYear && year <= endYear;
      return matchStaff && matchYear;
    });
  }, [initialData, selectedStaff, startYear, endYear]);

  // 5. กรองข้อมูลสำหรับแสดงในตาราง
  const tableData = useMemo(() => {
    if (!tableSearch) return filteredData;
    return filteredData.filter(item => 
      (item.Detail && item.Detail.toLowerCase().includes(tableSearch.toLowerCase())) ||
      (item.Type && item.Type.toLowerCase().includes(tableSearch.toLowerCase())) ||
      (item.Indexing && item.Indexing.toLowerCase().includes(tableSearch.toLowerCase()))
    );
  }, [filteredData, tableSearch]);

  // 6. คำนวณ KPI Stat Cards
  const stats = useMemo(() => {
    const total = filteredData.length;
    const journals = filteredData.filter(i => i.Type && i.Type.toLowerCase().includes('journal')).length;
    const proceedings = filteredData.filter(i => i.Type && i.Type.toLowerCase().includes('proceeding')).length;
    const scopus = filteredData.filter(i => i.Indexing && i.Indexing.toLowerCase().includes('scopus')).length;
    return { total, journals, proceedings, scopus };
  }, [filteredData]);

  // 7. จัดกลุ่มข้อมูลสำหรับ Bar Chart
  const { chartData, categories } = useMemo(() => {
    const groupKey = groupBy === 'type' ? 'Type' : 'Indexing';
    const categoriesSet = new Set();
    const yearMap = {};

    filteredData.forEach(item => {
      const yr = item.Year;
      const cat = item[groupKey] || 'Uncategorized';
      if (yr) {
        categoriesSet.add(cat);
        if (!yearMap[yr]) yearMap[yr] = { year: yr };
        yearMap[yr][cat] = (yearMap[yr][cat] || 0) + 1;
      }
    });

    const cats = Array.from(categoriesSet);
    const data = Object.values(yearMap).sort((a, b) => a.year - b.year);

    return { chartData: data, categories: cats };
  }, [filteredData, groupBy]);

  // 8. จัดกลุ่มข้อมูลสำหรับ Pie Chart
  const pieData = useMemo(() => {
    const counts = {};
    filteredData.forEach(item => {
      const idx = item.Indexing || 'Others';
      counts[idx] = (counts[idx] || 0) + 1;
    });
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredData]);

  // 9. ฟังก์ชันจัดการเมื่อผู้ใช้คลิกที่แท่งกราฟ (Bar Click)
  const handleBarClick = (data, categoryName) => {
    if (!data || !data.year) return;

    const clickedYear = data.year;
    const groupKey = groupBy === 'type' ? 'Type' : 'Indexing';

    // คัดเลือกรายการผลงานที่ตรงกับปี และ Category นั้น
    const matchedItems = filteredData.filter(item => {
      const matchYear = item.Year === clickedYear;
      const matchCat = categoryName ? item[groupKey] === categoryName : true;
      return matchYear && matchCat;
    });

    // อัปเดตตารางให้ค้นหาประเภทนั้นๆ อัตโนมัติ
    if (categoryName) {
      setTableSearch(categoryName);
    }

    // แสดง Pop-up Modal ละเอียด
    setSelectedBarDetails({
      year: clickedYear,
      category: categoryName || 'ทุกประเภท',
      items: matchedItems
    });
  };

  // 10. ฟังก์ชัน Export CSV
  const handleExportCSV = () => {
    if (filteredData.length === 0) return;
    const headers = ["Staff name", "Type", "Detail", "Month", "Year", "Indexing"];
    const rows = filteredData.map(item => [
      `"${item['Staff name'] || ''}"`,
      `"${item.Type || ''}"`,
      `"${(item.Detail || '').replace(/"/g, '""')}"`,
      `"${item.Month || ''}"`,
      `"${item.Year || ''}"`,
      `"${item.Indexing || ''}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `PSU-Reshub_${selectedStaff}_${startYear}-${endYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 11. รีเซ็ตตัวกรอง
  const handleResetFilter = () => {
    setSearchQuery('');
    setSelectedStaff('ALL');
    setStartYear(2020);
    setEndYear(2025);
    setTableSearch('');
    setIsDropdownOpen(false);
    setSelectedBarDetails(null);
  };

  const handleSelectStaff = (staffName) => {
    setSelectedStaff(staffName);
    setSearchQuery(staffName === 'ALL' ? '' : staffName);
    setIsDropdownOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-slate-800 pb-4 gap-4 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
              COC PSU Phuket
            </span>
            <span className="text-xs text-slate-400">Academic Research Analytics</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-sky-200 to-blue-500 bg-clip-text text-transparent">
            PSU-Reshub
          </h1>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={handleExportCSV}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-cyan-400 rounded-xl transition-all flex items-center gap-1.5 font-medium shadow-sm"
          >
            📥 Export CSV
          </button>
          <button 
            onClick={handleResetFilter}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 rounded-xl transition-all font-medium"
          >
            🔄 รีเซ็ตตัวกรอง
          </button>
        </div>
      </header>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 relative z-10">
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <p className="text-xs text-slate-400">ผลงานทั้งหมดที่แสดง</p>
          <p className="text-2xl font-bold text-cyan-400 mt-1">{stats.total}</p>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <p className="text-xs text-slate-400">วารสารวิชาการ (Journals)</p>
          <p className="text-2xl font-bold text-blue-400 mt-1">{stats.journals}</p>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <p className="text-xs text-slate-400">ประชุมวิชาการ (Proceedings)</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.proceedings}</p>
        </div>
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
          <p className="text-xs text-slate-400">ฐานข้อมูล Scopus</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">{stats.scopus}</p>
        </div>
      </div>

      {/* Filter Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-xl backdrop-blur-md relative z-30">
        
        {/* Autocomplete Search Dropdown */}
        <div className="md:col-span-2 relative" ref={dropdownRef}>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            ค้นหา/เลือกรายชื่ออาจารย์ (กำลังแสดง: {selectedStaff === 'ALL' ? 'อาจารย์ทั้งหมด' : selectedStaff})
          </label>
          <div className="relative">
            <input 
              type="text"
              placeholder="🔍 พิมพ์ชื่ออาจารย์ (ระบบจะแนะนำชื่อที่ใกล้เคียง)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all"
            />
            {selectedStaff !== 'ALL' && (
              <button 
                onClick={() => handleSelectStaff('ALL')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-700/50 px-2 py-0.5 rounded-md"
              >
                ✕ ล้างชื่อ
              </button>
            )}
          </div>

          {/* List Autocomplete */}
          {isDropdownOpen && (
            <ul className="absolute z-[999] left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-slate-900/95 border border-slate-700 rounded-xl shadow-2xl divide-y divide-slate-800 backdrop-blur-lg">
              <li 
                onClick={() => handleSelectStaff('ALL')}
                className="px-4 py-2.5 text-xs text-cyan-400 font-semibold hover:bg-slate-800 cursor-pointer flex justify-between items-center"
              >
                <span>✨ แสดงผลงานอาจารย์ทั้งหมด ({allStaffList.length} ท่าน)</span>
                {selectedStaff === 'ALL' && <span>✓</span>}
              </li>
              {suggestions.length > 0 ? (
                suggestions.map((staff, idx) => (
                  <li 
                    key={idx} 
                    onClick={() => handleSelectStaff(staff)}
                    className={`px-4 py-2.5 text-xs hover:bg-slate-800/80 cursor-pointer flex justify-between items-center transition-colors ${
                      selectedStaff === staff ? 'text-cyan-400 font-bold bg-cyan-950/30' : 'text-slate-200'
                    }`}
                  >
                    <span>{staff}</span>
                    {selectedStaff === staff && <span className="text-cyan-400">✓</span>}
                  </li>
                ))
              ) : (
                <li className="px-4 py-3 text-xs text-slate-500 text-center">
                  ไม่พบอาจารย์ที่ชื่อใกล้เคียงกับ "{searchQuery}"
                </li>
              )}
            </ul>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">ตั้งแต่ปี (ค.ศ.)</label>
          <select
            value={startYear}
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year} (พ.ศ. {year + 543})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">ถึงปี (ค.ศ.)</label>
          <select
            value={endYear}
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year} (พ.ศ. {year + 543})</option>
            ))}
          </select>
        </div>

      </div>

      {/* Bar Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 relative z-10">
        
        <div className="lg:col-span-2 bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-100">
                จำนวนผลงานรวมในแต่ละปี ({startYear} - {endYear})
              </h2>
              <p className="text-xs text-cyan-400 mt-1 font-medium">
                💡 คลิกที่แท่งกราฟเพื่อดูรายละเอียดผลงานเชิงลึกของปีนั้น
              </p>
            </div>

            <div className="flex bg-slate-800 p-1 rounded-xl border border-slate-700 gap-1">
              <button
                onClick={() => setGroupBy('type')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  groupBy === 'type' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                แยกตามประเภทผลงาน
              </button>
              <button
                onClick={() => setGroupBy('indexing')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  groupBy === 'indexing' 
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md' 
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                แยกตามฐานข้อมูล (Indexing)
              </button>
            </div>
          </div>

          <div className="h-72 w-full cursor-pointer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="year" stroke="#64748b" tick={{ fill: '#94a3b8' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8' }} allowDecimals={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                />
                <Legend wrapperStyle={{ paddingTop: '15px' }} />
                {categories.map((category, index) => (
                  <Bar 
                    key={category} 
                    dataKey={category} 
                    stackId="a"
                    fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} 
                    radius={index === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
                    onClick={(data) => handleBarClick(data, category)}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-2xl flex flex-col justify-between relative z-10">
          <div>
            <h2 className="text-lg font-semibold text-slate-100 border-b border-slate-800 pb-4 mb-4">
              สัดส่วนฐานข้อมูล (Indexing)
            </h2>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLOR_PALETTE[index % COLOR_PALETTE.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2 text-xs text-slate-300">
            {pieData.map((entry, idx) => (
              <span key={idx} className="flex items-center gap-1.5 px-2 py-1 bg-slate-800/80 rounded-md border border-slate-700/50">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLOR_PALETTE[idx % COLOR_PALETTE.length] }}></span>
                {entry.name}: <strong className="text-white">{entry.value}</strong>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Publications Data Table */}
      <div className="bg-slate-900/90 p-6 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-100">รายการผลงานวิชาการ (Publications List)</h2>
            <p className="text-xs text-slate-400 mt-0.5">แสดง {tableData.length} รายการ ตามเงื่อนไขการค้นหา</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            {tableSearch && (
              <button 
                onClick={() => setTableSearch('')} 
                className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 rounded-xl"
              >
                ล้างคำค้นตาราง ✕
              </button>
            )}
            <input 
              type="text"
              placeholder="🔍 ค้นหาชื่องานวิจัย..."
              value={tableSearch}
              onChange={(e) => setTableSearch(e.target.value)}
              className="w-full sm:w-64 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto max-h-96 overflow-y-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-800 text-slate-200 sticky top-0 z-10">
              <tr>
                <th className="p-3">ปี (ค.ศ.)</th>
                <th className="p-3">อาจารย์ / นักวิจัย</th>
                <th className="p-3">ประเภท</th>
                <th className="p-3">รายละเอียดผลงาน</th>
                <th className="p-3">Indexing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {tableData.length > 0 ? (
                tableData.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-medium text-cyan-400 whitespace-nowrap">{item.Year}</td>
                    <td className="p-3 font-medium text-slate-100 whitespace-nowrap">{item['Staff name']}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {item.Type}
                      </span>
                    </td>
                    <td className="p-3 max-w-md truncate text-slate-300" title={item.Detail}>{item.Detail}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        {item.Indexing || 'Others'}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-slate-500">
                    ไม่พบข้อมูลผลงานวิชาการตามเงื่อนไขที่ระบุ
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POPUP MODAL แสดงรายละเอียดเมื่อกดแท่งกราฟ */}
      {selectedBarDetails && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="px-2.5 py-1 rounded-md bg-cyan-500/20 text-cyan-400 font-bold text-xs border border-cyan-500/30">
                  ปี ค.ศ. {selectedBarDetails.year} (พ.ศ. {selectedBarDetails.year + 543})
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-2">
                  {selectedBarDetails.category}
                </h3>
                <p className="text-xs text-slate-400">
                  พบทั้งสิ้น {selectedBarDetails.items.length} รายการ
                </p>
              </div>
              <button 
                onClick={() => setSelectedBarDetails(null)}
                className="w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Modal Content / Items List */}
            <div className="p-5 overflow-y-auto space-y-3 flex-1">
              {selectedBarDetails.items.length > 0 ? (
                selectedBarDetails.items.map((item, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 hover:border-cyan-500/40 transition-all">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <span className="text-xs font-semibold text-cyan-400">{item['Staff name']}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        {item.Indexing || 'Others'}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {item.Detail}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-400 flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-slate-700/50 rounded text-slate-300">{item.Type}</span>
                      {item.Month && <span>เดือน: {item.Month}</span>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-500 text-xs py-8">ไม่พบข้อมูลรายชื่อผลงาน</p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-end">
              <button 
                onClick={() => setSelectedBarDetails(null)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all"
              >
                ตกลง / ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}