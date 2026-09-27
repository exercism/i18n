# Pistas

## General

- Los caracteres en Factor son números enteros (puntos de código Unicode), así que los operadores numéricos `<`, `>`, `=` funcionan directamente.
- Los predicados y la conversión de mayúsculas y minúsculas están en [`unicode`][unicode].
- Los símbolos que devuelves (`less`, `big`, `alpha`, ...) hay que declararlos antes de usarlos; agrúpalos con `SYMBOLS: ... ;`.

## 1. Compara dos caracteres

- Usa `<` y `>` de [`math`][math].
- Engloba los tres casos con `cond` de [`combinators`][combinators].

## 2. Determina si es mayúscula o minúscula

- `LETTER?` es el predicado de mayúsculas y `letter?` el de minúsculas.

## 3. Cambia entre mayúscula y minúscula

- `ch>upper` y `ch>lower` son los conversores por carácter (también existen `>upper`/`>lower` a nivel de string, pero aquí tienes un solo carácter).

## 4. Determina el tipo

- El orden importa en tu `cond`. `Letter?` coincide con mayúscula *o* minúscula, así que debería ejecutarse antes de cualquier comprobación específica de mayúsculas o minúsculas.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
