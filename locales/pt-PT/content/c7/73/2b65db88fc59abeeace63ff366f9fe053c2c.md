# Dicas

## Geral

- Os conceitos anteriores de [structs][], [maps][] e [methods][] são úteis aqui.


## 1. Acompanhar os participantes

- O conceito [type definition][] explica como definir um novo tipo.
- Usa `make()` para criar uma nova instância de `map`.
- Para adicionar um valor ao map, usa `struct{}{}` para criar uma instância do `struct{}` vazio.

## 2. Verificar os participantes

- Se um elemento está no map, o conjunto contém esse valor.
- A [two value assignment][] pode ser usada para verificar se um map contém um item.

## 3. Comparar os participantes

- Dois conjuntos são iguais se todos os valores de cada conjunto estiverem contidos no outro conjunto.
- `range` pode ser usado para verificar todos os elementos do conjunto.

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
