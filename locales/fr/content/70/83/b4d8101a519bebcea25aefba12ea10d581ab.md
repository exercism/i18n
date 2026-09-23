# Indices

## Général 

- Tu auras besoin des [expressions conditionnelles][concept-conditionals] pour ces exercices.

## 1. Comparer des caractères

- On peut comparer des caractères avec des fonctions comme `char-greaterp`, `char-lessp` et `char=`.

## 2. Déterminer la « taille » du caractère

- Common Lisp dispose de deux fonctions pour déterminer si un caractère est en majuscule ou en minuscule : `upper-case-p` et `lower-case-p`.
- Un caractère peut n'être ni en majuscule, ni en minuscule.

## 3. Changer la « taille » du caractère

- Common Lisp dispose de deux fonctions pour modifier la casse d'un caractère : `char-upcase` et `char-downcase`.

## 4. Déterminer le « type » d'un caractère

- Common Lisp dispose d'une fonction de prédicat `alpha-char-p` qui indique si un caractère est alphabétique.
- Common Lisp dispose d'une fonction de prédicat `digit-char-p` qui indique si un caractère est un chiffre.
- Tu peux utiliser `char=` pour savoir si deux caractères sont égaux.
- Le caractère espace s'écrit #\Space en Common Lisp.
- Le caractère de retour à la ligne s'écrit #\Newline en Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
