import Link from "next/link";
import { Facebook, Instagram, MessageSquareHeart } from "lucide-react";
import Image from "next/image";
import { restaurantConfig } from "../../../config/restaurant.config";

export function Footer() {
  const { name, social } = restaurantConfig as {
    name: string;
    social: {
      facebook: string;
      instagram: string;
      tripadvisor: string;
    };
  };
  return (
    <footer className="mt-16 bg-black text-white">
      <div className="container px-6 py-12">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt={name} width={32} height={32} />
            <span className="text-lg font-semibold">{name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href={social.facebook} 
              aria-label="Facebook" 
              className="hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-1" 
              target="_blank"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link 
              href={social.instagram} 
              aria-label="Instagram" 
              className="hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-1" 
              target="_blank"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href={social.tripadvisor} 
              aria-label="TripAdvisor" 
              className="hover:opacity-80 hover:scale-110 transition-all duration-200 hover:-translate-y-1" 
              target="_blank"
            >
              <MessageSquareHeart className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/70">
          © 2024 {name}. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
