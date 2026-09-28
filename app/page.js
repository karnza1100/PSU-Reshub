import ResearchDashboard from '@/components/ResearchDashboard';
import { getResearchData } from '@/lib/fetchResearchData';

// ตั้งค่าเพื่อไม่ให้ Vercel ทำ Caching ข้อมูลเก่าไว้
export const revalidate = 0;

export default async function Page() {
  const data = await getResearchData();
  return <ResearchDashboard initialData={data} />;
}