import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Job, Proposal, UserRole, User, DeveloperProfile, ClientProfile, Developer, Notification, Conversation, Message, KYCStatus, Transaction } from '../types';

// Mock Jobs Initial Data
const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Développement Site E-commerce Mode',
    company: 'Mode Gabon',
    location: 'Libreville',
    type: 'Freelance',
    description: 'Nous cherchons un expert Shopify ou WooCommerce pour créer notre boutique en ligne de vêtements traditionnels. Intégration Wave et Airtel Money requise.',
    postedDate: 'Il y a 2 jours',
    deadline: 'Dans 15 jours',
    skills: ['WordPress', 'WooCommerce', 'PHP', 'Payment API'],
    budgetMin: 500000,
    budgetMax: 1000000,
    authorId: 'demo-client'
  },
  {
    id: '2',
    title: 'Application de Gestion de Stock (PME)',
    company: 'Logistique GA',
    location: 'Port-Gentil',
    type: 'Freelance',
    description: "Besoin d'une application web pour gérer les entrées et sorties de stock de notre entrepôt. Doit fonctionner hors-ligne (PWA).",
    postedDate: 'Il y a 4 heures',
    deadline: 'Urgent',
    skills: ['React', 'Node.js', 'PWA', 'MongoDB'],
    budgetMin: 800000,
    budgetMax: 1500000,
    authorId: 'other-client'
  },
  {
    id: '3',
    title: 'Refonte Site Vitrine BTP',
    company: 'Gabon Construction',
    location: 'Franceville',
    type: 'Freelance',
    description: 'Modernisation de notre site web institutionnel. Design responsive et rapide.',
    postedDate: 'Il y a 1 jour',
    skills: ['HTML/CSS', 'JavaScript', 'SEO'],
    budgetMin: 200000,
    budgetMax: 400000,
    authorId: 'other-client-2'
  }
];

// Mock Proposals with developerId and status
const MOCK_PROPOSALS: Proposal[] = [
  {
    id: 'p1',
    jobId: '1',
    developerName: 'Jean-Marc Obiang',
    developerId: 'dev1',
    message: 'Bonjour, je suis expert WooCommerce. Je peux intégrer Wave facilement.',
    price: 600000,
    date: 'Il y a 1 jour',
    status: 'pending'
  }
];

// Mock Developers Data with Rich Profiles
const INITIAL_DEVS: Developer[] = [
  {
    id: 'dev1',
    name: 'Jean-Marc Obiang',
    email: 'jeanmarc@gmail.com',
    phone: '074000000',
    role: 'developer',
    sex: 'M',
    title: 'Développeur Fullstack Senior',
    location: 'Libreville',
    skills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'Laravel'],
    hourlyRate: 15000,
    bio: "Passionné par le web moderne. J'aide les entreprises gabonaises à se digitaliser depuis 5 ans. Expert en intégration d'API de paiement locales.",
    avatarUrl: 'https://picsum.photos/id/1005/200/200',
    available: true,
    experienceYears: 5,
    completedProjects: 42,
    rating: 4.9,
    reviewCount: 28,
    isPremium: true,
    isVerified: true,
    kycStatus: 'verified',
    balance: 150000,
    isBlocked: false,
    portfolio: [
        { id: '1', title: 'GabonMarket', url: 'https://example.com', description: 'Marketplace locale' }
    ],
    realLastName: 'Obiang',
    realFirstName: 'Jean-Marc',
    birthDate: '1990-05-12',
    birthPlace: 'Libreville'
  },
  {
    id: 'dev2',
    name: 'Sarah Bouassa',
    email: 'sarah@gmail.com',
    phone: '062000000',
    role: 'developer',
    sex: 'F',
    title: 'UI/UX Designer & Frontend',
    location: 'Port-Gentil',
    skills: ['Figma', 'Vue.js', 'Tailwind CSS', 'WordPress'],
    hourlyRate: 12000,
    bio: "Je crée des interfaces intuitives et esthétiques. Spécialisée dans les applications mobiles et l'expérience utilisateur.",
    avatarUrl: 'https://picsum.photos/id/338/200/200',
    available: true,
    experienceYears: 3,
    completedProjects: 15,
    rating: 4.7,
    reviewCount: 12,
    isPremium: false,
    isVerified: true,
    kycStatus: 'unverified',
    balance: 0,
    isBlocked: false
  },
  {
    id: 'dev3',
    name: 'Paul Mba',
    email: 'paul@gmail.com',
    phone: '077000000',
    role: 'developer',
    sex: 'M',
    title: 'Développeur Mobile Android/iOS',
    location: 'Libreville',
    skills: ['Flutter', 'Dart', 'Firebase', 'Android', 'iOS'],
    hourlyRate: 18000,
    bio: "Expert en développement d'applications mobiles cross-platform avec Flutter.",
    avatarUrl: 'https://picsum.photos/id/1012/200/200',
    available: false,
    experienceYears: 4,
    completedProjects: 20,
    rating: 4.8,
    reviewCount: 19,
    isPremium: true,
    isVerified: true,
    kycStatus: 'pending',
    balance: 50000,
    isBlocked: false,
    realLastName: 'Mba',
    realFirstName: 'Paul',
    birthDate: '1995-08-20',
    birthPlace: 'Oyem'
  }
];

