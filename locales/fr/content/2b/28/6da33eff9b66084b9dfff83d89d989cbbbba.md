# Indices

## 1. Remplace les espaces rencontrés par des tirets bas

- [Ce tutoriel][chars-tutorial] est utile.
- La [documentation de référence][chars-docs] sur les `char` se trouve ici.
- On peut récupérer les `char` d'une _string_ de la même manière que les éléments d'un tableau.
- Tu devrais utiliser un [`StringBuilder`][string-builder] pour construire la _string_ de sortie.
- Voir [cette méthode][iswhitespace] pour détecter les espaces. N'oublie pas qu'il s'agit d'une méthode statique.
- Les littéraux `char` s'écrivent entre apostrophes.

## 2. Remplace les caractères de contrôle par la _string_ « CTRL » en majuscules

- Voir [cette méthode][iscontrol] pour vérifier si un caractère est un caractère de contrôle.

## 3. Convertis `kebab-case` en `camelCase`

- Voir [cette méthode][toupper] pour convertir un caractère en majuscule.

## 4. Omets les lettres grecques minuscules

- Les `char` prennent en charge les opérateurs d'égalité et de comparaison par défaut.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
