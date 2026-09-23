# Indices

## 1. Détermine si tu auras besoin d'un permis de conduire

- Utilise l'[opérateur d'égalité stricte][mdn-equality-operators] pour vérifier si ton entrée est égale à une certaine *string*.
- Utilise l'un des deux [opérateurs logiques][mdn-logical-operators] que tu as appris dans le concept booléen pour combiner les deux conditions.
- Tu n'as **pas** besoin d'une instruction `if` pour résoudre cette tâche. Tu peux renvoyer directement l'expression booléenne que tu construis.

## 2. Choisis entre deux véhicules potentiels à acheter

- Utilise un [opérateur relationnel][mdn-relational-operators] pour déterminer quelle option vient en premier dans l'ordre du dictionnaire.
- Ensuite, affecte une valeur à une variable auxiliaire en fonction du résultat de cette comparaison, à l'aide d'une [instruction `if-else`][mdn-if-statement].
- Enfin, construis la phrase de recommandation. Pour cela, tu peux utiliser l'[opérateur d'addition][mdn-addition] pour concaténer les deux *strings*.

## 3. Calcule une estimation du prix d'un véhicule d'occasion

- Commence par déterminer le pourcentage en fonction de l'âge du véhicule. Enregistre-le dans une variable auxiliaire. Utilise une [instruction `if-else if-else`][mdn-if-statement] comme indiqué dans les instructions.
- Dans les deux conditions `if`, utilise des [opérateurs relationnels][mdn-relational-operators] pour comparer l'âge de la voiture aux valeurs seuils.
- Pour calculer le résultat, applique le pourcentage au prix d'origine. Par exemple, on peut calculer `30% of x` en divisant `30` par `100` puis en multipliant par `x`.

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
