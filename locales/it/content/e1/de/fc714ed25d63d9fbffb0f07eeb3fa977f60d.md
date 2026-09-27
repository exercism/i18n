# Scomposizione e assegnazione multipla

La scomposizione è l'atto di estrarre gli elementi di una collezione, come un `Array` o un `Hash`.
I valori scomposti possono poi essere assegnati a delle variabili all'interno della stessa istruzione.

L'[assegnazione multipla][multiple assignment] è la capacità di assegnare più variabili per scomporre dei valori all'interno di una sola istruzione.
Questo permette di scrivere codice più conciso e leggibile, e si ottiene separando con una virgola le variabili da assegnare, come in `first, second, third = [1, 2, 3]`.

L'operatore splat (`*`) e il doppio operatore splat (`**`) sono spesso usati nei contesti di scomposizione.

~~~~exercism/caution
`*<variable_name>` e `**<variable_name>` non vanno confusi con `*` e `**`.
Mentre `*` e `**` sono usati rispettivamente per la moltiplicazione e l'elevamento a potenza, `*<variable_name>` e `**<variable_name>` sono usati come operatori di composizione e scomposizione.
~~~~

## Assegnazione multipla

L'assegnazione multipla ti permette di assegnare più variabili in una sola riga.
Per separare i valori, usa una virgola `,`:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

L'assegnazione multipla non è limitata a un solo tipo di dato:

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

L'assegnazione multipla può essere usata per scambiare elementi all'interno degli **array**.
Questa pratica è piuttosto comune negli [algoritmi di ordinamento][sorting algorithms].
Per esempio:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Questa tecnica è anche nota come «Parallel Assignment» e può essere usata per evitare una variabile temporanea.
~~~~

Se ci sono più variabili che valori, alle variabili in eccesso verrà assegnato `nil`:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Scomposizione

In Ruby è possibile [scomporre gli elementi di **array**/**hash**][decompose] in variabili distinte.
Dato che i valori compaiono all'interno degli **array** in un ordine di indice, vengono scompattati nelle variabili nello stesso ordine:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Se ci sono valori che non ti servono, puoi usare `_` per indicare «raccolto ma non usato»:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Scomposizione profonda

Scomporre e assegnare valori da **array** dentro un **array** (_noto anche come array annidato_) funziona allo stesso modo di una scomposizione superficiale, ma richiede un'[espressione di scomposizione delimitata (`()`)][delimited decomposition expression] per chiarire il contesto o la posizione dei valori:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Puoi anche scompattare in profondità solo una parte di un **array** annidato:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Se la scomposizione ha variabili posizionate in modo errato e/o un numero errato di valori, otterrai un **errore di sintassi**:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Fai degli esperimenti qui e noterai che è il primo schema a dettare le regole, non i valori disponibili sul lato destro.
L'errore di sintassi non è legato alla struttura dati.

### Scomporre un array con il singolo operatore splat (`*`)

Quando [scomponi un **array**][decompose] puoi usare l'operatore splat (`*`) per catturare i valori «rimanenti».
Questo è più chiaro rispetto a fare slicing dell'**array** (_che in alcune situazioni risulta meno leggibile_).
Per esempio, possiamo estrarre il primo elemento e poi assegnare i valori rimanenti a un nuovo **array** senza il primo elemento:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Possiamo anche estrarre i valori all'inizio e alla fine dell'**array**, raggruppando tutti i valori in mezzo:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

Possiamo anche usare `*` nella scomposizione profonda:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Scomporre un `Hash`

Scomporre un **hash** è un po' diverso dallo scomporre un **array**.
Per poter scompattare un **hash** devi prima convertirlo in un **array**.
Altrimenti non ci sarà alcuna scomposizione:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Per forzare un `Hash` a diventare un **array** puoi usare il metodo `to_a`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Se vuoi scompattare le chiavi, puoi usare il metodo `keys`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Se vuoi scompattare i valori, puoi usare il metodo `values`:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Composizione

Comporre è la capacità di raggruppare più valori in un unico **array** che viene assegnato a una variabile.
Questo è utile quando vuoi _scomporre_ dei valori, apportare delle modifiche e poi _ricomporre_ i risultati in una variabile.
Rende anche possibile eseguire delle fusioni su 2 o più **array**/**hash**.

### Comporre un array con l'operatore splat (`*`)

Comporre un **array** si può fare usando l'operatore splat (`*`).
Questo impacchetterà tutti i valori in un **array**.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Comporre un hash con il doppio operatore splat (`**`)

Comporre un hash si fa usando il doppio operatore splat (`**`).
Questo impacchetterà tutte le coppie **chiave**/**valore** di un hash in un altro hash, oppure combinerà due hash insieme.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## Uso dell'operatore splat (`*`) e del doppio operatore splat (`**`) con i metodi

### Composizione con i parametri dei metodi

Quando crei un metodo che accetta un numero arbitrario di argomenti, puoi usare [`*arguments`][arguments] o [`**keyword_arguments`][keyword arguments] nella definizione del metodo.
`*arguments` si usa per impacchettare un numero arbitrario di argomenti posizionali (non keyword) e
`**keyword_arguments` si usa per impacchettare un numero arbitrario di argomenti keyword.

Uso di `*arguments`:

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

Uso di `**keyword_arguments`:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Se il metodo definito non ha alcun parametro definito per gli argomenti keyword (`**keyword_arguments` o `<key_word>: <value>`), allora gli argomenti keyword verranno impacchettati in un hash e assegnati all'ultimo parametro.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

`*arguments` e `**keyword_arguments` possono anche essere usati in combinazione tra loro:

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

Puoi anche scrivere argomenti prima e dopo `*arguments` per avere degli argomenti posizionali specifici.
Funziona allo stesso modo della scomposizione di un array.

~~~~exercism/caution
Gli argomenti devono essere strutturati in un ordine preciso:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Se non rispetti questo ordine, otterrai un errore.
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

Puoi scrivere argomenti posizionali prima e dopo `*arguments`:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Puoi anche combinare argomenti posizionali, \*arguments, argomenti keyword e \*\*keyword_arguments:

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

Scrivere gli argomenti in un ordine errato provocherà un errore:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Scomporre nelle chiamate ai metodi

Puoi usare l'operatore splat (`*`) per scompattare un **array** di argomenti in una chiamata a un metodo:

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

Puoi anche usare il doppio operatore splat (`**`) per scompattare un **hash** di argomenti in una chiamata a un metodo:

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
