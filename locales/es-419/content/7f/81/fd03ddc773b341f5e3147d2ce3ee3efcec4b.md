# Sintaxis de métodos

Los métodos en Cairo son similares a las funciones, pero están ligados a un tipo específico a través de traits.

Su primer parámetro siempre es `self`, que representa la instancia sobre la que se llama al método.

Aunque Cairo no permite definir métodos directamente sobre un tipo, puedes lograr la misma funcionalidad si defines un trait y lo implementas para ese tipo.

Aquí tienes un ejemplo de cómo definir un método sobre un tipo `Rectangle` usando un trait:

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

Usar el atributo `#[generate_trait]` simplifica el proceso, porque crea automáticamente el trait que necesitas.

Esto hace que tu código sea más limpio y, al mismo tiempo, permite asociar métodos a tipos específicos.

## Funciones asociadas

Las funciones asociadas son similares a los métodos, pero no operan sobre una instancia de un tipo: no reciben `self` como parámetro.

Estas funciones suelen usarse como constructores o como funciones de utilidad ligadas al tipo.

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

Hacen que sea fácil crear o trabajar con instancias sin necesitar un objeto que ya exista.

Al organizar la funcionalidad relacionada en traits e implementaciones, Cairo permite estructuras de código limpias, modulares y extensibles.
