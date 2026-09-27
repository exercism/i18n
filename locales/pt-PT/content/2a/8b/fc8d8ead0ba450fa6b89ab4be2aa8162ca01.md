# Dicas

## Geral

- [Tutorial sobre datas e horas do csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Analisa a data da marcação

- A classe `DateTime` tem vários métodos para [analisar][docs.microsoft.com_parsing-date] uma `string` e obter uma `DateTime`.

## 2. Verifica se uma marcação já passou

- Os objetos `DateTime` podem ser comparados com os [operadores de comparação][docs.microsoft.com_datetime-operators] predefinidos.
- Há uma [propriedade][docs.microsoft.com_datetime-properties] para obter a data e a hora atuais.

## 3. Verifica se a marcação é à tarde

- Podes aceder à parte da hora de um objeto `DateTime` através de uma das suas [propriedades][docs.microsoft.com_datetime-properties].

## 4. Descreve a hora e a data da marcação

- Os testes são executados como se estivessem a correr numa máquina nos Estados Unidos, o que significa que ao converter um `DateTime` numa `string` obténs as datas e as horas no formato dos EUA.
- Ao converter uma instância de `DateTime` numa `string`, podes usar uma [string de formato padrão][docs.microsoft.com_standard-date-and-time-format-strings] ou uma [string de formato personalizado][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Devolve a data de aniversário

- Usa um dos vários [construtores][constructors] de `DateTime` para criar uma nova instância de `DateTime`.
- Podes usar uma das [propriedades][docs.microsoft.com_datetime-properties] da data e hora atuais para obter o ano atual.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
