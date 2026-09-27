# Appendice alle istruzioni

## Formato dell'input

Ogni tessera del domino è memorizzata come due byte consecutivi in memoria lineare, un byte per ogni metà.

Ad esempio, le tessere `[2|1]`, `[2|3]` e `[1|3]` sono rappresentate come l'array di byte `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]`

## Memoria riservata

Il buffer per le tessere del domino di input utilizza i byte 256-511 della memoria lineare.
