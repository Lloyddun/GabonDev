import React from 'react';
import { Code2, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from '../context/AppContext';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white mb-2">
              <Code2 className="h-8 w-8 text-emerald-500" />
              <span className="font-bold text-xl tracking-tight">GabonDev</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              La première plateforme de freelancing dédiée aux talents technologiques du Gabon. 
              Nous connectons les entreprises locales aux meilleurs développeurs.
            </p>
            <div className="flex gap-4 pt-2">
               <a href="#" className="hover:text-emerald-500 transition-colors"><Facebook className="h-5 w-5" /></a>
               <a href="#" className="hover:text-emerald-500 transition-colors"><Twitter className="h-5 w-5" /></a>
               <a href="#" className="hover:text-emerald-500 transition-colors"><Linkedin className="h-5 w-5" /></a>
               <a href="#" className="hover:text-emerald-500 transition-colors"><Instagram className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Plateforme</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/developers" className="hover:text-emerald-500 transition-colors">Trouver un talent</Link></li>
              <li><Link to="/jobs" className="hover:text-emerald-500 transition-colors">Trouver une mission</Link></li>
              <li><Link to="/post-job" className="hover:text-emerald-500 transition-colors">Publier un projet</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-500 transition-colors">Tarifs & Abonnements</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-bold mb-6">Ressources</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Blog & Actualités</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Guide du Freelance</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Statistiques du marché</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">Centre d'aide</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>Libreville, Gabon<br/>Quartier Louis, Rue 42</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>contact@gabondev.ga</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                <span>+241 74 00 12 34</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} GabonDev Inc. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300">Confidentialité</a>
            <a href="#" className="hover:text-slate-300">CGU</a>
            <a href="#" className="hover:text-slate-300">Mentions Légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
