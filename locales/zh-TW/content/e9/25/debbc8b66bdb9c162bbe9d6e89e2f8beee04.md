# 條件式

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

`if`與`then`之間的問題必須是`BOOL`。Sather 不接受在那裡放數字，所以不會有 C 語言那種把零當成假的習慣。

## 結構

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

問題會由上往下依序提出，第一個答案為真的就勝出。排在它下面的全部都會被略過，連問都不問。所以一串判斷必須從最具體的測試一路排到最寬鬆的：把`score >= 5`放在`score >= 8`前面，就表示第二個永遠到不了。

`else`是選用的。`elsif`可以依需要重複任意多次。

## 條件式是敘述，不是值

`if`本身不會產生值，所以下面這樣不是 Sather：

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

你可以在每個分支裡直接回傳，也可以在每個分支裡把值指定給變數。

## 什麼時候不該用條件式

一個用來回答問題的常式，就應該直接回傳那個問題：

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

第二種寫法並沒有多說出第一種沒說的事，長度卻是三倍。

## 巢狀

一個`if`裡面可以再放一個`if`。但很多時候並不需要：兩個都必須成立的問題，改用`and`連接起來就好，讀起來也更順。

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
