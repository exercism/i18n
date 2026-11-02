# Dicas

## Geral

- A classe [`TemporalAdjusters`][temporaladjusters-docs] (repare no plural) é uma coleção de métodos estáticos que retornam ajustadores prontos.
- Um ajustador é aplicado a um `LocalDate` com o método [`with()`][localdate-with], que retorna um novo `LocalDate` e deixa o original inalterado.
- Para ajustar "dentro de um mês", comece por qualquer data desse mês, por exemplo o primeiro dia: `LocalDate.of(year, month, 1)`.

## 1. Encontre o horário fixo de um cliente frequente

- Existe um [ajustador][dayofweekinmonth-docs] que encontra a n-ésima ocorrência de um dia da semana no mês da data à qual ele é aplicado.

## 2. Encontre o horário de fim de mês de um cliente frequente

- Existe um [ajustador][lastinmonth-docs] que encontra a última ocorrência de um dia da semana no mês da data à qual ele é aplicado.

## 3. Encontre o próximo dia disponível para um cliente sem hora marcada

- Existem dois ajustadores que avançam para um determinado dia da semana: um que sempre vai para uma data posterior, e [outro][nextorsame-docs] que mantém a data se ela já corresponder.

## 4. Encontre o dia da contabilidade

- Existe um [ajustador][lastdayofmonth-docs] que vai para o último dia do mês.
- Um `LocalDate` consegue informar o seu [dia da semana][localdate-getdayofweek].
- Quando o último dia cai em um fim de semana, existe um [ajustador][previous-docs] que volta para a ocorrência anterior de um dia da semana.

## 5. Reaproveite a regra de fim de semana para o dia de pagamento

- [`TemporalAdjuster`][temporaladjuster-docs] é uma interface funcional com um único método, `adjustInto()`, então pode ser implementada com uma lambda.
- Dentro da lambda, [`DayOfWeek.from()`][dayofweek-from] retorna o dia da semana do temporal que está sendo ajustado.
- Ajustadores podem ser encadeados: o resultado da aplicação de um ajustador é um temporal ao qual você pode aplicar outro ajustador.

[temporaladjusters-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html
[temporaladjuster-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjuster.html
[localdate-with]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#with(java.time.temporal.TemporalAdjuster)
[localdate-getdayofweek]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/LocalDate.html#getDayOfWeek()
[dayofweek-from]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/DayOfWeek.html#from(java.time.temporal.TemporalAccessor)
[dayofweekinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#dayOfWeekInMonth(int,java.time.DayOfWeek)
[lastinmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastInMonth(java.time.DayOfWeek)
[nextorsame-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#nextOrSame(java.time.DayOfWeek)
[lastdayofmonth-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#lastDayOfMonth()
[previous-docs]: https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/time/temporal/TemporalAdjusters.html#previous(java.time.DayOfWeek)
