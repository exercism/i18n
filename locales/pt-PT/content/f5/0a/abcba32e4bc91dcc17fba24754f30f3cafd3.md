# Apêndice às instruções

## Formato da grelha

A grelha é representada por uma string terminada em nulo, com um caráter de nova linha no fim de cada uma das suas linhas.

## Registos

| Registo | Utilização   | Tipo    | Descrição                                                                 |
| ------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`   | entrada      | endereço | string de entrada terminada em nulo                                      |
| `$a1`   | entrada/saída | endereço | string de resultado terminada em nulo, vazia se as dimensões da grelha forem inválidas |
| `$v0`   | saída        | inteiro | estado da grelha (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9` | temporário   | qualquer | para armazenamento temporário                                            |
