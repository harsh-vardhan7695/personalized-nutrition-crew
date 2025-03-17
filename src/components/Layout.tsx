
import React from 'react';
import { cn } from "@/lib/utils";
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  className,
  hideHeader = false,
  hideFooter = false
}) => {
  return (
    <div className="min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white flex flex-col">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white">
        <div className="absolute top-0 -right-4 w-3/4 h-3/4 bg-blue-50 rounded-full blur-3xl opacity-50 transform -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 -left-4 w-3/4 h-3/4 bg-blue-50 rounded-full blur-3xl opacity-50 transform translate-y-1/4 -translate-x-1/4"></div>
      </div>
      
      {!hideHeader && <Header />}
      
      <main className={cn(
        "relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 animate-fade-in flex-grow",
        className
      )}>
        {children}
      </main>
      
      {!hideFooter && <Footer />}
    </div>
  );
};

export default Layout;
