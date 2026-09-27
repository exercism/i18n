# Sintaxis de métodos

Los métodos en Cairo son similares a las funciones, pero están vinculados a un tipo concreto a través de traits.

Su primer parámetro es siempre `self`, que representa la instancia sobre la que se llama al método.

Aunque Cairo no permite definir métodos directamente en un tipo, puedes conseguir la misma funcionalidad definiendo un trait e implementándolo para ese tipo.

Aquí tienes un ejemplo de cómo definir un método en un tipo `Rectangle` usando un trait:

```rust
#[derive(Copy, Drop)]
struct Rectangle {
    width: u64,
    height: u64,
}

#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn area(self: @Rectangle) -> u64 {
        (*self.width) * (*self.height)
    }
}

fn main() {
    let rect = Rectangle { width: 30, height: 50 };
    println!("Area is {}", rect.area());
}
```

En el ejemplo anterior, el método `area` calcula el área de un rectángulo.

Usar el atributo `#[generate_trait]` simplifica el proceso, ya que te crea automáticamente el trait necesario.

Esto hace que tu código sea más limpio y, al mismo tiempo, permite asociar métodos a tipos concretos.

## Funciones asociadas

Las funciones asociadas son similares a los métodos, pero no operan sobre una instancia de un tipo: no reciben `self` como parámetro.

Estas funciones se suelen usar como constructores o como funciones de utilidad vinculadas al tipo.

```rust
#[generate_trait]
impl RectangleImpl of RectangleTrait {
    fn square(size: u64) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

fn main() {
    let square = RectangleTrait::square(10);
    println!("Square dimensions: {}x{}", square.width, square.height);
}
```

Las funciones asociadas, como `Rectangle::square`, usan la sintaxis `::` y pertenecen al espacio de nombres del tipo.

Facilitan la creación y el uso de instancias sin necesidad de tener un objeto existente.

Al organizar la funcionalidad relacionada en traits e implementaciones, Cairo permite crear estructuras de código limpias, modulares y extensibles.
