# Pistas

## General

- Implementa funciones puras que devuelvan strings JSON; no necesitas ejecutar un servidor web.

- Roc proporciona `Json.parse` y `Json.to_str` como funciones integradas.
  Una anotación de tipo en el valor devuelto de una función auxiliar de análisis indica a `Json.parse` qué estructura de registro debe decodificar.

- El campo `payload ?: Str` es opcional: el `payload` que vincula el patrón de registro del stub es `Ok(text)` o `Err(MissingField)`.
