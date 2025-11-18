import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

export const placeholderImages: ImagePlaceholder[] = data.placeholderImages;

export const placeholderImagesById = placeholderImages.reduce((acc, image) => {
  acc[image.id] = image;
  return acc;
}, {} as Record<string, ImagePlaceholder>);
