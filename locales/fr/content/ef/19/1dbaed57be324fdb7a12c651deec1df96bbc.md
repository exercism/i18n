# Introduction

## Les expressions régulières

Les expressions régulières (_regex_) sont un outil puissant pour travailler avec des _strings_ en Elixir. Les expressions régulières en Elixir suivent la spécification **PCRE** (**P**erl **C**ompatible **R**egular **E**xpressions). Les motifs de _string_ qui représentent la signification de l'expression régulière sont d'abord compilés, puis utilisés pour rechercher une correspondance sur tout ou partie d'une _string_.

En Elixir, la méthode la plus courante pour créer des expressions régulières consiste à utiliser le sigil `~r`. Les sigils offrent des raccourcis de _sucre syntaxique_ pour les tâches courantes en Elixir. Pour faire correspondre un _littéral de chaîne de caractères_, on peut utiliser la _string_ elle-même comme motif à la suite du sigil.

```elixir
~r/test/
```

L'opérateur `=~/2` est utile pour effectuer une correspondance d'expression régulière sur une _string_ et renvoyer un résultat `boolean`.

```elixir
"this is a test" =~ ~r/test/
# => true
```

Deux remarques sur l'utilisation des sigils :

- de nombreux délimiteurs différents peuvent être utilisés selon tes besoins, plutôt que `/`
- les motifs de _string_ sont déjà échappés ; lorsque tu écris le motif sous forme de _string_ sans passer par une expression régulière, tu devras échapper les barres obliques inverses (`\`)

### Les classes de caractères

Faire correspondre une plage de caractères à l'aide de crochets `[]` définit une _classe de caractères_. Elle permet de faire correspondre n'importe quel caractère parmi ceux de la classe. Tu peux aussi indiquer une plage de caractères comme `a-z`, tant que le début et la fin représentent une plage contiguë de points de code.

```elixir
regex = ~r/[a-z][ADKZ][0-9][!?]/
"jZ5!" =~ regex
# => true
"jB5?" =~ regex
# => false
```

Les _classes de caractères abrégées_ rendent le motif plus concis. Par exemple :

- `\d` est l'abréviation de `[0-9]` (n'importe quel chiffre)
- `\w` est l'abréviation de `[A-Za-z0-9_]` (n'importe quel caractère de « mot »)
- `\s` est l'abréviation de `[ \t\r\n\f]` (n'importe quel caractère d'espacement)

Lorsqu'une _classe de caractères abrégée_ est utilisée en dehors d'un sigil, elle doit être échappée : `"\\d"`

### L'alternance

L'_alternance_ utilise `|` comme caractère spécial pour indiquer la correspondance avec l'un _ou_ l'autre.

```elixir
regex = ~r/cat|bat/
"bat" =~ regex
# => true
"cat" =~ regex
# => true
```

### Les quantificateurs

Les _quantificateurs_ permettent de répéter un motif dans l'expression régulière. Ils s'appliquent au groupe qui précède le quantificateur.

- `{N, M}` où `N` est le nombre minimum de répétitions et `M` le maximum
- `{N,}` correspond à `N` répétitions ou plus
  - `{0,}` peut aussi s'écrire `*` : correspond à zéro répétition ou plus
  - `{1,}` peut aussi s'écrire `+` : correspond à une répétition ou plus
- `{,N}` correspond à `N` répétitions au maximum

### Les groupes

Les parenthèses `()` servent à désigner les _groupes_ et les _captures_. Dans certains cas, le groupe peut aussi être _capturé_ pour être renvoyé et utilisé. En Elixir, ils peuvent être nommés ou anonymes. Une capture est nommée en ajoutant `?<name>` après la parenthèse ouvrante. Les groupes fonctionnent comme une seule unité, par exemple lorsqu'ils sont suivis de _quantificateurs_.

```elixir
regex = ~r/(h)at/
Regex.replace(regex, "hat", "\\1op")
# => "hop"

regex = ~r/(?<letter_b>b)/
Regex.scan(regex, "blueberry", capture: :all_names)
# => [["b"], ["b"]]
```

### Les ancres

Les _ancres_ servent à fixer l'expression régulière au début ou à la fin de la _string_ à faire correspondre :

- `^` ancre au début de la _string_
- `$` ancre à la fin de la _string_

### L'interpolation

Comme `~r` est un raccourci pour `"pattern" |> Regex.escape() |> Regex.compile!()`, tu peux aussi utiliser l'interpolation de _string_ pour construire dynamiquement un motif d'expression régulière :

```elixir
anchor = "$"
regex = ~r/end of the line#{anchor}/
"end of the line?" =~ regex
# => false
"end of the line" =~ regex
# => true
```
