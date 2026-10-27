# Introducción
## Switch

Una [sentencia switch][switch] te permite comparar un valor con varios valores posibles.
Te permite escribir código más conciso que usando varias sentencias `else-if`.
Una sentencia switch empieza con la palabra clave `switch`, seguida del valor que se va a comparar.
Después puedes definir los casos con la palabra clave `case`, seguida del valor con el que se compara.
La palabra clave `default` se usa para definir el caso predeterminado cuando ninguno de los casos coincide.
Al igual que las sentencias `else-if`, las sentencias `switch` solo ejecutan el bloque de código asociado con el primer caso que coincida.

```swift
switch value {
case 1:
    print("One")
case 2:
    print("Two")
default:
    print("Other")
}
```

Considera el siguiente ejemplo:

```swift
if str == "apple" {
    print("Let's bake an apple crumble")
} else if str == "lemon" {
    print("Let's bake a lemon meringue pie!")
} else if str == "peach" {
    print("Let's bake a peach pie!")
} else {
    print("Let's buy ice cream.")
}
```

Esto también podría escribirse así:

```swift
switch str {
case "apple":
    print("Let's bake an apple crumble")
case "lemon":
    print("Let's bake a lemon meringue pie!")
case "peach":
    print("Let's bake a peach pie!")
default:
    print("Let's buy ice cream.")
}
```

## Bucles while

Un [bucle while][while-loops] es una sentencia de flujo de control que permite ejecutar código mientras cierta condición sea verdadera.
Swift ofrece dos tipos de bucles while: el bucle while y el bucle repeat-while.
La condición del bucle while se evalúa antes de que se ejecute el cuerpo del bucle; si la condición es falsa, el cuerpo del bucle no se ejecutará en absoluto.
Los bucles while en Swift tienen la siguiente estructura:

```swift
while <#condition#> {
  <#code#>
}
```

Aquí el bucle se ejecutará mientras count sea mayor que 0, y por lo tanto imprimirá los números 2, 1 y «Liftoff!».

```swift
var count = 2
while count > 0 {
  print("\(count)…")
  count -= 1
}
print("Liftoff!")

// prints:
// 2…
// 1…
// Liftoff!
```

Un [bucle repeat-while][while-loops] es similar a un bucle while, pero la condición se evalúa después de que se ejecuta el cuerpo del bucle.
Esto significa que el cuerpo del bucle siempre se ejecutará al menos una vez, incluso si la condición es falsa.
Los bucles repeat-while en Swift tienen la siguiente estructura:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Aquí el bucle solo se ejecutará una vez, ya que la condición es falsa.
Como es un bucle repeat-while, el cuerpo del bucle se ejecutará una vez antes de que se evalúe la condición.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Transferencia de control

Swift proporciona sentencias de transferencia de control para alterar el flujo de ejecución de los bucles y de las sentencias switch.
Además de `return`, Swift incluye `continue`, `break`, las etiquetas de bucle y `fallthrough`.

### Continue

La sentencia `continue` le indica a un bucle que deje de ejecutar la iteración actual y que empiece la siguiente de inmediato.
En un bucle `while` o `repeat-while`, salta directamente a la comprobación de la condición.
En un bucle `for-in`, avanza al siguiente elemento de la secuencia.

```swift
var count = 1
while count < 6 {
    count += 1
    if count == 4 {
        continue
    }
    print(count)
}

// Prints:
// 2
// 3
// 5
// 6
```

### Break

La sentencia `break` sale de inmediato de un bucle o de una sentencia switch completa.
La ejecución se reanuda en la primera línea de código que sigue al bucle o al switch.

```swift
for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    if !fruit.count.isMultiple(of: 2) {
        break
    }
    print(fruit)
}

// Prints:
// banana
// grapes
```

### Sentencias etiquetadas

Cuando los bucles están anidados, puede que quieras que `break` o `continue` afecten a un bucle externo en lugar del bucle más interno.
Puedes etiquetar un bucle anteponiendo un nombre y dos puntos (`labelName:`).
Después puedes pasar esa etiqueta a `break` o a `continue`:

```swift
outerLoop: for fruit in ["banana", "grapes", "apple", "strawberry", "kiwi", "lemon"] {
    print("\n--- \(fruit) ---")
    for letter in fruit {
        guard letter != "n" else {
            break outerLoop
        }
        print(letter)
    }
}

// Prints:
// --- banana ---
// b
// a
```

[control-transfer]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Control-Transfer-Statements
[fallthrough]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Fallthrough
[while-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#While-Loops
[repeat-loops]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Repeat-While
[switch]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/#Switch
