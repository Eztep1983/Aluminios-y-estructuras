import { 
  collection, 
  addDoc, 
  query, 
  orderBy, 
  limit, 
  getDocs,
  onSnapshot,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from './firebaseConfig';
import type { Testimonial } from './types';

const TESTIMONIALS_COLLECTION = 'testimonials';

/**
 * Agrega un nuevo testimonio a Firestore
 */
export async function addTestimonial(name: string, message: string) {
  try {
    const docRef = await addDoc(collection(db, TESTIMONIALS_COLLECTION), {
      name: name.trim() || 'Anónimo',
      message: message.trim(),
      createdAt: serverTimestamp(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding testimonial:', error);
    return { success: false, error: 'Error al guardar el testimonio' };
  }
}

/**
 * Obtiene testimonios de Firestore (para SSR)
 */
export async function getTestimonials(limitCount = 50): Promise<Testimonial[]> {
  try {
    const q = query(
      collection(db, TESTIMONIALS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        message: data.message,
        createdAt: data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      };
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
}

/**
 * Suscripción en tiempo real a testimonios
 */
export function subscribeToTestimonials(
  callback: (testimonials: Testimonial[]) => void,
  limitCount = 50
) {
  const q = query(
    collection(db, TESTIMONIALS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(limitCount)
  );

  return onSnapshot(q, (querySnapshot) => {
    const testimonials = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        message: data.message,
        createdAt: data.createdAt instanceof Timestamp 
          ? data.createdAt.toDate().toISOString()
          : new Date().toISOString(),
      };
    });
    callback(testimonials);
  }, (error) => {
    console.error('Error in testimonials subscription:', error);
  });
}