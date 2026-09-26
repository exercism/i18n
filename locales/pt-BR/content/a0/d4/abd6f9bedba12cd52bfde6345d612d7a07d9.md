# Apêndice de instruções

## Mensagens de exceção

Às vezes é preciso [levantar uma exceção](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando você fizer isso, deve sempre incluir uma **mensagem de erro significativa** para indicar qual é a origem do erro. Isso deixa seu código mais legível e ajuda bastante na depuração. Em situações em que você sabe que a origem do erro será de um tipo específico, você pode optar por levantar um dos [tipos de erro embutidos](https://docs.python.org/3/library/exceptions.html#base-classes), mas ainda assim deve incluir uma mensagem significativa.

Este exercício específico pede que você use a [instrução raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para "lançar" um `ValueError` quando a entrada do quadrado estiver fora do intervalo. Os testes só vão passar se você `raise` a `exception` e incluir uma mensagem junto com ela.

Para levantar um `ValueError` com uma mensagem, escreva a mensagem como argumento para o tipo `exception`:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
