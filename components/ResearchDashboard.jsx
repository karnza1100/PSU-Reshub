import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function ResearchDashboard({ initialData }) {
  const [selectedStaff, setSelectedStaff] = useState('ALL');
  const [startYear, setStartYear] = useState(2020);
  const [endYear, setEndYear] = useState(2024);

  // กรองข้อมูลตาม Filter
  const filteredData = useMemo(() => {
    return initialData.filter((item) => {
      const year = parseInt(item.Year);
      const matchStaff = selectedStaff === 'ALL' || item['Staff name'] === selectedStaff;
      const matchYear = year >= startYear && year <= endYear;
      return matchStaff && matchYear;
    });
  }, [initialData, selectedStaff, startYear, endYear]);

  // ประมวลผลข้อมูลลง กราฟตามปี
  const chartData = useMemo(() => {
    const yearCounts = {};
    filteredData.forEach((item) => {
      const yr = item.Year;
      if (!yearCounts[yr]) yearCounts[yr] = { year: yr, Total: 0 };
      yearCounts[yr].Total += 1;
    });
    return Object.values(yearCounts).sort((a, b) => a.year - b.year);
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-cyan-500/20">
            COC
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              College of Computing Research Analytics
            </h1>
            <p className="text-xs text-slate-400">Prince of Songkla University, Phuket Campus</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
          Public Access Mode
        </span>
      </header>

      {/* Control Panel / Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">เลือกอาจารย์</label>
          <select 
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">อาจารย์ทั้งหมด (All Staff)</option>
            <option value="ADISAK INTANA">ADISAK INTANA</option>
            <option value="AMONRAT PRASIT">AMONRAT PRASIT</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">ตั้งแต่ปี (ค.ศ.)</label>
          <input 
            type="number" 
            value={startYear} 
            onChange={(e) => setStartYear(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1">ถึงปี (ค.ศ.)</label>
          <input 
            type="number" 
            value={endYear} 
            onChange={(e) => setEndYear(Number(e.target.value))}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-2xl mb-8">
        <h2 className="text-base font-semibold text-slate-200 mb-4">
          จำนวนผลงานวิชาการรวมในแต่ละปี ({startYear} - {endYear})
        </h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="year" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                itemStyle={{ color: '#38bdf8' }}
              />
              <Legend />
              <Bar dataKey="Total" fill="#00D2FF" radius={[6, 6, 0, 0]} name="จำนวนผลงานรวม" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}