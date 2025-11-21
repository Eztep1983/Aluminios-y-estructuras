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
import { Star, Loader2, Send, Quote } from "lucide-react";

function TestimonialForm({ onSuccess }: { onSuccess: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);

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
      setName("");
      setMessage("");
      setCharCount(0);
      setIsExpanded(false);
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

  if (!isExpanded) {
    return (
      <Card className="border-2 hover:border-primary/50 transition-all hover:shadow-md cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardContent 
          className="p-6"
          onClick={() => setIsExpanded(true)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center transition-all group-hover:scale-110">
                <Quote className="w-5 h-5 text-primary transition-transform" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Deja tu Testimonio</h3>
                <p className="text-sm text-muted-foreground">Comparte tu experiencia con nosotros</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="group">
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary/50 transition-colors animate-in fade-in zoom-in-95 duration-500">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-primary animate-in spin-in-180 duration-500" />
            <h3 className="font-semibold text-lg">Comparte tu Experiencia</h3>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setIsExpanded(false);
              setName("");
              setMessage("");
              setCharCount(0);
            }}
            disabled={isSubmitting}
            className="animate-in fade-in duration-300 delay-100"
          >
            Cancelar
          </Button>
        </div>
        <div className="space-y-4">
          <div className="animate-in slide-in-from-left-4 duration-500 delay-150">
            <Label htmlFor="name" className="text-sm font-medium">
              Tu Nombre <span className="text-muted-foreground">(Opcional)</span>
            </Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Anónimo"
              disabled={isSubmitting}
              className="mt-1.5"
            />
          </div>
          <div className="animate-in slide-in-from-left-4 duration-500 delay-300">
            <Label htmlFor="message" className="text-sm font-medium">
              Tu Testimonio
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setCharCount(e.target.value.length);
              }}
              placeholder="Comparte tu experiencia con nosotros..."
              rows={4}
              disabled={isSubmitting}
              maxLength={500}
              className="mt-1.5 resize-none"
            />
            <p className="text-xs text-muted-foreground mt-1 text-right">
              {charCount}/500 caracteres
            </p>
          </div>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !message.trim()} 
            className="w-full group animate-in slide-in-from-bottom-4 duration-500 delay-500"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                Enviar Testimonio
                <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-300 group border-muted">
      <CardContent className="flex flex-col justify-between h-full p-6">
        <div>
          <Quote className="w-8 h-8 text-primary/20 mb-3" />
          <div className="flex text-yellow-400 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                fill="currentColor" 
                className="w-4 h-4 group-hover:scale-110 transition-transform"
                style={{ transitionDelay: `${i * 50}ms` }}
              />
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            "{testimonial.message}"
          </p>
        </div>
        <div className="flex items-center mt-6 pt-4 border-t">
          <Avatar className="h-11 w-11 mr-3 ring-2 ring-primary/10">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground font-semibold">
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
    const unsubscribe = subscribeToTestimonials((updatedTestimonials) => {
      setTestimonials(updatedTestimonials);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSuccess = () => {
    const testimonialsSection = document.getElementById('testimonials');
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="col-span-full flex flex-col justify-center items-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-primary mb-3" />
            <p className="text-sm text-muted-foreground">Cargando testimonios...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <Card className="col-span-full border-dashed border-2">
            <CardContent className="text-center py-16">
              <Star className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h4 className="font-semibold text-lg mb-2">No hay testimonios aún</h4>
              <p className="text-muted-foreground">Sé el primero en compartir tu experiencia</p>
            </CardContent>
          </Card>
        ) : (
          testimonials.slice(0, 4).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'backwards' }}
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))
        )}
      </div>
      <div className="lg:sticky lg:top-6 lg:self-start">
        <h3 className="font-headline text-2xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          ¿Fuiste Cliente? Deja tu Opinión
        </h3>
        <TestimonialForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}