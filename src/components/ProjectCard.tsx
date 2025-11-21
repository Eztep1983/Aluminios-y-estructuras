import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, Eye } from 'lucide-react';
import type { Project } from '@/lib/types';
import { placeholderImagesById } from '@/lib/placeholder-images';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const image = placeholderImagesById[project.image];
  
  // Array de URLs de Cloudinary para el proyecto
  // Puedes modificar esto para que venga del objeto project
  const projectImages = project.galleryImages || [image?.imageUrl];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') setIsModalOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-lg group cursor-pointer">
        <CardHeader className="p-0 relative">
          <div 
            className="aspect-video overflow-hidden relative"
            onClick={() => setIsModalOpen(true)}
          >
            {image && (
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {/* Overlay con botón "Ver" */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
              <Button 
                variant="secondary" 
                size="lg"
                className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
              >
                <Eye className="mr-2 h-5 w-5" />
                Ver Proyecto
              </Button>
            </div>
            
            {/* Badge de cantidad de imágenes */}
            {projectImages.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {projectImages.length} fotos
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
          <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
        </CardContent>
      </Card>

      {/* Modal de Galería */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent 
          className="max-w-5xl w-full p-0 overflow-hidden"
          onKeyDown={handleKeyDown}
        >
          <div className="relative">
            {/* Header del Modal */}
            <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6 text-white">
              <DialogTitle className="text-2xl font-headline">{project.name}</DialogTitle>
              <DialogDescription className="text-gray-200">
                {project.description}
              </DialogDescription>
            </DialogHeader>

            {/* Galería de Imágenes */}
            <div className="relative aspect-video bg-black">
              <Image
                src={projectImages[currentImageIndex]}
                alt={`${project.name} - Imagen ${currentImageIndex + 1}`}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
                priority
              />

              {/* Controles de navegación */}
              {projectImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/50 hover:bg-black/70 text-white backdrop-blur-sm"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Indicador de posición */}
              {projectImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {projectImages.length}
                </div>
              )}
            </div>

            {/* Miniaturas */}
            {projectImages.length > 1 && (
              <div className="p-4 bg-background border-t">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {projectImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-primary ring-2 ring-primary/50'
                          : 'border-transparent hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={img}
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