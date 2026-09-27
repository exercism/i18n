# Pistas

## 1. Identifica qué aplicación emitió un registro

- Puedes usar la palabra clave `range` para iterar sobre las runas de un string.
- Las runas se pueden comparar con otras runas usando un condicional `if`.
- Un carácter entre comillas simples es un `rune` en Go.

## 2. Corrige los registros corruptos

- La concatenación de strings se puede usar para construir la línea de registro modificada runa a runa.
- Para que esa concatenación funcione, puede que primero haya que convertir cada `rune` a string.
- Puedes convertir una runa `r` a `string` con `string(r)`.

## 3. Determina si un registro se puede mostrar

- Las runas pueden ocupar 1, 2, 3 o 4 bytes, por lo que la función incorporada `len` puede que no refleje con exactitud el número de caracteres de un string.
