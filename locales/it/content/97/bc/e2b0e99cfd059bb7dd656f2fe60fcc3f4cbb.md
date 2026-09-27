# Suggerimenti

## 1. Definisci l'approvazione

- [Definisci il tipo di dato algebrico][ADT] `Approval` con i costruttori per le opzioni richieste.

## 2. Definisci la cucina

- [Definisci il tipo di dato algebrico][ADT] `Cuisine` con i costruttori per le opzioni richieste.

## 3. Definisci i generi cinematografici

- [Definisci il tipo di dato algebrico][ADT] `Genre` con i costruttori per le opzioni richieste.

## 4. Definisci l'attività

- [Definisci un tipo di dato algebrico con dati associati][ADT-with-data] per incapsulare le diverse attività.

## 5. Valuta l'attività

- Il modo migliore per eseguire la logica in base al valore dell'attività è usare le [espressioni case][case-expression].
- Il pattern matching su un caso di un tipo di dato algebrico dà accesso ai suoi dati associati.
- Per aggiungere una condizione aggiuntiva a un pattern, puoi usare una [guardia][guards] all'interno di un case.
- Se vuoi intercettare tutti gli altri valori possibili in un unico caso, puoi usare il pattern jolly `_`.

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
