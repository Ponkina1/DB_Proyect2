import { db } from './firebase_init.js';
import {
    collection,
    query,
    where,
    orderBy,
    limit,
    startAt,
    endAt,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class FirestoreQuery { // Define la clase FirestoreQuery y se exporta para usarla en otros archivos
    constructor(collectionName) { //contructor recibe nombre de la coleccion
        this.collectionRef = collection(db, collectionName); // guarda una referencia a la colleccion de firebase con el nombre
    }

    async whereQuery(column, comparison, value) { //metodo asincrono recibe columna, comparacion y valor y hace consulta de condicion "Where"
        const q = query(this.collectionRef, where(column, comparison, value)); //cre una consulta con la condicion especifica
        return this.runQuery(q); // ejecuta la consulta y devuleve resultados
    }

    async orderedQuery(column, direction = 'asc') { //metodo asincrono ordena los resultados de la consulta por columna y direccion
        const q = query(this.collectionRef, orderBy(column, direction)); //crea la consulta ordenada
        return this.runQuery(q); // ejecuta la consulta y devuleve resultados
    }

    async limitedQuery(maxResults = 5) { //metodo asincronico limite la cantidad de resultados
        const q = query(this.collectionRef, limit(maxResults)); //crea la consulta con el limite
        return this.runQuery(q); // ejecuta la consulta y devuleve resultados
    }

    async combinedQuery(filters = [], order = null, maxResults = null) { //metodo asincrono combina filtros, orden y limite en una consulta
        let constraints = filters.map(f => where(f.column, f.comparison, f.value)); //convierte los filtros a condiciones "Where"

        if (order) {
            constraints.push(orderBy(order.column, order.direction || 'asc'));
        }
        //Si se pasa orden, lo agrega

        if (maxResults) {
            constraints.push(limit(maxResults));
        }
        //Si se pasa limite, lo agrega

        const q = query(this.collectionRef, ...constraints); //crea consulta combina filtros
        return this.runQuery(q); // ejecuta la consulta y devuleve resultados
    }

    async prefixSearch(column, prefix) { //metodo asincrono bbusca por refijo columna
        const endText = prefix + '\uf8ff'; //define texto final para la busqueda
        const q = query(
            this.collectionRef,
            orderBy(column),
            startAt(prefix),
            endAt(endText)
        );
        // crea consulta ordenada y filtrada por prefijo
        return this.runQuery(q); //ejecuta la consulta y retorna los resultados
    }

    async runQuery(q) { //metodo asincrono ejecuta consukta firebase
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log('No matching documents.');
            return [];
        }
        //si no hay resultados, mensaje, array vacio

        const results = []; // arreglo guarda resultados
        snapshot.forEach(doc => {
            console.log(doc.id, '=>', doc.data());
            results.push({ id: doc.id, ...doc.data() });
        });
        // recorrre documenos, muesta contencido y guarda arregalo
        return results; // devuleve arreglo 
    }
}