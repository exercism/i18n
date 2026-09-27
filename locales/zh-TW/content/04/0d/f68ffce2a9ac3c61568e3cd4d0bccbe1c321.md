# 虛設標題

## 函式庫

這是我們第一次遇到要寫的解答不是「main」腳本的練習。我們寫的是一個函式庫，讓其他腳本以「source」載入，再呼叫我們的函式。

### Bash 的 nameref

這個練習需要使用 `nameref` 變數。這需要 4.0 以上版本的 bash。如果你用的是 MacOS 上的預設 bash，就得另外安裝其他版本：請參考[安裝 Bash](https://exercism.io/tracks/bash/installation)。

nameref 是一種把變數_以參考方式_傳給函式的方法。這樣一來，變數就能在函式裡被修改，而更新後的值在呼叫端的作用域裡也看得到。以下是一個例子：
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
