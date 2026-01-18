export type UserRole = 'client' | 'developer' | 'admin';

export type KYCStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export type KYCDocumentType = 'CIN' | 'PASSPORT' | 'CARTE_SEJOUR' | 'CARTE_ETUDIANT' | 'NIP';

export interface User {
  id: string;
  name: string; // Display name
  email: string;
  phone: string;
  role: UserRole;
  password?: string;
  isVerified?: boolean; // Mobile verification
  kycStatus?: KYCStatus; // Identity verification
  balance?: number; // Wallet balance
  isBlocked?: boolean; // Admin block status
  
  // Real Identity Fields for KYC
  realLastName?: string;
  realFirstName?: string;
  birthDate?: string;
  birthPlace?: string;
  gender?: 'M' | 'F';
  kycDocType?: KYCDocumentType;
  kycDocImage?: string; // Base64 image
  kycSelfieImage?: string; // Base64 image
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'payment' | 'withdrawal' | 'fee';
  amount: number;
  fromUserId: string; // 'system' if platform fee
  toUserId: string; // 'system' if platform fee
  date: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
}

export interface ClientProfile extends User {
  role: 'client';
}

export interface PortfolioItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface DeveloperProfile extends User {
  role: 'developer';
  sex: 'M' | 'F';
  title?: string;
  skills: string[];
  hourlyRate?: number;
  bio?: string;
  avatarUrl?: string;
  available?: boolean;
  location?: string;
  experienceYears?: number;
  completedProjects?: number;
  rating?: number; // 0 to 5
  reviewCount?: number;
  isPremium?: boolean;
  portfolio?: PortfolioItem[];
}

export interface Developer extends DeveloperProfile {
  // Developer interface extends Profile for consistency in lists
}

export interface Proposal {
  id: string;
  jobId: string;
  developerName: string;
  developerId: string; // Track who sent it
  message: string;
  price: number;
  date: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Freelance';
  description: string;
  postedDate: string;
  deadline?: string;
  skills: string[];
  budgetMin?: number;
  budgetMax?: number;
  authorId?: string; 
}

export interface AIJobProposal {
  title: string;
  description: string;
  skills: string[];
}

export interface Notification {
  id: string;
  userId: string;
  type: 'info' | 'success' | 'warning';
  message: string;
  isRead: boolean;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  unreadCount: number;
}