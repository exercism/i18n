# Suggerimenti

## Generale

- I [set][sets] sono collezioni mutabili e non ordinate, prive di elementi duplicati.
- I set possono contenere qualsiasi tipo di dato, purché tutti gli elementi siano [hashable][hashable].
- I set sono [iterable][iterable].
- I set si usano più spesso per eliminare rapidamente i duplicati da altre collezioni o per verificare l'appartenenza di un elemento.
- I set supportano anche operazioni matematiche come `union`, `intersection`, `difference` e `symmetric difference`

## 1. Pulisci gli ingredienti dei piatti

- Il costruttore `set()` può accettare come argomento qualsiasi [iterable][iterable]. Le [concept: lists](/tracks/python/concepts/lists) sono iterabili.
- Ricorda: le [concept: tuples](/tracks/python/concepts/tuples) si possono creare usando `(<element_1>, <element_2>)` oppure tramite il costruttore `tuple()`.

## 2. Cocktail e analcolici

- Un `set` è _disgiunto_ da un altro set se i due set non condividono alcun elemento.
- Il costruttore `set()` può accettare come argomento qualsiasi [iterable][iterable]. Le [concept: lists](/tracks/python/concepts/lists) sono iterabili.
- In Python, le [concept: strings](/tracks/python/concepts/strings) si possono concatenare con il segno `+`.

## 3. Classifica i piatti

- Qui potrebbe essere utile usare [concept: loops](/tracks/python/concepts/loops) per iterare tra le categorie di pasti disponibili.
- Se tutti gli elementi di `<set_1>` sono contenuti in `<set_2>`, allora `<set_1> <= <set_2>`.
- Il metodo equivalente di `<=` è `<set>.issubset(<iterable>)`
- Le [concept: tuples](/tracks/python/concepts/tuples) possono contenere qualsiasi tipo di dato, comprese altre tuple. Le tuple si possono creare usando `(<element_1>, <element_2>)` oppure tramite il costruttore `tuple()`.
- Si può accedere agli elementi delle [concept: tuples](/tracks/python/concepts/tuples) da sinistra usando un indice che parte da 0, oppure da destra usando un indice che parte da -1.
- Il costruttore `set()` può accettare come argomento qualsiasi [iterable][iterable]. Le [concept: lists](/tracks/python/concepts/lists) sono iterabili.
- Le [concept: strings](/tracks/python/concepts/strings) si possono concatenare con il segno `+`.

## 4. Etichetta gli allergeni e gli alimenti soggetti a restrizioni

- L'_intersezione_ di due set è l'insieme degli elementi in comune tra `<set_1>` e `<set_2>`.
- Il metodo dei set equivalente di `&` è `<set>.intersection(<iterable>)`
- Si può accedere agli elementi delle [concept: tuples](/tracks/python/concepts/tuples) da sinistra usando un indice che parte da 0, oppure da destra usando un indice che parte da -1.
- Il costruttore `set()` può accettare come argomento qualsiasi [iterable][iterable]. Le [concept: lists](/tracks/python/concepts/lists) sono iterabili.
- Le [concept: tuples](/tracks/python/concepts/tuples) si possono creare usando `(<element_1>, <element_2>)` oppure tramite il costruttore `tuple()`.

## 5. Compila un «elenco principale» di ingredienti

- L'_unione_ di due set è quando `<set_1`> e `<set_2>` vengono combinati in un unico `set`
- Il metodo dei set equivalente di `|` è `<set>.union(<iterable>)`
- Qui potrebbe essere utile usare [concept: loops](/tracks/python/concepts/loops) per iterare tra i vari piatti.

## 6. Estrai gli antipasti da passare sui vassoi

- La _differenza_ tra set è quando gli elementi di `<set_2>` vengono rimossi da `<set_1>`, ad esempio `<set_1> - <set_2>`.
- Il metodo dei set equivalente di `-` è `<set>.difference(<iterable>)`
- Il costruttore `set()` può accettare come argomento qualsiasi [iterable][iterable]. Le [concept: lists](/tracks/python/concepts/lists) sono iterabili.
- Il costruttore della [concept: list](/tracks/python/concepts/lists) può accettare come argomento qualsiasi [iterable][iterable]. I set sono iterabili.

## 7. Trova gli ingredienti usati in una sola ricetta

- La _differenza simmetrica_ tra set è quando gli elementi compaiono in `<set_1>` o in `<set_2>`, ma non in **_entrambi_** i set.
- La _differenza simmetrica_ tra set equivale a sottrarre l'_intersezione_ dei `set` dall'_unione_ dei `set`, ad esempio `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Una _differenza simmetrica_ di più di due `sets` include gli elementi ripetuti più di due volte nei `sets` di input. Per rimuovere questi elementi ripetuti tra set diversi, occorre sottrarre dalla differenza simmetrica le _intersezioni_ tra le coppie di set.
- Qui potrebbe essere utile usare [concept: loops](/tracks/python/concepts/loops) per iterare tra i vari piatti.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets