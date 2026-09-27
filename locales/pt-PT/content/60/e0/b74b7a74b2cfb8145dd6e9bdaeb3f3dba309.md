# Anexo às instruções

## Mensagens de exceção

Por vezes, é necessário [lançar uma exceção](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando o fazes, deves incluir sempre uma **mensagem de erro significativa** que indique qual é a origem do erro. Isto torna o teu código mais legível e ajuda imenso na depuração. Em situações em que sabes que a origem do erro será de um determinado tipo, podes optar por lançar um dos [tipos de erro incorporados](https://docs.python.org/3/library/exceptions.html#base-classes), mas deves continuar a incluir uma mensagem significativa.

Este exercício em particular exige que uses a [instrução raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para "lançar" um `ValueError` quando a função `prime()` recebe uma entrada malformada. Como este exercício só lida com números _positivos_, qualquer número < 1 está malformado.  Os testes só passam se fizeres `raise` da `exception` e incluíres uma mensagem com ela.

Para lançar um `ValueError` com uma mensagem, escreve a mensagem como argumento do tipo `exception`:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
