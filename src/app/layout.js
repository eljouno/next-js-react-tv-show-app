
import { Roboto, Special_Elite } from "next/font/google";
import "./globals.scss";

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

const specialElite = Special_Elite({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-special-elite',
  display: 'swap',
});

export const metadata = {
  title: "TV Show App",
  description: "Discover popular TV shows",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${roboto.variable} ${specialElite.variable}`}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
