# Descomposición y asignación múltiple

La descomposición se refiere al acto de extraer los elementos de una colección, como un `Array` o un `Hash`.
Los valores descompuestos se pueden asignar después a variables dentro de la misma sentencia.

[La asignación múltiple][multiple assignment] es la capacidad de asignar varias variables para descomponer valores en una sola sentencia.
Esto permite que el código sea más conciso y legible, y se logra separando con una coma las variables que se van a asignar, así: `first, second, third = [1, 2, 3]`.

El operador splat (`*`) y el operador doble splat (`**`) se usan a menudo en contextos de descomposición.

~~~~exercism/caution
`*<variable_name>` y `**<variable_name>` no deben confundirse con `*` y `**`.
Mientras que `*` y `**` se usan para la multiplicación y la exponenciación, respectivamente, `*<variable_name>` y `**<variable_name>` se usan como operadores de composición y descomposición.
~~~~

## Asignación múltiple

La asignación múltiple te permite asignar varias variables en una sola línea.
Para separar los valores, usa una coma `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

La asignación múltiple no se limita a un solo tipo de dato:

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

La asignación múltiple se puede usar para intercambiar elementos en **arrays**.
Esta práctica es bastante común en los [algoritmos de ordenamiento][sorting algorithms].
Por ejemplo:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Esto también se conoce como «asignación paralela» y se puede usar para evitar una variable temporal.
~~~~

Si hay más variables que valores, a las variables adicionales se les asignará `nil`:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Descomposición

En Ruby, es posible [descomponer los elementos de **arrays**/**hashes**][decompose] en variables distintas.
Como los valores aparecen dentro de los **arrays** en un orden de índice, se desempaquetan en variables en ese mismo orden:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Si hay valores que no necesitas, puedes usar `_` para indicar «recogido pero no usado»:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Descomposición profunda

Descomponer y asignar valores de **arrays** dentro de otro **array** (_también conocido como array anidado_) funciona igual que una descomposición superficial, pero necesita una [expresión de descomposición delimitada (`()`)][delimited decomposition expression] para aclarar el contexto o la posición de los valores:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

También puedes desempaquetar en profundidad solo una parte de un **array** anidado:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Si la descomposición tiene variables con una ubicación incorrecta o un número incorrecto de valores, obtendrás un **error de sintaxis**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Experimenta aquí y notarás que lo que manda es el primer patrón, no los valores disponibles del lado derecho.
El error de sintaxis no está atado a la estructura de datos.

### Descomponer un array con el operador splat único (`*`)

Al [descomponer un **array**][decompose] puedes usar el operador splat (`*`) para capturar los valores «sobrantes».
Esto es más claro que cortar el **array** (_que en algunas situaciones es menos legible_).
Por ejemplo, podemos extraer el primer elemento y luego asignar los valores restantes a un nuevo **array** sin el primer elemento:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

También podemos extraer los valores del principio y del final del **array** y agrupar todos los valores intermedios:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

También podemos usar `*` en una descomposición profunda:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Descomponer un `Hash`

Descomponer un **hash** es un poco distinto de descomponer un **array**.
Para poder desempaquetar un **hash**, primero tienes que convertirlo en un **array**.
De lo contrario, no habrá descomposición:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Para convertir un `Hash` en un **array** puedes usar el método `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Si quieres desempaquetar las claves, puedes usar el método `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Si quieres desempaquetar los valores, puedes usar el método `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Composición

Componer es la capacidad de agrupar varios valores en un solo **array** que se asigna a una variable.
Esto es útil cuando quieres _descomponer_ valores, hacer cambios y luego _componer_ los resultados de nuevo en una variable.
También permite combinar 2 o más **arrays**/**hashes**.

### Componer un array con el operador splat (`*`)

Componer un **array** se puede hacer con el operador splat (`*`).
Esto empaqueta todos los valores en un **array**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Componer un hash con el operador doble splat (`**`)

Componer un hash se hace con el operador doble splat (`**`).
Esto empaqueta todos los pares **clave**/**valor** de un hash en otro hash, o combina dos hashes.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Uso del operador splat (`*`) y del operador doble splat (`**`) con métodos

### Componer con parámetros de métodos

Cuando creas un método que acepta una cantidad arbitraria de argumentos, puedes usar [`*arguments`][arguments] o [`**keyword_arguments`][keyword arguments] en la definición del método.
`*arguments` se usa para empaquetar una cantidad arbitraria de argumentos posicionales (no de palabra clave) y
`**keyword_arguments` se usa para empaquetar una cantidad arbitraria de argumentos de palabra clave.

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

Si el método definido no tiene ningún parámetro definido para argumentos de palabra clave (`**keyword_arguments` o `<key_word>: <value>`), los argumentos de palabra clave se empaquetarán en un hash y se asignarán al último parámetro.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` y `**keyword_arguments` también se pueden usar en combinación:

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

También puedes escribir argumentos antes y después de `*arguments` para permitir argumentos posicionales específicos.
Esto funciona igual que descomponer un array.

~~~~exercism/caution
Los argumentos tienen que estar en un orden específico:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Si no sigues este orden, obtendrás un error.
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

Puedes escribir argumentos posicionales antes y después de `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

También puedes combinar argumentos posicionales, \*arguments, argumentos de palabra clave y \*\*keyword_arguments:

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

Escribir los argumentos en un orden incorrecto dará como resultado un error:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Descomponer en llamadas a métodos

Puedes usar el operador splat (`*`) para desempaquetar un **array** de argumentos en una llamada a un método:

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

También puedes usar el operador doble splat (`**`) para desempaquetar un **hash** de argumentos en una llamada a un método:

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
