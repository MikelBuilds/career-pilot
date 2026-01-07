import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/header.jsx'
import Footer from '@/components/footer.jsx'
import { ClerkProvider } from '@clerk/nextjs'
import { checkUser } from '@/lib/checkUser'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata = {
  title: 'CareerPilot | AI-Powered Career Companion',
  description: 'Navigate your career with confidence. From resume building to interview prep, CareerPilot provides AI-driven insights tailored to your industry.',
}

export default async function RootLayout({ children }) {
  await checkUser();

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jakarta.variable}`}>
        <body className="font-sans">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16">
                {children}
              </main>
              <Toaster richColors position="top-center" />
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
