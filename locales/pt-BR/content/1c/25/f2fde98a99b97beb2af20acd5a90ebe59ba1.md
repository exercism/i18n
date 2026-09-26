# Introdução

Muitas vezes é útil agrupar uma coleção de itens e tratar esses grupos como unidades. Em Cairo, chamamos esse grupo de struct, e cada item é um dos campos da struct. Uma struct define o conjunto geral de campos disponíveis, mas um exemplo específico de uma struct é chamado de instância.

Além disso, é possível definir métodos em structs, e esses métodos têm acesso aos campos. Nesse caso, a própria struct é chamada de `self`. Quando um método usa `ref self: SomeStruct`, os campos podem ser alterados, ou seja, mutados. Quando um método usa `self: SomeStruct` ou `self: @SomeStruct`, os campos não podem ser alterados: eles são imutáveis. Controlar a mutabilidade ajuda o borrow-checker a garantir que classes inteiras de bugs de concorrência simplesmente não aconteçam em Cairo.

Neste exercício, você vai implementar dois tipos de métodos em uma struct. O primeiro tipo é geralmente conhecido como getters: eles expõem os campos da struct para o mundo, sem deixar que ninguém mais mude esse valor.

Você também vai implementar métodos de outro tipo, geralmente conhecidos como setters. Eles mudam o valor do campo. Setters não são muito comuns em Cairo: se um campo pode ser modificado livremente, é mais comum simplesmente torná-lo público. Mas eles são úteis se atualizar o campo tiver efeitos colaterais.

Structs são definidas com a palavra-chave `struct`, seguida do nome com inicial maiúscula do tipo que a struct descreve:

```rust
struct Item {}
```

Outros tipos são então trazidos para o corpo da struct como _campos_ dela, cada um com seu próprio tipo:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Uma trait define um conjunto de métodos que podem ser implementados por um tipo (vamos focar em structs aqui, mas traits também podem ser implementadas em enums). Esses métodos podem ser chamados em instâncias do tipo quando essa trait é implementada. As traits são definidas com a palavra-chave `trait` e, dentro delas, definimos as assinaturas dos métodos que queremos que nosso tipo implemente.

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

Por fim, os métodos podem ser definidos em structs dentro de um bloco `impl`, que implementa a trait definida:

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
