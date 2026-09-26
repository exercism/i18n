# 条件分岐

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

`if`と`then`の間に書く条件は`BOOL`でなければなりません。Satherはそこに数値を受け付けません。そのため、C言語のようにゼロを`false`として扱う習慣はありません。

## 基本の形

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

条件は上から順に調べられ、最初に`true`になったものが選ばれます。それより下は、調べられることなく飛ばされます。だからこそ、連鎖は最も具体的な条件から最も緩い条件へと並べる必要があります。`score >= 5`を`score >= 8`より上に書くと、2つ目には決して到達しません。

`else`は省略できます。`elsif`は必要なだけ何度でも繰り返せます。

## 条件分岐は値ではなく文

`if`自体は値を生み出しません。ですから、次のコードはSatherでは書けません。

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

それぞれの分岐の中で`return`するか、それぞれの分岐の中で変数に代入しましょう。

## 使わないほうがよいとき

ある条件を判定するルーチンなら、その条件をそのまま返すべきです。

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

2つ目は、1つ目と同じことしか言っていないのに、長さは3倍あります。

## 入れ子

`if`の中に別の`if`を書くこともできます。ただ、そうする必要がないこともよくあります。どちらも成り立たなければならない2つの条件は、代わりに`and`でつなげることができ、そのほうが読みやすくなります。

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
