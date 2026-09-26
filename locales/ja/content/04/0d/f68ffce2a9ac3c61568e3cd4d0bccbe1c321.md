# ダミーの見出し

## 関数のライブラリ

私たちが書く解答が`main`スクリプトではないのは、これまでの演習で初めてです。ここでは、私たちの関数を呼び出すほかのスクリプトに`source`で読み込まれるライブラリを書きます。

### Bashのnameref

この演習では、`nameref`変数を使う必要があります。そのためには、Bashのバージョン4.0以上が必要です。MacOSのデフォルトのBashを使っている場合は、別のバージョンをインストールする必要があります。詳しくは[Bashのインストール](https://exercism.io/tracks/bash/installation)を参照してください。

namerefを使うと、変数を関数に_参照渡し_できます。こうすると、関数の中で変数を変更でき、呼び出し元のスコープでも更新された値を使えます。次に例を示します。
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
