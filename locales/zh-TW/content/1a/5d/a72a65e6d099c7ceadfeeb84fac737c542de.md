# 提示

## 一般

- 每日的鳥類數量儲存在名為`birdsPerDay`的[欄位][fields]中。
- 每日的鳥類數量是一個陣列，其中恰好包含 7 個整數。

## 1. 檢查上週的數量

- 由於這個方法_不_依賴本週的數量，因此它被定義為 [`static`方法][static-members]。
- 定義陣列有[幾種方式][single-dimensional-arrays]。

## 2. 檢查今天有多少鳥來訪

- 請記住，這些數量是依日期從最舊到最新排序，最後一個元素代表今天。
- 要存取最後一個元素，可以使用它的（固定）索引（記得從零開始計算），也可以透過[陣列的大小][array-length]來計算它的索引。

## 3. 將今天的數量加一

- 將代表今天數量的元素設為今天的數量加 1。

## 4. 檢查是否有沒有鳥來訪的日子

- `Array`類別有一個[內建方法][array-indexof]，會回傳找到該元素的第一個索引；若找不到相符的元素，則回傳 -1。

## 5. 計算前幾天來訪的鳥數

- 你可以用一個變數來保存來訪鳥數的計數。
- 可以使用 [`for`迴圈][for-statement]來疊代這個陣列。
- 這個變數可以在迴圈內更新。
- 請記住：陣列的索引從`0`開始。

## 6. 計算忙碌日的數量

- 你可以用一個變數來保存忙碌日的數量。
- 可以使用 [`foreach`迴圈][array-foreach]來疊代這個陣列。
- 這個變數可以在迴圈內更新。
- 可以在迴圈內使用[條件式][if-statement]。

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
