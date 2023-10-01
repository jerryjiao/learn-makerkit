import './globals.css'
import { use } from 'react';
 
import { Inter } from 'next/font/google'
import Providers from '@/components/Providers'
import AuthChangeListener from '@/components/AuthChangeListener';
import UserSessionProvider from "@/components/UserSessionProvider";
import loadSession from "@/lib/load-session";
 
const inter = Inter({ subsets: ['latin'] })
 
// export const runtime = 'edge'; // uncomment this line to use Edge Runtime
 
export const dynamic = 'force-dynamic';
 
export const metadata = {
  title: 'Smart Blogging Assistant - Your powerful content assistant',
  description: 'Smart Blogging Assistant is a tool that helps you write better content, faster. Use AI to generate blog post outlines, write blog posts, and more. Start for free, upgrade when you\'re ready.',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = use(loadSession());
 
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background`}>
        <AuthChangeListener session={session}>
          <UserSessionProvider session={session}>
            <Providers>
              {children}
            </Providers>
          </UserSessionProvider>
        </AuthChangeListener>
      </body>
    </html>
  )
}