import React, { useState } from 'react';
import { Briefcase, Clock, MapPin, Filter, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Job } from '../types';
import ApplyModal from '../components/ApplyModal';

const JobList: React.FC = () => {
  const { jobs, role, addProposal } = useApp();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterType, setFilterType] = useState('');

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleProposalSubmit = (proposal: any) => {
    addProposal(proposal);
    setIsModalOpen(false);
    alert("Votre proposition a été envoyée au client avec succès !");
  };

  const filteredJobs = filterType ? jobs.filter(j => j.type === filterType) : jobs;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900">Missions Freelance & Emplois</h1>
            <p className="text-slate-600 mt-2">Découvrez les dernières opportunités IT au Gabon.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="w-full lg:w-1/4">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
                    <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold pb-2 border-b border-slate-100">
                        <Filter className="h-5 w-5" /> Filtres
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Type de contrat</label>
                            <div className="space-y-2">
                                {['Freelance', 'Full-time', 'Part-time'].map(type => (
                                    <label key={type} className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="jobType" 
                                            className="text-emerald-600 focus:ring-emerald-500"
                                            checked={filterType === type}
                                            onChange={() => setFilterType(type)}
                                        />
                                        <span className="ml-2 text-sm text-slate-600">{type}</span>
                                    </label>
                                ))}
                                <label className="flex items-center">
                                    <input 
                                        type="radio" 
                                        name="jobType" 
                                        className="text-emerald-600 focus:ring-emerald-500"
                                        checked={filterType === ''}
                                        onChange={() => setFilterType('')}
                                    />
                                    <span className="ml-2 text-sm text-slate-600">Tout voir</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job List */}
            <div className="w-full lg:w-3/4 space-y-4">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 hover:border-emerald-300 transition-all hover:shadow-md">
                        <div className="flex flex-col md:flex-row md:justify-between gap-4">
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-slate-900 text-emerald-700 hover:underline cursor-pointer">{job.title}</h2>
                                <p className="text-slate-600 font-medium text-sm mt-1">{job.company}</p>
                                
                                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-500">
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-1" />
                                        {job.location}
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-1" />
                                        Publié: {job.postedDate}
                                    </div>
                                    {job.deadline && (
                                        <div className="flex items-center text-red-500">
                                            <Clock className="h-4 w-4 mr-1" />
                                            Limite: {job.deadline}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-end justify-between min-w-[150px]">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-600">
                                    {job.type}
                                </span>
                                {(job.budgetMin || job.budgetMax) && (
                                    <div className="mt-2 text-right">
                                        <div className="text-sm text-slate-500">Budget estimé</div>
                                        <div className="font-bold text-slate-900">
                                            {job.budgetMin ? job.budgetMin.toLocaleString('fr-GA') : '0'} 
                                            {job.budgetMax ? ` - ${job.budgetMax.toLocaleString('fr-GA')}` : '+'} FCFA
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mt-4 text-slate-700 text-sm leading-relaxed border-t border-slate-50 pt-4">
                            {job.description}
                        </p>

                        <div className="mt-5 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <span key={skill} className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-medium border border-emerald-100">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                            
                            {role === 'developer' ? (
                                <button 
                                    onClick={() => handleApplyClick(job)}
                                    className="bg-slate-900 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors shadow-sm"
                                >
                                    Faire une offre
                                </button>
                            ) : (
                                <span className="text-sm text-slate-400 italic">Connexion développeur requise</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {selectedJob && (
        <ApplyModal 
          job={selectedJob} 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleProposalSubmit}
        />
      )}
    </div>
  );
};

export default JobList;
