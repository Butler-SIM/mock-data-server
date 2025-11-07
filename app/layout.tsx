import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mock Data Server',
  description: 'Next.js Mock Data API Server for Testing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
