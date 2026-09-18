# Szétbontás és többszörös értékadás

A szétbontás azt jelenti, hogy kinyerjük egy gyűjtemény, például egy `Array` vagy `Hash` elemeit.
A szétbontott értékeket ezután ugyanabban az utasításban változókhoz rendelhetjük.

A [többszörös értékadás][multiple assignment] lehetővé teszi, hogy egyetlen utasításban több változónak adjunk értéket szétbontott értékekből.
Így a kód tömörebb és olvashatóbb lehet, és úgy valósítjuk meg, hogy a hozzárendelendő változókat vesszővel választjuk el, például `first, second, third = [1, 2, 3]`.

A splat operátort (`*`) és a dupla splat operátort (`**`) gyakran használjuk szétbontási helyzetekben.

~~~~exercism/caution
A `*<variable_name>` és a `**<variable_name>` nem tévesztendő össze a `*` és a `**` operátorral.
Míg a `*` és a `**` rendre a szorzásra és a hatványozásra szolgál, addig a `*<variable_name>` és a `**<variable_name>` az összecsomagolás és a szétbontás operátora.
~~~~

## Többszörös értékadás

A többszörös értékadás lehetővé teszi, hogy egy sorban több változónak adj értéket.
Az értékek elválasztásához vesszőt (`,`) használj:

```irb
>> a, b = 1, 2
=> [1, 2]
>> a
=> 1
```

A többszörös értékadás nem korlátozódik egyetlen adattípusra:

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

A többszörös értékadással elemeket cserélhetünk fel **tömbökben**.
Ez a gyakorlat meglehetősen gyakori a [rendezési algoritmusokban][sorting algorithms].
Például:

```irb
>> numbers = [1, 2]
=> [1, 2]
>> numbers[0], numbers[1] = numbers[1], numbers[0]
=> [2, 1]
>> numbers
=> [2, 1]
```

~~~~exercism/note
Ezt „párhuzamos értékadásnak” is nevezik, és arra is használható, hogy elkerüljünk egy ideiglenes változót.
~~~~

Ha több változó van, mint érték, a felesleges változók `nil` értéket kapnak:

```irb
>> a, b, c = 1, 2
=> [1, 2]
>> b
=> 2
>> c
=> nil
```

## Szétbontás

