import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, DM_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'GestionAndo — Controlá tu plata por WhatsApp',
  description: 'Anotá tus gastos enviando un simple mensaje. Sin apps complicadas, con inteligencia artificial.',
  icons: {
    icon: '/icons/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${jakarta.variable} ${dmSans.variable}`}>
      <body suppressHydrationWarning className="font-body text-slate-text bg-surface-base antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
