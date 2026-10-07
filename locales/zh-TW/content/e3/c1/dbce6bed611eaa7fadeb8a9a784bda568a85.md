# 補充說明

計算字母的數量，忽略大小寫與非字母的字元，並回傳一個把小寫字母對應到其數量的字典。

使用[roc-parallel 平台](https://github.com/ageron/roc-parallel)的`pf.Parallel.map!(items, { workers, task })`，以純`task`函式平行處理給定的`items`，透過多個執行緒（由`workers`指定）同時進行。所有項目處理完畢後，結果會依輸入順序回傳。你只需要編輯`ParallelLetterFrequency.roc`。

提示：我們建議你使用[Unicode 函式庫](https://github.com/roc-lang/unicode)來做大小寫轉換和字母偵測。特別是看看`unicode.Case.to_lower`、`unicode.GeneralCategory.of_scalar`、`unicode.Scalar.iter`和`unicode.Scalar.to_str`。把字母視為 Unicode 純量值；不需要 Unicode 正規化。

注意：與大多數其他練習不同，這個練習使用具有作用的函式。目前 Roc 的`expect`敘述還無法呼叫具有作用的函式，所以這個練習的測試完全不會用到`expect`或`roc test`。相反地，測試是透過`roc --opt=speed`執行的，而 Roc 程式碼回傳的任何錯誤都會由平台以和平常不同的格式回報。

你也可以去看看`bank-account`練習，它探討了並行的另一個面向：安全地將更新套用到共享狀態。
