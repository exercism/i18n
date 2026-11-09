# Pistas

Recuerda que las tortugas son animales de sangre fría, así que asegúrate de que estén calientes antes de darles un edredón o un jersey.

## 1. ¡Ordena la cantidad!

- La permutación de ordenación que devuelvas debe estar en orden descendente.
- Asegúrate de ordenar las cantidades en orden descendente in situ.
- `sortperm` puede aceptar argumentos similares a `sort`.
- ¡El orden en que realizas las dos operaciones anteriores es muy importante!

## 2. Ordena por cliente

- Debe devolverse un array nuevo con los clientes ordenados (es decir, no lo ordenes in situ).
- Recuerda que una permutación de ordenación (es decir, un array de índices) se puede usar como índices.

## 3. ¡Plan de producción!

- Aquí puedes usar tus funciones `sortquantity!()` y `sortcustomer()`.
- Recuerda que una permutación de ordenación no es más que una permutación de los índices.
- Para una [permutación de ordenación inversa][invperm]:
    - Piensa en cuál es el orden original de los índices para un `Vector` arbitrario.
    - ¿Qué se le puede hacer a *cualquier* permutación de índices para devolverla a este punto de partida?
    - Última pista... ¿Qué hace la permutación de ordenación de una permutación de ordenación?
 
[invperm]: https://docs.julialang.org/en/v1/base/arrays/#Base.invperm
