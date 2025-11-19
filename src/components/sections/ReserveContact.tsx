"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, MessageCircle, MapPin, Clock, Navigation } from "lucide-react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { toast } from "sonner";
import { restaurantConfig } from "../../../config/restaurant.config";

const reservationSchema = z.object({
  personnes: z
    .string()
    .regex(/^\d+$/, "Nombre invalide")
    .refine((v) => {
      const n = Number(v);
      return n >= 1 && n <= 20;
    }, "Entre 1 et 20"),
  date: z.string().min(1, "Date requise"),
  heure: z.string().regex(/^([01]?\d|2[0-3]):[0-5]\d$/, "Format HH:mm"),
});

type ReservationValues = z.infer<typeof reservationSchema>;

export function ReserveContact() {
  const [loading, setLoading] = useState(false);
  const form = useForm<ReservationValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      personnes: "2",
      date: "",
      heure: "19:00",
    },
  });

  const onSubmit = (values: ReservationValues) => {
    setLoading(true);
    try {
      const url = buildWhatsAppUrl({
        personnes: Number(values.personnes),
        date: values.date,
        heure: values.heure,
      });
      if (!url || url === "") {
        toast.error("Numéro WhatsApp invalide");
        setLoading(false);
        return;
      }
      window.open(url, "_blank", "noopener,noreferrer");
      toast.success("Redirection vers WhatsApp…");
      form.reset();
    } catch {
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const { phone, email, address, whatsapp, about, hours } = restaurantConfig as {
    phone: string;
    email: string;
    address: string;
    whatsapp: string;
    about: string;
    hours: { weekday: string; weekend: string; closed: string };
  };
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section id="reservation" className="container px-4 sm:px-6 py-12 sm:py-16 md:py-24" aria-labelledby="reservation-heading">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 sm:mb-12 text-center">
          <h2 id="reservation-heading" className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Réservation
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground px-4">
            Réservez votre table facilement via WhatsApp
          </p>
          <p className="mt-2 text-sm text-muted-foreground/80 px-4">
            Remplissez le formulaire ci-dessous, nous préparerons votre message
          </p>
        </div>

        <div className="grid gap-6 sm:gap-8 md:gap-10 lg:grid-cols-2">
          {/* Left: Reservation Form */}
          <Card className="shadow-lg border-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl sm:text-2xl font-[var(--font-playfair)] flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-primary" />
                Réservation Rapide
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-2">
                Complétez vos informations et cliquez pour envoyer via WhatsApp
              </p>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 sm:gap-6">
                  <FormField
                    control={form.control}
                    name="personnes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-semibold flex items-center gap-2">
                          Nombre de personnes (1-20)
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            min={1} 
                            max={20} 
                            {...field} 
                            placeholder="Ex: 4"
                            className="h-11 sm:h-12 transition-all focus:ring-2 focus:ring-primary/20 text-base" 
                          />
                        </FormControl>
                        <FormMessage className="animate-slide-up" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-semibold">
                          Date de réservation
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date" 
                            {...field} 
                            className="h-11 sm:h-12 transition-all focus:ring-2 focus:ring-primary/20 text-base" 
                          />
                        </FormControl>
                        <FormMessage className="animate-slide-up" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm sm:text-base font-semibold">
                          Heure d&apos;arrivée
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="time" 
                            {...field} 
                            className="h-11 sm:h-12 transition-all focus:ring-2 focus:ring-primary/20 text-base" 
                          />
                        </FormControl>
                        <FormMessage className="animate-slide-up" />
                      </FormItem>
                    )}
                  />

                  <div className="mt-2 p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-center text-muted-foreground mb-3">
                      Votre réservation sera envoyée directement via WhatsApp
                    </p>
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full ripple hover:scale-105 transition-all font-semibold text-base h-12" 
                      disabled={loading}
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      {loading ? "Préparation..." : "Réserver maintenant"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Right: About Section with Contact Info */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-[var(--font-playfair)]">À propos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <p className="text-sm sm:text-base leading-relaxed">{about}</p>
              </div>

              <div className="space-y-3 sm:space-y-4 pt-2">
                <div className="flex items-start gap-2 sm:gap-3">
                  <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium">Adresse</p>
                    <p className="text-xs sm:text-sm text-muted-foreground break-words">{address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium">Horaires</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{hours.weekday}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{hours.weekend}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{hours.closed}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium">Contact</p>
                    <a className="block text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all" href={`tel:${phone}`}>{phone}</a>
                    <a className="block text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all" href={`mailto:${email}`}>{email}</a>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-primary mt-1 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-medium">WhatsApp</p>
                    <a className="block text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors break-all" href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{whatsapp}</a>
                  </div>
                </div>
              </div>

              <Button asChild size="lg" className="w-full">
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Obtenir l&apos;itinéraire
                </a>
              </Button>

              <div className="h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg border-2 shadow-md">
                <iframe
                  title="Google Map"
                  src={mapSrc}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
