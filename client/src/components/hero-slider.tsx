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
    <section className="relative w-full" data-testid="hero-slider">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  data-testid={`slider-image-${index}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-xl">
                      <div className="inline-block mb-4">
                        <span className="text-white/60 text-sm font-medium tracking-widest uppercase">
                          {String(index + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
                        </span>
                      </div>
                      <h2
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 md:mb-6"
                        data-testid={`slider-title-${index}`}
                      >
                        {slide.title}
                      </h2>
                      <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3" data-testid={`slider-desc-${index}`}>
                        {slide.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            data-testid={`slider-dot-${index}`}
          />
        ))}
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-4 hidden sm:block">
        <Button
          size="icon"
          variant="ghost"
          onClick={scrollPrev}
          className="bg-black/20 backdrop-blur-sm text-white border-0"
          data-testid="button-slider-prev"
        >
          <ChevronLeft />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 hidden sm:block">
        <Button
          size="icon"
          variant="ghost"
          onClick={scrollNext}
          className="bg-black/20 backdrop-blur-sm text-white border-0"
          data-testid="button-slider-next"
        >
          <ChevronRight />
        </Button>
      </div>
    </section>
  );
}
