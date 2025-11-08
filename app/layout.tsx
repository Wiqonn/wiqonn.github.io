import type React from "react"
import type { Metadata } from "next"
import { Lato, Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-heading",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Wiqonn - AI & Technology Solutions for Real-World Impact",
  description:
    "Research-backed AI, Machine Learning, and advanced data analytics solutions. Transform your data into intelligent action with peer-reviewed methodologies.",
  keywords: "AI, Machine Learning, Data Analytics, Business Intelligence, Cloud Infrastructure, AI Agents",
  icons: {
    icon: "/wiqonn-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${openSans.variable} ${lato.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
