import { Phone, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { restaurantConfig } from "../../../config/restaurant.config";

export function About() {
  const { about, phone, email, address, hours, whatsapp } =
    restaurantConfig as {
      about: string;
      phone: string;
      email: string;
      address: string;
      hours: { weekday: string; weekend: string; closed: string };
      whatsapp: string;
    };

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    address
  )}&output=embed`;
  
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  return (
    <section id="a-propos" className="container px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-[var(--font-playfair)] text-4xl md:text-5xl font-bold text-[--brand-primary]">
            À propos
          </h2>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2 items-start">
          <div className="space-y-6">
            <div>
              <p className="text-lg leading-relaxed text-foreground">{about}</p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[--brand-primary] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p className="text-sm text-muted-foreground">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[--brand-primary] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Horaires</p>
                  <p className="text-sm text-muted-foreground">Semaine: {hours.weekday}</p>
                  <p className="text-sm text-muted-foreground">Week-end: {hours.weekend}</p>
                  <p className="text-sm text-muted-foreground">{hours.closed}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[--brand-primary] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">Contact</p>
                  <a className="block text-sm text-muted-foreground hover:text-primary transition-colors" href={`tel:${phone}`}>{phone}</a>
                  <a className="block text-sm text-muted-foreground hover:text-primary transition-colors" href={`mailto:${email}`}>{email}</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-[--brand-primary] mt-1 shrink-0" />
                <div>
                  <p className="font-medium">WhatsApp</p>
                  <a className="block text-sm text-muted-foreground hover:text-primary transition-colors" href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">{whatsapp}</a>
                </div>
              </div>
            </div>

            <Button asChild size="lg" className="w-full md:w-auto">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-5 w-5" />
                Obtenir l&apos;itinéraire
              </a>
            </Button>
          </div>

          <div className="min-h-[400px] overflow-hidden rounded-xl border-2 shadow-lg">
            <iframe
              title="Google Map"
              src={mapSrc}
              className="h-full w-full min-h-[400px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
