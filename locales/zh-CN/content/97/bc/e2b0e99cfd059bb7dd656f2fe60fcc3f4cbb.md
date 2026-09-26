# 提示

## 1. 定义批准

- [定义代数数据类型][ADT] `Approval`，并为每个必需选项提供一个构造器。

## 2. 定义菜系

- [定义代数数据类型][ADT] `Cuisine`，并为每个必需选项提供一个构造器。

## 3. 定义电影类型

- [定义代数数据类型][ADT] `Genre`，并为每个必需选项提供一个构造器。

## 4. 定义活动

- [定义带关联数据的代数数据类型][ADT-with-data]，用它封装不同的活动。

## 5. 为活动评分

- 要根据活动的值执行相应的逻辑，最好的方式是使用 [case 表达式][case-expression]。
- 对代数数据类型的 case 进行模式匹配，就能访问它的关联数据。
- 要为模式添加额外的条件，可以在 case 中使用[守卫][guards]。
- 如果想在一个 case 里捕获所有其他可能的值，可以使用通配符模式 `_`。

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
