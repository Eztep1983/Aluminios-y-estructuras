"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ProjectCard } from '@/components/ProjectCard';
import { Loader2, AlertCircle } from 'lucide-react';
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from '@/components/ui/carousel';

export interface FirebaseProject {
  id: string;
  name: string;
  description: string;
  category?: string;
  galleryImages?: string[];
  createdAt?: Date;
}

interface ProjectCarouselProps {
  projects?: FirebaseProject[]; 
  autoplayDelay?: number;
  showDots?: boolean;
  maxProjects?: number;
}

export function ProjectCarousel({ 
  projects: initialProjects, 
  autoplayDelay = 3000,
  showDots = true,
  maxProjects = 10
}: ProjectCarouselProps) {
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [isLoading, setIsLoading] = useState(!initialProjects); 
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

    useEffect(() => {
    if (!initialProjects) {
      loadProjects();
    }
  }, [maxProjects, initialProjects]);

  // Cargar proyectos desde Firebase
  useEffect(() => {
    loadProjects();
  }, [maxProjects]);

  const loadProjects = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const projectsRef = collection(db, 'projects');
      const q = query(projectsRef, orderBy('createdAt', 'desc'), limit(maxProjects));
      const snapshot = await getDocs(q);
      
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as FirebaseProject[];
      
      setProjects(projectsData);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('No se pudieron cargar los proyectos');
    } finally {
      setIsLoading(false);
    }
  };

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

  // Estado de carga
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Cargando proyectos...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-lg font-semibold mb-2">Error al cargar proyectos</p>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  // Sin proyectos
  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center p-12 text-muted-foreground">
        <div className="text-center">
          <p className="text-lg mb-2">No hay proyectos para mostrar</p>
          <p className="text-sm">Los proyectos aparecerán aquí cuando se agreguen a la base de datos</p>
        </div>
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

      {/* Contador */}
      {count > 0 && (
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {current + 1} / {count}
        </div>
      )}
    </div>
  );
}

// Versión alternativa que acepta proyectos como props (para SSR o datos pre-cargados)
export function ProjectCarouselWithData({ 
  projects,
  autoplayDelay = 3000,
  showDots = true 
}: {
  projects: FirebaseProject[];
  autoplayDelay?: number;
  showDots?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  
  const plugin = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
  );

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollTo = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

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

      {count > 0 && (
        <div className="text-center mt-2 text-sm text-muted-foreground">
          {current + 1} / {count}
        </div>
      )}
    </div>
  );
}