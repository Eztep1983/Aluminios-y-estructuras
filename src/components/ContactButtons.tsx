"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, X } from 'lucide-react';
import { useState } from "react";

export default function ContactButtons() {
    const [isOpen, setIsOpen] = useState(false);
    const phoneNumber = "573122180953"; 
    const whatsappMessage = "Hola, estoy interesado en sus servicios de Aluminios y Estructuras ¿Podrían brindarme más información?";

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button 
                    className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90"
                    size="icon"
                >
                    {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 border-none bg-transparent shadow-none" side="top" align="end">
                <div className="flex flex-col items-end gap-3">
                     <a 
                        href={`tel:+${phoneNumber.replace('1', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                         <p className="rounded-md bg-background px-3 py-2 text-sm font-medium shadow-md">Llamar ahora</p>
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full bg-secondary text-secondary-foreground shadow-lg hover:bg-secondary/90"
                        >
                            <Phone className="h-6 w-6" />
                        </Button>
                    </a>
                    <a 
                        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                    >
                        <p className="rounded-md bg-background px-3 py-2 text-sm font-medium shadow-md">Chatear en WhatsApp</p>
                        <Button
                            size="icon"
                            className="h-14 w-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600"
                        >
                           <svg
                                viewBox="0 0 32 32"
                                className="h-7 w-7"
                                fill="currentColor"
                                >
                                <path
                                    d="M16.21,4.4A11.82,11.82,0,0,0,4.4,16.21,11.82,11.82,0,0,0,16.21,28a11.82,11.82,0,0,0,11.81-11.81A11.82,11.82,0,0,0,16.21,4.4Zm5.1,16.49a2,2,0,0,1-1.4.67,3.65,3.65,0,0,1-1.69-.43c-.66-.3-2.3-1.12-4.38-3.1-1.64-1.58-2.73-3.53-2.93-3.8l-.06-.09a.63.63,0,0,1,.12-.66l.8-1a.61.61,0,0,1,.48-.24.58.58,0,0,1,.47.24l.1.12.7,1.19a.63.63,0,0,1-.06.77l-.42.48a.59.59,0,0,0-.24.54,6.43,6.43,0,0,0,1.13,1.9,8.44,8.44,0,0,0,2.36,1.75.6.6,0,0,0,.66-.18l.54-.65a.63.63,0,0,1,.77-.18l1.34.54a.63.63,0,0,1,.42.66Z"
                                />
                                </svg>
                        </Button>
                    </a>
                </div>
            </PopoverContent>
        </Popover>
    );
}
