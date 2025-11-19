"use client";
import Image from "next/image";
import { restaurantConfig } from "../../../config/restaurant.config";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const HERO_IMAGES = [
  "/images/hero/restaurant-interior.jpg",
  "/images/hero/restaurant-interior.jpg", // Add more images here
  "/images/hero/restaurant-interior.jpg", // Add more images here
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isPaused || HERO_IMAGES.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // Reset
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next slide
      setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }
    
    if (isRightSwipe) {
      // Swipe right - previous slide
      setCurrentSlide((prev) => (prev - 1 + HERO_IMAGES.length) % HERO_IMAGES.length);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 5000); // Resume after 5s
  };

  return (
    <section 
      ref={sliderRef}
      className="relative h-[80vh] min-h-[600px] w-full overflow-hidden touch-pan-y" 
      aria-label="Section principale"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slider Images */}
      {HERO_IMAGES.map((image, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={image}
            alt={`${restaurantConfig.name} - Vue ${idx + 1}`}
            fill
            priority={idx === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />

      {/* Slide Indicators */}
      {HERO_IMAGES.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? "w-8 bg-white" 
                  : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Aller à la diapositive ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Logo - Animated entrance */}
      <div className="absolute left-1/2 top-4 sm:top-6 z-10 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg animate-fade-in animate-delay-200 animate-scale-in">
        <Image 
          src="/logo.svg" 
          alt={`Logo ${restaurantConfig.name}`} 
          width={64} 
          height={64} 
          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
        />
      </div>

      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="container px-4 sm:px-6 text-center text-white">
          <h1 className="font-[var(--font-playfair)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg animate-slide-up animate-delay-400">
            {restaurantConfig.name}
          </h1>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl opacity-95 drop-shadow max-w-2xl mx-auto animate-fade-in animate-delay-700">
            {restaurantConfig.slogan}
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
            <a href="#carte" aria-label="Voir le menu du restaurant" className="w-full sm:w-auto max-w-xs animate-slide-left animate-delay-1000">
              <Button size="lg" className="bg-primary hover:opacity-90 hover:scale-105 transition-all duration-200 w-full sm:w-auto shadow-xl group">
                <span className="flex items-center justify-center">
                  Voir le menu <BookOpen className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                </span>
              </Button>
            </a>
            <a href="#reservation" aria-label="Réserver une table" className="w-full sm:w-auto max-w-xs animate-slide-right animate-delay-1200">
              <Button size="lg" variant="outline" className="border-2 border-white bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 w-full sm:w-auto shadow-xl backdrop-blur-sm group">
                <span className="flex items-center justify-center">
                  Réserver <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
