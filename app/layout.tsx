import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Note Geval",
  description: "NAS Markdown Note Editor",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
