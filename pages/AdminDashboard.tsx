import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
    Users, Clock, DollarSign, ShieldCheck, MessageSquare, Bell, 
    Lock, Unlock, Download, Check, X, Search, FileText, ChevronRight, LogOut, Bot, Mic
} from 'lucide-react';
import { Transaction, Developer } from '../types';
import { generateSupportReply } from '../services/geminiService';

const AdminDashboard: React.FC = () => {
  const { 
      currentUser, role, developers, transactions, updateUserStatus, 
      processKYC, sendNotification, logout, navigate 
  } = useApp();
  
  const [activeTab, setActiveTab] = useState<'comptes' | 'historique' | 'solde' | 'kyc' | 'support' | 'notif'>('comptes');
  const [selectedUserKYC, setSelectedUserKYC] = useState<Developer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifType, setNotifType] = useState<'info' | 'success' | 'warning'>('info');

  // Support AI State
  const [aiEnabled, setAiEnabled] = useState(false);
  const [chatHistory, setChatHistory] = useState<{sender: 'user' | 'ai' | 'system', text: string}[]>([
      {sender: 'system', text: 'Chat initialisé. En attente de messages...'}
  ]);
  const [simulatedUserMsg, setSimulatedUserMsg] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Security Redirect: If not admin, go home immediately
  useEffect(() => {
    if (role !== 'admin' || !currentUser) {
        navigate('/');
    }
  }, [role, currentUser, navigate]);

  useEffect(() => {
    if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Prevent rendering if not admin (avoids flash of content)
  if (role !== 'admin' || !currentUser) {
      return null; 
  }

  // Derived Data
  const totalUserBalance = developers.reduce((acc, dev) => acc + (dev.balance || 0), 0);
  const platformFees = transactions
    .filter(t => t.type === 'fee' && t.status === 'completed')
    .reduce((acc, t) => acc + t.amount, 0);

  const pendingKYC = developers.filter(d => d.kycStatus === 'pending');

  const handleDownloadKYC = (dev: Developer) => {
      // Mock download logic
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dev, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", `KYC_REPORT_${dev.realLastName}_${dev.id}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      alert(`Les informations de ${dev.realLastName} ont été téléchargées pour la police.`);
  };

  const handleSendNotif = (target: string) => {
      sendNotification(target, notifMessage, notifType);
      alert('Notification envoyée !');
      setNotifMessage('');
  };

  // Simulate receiving a message from a user and AI responding
  const handleSimulateMessage = async () => {
      if(!simulatedUserMsg.trim()) return;

      const userText = simulatedUserMsg;
      setSimulatedUserMsg('');
      
      // Add User Message
      setChatHistory(prev => [...prev, {sender: 'user', text: userText}]);

      if (aiEnabled) {
          setIsAiThinking(true);
          try {
              // Pass relay to AI service
              const aiResponse = await generateSupportReply(userText, chatHistory.map(m => m.text));
              
              setChatHistory(prev => [...prev, {sender: 'ai', text: aiResponse.text}]);

              if (aiResponse.needsHuman) {
                  setChatHistory(prev => [...prev, {sender: 'system', text: '⚠️ ESCALADE : Sarah (IA) a demandé l\'intervention d\'un support réel.'}]);
              }

          } catch (e) {
              setChatHistory(prev => [...prev, {sender: 'system', text: 'Erreur IA.'}]);
          } finally {
              setIsAiThinking(false);
          }
      } else {
          // If AI disabled, just log that no one replied
          setTimeout(() => {
              setChatHistory(prev => [...prev, {sender: 'system', text: 'En attente d\'un agent humain... (IA désactivée)'}]);
          }, 1000);
      }
  };

  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-800">
            <h1 className="text-xl font-bold text-emerald-500">ESPACE ADMIN</h1>
            <p className="text-xs text-slate-400 mt-1">Secret Access</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
            <button onClick={() => setActiveTab('comptes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'comptes' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Users className="h-5 w-5" /> Comptes
            </button>
            <button onClick={() => setActiveTab('historique')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'historique' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Clock className="h-5 w-5" /> Historique
            </button>
            <button onClick={() => setActiveTab('solde')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'solde' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <DollarSign className="h-5 w-5" /> Soldes
            </button>
            <button onClick={() => setActiveTab('kyc')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'kyc' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <ShieldCheck className="h-5 w-5" /> KYC ({pendingKYC.length})
            </button>
            <button onClick={() => setActiveTab('support')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'support' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Bot className="h-5 w-5" /> Support & IA
            </button>
            <button onClick={() => setActiveTab('notif')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'notif' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}>
                <Bell className="h-5 w-5" /> Notifications
            </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
            <button 
                onClick={logout} 
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
            >
                <LogOut className="h-5 w-5" /> Déconnexion
            </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8">
          
          {/* Mobile Header */}
          <div className="md:hidden flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm">
             <span className="font-bold">Admin Panel</span>
             <button onClick={logout} className="text-red-500"><LogOut className="h-5 w-5" /></button>
          </div>
          
          {/* TAB: COMPTES */}
          {activeTab === 'comptes' && (
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Gestion des Comptes Développeurs</h2>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                      <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                  <th className="p-4 font-semibold text-slate-600">Nom Compte</th>
                                  <th className="p-4 font-semibold text-slate-600">Nom Réel (KYC)</th>
                                  <th className="p-4 font-semibold text-slate-600">Email</th>
                                  <th className="p-4 font-semibold text-slate-600">Portefeuille</th>
                                  <th className="p-4 font-semibold text-slate-600">Statut</th>
                                  <th className="p-4 font-semibold text-slate-600">Action</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                              {developers.map(dev => (
                                  <tr key={dev.id} className="hover:bg-slate-50">
                                      <td className="p-4 font-medium text-slate-900">{dev.name}</td>
                                      <td className="p-4 text-slate-600">{dev.realLastName ? `${dev.realFirstName} ${dev.realLastName}` : '-'}</td>
                                      <td className="p-4 text-slate-500">{dev.email}</td>
                                      <td className="p-4 font-bold text-emerald-600">{(dev.balance || 0).toLocaleString()} FCFA</td>
                                      <td className="p-4">
                                          {dev.isBlocked ? (
                                              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">Bloqué</span>
                                          ) : (
                                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-bold">Actif</span>
                                          )}
                                      </td>
                                      <td className="p-4">
                                          {dev.isBlocked ? (
                                              <button onClick={() => updateUserStatus(dev.id, 'unblock')} className="text-green-600 hover:bg-green-50 p-2 rounded" title="Débloquer">
                                                  <Unlock className="h-5 w-5" />
                                              </button>
                                          ) : (
                                              <button onClick={() => updateUserStatus(dev.id, 'block')} className="text-red-600 hover:bg-red-50 p-2 rounded" title="Bloquer">
                                                  <Lock className="h-5 w-5" />
                                              </button>
                                          )}
                                      </td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

          {/* TAB: HISTORIQUE */}
          {activeTab === 'historique' && (
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Historique des Transactions</h2>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                      <table className="w-full text-left">
                          <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                  <th className="p-4 font-semibold text-slate-600">ID</th>
                                  <th className="p-4 font-semibold text-slate-600">Date</th>
                                  <th className="p-4 font-semibold text-slate-600">Type</th>
                                  <th className="p-4 font-semibold text-slate-600">De</th>
                                  <th className="p-4 font-semibold text-slate-600">Vers</th>
                                  <th className="p-4 font-semibold text-slate-600">Montant</th>
                                  <th className="p-4 font-semibold text-slate-600">Description</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                              {transactions.map(t => (
                                  <tr key={t.id} className="hover:bg-slate-50">
                                      <td className="p-4 text-xs text-slate-400 font-mono">{t.id}</td>
                                      <td className="p-4 text-slate-600 text-sm">{t.date}</td>
                                      <td className="p-4">
                                          <span className={`text-xs px-2 py-1 rounded-full font-bold uppercase ${
                                              t.type === 'payment' ? 'bg-blue-100 text-blue-800' : 
                                              t.type === 'withdrawal' ? 'bg-orange-100 text-orange-800' :
                                              t.type === 'fee' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100'
                                          }`}>
                                              {t.type}
                                          </span>
                                      </td>
                                      <td className="p-4 text-sm font-medium">{t.fromUserId}</td>
                                      <td className="p-4 text-sm font-medium">{t.toUserId}</td>
                                      <td className="p-4 font-bold text-slate-900">{t.amount.toLocaleString()} FCFA</td>
                                      <td className="p-4 text-sm text-slate-500">{t.description}</td>
                                  </tr>
                              ))}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

          {/* TAB: SOLDE */}
          {activeTab === 'solde' && (
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Solde & Revenus</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 bg-blue-100 rounded-lg">
                                  <Users className="h-8 w-8 text-blue-600" />
                              </div>
                              <div>
                                  <p className="text-sm text-slate-500 font-medium">Solde Total Utilisateurs</p>
                                  <h3 className="text-3xl font-bold text-slate-900">{totalUserBalance.toLocaleString()} FCFA</h3>
                              </div>
                          </div>
                          <p className="text-sm text-slate-400">Argent détenu par les développeurs sur la plateforme.</p>
                      </div>

                      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                          <div className="flex items-center gap-4 mb-4">
                              <div className="p-3 bg-emerald-100 rounded-lg">
                                  <DollarSign className="h-8 w-8 text-emerald-600" />
                              </div>
                              <div>
                                  <p className="text-sm text-slate-500 font-medium">Revenus Entreprise (8%)</p>
                                  <h3 className="text-3xl font-bold text-emerald-600">{platformFees.toLocaleString()} FCFA</h3>
                              </div>
                          </div>
                          <p className="text-sm text-slate-400">Total des commissions perçues sur les projets.</p>
                      </div>
                  </div>
              </div>
          )}

          {/* TAB: KYC */}
          {activeTab === 'kyc' && (
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Demandes KYC ({pendingKYC.length})</h2>
                  {selectedUserKYC ? (
                      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200">
                          <button onClick={() => setSelectedUserKYC(null)} className="mb-6 text-slate-500 hover:text-slate-800 flex items-center gap-2">
                             &larr; Retour à la liste
                          </button>
                          
                          <div className="flex flex-col lg:flex-row gap-8">
                              <div className="flex-1 space-y-4">
                                  <h3 className="text-xl font-bold border-b pb-2">Informations Réelles</h3>
                                  <div className="grid grid-cols-2 gap-4">
                                      <div><span className="text-slate-500 text-sm">Nom :</span> <p className="font-bold">{selectedUserKYC.realLastName}</p></div>
                                      <div><span className="text-slate-500 text-sm">Prénom :</span> <p className="font-bold">{selectedUserKYC.realFirstName}</p></div>
                                      <div><span className="text-slate-500 text-sm">Date Naissance :</span> <p className="font-bold">{selectedUserKYC.birthDate}</p></div>
                                      <div><span className="text-slate-500 text-sm">Lieu Naissance :</span> <p className="font-bold">{selectedUserKYC.birthPlace}</p></div>
                                      <div><span className="text-slate-500 text-sm">Type Document :</span> <p className="font-bold">{selectedUserKYC.kycDocType}</p></div>
                                  </div>
                                  
                                  <div className="pt-6 flex flex-col md:flex-row gap-4">
                                      <button 
                                        onClick={() => { processKYC(selectedUserKYC.id, 'approve'); setSelectedUserKYC(null); }}
                                        className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700 flex items-center gap-2 justify-center"
                                      >
                                          <Check className="h-5 w-5" /> Valider KYC
                                      </button>
                                      <button 
                                        onClick={() => { processKYC(selectedUserKYC.id, 'reject'); setSelectedUserKYC(null); }}
                                        className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700 flex items-center gap-2 justify-center"
                                      >
                                          <X className="h-5 w-5" /> Refuser
                                      </button>
                                      <button 
                                        onClick={() => handleDownloadKYC(selectedUserKYC)}
                                        className="border border-slate-300 text-slate-700 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 flex items-center gap-2 justify-center"
                                      >
                                          <Download className="h-5 w-5" /> Rapport
                                      </button>
                                  </div>
                              </div>
                              
                              <div className="flex-1 space-y-6">
                                  <div>
                                      <p className="font-bold mb-2">Pièce d'identité</p>
                                      <div className="bg-slate-100 rounded-lg p-2 h-64 flex items-center justify-center overflow-hidden">
                                          {selectedUserKYC.kycDocImage ? (
                                              <img src={selectedUserKYC.kycDocImage} className="max-h-full max-w-full object-contain" alt="ID" />
                                          ) : <span className="text-slate-400">Aucune image</span>}
                                      </div>
                                  </div>
                                  <div>
                                      <p className="font-bold mb-2">Selfie</p>
                                      <div className="bg-slate-100 rounded-lg p-2 h-64 flex items-center justify-center overflow-hidden">
                                          {selectedUserKYC.kycSelfieImage ? (
                                              <img src={selectedUserKYC.kycSelfieImage} className="max-h-full max-w-full object-contain" alt="Selfie" />
                                          ) : <span className="text-slate-400">Aucune image</span>}
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
                          {pendingKYC.length === 0 ? (
                              <div className="p-8 text-center text-slate-500">Aucune demande en attente.</div>
                          ) : (
                              <table className="w-full text-left">
                                  <thead className="bg-slate-50 border-b border-slate-200">
                                      <tr>
                                          <th className="p-4 font-semibold text-slate-600">Utilisateur</th>
                                          <th className="p-4 font-semibold text-slate-600">Email</th>
                                          <th className="p-4 font-semibold text-slate-600">Type Doc</th>
                                          <th className="p-4 font-semibold text-slate-600">Action</th>
                                      </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100">
                                      {pendingKYC.map(dev => (
                                          <tr key={dev.id} className="hover:bg-slate-50">
                                              <td className="p-4 font-bold">{dev.name}</td>
                                              <td className="p-4 text-slate-500">{dev.email}</td>
                                              <td className="p-4">{dev.kycDocType}</td>
                                              <td className="p-4">
                                                  <button 
                                                    onClick={() => setSelectedUserKYC(dev)}
                                                    className="text-emerald-600 font-bold hover:underline flex items-center gap-1"
                                                  >
                                                      Voir dossier <ChevronRight className="h-4 w-4" />
                                                  </button>
                                              </td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          )}
                      </div>
                  )}
              </div>
          )}

          {/* TAB: SUPPORT & IA */}
          {activeTab === 'support' && (
              <div className="h-[calc(100vh-120px)] flex flex-col">
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center justify-between">
                      <span>Support & Assistant IA</span>
                      <div className="flex items-center gap-3">
                          <span className={`text-sm font-medium ${aiEnabled ? 'text-emerald-600' : 'text-slate-500'}`}>
                              {aiEnabled ? 'IA Automatique ACTIVÉE' : 'IA Désactivée'}
                          </span>
                          <button 
                              onClick={() => setAiEnabled(!aiEnabled)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${aiEnabled ? 'bg-emerald-600' : 'bg-slate-300'}`}
                          >
                              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${aiEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                          </button>
                      </div>
                  </h2>
                  
                  <div className="flex flex-col md:flex-row gap-6 min-h-0">
                      {/* Left: Console / Simulation */}
                      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden h-[500px] md:h-auto">
                          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                              <h3 className="font-bold text-slate-700">Console de Simulation (Live)</h3>
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Testez Sarah (IA)</span>
                          </div>
                          
                          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
                              {chatHistory.map((msg, idx) => (
                                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                      <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                                          msg.sender === 'user' ? 'bg-slate-200 text-slate-800 rounded-br-none' : 
                                          msg.sender === 'ai' ? 'bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-bl-none' :
                                          'bg-yellow-50 text-yellow-800 text-xs w-full text-center border border-yellow-100'
                                      }`}>
                                          {msg.sender === 'ai' && <div className="text-xs font-bold text-emerald-700 mb-1 flex items-center gap-1"><Bot className="w-3 h-3"/> Sarah (IA)</div>}
                                          {msg.text}
                                      </div>
                                  </div>
                              ))}
                              {isAiThinking && (
                                  <div className="flex justify-start">
                                      <div className="bg-emerald-50 p-3 rounded-lg text-sm text-emerald-500 italic animate-pulse">
                                          Sarah est en train d'écrire...
                                      </div>
                                  </div>
                              )}
                          </div>

                          <div className="p-4 border-t border-slate-100 bg-slate-50">
                              <div className="flex gap-2">
                                  <input 
                                      type="text" 
                                      className="flex-1 border rounded-md px-3 py-2 text-sm focus:ring-emerald-500 focus:border-emerald-500"
                                      placeholder="Simuler un message client (ex: Mon paiement est bloqué...)"
                                      value={simulatedUserMsg}
                                      onChange={(e) => setSimulatedUserMsg(e.target.value)}
                                      onKeyDown={(e) => e.key === 'Enter' && handleSimulateMessage()}
                                  />
                                  <button 
                                    onClick={handleSimulateMessage}
                                    className="bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-800"
                                  >
                                      Envoyer
                                  </button>
                              </div>
                          </div>
                      </div>

                      {/* Right: Info Panel */}
                      <div className="md:w-80 w-full space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                              <h3 className="font-bold text-slate-800 mb-2">Statut Support</h3>
                              <div className="flex items-center gap-2 mb-2">
                                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                                  <span className="text-sm text-slate-600">Aucun agent humain en ligne</span>
                              </div>
                              <p className="text-xs text-slate-500">
                                  En l'absence de support humain, activez l'IA pour répondre automatiquement aux questions courantes.
                              </p>
                          </div>

                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                              <h3 className="font-bold text-slate-800 mb-2">Instructions IA</h3>
                              <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                                  <li>Réponses en Français</li>
                                  <li>Ton chaleureux et pro</li>
                                  <li>Détecte la fraude/urgence</li>
                                  <li>Passe le relais si nécessaire</li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          )}

          {/* TAB: NOTIFICATIONS */}
          {activeTab === 'notif' && (
              <div>
                  <h2 className="text-2xl font-bold text-slate-800 mb-6">Système de Notifications</h2>
                  <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
                      <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Cible</label>
                          <div className="flex gap-4 mb-4">
                               <button 
                                 onClick={() => setSearchTerm('all')}
                                 className={`px-4 py-2 rounded-lg font-bold border ${searchTerm === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'}`}
                               >
                                   Tous les utilisateurs
                               </button>
                               <div className="relative flex-1">
                                   <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                   <input 
                                     type="text" 
                                     placeholder="ID utilisateur spécifique..."
                                     value={searchTerm === 'all' ? '' : searchTerm}
                                     onChange={(e) => setSearchTerm(e.target.value)}
                                     className="w-full pl-9 pr-4 py-2 border rounded-lg"
                                   />
                               </div>
                          </div>
                      </div>
                      
                      <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Type</label>
                          <div className="flex gap-4">
                              {(['info', 'success', 'warning'] as const).map(t => (
                                  <button 
                                    key={t}
                                    onClick={() => setNotifType(t)}
                                    className={`px-3 py-1 rounded capitalize ${notifType === t ? 'ring-2 ring-offset-1 ring-slate-400 font-bold' : ''} ${
                                        t === 'info' ? 'bg-blue-100 text-blue-800' :
                                        t === 'success' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}
                                  >
                                      {t}
                                  </button>
                              ))}
                          </div>
                      </div>

                      <div className="mb-6">
                          <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                          <textarea 
                            rows={4}
                            value={notifMessage}
                            onChange={(e) => setNotifMessage(e.target.value)}
                            className="w-full border rounded-lg p-3"
                            placeholder="Votre message ici..."
                          />
                      </div>

                      <button 
                        onClick={() => handleSendNotif(searchTerm || 'all')}
                        disabled={!notifMessage}
                        className="w-full bg-emerald-600 text-white py-3 rounded-lg font-bold hover:bg-emerald-700 disabled:opacity-50"
                      >
                          Envoyer la notification
                      </button>
                  </div>
              </div>
          )}

      </div>
    </div>
  );
};

export default AdminDashboard;