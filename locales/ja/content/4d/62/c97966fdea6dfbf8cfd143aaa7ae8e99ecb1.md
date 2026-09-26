# 概要

記憶クラス指定子は、変数がメモリにどのように格納されるかに関係します。また、値の記憶域期間（寿命とも呼ばれます）と密接に関係しています。

## `auto`: 関数やブロックのスコープにある変数のデフォルトの記憶クラス

ブロックや関数の中で定義された変数は、デフォルトで`auto`になるので、この指定子を明示的に使うことはあまりありません。
`auto`がよく避けられるもう一つの理由は、C++では意味が異なるからです。
CとC++を組み合わせたコードベースでは、`auto`記憶クラス指定子を避けることで混乱を減らせるかもしれません。
`auto`変数の寿命は、そのブロックに入ったときに始まり、ブロックから出たときに終わります。
`auto`変数は、そのブロックに入ったときにメモリが割り当てられますが、_デフォルト値はありません_。
例外は可変長配列（VLA）です。
VLAの割り当ては、ブロック内で宣言または定義された場所で行われ、ブロックから出たときに終わります。
`auto`変数は、任意の有効な式で初期化できます。

## `static`: 静的リンケージと混同してはいけない記憶クラス指定子

ブロックや関数の外で定義された変数はファイルスコープを持ち、常に静的記憶域期間を持ちます。
ファイルスコープとは、そのファイルのどこからでもアクセスできるという意味です。
静的記憶域とは、プログラムの実行開始から終了まで存在し続けるという意味です。
明示的に初期化しない限り、`static`変数はデフォルトのゼロ値で初期化されます。
ファイルスコープの変数に`static`を付けた場合、その`static`はリンケージを指します。
`static`を付けたファイルスコープの変数は内部リンケージを持ち、そのファイルの中でしかアクセスできません。
変数が関数の中、または関数内のブロックの中で定義され、`static`が付けられている場合、その変数は`static`記憶域期間を持ちます。
`static`変数の値は、関数やブロックの呼び出しの間も保持されます。

次の例では、2つの`static`変数が働いている様子を見ることができます。
1つ目の`count`変数は`print_stuff`関数の中で定義され、関数の呼び出しの間も値を保持します。
2つ目の`count`変数は任意のブロックの中で定義され、そのブロックの中で1つ目の`count`変数を隠します（シャドーイングします）。
2つ目の`count`変数は、ブロックに入るたびに独立して値を保持します。

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

`static`変数を明示的に初期化する場合は、定数式で行わなければなりません。
定数式とは、コンパイル時に評価できる式のことです。

## `extern`: 別の翻訳単位にある変数にアクセスする方法

翻訳単位は、ソースファイルと、それが`#include`するすべてのファイルから構成されます。
ファイルスコープを持つ変数を`extern`として宣言し初期化することもできますが、`extern`キーワードは通常、新しい変数を定義するためではなく、既存の変数を参照するために使われます。
`extern`で参照される変数は、ファイルスコープを持たなければなりません。
ファイルスコープにある変数は、常に`static`記憶域を持ちます。
インクルードされるファイルにある変数は、それをインクルードするファイルからアクセスするために、外部リンケージを持たなければなりません。

次の例では、`extern`として宣言された変数`val`を使い、ファイルスコープで定義された`val`を参照します。
`extern`のどちらの使用も、別の場所で定義された変数を参照しているため、参照宣言と呼ばれます。

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

両方の`extern`キーワードを削除すると、プログラムは次のように出力するかもしれません。

```
val is 22038
val is 42
```

このような出力は、`extern`を付けない`val`の各宣言が定義宣言であり、`val`の他の宣言とは独立していることを示しています。
`set_val`と`main`から`val`の宣言を完全に削除すると、`set_val`と`main`で`val`が宣言されていないというコンパイルエラーになります。

`extern`として参照される変数が同じファイルにある場合、内部リンケージと外部リンケージのどちらでも持つことができます。
`val`を`static int val;`として定義しても、`set_val`や`main`での`val`の使われ方には影響しませんが、コンパイルするには定義をそれらの関数の上に移動しなければならない点だけが違います。
ただし、`val`が関数の上で定義されていれば、それらの関数で`val`を`extern`として宣言する必要はありません。

次のコードは動作します。

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

`static int val;`から`static`を外すと`val`は外部リンケージを持ち、`set_val`と`main`の中でも`val`は同じように動作します。
別のソースファイルがこのファイルをインクルードする場合、そのファイルが`val`を使えるのは、`val`が外部リンケージを持ち（`static`として宣言されておらず）、かつそのファイルで`extern int val;`が宣言されているときだけです。

`extern`で参照される変数は、`static`記憶域を持つだけでなく、ファイルスコープも持たなければなりません。
次の例は、`val`が`static`ではあってもファイルスコープを持たないため、おそらくコンパイルできないでしょう。

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## `register`: 変数へのアクセスを高速化できるかもしれない方法

`register`を付けた変数は、素早くアクセスできるように値をレジスタに置きたいというプログラマーの希望を表します。
`register`変数は`auto`変数と同様に、関数やブロックのスコープにある必要があります。
値はメモリではなくレジスタに置かれることを意図しているので、レジスタのアドレスは取得できないため、コンパイラーはその変数のアドレスへのアクセスを禁止すべきです。
ただし、メモリアドレス自体はレジスタに置くことができます。
次の例はそれを示しています。

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

`register`は基本的にヒントです。コンパイラーはこの指定子に従うかどうかを自由に選べるため、値が実際にレジスタに置かれるかどうかは分かりません。

## `typedef`: 実は記憶クラス指定子ではないもの

`typedef`が記憶クラス指定子と説明されるのは、もっぱら構文上の理由からです。
なぜなら、記憶クラス指定子は別の記憶クラス指定子と一緒に使えないからです。
したがって、`typedef auto int i = 42;`は`static auto int i = 42;`と同じくらい不正です。
