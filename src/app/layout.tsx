// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// import './globals.css';
// import Sidebar from '@/components/layout/Sidebar';
// import { ThemeProvider } from '@/components/theme-provider';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'Shrisant Adhikari',
//   description: 'Full Stack Developer',
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} antialiased`}>
//         <ThemeProvider
//           attribute="data-theme"
//           defaultTheme="dark"
//           themes={['light', 'dark']}
//           enableSystem={false}
//         >
//           <div className="flex md:flex-row flex-col">
//             <Sidebar />
//             <main className="ml-64 w-full">{children}</main>
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }






import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';

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
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
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
