import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

const garam = localFont({
  src: './fonts/garam.otf',
  variable: '--font-garam',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Raul Benua',
  description: 'Raul Benua',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${garam.variable} antialiased bg-black text-[#B3B3B3] font-garam`}>{children}</body>
    </html>
  )
}
