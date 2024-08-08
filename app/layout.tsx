import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/NavBar'


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>      
        <Toaster position="bottom-left"/>
          <NavBar/>
        <main>
          {children}
        </main>
        </body>
    </html>
  )
}
