# Istruzioni

Sei il direttore di un ristorante elegante con una cantina ben fornita. Molti dei tuoi clienti sono appassionati di vino esigenti. Trovare la bottiglia giusta per un cliente in particolare non è un compito facile.

Da proprietario di ristorante esperto di tecnologia, hai deciso di velocizzare il processo di selezione del vino scrivendo un'app che permetta agli ospiti di filtrare i tuoi vini in base alle loro preferenze.

## 1. Ottenere tutti i vini di un dato colore

Una bottiglia di vino è rappresentata con un tipo personalizzato e i vini sono memorizzati in un array.

```gleam
[
  Wine("Chardonnay", 2015, "Italy", White),
  Wine("Pinot grigio", 2017, "Germany", White),
  Wine("Pinot noir", 2016, "France", Red),
  Wine("Dornfelder", 2018, "Germany", Rose)
]
```

Implementa la funzione `wines_of_color`. Dovrebbe prendere un array di vini e restituire tutti i vini di un dato colore.

```gleam
wines_of_color(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
//   Wine("Pinot grigio", 2017, "Germany", White),
// ]
```

## 2. Ottenere tutte le bottiglie di vino di un dato paese

Implementa la funzione `wines_from_country`. Dovrebbe prendere un array di vini e restituire tutti i vini provenienti da un dato paese.

```gleam
wines_from_country(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  country: "Germany"
)
// -> [
//   Wine("Dornfelder", 2018, "Germany", Rose)
// ]
```

## 3. Ottenere tutti i vini di un dato colore imbottigliati in un dato paese

Implementa la funzione `filter`. Dovrebbe prendere un array di vini, un colore e un paese e restituire tutti i vini del colore dato imbottigliati nel paese dato.

```gleam
filter(
  [
    Wine("Chardonnay", 2015, "Italy", White),
    Wine("Pinot grigio", 2017, "Germany", White),
    Wine("Pinot noir", 2016, "France", Red),
    Wine("Dornfelder", 2018, "Germany", Rose)
  ],
  color: White
  country: "Italy"
)
// -> [
//   Wine("Chardonnay", 2015, "Italy", White),
// ]
```
