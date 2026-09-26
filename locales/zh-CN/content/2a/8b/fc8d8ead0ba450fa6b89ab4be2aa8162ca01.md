# 提示

## 通用

- [csharp.net 上的日期与时间教程][csharp.net-datetimes-working-with-datetimes-time]

## 1. 解析预约日期

- `DateTime` 类提供了几个方法，可以把`string`[解析][docs.microsoft.com_parsing-date]成`DateTime`。

## 2. 检查预约是否已经过去

- 可以使用默认的[比较运算符][docs.microsoft.com_datetime-operators]来比较`DateTime`对象。
- 有一个[属性][docs.microsoft.com_datetime-properties]可以获取当前的日期和时间。

## 3. 检查预约是否在下午

- 可以通过`DateTime`对象的某个[属性][docs.microsoft.com_datetime-properties]来访问其中表示时间的部分。

## 4. 描述预约的时间和日期

- 测试运行时，就好像是在一台位于美国的机器上运行，也就是说，把`DateTime`转换成`string`时会返回美式格式的日期和时间。
- 把`DateTime`实例转换成`string`时，可以使用[标准格式字符串][docs.microsoft.com_standard-date-and-time-format-strings]，也可以使用[自定义格式字符串][docs.microsoft.com_custom-date-and-time-format-strings]。

## 5. 返回周年纪念日期

- 使用`DateTime`的某个[构造函数][constructors]来创建一个新的`DateTime`实例。
- 可以使用当前日期时间的某个[属性][docs.microsoft.com_datetime-properties]来获取当前年份。

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
