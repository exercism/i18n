# Introduzione

I dizionari di Cairo forniscono un modo per archiviare e recuperare coppie chiave-valore, simili alle mappe hash o ai dizionari di altri linguaggi.
Tuttavia, a causa del modello di memoria unico di Cairo e del suo ruolo nella generazione di prove computazionali, funzionano in modo molto diverso sotto il cofano: offrono operazioni con complessità $O(n)$ e una validazione automatica tramite un processo chiamato «squashing».
Capire in che modo i dizionari di Cairo differiscono dalle loro controparti in altri linguaggi è essenziale per scrivere programmi Cairo efficienti.
