# 簡介

整個 Julia 課程會要求你把你的解法當成小型函式庫來處理，也就是說，你需要定義函式、型別等等，這些之後會交由測試套件執行。
因此，我們會把具名函式當作第一個介紹的概念。

Julia 是一種動態、強型別的程式語言。
它的程式設計風格以函式為主，但比 Haskell 這類語言更有彈性。

## 變數與賦值

你不需要事先宣告變數，只要把值指定給合適的名稱就行了：

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## 常數

如果某個值需要在整個程式中都能取用，但又預期不會改變，最好把它標記為常數。

在賦值前加上`const`關鍵字，能讓編譯器產生比變數更有效率的程式碼。

常數也能幫你避免寫程式時的錯誤。
如果不小心試圖改變`const`的值，就會出現警告：

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

請注意，`const`只能宣告在函式*外部*。
通常會放在`*.jl`檔案的開頭附近，也就是函式定義之前。

## 算術運算子

這些運算子和其他許多語言一樣：

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## 函式

在 Julia 中，定義具名函式有兩種常見的方式：

1. 使用`function`關鍵字

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    為了可讀性，慣例上會縮排 4 個空格，但編譯器會忽略縮排。
    `end`關鍵字則是必要的。

    請注意，我們也可以寫成`return x * y + z`。
    不過，Julia 函式一定會回傳最後一個求值過的運算式，所以`return`關鍵字是可有可無的。
    許多程式設計師偏好加上它，讓意圖更明確。

2. 使用「賦值形式」

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    這最常用來建立簡潔的單一運算式函式。

    賦值形式中*永遠不會*用到`return`關鍵字。

這兩種形式是等價的，用法也完全相同，所以挑比較好讀的那一種就好。

呼叫函式時，要寫出函式名稱，並為函式的每個參數傳入對應的引數：

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## 命名慣例

和許多語言一樣，Julia 要求名稱（變數、函式，以及許多其他東西的名稱）必須以字母開頭，後面可以接任意組合的字母、數字和底線。

依照慣例，變數、常數和函式的名稱使用*小寫*，並盡量少用底線。