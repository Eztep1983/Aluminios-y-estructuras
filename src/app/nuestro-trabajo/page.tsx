import { getProjects, getProjectCategories } from '@/lib/data';
import { ProjectGrid } from '@/components/ProjectGrid';

export default async function NuestroTrabajoPage() {
  const projects = await getProjects();
  const categories = await getProjectCategories();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">Nuestro Portafolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
          Explora la variedad y calidad de los proyectos que hemos realizado.
        </p>
      </div>
      <ProjectGrid allProjects={projects} categories={categories} />
    </div>
  );
}
