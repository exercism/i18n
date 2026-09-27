# Dicas

## Geral

- A contagem de aves por dia está guardada num [campo][fields] chamado `birdsPerDay`.
- A contagem de aves por dia é um array que contém exatamente 7 números inteiros.

## 1. Verifica quais foram as contagens na semana passada

- Como este método _não_ depende da contagem da semana atual, está definido como um [método `static`][static-members].
- Há [várias formas de definir um array][single-dimensional-arrays].

## 2. Verifica quantas aves visitaram hoje

- Lembra-te de que as contagens estão ordenadas por dia, da mais antiga para a mais recente, e que o último elemento representa hoje.
- Podes aceder ao último elemento usando o seu índice (fixo) (lembra-te de começar a contar do zero) ou calculando o índice com o [tamanho do array][array-length].

## 3. Incrementa a contagem de hoje

- Atribui ao elemento que representa a contagem de hoje o valor da contagem de hoje mais 1.

## 4. Verifica se houve algum dia sem aves visitantes

- A classe `Array` tem um [método incorporado][array-indexof] que devolve o primeiro índice onde o elemento é encontrado, ou -1 se não for encontrado nenhum elemento correspondente.

## 5. Calcula o número de aves visitantes nos primeiros dias

- Podes usar uma variável para guardar a contagem do número de aves visitantes.
- Podes iterar sobre o array com um [ciclo `for`][for-statement].
- Podes atualizar a variável dentro do ciclo.
- Lembra-te: os arrays têm os índices a começar em `0`.

## 6. Calcula o número de dias ocupados

- Podes usar uma variável para guardar o número de dias ocupados.
- Podes iterar sobre o array com um [ciclo `foreach`][array-foreach].
- Podes atualizar a variável dentro do ciclo.
- Podes usar uma [condicional][if-statement] dentro do ciclo.

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
