# Dicas

## Geral

- A classe [`TemporalAdjusters`][temporaladjusters-docs] (repara no plural) é um conjunto de métodos estáticos que devolvem ajustadores já prontos.
- Um ajustador aplica-se a um `LocalDate` com o método [`with()`][localdate-with], que devolve um novo `LocalDate` e deixa o original inalterado.
- Para ajustar "dentro de um mês", parte de qualquer data desse mês, por exemplo do primeiro dia: `LocalDate.of(year, month, 1)`.

## 1. Encontrar a marcação fixa de um cliente habitual

- Existe um [ajustador][dayofweekinmonth-docs] que encontra a n-ésima ocorrência de um dia da semana no mês da data a que é aplicado.

## 2. Encontrar a marcação de fim de mês de um cliente habitual

- Existe um [ajustador][lastinmonth-docs] que encontra a última ocorrência de um dia da semana no mês da data a que é aplicado.

## 3. Encontrar o próximo dia disponível para um cliente sem marcação

- Existem dois ajustadores que avançam para um determinado dia da semana: um que avança sempre para uma data posterior e [outro][nextorsame-docs] que mantém a data se ela já corresponder.

## 4. Encontrar o dia de fecho de contas

- Existe um [ajustador][lastdayofmonth-docs] que avança para o último dia do mês.
- Um `LocalDate` pode dizer-te o [dia da semana][localdate-getdayofweek].
- Quando o último dia calha a um fim de semana, existe um [ajustador][previous-docs] que recua para a ocorrência anterior de um dia da semana.

## 5. Reutilizar a regra do fim de semana para o dia de pagamento

- [`TemporalAdjuster`][temporaladjuster-docs] é uma interface funcional com um único método, `adjustInto()`, por isso pode ser implementada com uma lambda.
- Dentro da lambda, [`DayOfWeek.from()`][dayofweek-from] dá o dia da semana do temporal que está a ser ajustado.
- Os ajustadores podem ser encadeados: o resultado de aplicar um ajustador é um temporal ao qual podes aplicar outro ajustador.

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
