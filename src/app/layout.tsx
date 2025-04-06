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
  description:
    'Graphic designer and researcher with more than 10 years of experience and nominations for international awards such as Book Arles and Communication Arts, I have won the Latin American Designer Awards for two consecutive years and have expertise in editorial design. I have worked with world-renowned clients such as National Geographic. Currently, I teach at the Universidad Peruana de Ciencias Aplicadas and direct multiple graphic projects.',
  openGraph: {
    title: 'Raul Benua',
    description:
      'Graphic designer and researcher with more than 10 years of experience in editorial design and international awards.',
    images: ['/images/h/RaulBenua_geographiesofwater_ph1.jpg'],
    type: 'website',
    locale: 'es_PE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Raul Benua',
    description:
      'Graphic designer and researcher with more than 10 years of experience in editorial design and international awards.',
    images: ['/images/h/RaulBenua_geographiesofwater_ph1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
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
