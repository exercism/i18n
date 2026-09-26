# 迭代器

用计数器遍历数组，还没开始干活，光记账就得写上四行：

```sather
   i ::= 0;
   loop
      until!(i >= counts.size);
      total := total + counts[i];
      i := i + 1;
   end;
```

计数器、结束判断和步进，跟把数字加起来这件事毫无关系。**迭代器**把这三件事一并包办。

```sather
   loop
      total := total + counts.elt!;
   end;
```

`elt!`每轮交出一个元素，元素用完了就结束循环。没有计数器，没有会写错的地方，也不可能越过数组末尾。

## 感叹号

`!`是迭代器的标记。你已经见过三个了：`until!`、`while!`和`break!`，它们都遵循同一条规则：**迭代器只能在循环里调用。** 在循环外写 `counts.elt!` 就是错误。

在循环里调用的迭代器，每轮都会被要一个值。当它没有值可给时，循环立刻结束，不管这次调用出现在循环体的哪个位置。

## 先从两个入手

`elt!`按顺序给出数组或字符串的元素。

```sather
   loop
      #OUT + names.elt! + "\n";
   end;
```

`upto!`会数数。`1.upto!(5)`给出 1、2、3、4、5，然后结束循环。

```sather
   loop
      total := total + 1.upto!(5);
   end;
```

两者都是普通的例程，只是碰巧以 `!` 结尾，所以都用点号来调用，作用在数组或数字上。

## 保存结果

循环会自行结束，所以在里面算出的结果必须存进一个声明在**外面**的变量，否则循环一结束，它也就消失了。

```sather
   total ::= 0;             -- outside
   loop
      total := total + counts.elt!;
   end;
   return total;
```
