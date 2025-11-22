// src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactButtons from '@/components/ContactButtons';

export const metadata: Metadata = {
  title: 'Aluminios y Vidrios en Pasto | Estructuras de Aluminio - Estructuras y Aluminios Pasto',
  description: 'Especialistas en acabados de aluminio y vidrios en Pasto. Ventanas, puertas, fachadas y estructuras de alta calidad. Más de [X] años de experiencia. Cotización gratis.',
  keywords: ['aluminios pasto', 'vidrios pasto', 'ventanas aluminio', 'puertas aluminio', 'fachadas vidrio', 'estructuras aluminio'],
  authors: [{ name: 'Carlos Julio Martinez Estructuras y Aluminios Pasto' }],
  openGraph: {
    title: 'Aluminios y Vidrios en Pasto | Estructuras de Aluminio',
    description: 'Especialistas en acabados de aluminio y vidrios en Pasto. Calidad y precisión en cada proyecto.',
    url: '',
    siteName: 'Estructuras y Aliminios Pasto',
    images: [
      {
        url: 'https://res.cloudinary.com/dzqm5gmyg/image/upload/v1763677622/Portada1_pugn6j.jpg',
        width: 1200,
        height: 630,
        alt: 'Taller de aluminio y vidrio en Pasto',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aluminios y Vidrios en Pasto',
    description: 'Especialistas en acabados de aluminio y vidrios. Calidad y precisión.',
    images: ['https://res.cloudinary.com/dzqm5gmyg/image/upload/v1763677622/Portada1_pugn6j.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased'
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <ContactButtons />
        <Toaster />
      </body>
    </html>
  );
}
