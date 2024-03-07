import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import StyledComponentsRegistry from './lib/registry'
import ThemeClient from "./lib/theme-client";
import './globals.css'

const quickSand = Quicksand({ 
  subsets: ['latin'],
  weight: [ '300', '400', '500', '600', '700']
 });

export const metadata: Metadata = {
  title: "Zap Test | Faraz Irfan",
  description: "Test task for the full-stack developer position",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quickSand.className}>
        <StyledComponentsRegistry>
          <ThemeClient>
            {children}
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
