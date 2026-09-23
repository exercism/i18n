# Indices

## Général

- En Factor, les caractères sont des entiers (des points de code Unicode), donc les comparaisons numériques `<`, `>`, `=` fonctionnent directement.
- Les prédicats et la conversion de casse se trouvent dans [`unicode`][unicode].
- Les symboles que tu renvoies (`less`, `big`, `alpha`, ...) doivent être déclarés avant utilisation ; regroupe-les avec `SYMBOLS: ... ;`.

## 1. Compare deux caractères

- Utilise `<` et `>` de [`math`][math].
- Encadre les trois cas avec `cond` de [`combinators`][combinators].

## 2. Détermine la taille

- `LETTER?` est le prédicat des majuscules, `letter?` celui des minuscules.

## 3. Change la taille

- `ch>upper` et `ch>lower` sont les convertisseurs caractère par caractère (il existe aussi `>upper`/`>lower` au niveau des chaînes, mais ici tu as un seul caractère).

## 4. Détermine le type

- L'ordre compte dans ton `cond`. `Letter?` correspond aux majuscules *ou* aux minuscules, il doit donc s'exécuter avant tout test spécifique à une casse.

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
