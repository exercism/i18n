# Anexo de instrucciones

## Formato de la cuadrícula

La cuadrícula se representa como un string terminado en nulo, con un carácter de nueva línea al final de cada fila.

## Registros

| Registro | Uso          | Tipo    | Descripción                                                               |
| -------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`    | entrada      | dirección | string de entrada terminado en nulo                                     |
| `$a1`    | entrada/salida | dirección | string de resultado terminado en nulo, vacío si las dimensiones de la cuadrícula no son válidas |
| `$v0`    | salida       | entero  | estado de la cuadrícula (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`  | temporal     | cualquiera | para almacenamiento temporal                                          |
