# Astuces

## Général

- Utilise `match` avec `[]` et `[card, .. as rest]` pour distinguer un paquet vide de sa carte suivante et des cartes restantes.

- Les mises à jour de _record_, comme `{ ..state, pile: new_pile }`, permettent de garder des transitions de jeu explicites sans recourir à un état mutable.

- Un `Set` peut stocker des tuples ou des listes comme clés pour suivre les états de jeu déjà rencontrés.
