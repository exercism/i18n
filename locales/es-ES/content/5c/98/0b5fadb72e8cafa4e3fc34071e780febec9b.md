# Introducción

Un número de coma flotante es un número con cero o más dígitos detrás del separador decimal. Por ejemplo: `-2.4`, `0.1`, `3.14`, `16.984025` y `1024.0`.

Los distintos tipos de coma flotante pueden almacenar un número diferente de dígitos después del separador decimal; a esto se le llama su precisión.

C# tiene tres tipos de coma flotante:

- `float`: 4 bytes (~6-9 dígitos de precisión). Se escribe como `2.45f`.
- `double`: 8 bytes (~15-17 dígitos de precisión). Es el tipo más común. Se escribe como `2.45` o `2.45d`.
- `decimal`: 16 bytes (28-29 dígitos de precisión). Normalmente se usa cuando se trabaja con datos monetarios, ya que su precisión conlleva menos errores de redondeo. Se escribe como `2.45m`.

Como se puede ver, cada tipo puede almacenar un número diferente de dígitos. Esto significa que si intentas almacenar PI en un `float`, solo se guardarán los primeros 6 a 9 dígitos (redondeando el último).
