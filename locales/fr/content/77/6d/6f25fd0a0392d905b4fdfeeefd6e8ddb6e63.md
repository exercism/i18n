# Indices

## Général

- La pile de la calculatrice n'est qu'un tableau Factor. Une *opération* est une _quotation_ `( stack -- new-stack )`.
- `head*` de [`sequences`][sequences] renvoie tout sauf les `n` derniers éléments ; `last2` renvoie les deux derniers.

## 1. Implémente l'addition

- Utilise `bi` de [`kernel`][kernel] pour scinder l'entrée en deux calculs : « le tableau sans ses deux derniers éléments » et « la somme des deux derniers éléments ». Ensuite, `suffix` les assemble.

## 2. Implémente la multiplication

- Même structure qu'à la tâche 1, avec `*` à la place de `+`.

## 3. Applique une seule opération

- L'effet de la _quotation_ est `( stack -- new-stack )`. Déclare-le sur `call` pour que le compilateur puisse vérifier les types : `call( stack -- new-stack )`.

## 4. Évalue un programme

- `each` (dans [`sequences`][sequences]) itère une _quotation_ sur une séquence. Chaque itération voit la pile courante, dépile l'opération suivante du programme et l'applique.

## 5. Évalue par nom

- Cherche chaque nom dans l'_assoc_ avec `at` (dans [`assocs`][assocs]) pour obtenir son opération, puis réutilise `evaluate`.
- Une _quotation_ _fry_ `'[ _ at ]` de [`curry-compose-fry`][fry] capture l'_assoc, ce qui permet à `map` de remplacer chaque nom par son opération en une seule passe.

## 6. Divise en toute sécurité

- `throw` (dans [`kernel`][kernel]) lève une erreur. `zero-divisor-error` est déjà déclaré, donc l'appel est `zero-divisor-error throw`.
- Protège le chemin de la division avec un `if` qui vérifie si le diviseur le plus bas est `0`.

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
