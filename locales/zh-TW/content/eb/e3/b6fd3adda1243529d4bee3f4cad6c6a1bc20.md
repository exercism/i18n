# 提示

## 一般

- 這個練習的所有部分都依賴位元運算。
  - Exercism 的[學習課程大綱][concept-bitwise-operations]提供了淺顯易懂的入門介紹。
  - Julia 手冊中列出了[位元運算子][ref-bitwise-operators]。
  - `Base`包含各種實用的位元相關函式，包括 [count_ones()][count_ones] 和 [trailing_zeros()][trailing_zeros]。
- 測試盡量不對型別設下硬性規定，但這個練習談的是無號位元組，而[`UInt8`][uint8]值相對容易推理。
  - 引數和回傳值都是`Vector{UInt8}`，
  - `UInt8`值有助於位元遮罩和中間值。
- 十進位數字只會造成干擾，所以`UInt8`字面值請優先使用十六進位（`0xFF`）或二進位（`0b11111111`）。
  - [`bitstring()`][bitstring] 函式在除錯時很有用，因為它會輸出人類可讀的二進位格式。
- 原始訊息會以 8 位元區塊組成的向量傳入，必須轉換成位於高位元的 7 位元區塊，再加上一個作為最低有效位元的同位位元。
  - 使用`&`或`|`的位元遮罩來取出你要的位元。
  - 左移（`<<`）和邏輯右移（`>>>`）運算子很重要。
  - 規劃如何把多餘的位元帶到下一輪處理。
  - 因為需要進位，很難彼此獨立地處理每個輸入位元組，所以使用迴圈（或也許是遞迴）通常比嘗試高階函式來得容易。
  - 編碼後的訊息通常比原始訊息更長（位元組更多），以容納每個位元組的一個同位位元。


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
