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
              <span>Calle 19 # 17b 22 Barrio Navarrete Pasto, Colombia</span>
            </li>
            <li className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <a href="mailto:contacto@aluminios.com" className="hover:text-primary">
                estructurasaluminiospasto@gmail.com
              </a>
            </li>
            <li className="flex items-center">
              <Phone className="mr-2 h-4 w-4" />
              <a href="tel:+573122180953" className="hover:text-primary">
                +52 312 218 0953
              </a>
            </li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-lg">
           <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d997.2328130198376!2d-77.2754226!3d1.2082245!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e2ed5e57c008963%3A0x5179caf3f0b99bae!2sEstructuras%20y%20aluminios%20Pasto!5e0!3m2!1ses-419!2sco!4v1763761587518!5m2!1ses-419!2sco"
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
