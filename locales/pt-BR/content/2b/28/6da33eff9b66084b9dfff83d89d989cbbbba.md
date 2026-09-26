# Dicas

## 1. Substitua todos os espaços encontrados por sublinhados

- [Este tutorial][chars-tutorial] é útil.
- A [documentação de referência][chars-docs] para `char`s está aqui.
- Você pode obter `char`s de uma string da mesma forma que obtém elementos de um array.
- Você deve usar um [`StringBuilder`][string-builder] para montar a string de saída.
- Veja [este método][iswhitespace] para detectar espaços. Lembre-se de que ele é um método estático.
- Os literais de `char` ficam entre aspas simples.

## 2. Substitua os caracteres de controle pela string "CTRL" em maiúsculas

- Veja [este método][iscontrol] para verificar se um caractere é um caractere de controle.

## 3. Converta kebab-case em camel-case

- Veja [este método][toupper] para converter um caractere em maiúsculo.

## 4. Omita as letras gregas minúsculas

- Os `char`s suportam os operadores de igualdade e comparação padrão.

[chars-docs]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/char
[chars-tutorial]: https://csharp.net-tutorials.com/data-types/the-char-type/
[string-builder]: https://docs.microsoft.com/en-us/dotnet/api/system.text.stringbuilder
[iswhitespace]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iswhitespace
[iscontrol]: https://docs.microsoft.com/en-us/dotnet/api/system.char.iscontrol
[toupper]: https://docs.microsoft.com/en-us/dotnet/api/system.char.toupper
[equality]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/equality-operators
[comparison]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/operators/comparison-operators
