# Pistas

## General

- La pila de la calculadora no es más que un array de Factor. Una *operación* es una quotation `( stack -- new-stack )`.
- `head*` de [`sequences`][sequences] devuelve todo excepto los últimos `n` elementos; `last2` devuelve los dos últimos.

## 1. Implementar la suma

- Usa `bi` de [`kernel`][kernel] para bifurcar la entrada en dos cálculos: «el array menos sus dos últimos elementos» y «la suma de los dos últimos elementos». Después, `suffix` los une.

## 2. Implementar la multiplicación

- La misma forma que en la tarea 1, pero con `*` en lugar de `+`.

## 3. Aplicar una sola operación

- El efecto de la quotation es `( stack -- new-stack )`. Declara eso en `call` para que el compilador pueda comprobar los tipos: `call( stack -- new-stack )`.

## 4. Evaluar un programa

- `each` (en [`sequences`][sequences]) itera una quotation sobre una secuencia. Cada iteración ve la pila actual, saca la siguiente operación del programa y la aplica.

## 5. Evaluar por nombre

- Busca cada nombre en el assoc con `at` (en [`assocs`][assocs]) para obtener su operación y, después, reutiliza `evaluate`.
- Una quotation fry `'[ _ at ]` de [`curry-compose-fry`][fry] cierra sobre el assoc, de modo que `map` puede intercambiar cada nombre por su operación en una sola pasada.

## 6. Dividir con seguridad

- `throw` (en [`kernel`][kernel]) lanza un error. `zero-divisor-error` ya está declarado, así que la llamada es `zero-divisor-error throw`.
- Protege la ruta de división con un `if` que compruebe si el divisor más bajo es `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
