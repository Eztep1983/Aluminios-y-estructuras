export type Project = {
  id: string;
  galleryImages?: string[]; // Array de URLs de Cloudinary
  name: string;
  description: string;
  image: string; // Corresponds to an ID in placeholder-images.json
  category: 'Puertas' | 'Portones Eléctricos' | 'Ventanas' | 'Estructuras';
};

export type Testimonial = {
  id: string;
  name: string;
  message: string;
  createdAt: string; // ISO date string
};
