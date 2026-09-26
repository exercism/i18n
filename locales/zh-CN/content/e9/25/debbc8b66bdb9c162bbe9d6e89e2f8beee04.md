# 条件判断

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

`if` 和 `then` 之间的判断必须是一个 `BOOL`。Sather 不接受这里放数字，所以没有 C 语言那种把零当作假的习惯。

## 基本结构

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

判断从上往下依次进行，第一个结果为真的分支胜出。它下面的内容会被直接跳过，不再判断。正因如此，一条判断链必须从最具体的条件排到最宽泛的条件：把`score >= 5`放在`score >= 8`上面，就意味着第二个条件永远轮不到。

`else` 是可选的。`elsif` 可以按需重复任意多次。

## 条件判断是语句，不是值

`if` 本身不产生值，所以下面这种写法不是 Sather：

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

要么在每个分支里直接返回，要么在每个分支里给变量赋值。

## 什么时候不该用它

一个用来回答某个问题的例程，应该直接返回那个问题：

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

第二种写法没有比第一种多说出任何东西，长度却是它的三倍。

## 嵌套

一个`if`里可以再放一个`if`。但很多时候并不需要：两个都必须成立的判断，可以用`and`连起来，这样读起来更清楚。

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
