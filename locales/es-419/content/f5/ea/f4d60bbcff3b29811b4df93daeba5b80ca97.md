# Anexo de instrucciones

## Formato de entrada

Cada ficha de dominó se almacena como dos bytes consecutivos en la memoria lineal, un byte por cada mitad.

Por ejemplo, las fichas `[2|1]`, `[2|3]` y `[1|3]` se representan como el array de bytes `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]`

## Memoria reservada

El búfer para las fichas de dominó de entrada usa los bytes 256-511 de la memoria lineal.
