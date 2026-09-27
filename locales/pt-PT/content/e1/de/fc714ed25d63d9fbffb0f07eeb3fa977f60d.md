# Decomposição e atribuição múltipla

A decomposição é o ato de extrair os elementos de uma coleção, como um `Array` ou um `Hash`.
Os valores decompostos podem depois ser atribuídos a variáveis na mesma instrução.

[A atribuição múltipla][multiple assignment] é a capacidade de atribuir várias variáveis para decompor valores numa única instrução.
Isto torna o código mais conciso e legível, e faz-se separando com uma vírgula as variáveis a atribuir, como em `first, second, third = [1, 2, 3]`.

O operador splat (`*`) e o operador splat duplo (`**`) são frequentemente usados em contextos de decomposição.

~~~~exercism/caution
`*<variable_name>` e `**<variable_name>` não devem ser confundidos com `*` e `**`.
Enquanto `*` e `**` são usados para multiplicação e exponenciação, respetivamente, `*<variable_name>` e `**<variable_name>` são usados como operadores de composição e decomposição.
~~~~

## Atribuição múltipla

A atribuição múltipla permite-te atribuir várias variáveis numa só linha.
Para separar os valores, usa uma vírgula `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

A atribuição múltipla não se limita a um único tipo de dados:

```irb
>> x, y, z = 1, "Hello", true
=> [1, "Hello", true]
>> x
=> 1
>> y
=> 'Hello'
>> z
=> true
```

A atribuição múltipla pode ser usada para trocar elementos em **arrays**.
Esta prática é bastante comum em [algoritmos de ordenação][sorting algorithms].
Por exemplo:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Isto também é conhecido como "atribuição paralela" e pode ser usado para evitar uma variável temporária.
~~~~

Se houver mais variáveis do que valores, as variáveis extra recebem `nil`:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Decomposição

Em Ruby, é possível [decompor os elementos de **arrays**/**hashes**][decompose] em variáveis distintas.
Como os valores aparecem nos **arrays** por ordem de índice, são desempacotados para as variáveis na mesma ordem:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Se houver valores que não são necessários, podes usar `_` para indicar "recolhido mas não usado":

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Decomposição profunda

Decompor e atribuir valores de **arrays** dentro de um **array** (_também conhecido como array aninhado_) funciona da mesma forma que uma decomposição simples, mas precisa de uma [expressão de decomposição delimitada (`()`)][delimited decomposition expression] para clarificar o contexto ou a posição dos valores:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Também podes desempacotar apenas uma parte de um **array** aninhado:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Se a decomposição tiver variáveis com uma posição incorreta e/ou um número incorreto de valores, obténs um **erro de sintaxe**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Experimenta aqui e vais reparar que é o primeiro padrão que manda, e não os valores disponíveis do lado direito.
O erro de sintaxe não está ligado à estrutura de dados.

### Decompor um array com o operador splat simples (`*`)

Ao [decompor um **array**][decompose], podes usar o operador splat (`*`) para capturar os valores "restantes".
Isto é mais claro do que fatiar o **array** (_o que, em algumas situações, é menos legível_).
Por exemplo, podemos extrair o primeiro elemento e depois atribuir os valores restantes a um novo **array** sem o primeiro elemento:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Também podemos extrair os valores no início e no fim do **array**, agrupando ao mesmo tempo todos os valores do meio:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Também podemos usar `*` em decomposição profunda:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Decompor um `Hash`

Decompor um **hash** é um pouco diferente de decompor um **array**.
Para conseguires desempacotar um **hash**, tens de o converter primeiro num **array**.
Caso contrário, não há decomposição:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Para converter um `Hash` num **array**, podes usar o método `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Se quiseres desempacotar as chaves, podes usar o método `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Se quiseres desempacotar os valores, podes usar o método `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Composição

