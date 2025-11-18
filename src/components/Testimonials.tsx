"use client";

import { useEffect, useOptimistic, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { submitTestimonial } from "@/lib/actions";
import type { Testimonial } from "@/lib/types";
import { getInitials } from "@/lib/utils";
import { Star } from "lucide-react";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Enviando..." : "Enviar Testimonio"}
    </Button>
  );
}

function TestimonialForm({ onAddTestimonial }: { onAddTestimonial: (t: Testimonial) => void }) {
  const initialState = { message: "", success: false };
  const [state, dispatch] = useFormState(submitTestimonial, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: "Éxito",
          description: state.message,
        });
        formRef.current?.reset();
        
        // Optimistically add testimonial
        const formData = new FormData(formRef.current!);
        const newTestimonial: Testimonial = {
          id: new Date().toISOString(),
          name: formData.get("name") as string || 'Anónimo',
          message: formData.get("message") as string,
          createdAt: new Date().toISOString(),
        };
        onAddTestimonial(newTestimonial);

      } else {
        toast({
          title: "Error",
          description: state.message,
          variant: "destructive",
        });
      }
    }
  }, [state, toast, onAddTestimonial]);

  return (
    <Card>
      <CardContent className="p-6">
        <form ref={formRef} action={dispatch} className="space-y-4">
          <div>
            <Label htmlFor="name">Tu Nombre (Opcional)</Label>
            <Input id="name" name="name" placeholder="Anónimo" />
          </div>
          <div>
            <Label htmlFor="message">Tu Testimonio</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Comparte tu experiencia con nosotros..."
              required
              rows={4}
            />
            {state.errors?.message && (
              <p className="text-sm text-destructive mt-1">{state.errors.message}</p>
            )}
          </div>
          <SubmitButton />
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
            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5"/>)}
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
  const [optimisticTestimonials, addOptimisticTestimonial] = useOptimistic(
    initialTestimonials,
    (state, newTestimonial: Testimonial) => [newTestimonial, ...state]
  );
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {optimisticTestimonials.slice(0, 4).map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      <div>
        <h3 className="font-headline text-2xl font-bold mb-4">Deja tu Opinión</h3>
        <TestimonialForm onAddTestimonial={addOptimisticTestimonial} />
      </div>
    </div>
  );
}
