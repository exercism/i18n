# Utasításkiegészítés

## Bemeneti formátum

Minden dominó két egymást követő bájtként tárolódik a lineáris memóriában, mindegyik félhez egy-egy bájt.

Például a `[2|1]`, `[2|3]` és `[1|3]` kövek a `[ 0x02, 0x01, 0x02, 0x03, 0x01, 0x03 ]` bájttömbként jelennek meg.

## Fenntartott memória

A bemeneti dominók puffere a lineáris memória 256-511. bájtjait használja.
