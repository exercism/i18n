# Istruzioni

La tua nostalgia per le carte Blorkemon™️ non accenna a diminuire, hai persino ricominciato a collezionarle e stai convincendo i tuoi amici a unirsi a te.

In questo esercizio, userai l'interfaccia `Set` per gestire la tua collezione, dato che le carte duplicate non sono importanti quando il tuo obiettivo è ottenere tutte le carte esistenti.

## 1. Inizia una collezione

Hai appena ritrovato la tua vecchia scorta di carte Blorkemon™️!
La scorta contiene un mucchio di carte duplicate, quindi è il momento di iniziare una nuova collezione eliminando i duplicati.

Vuoi davvero che i tuoi amici entrino nella tua follia per Blorkemon™️, e il modo migliore è far partire la loro collezione regalando una carta a ciascuno.

Implementa il metodo `newCollection`, che trasforma una lista di carte in un `Set` che rappresenta la tua nuova collezione.

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. Fai crescere la collezione

Una volta che hai una collezione, questa prende vita propria e deve crescere.

Implementa il metodo `addCard`, che riceve una nuova carta e il tuo insieme attuale di carte collezionate.
Il metodo deve aggiungere la nuova carta alla collezione se non è già presente e deve restituire un `boolean`
che indica se la collezione è stata aggiornata.

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. Inizia a scambiare

Vuoi davvero che i tuoi amici entrino nella tua follia per Blorkemon™️, quindi è il momento di iniziare a scambiare!

Quando si scambia con gli amici, non tutti gli scambi valgono la pena, né sono sempre possibili.
Dovresti scambiare solo se sia tu sia il tuo amico avete una carta che l'altro non ha.

Implementa il metodo `canTrade`, che riceve la tua collezione attuale e la collezione di uno dei tuoi amici.
Deve restituire un `boolean` che indica se uno scambio è possibile, seguendo le regole precedenti.

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. Individua le carte comuni

Tu e i tuoi amici appassionati di Blorkemon™️ vi riunite e vi chiedete quali carte siano le più comuni.

Implementa il metodo `commonCards`, che riceve una lista di collezioni e restituisce una collezione delle carte che tutte
le collezioni hanno in comune.

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. Tutte le carte

Tu e i tuoi amici possedete collettivamente tutte le carte Blorkemon™️?

Implementa il metodo `allCards`, che riceve una lista di collezioni e restituisce una collezione di tutte le carte diverse
presenti in tutte le collezioni messe insieme.

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
