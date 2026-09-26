# Sintaxe de métodos

Métodos em Cairo são parecidos com funções, mas ficam ligados a um tipo específico por meio de traits.

O primeiro parâmetro deles é sempre `self`, que representa a instância sobre a qual o método é chamado.

Embora o Cairo não permita definir métodos diretamente em um tipo, você consegue a mesma funcionalidade definindo um trait e implementando-o para o tipo.

Veja um exemplo de como definir um método em um tipo `Rectangle` usando um trait:

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

Usar o atributo `#[generate_trait]` simplifica o processo, criando automaticamente o trait necessário para você.

Isso deixa seu código mais limpo e ainda permite associar métodos a tipos específicos.

## Funções associadas

As funções associadas são parecidas com métodos, mas não operam sobre uma instância de um tipo: elas não recebem `self` como parâmetro.

Essas funções costumam ser usadas como construtores ou funções utilitárias ligadas ao tipo.

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

As funções associadas, como `Rectangle::square`, usam a sintaxe `::` e ficam no namespace do tipo.

Elas facilitam criar ou trabalhar com instâncias sem precisar de um objeto já existente.

Ao organizar funcionalidades relacionadas em traits e implementações, o Cairo possibilita estruturas de código limpas, modulares e extensíveis.
