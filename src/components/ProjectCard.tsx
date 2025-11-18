import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Project } from '@/lib/types';
import { placeholderImagesById } from '@/lib/placeholder-images';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const image = placeholderImagesById[project.image];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="aspect-video overflow-hidden">
          {image && (
            <Image
              src={image.imageUrl}
              alt={image.description}
              data-ai-hint={image.imageHint}
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="font-headline text-xl">{project.name}</CardTitle>
        <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
      </CardContent>
    </Card>
  );
}
