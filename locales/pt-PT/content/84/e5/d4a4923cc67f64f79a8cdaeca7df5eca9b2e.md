# Anexo às instruções

## Descrição da DSL

Um grafo, nesta DSL, é um objeto do tipo `Graph`. Este recebe uma `list` de um ou mais tuplos que descrevem:

+ atributos
+ `Nodes`
+ `Edges`

As implementações de um `Node` e de uma `Edge` são fornecidas em `dot_dsl.py`.

Para mais detalhes sobre o design esperado da DSL e os tipos e mensagens de erro esperados, dá uma vista de olhos pelos casos de teste em `dot_dsl_test.py`


## Mensagens de exceção

Por vezes, é necessário [lançar uma exceção](https://docs.python.org/3/tutorial/errors.html#raising-exceptions). Quando o fazes, deves incluir sempre uma **mensagem de erro significativa** para indicar qual é a origem do erro. Isto torna o teu código mais legível e ajuda imenso a depurar. Nas situações em que sabes que a origem do erro será de um determinado tipo, podes optar por lançar um dos [tipos de erro incorporados](https://docs.python.org/3/library/exceptions.html#base-classes), mas deves continuar a incluir uma mensagem significativa.

Este exercício em particular exige que uses a [instrução `raise`](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement) para "lançar" um `TypeError` quando um `Graph` está mal formado, e um `ValueError` quando um `Edge`, um `Node` ou um `attribute` está mal formado. Os testes só passam se fizeres `raise` da `exception` e incluíres uma mensagem com ela.

Para lançar um erro com uma mensagem, escreve a mensagem como argumento do tipo `exception`:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
