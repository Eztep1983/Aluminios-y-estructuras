import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const phoneNumber = "312 218 0953";
  const phone = "573122180953"; 
  const whatsappMessage = "Hola, estoy interesado en sus servicios de Aluminios y Estructuras ¿Podrían brindarme más información?";

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Contáctanos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Comunícate con nosotros a través de WhatsApp o llámanos directamente.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* WhatsApp Card */}
          <a
            href={`https://wa.me/${phone}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-green-500 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MessageCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                WhatsApp
              </h2>
              <p className="text-gray-600">
                Chatea con nosotros en tiempo real
              </p>
              <div className="text-xl font-semibold text-green-600 group-hover:text-green-700">
                {phoneNumber}
              </div>
              <div className="mt-4 px-6 py-3 bg-green-500 text-white rounded-full group-hover:bg-green-600 transition-colors duration-300 font-medium">
                Abrir WhatsApp
              </div>
            </div>
          </a>

          {/* Phone Card */}
          <a
            href={`tel:${phoneNumber}`}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border-2 border-transparent hover:border-blue-500 transform hover:-translate-y-2"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Teléfono
              </h2>
              <p className="text-gray-600">
                Llámanos directamente
              </p>
              <div className="text-xl font-semibold text-blue-600 group-hover:text-blue-700">
                {phoneNumber}
              </div>
              <div className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-full group-hover:bg-blue-600 transition-colors duration-300 font-medium">
                Llamar Ahora
              </div>
            </div>
          </a>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Horario de Atención
          </h3>
          <p className="text-gray-600">
            Lunes a Viernes: 8:00 AM - 6:00 PM
          </p>
          <p className="text-gray-600">
            Sábados: 9:00 AM - 2:00 PM
          </p>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Responderemos tu mensaje lo más pronto posible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}