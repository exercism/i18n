# 提示

## 概述

只能使用 f-string 或`format()`方法来构建包含活动基本信息的传单。

- [Python 字符串格式化简介][str-f-strings-docs]
- [realpython.com 上的文章][realpython-article]

## 1. 将标题首字母大写

- 使用字符串方法`capitalize`将标题首字母大写。

## 2. 格式化日期

- 需要手动使用`f''`或`''.format()`来格式化`date`。
- `date`应使用这种格式：'Month day, year'。

## 3. 将 Unicode 字符渲染成图标

- 使用`format`进行渲染的一种办法，是使用 Unicode 前缀`u'{}'`。

## 4. 显示完成的传单

- 找到正确的 [format_spec 字段][formatspec-docs]，用它来对齐星号和字符。
- 第 1 部分是首字母大写的`header`字符串。
- 第 2 部分是`date`。
- 第 3 部分是艺术家列表，每位艺术家都与下标相同的 Unicode 字符相对应。
- 每一行应包含 20 个字符。
- 编写简洁的代码，在各部分之间加上必要的空行。
- 如果没有给出日期，就用一个空行代替。

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
