"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import type { Project } from '@/lib/types';
import { ProjectCard } from './ProjectCard';
import Autoplay from "embla-carousel-autoplay";
import { useRef, useCallback, useEffect, useState } from 'react';
import type { CarouselApi } from '@/components/ui/carousel';

interface ProjectCarouselProps {
  projects: Project[];
  autoplayDelay?: number;
  showDots?: boolean;
}

export function ProjectCarousel({ 
  projects, 
  autoplayDelay = 3000,
  showDots = true 
}: ProjectCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  // Actualizar el índice actual cuando cambia el slide
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Función para ir a un slide específico
  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  // Manejar teclado para accesibilidad
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      api?.scrollPrev();
    } else if (e.key === 'ArrowRight') {
      api?.scrollNext();
    }
  }, [api]);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No hay proyectos para mostrar
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        onKeyDown={handleKeyDown}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project, index) => (
            <CarouselItem 
              key={project.id} 
              className="md:basis-1/2 lg:basis-1/3"
              aria-label={`Proyecto ${index + 1} de ${projects.length}`}
            >
              <div className="p-1">
                <ProjectCard project={project} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious 
          className="hidden sm:flex -left-12 hover:bg-primary hover:text-primary-foreground transition-colors" 
          aria-label="Proyecto anterior"
        />
        <CarouselNext 
          className="hidden sm:flex -right-12 hover:bg-primary hover:text-primary-foreground transition-colors" 
          aria-label="Siguiente proyecto"
        />
      </Carousel>

      {/* Indicadores de navegación (dots) */}
      {showDots && count > 1 && (
        <div 
          className="flex justify-center gap-2 mt-4"
          role="tablist"
          aria-label="Navegación de proyectos"
        >
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={current === index}
              aria-label={`Ir al proyecto ${index + 1}`}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all ${
                current === index 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      )}

      {/* Contador opcional */}
      <div className="text-center mt-2 text-sm text-muted-foreground">
        {current + 1} / {count}
      </div>
    </div>
  );
}