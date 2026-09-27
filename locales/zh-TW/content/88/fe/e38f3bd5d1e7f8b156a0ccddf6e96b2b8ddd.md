# 提示

## 一般

## 1. 購買一輛全新的遙控車

- [這個頁面說明如何建立類別的新執行個體][creating-objects]。

## 2. 顯示行駛的距離

- 用[欄位][fields]記錄行駛的距離。
- 考慮這個欄位要使用哪種可見性（它需要在類別外部使用嗎？）。
- 考慮使用[字串內插][string-interpolation]來格式化要回傳的字串。

## 3. 顯示電池百分比

- 用[欄位][fields]記錄初始電量。
- 將欄位初始化為對應預期初始電量的特定值。
- 考慮這個欄位要使用哪種可見性（它需要在類別外部使用嗎？）。
- 考慮使用[字串內插][string-interpolation]來格式化要回傳的字串。

## 4. 行駛時更新行駛的公尺數

- 更新代表行駛距離的欄位。

## 5. 行駛時更新電池百分比

- 更新代表電池百分比的欄位。

## 6. 電池耗盡時防止繼續行駛

- 新增條件式，讓電池尚未耗盡時才更新距離和電量。
- 新增條件式，在電池耗盡時顯示電池沒電的訊息。

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
