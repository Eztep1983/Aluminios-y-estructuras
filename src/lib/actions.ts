"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { addTestimonial } from "./data";

const TestimonialSchema = z.object({
  name: z.string().optional(),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres." }),
});

export type FormState = {
  message: string;
  errors?: {
    name?: string[];
    message?: string[];
  };
  success: boolean;
};

export async function submitTestimonial(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = TestimonialSchema.safeParse({
    name: formData.get("name") as string,
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      message: "Error al validar los campos.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { name, message } = validatedFields.data;

  try {
    await addTestimonial({ name: name || "Anónimo", message });
    revalidatePath("/");
    return { message: "¡Gracias por tu testimonio!", success: true };
  } catch (e) {
    return { message: "Error al guardar el testimonio.", success: false };
  }
}
