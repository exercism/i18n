# Indices

## 1. Définis des types personnalisés

Les types abstraits et l'héritage de types ont été abordés dans le concept [Types composites][composite].

## 2. Obtiens le nom de l'animal.

- C'est trivial pour Dog et Cat, mais utile pour les tests des méthodes de repli.

## 3. Définis ce qui se passe quand les chats et les chiens se rencontrent.

- Combien y a-t-il de combinaisons de rencontres chat/chien ?
- Rappelle-toi qu'un chat qui rencontre un chien ne réagit pas de la même façon qu'un chien qui rencontre un chat.
- On a besoin de la réponse du premier argument : `a` dans `meet(a, b)`.

## 4. Définis une rencontre entre deux entités.

- La valeur de retour est une _string_ plus longue que pour `meet()`.
- N'utilise qu'une seule méthode pour `encounter()`.
- L'[interpolation de chaînes de caractères][interpolation] t'aidera beaucoup quand tu assembles une valeur de retour.

## 5. Définis une réaction de repli pour les rencontres entre animaux.

- Le deuxième argument est désormais un `Pet` autre que `Cat` ou `Dog`, il faut donc ajouter une méthode `meet`.
- Il y a deux façons d'y parvenir : déclarer des types de paramètres abstraits, ou les contraindre via des méthodes paramétriques.

## 6. Définis un repli si un animal rencontre quelque chose qu'il ne connaît pas.

- Le deuxième argument peut désormais être n'importe quoi.

## 7. Définis un repli générique.

- Les deux arguments peuvent désormais être n'importe quoi.
- À la fin de l'exercice, tu auras 7 méthodes pour `meet`.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
