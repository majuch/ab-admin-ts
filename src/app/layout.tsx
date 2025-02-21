import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ClientOnly from "@/components/clientOnly";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AB-Admin",
  description: "Gestion y busqueda de articulos de AB",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClientOnly>
          <ThemeProvider defaultTheme="dark" attribute="class" enableSystem={false}>
            <NotificationProvider>
                  {children}
            </NotificationProvider>
          </ThemeProvider>
        </ClientOnly>
      </body>
    </html>
  );
}
