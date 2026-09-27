# Anexo às instruções


## Como este exercício é implementado no percurso Python


Os testes deste exercício esperam que o teu relógio seja implementado numa `class` Clock.
Se não estás familiarizado com classes em Python, [concept:python/classes]() e [classes][classes in python] (_da documentação do Python_) são bons pontos de partida.


## Representar a tua classe

Quando trabalhas com [objetos][what-is-an-object] e os depuras, é importante teres uma boa representação desse objeto.
Por exemplo, se criares um novo objeto [`datetime.datetime`][datetime] no ambiente [REPL][REPL] do Python, podes ver a sua [representação em string][str-rep-classes]:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

A tua `class` Clock deve criar um `object` personalizado que trata de horas _sem_ datas.
Um aspeto importante desta `class` será a forma como é representada como _string_.
Outros programadores que usem ou chamem `objects` Clock criados a partir da `class` Clock vão recorrer a esta representação em string para depurar e para outras atividades.
No entanto, a representação predefinida de uma `class` personalizada não é muito útil:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

Para criares uma representação mais útil, podes definir um [método especial][dunder-methods] [`__repr__`][repr-method] na `class`.

O ideal é que esse método `__repr__` devolva código Python válido que possa ser usado para recriar o objeto quando passado a [`eval()`][eval-built-in], tal como está descrito na [especificação de um método `__repr__`][repr-docs].
Devolver código Python válido permite que outro programador copie e cole a `str` diretamente no código ou no REPL.
Um `Clock` que representa as 11:30 da manhã podia ter este aspeto:

```python
 `Clock(11, 30)`
```

Definir um método `__repr__` é uma boa prática para todas as classes personalizadas.
Há mais alguns aspetos a ter em conta:

- A informação devolvida por este método deve ser útil ao depurar problemas.
- _Idealmente_, o método devolve uma string que é código Python válido, embora isso nem sempre seja possível.
- Se não for prático devolver código Python válido, a convenção é devolver uma descrição entre sinais de menor e maior: `< ...a practical description... >`.


### Conversão para string

Para além do método `__repr__`, pode também haver necessidade de uma representação em string alternativa "legível para humanos" da `class`.
Esta pode ser usada para formatar o objeto para a saída do programa ou para a documentação.
Isto faz-se escrevendo um [método especial][str-dunder] [`__str__`][str-dunder].
Olhando novamente para `datetime.datetime`:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

Quando se pede a um objeto `datetime` que se converta numa representação em string, este devolve uma `str` formatada de acordo com a [norma ISO 8601][ISO 8601], que a maioria das bibliotecas de datetime consegue interpretar como uma data e uma hora legíveis para humanos.

Neste exercício, vais ter a oportunidade de escrever um método `__str__` para o teu Clock, bem como um método `__repr__`.

```python
>>> str(Clock(11, 30))
'11:30'
```

Para suportar esta conversão para string, vais precisar de criar um método especial `__str__` na tua `class` que devolva uma string mais "legível para humanos" com a hora do Clock.

Se não criares um método `__str__` e chamares `str()` sobre a tua classe, o Python vai tentar chamar `__repr__` sobre a tua classe como alternativa.
Por isso, se implementares apenas um destes dois métodos especiais, é melhor criares um `__repr__` do que apenas um `__str__`.


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
