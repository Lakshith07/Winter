import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import MobileNav from './MobileNav';
import Toast from '../common/Toast';
import MilestoneModal from '../common/MilestoneModal';
import { useWinterArc } from '../../context/WinterArcContext';

export default function Layout() {
  const { toastMessage, setToastMessage, activeMilestone, setActiveMilestone } = useWinterArc();

  return (
    <div className="min-h-screen flex bg-[#070a10] text-slate-100 font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background ambient subtle gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-900/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] bg-cyan-950/15 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen w-full relative z-10 pb-20 lg:pb-8">
        <Navbar />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          <Outlet />
        </main>

        <MobileNav />
      </div>

      {/* Global Toast */}
      <Toast 
        toast={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      {/* Milestone Unlocked Modal */}
      <MilestoneModal 
        milestone={activeMilestone} 
        onClose={() => setActiveMilestone(null)} 
      />
    </div>
  );
}