const MOCK_NOTIFICATIONS: Notification[] = [
    { id: '1', userId: 'dev1', type: 'success', message: 'Votre profil a été vérifié avec succès.', isRead: false, date: 'Il y a 2h' },
    { id: '2', userId: 'dev1', type: 'info', message: 'Nouvelle mission PHP correspondant à vos compétences.', isRead: false, date: 'Il y a 5h' }
];

const MOCK_CONVERSATIONS: Conversation[] = [
    { id: 'c1', participantId: 'client1', participantName: 'Mode Gabon', participantAvatar: 'https://ui-avatars.com/api/?name=Mode+Gabon&background=0D8ABC&color=fff', lastMessage: 'Quand pouvez-vous commencer ?', unreadCount: 1 },
    { id: 'c2', participantId: 'client2', participantName: 'Logistique GA', participantAvatar: 'https://ui-avatars.com/api/?name=Logistique+GA&background=random', lastMessage: 'Merci pour le devis.', unreadCount: 0 }
];

const MOCK_MESSAGES: Message[] = [
    { id: 'm1', senderId: 'client1', receiverId: 'dev1', content: "Bonjour Jean-Marc, j'ai vu votre profil.", timestamp: '10:00' },
    { id: 'm2', senderId: 'dev1', receiverId: 'client1', content: 'Bonjour ! Comment puis-je vous aider ?', timestamp: '10:05' },
    { id: 'm3', senderId: 'client1', receiverId: 'dev1', content: 'Quand pouvez-vous commencer ?', timestamp: '10:10' }
];

// Mock Transactions
const MOCK_TRANSACTIONS: Transaction[] = [
    { id: 't1', type: 'payment', amount: 600000, fromUserId: 'demo-client', toUserId: 'dev1', date: '2023-10-25', status: 'completed', description: 'Paiement projet E-commerce' },
    { id: 't2', type: 'fee', amount: 48000, fromUserId: 'dev1', toUserId: 'system', date: '2023-10-25', status: 'completed', description: 'Commission Plateforme (8%)' },
    { id: 't3', type: 'withdrawal', amount: 100000, fromUserId: 'dev1', toUserId: 'external', date: '2023-10-26', status: 'completed', description: 'Retrait Airtel Money' },
    { id: 't4', type: 'payment', amount: 150000, fromUserId: 'other-client', toUserId: 'dev3', date: '2023-10-27', status: 'completed', description: 'Acompte App Mobile' }
];

interface AppContextType {
  currentUser: User | null;
  role: UserRole | 'guest';
  jobs: Job[];
  addJob: (job: Job) => void;
  proposals: Proposal[];
  addProposal: (proposal: Proposal) => void;
  myJobs: Job[];
  developers: Developer[];
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  sendNotification: (userId: string | 'all', message: string, type: 'info' | 'success' | 'warning') => void;
  conversations: Conversation[];
  messages: Message[];
  sendMessage: (content: string) => void;
  transactions: Transaction[];
  
