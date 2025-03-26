import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  UserCheck, 
  Calendar, 
  MapPin, 
  Info, 
  ShieldCheck, 
  FileText,
  ChevronRight,
  Users,
  Clock,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/components/LanguageSwitcher';
import VoterHistory from '@/components/voting/VoterHistory';
import UserComplaints from '@/components/complaints/UserComplaints';
import { toast } from 'sonner';

const VoterInfo = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication on component mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
    
    if (!authStatus) {
      toast.error('You must be logged in to view this page');
      navigate('/login');
    }
  }, [navigate]);
  
  const voterDetails = {
    name: 'John Smith',
    voterId: 'ABC1234567',
    age: 32,
    address: '123 Main Street, Anytown',
    constituency: 'North District',
    pollingStation: 'Community Center, Block B',
    registrationDate: 'January 15, 2024',
    votingStatus: localStorage.getItem(`voted_${voterDetails.voterId}`) === 'true' ? 'Voted' : 'Not Voted',
  };

  const upcomingElections = [
    {
      id: 1,
      title: 'Local Council Elections',
      date: 'March 15, 2024',
      location: 'City Hall Auditorium',
      candidates: 12,
    },
    {
      id: 2,
      title: 'State Referendum on Education',
      date: 'April 22, 2024',
      location: 'Various polling stations',
      candidates: 0,
    },
    {
      id: 3,
      title: 'General Elections 2025',
      date: 'November 7, 2025',
      location: 'Nationwide',
      candidates: 0,
    },
  ];

  const faqs = [
    {
      question: 'What ID do I need to bring on voting day?',
      answer: 'You must bring your voter ID card and a government-issued photo ID such as passport, driver\'s license, or national ID card.'
    },
    {
      question: "Can I vote if I've recently moved?",
      answer: "If you've moved to a new constituency, you need to update your voter registration at least 30 days before the election. If you've moved within the same constituency, you can vote at your assigned polling station."
    },
    {
      question: "What if I can't vote in person on election day?",
      answer: "You may be eligible for early voting or mail-in ballots. Applications for these options must be submitted at least 14 days before the election."
    },
    {
      question: 'How can I verify my voter registration status?',
      answer: 'You can verify your registration status online through our voter portal or by contacting your local election office.'
    }
  ];

  const translations = {
    voterProfile: {
      en: 'Voter Profile',
      es: 'Perfil del votante',
      fr: 'Profil de l\'électeur',
      de: 'Wählerprofil',
    },
    personalDetails: {
      en: 'Personal Details',
      es: 'Detalles personales',
      fr: 'Informations personnelles',
      de: 'Persönliche Details',
    },
    name: {
      en: 'Name',
      es: 'Nombre',
      fr: 'Nom',
      de: 'Name',
    },
    voterId: {
      en: 'Voter ID',
      es: 'ID de votante',
      fr: 'ID d\'électeur',
      de: 'Wähler-ID',
    },
    age: {
      en: 'Age',
      es: 'Edad',
      fr: 'Âge',
      de: 'Alter',
    },
    address: {
      en: 'Address',
      es: 'Dirección',
      fr: 'Adresse',
      de: 'Adresse',
    },
    constituency: {
      en: 'Constituency',
      es: 'Distrito electoral',
      fr: 'Circonscription',
      de: 'Wahlkreis',
    },
    pollingStation: {
      en: 'Polling Station',
      es: 'Colegio electoral',
      fr: 'Bureau de vote',
      de: 'Wahllokal',
    },
    registrationDate: {
      en: 'Registration Date',
      es: 'Fecha de registro',
      fr: 'Date d\'inscription',
      de: 'Registrierungsdatum',
    },
    votingStatus: {
      en: 'Voting Status',
      es: 'Estado de votación',
      fr: 'Statut de vote',
      de: 'Wahlstatus',
    },
    upcomingElections: {
      en: 'Upcoming Elections',
      es: 'Próximas elecciones',
      fr: 'Prochaines élections',
      de: 'Bevorstehende Wahlen',
    },
    electionTitle: {
      en: 'Election Title',
      es: 'Título de la elección',
      fr: 'Titre de l\'élection',
      de: 'Wahltitel',
    },
    date: {
      en: 'Date',
      es: 'Fecha',
      fr: 'Date',
      de: 'Datum',
    },
    location: {
      en: 'Location',
      es: 'Ubicación',
      fr: 'Lieu',
      de: 'Ort',
    },
    candidates: {
      en: 'Candidates',
      es: 'Candidatos',
      fr: 'Candidats',
      de: 'Kandidaten',
    },
    faqs: {
      en: 'Frequently Asked Questions',
      es: 'Preguntas frecuentes',
      fr: 'Questions fréquemment posées',
      de: 'Häufig gestellte Fragen',
    },
    quickLinks: {
      en: 'Quick Links',
      es: 'Enlaces rápidos',
      fr: 'Liens rapides',
      de: 'Schnelllinks',
    },
    editProfile: {
      en: 'Edit Profile',
      es: 'Editar perfil',
      fr: 'Modifier le profil',
      de: 'Profil bearbeiten',
    },
    contactSupport: {
      en: 'Contact Support',
      es: 'Contactar con soporte',
      fr: 'Contacter le support',
      de: 'Support kontaktieren',
    },
    votingGuidelines: {
      en: 'Voting Guidelines',
      es: 'Guías de votación',
      fr: 'Directives de vote',
      de: 'Wahlrichtlinien',
    },
    viewResults: {
      en: 'View Results',
      es: 'Ver resultados',
      fr: 'Voir les résultats',
      de: 'Ergebnisse anzeigen',
    },
    submitComplaint: {
      en: 'Submit a Complaint',
      es: 'Presentar una queja',
      fr: 'Soumettre une plainte',
      de: 'Beschwerde einreichen',
    },
  };

  if (!isAuthenticated) {
    return null; // Don't render anything until auth check is complete
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container-custom py-12">
          <div className="text-center max-w-2xl mx-auto mb-8 stagger-animation">
            <div className="inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              {translations.voterProfile[currentLanguage]}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {voterDetails.name}
            </h1>
            <p className="text-lg text-foreground/80">
              {translations.voterId[currentLanguage]}: {voterDetails.voterId}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {translations.personalDetails[currentLanguage]}
                </CardTitle>
                <UserCheck className="h-5 w-5 text-foreground/60" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Info className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.name[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.voterId[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.voterId}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.age[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.age}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.address[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.constituency[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.constituency}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.pollingStation[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.pollingStation}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.registrationDate[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.registrationDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="h-4 w-4 text-foreground/70" />
                    <span className="text-sm font-medium">{translations.votingStatus[currentLanguage]}:</span>
                    <span className="text-sm">{voterDetails.votingStatus}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {translations.quickLinks[currentLanguage]}
                </CardTitle>
                <HelpCircle className="h-5 w-5 text-foreground/60" />
              </CardHeader>
              <CardContent className="flex flex-col space-y-3">
                <Button variant="ghost" className="justify-start">
                  <Link to="/edit-profile" className="flex items-center w-full">
                    {translations.editProfile[currentLanguage]}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Link to="/contact-support" className="flex items-center w-full">
                    {translations.contactSupport[currentLanguage]}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Link to="/guidelines" className="flex items-center w-full">
                    {translations.votingGuidelines[currentLanguage]}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Link to="/results" className="flex items-center w-full">
                    {translations.viewResults[currentLanguage]}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Link to="/complaints" className="flex items-center w-full">
                    {translations.submitComplaint[currentLanguage]}
                    <ChevronRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Voting History */}
          <div className="mb-12">
            <VoterHistory userId={voterDetails.voterId} />
          </div>
          
          {/* Complaints */}
          <div className="mb-12">
            <UserComplaints userId={voterDetails.voterId} />
          </div>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {translations.upcomingElections[currentLanguage]}
              </CardTitle>
              <Calendar className="h-5 w-5 text-foreground/60" />
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">
                      {translations.electionTitle[currentLanguage]}
                    </TableHead>
                    <TableHead>{translations.date[currentLanguage]}</TableHead>
                    <TableHead>{translations.location[currentLanguage]}</TableHead>
                    <TableHead className="text-right">
                      {translations.candidates[currentLanguage]}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingElections.map((election) => (
                    <TableRow key={election.id}>
                      <TableCell className="font-medium">{election.title}</TableCell>
                      <TableCell>{election.date}</TableCell>
                      <TableCell>{election.location}</TableCell>
                      <TableCell className="text-right">{election.candidates}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-bold">
                {translations.faqs[currentLanguage]}
              </CardTitle>
              <HelpCircle className="h-5 w-5 text-foreground/60" />
            </CardHeader>
            <CardContent className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    {faq.question}
                  </h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  {index < faqs.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VoterInfo;
