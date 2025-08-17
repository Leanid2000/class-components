import { ContextProvider } from './components/ThemeContext/ContextProvider';
import { Providers } from './providers';
import './ui/global.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Pokemon</title>
      </head>
      <body>
        <Providers>
          <ContextProvider>{<div id="root">{children}</div>}</ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
