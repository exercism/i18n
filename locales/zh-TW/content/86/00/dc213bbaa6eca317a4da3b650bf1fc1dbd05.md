# 提示

## 一般

只使用 f-string 或`format()`方法來建立包含活動基本資訊的傳單。

- [Python 字串格式化簡介][str-f-strings-docs]
- [realpython.com 上的文章][realpython-article]

## 1. 將標題首字大寫

- 使用 str 方法`capitalize`將標題首字大寫。

## 2. 格式化日期

- `date`需要使用`f''`或`''.format()`手動格式化。
- `date`應該使用這個格式：'Month day, year'。

## 3. 將 Unicode 字元呈現為圖示

- 使用`format`呈現的一種方法，是使用 Unicode 前綴`u'{}'`。

## 4. 顯示完成的傳單

- 找出正確的 [format_spec 欄位][formatspec-docs] 來對齊星號與字元。
- 第 1 區段是首字大寫的`header`字串。
- 第 2 區段是`date`。
- 第 3 區段是演出者的陣列，每位演出者都對應到索引相同的 Unicode 字元。
- 每一行應該包含 20 個字元。
- 撰寫精簡的程式碼，在每個區段之間加入必要的空行。
- 如果沒有提供日期，就以空白行取代。

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
