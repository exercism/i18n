# Apêndice das instruções

## Registradores

| Registrador | Uso       | Tipo    | Descrição                                                     |
| -------- | --------- | ------- | ---------------------------------------------------------- |
| `$a0`    | entrada   | endereço | elementos do array um                                      |
| `$a1`    | entrada   | inteiro | tamanho do array um, em palavras                           |
| `$a2`    | entrada   | endereço | elementos do array dois                                    |
| `$a3`    | entrada   | inteiro | tamanho do array dois, em palavras                         |
| `$v0`    | saída     | inteiro | `0` = igual, `1` = diferente, `2` = sublista, `3` = superlista |
| `$t0-9`  | temporário | qualquer | usado para armazenamento temporário                        |
