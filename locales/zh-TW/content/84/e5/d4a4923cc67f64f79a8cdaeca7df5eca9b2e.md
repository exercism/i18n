# 指令補充

## DSL 簡介

在這個 DSL 中，圖是一個型別為`Graph`的物件。它接受一個`list`，內含一個或多個用來描述下列項目的 tuple：

+ 屬性
+ `Nodes`
+ `Edges`

`Node`和`Edge`的實作已提供於`dot_dsl.py`中。

如需進一步了解這個 DSL 預期的設計，以及預期的錯誤型別和訊息，請參閱`dot_dsl_test.py`中的測試案例。


## 例外訊息

有時候，我們必須[引發例外](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)。這麼做時，你應該一律附上**有意義的錯誤訊息**，指出錯誤的來源。這能讓你的程式碼更容易閱讀，對除錯也有很大的幫助。如果你知道錯誤來源會是某種特定的型別，可以選擇引發其中一種[內建錯誤型別](https://docs.python.org/3/library/exceptions.html#base-classes)，但仍然應該附上有意義的訊息。

這個練習要求你使用[raise 敘述](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)來「拋出」例外：當`Graph`格式不正確時拋出`TypeError`，而當`Edge`、`Node`或`attribute`格式不正確時拋出`ValueError`。唯有當你同時`raise`這個`exception`並附上訊息，測試才會通過。

若要引發附有訊息的錯誤，請把訊息寫成`exception`型別的引數：

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
