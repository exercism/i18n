# Dicas

## Geral

- Os [sets][sets] são coleções mutáveis e não ordenadas, sem elementos duplicados.
- Os sets podem conter qualquer tipo de dados, desde que todos os elementos sejam [hashable][hashable].
- Os sets são [iteráveis][iterable].
- Os sets são usados sobretudo para remover rapidamente duplicados de outras coleções ou para verificar a pertença de elementos.
- Os sets também suportam operações matemáticas como `union`, `intersection`, `difference` e `symmetric difference`

## 1. Limpar os ingredientes dos pratos

- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. As [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- Lembra-te: os [conceito: tuplos](/tracks/python/concepts/tuples) podem ser criados com `(<element_1>, <element_2>)` ou através do construtor `tuple()`.

## 2. Cocktails e mocktails

- Um `set` é _disjunto_ de outro set se os dois sets não partilharem nenhum elemento.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. As [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- Em Python, as [conceito: strings](/tracks/python/concepts/strings) podem ser concatenadas com o sinal `+`.

## 3. Categorizar os pratos

- Pode ser útil usar [conceito: ciclos](/tracks/python/concepts/loops) para iterar pelas categorias de refeições disponíveis.
- Se todos os elementos de `<set_1>` estiverem contidos em `<set_2>`, então `<set_1> <= <set_2>`.
- O método equivalente a `<=` é `<set>.issubset(<iterable>)`
- Os [conceito: tuplos](/tracks/python/concepts/tuples) podem conter qualquer tipo de dados, incluindo outros tuplos. Os tuplos podem ser criados com `(<element_1>, <element_2>)` ou através do construtor `tuple()`.
- Pode aceder-se aos elementos dentro dos [conceito: tuplos](/tracks/python/concepts/tuples) a partir da esquerda com um número de índice baseado em 0, ou a partir da direita com um número de índice baseado em -1.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. As [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- As [conceito: strings](/tracks/python/concepts/strings) podem ser concatenadas com o sinal `+`.

## 4. Etiquetar alergénios e alimentos restritos

- Uma _intersecção_ de sets são os elementos partilhados entre `<set_1>` e `<set_2>`.
- O método de set equivalente a `&` é `<set>.intersection(<iterable>)`
- Pode aceder-se aos elementos dentro dos [conceito: tuplos](/tracks/python/concepts/tuples) a partir da esquerda com um número de índice baseado em 0, ou a partir da direita com um número de índice baseado em -1.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. As [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- Os [conceito: tuplos](/tracks/python/concepts/tuples) podem ser criados com `(<element_1>, <element_2>)` ou através do construtor `tuple()`.

## 5. Compilar uma "lista mestre" de ingredientes

- Uma _união_ de sets é quando `<set_1`> e `<set_2>` são combinados num único `set`
- O método de set equivalente a `|` é `<set>.union(<iterable>)`
- Pode ser útil usar [conceito: ciclos](/tracks/python/concepts/loops) para iterar pelos vários pratos.

## 6. Separar as entradas para passar nos tabuleiros

- Uma _diferença_ de sets é quando os elementos de `<set_2>` são removidos de `<set_1>`, por exemplo `<set_1> - <set_2>`.
- O método de set equivalente a `-` é `<set>.difference(<iterable>)`
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. As [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- O construtor [conceito: lista](/tracks/python/concepts/lists) pode receber qualquer [iterável][iterable] como argumento. Os sets são iteráveis.

## 7. Encontrar ingredientes usados em apenas uma receita

- Uma _diferença simétrica_ de sets é quando os elementos aparecem em `<set_1>` ou em `<set_2>`, mas não em **_ambos_** os sets.
- Uma _diferença simétrica_ de sets é o mesmo que subtrair a _intersecção_ de sets à _união_ de sets, por exemplo `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Uma _diferença simétrica_ de mais de dois `sets` vai incluir elementos que se repetem mais de duas vezes nos `sets` de entrada. Para remover esses elementos repetidos entre sets, é preciso subtrair as _intersecções_ entre pares de sets à diferença simétrica.
- Pode ser útil usar [conceito: ciclos](/tracks/python/concepts/loops) para iterar pelos vários pratos.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets