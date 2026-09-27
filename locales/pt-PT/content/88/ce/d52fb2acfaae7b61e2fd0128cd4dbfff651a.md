# Introdução

Às vezes, um determinado trecho de código precisa de ser usado mais do que uma vez. Se for esse o caso, pode ser conveniente colocar o código numa função. Normalmente, uma função executa apenas uma ação específica. Em Rust, a palavra-chave ```fn``` é usada para definir funções. O código que pertence à função está sempre entre chavetas (ou seja, `{}`). A função chamada `main` é especial porque é o ponto de entrada dos programas. A partir dessa função podes chamar outras funções.

```rust
fn say_my_name(name: &str) -> &str {
    name
}
```

As funções também podem receber parâmetros, como ```name: &str``` em ```say_my_name()```. As funções também podem devolver valores, como `-> &str` acima.
