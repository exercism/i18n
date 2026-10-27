# Pistas

## General

- Usa `match` con `[]` y `[card, .. as rest]` para distinguir una baraja vacía de su siguiente carta y de las cartas restantes.

- Las actualizaciones de registros como `{ ..state, pile: new_pile }` permiten mantener explícitas las transiciones del juego sin necesidad de estado mutable.

- Un `Set` puede almacenar tuplas o listas como claves cuando haces un seguimiento de estados del juego ya vistos.
