/**
 * Optimiza una URL de Cloudinary agregando transformaciones
 * @param url - URL completa de Cloudinary
 * @param options - Opciones de transformación
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: {
    width?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'avif';
  } = {}
): string {
  // Si no es una URL de Cloudinary, devolver sin cambios
  if (!url.includes('res.cloudinary.com')) {
    return url;
  }

  const { width, quality = 'auto', format = 'auto' } = options;

  // Construir las transformaciones
  const transformations = [
    `f_${format}`,
    `q_${quality}`,
    width && `w_${width}`,
    'c_limit', // No agranda, solo reduce si es necesario
  ].filter(Boolean).join(',');

  // Reemplazar /upload/ por /upload/transformaciones/
  return url.replace('/upload/', `/upload/${transformations}/`);
}