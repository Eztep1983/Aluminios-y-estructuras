"use client";

import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addTestimonial, subscribeToTestimonials } from "@/lib/firestore-testimonials";
import type { Testimonial } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import { Star, Loader2 } from "lucide-react";

function TestimonialForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    if (!message.trim()) {
      toast({
        title: "Error",
        description: "Por favor escribe tu testimonio",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const result = await addTestimonial(name, message);

    if (result.success) {
      toast({
        title: "¡Éxito!",
        description: "Tu testimonio ha sido enviado correctamente",
      });
      formRef.current?.reset();
      onSuccess();
    } else {
      toast({
        title: "Error",
        description: result.error || "No se pudo enviar el testimonio",
        variant: "destructive",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Tu Nombre (Opcional)</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="Anónimo"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Label htmlFor="message">Tu Testimonio</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Comparte tu experiencia con nosotros..."
              required
              rows={4}
              disabled={isSubmitting}
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar Testimonio"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col justify-between h-full p-6">
        <div>
          <div className="flex text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} fill="currentColor" className="w-5 h-5"/>
            ))}
          </div>
          <p className="text-muted-foreground italic">"{testimonial.message}"</p>
        </div>
        <div className="flex items-center mt-4">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {getInitials(testimonial.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-foreground">{testimonial.name}</p>
            <p className="text-sm text-muted-foreground">Cliente Satisfecho</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Testimonials({ initialTestimonials }: { initialTestimonials: Testimonial[] }) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Suscribirse a cambios en tiempo real
    const unsubscribe = subscribeToTestimonials((updatedTestimonials) => {
      setTestimonials(updatedTestimonials);
      setIsLoading(false);
    });

    // Cleanup al desmontar
    return () => unsubscribe();
  }, []);

  const handleSuccess = () => {
    // Opcional: scroll a los testimonios después de enviar
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : testimonials.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <p>Sé el primero en dejar tu testimonio</p>
          </div>
        ) : (
          testimonials.slice(0, 4).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))
        )}
      </div>
      <div>
        <h3 className="font-headline text-2xl font-bold mb-4">Deja tu Opinión</h3>
        <TestimonialForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}