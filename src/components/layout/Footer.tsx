import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center space-x-2 text-foreground">
            <span className="text-lg font-bold font-headline">Aluminios y Estructuras</span>
          </Link>
          <p className="mt-4 text-sm">
            Calidad y profesionalismo en cada proyecto.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground font-headline">Contacto</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>Av. de los Insurgentes Sur, Ciudad de México, CDMX</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <a href="mailto:contacto@aluminios.com" className="hover:text-primary">
                contacto@aluminios.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <a href="tel:+525512345678" className="hover:text-primary">
                +52 55 1234 5678
              </a>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg">
           <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.662423377708!2d-99.1756854850934!3d19.42698998688757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ff35f5bd271f%3A0x47d956d7730999f8!2sThe%20Angel%20of%20Independence!5e0!3m2!1sen!2smx!4v1678886400000"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación de Aluminios y Estructuras"
          ></iframe>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 py-4 sm:flex-row md:px-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Aluminios y Estructuras. Todos los derechos reservados.
          </p>
          <div className="mt-2 flex space-x-4 sm:mt-0">
            <Link href="#" className="text-sm hover:text-primary">Términos de Servicio</Link>
            <Link href="#" className="text-sm hover:text-primary">Política de Privacidad</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
