"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { optimizeCloudinaryUrl } from '@/lib/cloudinary'; 

interface ProjectCardProps {
  project: {
    id: string;
    name: string;
    description: string;
    category?: string;
    galleryImages?: string[];
    createdAt?: Date;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const projectImages = project.galleryImages || [];


  // Manejo del botón de back del navegador
  useEffect(() => {
    if (isModalOpen) {
      // Agregar una entrada al historial cuando se abre el modal
      window.history.pushState({ modalOpen: true }, '');

      const handlePopState = () => {
        setIsModalOpen(false);
      };

      window.addEventListener('popstate', handlePopState);

      return () => {
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isModalOpen]);

  // Limpiar el historial cuando se cierra el modal normalmente
  const handleModalChange = (open: boolean) => {
    if (!open && isModalOpen) {
      // Si se está cerrando el modal, retroceder en el historial si fue agregado
      if (window.history.state?.modalOpen) {
        window.history.back();
      }
    }
    setIsModalOpen(open);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') handleModalChange(false);
  };

  if (projectImages.length === 0) {
    return null;
  }

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <CardHeader className="p-0 relative">
          <div 
            className="aspect-video overflow-hidden relative cursor-pointer"
            onClick={() => handleModalChange(true)}
          >
            <Image
              src={optimizeCloudinaryUrl(projectImages[0])}
              alt={project.name}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
            
            {/* Badge de cantidad de imágenes */}
            {projectImages.length > 1 && (
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-black/70 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                {projectImages.length} fotos
              </div>
            )}

            {/* Badge de categoría */}
            {project.category && (
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-primary/90 text-primary-foreground px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                {project.category}
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <CardTitle className="font-headline text-lg sm:text-xl">{project.name}</CardTitle>
          <CardDescription className="mt-2 text-sm sm:text-base">{project.description}</CardDescription>
          
          {/* Botón Ver Proyecto */}
          <Button 
            variant="default" 
            size="default"
            className="w-full mt-4"
            onClick={() => handleModalChange(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            Ver Proyecto
          </Button>
        </CardContent>
      </Card>

      {/* Modal de Galería */}
      <Dialog open={isModalOpen} onOpenChange={handleModalChange}>
        <DialogContent 
          className="max-w-[95vw] sm:max-w-4xl w-full p-0 overflow-hidden max-h-[90vh] flex flex-col"
          onKeyDown={handleKeyDown}
        >
          
          <VisuallyHidden>
            <DialogTitle>{project.name}</DialogTitle>
                <DialogDescription>
                  Galería de imágenes del proyecto {project.description}
                </DialogDescription>
          </VisuallyHidden>
          
          <div className="flex flex-col overflow-y-auto">
            {/* Galería de Imágenes */}
            <div className="relative bg-black">
              <div className="relative w-full" style={{ maxHeight: '60vh' }}>
                <Image
                  src={optimizeCloudinaryUrl(projectImages[currentImageIndex])}
                  alt={`${project.name} - Imagen ${currentImageIndex + 1}`}
                  width={1200}
                  height={800}
                  className="object-contain w-full h-full"
                  style={{ maxHeight: '60vh' }}
                  priority
                />

                {/* Controles de navegación */}
                {projectImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                      onClick={prevImage}
                    >
                      <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                      onClick={nextImage}
                    >
                      <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                    </Button>
                  </>
                )}

                {/* Indicador de posición */}
                {projectImages.length > 1 && (
                  <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm">
                    {currentImageIndex + 1} / {projectImages.length}
                  </div>
                )}
              </div>
            </div>

            {/* Información del Proyecto */}
            <div className="p-4 sm:p-6 bg-background">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xl sm:text-2xl font-headline font-bold">{project.name}</h2>
                {project.category && (
                  <span className="bg-primary/90 text-primary-foreground px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap">
                    {project.category}
                  </span>
                )}
              </div>
              <p className="text-sm sm:text-base text-muted-foreground">
                {project.description}
              </p>
            </div>

            {/* Miniaturas */}
            {projectImages.length > 1 && (
              <div className="px-4 pb-4 sm:px-6 sm:pb-6 bg-background border-t">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {projectImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-primary ring-2 ring-primary/50'
                          : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={optimizeCloudinaryUrl(img)}
                        alt={`Miniatura ${index + 1}`}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}