# 說明補充

## 例外訊息

有時候你會需要[引發例外](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。這麼做的時候，一定要附上**有意義的錯誤訊息**，指出錯誤的來源。這能讓你的程式碼更好讀，對除錯也有很大的幫助。如果你知道錯誤來源會是某個特定的型別，可以選擇引發其中一種[內建錯誤型別](https://docs.python.org/3/library/exceptions.html#base-classes)，但還是要附上有意義的訊息。

這個練習要求你在輸入的格子超出範圍時，使用 [raise 敘述](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)「拋出」`ValueError`。你必須既 `raise` 這個 `exception`，又附上訊息，測試才會通過。

若要引發帶有訊息的 `ValueError`，請把訊息寫成 `exception` 型別的引數：

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
