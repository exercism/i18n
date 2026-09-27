# Pistas

## General

- Necesitarás [expresiones condicionales][concept-conditionals] para estos ejercicios.

## 1. Comparar caracteres

- Los caracteres se pueden comparar con funciones como `char-greaterp`, `char-lessp` y `char=`.

## 2. Determinar el «tamaño» del carácter

- Common Lisp tiene dos funciones para determinar si un carácter es mayúscula o minúscula: `upper-case-p` y `lower-case-p`.
- Un carácter puede no ser ni mayúscula ni minúscula.

## 3. Cambiar el «tamaño» del carácter

- Common Lisp tiene dos funciones para cambiar si un carácter es mayúscula o minúscula: `char-upcase` y `char-downcase`.

## 4. Determinar el «tipo» del carácter

- Common Lisp tiene una función de predicado `alpha-char-p` para indicar si un carácter es un carácter alfabético.
- Common Lisp tiene una función de predicado `digit-char-p` para indicar si un carácter es un carácter numérico.
- Puedes usar `char=` para indicar si dos caracteres son iguales.
- El carácter de espacio se escribe #\Space en Common Lisp.
- El carácter de salto de línea se escribe #\Newline en Common Lisp.

[concept-conditionals]: /tracks/common-lisp/concepts/conditionals
