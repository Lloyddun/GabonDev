import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DeveloperList from './pages/DeveloperList';
import JobList from './pages/JobList';
import PostJob from './pages/PostJob';
import ClientDashboard from './pages/ClientDashboard';
import DeveloperDashboard from './pages/DeveloperDashboard';
import Auth from './pages/Auth';
import DeveloperProfilePage from './pages/DeveloperProfile';
import Pricing from './pages/Pricing';
import Messages from './pages/Messages';
import KYCVerification from './pages/KYCVerification';
import AdminDashboard from './pages/AdminDashboard';
import { AppProvider, useApp } from './context/AppContext';

const AppContent: React.FC = () => {
  const { currentPath, role } = useApp();
  
  // Admin dashboard doesn't use the standard Navbar/Footer usually, 
  // but for simplicity we keep the structure or hide it based on role if needed.
  // Here we just render the component.
  
  if (currentPath === '/admin') {
      return <AdminDashboard />;
  }

  let content;
  if (currentPath === '/') {
    content = <Home />;
  } else if (currentPath === '/developers') {
    content = <DeveloperList />;
  } else if (currentPath === '/jobs') {
    content = <JobList />;
  } else if (currentPath === '/post-job') {
    content = <PostJob />;
  } else if (currentPath === '/dashboard') {
    content = <ClientDashboard />;
  } else if (currentPath === '/developer-dashboard') {
    content = <DeveloperDashboard />;
  } else if (currentPath === '/auth') {
    content = <Auth />;
  } else if (currentPath === '/profile') {
    content = <DeveloperProfilePage />;
  } else if (currentPath === '/pricing') {
    content = <Pricing />;
  } else if (currentPath === '/messages') {
    content = <Messages />;
  } else if (currentPath === '/kyc') {
    content = <KYCVerification />;
  } else {
    // Default or 404
    content = <Home />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {content}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;