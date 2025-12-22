import { Geist, Geist_Mono } from 'next/font/google'
// import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Header from '@/components/ui/header.jsx'
import Footer from '@/components/ui/footer.jsx'
import { ClerkProvider } from '@clerk/nextjs'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata = {
  title: 'CareerPilot',
  description: 'Your AI-Powered Career Companion',
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          > */}
            <Header />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          {/* </ThemeProvider> */}
        </body>
      </html>
    </ClerkProvider>
  )
}
