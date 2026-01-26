
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import TopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Shrisant Adhikari',
  description: 'Full Stack Developer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <TopLoader
          color="#9333EA"
          initialPosition={0.08}
          crawlSpeed={200}
          height={6}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #10b98140, 0 0 5px #10b98140"
        />

        <ThemeProvider
          attribute="data-theme"
          defaultTheme="dark"
          themes={['light', 'dark']}
          enableSystem={false}
        >
          <div className="flex flex-col md:flex-row min-h-screen">
            <Sidebar />
            <main className="w-full md:ml-64 p-4 md:p-8 transition-all duration-300">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}