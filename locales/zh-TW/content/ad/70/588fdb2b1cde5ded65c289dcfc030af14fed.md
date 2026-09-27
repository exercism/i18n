# 提示

## 一般

## 1. 購買一輛全新的遙控車

- [這個頁面說明如何建立類別的新執行個體][creating-objects]。

## 2. 顯示行駛的距離

- 在[欄位][fields]中記錄行駛的距離。
- 考慮這個欄位要使用哪種可見性（是否需要在類別外部使用？）。

## 3. 顯示電池電量百分比

- 在[欄位][fields]中記錄行駛的距離。
- 將欄位初始化為對應初始電池電量的特定值。
- 考慮這個欄位要使用哪種可見性（是否需要在類別外部使用？）。

## 4. 行駛時更新行駛的公尺數

- 更新代表行駛距離的欄位。

## 5. 行駛時更新電池電量百分比

- 更新代表電池電量百分比的欄位。

## 6. 電池耗盡時防止繼續行駛

- 新增條件式，只在電池尚未耗盡時更新距離和電池電量。
- 新增條件式，在電池耗盡時顯示電池沒電的訊息。

[creating-objects]: https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html
[fields]: https://docs.oracle.com/javase/tutorial/java/javaOO/classvars.html
