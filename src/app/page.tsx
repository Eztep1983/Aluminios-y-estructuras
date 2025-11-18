import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { Testimonials } from '@/components/Testimonials';
import { getLatestProjects, getTestimonials } from '@/lib/data';
import { placeholderImagesById } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';

export default async function HomePage() {
  const latestProjects = await getLatestProjects(7);
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] w-full text-white">
        <Image
          src={placeholderImagesById['hero-background']?.imageUrl || "https://picsum.photos/seed/hero/1920/1080"}
          alt={placeholderImagesById['hero-background']?.description || "Taller de aluminio"}
          data-ai-hint={placeholderImagesById['hero-background']?.imageHint || "aluminum workshop"}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Aluminios y Estructuras
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200 md:text-xl">
            Soluciones innovadoras y de alta calidad en aluminio para tus proyectos.
          </p>
          <Button asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/80" size="lg">
            <Link href="/nuestro-trabajo">
              Ver Nuestros Proyectos <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section id="projects" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex flex-col items-center text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestro Trabajo Reciente</h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Echa un vistazo a algunos de nuestros proyectos más recientes y la calidad que nos caracteriza.
            </p>
          </div>
          <ProjectCarousel projects={latestProjects} />
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link href="/nuestro-trabajo">
                Ver Todos los Proyectos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full bg-muted py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
           <div className="mb-12 flex flex-col items-center text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lo Que Dicen Nuestros Clientes</h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
              Nos enorgullece la satisfacción de quienes confían en nosotros.
            </p>
          </div>
          <Testimonials initialTestimonials={testimonials} />
        </div>
      </section>
    </div>
  );
}
