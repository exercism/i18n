# Introducción

A veces, un fragmento de código concreto tiene que usarse más de una vez. Si es el caso, puede resultar útil meter ese código en una función. Por lo general, una función solo realiza una acción concreta. En Rust, la palabra clave ```fn``` se usa para definir funciones. El código que pertenece a la función siempre va entre llaves (es decir, `{}`). La función llamada `main` es especial porque es el punto de entrada de los programas. Desde esa función puedes llamar a otras funciones.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

Las funciones también pueden recibir parámetros, como ```name: &str``` en ```say_my_name()```. Las funciones también pueden devolver valores, como `-> &str` arriba.
