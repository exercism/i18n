# 指令

在這個練習中，你將為一個簡單的整數計算機建立錯誤處理。為了簡化問題，我們已經提供了計算加法、乘法和除法的方法。

目標是做出一個能運作的計算機：當傳入引數`16`、`51`和`+`時，它會回傳符合下列樣式的字串：`16 + 51 = 67`。

```csharp
SimpleCalculator.Calculate(16, 51, "+"); // => returns "16 + 51 = 67"

SimpleCalculator.Calculate(32, 6, "*"); // => returns "32 * 6 = 192"

SimpleCalculator.Calculate(512, 4, "/"); // => returns "512 / 4 = 128"
```

## 1. 實作計算機的運算

這項任務要實作的主要方法是（_靜態_）`SimpleCalculator.Calculate()`方法。它接受三個引數。前兩個引數是要進行運算的整數。第三個引數的型別是字串，而在這個練習中，你必須實作以下運算：

- 使用`+`字串進行加法
- 使用`*`字串進行乘法
- 使用`/`字串進行除法

## 2. 處理不合法的運算

任何其他運算符號都應該擲回 `ArgumentOutOfRangeException` 例外。如果運算引數是空字串，方法就應該擲回 `ArgumentException` 例外。當傳入`null`做為運算引數時，方法就應該擲回 `ArgumentNullException` 例外。

```csharp
SimpleCalculator.Calculate(100, 10, "-"); // => throws ArgumentOutOfRangeException

SimpleCalculator.Calculate(8, 2, ""); // => throws ArgumentException

SimpleCalculator.Calculate(58, 6, null); // => throws ArgumentNullException
```

## 3. 處理除以零的錯誤

當嘗試除以`0`時，計算機應該回傳內容為`Division by zero is not allowed.`的字串。任何其他例外都不應該由`SimpleCalculator.Calculate()`方法處理。

```csharp
SimpleCalculator.Calculate(512, 0, "/"); // => returns "Division by zero is not allowed."
```
