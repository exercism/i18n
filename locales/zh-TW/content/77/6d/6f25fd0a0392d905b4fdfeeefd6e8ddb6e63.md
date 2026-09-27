# 提示

## 一般

- 計算機的堆疊其實就是一個 Factor 陣列。一個*運算*就是一段 quotation `( stack -- new-stack )`。
- [`sequences`][sequences] 中的`head*`會回傳除了最後`n`個元素以外的所有元素；`last2`則回傳最後兩個。

## 1. 實作加法

- 使用 [`kernel`][kernel] 中的`bi`，把輸入拆成兩條計算路徑：「陣列扣掉最後兩個元素」以及「最後兩個元素的總和」。接著用`suffix`把它們接起來。

## 2. 實作乘法

- 和第 1 個任務的形式相同，只是把`+`換成`*`。

## 3. 套用單一運算

- quotation 的效果是`( stack -- new-stack )`。在`call`上宣告這個效果，編譯器才能對它做型別檢查：`call( stack -- new-stack )`。

## 4. 求值一個程式

- [`sequences`][sequences] 中的`each`會把 quotation 逐一疊代套用到 sequence 上。每一次疊代都會看到目前的堆疊，從程式中取出下一個運算，然後套用它。

## 5. 依名稱求值

- 用 [`assocs`][assocs] 中的`at`在 assoc 裡查詢每個名稱，取得它的運算，然後重複使用`evaluate`。
- [`curry-compose-fry`][fry] 中的 fry quotation `'[ _ at ]` 會閉包住 assoc，讓`map`可以在一次遍歷中把每個名稱換成它的運算。

## 6. 安全地做除法

- [`kernel`][kernel] 中的`throw`會引發錯誤。`zero-divisor-error`已經宣告好了，所以`zero-divisor-error throw`就是呼叫方式。
- 用`if`保護除法路徑，檢查最底下的除數是否為`0`。

[sequences]: https://docs.factorcode.org/content/vocab-sequences.html
[kernel]: https://docs.factorcode.org/content/vocab-kernel.html
[assocs]: https://docs.factorcode.org/content/vocab-assocs.html
[fry]: https://docs.factorcode.org/content/vocab-fry.html
