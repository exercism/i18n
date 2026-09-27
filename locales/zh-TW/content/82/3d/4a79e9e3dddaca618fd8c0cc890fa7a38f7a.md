# 簡介

## 方法多載

_方法多載_ 允許同一個類別中有多個方法擁有相同的名稱。多載方法彼此之間必須在下列其中一個方面有所不同：

- 參數的數量
- 參數的型別

方法多載不能以回傳型別為依據。

編譯器會根據參數的數量和型別，自動推斷要呼叫哪一個多載方法。

## 具名引數

到目前為止，我們已經看到傳入方法的引數是依據位置與方法所宣告的參數配對。另一種做法是，特別是當常式需要大量引數時，呼叫端可以指定所宣告參數的識別碼來配對引數。

以下範例示範語法：

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## 選擇性參數

方法參數可以藉由指派預設值來設為選擇性。呼叫具有選擇性參數的方法時，呼叫端不需要為這些參數傳遞值。如果沒有為選擇性參數傳遞值，就會使用其預設值。

選擇性參數 _必須_ 位於參數清單的結尾；後面不能接著非選擇性參數。

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
