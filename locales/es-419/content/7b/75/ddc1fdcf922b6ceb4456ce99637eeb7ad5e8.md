# Tuplas

Una [tupla][tuple] es una lista ordenada y finita de elementos que es inmutable.
Las tuplas requieren que todas las posiciones tengan un tipo fijo.
Esto, a su vez, significa que el compilador sabe qué tipo hay en cada posición.
Los tipos usados en una tupla pueden ser diferentes en cada posición, pero los tipos deben conocerse en tiempo de compilación.

## Crear una tupla

Según si los tipos de los valores de la tupla se pueden interpretar durante la compilación, la tupla se puede crear de distintas maneras.
Si los valores se conocen en tiempo de compilación, la tupla se puede crear con la sintaxis de literal de tupla; de lo contrario, hay que declararlos de forma explícita.
También es importante que los tipos de los valores coincidan con los tipos especificados en la tupla y que la cantidad de valores coincida con la cantidad de tipos especificados.
Aquí tienes un ejemplo de definición con la sintaxis de literal de tupla:

```crystal
tuple = {1, "foo", 'c'} # Tuple(Int32, String, Char)
```

También existe la posibilidad de crear una tupla usando la clase `Tuple`.

```crystal
tuple = Tuple(Int32, String, Char).new(1, "foo", 'c')
```

Como alternativa, puedes especificar explícitamente el tipo de la variable a la que asignas la tupla.

```crystal
tuple : Tuple(Int32, String, Char) = {1, "foo", 'c'}
```

Especificar explícitamente el tipo de la tupla puede ser útil, ya que permite definir que una posición contenga un tipo unión.
Esto significa que una posición puede contener varios tipos.

```crystal
tuple : Tuple(Int32 | String, String, Char) = {1, "foo", 'c'}
```

## Conversión

### Crear una tupla a partir de un array

Puedes crear una tupla a partir de un array con el método `from` de la clase `Tuple`.
Esto requiere que se especifique el tipo de la tupla.

```crystal
array = [1, "foo", 'c']
tuple = Tuple(Int32, String, Char).from(array)
```

### Conversión a array

Puedes convertir una tupla en un array con el método `to_a`.
El tipo de los elementos del array resultante es la unión de los tipos de cada campo de la tupla.

```crystal
tuple = {1, "foo", 'c'}
array = tuple.to_a
array # => [1, "foo", 'c']
```

## Acceder a los elementos

Al igual que los arrays, las tuplas tienen índices que empiezan en cero, lo que significa que el primer elemento está en el índice 0.
Sin embargo, a diferencia de los arrays, el tipo de cada elemento es fijo y se conoce en tiempo de compilación; por lo tanto, al indexar una tupla, el tipo del elemento es específico de cada posición.
Para acceder a un elemento de una tupla, puedes usar el operador `[]`.

```crystal
array = [1, "foo", 'c']
array[0]         # => 1
typeof(array[0]) # => Int32 | String | Char

tuple = {1, "foo", 'c'}
tuple[0]         # => 1
typeof(tuple[0]) # => Int32
```

Otra diferencia al acceder a elementos de un array es que, si el índice está especificado, el compilador verifica que el índice esté dentro de los límites de la tupla.
Esto significa que obtendrás un error en tiempo de compilación en lugar de un error en tiempo de ejecución.

```crystal
tuple = {1, "foo", 'c'}
tuple[3]
# => Error: index out of bounds for Tuple(Int32, String, Char) (3 not in -3..2)
```

Sin embargo, si el índice está guardado en una variable, el compilador no podrá verificar en tiempo de compilación si el índice está dentro de los límites de la tupla y, en su lugar, dará un error en tiempo de ejecución.

## Subtupla

Puedes obtener una subtupla de una tupla usando el operador `[]` con un rango.
Lo que se devuelve es una nueva tupla con los elementos del rango especificado.
El rango debe darse en tiempo de compilación; de lo contrario, el compilador no podrá saber los tipos de los elementos de la subtupla.
Esto significa que el rango tiene que ser un literal de rango y no estar asignado a una variable.

```crystal
tuple = {1, "foo", 'c'}
subtuple = tuple[0..1] # Tuple(Int32, String)

i = 0..1
tuple[i]
# Error: Tuple#[](Range) can only be called with range literals known at compile-time
```

## Cuándo usar una tupla

Las tuplas son útiles cuando quieres agrupar una cantidad fija de valores cuyos tipos se conocen en tiempo de compilación.
Esto se debe a que las tuplas requieren menos memoria y son más rápidas que los arrays gracias a su inmutabilidad.
Otro caso de uso es devolver varios valores desde un método.
Esto es especialmente útil si los valores tienen tipos diferentes, ya que cada posición de la tupla puede tener un tipo distinto.

No conviene usar tuplas cuando se necesita una estructura de datos que pueda crecer o reducir su tamaño, o que tenga que modificarse con frecuencia.

[tuple]: https://crystal-lang.org/reference/syntax_and_semantics/literals/tuple.html
