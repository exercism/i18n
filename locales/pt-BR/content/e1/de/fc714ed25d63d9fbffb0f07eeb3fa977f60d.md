# Decomposição e atribuição múltipla

A decomposição se refere ao ato de extrair os elementos de uma coleção, como um `Array` ou um `Hash`.
Os valores decompostos podem então ser atribuídos a variáveis na mesma instrução.

A [atribuição múltipla][multiple assignment] é a capacidade de atribuir várias variáveis para decompor valores em uma única instrução.
Isso deixa o código mais conciso e legível, e é feito separando as variáveis a serem atribuídas com uma vírgula, como em `first, second, third = [1, 2, 3]`.

O operador splat (`*`) e o operador splat duplo (`**`) são usados com frequência em contextos de decomposição.

~~~~exercism/caution
`*<variable_name>` e `**<variable_name>` não devem ser confundidos com `*` e `**`.
Enquanto `*` e `**` são usados para multiplicação e exponenciação, respectivamente, `*<variable_name>` e `**<variable_name>` são usados como operadores de composição e decomposição.
~~~~

## Atribuição múltipla

A atribuição múltipla permite atribuir várias variáveis em uma linha.
Para separar os valores, use uma vírgula `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

A atribuição múltipla não se limita a um único tipo de dado:

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
Essa prática é bem comum em [algoritmos de ordenação][sorting algorithms].
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
Isso também é conhecido como "atribuição paralela" e pode ser usado para evitar uma variável temporária.
~~~~

Se houver mais variáveis do que valores, as variáveis extras receberão `nil`:

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
Como os valores aparecem dentro dos **arrays** em uma ordem de índices, eles são desempacotados nas variáveis na mesma ordem:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Se houver valores que não são necessários, você pode usar `_` para indicar "coletado mas não usado":

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Decomposição profunda

Decompor e atribuir valores de **arrays** dentro de um **array** (_também conhecido como array aninhado_) funciona da mesma forma que uma decomposição superficial, mas precisa de uma [expressão de decomposição delimitada (`()`)][delimited decomposition expression] para deixar claro o contexto ou a posição dos valores:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Você também pode desempacotar profundamente apenas uma parte de um **array** aninhado:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Se a decomposição tiver variáveis com posicionamento incorreto e/ou um número incorreto de valores, você vai receber um **erro de sintaxe**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Experimente aqui e você vai perceber que é o primeiro padrão que manda, e não os valores disponíveis do lado direito.
O erro de sintaxe não está ligado à estrutura de dados.

### Decompor um array com o operador splat único (`*`)

Ao [decompor um **array**][decompose], você pode usar o operador splat (`*`) para capturar os valores "que sobram".
Isso é mais claro do que fatiar o **array** (_o que, em algumas situações, é menos legível_).
Por exemplo, podemos extrair o primeiro elemento e depois atribuir os valores restantes a um novo **array** sem o primeiro elemento:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Também podemos extrair os valores do início e do fim do **array** enquanto agrupamos todos os valores do meio:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Também podemos usar `*` na decomposição profunda:

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
Para conseguir desempacotar um **hash**, você precisa primeiro convertê-lo em um **array**.
Caso contrário, não haverá decomposição:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Para converter um `Hash` em um **array**, você pode usar o método `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Se você quiser desempacotar as chaves, pode usar o método `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Se você quiser desempacotar os valores, pode usar o método `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Composição

Compor é a capacidade de agrupar vários valores em um único **array** que é atribuído a uma variável.
Isso é útil quando você quer _decompor_ valores, fazer alterações e depois _compor_ os resultados de volta em uma variável.
Também torna possível fazer mesclagens de 2 ou mais **arrays**/**hashes**.

### Compor um array com o operador splat (`*`)

Compor um **array** pode ser feito usando o operador splat (`*`).
Ele empacota todos os valores em um **array**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Compor um hash com o operador splat duplo (`**`)

Compor um hash é feito usando o operador splat duplo (`**`).
Ele empacota todos os pares **chave**/**valor** de um hash em outro hash, ou combina dois hashes entre si.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Uso do operador splat (`*`) e do operador splat duplo (`**`) com métodos

### Compor com parâmetros de método

Quando você cria um método que aceita um número arbitrário de argumentos, pode usar [`*arguments`][arguments] ou [`**keyword_arguments`][keyword arguments] na definição do método.
`*arguments` é usado para empacotar um número arbitrário de argumentos posicionais (que não são de palavra-chave) e
`**keyword_arguments` é usado para empacotar um número arbitrário de argumentos de palavra-chave.

Uso de `*arguments`:

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

Uso de `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Se o método definido não tiver nenhum parâmetro definido para argumentos de palavra-chave (`**keyword_arguments` ou `<key_word>: <value>`), os argumentos de palavra-chave serão empacotados em um hash e atribuídos ao último parâmetro.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` e `**keyword_arguments` também podem ser usados em combinação um com o outro:

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

Você também pode escrever argumentos antes e depois de `*arguments` para permitir argumentos posicionais específicos.
Isso funciona da mesma forma que decompor um array.

~~~~exercism/caution
Os argumentos precisam ser estruturados em uma ordem específica:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Se você não seguir essa ordem, vai receber um erro.
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

Você pode escrever argumentos posicionais antes e depois de `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Você também pode combinar argumentos posicionais, \*arguments, argumentos de palavra-chave e \*\*keyword_arguments:

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

Escrever os argumentos em uma ordem incorreta resulta em um erro:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Decompor em chamadas de método

Você pode usar o operador splat (`*`) para desempacotar um **array** de argumentos em uma chamada de método:

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

Você também pode usar o operador splat duplo (`**`) para desempacotar um **hash** de argumentos em uma chamada de método:

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
