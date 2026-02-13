import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="px-3 md:px-5 pt-5 pb-2" data-testid="hero-slider">
      <div className="relative rounded-3xl overflow-hidden">
        <div ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] lg:h-[85vh]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid={`slider-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
                  <div className="absolute inset-0 flex items-end pb-14 sm:pb-16 md:items-center md:pb-0">
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

        <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 flex-col gap-2 hidden sm:flex">
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

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:hidden">
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

        <div className="absolute bottom-5 right-5 hidden sm:flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={scrollPrev}
            className="bg-white/15 backdrop-blur-sm text-white border-0 rounded-md"
            data-testid="button-slider-prev"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={scrollNext}
            className="bg-white/15 backdrop-blur-sm text-white border-0 rounded-md"
            data-testid="button-slider-next"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
