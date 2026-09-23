# Tuples

Un [tuple][tuple] est une liste ordonnée finie d'éléments qui est immuable.
Les tuples exigent que toutes les positions aient un type fixe.
Cela signifie donc que le compilateur connaît le type à chaque position.
Les types utilisés dans un tuple peuvent être différents à chaque position, mais ils doivent être connus à la compilation.

## Crée un tuple

Selon que les types des valeurs du tuple peuvent être interprétés à la compilation, le tuple peut être créé de différentes manières.
Si les valeurs sont connues à la compilation, le tuple peut être créé en utilisant la syntaxe littérale de tuple, sinon elles doivent être déclarées explicitement.
Il est également important que les types des valeurs correspondent aux types spécifiés dans le tuple et que le nombre de valeurs corresponde au nombre de types spécifiés.
Voici un exemple de définition via la syntaxe littérale de tuple :

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

Il est également possible de créer un tuple en utilisant la classe `Tuple`.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

On peut aussi spécifier explicitement le type de la variable affectée au tuple.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

Spécifier explicitement le type du tuple peut être utile car cela permet de définir qu'une position doit contenir un type union.
Cela signifie qu'une position peut contenir plusieurs types.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Conversion

### Crée un tuple à partir d'un tableau

On peut créer un tuple à partir d'un tableau en utilisant la méthode `from` de la classe `Tuple`.
Cela nécessite que le type du tuple soit spécifié.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Conversion en tableau

On peut convertir un tuple en tableau en utilisant la méthode `to_a`.
Le type des éléments du tableau résultant est l'union des types de chaque champ du tuple.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Accède aux éléments

Comme les tableaux, les tuples sont indexés à partir de zéro, ce qui signifie que le premier élément se trouve à l'indice 0.
Cependant, contrairement aux tableaux, le type de chaque élément est fixe et connu à la compilation, donc lorsqu'on indexe un tuple, le type de l'élément est spécifique à la position.
Pour accéder à un élément dans un tuple, on peut utiliser l'opérateur `[]`.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

Une autre différence lorsqu'il s'agit d'accéder aux éléments d'un tableau est que si l'indice est spécifié, le compilateur vérifiera que l'indice est dans les limites du tuple.
Cela signifie qu'on obtiendra une erreur de compilation au lieu d'une erreur d'exécution.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

Cependant, si l'indice est stocké dans une variable, le compilateur ne pourra pas vérifier si l'indice est dans les limites du tuple à la compilation et donnera à la place une erreur d'exécution.

## Sous-tuple

On peut obtenir un sous-tuple d'un tuple en utilisant l'opérateur `[]` avec un intervalle.
Ce qui est renvoyé est un nouveau tuple avec les éléments de l'intervalle spécifié.
L'intervalle doit être donné à la compilation, sinon le compilateur ne pourra pas connaître les types des éléments du sous-tuple.
Cela signifie que l'intervalle doit être un littéral d'intervalle et non affecté à une variable.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Quand utiliser un tuple

Les tuples sont utiles lorsqu'on veut regrouper un nombre fixe de valeurs dont les types sont connus à la compilation.
C'est parce que les tuples nécessitent moins de mémoire et sont plus rapides que les tableaux en raison de l'immuabilité des tuples.
Un autre cas d'utilisation est de renvoyer plusieurs valeurs à partir d'une méthode.
C'est particulièrement utile si les valeurs ont des types différents, car chaque position du tuple peut avoir un type différent.

Il ne faut pas utiliser de tuples lorsqu'on a besoin d'une structure de données qui peut grandir ou diminuer en taille ou qui doit souvent être modifiée.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
