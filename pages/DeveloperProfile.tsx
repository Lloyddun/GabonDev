import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { DeveloperProfile } from '../types';
import { Save, User, Upload, CheckSquare, Square, Link as LinkIcon, Plus, Trash2 } from 'lucide-react';

const SKILLS_LIST = [
  "HTML/CSS", "JavaScript", "TypeScript", "React", "Vue.js", "Angular", 
  "Node.js", "PHP", "Laravel", "Symfony", "Python", "Django", "Flask",
  "Java", "Spring Boot", "C#", ".NET", "Flutter", "React Native", 
  "Android (Kotlin)", "iOS (Swift)", "SQL (MySQL/PostgreSQL)", 
  "NoSQL (MongoDB/Firebase)", "Docker", "AWS", "Git", "WordPress", "Shopify"
];

const DeveloperProfilePage: React.FC = () => {
  const { currentUser, updateProfile, navigate } = useApp();
  
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [portfolio, setPortfolio] = useState<{id: string, title: string, url: string}[]>([]);

  // Portfolio local state for adding new
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');

  useEffect(() => {
    if (!currentUser) {
        navigate('/auth');
    } else if (currentUser.role !== 'developer') {
        navigate('/dashboard');
    } else {
        const dev = currentUser as DeveloperProfile;
        setBio(dev.bio || '');
        setTitle(dev.title || '');
        setHourlyRate(dev.hourlyRate || 0);
        setLocation(dev.location || '');
        setExperienceYears(dev.experienceYears || 0);
        setSelectedSkills(dev.skills || []);
        setAvatarUrl(dev.avatarUrl || 'https://via.placeholder.com/150');
        setPortfolio(dev.portfolio || []);
    }
  }, [currentUser, navigate]);

  const handleSkillToggle = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddPortfolio = () => {
    if (newProjectTitle && newProjectUrl) {
        setPortfolio([...portfolio, { id: Date.now().toString(), title: newProjectTitle, url: newProjectUrl }]);
        setNewProjectTitle('');
        setNewProjectUrl('');
    }
  };

  const removePortfolio = (id: string) => {
      setPortfolio(portfolio.filter(p => p.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
    }
  };

  const handleSave = () => {
    updateProfile({
      bio,
      title,
      hourlyRate,
      location,
      experienceYears,
      skills: selectedSkills,
      avatarUrl,
      portfolio
    });
    alert('Profil mis à jour avec succès !');
  };

  if (!currentUser) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Mon Profil Développeur</h1>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8 space-y-8">
            
            {/* Header / Photo */}
            <div className="flex flex-col md:flex-row gap-8 items-start pb-8 border-b border-slate-100">
              <div className="flex flex-col items-center gap-4">
                 <div className="relative group">
                    <img 
                      src={avatarUrl} 
                      alt="Profil" 
                      className="w-32 h-32 rounded-full object-cover border-4 border-slate-100 shadow-md" 
                    />
                    <label className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                        <Upload className="text-white h-8 w-8" />
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                 </div>
                 <p className="text-xs text-slate-500 text-center">Cliquez pour changer</p>
              </div>

              <div className="flex-1 w-full space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Titre professionnel</label>
                    <input 
                      type="text" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Ex: Développeur Web Fullstack"
                      className="mt-1 block w-full rounded-md border-slate-300 border px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Taux Horaire (FCFA)</label>
                        <input 
                        type="number" 
                        value={hourlyRate} 
                        onChange={e => setHourlyRate(parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full rounded-md border-slate-300 border px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Expérience (années)</label>
                        <input 
                        type="number" 
                        value={experienceYears} 
                        onChange={e => setExperienceYears(parseInt(e.target.value) || 0)}
                        className="mt-1 block w-full rounded-md border-slate-300 border px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Ville</label>
                        <input 
                        type="text" 
                        value={location} 
                        onChange={e => setLocation(e.target.value)}
                        placeholder="Ex: Libreville"
                        className="mt-1 block w-full rounded-md border-slate-300 border px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        />
                    </div>
                 </div>
              </div>
            </div>

            {/* Bio */}
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-2">À propos de vous</label>
               <textarea 
                 rows={5}
                 value={bio}
                 onChange={e => setBio(e.target.value)}
                 placeholder="Décrivez votre parcours, vos points forts et pourquoi les clients devraient vous choisir..."
                 className="block w-full rounded-md border-slate-300 border px-3 py-2 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
               />
            </div>

            {/* Portfolio */}
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Portfolio (Projets récents)</label>
                <div className="space-y-3 mb-3">
                    {portfolio.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded border border-slate-200">
                             <div className="flex items-center gap-2 overflow-hidden">
                                 <LinkIcon className="h-4 w-4 text-slate-400" />
                                 <span className="font-medium text-sm">{p.title}</span>
                                 <span className="text-xs text-slate-500 truncate">- {p.url}</span>
                             </div>
                             <button onClick={() => removePortfolio(p.id)} className="text-red-500 hover:text-red-700">
                                 <Trash2 className="h-4 w-4" />
                             </button>
                        </div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Titre du projet" 
                        className="flex-1 rounded-md border-slate-300 border px-3 py-2 text-sm"
                        value={newProjectTitle}
                        onChange={e => setNewProjectTitle(e.target.value)}
                    />
                    <input 
                        type="url" 
                        placeholder="Lien (https://...)" 
                        className="flex-1 rounded-md border-slate-300 border px-3 py-2 text-sm"
                        value={newProjectUrl}
                        onChange={e => setNewProjectUrl(e.target.value)}
                    />
                    <button 
                        onClick={handleAddPortfolio}
                        type="button"
                        className="bg-slate-900 text-white px-3 py-2 rounded-md hover:bg-slate-800"
                    >
                        <Plus className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">Compétences Techniques</label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                 {SKILLS_LIST.map(skill => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                        <div 
                          key={skill} 
                          onClick={() => handleSkillToggle(skill)}
                          className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                        >
                           {isSelected ? <CheckSquare className="h-5 w-5 text-emerald-600" /> : <Square className="h-5 w-5 text-slate-300" />}
                           <span className="text-sm font-medium">{skill}</span>
                        </div>
                    )
                 })}
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4 border-t border-slate-100 flex justify-end">
               <button 
                 onClick={handleSave}
                 className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors shadow-sm"
               >
                  <Save className="h-5 w-5" />
                  Enregistrer les modifications
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfilePage;
