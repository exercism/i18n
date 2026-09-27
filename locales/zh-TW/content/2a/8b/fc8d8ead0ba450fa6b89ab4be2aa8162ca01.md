# 提示

## General

- [csharp.net 的日期與時間教學][csharp.net-datetimes-working-with-datetimes-time]

## 1. 解析預約日期

- `DateTime`類別有幾個方法可以[解析][docs.microsoft.com_parsing-date]`string`，並將它轉成`DateTime`。

## 2. 檢查預約是否已經過去

- `DateTime`物件可以使用預設的[比較運算子][docs.microsoft.com_datetime-operators]來互相比較。
- 有一個[屬性][docs.microsoft.com_datetime-properties]可以取得目前的日期和時間。

## 3. 檢查預約是否在下午

- 要存取`DateTime`物件的時間部分，可以透過它的其中一個[屬性][docs.microsoft.com_datetime-properties]。

## 4. 描述預約的時間和日期

- 這些測試執行起來，就像是在美國的機器上執行一樣，也就是說，把`DateTime`轉成`string`時，會回傳美式格式的日期和時間。
- 把`DateTime`執行個體轉成`string`時，你可以使用[標準格式字串][docs.microsoft.com_standard-date-and-time-format-strings]或[自訂格式字串][docs.microsoft.com_custom-date-and-time-format-strings]。

## 5. 回傳週年紀念日日期

- 使用`DateTime`各種[建構子][constructors]的其中一個，來建立新的`DateTime`執行個體。
- 你可以使用目前日期時間的其中一個[屬性][docs.microsoft.com_datetime-properties]來取得目前的年份。

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
