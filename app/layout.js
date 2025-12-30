import { Geist, Geist_Mono } from 'next/font/google'
// import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import Header from '@/components/header.jsx'
import Footer from '@/components/footer.jsx'
import { ClerkProvider } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser'
import { ThemeProvider } from '@/components/ui/theme-provider'


export const metadata = {
  title: 'CareerPilot',
  description: 'Your AI-Powered Career Companion',
}

export default async function RootLayout({ children }) {
  await checkUser();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <main className="min-h-screen pt-16">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
