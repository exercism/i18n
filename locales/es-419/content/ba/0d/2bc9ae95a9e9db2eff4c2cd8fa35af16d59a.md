# Pistas

## General

- El tipo es `LIST{STR}` en todo el ejercicio: una lista de strings. Escríbelo completo siempre que un cuaderno entre o salga.

## 1. Abrir un caso

- `#LIST{STR}` crea una lista vacía. La rutina no recibe argumentos y devuelve `LIST{STR}`.

## 2. Anotar una pista

- `append` es la rutina y no devuelve nada, así que esta rutina tampoco tiene tipo de retorno: `add_clue(notes : LIST{STR}, clue : STR) is`.
- No asignes el resultado de `append` a nada. A diferencia de `FMAP::insert`, no hay resultado.

## 3. ¿Cuántas pistas?

- `.size`.

## 4. Descartar una

- `remove_index` recibe la posición. Tampoco tiene tipo de retorno.

## 5. Releer el caso

- Un bucle sobre `notes.elt!` y un `FSTR`, como en `rehearsal-script`.
- El `"; "` va antes de cada pista excepto la primera, y eso es lo que hace que un cuaderno vacío dé como resultado el string vacío sin ningún tratamiento especial.
