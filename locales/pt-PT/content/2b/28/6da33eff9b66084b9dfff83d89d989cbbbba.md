# Dicas

## 1. Substitui os espaços encontrados por sublinhados

- [Este tutorial][chars-tutorial] é útil.
- A [documentação de referência][chars-docs] sobre `char`s está aqui.
- Podes obter `char`s de uma string da mesma forma que obténs elementos de um array.
- Deves usar um [`StringBuilder`][string-builder] para construir a string de saída.
- Vê [este método][iswhitespace] para detetar espaços. Lembra-te de que é um método estático.
- Os literais `char` são colocados entre aspas simples.

## 2. Substitui os carateres de controlo pela string "CTRL" em maiúsculas

- Vê [este método][iscontrol] para verificar se um caráter é um caráter de controlo.

## 3. Converte kebab-case em camel-case

- Vê [este método][toupper] para converter um caráter em maiúscula.

## 4. Omite as letras gregas minúsculas

- Os `char`s suportam os operadores de igualdade e de comparação predefinidos.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
