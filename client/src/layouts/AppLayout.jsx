import React, {  useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ShowGuide from '../components/ui/ShowGuide';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';


const AppLayout = () => {
  const [showGuide, setShowGuide] = useState(false);

 
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
      
      <Header onToggleGuide={() => setShowGuide((prev) => !prev)}  />
      <main className="flex-grow">
        <Outlet />
        <Analytics />
      </main>
      <Footer />

      {showGuide && <ShowGuide onClose={() => setShowGuide(false)} />}
    </div>
  );
};

export default AppLayout;
