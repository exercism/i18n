# metodo troppo lungo

Prova a scomporre i seguenti metodi in chiamate ad altri metodi semanticamente significativi: `%{methodNames}`

Il metodo ha più righe di codice di quante questo esercizio ne richieda di solito.
Potrebbe andare bene, ma potrebbe indicare che il metodo sta facendo troppo lavoro direttamente e che dovrebbe delegare parte di quel lavoro ad altri metodi.
Prova a mantenere tutto ciò che sta dentro un metodo allo stesso livello di astrazione.
Per esempio, iterare sugli elementi di un ciclo potrebbe stare in un metodo, mentre manipolare ogni singolo elemento potrebbe stare in un altro.
