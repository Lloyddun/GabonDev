import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole, ClientProfile, DeveloperProfile } from '../types';
import { User, Briefcase, Code } from 'lucide-react';

const Auth: React.FC = () => {
  const { login, signup } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setAuthRole] = useState<UserRole>('client');
  
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState<'M' | 'F'>('M');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isLogin) {
      // Login with Email and Password only
      login(email, role, password);
    } else {
      // Signup with full details
      const baseUser = {
        id: Date.now().toString(),
        name,
        email,
        phone,
        password, 
      };

      if (role === 'client') {
        const clientUser: ClientProfile = { ...baseUser, role: 'client' };
        signup(clientUser);
      } else {
        const devUser: DeveloperProfile = { 
            ...baseUser, 
            role: 'developer', 
            sex,
            skills: [] // Empty init
        };
        signup(devUser);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          {isLogin ? 'Connexion à GabonDev' : 'Créer un compte'}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          {isLogin ? 'Pas encore de compte ? ' : 'Déjà inscrit ? '}
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="font-medium text-emerald-600 hover:text-emerald-500"
          >
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          {/* Role Switcher */}
          <div className="flex mb-6 bg-slate-100 p-1 rounded-lg">
             <button
               type="button"
               onClick={() => setAuthRole('client')}
               className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${role === 'client' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
             >
               <Briefcase className="h-4 w-4" />
               Client
             </button>
             <button
               type="button"
               onClick={() => setAuthRole('developer')}
               className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${role === 'developer' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500'}`}
             >
               <Code className="h-4 w-4" />
               Développeur
             </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Nom complet</label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>

                {role === 'developer' && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Sexe</label>
                        <div className="mt-1 flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-emerald-600" name="sex" value="M" checked={sex === 'M'} onChange={() => setSex('M')} />
                                <span className="ml-2 text-slate-700">Homme</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input type="radio" className="form-radio text-emerald-600" name="sex" value="F" checked={sex === 'F'} onChange={() => setSex('F')} />
                                <span className="ml-2 text-slate-700">Femme</span>
                            </label>
                        </div>
                    </div>
                )}
              </>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Adresse Gmail</label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            {!isLogin && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Numéro de téléphone</label>
                  <div className="mt-1">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required={!isLogin}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700">Mot de passe</label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
              >
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;