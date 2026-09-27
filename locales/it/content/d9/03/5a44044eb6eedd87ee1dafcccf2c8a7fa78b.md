# Istruzioni

La tua associazione di quartiere ti chiede di gestire le registrazioni degli appezzamenti del giardino. Lo stato è contenuto in due variabili dinamiche:

- `registrations`: un array di tuple `plot` attualmente assegnate a una persona.
- `next-id`: l'intero da usare per la prossima registrazione.

La tupla `plot` ha due campi:

| campo           | tipo     |
| --------------- | -------- |
| `id`            | intero   |
| `registered-to` | stringa  |

## 1. Apri il giardino ed elenca le sue registrazioni

Definisci `open-garden` per inizializzare le variabili dinamiche: un array vuoto per `registrations` e `1` per `next-id`. Poi definisci `list-registrations` per restituire l'array attuale degli appezzamenti.

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. Registra un appezzamento

Definisci `register` per prendere un nome dallo stack, costruire un nuovo appezzamento con il prossimo id disponibile, aggiungerlo in coda all'array `registrations`, incrementare `next-id` di uno e restituire il nuovo appezzamento.

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

Gli id degli appezzamenti devono essere univoci e sempre crescenti, anche dopo un rilascio: `next-id` non deve mai riutilizzare un valore.

## 3. Rilascia un appezzamento

Definisci `release` per prendere un id e rimuovere da `registrations` la voce corrispondente. Rilasciare un id sconosciuto non ha alcun effetto.

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. Ottieni un appezzamento registrato

Definisci `get-registration` per prendere un id e restituire l'appezzamento corrispondente, oppure il simbolo `not-found` se nessun appezzamento ha quell'id.

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. Trova gli appezzamenti per nome

Definisci `find-by-name` per prendere un nome e restituire un array di tutti gli appezzamenti attualmente registrati a quella persona.

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
