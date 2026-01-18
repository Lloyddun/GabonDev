import React, { useState } from 'react';
import { useNavigate } from '../context/AppContext'; // Updated import
import JobWizard from '../components/JobWizard';
import { AIJobProposal, Job } from '../types';
import { useApp } from '../context/AppContext';

const PostJob: React.FC = () => {
  const navigate = useNavigate();
  const { addJob, role } = useApp();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    skills: ''
  });

  // Redirect if not client
  if (role !== 'client') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
            <h2 className="text-xl font-bold text-slate-900">Accès Réservé</h2>
            <p className="text-slate-600 mb-4">Vous devez être en mode "Client" pour publier une annonce.</p>
        </div>
      </div>
    );
  }

  const handleAIAutoFill = (proposal: AIJobProposal) => {
    setFormData({
      title: proposal.title,
      description: proposal.description,
      skills: proposal.skills.join(', ')
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newJob: Job = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      skills: formData.skills.split(',').map(s => s.trim()),
      location: 'Gabon (Remote/Hybride)', // Default for simplicity
      type: 'Freelance',
      company: 'Client Particulier/PME', // Mock company
      postedDate: "À l'instant",
      authorId: 'demo-client'
    };

    addJob(newJob);
    navigate('/dashboard'); // Redirect to dashboard to see the post
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">Publier un Projet</h1>
        
        {/* AI Wizard */}
        <JobWizard onJobGenerated={handleAIAutoFill} />

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-slate-700">Titre du projet</label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div>
                <label htmlFor="skills" className="block text-sm font-medium text-slate-700">Compétences requises (séparées par des virgules)</label>
                <input
                  type="text"
                  id="skills"
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                  placeholder="ex: React, PHP, Photoshop"
                  value={formData.skills}
                  onChange={(e) => setFormData({...formData, skills: e.target.value})}
                />
              </div>

              {/* Budget removed as requested */}

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">Description détaillée</label>
                <textarea
                  id="description"
                  rows={6}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 border"
                  placeholder="Décrivez votre besoin le plus précisément possible..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                >
                  Publier l'annonce
                </button>
                <p className="mt-2 text-center text-xs text-slate-500">
                  Les développeurs vous proposeront leurs tarifs en répondant à cette annonce.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;