# Pistas

Recuerda, las tortugas son animales de sangre fría, así que asegúrate de que estén calientes antes de darles una colcha o un suéter.

## 1. ¡Ordena la cantidad!

- La permutación de ordenamiento que devuelvas debe estar en orden descendente.
- Asegúrate de ordenar las cantidades en orden descendente en el mismo lugar.
- `sortperm` puede recibir argumentos similares a `sort`.
- ¡El orden en que realizas las dos operaciones anteriores es muy importante!

## 2. ¡Ordena los clientes!

- Debe devolverse un nuevo array con los clientes ordenados (es decir, no ordenes en el mismo lugar).
- Recuerda que una permutación de ordenamiento (es decir, un array de índices) se puede usar como índices.

## 3. ¡Programa de producción!

- Puedes usar tus funciones `sortquantity!()` y `sortcustomer()` aquí.
- Recuerda que una permutación de ordenamiento es solo una permutación de los índices.
- Para una [permutación de ordenamiento inversa][invperm]:
    - Piensa en cuál es el orden original de los índices para un `Vector` arbitrario.
    - ¿Qué se puede hacer con *cualquier* permutación de índices para devolverla a este punto de partida?
    - Pista final... ¿Qué hace la permutación de ordenamiento de una permutación de ordenamiento?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
