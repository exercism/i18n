# Apêndice das instruções

## Mensagens de exceção

Às vezes é necessário [lançar uma exceção](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando você fizer isso, inclua sempre uma **mensagem de erro significativa** para indicar qual é a origem do erro. Isso deixa seu código mais legível e ajuda muito na depuração. Quando você já sabe que a origem do erro é de um determinado tipo, pode optar por lançar um dos [tipos de erro embutidos](https://docs.python.org/3/library/exceptions.html#base-classes), mas ainda assim inclua uma mensagem significativa.

Este exercício em particular exige que você use a [instrução raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para "lançar" um `ValueError` quando a função `prime()` receber uma entrada malformada. Como este exercício trata apenas de números _positivos_, qualquer número < 1 está malformado. Os testes só vão passar se você `raise` a `exception` e incluir uma mensagem junto com ela.

Para lançar um `ValueError` com uma mensagem, escreva a mensagem como argumento do tipo `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
