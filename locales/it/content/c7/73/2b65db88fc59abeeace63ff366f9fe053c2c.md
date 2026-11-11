# Suggerimenti

## Generale

- I concetti precedenti [structs][], [maps][] e [methods][] sono utili qui.


## 1. Tenere traccia dei partecipanti

- Il concetto di [definizione di tipo][type definition] spiega come definire un nuovo tipo.
- Usa `make()` per creare una nuova istanza di `map`.
- Per aggiungere un valore alla map, usa `struct{}{}` per creare un'istanza dello `struct{}` vuoto.

## 2. Verificare i partecipanti

- Se un elemento è presente nella map, l'insieme contiene quel valore.
- L'[assegnazione a due valori][two value assignment] può essere usata per verificare se una map contiene un elemento.

## 3. Confrontare i partecipanti

- Due insiemi sono uguali se tutti i valori di ciascun insieme sono contenuti nell'altro insieme.
- Si può usare `range` per controllare tutti gli elementi dell'insieme.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
