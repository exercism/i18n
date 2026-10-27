# Pistas

## General

- Usa `match` con `[]` y `[card, .. as rest]` para distinguir un mazo vacío de su siguiente carta y de las cartas restantes.

- Las actualizaciones de registro como `{ ..state, pile: new_pile }` te permiten mantener explícitas las transiciones del juego sin estado mutable.

- Un `Set` puede guardar tuplas o listas como claves cuando haces seguimiento de estados del juego ya vistos.
