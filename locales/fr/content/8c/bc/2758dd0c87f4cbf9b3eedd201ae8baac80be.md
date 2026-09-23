# Indices

## Général

- Lis la documentation officielle sur le [type _string_][string-type-documentation].
- Parcours les [fonctions disponibles pour les _strings_][string-functions] pour découvrir les opérations intégrées qu'elles offrent.

## 1. Récupère la première lettre du nom

- Il existe une [fonction intégrée][string-substr] qui permet de récupérer le premier caractère d'une _string_.
- Il existe plusieurs [fonctions intégrées][string-trim] qui permettent de supprimer les espaces en début, en fin, ou en début et en fin d'une _string_.

## 2. Transforme la première lettre en initiale

- Il existe une [fonction intégrée][string-upcase] qui convertit tous les caractères d'une _string_ en majuscules.
- Il existe un [opérateur][concat-operator] qui concatène deux _strings_.

## 3. Découpe le nom complet en prénom et nom

- Il existe une [fonction intégrée][string-explode] qui découpe une _string_ à partir d'une autre _string_.
- On peut affecter les premiers éléments d'un tableau à des variables grâce au filtrage par motifs sur ce tableau.

## 4. Place les initiales à l'intérieur du cœur

- Il existe une syntaxe spéciale pour [développer des variables][string-variables] à l'intérieur d'une _string_.
- Il existe une syntaxe spéciale pour écrire des [_strings_ multilignes][heredoc-syntax] sans avoir à échapper les retours à la ligne.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
