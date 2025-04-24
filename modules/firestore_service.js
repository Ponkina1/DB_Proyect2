import { db } from './firebase_init.js';
// importa intancia base de datos desde archivo conexion firebase
import { collection, getDocs, getDoc, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
// importa funciones necesarias para manejar docs

export class FirestoreService {
  constructor(collectionName) {
    this.collectionRef = collection(db, collectionName);
    // guarda referencia coleccion firebase
  }

  async getAllDocuments() {
    const snapshot = await getDocs(this.collectionRef);
     // obtiene documentos coleccion
    const data = [];
    snapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      // recorre documento y guarda array con id
    });
    return data;
     // devuelve array datos documentos
  }

  async getDocumentById(id) {
    const docRef = doc(this.collectionRef, id);
        // crea referencia al documento id
    const snapshot = await getDoc(docRef);
      // obtiene documento
  
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
      // si documento existe, devuelve contenido id
    } else {
      return null; 
      // si no existe, devuelve null
    }
  }

  async PostDocument(customId, dataObject) {
    try {
      console.log(customId, dataObject);
       // muestra por consola id y objeto datos
      const docRef = doc(this.collectionRef, customId.toString());
      // crea referencia documento id personalizado
      await setDoc(docRef, dataObject);
       // guarda el documento en firestore con los datos dados
      console.log("Documento creado con ID:", customId);
      alert("Documento creado con éxito.");
       // muestra mensaje de exito
    } catch (e) {
      console.error("Error al crear el documento:", e);
      alert("Error al crear el documento.");
      // en caso de error, muestra mensaje de error
    }
  }
  
}
