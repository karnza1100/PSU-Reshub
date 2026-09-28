import Papa from 'papaparse';

// URL จาก Google Sheets (Publish to Web เป็น CSV)
const GOOGLE_SHEET_CSV_URL = 'https://drive.google.com/file/d/1yWqzQ38ab9D4I0p3ydvLCBnGONPMdDet/view?usp=sharing';

export async function getResearchData() {
  const response = await fetch(GOOGLE_SHEET_CSV_URL);
  const csvText = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error) => reject(error),
    });
  });
}