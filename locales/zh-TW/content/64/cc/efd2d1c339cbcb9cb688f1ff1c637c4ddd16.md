# 簡介

在 C# 中，元組（tuple）是一種用來組織資料的資料結構，可以存放 2 個以上、型別不拘的欄位。

元組通常是這樣建立的：把 2 個以上以逗號分隔的運算式放在一對括號裡。

```csharp
string boast = "All you need to know";
bool success = !string.IsNullOrWhiteSpace(boast);
(bool, int, string) triple = (success, 42, boast);
```

元組可以用在指定和初始化的操作中，也可以當成回傳值或方法的引數。

欄位是用點語法取出的。預設情況下，第一個欄位是 `Item1`，第二個是 `Item2`，依此類推。自訂的名稱會在下面討論。

```csharp
// initialization
(int, int, int) vertices = (90, 45, 45);

// assignment
vertices = (60, 60, 60);

//  return value
(bool, int) GetSameOrBigger(int num1, int num2)
{
    return (num1 == num2, num1 > num2 ? num1 : num2);
}

// method argument
int Add((int, int) operands)
{
    return operands.Item1 + operands.Item2;
}
```

像 `Item1` 這樣的欄位名稱，並不會讓程式碼變得容易閱讀。下面的程式碼示範了 2 種為元組欄位命名的方式。另外也請注意，下面的程式碼中 `var` 可以和元組一起使用，型別會自動推斷出來。這對具名欄位和不具名欄位的元組都一樣適用。

```csharp
// name items in declaration
(bool success, string message) results = (true, "well done!");
bool mySuccess = results.success;
string myMessage = results.message;

// name items in creating expression
var results2 = (success: true, message: "well done!");
bool mySuccess2 = results2.success;
string myMessage2 = results2.message;
```
