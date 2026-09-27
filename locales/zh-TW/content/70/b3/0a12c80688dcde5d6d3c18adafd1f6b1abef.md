# 說明

在這個練習裡，你會處理一行行的日誌。

每一行日誌都是格式如下的字串：`"[<LEVEL>]: <MESSAGE>"`。

日誌層級有三種：

- `INFO`
- `WARNING`
- `ERROR`

你有三個任務，每個任務都會拿到一行日誌，並要你對它做點處理。

## 1. 從日誌行取得訊息

實作`message`函式，回傳日誌行裡的訊息：

```julia-repl
julia> message("[ERROR]: Invalid operation")
"Invalid operation"
```

開頭或結尾的空白都應該移除：

```julia-repl
julia> message("[WARNING]:  Disk almost full\r\n")
"Disk almost full"
```

## 2. 從日誌行取得日誌層級

實作`log_level`函式，回傳日誌行的日誌層級，而且要以小寫回傳：

```julia-repl
julia> log_level("[ERROR]: Invalid operation")
"error"
```

## 3. 重新格式化日誌行

實作`reformat`函式，重新格式化日誌行，把訊息放在前面，日誌層級則放在後面的括號裡：

```julia-repl
julia> reformat("[INFO]: Operation completed")
"Operation completed (info)"
```

----

***注意：***  這個練習裡的所有字串都是英文，而且只使用 ASCII 字元集。
之後的概念會讓你有機會處理 Unicode 字元。
