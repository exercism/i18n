# 占位标题

## 函数库

这是我们遇到的第一个这样的练习：要写的解答不是一个“main”脚本。我们要写的是一个库，它会被 source 到其他脚本中，由这些脚本调用我们的函数。

### Bash nameref

本练习需要使用 `nameref` 变量。这要求 bash 版本至少为 4.0。如果你使用的是 MacOS 上的默认 bash，就需要另外安装一个版本：参见[安装 Bash](https://exercism.io/tracks/bash/installation)。

nameref 是一种把变量_按引用_传给函数的方式。这样，变量就能在函数中被修改，而更新后的值在调用方的作用域中同样可用。下面是一个例子：
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