Rubyban lehetőség van arra, hogy [egy **tömb**/**hash** elemeit külön változókba bontsuk szét][decompose].
Mivel az értékek indexsorrendben szerepelnek a **tömbökben**, ugyanabban a sorrendben csomagolódnak ki a változókba:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> x, y, z = fruits
>> x
=> "apple"
```

Ha vannak olyan értékek, amelyekre nincs szükség, a `_` jellel jelezheted, hogy „összegyűjtve, de nem használva”:

```irb
>> fruits = ["apple", "banana", "cherry"]
>> _, _, z = fruits
>> z
=> "cherry"
```

### Mély szétbontás

Értékek szétbontása és hozzárendelése **tömbökből**, amelyek egy **tömbön** belül vannak (_más néven egymásba ágyazott tömb_), ugyanúgy működik, mint a sekély szétbontás, de szükség van [tagolt szétbontási kifejezésre (`()`)][delimited decomposition expression], hogy egyértelmű legyen az értékek kontextusa vagy pozíciója:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> (a, b), (c, d) = fruits_vegetables
>> a
=> "apple"
>> d
=> "potato"
```

Egy egymásba ágyazott **tömb**nek akár csak egy részét is mélyen kicsomagolhatod:

```irb
>> fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]
>> a, (c, d) = fruits_vegetables
>> a
=> ["apple", "banana"]
>> c
=> "carrot"
```

Ha a szétbontásban a változók helytelenül helyezkednek el és/vagy rossz számú érték van, **szintaktikai hibát** kapsz:

```ruby
fruits_vegetables = [["apple", "banana"], ["carrot", "potato"]]

(a, b), (d) = fruits_vegetables
# syntax error, unexpected '=', expecting '.' or &. or :: or '['

((a, b), (d)) = fruits_vegetables
# syntax error, unexpected ')', expecting '.' or &. or :: or '['
```

Kísérletezz itt, és észre fogod venni, hogy nem a jobb oldalon elérhető értékek diktálnak, hanem az első minta.
A szintaktikai hiba nem az adatszerkezethez kötődik.

### Tömb szétbontása az egyszeres splat operátorral (`*`)

Amikor [egy **tömböt** szétbontasz][decompose], a splat operátorral (`*`) elkaphatod a „maradék” értékeket.
Ez világosabb, mint a **tömb** felszeletelése (_ami bizonyos helyzetekben kevésbé olvasható_).
Például kinyerhetjük az első elemet, majd a maradék értékeket egy új, az első elemet nem tartalmazó **tömbbe** rendelhetjük:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *last = fruits
>> x
=> "apple"
>> last
=> ["banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

Kinyerhetjük a **tömb** elején és végén lévő értékeket is, miközben a középső értékeket csoportosítjuk:

```irb
>> fruits = ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
>> x, *middle, y, z = fruits
>> y
=> "melon"
>> middle
=> ["banana", "cherry", "orange", "kiwi"]
```

A `*` operátort mély szétbontásban is használhatjuk:

```irb
>> fruits_vegetables = [["apple", "banana", "melon"], ["carrot", "potato", "tomato"]]
>> (a, *rest), b = fruits_vegetables
>> a
=> "apple"
>> rest
=> ["banana", "melon"]
```

### Egy `Hash` szétbontása

Egy **hash** szétbontása kicsit más, mint egy **tömb** szétbontása.
Ahhoz, hogy egy **hash**-t ki tudj csomagolni, először **tömbbe** kell alakítanod.
Különben nem lesz szétbontás:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory
>> x
=> {:apple=>6, :banana=>2, :cherry=>3}
>> y
=> nil
```

Ha egy `Hash`-t **tömbbé** szeretnél alakítani, használhatod a `to_a` metódust:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> fruits_inventory.to_a
=> [[:apple, 6], [:banana, 2], [:cherry, 3]]
>> x, y, z = fruits_inventory.to_a
>> x
=> [:apple, 6]
```

Ha a kulcsokat szeretnéd kicsomagolni, használhatod a `keys` metódust:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.keys
>> x
=> :apple
```

Ha az értékeket szeretnéd kicsomagolni, használhatod a `values` metódust:

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> x, y, z = fruits_inventory.values
>> x
=> 6
```

## Összecsomagolás

Az összecsomagolás lehetővé teszi, hogy több értéket egyetlen, egy változóhoz rendelt **tömbben** csoportosítsunk.
Ez akkor hasznos, ha az értékeket _szét szeretnéd bontani_, módosításokat végzel rajtuk, majd az eredményeket _visszacsomagolod_ egy változóba.
Arra is lehetőséget ad, hogy összefésüléseket hajts végre két vagy több **tömbön**/**hash**-en.

### Tömb összecsomagolása a splat operátorral (`*`)

Egy **tömb** összecsomagolását a splat operátorral (`*`) végezheted el.
Ez az összes értéket egy **tömbbe** csomagolja.

```irb
>> fruits = ["apple", "banana", "cherry"]
>> more_fruits = ["orange", "kiwi", "melon", "mango"]

# fruits and more_fruits are unpacked and then their elements are packed into combined_fruits
>> combined_fruits = *fruits, *more_fruits

>> combined_fruits
=> ["apple", "banana", "cherry", "orange", "kiwi", "melon", "mango"]
```

### Hash összecsomagolása a dupla splat operátorral (`**`)

Egy hash összecsomagolása a dupla splat operátorral (`**`) történik.
Ez az egyik hash összes **kulcs**/**érték** párját egy másik hashbe csomagolja, vagy két hash-t kombinál össze.

```irb
>> fruits_inventory = {apple: 6, banana: 2, cherry: 3}
>> more_fruits_inventory = {orange: 4, kiwi: 1, melon: 2, mango: 3}

# fruits_inventory and more_fruits_inventory are unpacked into key-values pairs and combined.
>> combined_fruits_inventory = {**fruits_inventory, **more_fruits_inventory}

# then the pairs are packed into combined_fruits_inventory
>> combined_fruits_inventory
=> {:apple=>6, :banana=>2, :cherry=>3, :orange=>4, :kiwi=>1, :melon=>2, :mango=>3}
```

## A splat operátor (`*`) és a dupla splat operátor (`**`) használata metódusokkal

### Összecsomagolás metódusparaméterekkel

Amikor olyan metódust hozol létre, amely tetszőleges számú argumentumot fogad, a metódus definíciójában használhatod a [`*arguments`][arguments] vagy a [`**keyword_arguments`][keyword arguments] formát.
A `*arguments` tetszőleges számú pozicionális (nem kulcs alapú) argumentum becsomagolására szolgál, a `**keyword_arguments` pedig tetszőleges számú kulcsargumentum becsomagolására.

A `*arguments` használata:

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

A `**keyword_arguments` használata:

```irb
# This method is defined to take any number of keyword arguments

>> def my_method(**keyword_arguments)= keyword_arguments

# Arguments given to the method are packed into a dictionary

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

Ha a definiált metódusnak nincs egyetlen kulcsargumentumhoz tartozó paramétere sem (`**keyword_arguments` vagy `<key_word>: <value>`), akkor a kulcsargumentumok egy hashbe csomagolódnak, és az utolsó paraméterhez lesznek hozzárendelve.

```irb
>> def my_method(a)= a

>> my_method(a: 1, b: 2, c: 3)
=> {:a => 1, :b => 2, :c => 3}
```

A `*arguments` és a `**keyword_arguments` egymással kombinálva is használható:

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

Írhatsz argumentumokat a `*arguments` elé és mögé is, hogy konkrét pozicionális argumentumokat engedélyezz.
Ez ugyanúgy működik, mint egy tömb szétbontása.

~~~~exercism/caution
Az argumentumokat meghatározott sorrendben kell elhelyezni:

`def my_method(<positional_arguments>, *arguments, <positional_arguments>, <keyword_arguments>, **keyword_arguments)`

Ha nem követed ezt a sorrendet, hibát kapsz.
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

Pozicionális argumentumokat a `*arguments` elé és mögé is írhatsz:

```irb
>> def my_method(a, *middle, b)= middle

>> my_method(1, 2, 3, 4, 5)
=> [2, 3, 4]
```

Kombinálhatod a pozicionális argumentumokat, a \*arguments, a kulcsargumentumokat és a \*\*keyword_arguments formát:

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

Ha az argumentumokat rossz sorrendben írod, hibát kapsz:

```ruby
def my_method(a:, **keyword_arguments, first, *arguments, last)
  arguments
end

my_method(1, 2, 3, 4, a: 5)

syntax error, unexpected local variable or method, expecting & or '&'
... my_method(a:, **keyword_arguments, first, *arguments, last)
```

### Szétbontás metódushívásnál

A splat operátorral (`*`) egy argumentumokból álló **tömböt** csomagolhatsz ki egy metódushívásba:

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

A dupla splat operátorral (`**`) egy argumentumokból álló **hash**-t csomagolhatsz ki egy metódushívásba:

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
