import React from 'react';
import Header from './header.component';
import Footer from './footer.component';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'CLIENT' | 'TRAINER' | 'ADMIN';
  userName?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, userName }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header userRole={userRole} userName={userName} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 