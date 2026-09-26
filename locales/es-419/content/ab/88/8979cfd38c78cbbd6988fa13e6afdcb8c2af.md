# Pistas

## General

- Cada uno de estos elige una de tres respuestas, así que cada uno es un `if` con un `elsif` y un `else`.
- Haz primero la pregunta más exigente. Si preguntas `score >= 5` antes que `score >= 8`, la segunda nunca se alcanza.

## 1. El veredicto

- Son tres franjas, así que necesitas dos preguntas: ocho o más, luego cinco o más, y después todo lo que quede.

## 2. ¿A qué grupo pertenece?

- Ir de abajo hacia arriba es lo más fácil: primero menos de 13, luego menos de 16, y después el resto.
- «De 13 a 15» y «menos de 16» describen a los mismos artistas, y la segunda es una sola comparación en lugar de dos.

## 3. Cuándo volver

- `=` compara dos cadenas: `if group = "Juniors" then`.
- Escribe los nombres de los grupos exactamente como los devuelve la tarea 2, con mayúscula inicial y todo.

## 4. Qué escribir en la hoja

- El primer caso necesita dos cosas a la vez, así que únelas con `and`: `if score >= 8 and sings then`.
- Al segundo caso solo se llega cuando el primero ya falló, así que no necesita volver a preguntar si canta.
