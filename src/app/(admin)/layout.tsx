"use client"

import "../globals.css";
import Sidebar from '@/components/Sidebar';
import React from "react";
import { Footer } from "@/components/Footer";
import { useSidebar } from "@/hooks/useSidebar";
import { useStore } from "@/hooks/useStore";
import { cn } from "@/lib/utils";
import { SearchProvider } from "@/context/SearchContext";


export default function AdminLayout({ children }: { children: React.ReactNode; }) {
  
  const sidebar = useStore(useSidebar, (x) => x);
  
  if (!sidebar) return null;
  const { getOpenState, settings } = sidebar;
  
  return (
    <>
        <Sidebar/>
        <main 
          className={cn(
            "min-h-[calc(100vh_-_56px)] bg-zinc-100 dark:bg-zinc-950 transition-[margin-left] ease-in-out duration-300 ",
            !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
          )}>
            <SearchProvider>
              {children}
            </SearchProvider>
        </main>
        <footer
          className={cn(
            "transition-[margin-left] ease-in-out duration-300",
            !settings.disabled && (!getOpenState() ? "lg:ml-[90px]" : "lg:ml-72")
          )}
        >
          <Footer />
        </footer>
    </>
  );
}
