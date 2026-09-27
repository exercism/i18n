# Appendice alle istruzioni

## Registri

| Registro | Utilizzo  | Tipo    | Descrizione                                                |
| -------- | --------- | ------- | ---------------------------------------------------------- |
| `$a0`    | input     | indirizzo | elementi del primo array                                 |
| `$a1`    | input     | intero  | dimensione del primo array, in word                        |
| `$a2`    | input     | indirizzo | elementi del secondo array                               |
| `$a3`    | input     | intero  | dimensione del secondo array, in word                      |
| `$v0`    | output    | intero  | `0` = equal, `1` = unequal, `2` = sublist, `3` = superlist |
| `$t0-9`  | temporaneo | qualsiasi | usati per l'archiviazione temporanea                      |
