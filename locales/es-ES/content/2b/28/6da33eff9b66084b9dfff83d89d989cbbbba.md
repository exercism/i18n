# Pistas

## 1. Sustituye los espacios que encuentres por guiones bajos

- Este [tutorial][chars-tutorial] es útil.
- Aquí tienes la [documentación de referencia][chars-docs] sobre los `char`.
- Puedes obtener `char`s de un string de la misma forma que los elementos de un array.
- Deberías usar un [`StringBuilder`][string-builder] para construir el string de salida.
- Consulta [este método][iswhitespace] para detectar espacios. Recuerda que es un método estático.
- Los literales de `char` se escriben entre comillas simples.

## 2. Sustituye los caracteres de control por el string «CTRL» en mayúsculas

- Consulta [este método][iscontrol] para comprobar si un carácter es un carácter de control.

## 3. Convierte kebab-case a camel-case

- Consulta [este método][toupper] para convertir un carácter a mayúsculas.

## 4. Omite las letras griegas minúsculas

- Los `char` admiten los operadores de igualdad y comparación predeterminados.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
