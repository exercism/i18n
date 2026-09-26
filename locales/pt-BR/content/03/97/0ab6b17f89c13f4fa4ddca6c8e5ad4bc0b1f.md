# Dicas

## Geral

## 1. Implemente o método `new()`

- O método `new()` recebe os argumentos com os quais queremos instanciar um `User`.
  Ele deve retornar uma instância de `User` com o nome, a idade e o peso especificados.

- Veja a [documentação de structs][structs] para ver exemplos de como definir e instanciar structs.

## 2. Implemente os métodos getters

- Os métodos `name()`, `age()` e `weight()` são getters.
  Em outras palavras, eles são responsáveis por retornar o campo correspondente de uma instância de struct.

- Não é preciso usar uma instrução `return` em Cairo, a menos que você queira explicitamente que uma função ou método retorne antes do fim.
  Caso contrário, é mais idiomático usar um retorno _implícito_, omitindo o ponto e vírgula do resultado que queremos que a função ou método retorne.
  Usar um retorno explícito não é _errado_, mas é mais limpo aproveitar os retornos implícitos quando possível.

```rust
fn foo() -> i32 {
    1
}
```

- Veja a [documentação de métodos][methods] para ver mais exemplos de como definir métodos em structs.

## 3. Implemente os métodos setters

- Os métodos `set_age()` e `set_weight()` são setters, responsáveis por atualizar o campo correspondente de uma instância de struct com o argumento de entrada.

- Como as assinaturas desses métodos indicam, os métodos setters não devem retornar nada.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
