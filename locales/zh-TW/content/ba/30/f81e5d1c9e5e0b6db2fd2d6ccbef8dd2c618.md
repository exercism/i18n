# 提示

## 一般

- Factor 中的字元是整數（Unicode 碼點），所以數值的`<`、`>`、`=`可以直接使用。
- 述詞與大小寫轉換都在[`unicode`][unicode]裡。
- 你回傳的符號（`less`、`big`、`alpha` 等）必須先宣告才能使用；用`SYMBOLS: ... ;`把它們群組起來。

## 1. 比較兩個字元

- 使用來自[`math`][math]的`<`和`>`。
- 用[`combinators`][combinators]的`cond`包住這三種情況。

## 2. 判斷大小寫

- `LETTER?`是大寫的述詞，`letter?`則是小寫的述詞。

## 3. 改變大小寫

- `ch>upper`和`ch>lower`是逐字元的轉換器（字串層級的`>upper`/`>lower`也存在，不過這裡你只有一個字元）。

## 4. 判斷類型

- 你在`cond`裡的順序很重要。`Letter?`會符合大寫*或*小寫，所以它應該排在任何針對特定大小寫的測試之前。

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
