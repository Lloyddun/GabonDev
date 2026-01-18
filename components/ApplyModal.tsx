import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Job, Proposal } from '../types';
import { useApp } from '../context/AppContext';

interface ApplyModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proposal: Proposal) => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ job, isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [price, setPrice] = useState('');
  const { currentUser } = useApp();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const newProposal: Proposal = {
      id: Date.now().toString(),
      jobId: job.id,
      developerName: currentUser.name, 
      developerId: currentUser.id,
      message: message,
      price: parseInt(price),
      date: "À l'instant",
      status: 'pending'
    };
    onSubmit(newProposal);
    // Reset form
    setMessage('');
    setPrice('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                    Postuler pour : {job.title}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                      Votre approche / Méthodologie
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      required
                      className="mt-1 block w-full rounded-md border-slate-300 border shadow-sm focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 text-sm"
                      placeholder="Expliquez comment vous allez réaliser ce projet..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                      Votre Tarif Proposé (FCFA)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        type="number"
                        id="price"
                        required
                        className="block w-full rounded-md border-slate-300 border focus:border-emerald-500 focus:ring-emerald-500 px-3 py-2 text-sm"
                        placeholder="Ex: 250000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-slate-500 sm:text-sm">XAF</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none sm:text-sm"
                    >
                      Envoyer ma proposition <Send className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
