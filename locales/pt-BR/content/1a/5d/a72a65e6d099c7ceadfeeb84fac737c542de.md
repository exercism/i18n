# Dicas

## Geral

- A contagem de pássaros por dia fica armazenada em um [campo][fields] chamado `birdsPerDay`.
- A contagem de pássaros por dia é um array que contém exatamente 7 inteiros.

## 1. Verifique quais foram as contagens na semana passada

- Como este método _não_ depende da contagem da semana atual, ele é definido como um [método `static`][static-members].
- Existem [várias formas de definir um array][single-dimensional-arrays].

## 2. Verifique quantos pássaros visitaram hoje

- Lembre-se de que as contagens estão ordenadas por dia, da mais antiga para a mais recente, e o último elemento representa hoje.
- Você pode acessar o último elemento de duas formas: usando o índice dele (que é fixo), lembrando de começar a contar do zero, ou calculando o índice a partir do [tamanho do array][array-length].

## 3. Incremente a contagem de hoje

- Defina o elemento que representa a contagem de hoje como a contagem de hoje mais 1.

## 4. Verifique se houve algum dia sem pássaros visitantes

- A classe `Array` tem um [método integrado][array-indexof] que retorna o primeiro índice em que o elemento é encontrado, ou -1 se nenhum elemento correspondente for encontrado.

## 5. Calcule o número de pássaros visitantes nos primeiros dias

- Você pode usar uma variável para guardar a contagem do número de pássaros visitantes.
- Você pode iterar sobre o array usando um [laço `for`][for-statement].
- A variável pode ser atualizada dentro do laço.
- Lembre-se: os arrays são indexados a partir de `0`.

## 6. Calcule o número de dias movimentados

- Você pode usar uma variável para guardar o número de dias movimentados.
- Você pode iterar sobre o array usando um [laço `foreach`][array-foreach].
- A variável pode ser atualizada dentro do laço.
- Você pode usar uma [condicional][if-statement] dentro do laço.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
