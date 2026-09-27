# Pistas

## General

- Cada uno de estos elige una de tres respuestas, así que cada uno es un `if` con un
  `elsif` y un `else`.
- Haz primero la pregunta más exigente. Si preguntas por `score >= 5` antes que por
  `score >= 8`, nunca llegarás a la segunda.

## 1. El veredicto

- Tres franjas, así que dos preguntas: ocho o más, luego cinco o más y después todo lo
  que queda.

## 2. ¿A qué grupo?

- Es más fácil empezar por abajo e ir subiendo: primero menos de 13, luego menos de 16
  y después el resto.
- «De 13 a 15» y «menos de 16» describen a los mismos participantes, y la segunda es
  una sola comparación en lugar de dos.

## 3. Cuándo volver

- `=` compara dos strings: `if group = "Juniors" then`.
- Escribe los nombres de los grupos exactamente como los devuelve la tarea 2, con la
  mayúscula incluida.

## 4. Qué escribir en la hoja

- El primer caso necesita dos cosas a la vez, así que únelas con `and`:
  `if score >= 8 and sings then`.
- Al segundo caso solo se llega cuando el primero ya ha fallado, así que no hace falta
  volver a preguntar por si canta.
