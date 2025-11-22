// src/app/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ProjectCarousel } from '@/components/ProjectCarousel';
import { Testimonials } from '@/components/Testimonials';
import { getLatestProjects, getTestimonials } from '@/lib/data';
import { ArrowRight} from 'lucide-react';

export default async function HomePage() {
  const latestProjects = await getLatestProjects(7);
  const testimonials = await getTestimonials();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section Mejorado */}
      <section className="relative w-full overflow-hidden">
        <div className="relative w-full h-[10vh] min-h-[400px] max-h-[700px]">
          <Image
            src="https://res.cloudinary.com/dzqm5gmyg/image/upload/f_auto,q_auto/v1763677622/Portada1_pugn6j.jpg"
            alt="Acabados en aluminio y vidrio en Pasto"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
          
          {/* Contenido del Hero */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex flex-col items-center text-center text-white space-y-6 max-w-4xl mx-auto">
                <h1 className="font-headline text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight border-black/20 pb-2">
                  Estructuras en Aluminio y Vidrio
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl">
                  Especialistas en acabados de aluminio y vidrios ubicados en Pasto. Calidad y precisión en cada proyecto.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg">
                    <Link href="/nuestro-trabajo">
                      Ver Proyectos <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/30 hover:bg-white/20">
                    <Link href="/contacto">
                      Contáctanos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Proyectos Mejorada */}
      <section id="projects" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-accent bg-accent/10 rounded-full">
              Portafolio
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Nuestro Trabajo Reciente
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground text-base md:text-lg lg:text-xl">
              Echa un vistazo a algunos de nuestros proyectos más recientes y la calidad que nos caracteriza.
            </p>
          </div>
          <ProjectCarousel projects={latestProjects} />
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg" className="shadow-sm bg-blue-200 hover:shadow-md transition-shadow">
              <Link href="/nuestro-trabajo">
                Ver Todos los Proyectos <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios Mejorada */}
      <section id="testimonials" className="w-full bg-white py-16 md:py-24 lg:py-32 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-accent bg-accent/10 rounded-full">
              Testimonios
            </span>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
              Lo Que Dicen Nuestros Clientes
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground text-base md:text-lg lg:text-xl">
              Nos enorgullece la satisfacción de quienes confían en nosotros.
            </p>
          </div>
          <Testimonials initialTestimonials={testimonials} />
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="w-full py-16 md:py-20 bg-gradient-to-br from-accent/90 to-accent">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center text-white space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight max-w-3xl">
              ¿Listo para comenzar tu proyecto?
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl">
              Contáctanos hoy y recibe una cotización personalizada para tu proyecto de aluminio y vidrio
            </p>
            <Button asChild size="lg" variant="secondary" className="shadow-lg hover:shadow-xl transition-all">
              <Link href="/contacto">
                Contáctanos Ahora
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}