import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NotificationProvider } from "@/context/NotificationContext";

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

export default function RootLayout({ children }: RootLayoutProps){
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <NotificationProvider>
          <main className="flex p-2 pr-4 items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            {children}
          </main>
        </NotificationProvider>
      </body>
    </html>
  );
}