Compor é a capacidade de agrupar vários valores num único **array** que é atribuído a uma variável.
Isto é útil quando queres _decompor_ valores, fazer alterações e depois _compor_ novamente os resultados numa variável.
Também permite juntar 2 ou mais **arrays**/**hashes**.

### Compor um array com o operador splat (`*`)

Compor um **array** pode ser feito com o operador splat (`*`).
Isto empacota todos os valores num **array**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Compor um hash com o operador splat duplo (`**`)

Compor um hash faz-se com o operador splat duplo (`**`).
Isto empacota todos os pares **chave**/**valor** de um hash noutro hash, ou combina dois hashes entre si.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Utilização do operador splat (`*`) e do operador splat duplo (`**`) com métodos

### Composição com parâmetros de método

Quando crias um método que aceita um número arbitrário de argumentos, podes usar [`*arguments`][arguments] ou [`**keyword_arguments`][keyword arguments] na definição do método.
`*arguments` é usado para empacotar um número arbitrário de argumentos posicionais (não nomeados) e
`**keyword_arguments` é usado para empacotar um número arbitrário de argumentos de palavra-chave.

Utilização de `*arguments`:

```irb
# This method is defined to take any number of positional arguments
# (Using the single line form of the definition of a method.)

>> def my_method(*arguments)= arguments

# Arguments given to the method are packed into an array

>> my_method(1, 2, 3)
=> [1, 2, 3]

>> my_method("Hello")
=> ["Hello"]

>> my_method(1, 2, 3, "Hello", "Mars")
=> [1, 2, 3, "Hello", "Mars"]
```

Utilização de `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Se o método definido não tiver quaisquer parâmetros definidos para argumentos de palavra-chave (`**keyword_arguments` ou `<key_word>: <value>`), os argumentos de palavra-chave são empacotados num hash e atribuídos ao último parâmetro.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` e `**keyword_arguments` também podem ser usados em conjunto um com o outro:

```ruby
def my_method(*arguments, **keyword_arguments)
  p arguments.sum
  for (key, value) in keyword_arguments.to_a
    p key.to_s + " = " + value.to_s
  end
end


my_method(1, 2, 3, a: 1, b: 2, c: 3)
6
"a = 1"
"b = 2"
"c = 3"
```

Também podes escrever argumentos antes e depois de `*arguments` para permitir argumentos posicionais específicos.
Isto funciona da mesma forma que decompor um array.

~~~~exercism/caution
Os argumentos têm de ser estruturados por uma ordem específica:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Se não seguires esta ordem, vais receber um erro.
~~~~

```ruby
def my_method(a, b, *arguments)
  p a
  p b
  p arguments
end

my_method(1, 2, 3, 4, 5)
1
2
[3, 4, 5]
```

Podes escrever argumentos posicionais antes e depois de `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Também podes combinar argumentos posicionais, \*arguments, argumentos de palavra-chave e \*\*keyword_arguments:

```irb
>> def my_method(first, *many, last, a:, **keyword_arguments)
     p first
     p many
     p last
     p a
     p keyword_arguments
     end

>> my_method(1, 2, 3, 4, 5, a: 6, b: 7, c: 8)
1
[2, 3, 4]
5
6
{:b => 7, :c => 8}
```

Escrever os argumentos numa ordem incorreta resulta num erro:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Decompor em chamadas de métodos

Podes usar o operador splat (`*`) para desempacotar um **array** de argumentos numa chamada de método:

```ruby
def my_method(a, b, c)
  p c
  p b
  p a
end

numbers = [1, 2, 3]
my_method(*numbers)
3
2
1
```

Também podes usar o operador splat duplo (`**`) para desempacotar um **hash** de argumentos numa chamada de método:

```ruby
def my_method(a:, b:, c:)
  p c
  p b
  p a
end

numbers = {a: 1, b: 2, c: 3}
my_method(**numbers)
3
2
1
```

[arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Array-2FHash+Argument
[keyword arguments]: https://docs.ruby-lang.org/en/master/syntax/methods_rdoc.html#label-Keyword+Arguments
[multiple assignment]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Multiple+Assignment
[sorting algorithms]: https://en.wikipedia.org/wiki/Sorting_algorithm
[decompose]: https://docs.ruby-lang.org/en/master/syntax/assignment_rdoc.html#label-Array+Decomposition
[delimited decomposition expression]: https://riptutorial.com/ruby/example/8798/decomposition
