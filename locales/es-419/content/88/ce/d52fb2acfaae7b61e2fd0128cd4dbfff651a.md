# Introducción

A veces es necesario usar un mismo fragmento de código más de una vez. Si es así, puede ser conveniente poner ese código en una función. Por lo general, una función realiza solo una acción específica. En Rust, la palabra clave ```fn``` se usa para definir funciones. El código que pertenece a la función siempre va entre llaves (es decir, `{}`). La función llamada `main` es especial porque es el punto de entrada de los programas. Desde esa función puedes llamar a otras funciones.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

Las funciones también pueden recibir parámetros, como ```name: &str``` en ```say_my_name()```. Las funciones también pueden devolver valores, como `-> &str` de arriba.
