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
    <section className="max-w-7xl mx-auto px-4 md:px-6 pt-6 pb-2" data-testid="hero-slider">
      <div className="relative rounded-2xl overflow-hidden">
        <div ref={emblaRef}>
          <div className="flex">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
                <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    data-testid={`slider-image-${index}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full px-6 sm:px-10 md:px-14">
                      <div className="max-w-xl">
                        <div className="inline-block mb-3">
                          <span className="text-white/50 text-xs font-medium tracking-widest uppercase">
                            {String(index + 1).padStart(2, "0")}/{String(slides.length).padStart(2, "0")}
                          </span>
                        </div>
                        <h2
                          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3 md:mb-5"
                          data-testid={`slider-title-${index}`}
                        >
                          {slide.title}
                        </h2>
                        <p className="text-white/75 text-sm sm:text-base leading-relaxed line-clamp-3" data-testid={`slider-desc-${index}`}>
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

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "w-7 bg-white" : "w-1.5 bg-white/40"
              }`}
              data-testid={`slider-dot-${index}`}
            />
          ))}
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-3 hidden sm:block">
          <Button
            size="icon"
            variant="ghost"
            onClick={scrollPrev}
            className="bg-white/10 backdrop-blur-sm text-white border-0"
            data-testid="button-slider-prev"
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 hidden sm:block">
          <Button
            size="icon"
            variant="ghost"
            onClick={scrollNext}
            className="bg-white/10 backdrop-blur-sm text-white border-0"
            data-testid="button-slider-next"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
