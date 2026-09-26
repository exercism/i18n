# はじめに

Juliaのトラック全体では、解答を小さなライブラリのように扱うことが求められます。つまり、関数や型などを定義し、それをテストスイートに対して実行することになります。
そのため、最初の概念として名前付き関数を紹介します。

Juliaは動的で、型付けの強いプログラミング言語です。
プログラミングのスタイルは主に関数型ですが、Haskellなどの言語よりも柔軟です。

## 変数と代入

変数は、あらかじめ宣言しておく必要はありません。
適切な名前を決めて、値を代入するだけです：

```julia-repl
julia> myvar = 42  # an integer
42

julia> name = "Maria"  # strings are surrounded by double-quotes ""
"Maria"
```

## 定数

プログラム全体で使いたい値がある一方、その値が変わる予定がない場合は、定数として印を付けておくのが一番です。

代入の前に`const`キーワードを付けると、コンパイラーは変数の場合よりも効率的なコードを生成できます。

定数は、コーディングのミスから身を守るのにも役立ちます。
うっかり`const`の値を変更しようとすると、警告が出ます：

```julia-repl
julia> const answer = 42
42

julia> answer = 24
WARNING: redefinition of constant Main.answer. This may fail, cause incorrect answers, or produce other errors.
24
```

なお、`const`は関数の*外側*でしか宣言できません。
通常は`*.jl`ファイルの先頭付近、関数定義の前に置きます。

## 算術演算子

これらは多くの言語と同じです：

```julia
2 + 3  # 5 (addition)
2 - 3  # -1 (subtraction)
2 * 3  # 6 (multiplication)
8 / 2  # 4.0 (division with floating-point result)
8 % 3  # 2 (remainder)
```

## 関数

Juliaで名前付き関数を定義するには、よく使われる方法が2つあります：

1. `function`キーワードを使う方法

    ```julia
    function muladd(x, y, z)
        x * y + z
    end
    ```

    読みやすさのために4スペースでインデントするのが慣例ですが、コンパイラーはこれを無視します。
    `end`キーワードは必須です。

    `return x * y + z`と書くこともできます。
    ただし、Juliaの関数は常に最後に評価された式を返すので、`return`キーワードは省略できます。
    意図をより明確にするために、あえて書くことを好むプログラマーも多くいます。

2. 「代入形式」を使う方法

    ```julia
    muladd(x, y, z) = x * y + z
    ```

    これは、簡潔な単一式の関数を作るときによく使われます。

    代入形式では、`return`キーワードを*決して*使いません。

2つの形式は等価で、まったく同じように使えるので、読みやすいほうを選びましょう。

関数を呼び出すには、その名前を指定し、関数の各仮引数に引数を渡します：

```julia
# invoking a function
muladd(10, 5, 1)

# and of course you can invoke a function within the body of another function:
square_plus_one(x) = muladd(x, x, 1)
```

## 命名規則

多くの言語と同様、Juliaでは（変数や関数など、さまざまなものの）名前を文字で始め、そのあとに文字・数字・アンダースコアを自由に組み合わせる必要があります。

慣例として、変数・定数・関数の名前は*小文字*で書き、アンダースコアは必要最小限にとどめます。