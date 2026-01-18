import React, { useState } from 'react';
import { Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { generateJobDescription } from '../services/geminiService';
import { AIJobProposal } from '../types';

interface JobWizardProps {
  onJobGenerated: (job: AIJobProposal) => void;
}

const JobWizard: React.FC<JobWizardProps> = ({ onJobGenerated }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateJobDescription(input);
      onJobGenerated(result);
    } catch (err) {
      setError("Une erreur est survenue lors de la génération. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-xl p-6 mb-8 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-emerald-100 rounded-lg hidden sm:block">
          <Sparkles className="h-6 w-6 text-emerald-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center gap-2">
            <span className="sm:hidden"><Sparkles className="h-5 w-5 text-emerald-600 inline"/></span>
            Assistant IA GabonDev
          </h3>
          <p className="text-slate-600 mb-4 text-sm">
            Vous ne savez pas comment décrire votre besoin ? Dites-nous simplement ce que vous voulez (ex: "Je veux un site pour ma pharmacie à Libreville"), et notre IA rédigera l'annonce pour vous.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ex: Une application de livraison pour mon restaurant..."
              className="flex-1 rounded-md border-slate-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-4 py-2 border text-slate-900"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
            <button
              onClick={handleGenerate}
              disabled={isLoading || !input.trim()}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Rédaction...
                </>
              ) : (
                <>
                  Générer
                  <Sparkles className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default JobWizard;
