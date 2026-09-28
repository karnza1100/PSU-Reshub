import './globals.css';

export const metadata = {
  title: 'PSU-Reshub | College of Computing Research Analytics',
  description: 'Academic Research Dashboard for College of Computing, PSU Phuket',
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-slate-950 text-slate-100 antialiased">
        {children}
      </body>
    </html>
  );
}