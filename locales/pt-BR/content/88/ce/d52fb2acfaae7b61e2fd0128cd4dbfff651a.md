# Introdução

Às vezes, um trecho de código precisa ser usado mais de uma vez. Se for esse o caso, pode ser conveniente colocar o código em uma função. Uma função geralmente realiza apenas uma ação específica. Em Rust, a palavra-chave ```fn``` é usada para definir funções. O código que pertence à função fica sempre entre chaves (ou seja, `{}`). A função chamada `main` é especial porque é o ponto de entrada dos programas. A partir dessa função, você pode chamar outras funções.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

As funções também podem receber parâmetros, como ```name: &str``` em ```say_my_name()```. As funções também podem retornar valores, como `-> &str` acima.
