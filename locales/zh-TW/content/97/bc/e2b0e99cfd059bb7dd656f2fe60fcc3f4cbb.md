# 提示

## 1. 定義 Approval

- [定義代數資料型態][ADT] `Approval`，並為每個必要的選項定義建構子。

## 2. 定義 Cuisine

- [定義代數資料型態][ADT] `Cuisine`，並為每個必要的選項定義建構子。

## 3. 定義 Genre

- [定義代數資料型態][ADT] `Genre`，並為每個必要的選項定義建構子。

## 4. 定義活動

- [定義帶有附帶資料的代數資料型態][ADT-with-data]，用來封裝不同的活動。

## 5. 為活動評分

- 要根據活動的值執行邏輯，最好的方式是使用 [case 運算式][case-expression]。
- 對代數資料型態的 case 進行模式比對，就能存取它的附帶資料。
- 如果想在模式中加入額外的條件，可以在 case 裡使用 [guard][guards]。
- 如果想在單一 case 中捕捉所有其他可能的值，可以使用萬用字元模式 `_`。

[ADT]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#enumeration-types
[ADT-with-data]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#beyond-enumerations
[case-expression]: https://www.schoolofhaskell.com/school/starting-with-haskell/introduction-to-haskell/2-algebraic-data-types#case-expessions
[guards]: https://learnyouahaskell.github.io/syntax-in-functions.html#guards-guards
