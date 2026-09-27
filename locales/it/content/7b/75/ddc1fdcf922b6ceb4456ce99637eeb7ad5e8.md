# Tuple

Una [tupla][tuple] è una lista ordinata e finita di elementi, immutabile. Le tuple richiedono che tutte le posizioni abbiano un tipo fisso. Questo, a sua volta, significa che il compilatore sa quale tipo si trova in ogni posizione. I tipi usati in una tupla possono essere diversi in ogni posizione, ma devono essere noti al momento della compilazione.

## Creare una tupla

A seconda che i tipi dei valori della tupla possano essere interpretati in fase di compilazione, la tupla si può creare in modi diversi. Se i valori sono noti al momento della compilazione, la tupla si può creare usando la sintassi letterale delle tuple; altrimenti è necessario dichiararli esplicitamente. È anche importante che i tipi dei valori corrispondano ai tipi specificati nella tupla e che il numero dei valori corrisponda al numero dei tipi specificati. Ecco un esempio di definizione tramite la sintassi letterale delle tuple:

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

C'è anche la possibilità di creare una tupla usando la classe `Tuple`.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

In alternativa, puoi specificare esplicitamente il tipo della variabile a cui assegni la tupla.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

Specificare esplicitamente il tipo della tupla può essere utile, perché permette di definire che una posizione contenga un tipo unione. Questo significa che una posizione può contenere più tipi.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Conversione

### Creare una tupla da un array

Puoi creare una tupla da un array usando il metodo `from` della classe `Tuple`. Per farlo, devi specificare il tipo della tupla.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Conversione in array

Puoi convertire una tupla in un array usando il metodo `to_a`. Il tipo degli elementi dell'array risultante è l'unione dei tipi di ogni campo della tupla.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Accedere agli elementi

Come gli array, le tuple hanno indici che partono da zero: il primo elemento si trova all'indice 0. A differenza degli array, però, il tipo di ogni elemento è fisso e noto al momento della compilazione; di conseguenza, quando indicizzi una tupla, il tipo dell'elemento è specifico della posizione. Per accedere a un elemento di una tupla, puoi usare l'operatore `[]`.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

Un'altra differenza rispetto all'accesso agli elementi di un array è che, se l'indice è specificato, il compilatore verifica che sia entro i limiti della tupla. Questo significa che otterrai un errore in fase di compilazione invece di un errore in fase di esecuzione.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

Se invece l'indice è memorizzato in una variabile, il compilatore non potrà verificare in fase di compilazione che sia entro i limiti della tupla e darà invece un errore in fase di esecuzione.

## Sottotupla

Puoi ottenere una sottotupla da una tupla usando l'operatore `[]` con un intervallo. Quello che viene restituito è una nuova tupla con gli elementi dell'intervallo specificato. L'intervallo deve essere indicato in fase di compilazione, altrimenti il compilatore non potrà conoscere i tipi degli elementi della sottotupla. Questo significa che l'intervallo deve essere un letterale di intervallo e non essere assegnato a una variabile.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Quando usare una tupla

Le tuple sono utili quando vuoi raggruppare un numero fisso di valori di cui conosci i tipi al momento della compilazione. Questo perché le tuple richiedono meno memoria e sono più veloci degli array, grazie alla loro immutabilità. Un altro caso d'uso è restituire più valori da un metodo. È particolarmente utile se i valori hanno tipi diversi, dato che ogni posizione della tupla può avere un tipo diverso.

Non conviene usare le tuple quando serve una struttura dati che possa crescere o ridursi di dimensione, o che debba essere modificata spesso.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
