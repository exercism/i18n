# Istruzioni

Come aspirante maga, Elyse deve esercitarsi con le basi.
Ha un mazzo di carte che vuole manipolare.

Per semplificare un po' le cose, usa solo le carte da 1 a 10, così il suo mazzo di carte può essere rappresentato da un array di numeri.
La posizione di una carta corrisponde all'indice nell'array.
Questo significa che la posizione 0 si riferisce alla prima carta, la posizione 1 alla seconda, e così via.

~~~~exercism/note
Tutte le funzioni dovrebbero aggiornare l'array di carte e poi restituire l'array modificato: un modo di lavorare comune noto come Builder pattern, che permette di concatenare le funzioni tra loro in modo elegante.
~~~~

## 1. Recuperare una carta da un mazzo

Per pescare una carta, restituisci la carta all'indice `position` del mazzo dato.

Implementa la funzione `getCard(at:from:)` che accetta due argomenti: `at`, cioè la posizione della carta nel mazzo, e `from`, cioè il mazzo di carte.
La funzione dovrebbe restituire la carta alla posizione `index` del mazzo dato.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Cambiare una carta nel mazzo

Fai un po' di gioco di prestigio e scambia la carta all'indice `position` con la carta sostitutiva fornita.

Implementa la funzione `setCard(at:in:to)` che accetta tre argomenti: `at`, cioè la posizione della carta nel mazzo, `in`, cioè il mazzo di carte, e `to`, cioè la nuova carta che sostituisce quella alla posizione `index`.
La funzione dovrebbe restituire una copia del mazzo con la carta alla posizione `index` sostituita dalla nuova carta.
Se l'indice passato in `index` non è valido nel mazzo, va restituito il mazzo originale, invariato.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Inserire una carta in cima al mazzo

Fai apparire una carta inserendo una nuova carta in cima al mazzo.

Implementa la funzione `insert(_:atTopOf:)` che accetta due argomenti: la nuova carta da inserire ed il mazzo di carte.
La funzione dovrebbe restituire una copia del mazzo con la nuova carta fornita aggiunta in cima al mazzo.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Rimuovere una carta dal mazzo

Fai sparire una carta rimuovendo dal mazzo la carta alla posizione indicata da `position`.

Implementa la funzione `removeCard(at:from:)` che accetta due argomenti: `at`, cioè la posizione della carta nel mazzo, e `from`, cioè il mazzo di carte.
La funzione dovrebbe restituire una copia del mazzo con la carta alla posizione `index` rimossa.
Se l'indice passato in `index` non è valido nel mazzo, va restituito il mazzo originale, invariato.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Inserire una carta nel mazzo

Fai apparire una carta inserendo una nuova carta alla posizione indicata da `position` nel mazzo.

Implementa la funzione `insert(_:at:from:)` che accetta tre argomenti: la nuova carta da inserire, la posizione in cui va inserita ed il mazzo di carte.
La funzione dovrebbe restituire una copia del mazzo con la nuova carta fornita aggiunta alla posizione indicata.
Se l'indice passato in `index` non è valido nel mazzo, va restituito il mazzo originale, invariato.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Controllare la dimensione del mazzo

Verifica se la dimensione del mazzo è uguale a `stackSize` oppure no.

Implementa la funzione `checkSizeOfStack(_:_:)` che accetta due argomenti: `stack`, cioè il mazzo di carte, e `stackSize`, cioè la dimensione del mazzo.
La funzione dovrebbe restituire `true` se la dimensione del mazzo è uguale a `stackSize`, e `false` altrimenti.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
