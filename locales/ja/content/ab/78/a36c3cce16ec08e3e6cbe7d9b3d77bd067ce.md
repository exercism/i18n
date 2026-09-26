# Pyretトラックでのテスト

## 前提条件のインストール

演習のダウンロードが無事に完了したら、テストを実行するためにNode.jsのモジュールをインストールする必要があります。

```sh
cd /path/to/exercise
npm install
```

次に、`pyret`コマンドラインツールが入っているディレクトリを$PATHに追加します。

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## はじめに

演習のディレクトリにはいくつかのファイルがありますが、とくに重要なのは解答ファイルとテストファイルの2つです。
次の例では、Leapの演習をダウンロードしています。

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

テストを実行するには、公式のExercism CLIをダウンロードしていれば`exercism test`を、そうでなければ`pyret leap-test.arr`を実行します。
Pyretはテストスイートを実行します。テストスイートは、ラベル付きの`check`ブロックの集まりで、解答ファイルを特定の入力と期待する結果に対してテストするものです。
この流れで重要なのは、テストスイートから見えるように、コードの一部を明示的にエクスポートすることです。

## provide

このトラックのテストはファイルをインポートするので、明示的にエクスポートしたものすべてにアクセスできます。

変数をエクスポートするには、ファイルの先頭に[provide文][provide-statement]を追加する必要があります。

次の2つのコードスニペットは、`a`、`b`、`c`をエクスポートする有効な方法です。

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

3つ目の方法である`provide *`は、カスタムデータ型を除くすべてのトップレベル束縛をエクスポートする省略記法です。
ただし、Pyretは[シャドーイング][shadowing]を厳しく禁止しているため、一般的にはおすすめしません。

## provide-types

演習によっては、テストのために[カスタムデータ型][data-definition]をエクスポートする必要があります。
そのような場合は、[provide-types文][provide-types-statement]を使えます。
データ型にはエクスポートされない可能性のある追加の関数があるため、シャドーイングの心配はありますが、`provide-types *`を使うことをおすすめします。

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

すべての演習のスタブには、`provide`または`provide-types`文があらかじめ用意されています。

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
