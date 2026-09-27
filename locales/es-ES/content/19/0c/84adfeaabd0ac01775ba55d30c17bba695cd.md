# Anexo de instrucciones

## Registros

| Registro | Uso       | Tipo    | Descripción                                                    |
| -------- | --------- | ------- | -------------------------------------------------------------- |
| `$a0`    | entrada   | dirección | elementos del primer array                                   |
| `$a1`    | entrada   | entero  | tamaño del primer array, en palabras                           |
| `$a2`    | entrada   | dirección | elementos del segundo array                                  |
| `$a3`    | entrada   | entero  | tamaño del segundo array, en palabras                          |
| `$v0`    | salida    | entero  | `0` = iguales, `1` = distintas, `2` = sublista, `3` = superlista |
| `$t0-9`  | temporal  | cualquiera | se usa para almacenamiento temporal                          |
