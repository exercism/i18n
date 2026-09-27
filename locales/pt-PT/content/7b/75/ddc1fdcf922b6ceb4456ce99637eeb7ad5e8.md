# Tuplas

Uma [tupla][tuple] é uma lista ordenada e finita de elementos que é imutável.
As tuplas exigem que todas as posições tenham um tipo fixo.
Isto, por sua vez, significa que o compilador sabe que tipo está em cada posição.
Os tipos usados numa tupla podem ser diferentes em cada posição, mas têm de ser conhecidos em tempo de compilação.

## Criar uma tupla

Dependendo de se os tipos dos valores da tupla podem ser interpretados durante a compilação, a tupla pode ser criada de diferentes formas.
Se os valores forem conhecidos em tempo de compilação, a tupla pode ser criada com a sintaxe literal de tuplas. Caso contrário, é preciso declará-los explicitamente.
Também é importante que os tipos dos valores correspondam aos tipos especificados na tupla e que o número de valores corresponda ao número de tipos especificados.
Eis um exemplo de definição através da sintaxe literal de tuplas:

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

Também é possível criar uma tupla com a classe `Tuple`.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

Em alternativa, podes especificar explicitamente o tipo da variável atribuída à tupla.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

Especificar explicitamente o tipo da tupla pode ser útil, pois permite definir que uma posição deve conter uma união de tipos.
Isto significa que uma posição pode conter vários tipos.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Conversão

### Criar uma tupla a partir de um array

Podes criar uma tupla a partir de um array com o método `from` da classe `Tuple`.
Isto exige que o tipo da tupla seja especificado.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Conversão para array

Podes converter uma tupla num array com o método `to_a`.
O tipo dos elementos do array resultante é a união dos tipos de cada campo da tupla.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Aceder aos elementos

Tal como os arrays, as tuplas são indexadas a partir de zero, ou seja, o primeiro elemento está no índice 0.
No entanto, ao contrário dos arrays, o tipo de cada elemento é fixo e conhecido em tempo de compilação. Por isso, ao indexar uma tupla, o tipo do elemento é específico da posição.
Para aceder a um elemento de uma tupla, podes usar o operador `[]`.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

Outra diferença no acesso a elementos de arrays é que, se o índice for especificado, o compilador verifica se o índice está dentro dos limites da tupla.
Isto significa que vais obter um erro em tempo de compilação em vez de um erro em tempo de execução.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

No entanto, se o índice estiver guardado numa variável, o compilador não consegue verificar se o índice está dentro dos limites da tupla em tempo de compilação e dá, em vez disso, um erro em tempo de execução.

## Subtupla

Podes obter uma subtupla de uma tupla usando o operador `[]` com um intervalo.
O que é devolvido é uma nova tupla com os elementos do intervalo especificado.
O intervalo tem de ser indicado em tempo de compilação. Caso contrário, o compilador não consegue saber os tipos dos elementos da subtupla.
Isto significa que o intervalo tem de ser um literal de intervalo e não pode estar atribuído a uma variável.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Quando usar uma tupla

As tuplas são úteis quando queres agrupar um número fixo de valores cujos tipos são conhecidos em tempo de compilação.
Isto acontece porque as tuplas ocupam menos memória e são mais rápidas do que os arrays, devido à sua imutabilidade.
Outro caso de uso é devolver vários valores a partir de um método.
Isto é particularmente útil se os valores tiverem tipos diferentes, já que cada posição da tupla pode ter um tipo diferente.

As tuplas não devem ser usadas quando é precisa uma estrutura de dados que possa aumentar ou diminuir de tamanho ou que precise de ser modificada com frequência.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
