import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, ChevronUp, MessageSquare, Tag } from 'lucide-react';
import { Proposal } from '../types';

const ClientDashboard: React.FC = () => {
  const { myJobs, proposals, role } = useApp();
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);

  if (role !== 'client') {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <p>Veuillez passer en mode Client pour voir votre tableau de bord.</p>
        </div>
    );
  }

  const toggleExpand = (id: string) => {
    setExpandedJobId(expandedJobId === id ? null : id);
  };

  const getProposalsForJob = (jobId: string) => {
    return proposals.filter(p => p.jobId === jobId);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Mon Tableau de Bord</h1>
        <p className="text-slate-600 mb-8">Gérez vos annonces et consultez les offres des développeurs.</p>

        {myJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border border-slate-200">
            <p className="text-slate-500 mb-4">Vous n'avez publié aucun projet pour le moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {myJobs.map(job => {
              const jobProposals = getProposalsForJob(job.id);
              const isExpanded = expandedJobId === job.id;

              return (
                <div key={job.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div 
                    className="p-6 cursor-pointer hover:bg-slate-50 transition-colors flex justify-between items-center"
                    onClick={() => toggleExpand(job.id)}
                  >
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{job.title}</h2>
                      <p className="text-sm text-slate-500">Publié {job.postedDate}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">
                        {jobProposals.length} proposition{jobProposals.length > 1 ? 's' : ''}
                      </div>
                      {isExpanded ? <ChevronUp className="h-5 w-5 text-slate-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-50 px-6 py-6 border-t border-slate-100">
                      <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Propositions reçues</h3>
                      
                      {jobProposals.length === 0 ? (
                        <p className="text-slate-500 italic text-sm">Aucune proposition pour le moment. Revenez plus tard !</p>
                      ) : (
                        <div className="space-y-4">
                          {jobProposals.map((prop) => (
                            <div key={prop.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                              <div className="flex justify-between items-start mb-3">
                                <h4 className="font-bold text-slate-900">{prop.developerName}</h4>
                                <span className="text-emerald-600 font-bold text-lg bg-emerald-50 px-2 py-1 rounded">
                                  {prop.price.toLocaleString('fr-GA')} FCFA
                                </span>
                              </div>
                              <div className="flex items-start gap-3">
                                <MessageSquare className="h-5 w-5 text-slate-400 mt-1 flex-shrink-0" />
                                <p className="text-slate-700 text-sm whitespace-pre-wrap">{prop.message}</p>
                              </div>
                              <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                                <button className="text-sm text-white bg-slate-900 px-3 py-1.5 rounded hover:bg-slate-800 transition-colors">
                                  Contacter
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
