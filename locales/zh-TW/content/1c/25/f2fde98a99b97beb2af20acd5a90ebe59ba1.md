# 簡介

我們經常需要把一群項目組成一個集合，並把這些群組當作單位來處理。在 Cairo 中，我們把這樣的群組稱為結構體，而其中的每個項目就是結構體的欄位。結構體定義了可用的欄位集合，而結構體的某個具體例子則稱為實例。

除此之外，結構體還能定義方法，讓方法可以存取這些欄位。在這種情況下，結構體本身會被稱為`self`。當方法使用`ref self: SomeStruct`時，欄位可以被改變，也就是被修改。當方法使用`self: SomeStruct`或`self: @SomeStruct`時，欄位就無法改變：它們是不可變的。控制可變性可以幫助借用檢查器確保某整類的並行 bug 根本不會在 Cairo 中發生。

在本練習中，你將在結構體上實作兩種方法。第一種通常稱為 getter：它們把結構體的欄位公開給外界，但不允許其他人修改那個值。

你還將實作另一種類型的方法，通常稱為 setter。它們會改變欄位的值。setter 在 Cairo 中並不常見（如果某個欄位可以自由修改，通常直接把它設為公開就好），但如果更新欄位時需要產生副作用，它們就很有用。

結構體是用`struct`關鍵字定義的，後面接上該結構體所描述型別的首字母大寫名稱：

```rust
struct Item {}
```

接著，其他型別會以*欄位*的形式被帶進結構體中，每個欄位都有自己的型別：

```rust
struct Item {
    name: String,
    weight: f32,
    worth: u32,
}
```

trait 定義了一組可以由某個型別實作的方法（這裡我們會把重點放在結構體上，不過 trait 也可以實作在列舉上）。當某個型別實作了這個 trait，就能在該型別的實例上呼叫這些方法。trait 是用`trait`關鍵字定義的，而在 trait 之中，我們會定義希望自己的型別實作的方法簽章。

```rust
trait ImplTrait {
    // Define the method signature
    fn new() -> Item;
}
```

最後，方法可以定義在結構體裡的`impl`區塊中，藉此實作所定義的 trait：

```rust
impl ItemImpl of ImplTrait {
    // initializes and returns a new instance of our Item struct
    fn new() -> Item {
        Item {}
    }
}
```
