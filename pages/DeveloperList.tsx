import React, { useState } from 'react';
import { MapPin, Star, Filter, ShieldCheck, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

const DeveloperList: React.FC = () => {
  const { developers } = useApp();
  const [filter, setFilter] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [minRate, setMinRate] = useState<number>(0);

  // Derive unique skills for filter
  const allSkills = Array.from(new Set(developers.flatMap(d => d.skills)));

  const filteredDevs = developers.filter(dev => {
    const matchesText = dev.name.toLowerCase().includes(filter.toLowerCase()) || 
                        dev.title.toLowerCase().includes(filter.toLowerCase());
    const matchesSkill = selectedSkill ? dev.skills.includes(selectedSkill) : true;
    const matchesRate = dev.hourlyRate >= minRate;
    
    return matchesText && matchesSkill && matchesRate;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">Trouvez un Freelance</h1>
          <p className="text-slate-600 mt-2">Comparez les profils, consultez les avis et choisissez le meilleur expert.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold pb-2 border-b border-slate-100">
                   <Filter className="h-5 w-5" /> Filtres
                </div>
                
                <div className="space-y-6">
                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Recherche</label>
                      <input
                        type="text"
                        placeholder="Mot-clé..."
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 text-sm border"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                      />
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Compétence</label>
                      <select 
                        className="w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 text-sm border"
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                      >
                         <option value="">Toutes les compétences</option>
                         {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                   </div>

                   <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Taux horaire min (FCFA)</label>
                      <input 
                         type="range" 
                         min="0" 
                         max="50000" 
                         step="1000"
                         className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
                         value={minRate}
                         onChange={(e) => setMinRate(parseInt(e.target.value))}
                      />
                      <div className="text-right text-xs text-slate-500 mt-1">{minRate.toLocaleString('fr-GA')} FCFA</div>
                   </div>

                   <button 
                     onClick={() => {setFilter(''); setSelectedSkill(''); setMinRate(0);}}
                     className="w-full text-center text-sm text-slate-500 hover:text-emerald-600 underline"
                   >
                      Réinitialiser les filtres
                   </button>
                </div>
             </div>
          </div>

          {/* Results List */}
          <div className="w-full lg:w-3/4 space-y-4">
            {filteredDevs.map((dev) => (
              <div key={dev.id} className={`bg-white rounded-xl shadow-sm border ${dev.isPremium ? 'border-emerald-200 ring-1 ring-emerald-100' : 'border-slate-200'} p-6 transition-all hover:shadow-md`}>
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Avatar & Status */}
                  <div className="flex-shrink-0 text-center">
                    <div className="relative inline-block">
                        <img src={dev.avatarUrl} alt={dev.name} className="h-20 w-20 rounded-full object-cover border-2 border-white shadow-sm" />
                        {dev.isVerified && (
                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-0.5" title="Identité vérifiée">
                                <ShieldCheck className="h-5 w-5 text-emerald-500 fill-white" />
                            </div>
                        )}
                    </div>
                    <div className="mt-2 flex items-center justify-center gap-1 text-yellow-500 text-sm font-bold">
                        <Star className="h-4 w-4 fill-current" />
                        <span>{dev.rating || 'N/A'}</span>
                        <span className="text-slate-400 font-normal">({dev.reviewCount})</span>
                    </div>
                    {dev.isPremium && (
                        <span className="mt-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                           <Award className="h-3 w-3 mr-1" /> PRO
                        </span>
                    )}
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                               {dev.name}
                               {dev.available && <span className="w-2.5 h-2.5 bg-green-500 rounded-full" title="Disponible"></span>}
                           </h3>
                           <p className="text-emerald-700 font-medium">{dev.title}</p>
                           <div className="flex items-center text-slate-500 text-sm mt-1">
                              <MapPin className="h-3 w-3 mr-1" /> {dev.location}
                              <span className="mx-2">•</span>
                              <span>{dev.experienceYears} ans d'expérience</span>
                              <span className="mx-2">•</span>
                              <span>{dev.completedProjects} projets terminés</span>
                           </div>
                        </div>
                        <div className="text-right hidden sm:block">
                           <div className="text-xl font-bold text-slate-900">{dev.hourlyRate?.toLocaleString('fr-GA')} <span className="text-xs font-normal text-slate-500">FCFA/h</span></div>
                        </div>
                     </div>

                     <p className="mt-3 text-slate-600 text-sm line-clamp-2">{dev.bio}</p>

                     <div className="mt-4 flex flex-wrap gap-2">
                        {dev.skills.slice(0, 5).map(skill => (
                           <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded-md">{skill}</span>
                        ))}
                        {dev.skills.length > 5 && <span className="text-xs text-slate-400 self-center">+{dev.skills.length - 5}</span>}
                     </div>
                  </div>

                  {/* Actions (Mobile optimized) */}
                  <div className="flex flex-row sm:flex-col justify-center gap-2 sm:border-l sm:border-slate-100 sm:pl-6 min-w-[140px]">
                      <div className="sm:hidden text-lg font-bold text-slate-900 mb-2">{dev.hourlyRate?.toLocaleString('fr-GA')} FCFA/h</div>
                      <button className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
                          Contacter
                      </button>
                      <button className="flex-1 bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
                          Voir profil
                      </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredDevs.length === 0 && (
                <div className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300">
                    <p className="text-slate-500">Aucun freelance ne correspond à vos critères.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperList;
