import type {Metadata} from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartDrawer from '@/components/CartDrawer';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'House of Tabani | Official Online Store Pakistan',
  description: 'Shop premium Pret, Eastern wear, kurtas, and luxury fragrances. Buy 3 items and get free delivery across Pakistan with WhatsApp checkout.',
  openGraph: {
    title: 'House of Tabani | Official Online Store Pakistan',
    description: 'Shop premium Pret, Eastern wear, kurtas, and luxury fragrances. Fast delivery across Pakistan.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Tabani | Official Online Store Pakistan',
    description: 'Shop premium Pret, Eastern wear, kurtas, and luxury fragrances. Fast delivery across Pakistan.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${playfairDisplay.variable} scroll-smooth`}>
      <body className="bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white antialiased font-sans" suppressHydrationWarning>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}

