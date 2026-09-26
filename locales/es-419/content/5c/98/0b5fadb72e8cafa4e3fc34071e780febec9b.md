# Introducción

Un número de punto flotante es un número con cero o más dígitos después del separador decimal. Algunos ejemplos son `-2.4`, `0.1`, `3.14`, `16.984025` y `1024.0`.

Los distintos tipos de punto flotante pueden almacenar una cantidad diferente de dígitos después del separador decimal, y a esto se le llama su precisión.

C# tiene tres tipos de punto flotante:

- `float`: 4 bytes (una precisión de ~6-9 dígitos). Se escribe como `2.45f`.
- `double`: 8 bytes (una precisión de ~15-17 dígitos). Es el tipo más común. Se escribe como `2.45` o `2.45d`.
- `decimal`: 16 bytes (una precisión de 28-29 dígitos). Normalmente se usa cuando se trabaja con datos monetarios, ya que su precisión genera menos errores de redondeo. Se escribe como `2.45m`.

Como puedes ver, cada tipo puede almacenar una cantidad diferente de dígitos. Esto significa que si intentas almacenar PI en un `float`, solo se guardarán los primeros 6 a 9 dígitos (y el último se redondeará).
