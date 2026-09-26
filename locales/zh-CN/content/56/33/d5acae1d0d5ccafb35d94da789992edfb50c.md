# 简介

代数数据类型（Algebraic Data Type，ADT）表示固定数量的具名情形。ADT 的每个值都恰好对应其中一种具名情形。

定义 ADT 使用`data`关键字，各个情形之间用竖线（`|`）分隔。如果所有情形都没有关联数据，那么这个 ADT 就类似于其他语言通常所说的_枚举_（_enum_）。

```haskell
data Season
  = Spring
  | Summer
  | Autumn
  | Winter
```

ADT 的每个情形都可以选择性地关联数据，不同的情形也可以关联不同类型的数据。当情形带有数据时，就需要提供一个构造子。

```haskell
data Number
  = NInt Int      --'NInt' is the constructor for an Int Number.
  | NFloat Float  --'NFloat' is the constructor for an Float Number.
  | Invalid       --'Invalid' does not have data associated to it.
```

为某个特定情形创建值，只需引用它的名字（例如 `NInt 22`）。由于情形名本身就是构造子函数，关联的数据可以像普通的函数实参一样传入。

ADT 具有_结构相等性_，也就是说，属于同一情形、且带有相同（可选）数据的两个值是等价的。

虽然可以用`if/else`表达式来处理 ADT，但更推荐的做法是使用 _case_ 语句进行模式匹配：

```haskell
add1 :: Number -> String
add1 number =
    case number of
      NInt    i -> show (i + 1)
      NFloat  f -> show (f + 1.0)
      Invalid   -> error "Invalid input"
```
