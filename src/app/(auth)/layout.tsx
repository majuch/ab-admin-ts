import React from 'react';


interface RootLayoutProps {
    children: React.ReactNode;
  }
  

export default function AuthLayout ({children} : RootLayoutProps) {
    return (
        <div className="auth-layout">
            <main className="flex items-center justify-center min-h-screen">
                {children}
            </main>
            <footer className="auth-footer">
                <p>&copy; 2025 AutoByte</p>
            </footer>
        </div>
    );
};
