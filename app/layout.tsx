import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { UserProvider } from "./context/UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "MediGuard AI",
  description: "AI-powered healthcare assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>{children}</UserProvider>
      </body>
    </html>
  )
}

