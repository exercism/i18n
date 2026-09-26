# Apêndice de instruções


## Como este exercício é implementado para a trilha Python


Os testes deste exercício esperam que o seu relógio seja implementado em uma `class` Clock.
Se você ainda não conhece classes em Python, [concept:python/classes]() e [classes][classes in python] (_da documentação do Python_) são bons lugares para começar.


## Representando a sua classe

Ao trabalhar com [objetos][what-is-an-object] e depurar esse código, é importante ter uma boa representação desse objeto.
Por exemplo, se você criar um novo objeto [`datetime.datetime`][datetime] no ambiente [REPL][REPL] do Python, poderá ver a [representação em string][str-rep-classes] dele:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

A sua `class` Clock deve criar um `object` customizado que lida com horários _sem_ datas.
Um aspecto importante dessa `class` será como ela é representada como uma _string_.
Outras pessoas que usam ou chamam `objects` Clock criados a partir da `class` Clock vão consultar essa representação em string para depurar e fazer outras atividades.
No entanto, a representação padrão de uma `class` customizada não ajuda muito:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Para criar uma representação mais útil, você pode definir um [método especial][dunder-methods] [`__repr__`][repr-method] na `class`.

O ideal é que esse método `__repr__` retorne código Python válido que possa ser usado para recriar o objeto quando passado para [`eval()`][eval-built-in], como descrito na [especificação de um método `__repr__`][repr-docs].
Retornar código Python válido permite que outra pessoa desenvolvedora copie e cole a `str` diretamente no código ou no REPL.
Uma `Clock` que representa 11:30 da manhã ficaria assim:

```python
 `Clock(11, 30)`
```

Definir um método `__repr__` é uma boa prática para todas as classes customizadas.
Alguns pontos adicionais a considerar:

- As informações retornadas por esse método devem ajudar na hora de depurar problemas.
- _O ideal_ é que o método retorne uma string que seja código Python válido, embora isso nem sempre seja possível.
- Se o código Python válido não for viável, a convenção é retornar uma descrição entre sinais de maior e menor: `< ...a practical description... >`.


### Conversão para string

Além do método `__repr__`, também pode ser necessário ter uma representação em string alternativa, "legível para humanos", da `class`.
Isso pode ser usado para formatar o objeto para a saída do programa ou para a documentação.
Isso é feito escrevendo um [método especial][str-dunder] [`__str__`][str-dunder].
Vejamos o `datetime.datetime` de novo:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Quando pedimos que um objeto `datetime` se converta para uma representação em string, ele retorna uma `str` formatada de acordo com o [padrão ISO 8601][ISO 8601], que a maioria das bibliotecas de data e hora consegue interpretar como uma data e hora legíveis para humanos.

Neste exercício, você terá a chance de escrever um método `__str__` para o seu Clock, além de um método `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Para dar suporte a essa conversão para string, você precisará criar um método especial `__str__` na sua `class` que retorne uma string mais "legível para humanos", mostrando o horário do Clock.

Se você não criar um método `__str__` e chamar `str()` na sua classe, o Python vai tentar chamar o `__repr__` da sua classe como alternativa.
Então, se você implementar apenas um desses dois métodos especiais, é melhor criar um `__repr__` do que apenas um `__str__`.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
