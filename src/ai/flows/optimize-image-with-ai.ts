'use server';

/**
 * @fileOverview An AI-powered image optimization flow.
 *
 * - optimizeImage - A function that optimizes an image using AI.
 * - OptimizeImageInput - The input type for the optimizeImage function.
 * - OptimizeImageOutput - The return type for the optimizeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeImageInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The image data as a URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type OptimizeImageInput = z.infer<typeof OptimizeImageInputSchema>;

const OptimizeImageOutputSchema = z.object({
  optimizedImageDataUri: z.string().describe('The optimized image data as a data URI.'),
  optimizationDetails: z.string().describe('Details about the optimization process and improvements.'),
});
export type OptimizeImageOutput = z.infer<typeof OptimizeImageOutputSchema>;

export async function optimizeImage(input: OptimizeImageInput): Promise<OptimizeImageOutput> {
  return optimizeImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeImagePrompt',
  input: {schema: OptimizeImageInputSchema},
  output: {schema: OptimizeImageOutputSchema},
  prompt: `You are an expert image optimization specialist.

You will receive an image as a data URI. Your task is to analyze the image and provide an optimized version of the image, while preserving its visual quality as much as possible, as a data URI. Also provide a detailed description of the optimization techniques used and the expected improvements in terms of loading time and SEO.

Here is the image to optimize: {{media url=imageDataUri}}

Ensure the optimized image is significantly smaller in file size.
`,
});

const optimizeImageFlow = ai.defineFlow(
  {
    name: 'optimizeImageFlow',
    inputSchema: OptimizeImageInputSchema,
    outputSchema: OptimizeImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
