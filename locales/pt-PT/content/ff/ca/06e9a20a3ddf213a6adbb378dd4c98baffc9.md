# Sobre

Quando uma variante de um tipo personalizado contém dados, chama-se registo, e cada valor contido reside num _campo_.

```gleam
pub type Rectangle {
  Rectangle(
    Float, // The first field
    Float, // The second field
  )
}
```

Para facilitar a leitura, o Gleam permite etiquetar os campos com um nome.

```gleam
pub type Rectangle {
  Rectangle(
    width: Float,
    height: Float,
  )
}
```

As etiquetas podem ser usadas para dar argumentos ao construtor de um registo em qualquer ordem.

```gleam
let a = Rectangle(height: 10.0, width: 20.0)
let b = Rectangle(width: 20.0, height: 10.0)

a == b
// -> True
```

Quando um tipo personalizado tem apenas uma variante, pode usar-se a sintaxe de acesso `.label` para obter os campos de um registo.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)

rect.height // -> 10.0
rect.width  // -> 20.0
```

A sintaxe de atualização de registos pode ser usada quando um tipo personalizado tem uma única variante, para criar um novo registo a partir de um existente, mas com alguns dos campos substituídos por novos valores.

```gleam
let rect = Rectangle(height: 10.0, width: 20.0)
let tall_rect = Rectangle(..rect, height: 50.0)

tall_rect.height // -> 50.0
tall_rect.width  // -> 20.0
```

As etiquetas também podem ser usadas na correspondência de padrões para extrair valores de registos.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, width: _) if h > 20.0 -> True
    _ -> False
  }
}
```

Se quisermos corresponder apenas a alguns dos campos, podemos usar o operador de propagação `..` para ignorar os restantes campos.

```gleam
pub fn is_tall(rect: Rectangle) {
  case rect {
    Rectangle(height: h, ..) if h > 20.0 -> True
    _ -> False
  }
}
```
