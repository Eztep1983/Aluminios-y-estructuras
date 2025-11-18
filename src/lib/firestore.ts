// lib/firestore.ts
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Leer documentos
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Agregar documento
export async function addUser(userData: { name: string; email: string }) {
  await addDoc(collection(db, "users"), userData);
}
