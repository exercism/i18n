# Robot de fiesta excéntrico

## Historia

Había una vez un programador excéntrico que vivía en una casa extraña con ventanas enrejadas.
Un día aceptó un trabajo de un portal de empleo en línea para construir un robot de fiesta. Se
supone que el robot saluda a la gente y les ayuda a llegar a sus asientos. La primera
incorporación era muy técnica y mostraba la falta de interacción humana del programador. Algunas
de las cuales también llegaron a la edición final.

## Tareas

- Saluda a cada persona con:

```
Welcome to my party, <name>!
```

- A un invitado cuyo cumpleaños es hoy se le saluda de la siguiente manera para presumir del conocimiento que el robot tiene de cada invitado:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- A quien pregunta por su asiento se le dan indicaciones para llegar a su mesa con:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Implementaciones

- [Go: strings][implementation-go] (implementación de referencia)

## Referencia

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
