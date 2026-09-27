# 提示

## 一般

## 1. 實作 `new()` 方法

- `new()` 方法會接收我們想用來建立`User`實例的引數。它應該回傳一個`User`實例，並帶有指定的 name、age 和 weight。

- 定義與建立結構體的例子請參考[結構體文件][structs]。

## 2. 實作 getter 方法

- `name()`、`age()` 和 `weight()` 方法都是 getter，也就是說，它們負責回傳結構體實例上對應的欄位。

- 在 Cairo 中，除非你明確想要讓函式或方法提早回傳，否則不需要使用 `return` 敘述。一般來說，只要在想要回傳的結果後面省略分號，改用_隱式_回傳會更道地。明確使用 return 並不_算錯_，但情況允許時，善用隱式回傳會更簡潔。

```rust
fn foo() -> i32 {
    1
}
```

- 在結構體上定義方法的更多例子，請參考[方法文件][methods]。

## 3. 實作 setter 方法

- `set_age()` 和 `set_weight()` 方法是 setter，負責用傳入的引數更新結構體實例上對應的欄位。

- 正如這些方法的簽章所示，setter 方法不應該回傳任何東西。

[structs]: https://book.cairo-lang.org/ch05-01-defining-and-instantiating-structs.html
[methods]: https://book.cairo-lang.org/ch05-03-method-syntax.html
