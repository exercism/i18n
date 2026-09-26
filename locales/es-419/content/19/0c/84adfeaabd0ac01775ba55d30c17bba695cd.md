# Anexo de las instrucciones

## Registros

| Registro | Uso       | Tipo    | Descripción                                                       |
| -------- | --------- | ------- | ----------------------------------------------------------------- |
| `$a0`    | entrada   | dirección | elementos del array uno                                         |
| `$a1`    | entrada   | entero  | tamaño del array uno, en palabras                                  |
| `$a2`    | entrada   | dirección | elementos del array dos                                         |
| `$a3`    | entrada   | entero  | tamaño del array dos, en palabras                                  |
| `$v0`    | salida    | entero  | `0` = igual, `1` = distinto, `2` = sublista, `3` = superlista      |
| `$t0-9`  | temporal  | cualquiera | se usa para almacenamiento temporal                             |
