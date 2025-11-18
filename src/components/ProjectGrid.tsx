"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectGridProps {
  allProjects: Project[];
  categories: string[];
}

export function ProjectGrid({ allProjects, categories }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredProjects = activeCategory === 'Todos'
    ? allProjects
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div>
      <div className="flex justify-center flex-wrap gap-2 mb-8">
        <Button
          variant={activeCategory === 'Todos' ? 'default' : 'outline'}
          onClick={() => setActiveCategory('Todos')}
          className={cn("bg-accent text-accent-foreground hover:bg-accent/80", activeCategory === 'Todos' && 'bg-primary text-primary-foreground hover:bg-primary/90')}
        >
          Todos
        </Button>
        {categories.map(category => (
          <Button
            key={category}
            variant={activeCategory === category ? 'default' : 'outline'}
            onClick={() => setActiveCategory(category)}
            className={cn("bg-accent text-accent-foreground hover:bg-accent/80", activeCategory === category && 'bg-primary text-primary-foreground hover:bg-primary/90')}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
