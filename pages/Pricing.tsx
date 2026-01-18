import React from 'react';
import { Check, Zap, Crown, Shield } from 'lucide-react';
import { Link } from '../context/AppContext';

const Pricing: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Choisissez le plan qui vous correspond
        </h1>
        <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
          Démarrez gratuitement ou passez à la vitesse supérieure pour maximiser vos revenus freelance au Gabon.
        </p>
        
        {/* Payment Methods Banner */}
        <div className="mt-8 flex justify-center items-center gap-6 opacity-80 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-bold text-blue-600"><div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">W</div> Wave</div>
            <div className="flex items-center gap-2 font-bold text-red-600"><div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center">A</div> Airtel Money</div>
            <div className="flex items-center gap-2 font-bold text-slate-700"><div className="w-8 h-8 rounded bg-slate-200 flex items-center justify-center">CB</div> Visa/Mastercard</div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-slate-900">Standard</h3>
            <p className="mt-2 text-slate-500 text-sm">Pour débuter votre carrière.</p>
            <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">0</span>
                <span className="text-slate-500 font-medium"> FCFA / mois</span>
            </div>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-8">
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Profil basique</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> 5 candidatures / mois</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Commission 15%</li>
                <li className="flex items-center text-slate-400"><Check className="h-5 w-5 mr-2" /> Support prioritaire</li>
                <li className="flex items-center text-slate-400"><Check className="h-5 w-5 mr-2" /> Badge Vérifié</li>
            </ul>
            <Link to="/auth" className="block w-full py-3 px-4 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                Commencer Gratuitement
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-2xl shadow-xl border-2 border-emerald-500 p-8 transform scale-105 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                Populaire
            </div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Crown className="h-5 w-5 text-yellow-500" /> Premium
            </h3>
            <p className="mt-2 text-slate-500 text-sm">Pour les freelances actifs.</p>
            <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">5 000</span>
                <span className="text-slate-500 font-medium"> FCFA / mois</span>
            </div>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-8">
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Profil mis en avant</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> 50 candidatures / mois</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Commission réduite (10%)</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Badge "Vérifié" <Shield className="h-3 w-3 ml-1 text-emerald-500"/></li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Alertes SMS instantanées</li>
            </ul>
            <button className="block w-full py-3 px-4 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200">
                S'abonner avec Mobile Money
            </button>
          </div>

          {/* Agency Plan */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
                <Zap className="h-5 w-5 text-purple-500" /> Agency
            </h3>
            <p className="mt-2 text-slate-500 text-sm">Pour les équipes et agences.</p>
            <div className="my-6">
                <span className="text-4xl font-extrabold text-slate-900">15 000</span>
                <span className="text-slate-500 font-medium"> FCFA / mois</span>
            </div>
            <ul className="space-y-4 text-left text-sm text-slate-600 mb-8">
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Candidatures illimitées</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Commission minimale (5%)</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Support VIP dédié</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Accès aux coordonnées clients</li>
                <li className="flex items-center"><Check className="h-5 w-5 text-emerald-500 mr-2" /> Facturation automatique</li>
            </ul>
            <button className="block w-full py-3 px-4 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-colors">
                Contacter pour activer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
