# Introducción

Muchas veces resulta útil agrupar una colección de elementos y tratar esos grupos como unidades.
En Cairo, a ese grupo lo llamamos struct, y cada elemento es uno de los campos del struct.
Un struct define el conjunto general de campos disponibles, pero un ejemplo concreto de un struct se llama instancia.

Además, los structs pueden tener métodos definidos sobre ellos, que tienen acceso a los campos.
En ese caso, el propio struct se conoce como `self`.
Cuando un método usa `ref self: SomeStruct`, los campos se pueden cambiar, o mutar.
Cuando un método usa `self: SomeStruct` o `self: @SomeStruct`, los campos no se pueden cambiar: son inmutables.
Controlar la mutabilidad ayuda a que el verificador de préstamos garantice que ciertas clases enteras de errores de concurrencia simplemente no ocurran en Cairo.

En este ejercicio, vas a implementar dos tipos de métodos en un struct.
Los primeros se conocen generalmente como getters: exponen los campos del struct al mundo sin dejar que nadie más mute ese valor.

También vas a implementar métodos de otro tipo, conocidos generalmente como setters.
Estos cambian el valor del campo.
Los setters no son muy comunes en Cairo (si un campo se puede modificar libremente, lo más común es simplemente hacerlo público), pero son útiles si actualizar el campo debe tener efectos secundarios.

Los structs se definen con la palabra clave `struct`, seguida del nombre del tipo que describe el struct, con la primera letra en mayúscula:

```rust
struct Item {}
```

Luego se agregan tipos adicionales al cuerpo del struct como _campos_ del struct, cada uno con su propio tipo:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Un trait define un conjunto de métodos que un tipo puede implementar (aquí nos centraremos en los structs, pero los traits también se pueden implementar en enums).
Estos métodos se pueden llamar sobre instancias del tipo cuando se implementa ese trait.
Los traits se definen con la palabra clave `trait` y dentro de ellos definimos las firmas de los métodos que queremos que implemente nuestro tipo.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Por último, los métodos se pueden definir en structs dentro de un bloque `impl`, que implementa el trait definido:

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
