import React, { useState } from 'react';
import { Link, useApp } from '../context/AppContext'; 
import { Search, MapPin, Code, ChevronRight, ShieldCheck, Zap, Users, Star, Smartphone, Layout, Database, ShoppingCart, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const SPECIALTIES_DATA = [
  {
    category: "Framework",
    items: ["ASP.NET", "Alpine.js", "Angular", "Apache Cordova", "Bootstrap", "CakePHP", "CodeIgniter", "Django", "Flutter", "Ionic", "Jakarta EE", "Laravel", "Meteor.js", "Node.js", "React", "Ruby on Rails", "Spring", "Svelte", "Symfony", "Tailwind CSS", "Vue.JS", "Xamarin", "Yii Framework", "Zend", "jQuery"]
  },
  {
    category: "Langage de programmation",
    items: [".NET", "C", "C#", "C++", "COBOL", "CSS", "ColdFusion", "Dart", "Delphi", "Flash", "Go", "HTML", "Java", "JavaScript", "Kotlin", "Lua", "MATLAB", "Next.js", "Objective-C", "PHP", "Perl", "PowerShell", "Python", "R", "Ruby", "Rust", "SQL", "Sass", "Scala", "Scratch", "Swift", "TypeScript", "Visual Basic", "WinDev", "XML"]
  },
  {
    category: "CMS",
    items: ["Drupal", "Framer", "Joomla!", "Magento", "OpenCart", "Prestashop", "SPIP", "Shopify", "Strapi", "TYPO3", "Webflow", "Wix", "WooCommerce", "WordPress", "osCommerce"]
  },
  {
    category: "Support technologique",
    items: ["API", "Arduino", "CRM", "ERP", "Full Stack", "IoT", "Mixed Reality", "PWA", "SaaS", "Back-end", "Blockchain", "Dropshipping", "E-commerce", "Front-end", "Intranet", "Jeux vidéos", "Logiciel embarqué", "Marketplace", "Mobile", "Mobile-first", "Progiciel", "Réalité augmentée", "Réalité virtuelle", "Web"]
  },
  {
    category: "OS",
    items: ["Android", "Docker", "Linux", "Windows", "iOS", "macOS"]
  },
  {
    category: "IA & Data",
    items: ["ChatGPT", "Cursor", "IA", "Lovable", "Machine Learning", "Chatbot", "n8n", "ETL", "HFT", "MQL5", "Big data"]
  },
  {
    category: "No code & Moteur de jeu",
    items: ["Bubble", "Flutterflow", "Make", "No code", "Zapier", "Unity", "Unreal Engine"]
  }
];

const Home: React.FC = () => {
  const { developers, jobs } = useApp();
  const topDevelopers = developers.filter(d => d.rating && d.rating > 4.5).slice(0, 4);
  const recentJobs = jobs.slice(0, 3);
  const [isDirectoryExpanded, setIsDirectoryExpanded] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-emerald-900 opacity-90"></div>
        <div className="absolute inset-0 opacity-20">
             <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Background" className="w-full h-full object-cover" />
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Trouvez le freelance idéal pour vos projets au <span className="text-emerald-400">Gabon</span>
          </h1>
          <p className="mt-4 text-xl text-slate-300 mb-10">
            Développement Web, Mobile, Design, Marketing... Plus de 500 talents vérifiés prêts à travailler.
          </p>
          
          <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row gap-2 max-w-3xl mx-auto">
             <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 text-slate-400 h-6 w-6" />
                <input 
                  type="text" 
                  placeholder="Que recherchez-vous ? (ex: Site WordPress, App Mobile...)" 
                  className="w-full pl-12 pr-4 py-3 rounded-md text-slate-900 focus:outline-none"
                />
             </div>
             <Link to="/developers" className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-md hover:bg-emerald-700 transition-colors flex items-center justify-center">
                Rechercher
             </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-slate-400 text-sm font-medium">
             <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-400" /> Profils Vérifiés</span>
             <span className="flex items-center gap-1"><Zap className="h-4 w-4 text-emerald-400" /> Devis Gratuits</span>
             <span className="flex items-center gap-1"><Users className="h-4 w-4 text-emerald-400" /> +500 Freelances</span>
          </div>
        </div>
      </section>

      {/* Categories Grid (Top Level) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">Catégories Populaires</h2>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Développeurs PHP / Laravel', icon: <Database className="h-8 w-8 text-indigo-500" />, count: 120 },
                { name: 'Experts WordPress', icon: <Layout className="h-8 w-8 text-blue-500" />, count: 85 },
                { name: 'Apps Mobiles Android/iOS', icon: <Smartphone className="h-8 w-8 text-green-500" />, count: 64 },
                { name: 'E-commerce (Shopify/Woo)', icon: <ShoppingCart className="h-8 w-8 text-purple-500" />, count: 42 },
              ].map((cat, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow cursor-pointer text-center group">
                   <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      {cat.icon}
                   </div>
                   <h3 className="font-bold text-slate-900 mb-1">{cat.name}</h3>
                   <p className="text-sm text-slate-500">{cat.count} freelances</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Dernières Missions</h2>
                <Link to="/jobs" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                    Voir toutes les offres <ChevronRight className="h-5 w-5" />
                </Link>
            </div>
            <div className="space-y-4">
                {recentJobs.map(job => (
                    <div key={job.id} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between hover:border-emerald-300 transition-all">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 text-emerald-700 hover:underline">{job.title}</h3>
                            <p className="text-slate-600 text-sm mb-2">{job.company} • {job.location}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {job.skills.slice(0, 4).map(skill => (
                                    <span key={skill} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 md:mt-0 md:text-right flex flex-col justify-center">
                             <div className="font-bold text-slate-900">
                                {job.budgetMin ? job.budgetMin.toLocaleString('fr-GA') : ''} 
                                {job.budgetMax ? ` - ${job.budgetMax.toLocaleString('fr-GA')}` : ''} FCFA
                             </div>
                             <div className="text-sm text-slate-500 flex items-center md:justify-end gap-1 mt-1">
                                <Clock className="h-3 w-3" /> {job.postedDate}
                             </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Specialties Directory (Collapsible/Scrollable) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900">Trouvez un développeur freelance par spécialité</h2>
                <p className="text-slate-600 mt-2 max-w-3xl mx-auto">
                    De nombreux développeurs freelances sont disponibles sur GabonDev. Consultez la liste ci-dessous pour trouver les développeurs qui répondent à vos besoins spécifiques.
                </p>
            </div>

            <div className={`transition-all duration-500 overflow-hidden ${isDirectoryExpanded ? 'max-h-full' : 'max-h-[600px] relative'}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {SPECIALTIES_DATA.map((group, idx) => (
                        <div key={idx}>
                            <h3 className="font-bold text-slate-900 mb-4 border-b border-emerald-100 pb-2">{group.category}</h3>
                            <ul className="space-y-2">
                                {group.items.map(item => (
                                    <li key={item}>
                                        <Link to="/developers" className="text-sm text-slate-600 hover:text-emerald-600 hover:underline transition-colors flex items-center gap-1">
                                            <ChevronRight className="h-3 w-3 text-slate-300" />
                                            Développeur {item}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                {!isDirectoryExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent flex items-end justify-center pb-4">
                        <button 
                            onClick={() => setIsDirectoryExpanded(true)}
                            className="bg-white border border-slate-200 text-slate-700 px-6 py-2 rounded-full font-medium hover:bg-slate-50 shadow-sm flex items-center gap-2"
                        >
                            Voir toutes les spécialités <ChevronDown className="h-4 w-4" />
                        </button>
                    </div>
                )}
            </div>
             {isDirectoryExpanded && (
                <div className="text-center mt-8">
                     <button 
                        onClick={() => setIsDirectoryExpanded(false)}
                        className="text-slate-500 hover:text-slate-700 flex items-center gap-2 mx-auto"
                    >
                        Réduire la liste <ChevronUp className="h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
      </section>

      {/* SEO / Educational Content */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Quelles sont les compétences requises pour être développeur ?</h2>
              <p className="text-slate-700 mb-8 leading-relaxed">
                  Le développeur a la responsabilité de livrer un travail parfait et des applications sans erreurs. Pour y parvenir, il cultive des compétences techniques et des qualités humaines.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Code className="h-5 w-5 text-emerald-600" /> Les compétences techniques
                      </h3>
                      
                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">Les langages de programmation</h4>
                          <p className="text-sm text-slate-600">
                              La programmation informatique est la base du métier de développeur. Ce spécialiste maîtrise au moins un langage de programmation comme Python ou le PHP. 
                              Il existe désormais des développeurs spécialistes des logiciels pour ordinateurs, pour tablettes ou pour téléphones mobiles (Android et iOS).
                          </p>
                      </div>

                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">Les bibliothèques logicielles</h4>
                          <p className="text-sm text-slate-600">
                              Pour développer des solutions informatiques, le développeur s’appuie sur sa connaissance des bibliothèques et frameworks. 
                              Plus un développeur acquiert de l’expérience dans une API, plus il peut prendre en charge des missions conséquentes.
                          </p>
                      </div>

                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">La cybersécurité</h4>
                          <p className="text-sm text-slate-600">
                              A l’heure du cloud computing, la sécurité est un enjeu majeur. Nous vous recommandons de vous former à la cybersécurité pour protéger vos bases de données. 
                              La connaissance du RGPD et des lois locales sur la protection des données est également essentielle.
                          </p>
                      </div>
                  </div>

                  <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Star className="h-5 w-5 text-emerald-600" /> Les qualités humaines
                      </h3>

                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">La logique</h4>
                          <p className="text-sm text-slate-600">
                              Le développement exige de la logique. Cette qualité s’avère indispensable pour identifier des erreurs de codage et déboguer une application.
                          </p>
                      </div>

                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">La précision</h4>
                          <p className="text-sm text-slate-600">
                              Le métier de développeur ne tolère aucune approximation ! La rigueur est de mise pour évaluer les besoins d’un client, planifier un projet et rédiger des lignes de code.
                          </p>
                      </div>

                      <div className="mb-6">
                          <h4 className="font-bold text-slate-800 mb-2">L’autonomie</h4>
                          <p className="text-sm text-slate-600">
                              Si vous voulez devenir développeur freelance, vous devez faire preuve d’autonomie. Seuls les développeurs freelances les mieux organisés peuvent prendre en charge des missions d’envergure.
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Top Freelancers */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex justify-between items-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900">Freelances à la une</h2>
              <Link to="/developers" className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1">
                 Voir tous les freelances <ChevronRight className="h-5 w-5" />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topDevelopers.map(dev => (
                <div key={dev.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:border-emerald-300 transition-all">
                   <div className="flex items-center gap-4 mb-4">
                      <img src={dev.avatarUrl} className="w-14 h-14 rounded-full object-cover" alt={dev.name} />
                      <div>
                         <h4 className="font-bold text-slate-900 truncate">{dev.name}</h4>
                         <div className="flex items-center text-yellow-500 text-xs">
                            <Star className="h-3 w-3 fill-current" />
                            <span className="ml-1 font-bold">{dev.rating}</span>
                            <span className="text-slate-400 ml-1">({dev.reviewCount})</span>
                         </div>
                      </div>
                   </div>
                   <p className="text-sm text-slate-600 mb-3 line-clamp-2 h-10">{dev.title}</p>
                   <div className="flex flex-wrap gap-1 mb-4">
                      {dev.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded">{skill}</span>
                      ))}
                   </div>
                   <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                      <span className="font-bold text-slate-900">{dev.hourlyRate} FCFA<span className="text-xs font-normal">/h</span></span>
                      <Link to="/developers" className="text-emerald-600 text-sm font-medium hover:underline">Voir profil</Link>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-slate-900 mb-12">Comment ça marche ?</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-4">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 font-bold text-2xl">1</div>
                 <h3 className="text-xl font-bold mb-3">Publiez votre projet</h3>
                 <p className="text-slate-600">Décrivez votre besoin gratuitement. C'est simple et rapide.</p>
              </div>
              <div className="p-4">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 font-bold text-2xl">2</div>
                 <h3 className="text-xl font-bold mb-3">Comparez les offres</h3>
                 <p className="text-slate-600">Recevez des devis de freelances gabonais qualifiés en quelques minutes.</p>
              </div>
              <div className="p-4">
                 <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 font-bold text-2xl">3</div>
                 <h3 className="text-xl font-bold mb-3">Payez en sécurité</h3>
                 <p className="text-slate-600">Choisissez votre expert et payez via Mobile Money ou carte bancaire.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Blog & Resources */}
      <section className="py-16 bg-white border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Ressources & Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-slate-100">
                  <div className="h-48 bg-slate-200 flex items-center justify-center">
                     <span className="text-slate-400">Image: Digital Gabon</span>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 text-slate-900">Le freelance au Gabon en 2025 : État des lieux</h3>
                     <p className="text-slate-600 text-sm mb-4">Analyse des tarifs moyens, des compétences les plus demandées et des opportunités.</p>
                     <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Lire l'article</a>
                  </div>
               </article>
               <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-slate-100">
                  <div className="h-48 bg-slate-200 flex items-center justify-center">
                     <span className="text-slate-400">Image: Mobile Money</span>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 text-slate-900">Intégrer Airtel Money et Wave sur votre site</h3>
                     <p className="text-slate-600 text-sm mb-4">Guide technique pour les développeurs PHP et Node.js.</p>
                     <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Lire l'article</a>
                  </div>
               </article>
               <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-slate-100">
                  <div className="h-48 bg-emerald-600 flex items-center justify-center p-6 text-center">
                     <span className="text-white font-bold text-xl">Devenir Freelance Premium</span>
                  </div>
                  <div className="p-6">
                     <h3 className="font-bold text-lg mb-2 text-slate-900">Boostez votre visibilité</h3>
                     <p className="text-slate-600 text-sm mb-4">Découvrez les avantages de l'abonnement Pro pour décrocher plus de missions.</p>
                     <a href="#" className="text-emerald-600 font-medium text-sm hover:underline">Voir les offres</a>
                  </div>
               </article>
            </div>
         </div>
      </section>

      {/* CTA Bottom */}
      <section className="bg-slate-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-white mb-6">Prêt à lancer votre projet ?</h2>
           <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/post-job" className="bg-emerald-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-600 transition-colors">
                 Publier une annonce gratuite
              </Link>
              <Link to="/developers" className="bg-transparent border border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-slate-900 transition-colors">
                 Parcourir les profils
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
