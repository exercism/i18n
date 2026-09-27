# 提示

## 1. 判斷你是否需要駕照

- 使用[嚴格相等運算子][mdn-equality-operators]檢查你的輸入是否等於某個字串。
- 使用你在布林概念中學過的兩種[邏輯運算子][mdn-logical-operators]之一，結合這兩項條件。
- 你**不需要** `if`敘述就能解開這道任務。你可以直接回傳你建立的布林運算式。

## 2. 從兩輛可能購買的車輛中做選擇

- 使用[關係運算子][mdn-relational-operators]判斷哪個選項在字典順序中排在前面。
- 然後，根據比較的結果，使用[`if-else`敘述][mdn-if-statement]設定輔助變數的值。
- 最後，組成推薦語句。你可以使用[加法運算子][mdn-addition]將這兩個字串串接起來。

## 3. 估算中古車的價格

- 首先，根據車輛的車齡決定百分比，並將它存到一個輔助變數中。使用指示中提到的[`if-else if-else`敘述][mdn-if-statement]。
- 在這兩個 `if` 條件中，使用[關係運算子][mdn-relational-operators]將車齡與門檻值做比較。
- 計算結果時，將百分比套用到原始價格上。例如，`30% of x` 可以將 `30` 除以 `100` 再乘以 `x` 來算出。

[mdn-equality-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#equality_operators
[mdn-logical-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#binary_logical_operators
[mdn-relational-operators]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators#relational_operators
[mdn-addition]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition
[mdn-if-statement]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
