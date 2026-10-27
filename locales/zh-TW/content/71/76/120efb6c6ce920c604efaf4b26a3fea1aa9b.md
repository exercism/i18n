# 提示

## 一般

- 實作會回傳 JSON 字串的純函式；你不需要執行網頁伺服器。

- Roc 內建提供`Json.parse`和`Json.to_str`。在解析輔助函式的回傳值上加上型別標註，就能讓`Json.parse`知道該解碼哪種記錄結構。

- `payload ?: Str`欄位是選填的：由樁的記錄模式綁定的`payload`，會是`Ok(text)`或`Err(MissingField)`。
