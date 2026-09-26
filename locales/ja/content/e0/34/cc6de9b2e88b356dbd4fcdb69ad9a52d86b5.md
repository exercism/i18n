# 指示の補足

## プロジェクトの構成

* `src`には、この演習の解答が入っています
* `spec`には、この演習で実行するテストが入っています

## テストの実行

正しいディレクトリ（`src`と`spec`が入っているディレクトリ）にいれば、`crystal spec`を実行することで、その演習のテストを実行できます。

```bash
$ pwd
/Users/johndoe/Code/exercism/crystal/hello-world

$ ls
GETTING_STARTED.md README.md          spec               src

$ crystal spec
```

これで、`spec`ディレクトリにあるすべてのテストファイルが実行されます。

各テストファイルでは、最初のテスト以外はすべてスキップされています。

テストが1つ通ったら、`pending`を`it`に変えると、次のテストのスキップを解除できます。

## 解答の提出

解答を提出するときは、`src`ディレクトリにあるソースファイルを提出するようにしてください。

```bash
$ exercism submit src/hello_world.cr
```
