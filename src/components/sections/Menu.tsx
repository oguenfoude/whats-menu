"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { restaurantConfig } from "../../../config/restaurant.config";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

type MenuItem = { 
  name: string; 
  category: string; 
  image: string;
  description: string;
  price?: string;
};

const categories = ["Tout", "Entrées", "Plats principaux", "Desserts"];

export function MenuSection() {
  const items = (restaurantConfig as { menu: MenuItem[] }).menu;
  const [activeCategory, setActiveCategory] = useState("Tout");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const minSwipeDistance = 50;

  const filteredItems = activeCategory === "Tout" 
    ? items 
    : items.filter(item => item.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("carte");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleLightboxTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleLightboxTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    });
  };

  const handleLightboxTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe) {
      // Horizontal swipe for navigation
      if (distanceX > minSwipeDistance) {
        nextImage(); // Swipe left
      }
      if (distanceX < -minSwipeDistance) {
        prevImage(); // Swipe right
      }
    } else {
      // Vertical swipe down to close
      if (distanceY < -minSwipeDistance) {
        closeLightbox(); // Swipe down
      }
    }
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === "Escape") {
        setLightboxOpen(false);
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, filteredItems.length]);

  return (
    <>
      <section id="carte" className="container px-4 sm:px-6 py-12 sm:py-16 md:py-24 bg-muted/30" aria-labelledby="menu-heading">
        <div className="mx-auto mb-10 sm:mb-12 max-w-3xl text-center">
          <h2 id="menu-heading" className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl font-bold text-primary">
            Notre Carte
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-muted-foreground">
            Entrées, Plats, Desserts — préparés avec passion
          </p>

          {/* Category Filters */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-white text-primary hover:bg-primary/10 border-2 border-primary/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="sm:hidden -mx-4 overflow-x-auto px-4">
          <div className="flex gap-6 sm:gap-8 pb-4">
            {filteredItems.map((item, idx) => (
              <div 
                key={`${item.name}-${idx}`} 
                className={`w-[240px] shrink-0 text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div 
                  className="relative mx-auto h-56 w-56 overflow-hidden rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group"
                  onClick={() => openLightbox(idx)}
                >
                  <Image
                    src={`/images/dishes/${item.image}`}
                    alt={`${item.name} - ${item.description}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 224px, 0px"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-semibold">
                      Agrandir
                    </span>
                  </div>
                </div>
                <Badge variant="secondary" className="mt-4 font-semibold text-xs px-3 py-1">
                  {item.category}
                </Badge>
                <h3 className="mt-3 font-[var(--font-playfair)] text-lg font-bold text-primary leading-tight px-2">
                  {item.name}
                </h3>
                {item.price && (
                  <p className="mt-2 text-primary font-bold text-base">
                    {item.price}€
                  </p>
                )}
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground px-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden sm:grid grid-cols-2 gap-8 lg:grid-cols-3 lg:gap-10 max-w-6xl mx-auto">
          {filteredItems.map((item, idx) => (
            <div 
              key={`${item.name}-${idx}`} 
              className={`text-center ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div 
                className="relative mx-auto h-60 w-60 lg:h-64 lg:w-64 overflow-hidden rounded-full transition-all duration-300 hover:scale-110 cursor-pointer group shadow-lg hover:shadow-2xl"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={`/images/dishes/${item.image}`}
                  alt={`${item.name} - ${item.description}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 0px, (max-width: 1024px) 240px, 256px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="text-white text-sm font-semibold">
                    Cliquer pour agrandir
                  </span>
                </div>
              </div>
              <Badge variant="secondary" className="mt-5 font-semibold text-sm px-4 py-1 transition-transform hover:scale-105">
                {item.category}
              </Badge>
              <h3 className="mt-4 font-[var(--font-playfair)] text-xl lg:text-2xl font-bold text-primary leading-tight">
                {item.name}
              </h3>
              {item.price && (
                <p className="mt-3 text-primary font-bold text-xl">
                  {item.price}€
                </p>
              )}
              <p className="mt-3 text-sm lg:text-base text-muted-foreground leading-relaxed px-3">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={closeLightbox}
          onTouchStart={handleLightboxTouchStart}
          onTouchMove={handleLightboxTouchMove}
          onTouchEnd={handleLightboxTouchEnd}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-8 h-8 text-white" />
          </button>

          {/* Navigation Buttons */}
          <button
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            className="absolute left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-8 h-8 text-white" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            className="absolute right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all hover:scale-110 z-10"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-8 h-8 text-white" />
          </button>

          {/* Image & Info */}
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-square max-h-[80vh] mx-auto rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
              <Image
                src={`/images/dishes/${filteredItems[lightboxIndex].image}`}
                alt={filteredItems[lightboxIndex].name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
            <div className="mt-6 text-center text-white">
              <Badge variant="secondary" className="mb-3">
                {filteredItems[lightboxIndex].category}
              </Badge>
              <h3 className="font-[var(--font-playfair)] text-3xl font-bold">
                {filteredItems[lightboxIndex].name}
              </h3>
              {filteredItems[lightboxIndex].price && (
                <p className="mt-3 text-2xl font-bold text-accent">
                  {filteredItems[lightboxIndex].price}€
                </p>
              )}
              <p className="mt-3 text-lg text-white/90 max-w-2xl mx-auto">
                {filteredItems[lightboxIndex].description}
              </p>
              <p className="mt-4 text-sm text-white/70">
                {lightboxIndex + 1} / {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
