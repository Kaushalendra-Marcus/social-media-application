import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { dark } from '@clerk/themes'
import '../globals.css'

export const metadata = {
  title: "Threads-marcus-coder",
  description: "Let's build thread"
}
const inter = Inter({ subsets: ["latin"] })
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en">
        <body className={`${inter.className}`}>

          <main className="flex">

            <section className="main-container">
              <div className="w-full max-w-4xl">
                {children}
              </div>
            </section>

          </main>

        </body>
      </html>
    </ClerkProvider>
  )
}
