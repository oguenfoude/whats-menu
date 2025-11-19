import { restaurantConfig } from "../../config/restaurant.config";

export function buildWhatsAppUrl(params: {
  phone?: string;
  personnes: number;
  date: string;
  heure: string;
  message?: string;
}) {
  const rawPhone = (params.phone || restaurantConfig.whatsapp || "").replace(/\D/g, "");
  
  if (!rawPhone) {
    console.error("WhatsApp number not configured");
    return "";
  }
  
  const text = `Bonjour, je souhaite réserver une table pour ${params.personnes} personne${params.personnes > 1 ? 's' : ''} le ${params.date} à ${params.heure}.${params.message ? `\n\n${params.message}` : ""}`;
  const encoded = encodeURIComponent(text);
  
  return `https://wa.me/${rawPhone}?text=${encoded}`;
}
