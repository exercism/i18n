# Introduction

Un programme `jq` qui rencontre un problème pendant le traitement d'une valeur (indexer un nombre avec une _string_, analyser un texte JSON invalide, appeler une fonction avec un argument du mauvais type) lève une **erreur d'exécution**.
Une erreur d'exécution non interceptée amène `jq` à afficher un message sur la _sortie d'erreur standard_ et à se terminer avec le statut `5`.

## Lève des erreurs : `error` et `error(message)`

- `error` lève une erreur dont la valeur est la valeur d'**entrée**.
- `error(message)` lève une erreur dont la valeur est le résultat de `message`.

La valeur d'une erreur peut être **n'importe quelle** valeur JSON, pas seulement une _string_.

```jq
42 | error("invalid value: \(.)")
# => "invalid value: 42"

42 | error
(not a string): 42
```

## Intercepte les erreurs : `try` et `catch`

Les erreurs peuvent être interceptées avec `try EXP catch HANDLER`.
La première expression est exécutée ; si elle lève une erreur, l'expression `HANDLER` est exécutée **avec la valeur de l'erreur comme entrée**.
La sortie de `try catch` est la sortie de celle des deux expressions qui s'est exécutée en dernier (`EXP` ou `HANDLER`).

```jq
{a: 42} | try .a catch "no index a in \(.)"
# => 42

true | try .a catch "cannot index a \(type)"
# => "cannot index a boolean"

true | try error("some exception") catch .
# => "some exception"
```

La forme plus courte `try EXP` est équivalente à `try EXP catch empty` : l'erreur est écartée et aucune sortie n'est produite.

```jq
[{}, true, {"a": 1}] | [.[] | try .a]
# => [null, 1]
```

## Neutralise les erreurs : l'opérateur `?`

L'opérateur `?`, utilisé sous la forme `EXP?`, est un raccourci pour `try EXP`.
Il transforme une expression qui échoue en une expression qui ne produit simplement aucune sortie.

```jq
["1", "invalid", "3", 4] | [.[] | tonumber?]
# => [1, 3, 4]
```

On le voit souvent accolé aux opérateurs d'indexation : `.foo?` et `.[]?`.

## Arrête le programme : `halt_error` et `halt`

`halt_error` arrête le programme, affiche son entrée sur la _sortie d'erreur standard_ sous forme de texte brut, et se termine avec le statut indiqué, `5` par défaut.
Le filtre `halt` associé arrête le programme silencieusement avec le statut de sortie `0`.

```jq
"Error: something went wrong" | halt_error(1)
```
