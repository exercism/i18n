# Pistas

## General

- El tipo es `LIST{STR}` en todo momento, un array de strings. Escríbelo
  completo siempre que entre o salga una libreta.

## 1. Abrir un caso

- `#LIST{STR}` crea una vacía. La rutina no toma argumentos y
  devuelve `LIST{STR}`.

## 2. Anotar una pista

- `append` es la rutina y no devuelve nada, así que esta rutina tampoco
  tiene tipo devuelto: `add_clue(notes : LIST{STR}, clue : STR) is`.
- No asignes el resultado de `append` a ningún sitio. A diferencia de
  `FMAP::insert`, no hay resultado.

## 3. ¿Cuántas pistas hay?

- `.size`.

## 4. Descartar una

- `remove_index` toma la posición. Otra vez, sin tipo devuelto.

## 5. Releer el caso

- Un bucle sobre `notes.elt!` y un `FSTR`, como en `rehearsal-script`.
- El `"; "` va delante de cada pista menos la primera, que es lo que hace que
  una libreta vacía salga como el string vacío sin ningún tratamiento especial.
