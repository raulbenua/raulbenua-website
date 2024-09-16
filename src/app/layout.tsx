import './globals.css'

import type { Metadata } from 'next'
import localFont from 'next/font/local'

const garam = localFont({
  src: './fonts/garam.otf',
  variable: '--font-garam',
  weight: '100 900',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Raul Benua',
  description: 'Portafolio de Raul Benua',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`${garam.variable} antialiased font-garam`}>{children}</body>
    </html>
  )
}
