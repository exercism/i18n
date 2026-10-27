# Вступ
## Switch

Конструкція [switch][switch] дозволяє порівнювати значення з кількома можливими значеннями, які можуть збігтися.
Вона дає змогу писати лаконічніший код, ніж із кількома конструкціями `else-if`.
Конструкція `switch` починається з ключового слова `switch`, за яким іде значення для порівняння.
Далі варіанти описують за допомогою ключового слова `case`, за яким указують значення для порівняння.
Ключове слово `default` використовують, щоб задати типовий варіант, коли жоден з варіантів не збігається.
Як і конструкції `else-if`, конструкції `switch` виконують лише блок коду, повʼязаний із першим варіантом, що збігся.

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

Розгляньмо такий приклад:

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

Натомість це можна записати так:

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

## Цикли `while`

[Цикл while][while-loops] - це інструкція керування потоком, яка дозволяє виконувати код, поки певна умова істинна.
Swift надає два різновиди циклів `while`: цикл `while` і цикл `repeat-while`.
Умова циклу `while` перевіряється перед виконанням тіла циклу; якщо умова хибна, тіло циклу не виконається взагалі.
Цикли `while` у Swift мають таку структуру:

```swift
while <#condition#> {
  <#code#>
}
```

Тут цикл виконуватиметься, доки count більше за 0, і надрукує числа 2, 1 та «Liftoff!».

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

[Цикл repeat-while][while-loops] схожий на цикл `while`, але умова перевіряється після виконання тіла циклу.
Це означає, що тіло циклу виконується принаймні один раз, навіть якщо умова хибна.
Цикли `repeat-while` у Swift мають таку структуру:

```swift
repeat {
  <#code#>
} while <#condition#>
```

Тут цикл виконається лише один раз, оскільки умова хибна.
Оскільки це цикл `repeat-while`, тіло циклу виконається один раз, перш ніж перевірять умову.

```swift
var count = 2
repeat {
  print("\(count)…")
} while count < 0
print("Liftoff!")
```

## Передача керування

Swift надає інструкції передачі керування, які змінюють потік виконання циклів і конструкцій `switch`.
Крім `return`, Swift має `continue`, `break`, мітки циклів і `fallthrough`.

### Continue

Інструкція `continue` каже циклу припинити виконання поточної ітерації й одразу почати наступну.
У циклі `while` або `repeat-while` вона одразу переходить до перевірки умови.
У циклі `for-in` вона переходить до наступного елемента послідовності.

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

Інструкція `break` негайно завершує весь цикл або конструкцію `switch`.
Виконання продовжується з першого рядка коду після циклу чи конструкції `switch`.

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

### Інструкції з мітками

У вкладених циклах буває потрібно, щоб `break` або `continue` впливали на зовнішній цикл, а не на найвнутрішніший.
Цикл можна позначити міткою, поставивши перед ним імʼя та двокрапку (`labelName:`).
Далі цю мітку можна передати `break` або `continue`:

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
