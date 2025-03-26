
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { AlertCircle, Check, SendHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/components/LanguageSwitcher';

// Define form validation schema with zod
const complaintFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  voterId: z.string().min(6, { message: "Voter ID must be at least 6 characters" }),
  complaintType: z.enum(["technical", "process", "staff", "other"], {
    required_error: "Please select a complaint type",
  }),
  description: z.string().min(20, { message: "Description must be at least 20 characters" }),
  location: z.string().optional(),
  dateOfIncident: z.string().optional(),
  attachEvidence: z.boolean().default(false),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type ComplaintFormValues = z.infer<typeof complaintFormSchema>;

const Complaints = () => {
  const { toast } = useToast();
  const { currentLanguage } = useLanguage();
  
  // Initialize form with react-hook-form
  const form = useForm<ComplaintFormValues>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      name: "",
      email: "",
      voterId: "",
      complaintType: "technical",
      description: "",
      location: "",
      dateOfIncident: "",
      attachEvidence: false,
      agreeToTerms: false,
    },
  });
  
  // Form submission handler
  const onSubmit = (data: ComplaintFormValues) => {
    console.log("Complaint submitted:", data);
    
    // In a real app, this would send the data to an API
    toast({
      title: "Complaint Submitted",
      description: "Your complaint has been successfully submitted. Reference ID: COM-" + Math.floor(Math.random() * 10000),
      variant: "default",
    });
    
    // Reset the form
    form.reset();
  };
  
  // Translations (simple implementation)
  const translations = {
    en: {
      title: "Submit a Complaint",
      subtitle: "Let us know about any issues you've encountered during the voting process",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      voterIdLabel: "Voter ID",
      complaintTypeLabel: "Complaint Type",
      technical: "Technical Issue",
      process: "Process Issue",
      staff: "Staff Behavior",
      other: "Other",
      descriptionLabel: "Complaint Description",
      descriptionPlaceholder: "Please provide detailed information about your complaint...",
      locationLabel: "Location of Incident",
      locationPlaceholder: "E.g. Polling station name or address",
      dateLabel: "Date of Incident",
      evidenceLabel: "I have evidence to attach (photos, videos, documents)",
      termsLabel: "I confirm that all information provided is accurate and true",
      submitButton: "Submit Complaint",
      requiredField: "This field is required",
    },
    es: {
      title: "Enviar una Queja",
      subtitle: "Infórmenos sobre cualquier problema que haya encontrado durante el proceso de votación",
      nameLabel: "Nombre Completo",
      emailLabel: "Correo Electrónico",
      voterIdLabel: "ID de Votante",
      complaintTypeLabel: "Tipo de Queja",
      technical: "Problema Técnico",
      process: "Problema de Proceso",
      staff: "Comportamiento del Personal",
      other: "Otro",
      descriptionLabel: "Descripción de la Queja",
      descriptionPlaceholder: "Por favor proporcione información detallada sobre su queja...",
      locationLabel: "Lugar del Incidente",
      locationPlaceholder: "Ej. Nombre o dirección del centro de votación",
      dateLabel: "Fecha del Incidente",
      evidenceLabel: "Tengo evidencia para adjuntar (fotos, videos, documentos)",
      termsLabel: "Confirmo que toda la información proporcionada es precisa y verdadera",
      submitButton: "Enviar Queja",
      requiredField: "Este campo es obligatorio",
    },
    fr: {
      title: "Soumettre une Plainte",
      subtitle: "Informez-nous de tout problème que vous avez rencontré pendant le processus de vote",
      nameLabel: "Nom Complet",
      emailLabel: "Adresse E-mail",
      voterIdLabel: "ID d'Électeur",
      complaintTypeLabel: "Type de Plainte",
      technical: "Problème Technique",
      process: "Problème de Processus",
      staff: "Comportement du Personnel",
      other: "Autre",
      descriptionLabel: "Description de la Plainte",
      descriptionPlaceholder: "Veuillez fournir des informations détaillées sur votre plainte...",
      locationLabel: "Lieu de l'Incident",
      locationPlaceholder: "Ex. Nom ou adresse du bureau de vote",
      dateLabel: "Date de l'Incident",
      evidenceLabel: "J'ai des preuves à joindre (photos, vidéos, documents)",
      termsLabel: "Je confirme que toutes les informations fournies sont exactes et véridiques",
      submitButton: "Soumettre la Plainte",
      requiredField: "Ce champ est obligatoire",
    },
  };
  
  // Get translated text based on current language (fallback to English)
  const t = translations[currentLanguage as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 to-accent/5"></div>
        
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-destructive/10 rounded-full mb-4">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.title}</h1>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
              {t.subtitle}
            </p>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{t.title}</CardTitle>
              <CardDescription>{t.subtitle}</CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.nameLabel} *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Smith" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.emailLabel} *</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" placeholder="you@example.com" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="voterId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.voterIdLabel} *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="ABC1234567" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="complaintType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.complaintTypeLabel} *</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 md:grid-cols-4 gap-3"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="technical" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{t.technical}</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="process" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{t.process}</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="staff" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{t.staff}</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">{t.other}</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.descriptionLabel} *</FormLabel>
                        <FormControl>
                          <Textarea 
                            {...field}
                            placeholder={t.descriptionPlaceholder}
                            className="min-h-[150px]"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.locationLabel}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t.locationPlaceholder} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dateOfIncident"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.dateLabel}</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="attachEvidence"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">{t.evidenceLabel}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="font-normal">{t.termsLabel} *</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full md:w-auto"
                  >
                    <SendHorizontal className="mr-2 h-4 w-4" />
                    {t.submitButton}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <div className="mt-8 flex justify-center">
            <Card className="max-w-lg w-full">
              <CardContent className="pt-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-full p-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">What happens next?</h3>
                    <p className="text-foreground/80 text-sm">
                      Your complaint will be reviewed by our election monitoring team. You will receive an acknowledgment 
                      within 24 hours and updates on any actions taken. For urgent issues, please contact our 
                      helpline at 1-800-VOTE-HELP.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
