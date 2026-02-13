import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Slider } from "@shared/schema";

interface HeroSliderProps {
  slides: Slider[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!slides.length) return null;

  return (
    <section className="px-0 sm:px-3 md:px-5 pt-0 sm:pt-5 pb-2" data-testid="hero-slider">
      <div className="relative rounded-none sm:rounded-3xl overflow-hidden">
        <div ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative w-full aspect-[3/4] sm:aspect-[16/10] md:aspect-[16/8] lg:aspect-[16/7]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid={`slider-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-black/30" />
                  <div className="absolute inset-0 flex items-end pb-20 sm:pb-16 md:items-center md:pb-0">
                    <div className="w-full px-6 sm:px-10 md:px-14 lg:px-16">
                      <div className="max-w-lg">
                        {slide.topText && (
                          <span
                            className="inline-block text-xs sm:text-sm font-medium tracking-widest uppercase text-white/60 mb-3"
                            data-testid={`slider-top-text-${index}`}
                          >
                            {slide.topText}
                          </span>
                        )}
                        <h2
                          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 md:mb-5"
                          data-testid={`slider-title-${index}`}
                        >
                          {slide.title}
                        </h2>
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-3 mb-3 md:mb-5" data-testid={`slider-desc-${index}`}>
                          {slide.description}
                        </p>
                        {slide.bottomText && (
                          <span
                            className="inline-block text-xs sm:text-sm font-medium tracking-wide text-white/50"
                            data-testid={`slider-bottom-text-${index}`}
                          >
                            {slide.bottomText}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 flex-col gap-2 hidden md:flex">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`w-8 h-8 rounded-md text-xs font-semibold transition-all duration-300 ${
                index === selectedIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
              }`}
              data-testid={`slider-dot-${index}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 md:hidden w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:bg-white/30 transition-colors"
          data-testid="button-slider-prev-mobile"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 md:hidden w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white active:bg-white/30 transition-colors"
          data-testid="button-slider-next-mobile"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 md:hidden">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-7 bg-white" : "w-1.5 bg-white/40"
              }`}
              data-testid={`slider-dot-mobile-${index}`}
            />
          ))}
        </div>

        
      </div>
    </section>
  );
}
