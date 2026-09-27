# Introduzione

In Cairo, gli array sono strutture dati fondamentali progettate per memorizzare collezioni di elementi dello stesso tipo in modo strutturato.
Analogamente agli array di altri linguaggi di programmazione, ogni elemento di un array è accessibile tramite il suo indice, il che consente un recupero e una manipolazione efficienti.

Gli array di Cairo sono strutture dati immutabili.
Gli elementi possono essere solo aggiunti in coda o rimossi dalla testa dell'array.
Questa progettazione garantisce integrità e stabilità dei dati, in linea con l'approccio di Cairo alla gestione della memoria.
Gli array vengono inizializzati usando `ArrayTrait::new()` e supportano dichiarazioni specifiche per tipo per la memorizzazione degli elementi.
L'accesso agli elementi può essere effettuato con i metodi `get()` o `at()`, oltre che usando l'operatore di indicizzazione `arr[index]`.
Puoi rimuovere elementi dalla testa di un array solo usando la funzione `pop_front()`.
Queste caratteristiche rendono gli array di Cairo adatti a compiti di archiviazione e recupero di dati strutturati.
