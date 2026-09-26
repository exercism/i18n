# Anexo às instruções

## Descrição da DSL

Um grafo, nesta DSL, é um objeto do tipo `Graph`. Ele recebe uma `list` de uma
ou mais tuplas que descrevem:

+ atributos
+ `Nodes`
+ `Edges`

As implementações de um `Node` e de uma `Edge` estão em `dot_dsl.py`.

Para mais detalhes sobre o design esperado da DSL e sobre os tipos de erro e as mensagens esperados, dê uma olhada nos casos de teste em `dot_dsl_test.py`


## Mensagens de exceção

Às vezes é necessário [levantar uma exceção](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando você faz isso, inclua sempre uma **mensagem de erro significativa** para indicar qual é a origem do erro. Isso deixa seu código mais legível e ajuda bastante na depuração. Quando você sabe que a origem do erro será de um tipo específico, pode escolher levantar um dos [tipos de erro internos](https://docs.python.org/3/library/exceptions.html#base-classes), mas ainda assim deve incluir uma mensagem significativa.

Este exercício em particular exige que você use a [instrução raise](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para "lançar" um `TypeError` quando um `Graph` estiver malformado, e um `ValueError` quando um `Edge`, um `Node` ou um `attribute` estiver malformado. Os testes só vão passar se você usar `raise` na `exception` e incluir uma mensagem com ela.

Para levantar um erro com uma mensagem, escreva a mensagem como argumento do tipo da `exception`:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
