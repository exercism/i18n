# 提示

## 1. 定義自訂型別

抽象型別和型別繼承已在[複合型別][composite]概念中討論過。

## 2. 取得寵物的名稱

- 對 Dog 和 Cat 來說這很簡單，但對備援方法的測試很有幫助。

## 3. 定義貓和狗相遇時會發生什麼事

- 貓和狗相遇有多少種組合？
- 記得，貓遇到狗的反應和狗遇到貓的反應不同。
- 我們需要第一個引數的回應：`meet(a, b)`中的`a`。

## 4. 定義兩個實體之間的相遇

- 回傳值會是比`meet()`更長的字串。
- `encounter()`只用一個方法就好。
- 組合回傳值時，[字串內插][interpolation]是你的好幫手。

## 5. 定義寵物之間相遇的備援反應

- 現在第二個引數是`Cat`或`Dog`以外的`Pet`，所以要新增一個`meet`方法。
- 宣告抽象的參數型別，或透過參數化方法加以限制，是達成這件事的兩種方式。

## 6. 定義寵物遇到不認識的東西時的備援

- 現在第二個引數可以是任何東西。

## 7. 定義通用的備援

- 現在兩個引數都可以是任何東西。
- 練習結束時，你會有 7 個`meet`方法。

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
