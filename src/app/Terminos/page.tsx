import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, FileText, Lock, Mail, Phone, MapPin } from 'lucide-react';

export default function TerminosYPrivacidadPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
          Términos y Privacidad
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Última actualización: {new Date().toLocaleDateString('es-CO', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      <div className="space-y-8">
        {/* Términos de Servicio */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <FileText className="w-6 h-6 text-primary" />
              Términos de Servicio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1. Aceptación de los Términos
              </h3>
              <p>
                Al acceder y utilizar el sitio web de nuestra empresa de aluminios y estructuras, 
                usted acepta cumplir con estos términos de servicio. Si no está de acuerdo con 
                alguna parte de estos términos, le recomendamos no utilizar nuestros servicios.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2. Servicios Ofrecidos
              </h3>
              <p className="mb-2">
                Nuestra empresa, ubicada en Pasto, Colombia, se especializa en:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Fabricación e instalación de estructuras en aluminio</li>
                <li>Acabados en aluminio y vidrio</li>
                <li>Estructuras funcionales para proyectos residenciales y comerciales</li>
                <li>Diseño y consultoría en proyectos arquitectónicos</li>
                <li>Mantenimiento y reparación de estructuras existentes</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3. Cotizaciones y Presupuestos
              </h3>
              <p>
                Todas las cotizaciones proporcionadas son estimaciones basadas en la información 
                suministrada por el cliente. Los precios finales pueden variar según las condiciones 
                del proyecto, materiales seleccionados y especificaciones técnicas. Las cotizaciones 
                tienen una validez de 30 días calendario.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                4. Garantías
              </h3>
              <p className="mb-2">
                Ofrecemos garantía sobre nuestros trabajos según los siguientes términos:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Materiales: Garantía del fabricante (generalmente 1-5 años según el producto)</li>
                <li>Mano de obra: 1 año a partir de la fecha de instalación</li>
                <li>La garantía no cubre daños por uso inadecuado, accidentes o falta de mantenimiento</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                5. Responsabilidades del Cliente
              </h3>
              <p className="mb-2">El cliente se compromete a:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Proporcionar información precisa sobre el proyecto</li>
                <li>Permitir el acceso al lugar de instalación en las fechas acordadas</li>
                <li>Realizar los pagos según los términos establecidos en el contrato</li>
                <li>Obtener los permisos necesarios cuando sean requeridos</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6. Formas de Pago
              </h3>
              <p>
                Aceptamos pagos en efectivo, transferencias bancarias y otros métodos acordados 
                previamente. Generalmente y no obligatoriamente se requiere un anticipo del 50% para iniciar el proyecto 
                y el saldo restante al finalizar la instalación.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7. Cancelaciones y Modificaciones
              </h3>
              <p>
                Las cancelaciones deben notificarse por escrito. Los anticipos son reembolsables 
                solo si no se han adquirido materiales o iniciado trabajos. Las modificaciones al 
                proyecto pueden generar costos adicionales y ajustes en los tiempos de entrega.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8. Propiedad Intelectual
              </h3>
              <p>
                Todos los diseños, planos y documentación técnica proporcionados son propiedad 
                de nuestra empresa. El cliente tiene derecho a usarlos únicamente para el proyecto 
                contratado.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Política de Privacidad */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Lock className="w-6 h-6 text-primary" />
              Política de Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-muted-foreground">
            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                1. Información que Recopilamos
              </h3>
              <p className="mb-2">
                Recopilamos la siguiente información cuando usted utiliza nuestros servicios:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Información de contacto:</strong> Nombre, teléfono, email, dirección</li>
                <li><strong>Información del proyecto:</strong> Ubicación, especificaciones, fotografías</li>
                <li><strong>Información de navegación:</strong> Cookies, dirección IP, tipo de dispositivo</li>
                <li><strong>Testimonios:</strong> Comentarios y opiniones sobre nuestros servicios</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                2. Uso de la Información
              </h3>
              <p className="mb-2">Utilizamos su información para:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Procesar cotizaciones y gestionar proyectos</li>
                <li>Comunicarnos con usted sobre su proyecto</li>
                <li>Mejorar nuestros servicios y experiencia del cliente</li>
                <li>Enviar información sobre promociones (solo con su consentimiento)</li>
                <li>Cumplir con requisitos legales y fiscales</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                3. Protección de Datos
              </h3>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger su 
                información personal contra acceso no autorizado, pérdida o alteración. Sus datos 
                se almacenan en servidores seguros y solo el personal autorizado tiene acceso a ellos.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                4. Compartir Información
              </h3>
              <p className="mb-2">
                No vendemos ni alquilamos su información personal. Podemos compartir datos con:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Proveedores de materiales (solo información necesaria para el proyecto)</li>
                <li>Autoridades gubernamentales cuando sea requerido por ley</li>
                <li>Servicios de almacenamiento en la nube (Firebase/Cloudinary) bajo estrictas medidas de seguridad</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                5. Cookies y Tecnologías Similares
              </h3>
              <p>
                Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario y analizar 
                el tráfico. Puede configurar su navegador para rechazar cookies, aunque esto puede 
                afectar algunas funcionalidades del sitio.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                6. Sus Derechos
              </h3>
              <p className="mb-2">Usted tiene derecho a:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Acceder a su información personal</li>
                <li>Solicitar corrección de datos inexactos</li>
                <li>Solicitar la eliminación de sus datos (sujeto a obligaciones legales)</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Retirar su consentimiento en cualquier momento</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                7. Retención de Datos
              </h3>
              <p>
                Conservamos su información personal durante el tiempo necesario para cumplir con los 
                fines para los que fue recopilada, incluidas las obligaciones legales, fiscales y 
                contables (generalmente 5-10 años según la legislación colombiana).
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                8. Menores de Edad
              </h3>
              <p>
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos 
                intencionalmente información de menores de edad.
              </p>
            </section>

            <Separator />

            <section>
              <h3 className="text-lg font-semibold text-foreground mb-3">
                9. Cambios en la Política
              </h3>
              <p>
                Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios 
                importantes serán notificados a través de nuestro sitio web o por email.
              </p>
            </section>
          </CardContent>
        </Card>

        {/* Contacto */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-xl">Contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Si tiene preguntas sobre estos términos o nuestra política de privacidad, 
              puede contactarnos a través de:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Ubicación</p>
                  <p className="text-sm text-muted-foreground">Pasto, Nariño, Colombia</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">estructurasaluminiospasto@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Teléfono</p>
                  <p className="text-sm text-muted-foreground">+57 312 218 0953</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Nota Legal */}
        <div className="text-center text-sm text-muted-foreground space-y-2 pt-8 border-t">
          <p>
            Estos términos se rigen por las leyes de la República de Colombia.
          </p>
          <p>
            Al utilizar nuestros servicios, usted acepta estos términos y nuestra política de privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}