# 指令補充

## 例外訊息

有時你需要[引發例外](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。這麼做的時候，一定要附上**有意義的錯誤訊息**，說明錯誤的來源是什麼。這會讓你的程式碼更好讀，對除錯也有很大的幫助。如果你知道錯誤來源一定會是某種型別，可以選擇引發其中一種[內建錯誤類型](https://docs.python.org/3/library/exceptions.html#base-classes)，但還是要附上有意義的訊息。

這個練習要求你在 `prime()`函式收到格式錯誤的輸入時，使用 [`raise` 敘述](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)來「抛出」`ValueError`。由於這個練習只處理_正數_，任何小於 1 的數字都是格式錯誤的。只有在你同時 `raise` 了 `exception` 並附上訊息時，測試才會通過。

要用訊息引發 `ValueError`，請把訊息寫成 `exception` 型別的引數：

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
