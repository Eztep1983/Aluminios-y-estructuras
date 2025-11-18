import type { Project, Testimonial } from './types';

const projects: Project[] = [
  { id: '1', name: 'Puerta de Aluminio Moderno', description: 'Una puerta elegante y resistente para entradas principales.', image: 'puerta-1', category: 'Puertas' },
  { id: '2', name: 'Portón Eléctrico Residencial', description: 'Portón automático que ofrece seguridad y comodidad.', image: 'porton-1', category: 'Portones Eléctricos' },
  { id: '3', name: 'Ventana Corrediza Panorámica', description: 'Amplía tus vistas y llena de luz tu espacio.', image: 'ventana-1', category: 'Ventanas' },
  { id: '4', name: 'Estructura para Terraza', description: 'Diseño a medida para crear un espacio exterior único.', image: 'estructura-1', category: 'Estructuras' },
  { id: '5', name: 'Puerta Principal Negra', description: 'Un diseño audaz que combina con arquitecturas contemporáneas.', image: 'puerta-2', category: 'Puertas' },
  { id: '6', name: 'Portón Industrial', description: 'Solución robusta para accesos de alto tráfico.', image: 'porton-2', category: 'Portones Eléctricos' },
  { id: '7', name: 'Ventanal para Sala', description: 'Conecta tu interior con el exterior de forma elegante.', image: 'ventana-2', category: 'Ventanas' },
  { id: '8', name: 'Puerta de Vidrio Esmerilado', description: 'Ideal para interiores, combina privacidad y luminosidad.', image: 'puerta-3', category: 'Puertas' },
  { id: '9', name: 'Portón Estilo Madera', description: 'La calidez de la madera con la durabilidad del aluminio.', image: 'porton-3', category: 'Portones Eléctricos' },
  { id: '10', name: 'Ventana de Baño', description: 'Ventilación y privacidad para espacios húmedos.', image: 'ventana-3', category: 'Ventanas' },
  { id: '11', name: 'Techo para Cochera', description: 'Protege tu vehículo con una estructura ligera y resistente.', image: 'estructura-2', category: 'Estructuras' },
];

const testimonials: Testimonial[] = [
  { id: '1', name: 'Carlos Rodríguez', message: '¡El trabajo fue impecable! El portón eléctrico funciona de maravilla y la instalación fue muy rápida y profesional. Los recomiendo totalmente.', createdAt: '2023-10-15T10:00:00.000Z' },
  { id: '2', name: 'Ana Sofía', message: 'Estoy encantada con mis nuevas ventanas. El cambio en la casa es increíble, ahora entra mucha más luz y se ven muy modernas. Excelente servicio al cliente.', createdAt: '2023-11-02T14:30:00.000Z' },
  { id: '3', name: 'Anónimo', message: 'Muy profesionales. Cumplieron con los tiempos y el presupuesto. La estructura para mi terraza quedó justo como la imaginé.', createdAt: '2023-09-20T09:00:00.000Z' },
  { id: '4', name: 'Javier Pérez', message: 'Calidad y buen precio. La puerta de aluminio que instalaron es de primera. Se nota la diferencia. Sin duda volvería a contratarlos.', createdAt: '2024-01-10T11:00:00.000Z' },
];

// Simulate fetching data from a database
export const getProjects = async (): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return projects;
};

export const getLatestProjects = async (count: number): Promise<Project[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return projects.slice(0, count);
};

export const getProjectCategories = async (): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 100));
  const categories = new Set(projects.map(p => p.category));
  return Array.from(categories);
}

export const getTestimonials = async (): Promise<Testimonial[]> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'createdAt'>): Promise<Testimonial> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: (testimonials.length + 1).toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.unshift(newTestimonial);
  return newTestimonial;
}
