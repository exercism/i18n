# 簡介

## 檔案

處理檔案的函式是由`File`模組提供。

要讀取整個檔案，請使用`File.read/1`。要寫入檔案，請使用`File.write/2`。

每次用`File.write/2`寫入檔案時，都會開啟一個檔案描述符，並生成一個新的 Elixir [行程][exercism-processes]。因此，應該避免在迴圈中使用`File.write/2`寫入檔案。

你可以改用`File.open/2`來開啟檔案。`File.open/2`的第二個引數是模式陣列，讓你可以指定要以讀取還是寫入的方式開啟檔案。

`File.open/2`會回傳一個 PID，代表負責處理這個檔案的行程。要讀取和寫入這個檔案，請使用`IO`模組的函式，並把這個 PID 當作 IO 裝置傳入。

檔案處理完畢後，請使用`File.close/1`將它關閉。

前面提到的`File`模組函式都有`!`版本，會拋出錯誤，而不是回傳錯誤元組（例如`File.read!/1`）。如果你不打算處理檔案不存在或權限不足之類的錯誤，就使用這個版本。

[exercism-processes]: https://exercism.org/tracks/elixir/concepts/processes
