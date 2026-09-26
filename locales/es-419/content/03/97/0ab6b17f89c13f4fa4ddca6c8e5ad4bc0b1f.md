# Pistas

## General

## 1. Implementa el método `new()`

- El método `new()` recibe los argumentos con los que queremos crear una instancia de `User`.
  Debe devolver una instancia de `User` con el nombre, la edad y el peso especificados.

- Consulta la [documentación de structs][structs] para ver ejemplos de cómo definir e instanciar structs.

## 2. Implementa los métodos getter

- Los métodos `name()`, `age()` y `weight()` son getters.
  En otras palabras, se encargan de devolver el campo correspondiente de una instancia de struct.

- No necesitas usar una sentencia `return` en Cairo, a menos que quieras explícitamente que una función o un método devuelva antes de tiempo.
  En caso contrario, es más idiomático aprovechar un retorno _implícito_ omitiendo el punto y coma del resultado que queremos que la función o el método devuelva.
  No está _mal_ usar un retorno explícito, pero es más limpio aprovechar los retornos implícitos cuando sea posible.

```rust
fn foo() -> i32 {
    1
}
```

- Consulta la [documentación de los métodos][methods] para ver más ejemplos de cómo definir métodos en structs.

## 3. Implementa los métodos setter

- Los métodos `set_age()` y `set_weight()` son setters, y se encargan de actualizar el campo correspondiente de una instancia de struct con el argumento que reciben.

- Como especifican las firmas de estos métodos, los métodos setter no deben devolver nada.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
