# Appendice alle istruzioni

## Formato della griglia

La griglia è rappresentata come una stringa terminata da null, con un carattere di nuova riga alla fine di ogni riga.

## Registri

| Registro | Uso          | Tipo    | Descrizione                                                               |
| -------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`    | input        | indirizzo | stringa di input terminata da null                                     |
| `$a1`    | input/output | indirizzo | stringa di risultato terminata da null, vuota se le dimensioni della griglia non sono valide |
| `$v0`    | output       | intero  | stato della griglia (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`  | temporaneo   | qualsiasi | per memorizzazione temporanea                                          |
