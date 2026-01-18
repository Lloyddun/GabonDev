import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, ShieldCheck, AlertTriangle, CheckCircle, RefreshCcw, User, MapPin, Calendar, Heart } from 'lucide-react';
import { KYCDocumentType } from '../types';

const DOCUMENTS: { type: KYCDocumentType; label: string }[] = [
  { type: 'CIN', label: "Carte d'Identité Nationale (CIN)" },
  { type: 'PASSPORT', label: "Passeport" },
  { type: 'CARTE_SEJOUR', label: "Carte de Séjour" },
  { type: 'CARTE_ETUDIANT', label: "Carte Étudiant" },
  { type: 'NIP', label: "Numéro d'Identification Personnel (NIP)" },
];

const KYCVerification: React.FC = () => {
  const { currentUser, submitKYC, navigate } = useApp();
  
  // Steps: 1=Info, 2=DocType, 3=DocCapture, 4=Selfie, 5=Success
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  
  // Real Personal Info
  const [personalInfo, setPersonalInfo] = useState({
    lastName: '',
    firstName: '',
    dob: '',
    pob: '',
    gender: 'M' as 'M' | 'F'
  });

  const [selectedDoc, setSelectedDoc] = useState<KYCDocumentType | null>(null);
  const [docImage, setDocImage] = useState<string | null>(null);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isStreamActive, setIsStreamActive] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!currentUser) {
        navigate('/auth');
    }
  }, [currentUser, navigate]);

  const startCamera = async (mode: 'user' | 'environment') => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: mode } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreamActive(true);
      }
    } catch (err) {
      setCameraError("Impossible d'accéder à la caméra. Veuillez vérifier vos permissions.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreamActive(false);
    }
  };

  const captureImage = (setImage: (data: string) => void) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setImage(dataUrl);
        stopCamera();
      }
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(personalInfo.lastName && personalInfo.firstName && personalInfo.dob && personalInfo.pob) {
        setStep(2);
      }
  };

  const handleDocStep = () => {
      setStep(3);
      startCamera('environment'); // Back camera for docs
  };

  const handleSelfieStep = () => {
      setStep(4);
      startCamera('user'); // Front camera for selfie
  };

  const handleRetake = (stepToRetry: 3 | 4) => {
      setStep(stepToRetry);
      if (stepToRetry === 3) {
          setDocImage(null);
          startCamera('environment');
      } else {
          setSelfieImage(null);
          startCamera('user');
      }
  };

  const handleSubmit = () => {
      submitKYC({
          realLastName: personalInfo.lastName,
          realFirstName: personalInfo.firstName,
          birthDate: personalInfo.dob,
          birthPlace: personalInfo.pob,
          gender: personalInfo.gender,
          kycDocType: selectedDoc || undefined,
          kycDocImage: docImage || undefined,
          kycSelfieImage: selfieImage || undefined
      });
      setStep(5);
  };

  // Cleanup on unmount
  useEffect(() => {
      return () => stopCamera();
  }, []);

  if (!currentUser) return null;

  if (currentUser.kycStatus === 'pending' && step !== 5) {
      return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-md text-center">
                  <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Vérification en cours</h2>
                  <p className="text-slate-600 mb-6">
                      Vos documents ont été transmis. Nos équipes vérifient la conformité de votre identité. 
                      Vous serez notifié sous 24h.
                  </p>
                  <button onClick={() => navigate('/developer-dashboard')} className="text-emerald-600 font-bold hover:underline">
                      Retour au tableau de bord
                  </button>
              </div>
          </div>
      );
  }

  if (currentUser.kycStatus === 'verified') {
      return (
          <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
              <div className="bg-white max-w-md w-full p-8 rounded-xl shadow-md text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                      <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Compte Vérifié</h2>
                  <p className="text-slate-600 mb-6">
                      Votre identité a été confirmée. Vous avez accès à toutes les fonctionnalités, y compris les retraits.
                  </p>
                  <button onClick={() => navigate('/developer-dashboard')} className="text-emerald-600 font-bold hover:underline">
                      Retour au tableau de bord
                  </button>
              </div>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* Warning Banner */}
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg shadow-sm">
            <div className="flex items-start">
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                <div>
                    <h3 className="text-red-800 font-bold">Vérification d&apos;Identité Obligatoire (KYC)</h3>
                    <p className="text-red-700 text-sm mt-1">
                        Pour lutter contre la fraude et garantir la sécurité des paiements, le KYC est obligatoire pour effectuer des retraits.
                        <br/><br/>
                        <span className="font-bold underline">ATTENTION :</span> Toute tentative de fraude, usurpation d&apos;identité ou usage de faux documents entraînera le bannissement immédiat et des poursuites judiciaires conformément aux lois en vigueur au Gabon.
                    </p>
                </div>
            </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Header Steps */}
            <div className="bg-slate-900 px-6 py-4 flex justify-between items-center overflow-x-auto">
                {[1, 2, 3, 4, 5].map((s) => (
                    <div key={s} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= s ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                            {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                        </div>
                        {s < 5 && <div className={`w-8 h-1 mx-1 ${step > s ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>}
                    </div>
                ))}
            </div>

            <div className="p-8">
                {/* Step 1: Real Information */}
                {step === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 text-center">Informations Réelles</h2>
                        <p className="text-center text-slate-500">
                            Veuillez renseigner vos informations exactement comme elles figurent sur votre pièce d&apos;identité.
                        </p>
                        
                        <form onSubmit={handleInfoSubmit} className="space-y-4 max-w-lg mx-auto">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Nom</label>
                                    <input 
                                        type="text" required 
                                        className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        value={personalInfo.lastName}
                                        onChange={e => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Prénom</label>
                                    <input 
                                        type="text" required
                                        className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                                        value={personalInfo.firstName}
                                        onChange={e => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Date de naissance</label>
                                <input 
                                    type="date" required
                                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    value={personalInfo.dob}
                                    onChange={e => setPersonalInfo({...personalInfo, dob: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Lieu de naissance</label>
                                <input 
                                    type="text" required
                                    placeholder="Ville, Pays"
                                    className="w-full border rounded-md px-3 py-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    value={personalInfo.pob}
                                    onChange={e => setPersonalInfo({...personalInfo, pob: e.target.value})}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Sexe</label>
                                <div className="flex gap-4">
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" name="gender" value="M" 
                                            checked={personalInfo.gender === 'M'}
                                            onChange={() => setPersonalInfo({...personalInfo, gender: 'M'})}
                                            className="text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="ml-2">Masculin</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" name="gender" value="F" 
                                            checked={personalInfo.gender === 'F'}
                                            onChange={() => setPersonalInfo({...personalInfo, gender: 'F'})}
                                            className="text-emerald-600 focus:ring-emerald-500"
                                        />
                                        <span className="ml-2">Féminin</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button type="submit" className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-emerald-700">
                                    Suivant
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Step 2: Select Document */}
                {step === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 text-center">Choisissez votre document</h2>
                        <p className="text-center text-slate-500">Sélectionnez une pièce d&apos;identité valide parmis la liste ci-dessous.</p>
                        
                        <div className="grid gap-4 max-w-lg mx-auto">
                            {DOCUMENTS.map((doc) => (
                                <button
                                    key={doc.type}
                                    onClick={() => setSelectedDoc(doc.type)}
                                    className={`p-4 rounded-lg border-2 text-left flex items-center justify-between transition-all ${selectedDoc === doc.type ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
                                >
                                    <span className="font-bold text-slate-800">{doc.label}</span>
                                    {selectedDoc === doc.type && <CheckCircle className="text-emerald-600 w-6 h-6" />}
                                </button>
                            ))}
                        </div>

                        <div className="flex justify-between pt-4 max-w-lg mx-auto">
                            <button onClick={() => setStep(1)} className="text-slate-600 font-medium hover:underline">
                                Retour
                            </button>
                            <button 
                                disabled={!selectedDoc}
                                onClick={handleDocStep}
                                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors flex items-center gap-2"
                            >
                                Continuer <Camera className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Capture Document */}
                {step === 3 && (
                    <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Photographiez votre document</h2>
                        <p className="text-slate-500">Assurez-vous que le texte est lisible et que la pièce est bien éclairée.</p>

                        <div className="relative bg-black rounded-lg overflow-hidden aspect-video max-w-lg mx-auto flex items-center justify-center">
                            {!docImage ? (
                                <>
                                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 border-4 border-white/30 pointer-events-none m-8 rounded-lg"></div>
                                    {cameraError && <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-white p-4">{cameraError}</div>}
                                </>
                            ) : (
                                <img src={docImage} alt="Document capture" className="w-full h-full object-contain" />
                            )}
                        </div>
                        <canvas ref={canvasRef} className="hidden" />

                        <div className="flex justify-center gap-4">
                            {!docImage ? (
                                <button 
                                    onClick={() => captureImage(setDocImage)}
                                    className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-emerald-700 shadow-lg border-4 border-emerald-200"
                                >
                                    <Camera className="w-8 h-8" />
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button onClick={() => handleRetake(3)} className="text-slate-600 font-bold flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50">
                                        <RefreshCcw className="w-4 h-4" /> Reprendre
                                    </button>
                                    <button onClick={handleSelfieStep} className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700">
                                        Confirmer & Continuer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 4: Capture Selfie */}
                {step === 4 && (
                    <div className="space-y-6 text-center">
                        <h2 className="text-2xl font-bold text-slate-900">Prenez un Selfie</h2>
                        <p className="text-slate-500">Nous devons vérifier que le document vous appartient. Cadrez votre visage.</p>

                        <div className="relative bg-black rounded-full overflow-hidden w-64 h-64 mx-auto flex items-center justify-center border-4 border-emerald-500">
                            {!selfieImage ? (
                                <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform scale-x-[-1]" />
                            ) : (
                                <img src={selfieImage} alt="Selfie capture" className="w-full h-full object-cover transform scale-x-[-1]" />
                            )}
                        </div>

                        <div className="flex justify-center gap-4">
                            {!selfieImage ? (
                                <button 
                                    onClick={() => captureImage(setSelfieImage)}
                                    className="bg-emerald-600 text-white w-16 h-16 rounded-full flex items-center justify-center hover:bg-emerald-700 shadow-lg border-4 border-emerald-200"
                                >
                                    <Camera className="w-8 h-8" />
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button onClick={() => handleRetake(4)} className="text-slate-600 font-bold flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-slate-50">
                                        <RefreshCcw className="w-4 h-4" /> Reprendre
                                    </button>
                                    <button onClick={handleSubmit} className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700">
                                        Soumettre le dossier
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Step 5: Success Message (Specific wording) */}
                {step === 5 && (
                    <div className="text-center py-12">
                         <div className="mx-auto w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Heart className="w-12 h-12 text-emerald-600 fill-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
                            Super merci d&apos;avoir effectué votre KYC !
                        </h2>
                        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 max-w-lg mx-auto">
                            <p className="text-slate-700 text-lg mb-4">
                                Votre vérification va prendre quelques minutes...
                            </p>
                            <p className="text-slate-600 text-sm">
                                Quand ça sera bon, vous recevrez une notification par gmail et sur la plateforme, 
                                et votre profil aura un badge de compte vérifié <ShieldCheck className="inline h-4 w-4 text-emerald-600" />.
                            </p>
                        </div>
                        <div className="mt-8">
                            <button onClick={() => navigate('/developer-dashboard')} className="bg-slate-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">
                                Retour à l&apos;accueil
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for icon import
const Clock = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);

export default KYCVerification;