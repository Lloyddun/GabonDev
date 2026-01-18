import React from 'react';
import { useApp, Link } from '../context/AppContext';
import { Clock, CheckCircle, XCircle, FileText, ArrowRight, Wallet, ShieldAlert, Lock } from 'lucide-react';

const DeveloperDashboard: React.FC = () => {
  const { currentUser, role, proposals, jobs } = useApp();

  if (role !== 'developer' || !currentUser) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <p>Veuillez passer en mode Développeur pour voir votre tableau de bord.</p>
        </div>
    );
  }

  // Filter proposals sent by this developer
  const myProposals = proposals.filter(p => p.developerId === currentUser.id);

  // Status Badge Component
  const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
      case 'accepted':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1"/> Acceptée</span>;
      case 'rejected':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1"/> Refusée</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1"/> En attente</span>;
    }
  };

  const isVerified = currentUser.kycStatus === 'verified';
  const isPending = currentUser.kycStatus === 'pending';

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* KYC Alert Banner */}
        {!isVerified && (
            <div className={`mb-8 border-l-4 p-4 rounded-r-lg shadow-sm ${isPending ? 'bg-yellow-50 border-yellow-500' : 'bg-red-50 border-red-500'}`}>
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <ShieldAlert className={`h-6 w-6 mr-3 ${isPending ? 'text-yellow-600' : 'text-red-600'}`} />
                        <div>
                            <h3 className={`font-bold ${isPending ? 'text-yellow-800' : 'text-red-800'}`}>
                                {isPending ? 'Vérification en cours' : 'Compte Non Vérifié (KYC)'}
                            </h3>
                            <p className={`text-sm ${isPending ? 'text-yellow-700' : 'text-red-700'}`}>
                                {isPending 
                                    ? "Vos documents sont en cours d'analyse. Vous serez notifié bientôt." 
                                    : "Vous devez vérifier votre identité pour effectuer des retraits et sécuriser vos transactions."}
                            </p>
                        </div>
                    </div>
                    {!isPending && (
                        <Link to="/kyc" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
                            Vérifier maintenant
                        </Link>
                    )}
                </div>
            </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Mon Tableau de Bord</h1>
                <p className="text-slate-600 mt-1">Suivez vos candidatures et gérez votre activité.</p>
            </div>
            <Link to="/jobs" className="bg-emerald-600 text-white px-5 py-3 rounded-lg font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
                Trouver une mission <ArrowRight className="h-5 w-5" />
            </Link>
        </div>

        {/* Stats Grid including Wallet */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="text-slate-500 text-sm font-medium mb-1">Candidatures envoyées</div>
                <div className="text-3xl font-bold text-slate-900">{myProposals.length}</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div className="text-slate-500 text-sm font-medium mb-1">Missions en cours</div>
                <div className="text-3xl font-bold text-emerald-600">0</div>
            </div>
            
            {/* Wallet Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Portefeuille
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-4">{currentUser.balance?.toLocaleString('fr-GA')} FCFA</div>
                
                {isVerified ? (
                    <button className="w-full bg-slate-900 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                        Retirer mes fonds
                    </button>
                ) : (
                    <div className="relative">
                        <button disabled className="w-full bg-slate-100 text-slate-400 py-2 rounded-lg text-sm font-bold cursor-not-allowed flex items-center justify-center gap-2">
                            <Lock className="w-3 h-3" /> Retrait Bloqué
                        </button>
                        <p className="text-xs text-red-500 text-center mt-2">Vérification KYC requise</p>
                    </div>
                )}
            </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-emerald-600" />
            Mes Dernières Propositions
        </h2>

        {myProposals.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-dashed border-slate-300">
            <div className="mx-auto w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">Aucune proposition envoyée</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">Vous n'avez pas encore postulé à des missions. Explorez les offres disponibles pour commencer.</p>
            <Link to="/jobs" className="text-emerald-600 font-bold hover:underline">Voir les missions disponibles</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mission</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Mon Offre</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Statut</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {myProposals.map((prop) => {
                            const job = jobs.find(j => j.id === prop.jobId);
                            return (
                                <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-bold text-slate-900">{job?.title || "Mission inconnue"}</div>
                                        <div className="text-xs text-slate-500">{job?.company}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                        {prop.date}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                                        {prop.price.toLocaleString('fr-GA')} FCFA
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <StatusBadge status={prop.status || 'pending'} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperDashboard;
