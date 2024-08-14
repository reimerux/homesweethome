import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'
import NextAuthSessionProvider from "@/app/nextauth/NextAuthSessionProvider"


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <title>Home Sweet Home</title>
      </head>
      <body className={inter.className}>      
        <Toaster position="bottom-left"/>
          <NavBar/>
        <main>
          <NextAuthSessionProvider>
            {children}
          </NextAuthSessionProvider>
        </main>
        </body>
    </html>
  )
}
