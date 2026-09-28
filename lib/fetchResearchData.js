import Papa from 'papaparse';

export async function getResearchData() {
  // ลิงก์ตรงของ Google Sheets คุณพร้อมคำสั่ง export format=csv
  const DEFAULT_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1AwXk3ZVp1LWymvzH6Kp_wGVEBkgIQCAp_rQikMQITxU/export?format=csv';
  
  const csvUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || DEFAULT_SHEET_URL;

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    
    if (!response.ok) {
      console.error("Fetch failed with status:", response.status);
      return [];
    }

    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const cleanedData = results.data
            .filter(row => row['Staff name'] && row['Staff name'].trim() !== '')
            .map((row) => {
              const rawName = row['Staff name'] || '';
              const cleanName = rawName.replace(/[\u00A0\s]+/g, ' ').trim();

              return {
                ...row,
                'Staff name': cleanName,
                Year: row.Year ? parseInt(row.Year.toString().trim(), 10) : null,
                Type: row.Type ? row.Type.trim() : 'Uncategorized',
                Indexing: row.Indexing ? row.Indexing.trim() : 'Others',
                IsPSU: row["Is the author's affiliation with PSU?"] ? row["Is the author's affiliation with PSU?"].trim() : 'N'
              };
            });
          resolve(cleanedData);
        },
        error: (err) => {
          console.error("CSV Parsing Error:", err);
          resolve([]);
        }
      });
    });
  } catch (error) {
    console.error("Error fetching Google Sheets data:", error);
    return [];
  }
}