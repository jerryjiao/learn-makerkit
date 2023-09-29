import './globals.css';
import { Inter } from 'next/font/google';
 
const inter = Inter({ subsets: ['latin'] });
 
export const runtime = 'edge';
 
// this is needed to force dynamic runtime
export const dynamic = 'force-dynamic';
 
export const metadata = {
  title: 'Smart Blogging Assistant - Your powerful content assistant',
  description: 'Smart Blogging Assistant is a tool that helps you write better content, faster. Use AI to generate blog post outlines, write blog posts, and more. Start for free, upgrade when you\'re ready.',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='dark'>
      <body className={`${inter.className} min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  )
}