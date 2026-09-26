# Dicas

## Geral

- Os [sets][sets] são coleções mutáveis e não ordenadas, sem elementos duplicados.
- Os sets podem conter qualquer tipo de dado, desde que todos os elementos sejam [hashable][hashable].
- Os sets são [iteráveis][iterable].
- Os sets são usados com mais frequência para remover duplicatas de outras coleções rapidamente ou para testar pertencimento.
- Os sets também suportam operações matemáticas como `union`, `intersection`, `difference` e `symmetric difference`

## 1. Limpe os ingredientes do prato

- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- Lembre-se: [conceito: tuplas](/tracks/python/concepts/tuples) podem ser formadas usando `(<element_1>, <element_2>)` ou pelo construtor `tuple()`.

## 2. Coquetéis e mocktails

- Um `set` é _disjunto_ de outro set se os dois não compartilham nenhum elemento.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- Em Python, [conceito: strings](/tracks/python/concepts/strings) podem ser concatenadas com o sinal `+`.

## 3. Categorize os pratos

- Usar [conceito: laços](/tracks/python/concepts/loops) para iterar sobre as categorias de refeições disponíveis pode ser útil aqui.
- Se todos os elementos de `<set_1>` estão contidos em `<set_2>`, então `<set_1> <= <set_2>`.
- O método equivalente ao `<=` é `<set>.issubset(<iterable>)`
- [conceito: tuplas](/tracks/python/concepts/tuples) podem conter qualquer tipo de dado, inclusive outras tuplas. As tuplas podem ser formadas usando `(<element_1>, <element_2>)` ou pelo construtor `tuple()`.
- Os elementos dentro de [conceito: tuplas](/tracks/python/concepts/tuples) podem ser acessados pela esquerda usando um índice que começa em 0, ou pela direita usando um índice que começa em -1.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- [conceito: strings](/tracks/python/concepts/strings) podem ser concatenadas com o sinal `+`.

## 4. Rotule alérgenos e alimentos restritos

- A _intersecção_ de sets são os elementos compartilhados entre `<set_1>` e `<set_2>`.
- O método de set equivalente ao `&` é `<set>.intersection(<iterable>)`
- Os elementos dentro de [conceito: tuplas](/tracks/python/concepts/tuples) podem ser acessados pela esquerda usando um índice que começa em 0, ou pela direita usando um índice que começa em -1.
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- [conceito: tuplas](/tracks/python/concepts/tuples) podem ser formadas usando `(<element_1>, <element_2>)` ou pelo construtor `tuple()`.

## 5. Compile uma "lista mestre" de ingredientes

- A _união_ de sets é quando `<set_1`> e `<set_2>` são combinados em um único `set`
- O método de set equivalente ao `|` é `<set>.union(<iterable>)`
- Usar [conceito: laços](/tracks/python/concepts/loops) para iterar sobre os diversos pratos pode ser útil aqui.

## 6. Separe os aperitivos para passar em bandejas

- A _diferença_ de sets é quando os elementos de `<set_2>` são removidos de `<set_1>`, por exemplo `<set_1> - <set_2>`.
- O método de set equivalente ao `-` é `<set>.difference(<iterable>)`
- O construtor `set()` pode receber qualquer [iterável][iterable] como argumento. [conceito: listas](/tracks/python/concepts/lists) são iteráveis.
- O construtor de [conceito: lista](/tracks/python/concepts/lists) pode receber qualquer [iterável][iterable] como argumento. Os sets são iteráveis.

## 7. Encontre ingredientes usados em apenas uma receita

- A _diferença simétrica_ de sets é quando elementos aparecem em `<set_1>` ou `<set_2>`, mas não em **_ambos_** os sets.
- A _diferença simétrica_ de sets é o mesmo que subtrair a _intersecção_ dos `sets` da _união_ dos `sets`, por exemplo `(<set_1> | <set_2>) - (<set_1> & <set_2>)`
- Uma _diferença simétrica_ de mais de dois `sets` vai incluir elementos que se repetem mais de duas vezes entre os `sets` de entrada. Para remover esses elementos repetidos entre sets, é preciso subtrair as _intersecções_ entre os pares de sets da diferença simétrica.
- Usar [conceito: laços](/tracks/python/concepts/loops) para iterar sobre os diversos pratos pode ser útil aqui.


[hashable]: https://docs.python.org/3.7/glossary.html#term-hashable
[iterable]: https://docs.python.org/3/glossary.html#term-iterable
[sets]: https://docs.python.org/3/tutorial/datastructures.html#sets