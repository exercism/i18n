# Sintaxe de Métodos

Em Cairo, os métodos são semelhantes às funções, mas estão ligados a um tipo específico através de traits.

O primeiro parâmetro é sempre `self`, que representa a instância sobre a qual o método é chamado.

Apesar de Cairo não permitir definir métodos diretamente num tipo, podes obter a mesma funcionalidade definindo um trait e implementando-o para esse tipo.

Eis um exemplo de como definir um método num tipo `Rectangle` através de um trait:

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

No exemplo acima, o método `area` calcula a área de um retângulo.

Usar o atributo `#[generate_trait]` simplifica o processo, porque cria automaticamente o trait de que precisas.

Assim, o teu código fica mais limpo e continuas a poder associar métodos a tipos específicos.

## Funções Associadas

As funções associadas são semelhantes aos métodos, mas não operam sobre uma instância de um tipo: não recebem `self` como parâmetro.

Estas funções são usadas frequentemente como construtores ou como funções utilitárias ligadas ao tipo.

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

As funções associadas, como `Rectangle::square`, usam a sintaxe `::` e pertencem ao espaço de nomes do tipo.

Permitem criar ou manipular instâncias sem precisares de um objeto já existente.

Ao organizar a funcionalidade relacionada em traits e implementações, Cairo permite escrever código limpo, modular e extensível.
