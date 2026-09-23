# Décomposition et affectation multiple

La décomposition désigne l'action d'extraire les éléments d'une collection, comme un `Array` ou un `Hash`.
Les valeurs décomposées peuvent ensuite être affectées à des variables au sein d'une même instruction.

L'[affectation multiple][multiple assignment] permet d'affecter plusieurs variables pour décomposer des valeurs au sein d'une seule instruction.
Le code y gagne en concision et en lisibilité, et il suffit pour cela de séparer les variables à affecter par une virgule, comme dans `first, second, third = [1, 2, 3]`.

L'opérateur _splat_ (`*`), et l'opérateur double _splat_ (`**`), sont souvent utilisés dans des contextes de décomposition.

~~~~exercism/caution
Il ne faut pas confondre `*<variable_name>` et `**<variable_name>` avec `*` et `**`.
Si `*` et `**` servent respectivement à la multiplication et à l'exponentiation, `*<variable_name>` et `**<variable_name>` sont des opérateurs de composition et de décomposition.
~~~~

## Affectation multiple

L'affectation multiple permet d'affecter plusieurs variables sur une seule ligne.
Pour séparer les valeurs, utilise une virgule `,` :

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

L'affectation multiple n'est pas limitée à un seul type de données :

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

L'affectation multiple permet d'échanger des éléments dans des **tableaux**.
Cette pratique est très courante dans les [algorithmes de tri][sorting algorithms].
Par exemple :

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
On parle aussi d'« affectation parallèle », ce qui permet d'éviter une variable temporaire.
~~~~

S'il y a plus de variables que de valeurs, les variables en trop se voient affecter `nil` :

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Décomposition

En Ruby, il est possible de [décomposer les éléments de **tableaux**/**hash**][decompose] dans des variables distinctes.
Comme les valeurs apparaissent dans les **tableaux** selon l'ordre de leurs indices, elles sont réparties dans les variables dans ce même ordre :

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Si certaines valeurs ne sont pas nécessaires, tu peux utiliser `_` pour indiquer qu'elles sont « récupérées mais non utilisées » :

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Décomposition profonde

Décomposer et affecter les valeurs de **tableaux** situés à l'intérieur d'un **tableau** (_aussi appelé tableau imbriqué_) fonctionne de la même manière qu'une décomposition superficielle, mais nécessite une [expression de décomposition délimitée (`()`)][delimited decomposition expression] pour clarifier le contexte ou la position des valeurs :

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Tu peux aussi décomposer profondément seulement une partie d'un **tableau** imbriqué :

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Si la décomposition comporte des variables mal placées ou un nombre incorrect de valeurs, tu obtiendras une **erreur de syntaxe** :

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Fais l'expérience ici, et tu remarqueras que c'est le premier motif qui dicte la répartition, et non les valeurs disponibles à droite.
L'erreur de syntaxe n'est pas liée à la structure de données.

### Décomposition d'un tableau avec l'opérateur _splat_ simple (`*`)

Quand tu [décomposes un **tableau**][decompose], tu peux utiliser l'opérateur _splat_ (`*`) pour récupérer les valeurs « restantes ».
C'est plus clair que de découper le **tableau** (_ce qui, dans certaines situations, est moins lisible_).
Par exemple, on peut extraire le premier élément, puis affecter les valeurs restantes à un nouveau **tableau** sans le premier élément :

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

On peut aussi extraire les valeurs au début et à la fin du **tableau** tout en regroupant toutes les valeurs du milieu :

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

On peut également utiliser `*` dans une décomposition profonde :

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Décomposition d'un `Hash`

Décomposer un _hash_ est un peu différent de décomposer un **tableau**.
Pour pouvoir décomposer un _hash_, tu dois d'abord le convertir en **tableau**.
Sinon, il n'y aura pas de décomposition :

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Pour convertir un `Hash` en **tableau**, tu peux utiliser la méthode `to_a` :

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Si tu veux récupérer les clés, tu peux utiliser la méthode `keys` :

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Si tu veux récupérer les valeurs, tu peux utiliser la méthode `values` :

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Composition

Composer consiste à regrouper plusieurs valeurs dans un seul **tableau** que l'on affecte à une variable.
C'est utile quand tu veux _décomposer_ des valeurs, les modifier, puis _recomposer_ le résultat dans une variable.
Cela permet aussi d'effectuer des fusions sur 2 **tableaux**/**hash** ou plus.

### Composition d'un tableau avec l'opérateur _splat_ (`*`)

On peut composer un **tableau** à l'aide de l'opérateur _splat_ (`*`).
Toutes les valeurs sont alors regroupées dans un **tableau**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Composition d'un hash avec l'opérateur double _splat_ (`**`)

On compose un _hash_ à l'aide de l'opérateur double _splat_ (`**`).
Toutes les paires **clé**/**valeur** d'un _hash_ sont alors regroupées dans un autre _hash_, ou bien deux _hash_ sont combinés.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Utilisation de l'opérateur _splat_ (`*`) et de l'opérateur double _splat_ (`**`) avec les méthodes

### Composition avec les paramètres de méthode

Quand tu crées une méthode qui accepte un nombre arbitraire d'arguments, tu peux utiliser [`*arguments`][arguments] ou [`**keyword_arguments`][keyword arguments] dans la définition de la méthode.
`*arguments` sert à regrouper un nombre arbitraire d'arguments positionnels (non nommés) et
`**keyword_arguments` sert à regrouper un nombre arbitraire d'arguments nommés.

Utilisation de `*arguments` :

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

Utilisation de `**keyword_arguments` :

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Si la méthode définie n'a aucun paramètre prévu pour les arguments nommés (`**keyword_arguments` ou `<key_word>: <value>`), alors les arguments nommés sont regroupés dans un _hash_ et affectés au dernier paramètre.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` et `**keyword_arguments` peuvent aussi être utilisés en combinaison l'un avec l'autre :

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

Tu peux aussi écrire des arguments avant et après `*arguments` pour autoriser des arguments positionnels précis.
Cela fonctionne de la même manière que la décomposition d'un tableau.

~~~~exercism/caution
Les arguments doivent être structurés dans un ordre précis :

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Si tu ne respectes pas cet ordre, tu obtiendras une erreur.
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

Tu peux écrire des arguments positionnels avant et après `*arguments` :

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Tu peux aussi combiner des arguments positionnels, \*arguments, des arguments nommés et \*\*keyword_arguments :

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

Écrire les arguments dans un ordre incorrect provoquera une erreur :

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Décomposition dans les appels de méthode

Tu peux utiliser l'opérateur _splat_ (`*`) pour répartir un **tableau** d'arguments dans un appel de méthode :

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

Tu peux aussi utiliser l'opérateur double _splat_ (`**`) pour répartir un _hash_ d'arguments dans un appel de méthode :

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
