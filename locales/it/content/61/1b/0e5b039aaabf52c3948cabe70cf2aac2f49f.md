# Istruzioni

La compagnia di danza sta preparando lo spettacolo di fine anno: in quanti modi si possono disporre i ballerini e come si divide la durata tra i vari atti.

Tutti e cinque i compiti vanno nella classe `FORMATION_COUNT`.

## 1. Quante disposizioni?

Con `n` ballerini ci sono `n` fattoriale modi per metterli in fila: `n` scelte per chi sta davanti, poi `n-1` per il successivo, e così via. Restituisci il risultato come `INTI`. Zero ballerini hanno esattamente una disposizione: quella vuota.

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. Scrivilo per esteso

Lo stesso numero come stringa, con tutte le sue cifre.

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

Un `INT` non può contenere quel numero, ed è proprio questo il punto del compito.

## 3. La quota di un atto

Uno spettacolo di `acts` atti uguali dà a ogni atto `1/acts` della durata. Restituisci il risultato come `RAT`.

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. Due atti insieme

Somma due quote e restituisci il totale, esatto.

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. Riempie lo spettacolo?

Rispondi se una quota è esattamente l'intero spettacolo, cioè esattamente uno.

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
