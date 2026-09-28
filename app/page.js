import ResearchDashboard from '../components/ResearchDashboard';
import { getResearchData } from '../lib/fetchResearchData';

export default async function HomePage() {
  const data = await getResearchData();

  return (
    <main className="container mx-auto">
      <ResearchDashboard initialData={data} />
    </main>
  );
}