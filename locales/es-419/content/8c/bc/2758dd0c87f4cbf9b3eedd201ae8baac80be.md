# Pistas

## General

- Lee sobre los strings en la [documentación oficial del tipo string][string-type-documentation].
- Explora las [_funciones de string_ disponibles][string-functions] para descubrir las operaciones integradas de los strings.

## 1. Obtén la primera letra del nombre

- Hay una [función integrada][string-substr] para obtener el primer carácter de un string.
- Hay varias [funciones integradas][string-trim] para eliminar los espacios en blanco al inicio, al final, o tanto al inicio como al final de un string.

## 2. Formatea la primera letra como una inicial

- Hay una [función integrada][string-upcase] para convertir todos los caracteres de un string a su variante en mayúsculas.
- Hay un [operador][concat-operator] que concatena dos strings.

## 3. Divide el nombre completo en el nombre y el apellido

- Hay una [función integrada][string-explode] que divide un string usando otro string.
- Algunos de los primeros elementos de un array se pueden asignar a variables mediante la coincidencia de patrones sobre el array.

## 4. Coloca las iniciales dentro del corazón

- Hay una sintaxis especial para [expandir variables][string-variables] dentro de un string.
- Hay una sintaxis especial para escribir [strings multilínea][heredoc-syntax] sin necesidad de escapar los saltos de línea.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
