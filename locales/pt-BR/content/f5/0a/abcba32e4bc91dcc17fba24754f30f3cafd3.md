# Anexo às instruções

## Formato da grade

A grade é representada como uma string terminada em null, com um caractere de nova linha no final de cada linha.

## Registradores

| Registrador | Uso          | Tipo    | Descrição                                                                 |
| ----------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`       | entrada      | endereço | string de entrada terminada em null                                      |
| `$a1`       | entrada/saída | endereço | string de resultado terminada em null, vazia se as dimensões da grade forem inválidas |
| `$v0`       | saída        | inteiro | status da grade (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`     | temporário   | qualquer | para armazenamento temporário                                            |
