# Dicas

## Geral

## 1. Implementar o método `new()`

- O método `new()` recebe os argumentos com que queremos instanciar um `User`.
  Deve devolver uma instância de `User` com o nome, a idade e o peso especificados.

- Vê a [documentação sobre structs][structs] para veres exemplos de como definir e instanciar structs.

## 2. Implementar os métodos getter

- Os métodos `name()`, `age()` e `weight()` são getters.
  Por outras palavras, são responsáveis por devolver o campo correspondente de uma instância de struct.

- Não precisas de usar uma instrução `return` em Cairo, a menos que queiras expressamente que uma função ou um método devolva algo antes do fim.
  Caso contrário, é mais idiomático usar uma devolução _implícita_, omitindo o ponto e vírgula do resultado que queres que a função ou o método devolvam.
  Não é _errado_ usar uma devolução explícita, mas é mais limpo aproveitar as devoluções implícitas sempre que possível.

```rust
fn foo() -> i32 {
    1
}
```

- Vê a [documentação sobre métodos][methods] para veres mais exemplos de definição de métodos em structs.

## 3. Implementar os métodos setter

- Os métodos `set_age()` e `set_weight()` são setters, responsáveis por atualizar o campo correspondente de uma instância de struct com o argumento recebido.

- Tal como indicam as assinaturas destes métodos, os métodos setter não devem devolver nada.

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
