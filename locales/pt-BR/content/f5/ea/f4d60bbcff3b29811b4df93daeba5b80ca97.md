# Apêndice de instruções

## Formato da entrada

Cada dominó é armazenado como dois bytes consecutivos na memória linear, um byte para cada metade.

Por exemplo, as peças `[2|1]`, `[2|3]` e `[1|3]` são representadas como o array de bytes `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]`

## Memória reservada

O buffer para os dominós de entrada usa os bytes 256-511 da memória linear.
