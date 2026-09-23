# Complément aux instructions

## Format des entrées

Chaque domino est stocké sur deux octets consécutifs en mémoire linéaire, un octet par moitié.

Par exemple, les dominos `[2|1]`, `[2|3]` et `[1|3]` sont représentés par le tableau d'octets `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]`

## Mémoire réservée

Le tampon des dominos d'entrée utilise les octets 256 à 511 de la mémoire linéaire.
