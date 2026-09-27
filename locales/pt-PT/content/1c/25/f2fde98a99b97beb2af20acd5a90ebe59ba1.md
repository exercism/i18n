# Introdução

Muitas vezes, é útil agrupar uma coleção de itens e tratar esses grupos como unidades. Em Cairo, chamamos a esse grupo uma struct, e a cada item um dos campos da struct. Uma struct define o conjunto geral de campos disponíveis, mas um exemplo concreto de uma struct chama-se instância.

Além disso, as structs podem ter métodos definidos nelas, que têm acesso aos campos. Nesse caso, a própria struct é designada por `self`. Quando um método usa `ref self: SomeStruct`, os campos podem ser alterados, ou mutados. Quando um método usa `self: SomeStruct` ou `self: @SomeStruct`, os campos não podem ser alterados: são imutáveis. Controlar a mutabilidade ajuda o borrow-checker a garantir que classes inteiras de bugs de concorrência simplesmente não acontecem em Cairo.

Neste exercício, vais implementar dois tipos de métodos numa struct. Os primeiros são geralmente conhecidos como getters: expõem os campos da struct ao mundo exterior, sem deixar que mais ninguém mute esse valor.

Vais também implementar métodos de outro tipo, geralmente conhecidos como setters. Estes alteram o valor do campo. Os setters não são muito comuns em Cairo. Se um campo pode ser modificado livremente, é mais comum torná-lo simplesmente público. No entanto, são úteis se a atualização do campo dever produzir efeitos secundários.

As structs são definidas com a palavra-chave `struct`, seguida do nome do tipo que a struct descreve, com a primeira letra maiúscula:

```rust
struct Item {}
```

De seguida, trazem-se tipos adicionais para o corpo da struct como _campos_ da struct, cada um com o seu próprio tipo:

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

Uma trait define um conjunto de métodos que podem ser implementados por um tipo (vamos focar-nos aqui nas structs, mas as traits também podem ser implementadas em enums). Estes métodos podem ser chamados em instâncias do tipo quando esta trait é implementada. As traits são definidas com a palavra-chave `trait` e, dentro das traits, definimos as assinaturas dos métodos que queremos que o nosso tipo implemente.

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
