# 简介

整个 Julia 课程都要求你把提交的解答当作小型库来对待，也就是说，你需要定义函数、类型等，它们随后会被拿去做测试套件的验证。
因此，我们会把具名函数作为第一个概念来介绍。

Julia 是一门动态、强类型的编程语言。
它的编程风格以函数式为主，不过比 Haskell 这类语言更灵活。

## 变量与赋值

不需要提前声明变量。
只要把值赋给一个合适的名字即可：

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## 常量

如果某个值需要在整个程序中都能取用，但又预计不会发生变化，那最好把它标记为常量。

在赋值前加上`const`关键字，可以让编译器生成比变量更高效的代码。

常量还能帮你避免编码时的错误。
不小心试图修改`const`的值，就会收到警告：

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

注意，`const`只能声明在任何函数*之外*。
它通常位于`*.jl`文件靠顶部的位置，在函数定义之前。

## 算术运算符

这些运算符和许多其他语言相同：

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## 函数

在 Julia 中定义具名函数有两种常见方式：

1. 使用`function`关键字

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    用 4 个空格缩进是出于可读性的惯例，但编译器会忽略它。
    `end`关键字必不可少。

    注意，我们本来也可以写成`return x * y + z`。
    不过，Julia 函数总是返回最后求值的那个表达式，所以`return`关键字是可选的。
    许多程序员喜欢写上它，好让自己的意图更明确。

2. 使用“赋值形式”

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    它最常用于编写简洁的单表达式函数。

    在赋值形式中*绝不*使用`return`关键字。

这两种形式是等价的，用法也完全相同，选择可读性更好的那种即可。

调用函数的方法是写出函数名，并为函数的每个形参传入对应的实参：

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## 命名约定

和许多语言一样，Julia 要求名称（变量、函数以及许多其他东西的名称）以字母开头，后面可以是字母、数字和下划线的任意组合。

按照惯例，变量、常量和函数名都使用*小写*，并尽量少用下划线。