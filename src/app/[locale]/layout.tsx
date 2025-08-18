import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { ContextProvider } from '../components/ThemeContext/ContextProvider';
import { Providers } from './providers';
import './ui/global.css';
import { routing } from '../../i18n/routing';
import { notFound } from 'next/navigation';

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <title>Pokemon</title>
      </head>
      <body>
        <NextIntlClientProvider>
          <Providers>
            <ContextProvider>{<div id="root">{children}</div>}</ContextProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
