# Pistas

## General

- La pila de la calculadora es solo un array de Factor. Una *operación* es una quotation `( stack -- new-stack )`.
- `head*` de [`sequences`][sequences] devuelve todo excepto los últimos `n` elementos; `last2` devuelve los dos últimos.

## 1. Implementa la suma

- Usa `bi` de [`kernel`][kernel] para bifurcar el argumento en dos cálculos: «el array menos sus dos últimos elementos» y «la suma de los dos últimos elementos». Luego `suffix` los une.

## 2. Implementa la multiplicación

- La misma forma que en la tarea 1, pero con `*` en lugar de `+`.

## 3. Aplica una sola operación

- El efecto de la quotation es `( stack -- new-stack )`. Decláralo en `call` para que el compilador pueda verificar los tipos: `call( stack -- new-stack )`.

## 4. Evalúa un programa

- `each` (en [`sequences`][sequences]) itera una quotation sobre una secuencia. Cada iteración ve la pila actual, extrae la siguiente operación del programa y la aplica.

## 5. Evalúa por nombre

- Busca cada nombre en el assoc con `at` (en [`assocs`][assocs]) para obtener su operación y luego reutiliza `evaluate`.
- Una quotation de fry `'[ _ at ]` de [`curry-compose-fry`][fry] captura el assoc para que `map` pueda sustituir cada nombre por su operación en una sola pasada.

## 6. Divide de forma segura

- `throw` (en [`kernel`][kernel]) lanza un error. `zero-divisor-error` ya está declarado, así que `zero-divisor-error throw` es la llamada.
- Protege la ruta de la división con un `if` que verifique si el divisor que está más abajo es `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
