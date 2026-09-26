# Dicas

## Geral

- [Tutorial sobre datas e horas do csharp.net][csharp.net-datetimes-working-with-datetimes-time]

## 1. Converter a data do agendamento

- A classe `DateTime` tem vários métodos para [converter][docs.microsoft.com_parsing-date] uma `string` em um `DateTime`.

## 2. Verificar se um agendamento já passou

- Objetos `DateTime` podem ser comparados com os [operadores de comparação][docs.microsoft.com_datetime-operators] padrão.
- Existe uma [propriedade][docs.microsoft.com_datetime-properties] para obter a data e a hora atuais.

## 3. Verificar se o agendamento é à tarde

- Você pode acessar a parte de hora de um objeto `DateTime` por meio de uma das suas [propriedades][docs.microsoft.com_datetime-properties].

## 4. Descrever a hora e a data do agendamento

- Os testes rodam como se estivessem em uma máquina nos Estados Unidos, ou seja, ao converter um `DateTime` em uma `string`, as datas e as horas voltam no formato dos EUA.
- Ao converter uma instância de `DateTime` em uma `string`, você pode usar uma [string de formato padrão][docs.microsoft.com_standard-date-and-time-format-strings] ou uma [string de formato personalizado][docs.microsoft.com_custom-date-and-time-format-strings].

## 5. Retornar a data do aniversário

- Use um dos vários [construtores][constructors] de `DateTime` para criar uma nova instância de `DateTime`.
- Você pode usar uma das [propriedades][docs.microsoft.com_datetime-properties] da data e hora atuais para obter o ano atual.

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