  // Auth Methods
  login: (email: string, role?: UserRole, password?: string) => void;
  signup: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<DeveloperProfile>) => void;
  submitKYC: (data: Partial<User>) => void;

  // Admin Methods
  updateUserStatus: (userId: string, action: 'block' | 'unblock') => void;
  processKYC: (userId: string, action: 'approve' | 'reject') => void;

  // Router State
  currentPath: string;
  navigate: (path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Helper for LocalStorage
const loadFromStorage = <T,>(key: string, initial: T): T => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : initial;
    } catch (error) {
        console.error("Error reading from localStorage", error);
        return initial;
    }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from LocalStorage to persist data across refreshes
  const [currentUser, setCurrentUser] = useState<User | null>(() => loadFromStorage('gabondev_user', null));
  const [developers, setDevelopers] = useState<Developer[]>(() => loadFromStorage('gabondev_developers', INITIAL_DEVS));
  const [jobs, setJobs] = useState<Job[]>(() => loadFromStorage('gabondev_jobs', MOCK_JOBS));
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadFromStorage('gabondev_transactions', MOCK_TRANSACTIONS));
  
  // Mock data that doesn't need heavy persistence for this demo, but good to have
  const [proposals, setProposals] = useState<Proposal[]>(MOCK_PROPOSALS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  
  // Custom Router State
  const [currentPath, setCurrentPath] = useState(window.location.hash.substring(1) || '/');

  // Persistence Effects
  useEffect(() => {
      window.localStorage.setItem('gabondev_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
      window.localStorage.setItem('gabondev_developers', JSON.stringify(developers));
  }, [developers]);

  useEffect(() => {
    window.localStorage.setItem('gabondev_jobs', JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.substring(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const addJob = (job: Job) => {
    setJobs([job, ...jobs]);
  };

  const addProposal = (proposal: Proposal) => {
    setProposals([proposal, ...proposals]);
  };

  const markNotificationRead = (id: string) => {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const sendNotification = (userId: string | 'all', message: string, type: 'info' | 'success' | 'warning') => {
      const newNotif = {
          id: Date.now().toString(),
          isRead: false,
          message,
          type,
          date: "À l'instant",
          userId: userId === 'all' ? 'all' : userId
      };
      
      setNotifications(prev => [newNotif, ...prev]);
  };

  const sendMessage = (content: string) => {
      const newMessage: Message = {
          id: Date.now().toString(),
          senderId: currentUser?.id || 'me',
          receiverId: 'other',
          content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...messages, newMessage]);
  };

  // Auth Functions
  const login = (email: string, role?: UserRole, password?: string) => {
    // Secret Admin Login
    if (email === 'admin123@gmail.com' && password === 'admin2006') {
        const adminUser: User = {
            id: 'admin-master',
            name: 'Administrateur',
            email: 'admin123@gmail.com',
            phone: '',
            role: 'admin',
            balance: 0
        };
        setCurrentUser(adminUser);
        navigate('/admin');
        return;
    }

    let mockUser: User;

    if (role === 'developer') {
        const existingDev = developers.find(d => d.email?.toLowerCase() === email.toLowerCase());
        
        if (existingDev) {
             mockUser = { ...existingDev } as DeveloperProfile;
        } else {
             const namePart = email.split('@')[0];
             const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
             
             mockUser = {
                 id: 'dev-' + Date.now(),
                 name: displayName,
                 email: email,
                 phone: '',
                 role: 'developer',
                 sex: 'M',
                 skills: [],
                 title: 'Nouveau Développeur',
                 location: 'Gabon',
                 experienceYears: 0,
                 completedProjects: 0,
                 rating: 0,
                 reviewCount: 0,
                 isVerified: false,
                 kycStatus: 'unverified',
                 balance: 0,
                 isBlocked: false
             } as DeveloperProfile;
        }
    } else {
        const namePart = email.split('@')[0];
        const displayName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

         mockUser = {
            id: 'client-' + Date.now(),
            name: displayName,
            email: email,
            role: 'client',
            phone: '',
            isVerified: true,
            kycStatus: 'unverified',
            balance: 0
        };
    }

    if (mockUser.isBlocked) {
        alert("Ce compte a été bloqué par l'administrateur. Veuillez contacter le support.");
        return;
    }

    setCurrentUser(mockUser);
    navigate(role === 'client' ? '/dashboard' : '/jobs');
  };

  const signup = (user: User) => {
    // Default new users to unverified KYC and 0 balance
    const newUser = { ...user, kycStatus: 'unverified' as KYCStatus, balance: 0, isBlocked: false };
    setCurrentUser(newUser);

    if (user.role === 'developer') {
        const newDevEntry: Developer = {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            sex: (user as DeveloperProfile).sex,
            role: 'developer',
            title: (user as DeveloperProfile).title || 'Nouveau Développeur',
            location: (user as DeveloperProfile).location || 'Gabon',
            skills: (user as DeveloperProfile).skills || [],
            hourlyRate: (user as DeveloperProfile).hourlyRate || 0,
            bio: (user as DeveloperProfile).bio || '',
            avatarUrl: (user as DeveloperProfile).avatarUrl || 'https://via.placeholder.com/150',
            available: true,
            isVerified: false, 
            experienceYears: 0,
            completedProjects: 0,
            rating: 0,
            reviewCount: 0,
            kycStatus: 'unverified',
            balance: 0,
            isBlocked: false
        };
        setDevelopers(prev => [...prev, newDevEntry]);
        navigate('/jobs');
    } else {
        navigate('/dashboard');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    window.localStorage.removeItem('gabondev_user'); // Explicit clear
    navigate('/');
  };

  const updateProfile = (data: Partial<DeveloperProfile>) => {
    if (!currentUser || currentUser.role !== 'developer') return;

    const updatedUser = { ...currentUser, ...data } as DeveloperProfile;
    setCurrentUser(updatedUser);

    setDevelopers(prev => prev.map(d => 
        d.id === currentUser.id ? { ...d, ...data } : d
    ));
  };

  const submitKYC = (data: Partial<User>) => {
      if(!currentUser) return;
      
      const updatedUser = { ...currentUser, ...data, kycStatus: 'pending' as KYCStatus };
      setCurrentUser(updatedUser);
      
      // Update developers list if it's a dev
      if (currentUser.role === 'developer') {
          setDevelopers(prev => prev.map(d => d.id === currentUser.id ? { ...d, ...data, kycStatus: 'pending', role: 'developer' } : d));
      }
  };

  // Admin Actions
  const updateUserStatus = (userId: string, action: 'block' | 'unblock') => {
      const isBlocked = action === 'block';
      setDevelopers(prev => prev.map(d => d.id === userId ? { ...d, isBlocked } : d));
      if (currentUser?.id === userId) {
          setCurrentUser(prev => prev ? { ...prev, isBlocked } : null);
      }
  };

  const processKYC = (userId: string, action: 'approve' | 'reject') => {
      const newStatus = action === 'approve' ? 'verified' : 'rejected';
      
      setDevelopers(prev => prev.map(d => d.id === userId ? { ...d, kycStatus: newStatus } : d));
      
      if (currentUser?.id === userId) {
          setCurrentUser(prev => prev ? { ...prev, kycStatus: newStatus } : null);
      }

      // Send notification
      const message = action === 'approve' 
        ? "Votre identité a été vérifiée avec succès. Vous avez maintenant le badge vérifié !" 
        : "Votre demande de vérification a été refusée. Veuillez vérifier vos documents.";
      
      sendNotification(userId, message, action === 'approve' ? 'success' : 'warning');
  };

  // Filter jobs for the "My Dashboard" view
  const myJobs = jobs.filter(job => job.authorId === currentUser?.id);

  const role = currentUser?.role || 'guest';

  return (
    <AppContext.Provider value={{ 
      currentUser, 
      role, 
      jobs, 
      addJob, 
      proposals, 
      addProposal, 
      myJobs, 
      developers,
      notifications,
      markNotificationRead,
      sendNotification,
      conversations,
      messages,
      sendMessage,
      transactions,
      login, 
      signup, 
      logout,
      updateProfile,
      submitKYC,
      updateUserStatus,
      processKYC,
      currentPath, 
      navigate 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const useLocation = () => {
  const { currentPath } = useApp();
  return { pathname: currentPath };
};

export const useNavigate = () => {
  const { navigate } = useApp();
  return navigate;
};

export const Link: React.FC<{ to: string; children: React.ReactNode; className?: string; onClick?: () => void }> = ({ to, children, className, onClick }) => {
  const { navigate } = useApp();
  
  const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      navigate(to);
      if (onClick) onClick();
  };

  return (
      <a href={`#${to}`} onClick={handleClick} className={className}>
          {children}
      </a>
  );
};