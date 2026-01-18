import React, { useState } from 'react';
import { Menu, X, Code2, UserCircle, LogOut, LogIn, Bell, MessageSquare, ShieldCheck, ShieldAlert } from 'lucide-react';
import { Link, useLocation } from '../context/AppContext';
import { useApp } from '../context/AppContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { role, currentUser, logout, notifications } = useApp();

  const isActive = (path: string) => location.pathname === path ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-500";
  
  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const isVerified = currentUser?.kycStatus === 'verified';

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Code2 className="h-8 w-8 text-emerald-600" />
              <span className="font-bold text-xl text-slate-900 tracking-tight">GabonDev</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <Link to="/" className={isActive("/")}>Accueil</Link>
              
              {/* Guest or Client View */}
              {(role === 'client' || !currentUser) && (
                  <Link to="/developers" className={isActive("/developers")}>Trouver un Développeur</Link>
              )}
              
              {/* Developer View */}
              {role === 'developer' && (
                  <Link to="/jobs" className={isActive("/jobs")}>Missions</Link>
              )}

              {/* Dashboards */}
              {role === 'client' && currentUser && (
                <Link to="/dashboard" className={isActive("/dashboard")}>Mon Tableau de Bord</Link>
              )}
              {role === 'developer' && currentUser && (
                <Link to="/developer-dashboard" className={isActive("/developer-dashboard")}>Mon Tableau de Bord</Link>
              )}

              <Link to="/pricing" className={isActive("/pricing")}>Tarifs</Link>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
             {currentUser ? (
               <div className="flex items-center gap-4">
                 
                 {/* Icons Row */}
                 <div className="flex items-center gap-2 border-r border-slate-200 pr-4">
                     <Link to="/messages" className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
                        <MessageSquare className="h-5 w-5" />
                     </Link>
                     <button className="relative p-2 text-slate-500 hover:text-emerald-600 transition-colors">
                        <Bell className="h-5 w-5" />
                        {unreadNotifications > 0 && (
                            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                        )}
                     </button>
                 </div>

                 <div className="flex flex-col items-end">
                     <span className="text-sm text-slate-600">
                        <span className="font-bold text-slate-900">{currentUser.name}</span>
                     </span>
                     {!isVerified ? (
                         <Link to="/kyc" className="text-xs text-red-500 flex items-center gap-1 hover:underline font-bold">
                             <ShieldAlert className="w-3 h-3" /> Non vérifié
                         </Link>
                     ) : (
                         <span className="text-xs text-emerald-600 flex items-center gap-1 font-bold">
                             <ShieldCheck className="w-3 h-3" /> Vérifié
                         </span>
                     )}
                 </div>
                 
                 {role === 'client' && (
                   <Link to="/post-job" className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors shadow-sm">
                      Publier
                   </Link>
                 )}

                 {role === 'developer' && (
                    <Link to="/profile" className="flex items-center gap-1 text-slate-700 hover:text-emerald-600 text-sm font-medium">
                        <UserCircle className="h-5 w-5" />
                    </Link>
                 )}
                 
                 <button 
                    onClick={logout}
                    className="flex items-center gap-1 text-slate-400 hover:text-red-500 text-sm"
                 >
                    <LogOut className="h-4 w-4" />
                 </button>
               </div>
             ) : (
                <div className="flex items-center gap-2">
                   <Link to="/auth" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors">
                      <LogIn className="h-4 w-4" />
                      Connexion
                   </Link>
                </div>
             )}
          </div>

          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Accueil</Link>
            
            {(role === 'client' || !currentUser) && (
                <Link to="/developers" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Développeurs</Link>
            )}

            {role === 'developer' && (
                <Link to="/jobs" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Missions</Link>
            )}
            
            <Link to="/pricing" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Tarifs</Link>

            {currentUser ? (
               <>
                 <div className="border-t border-slate-100 my-2 pt-2">
                    <p className="px-3 text-sm text-slate-500 mb-2">Connecté en tant que {currentUser.name}</p>
                    <Link to="/messages" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Messagerie</Link>
                    
                    {!isVerified && (
                        <Link to="/kyc" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-bold text-red-600 bg-red-50 hover:bg-red-100 mb-2">Vérifier mon identité (KYC)</Link>
                    )}

                    {role === 'client' && (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Mon Tableau de Bord</Link>
                            <Link to="/post-job" onClick={() => setIsOpen(false)} className="block w-full text-center mt-4 px-3 py-3 rounded-md text-base font-medium bg-emerald-600 text-white hover:bg-emerald-700">Publier un Projet</Link>
                        </>
                    )}
                    {role === 'developer' && (
                         <>
                            <Link to="/developer-dashboard" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Mon Tableau de Bord</Link>
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">Mon Profil</Link>
                         </>
                    )}
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left px-3 py-2 text-red-600 font-medium">Déconnexion</button>
                 </div>
               </>
            ) : (
               <div className="mt-4">
                 <Link to="/auth" onClick={() => setIsOpen(false)} className="block w-full text-center px-4 py-2 rounded-md text-white bg-slate-900 font-medium">Connexion</Link>
               </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
