# JSONファイルのフォーマット

Exercismのトラックリポジトリには、たくさんのJSONファイルがあります。たとえば、次のようなものです。

- トラックの`config.json`ファイル。
- 各コンセプトの`.meta/config.json`ファイルと`links.json`ファイル。
- 各コンセプト演習とプラクティス演習の`.meta/config.json`ファイル。

これらのファイルは、Exercism全体で一貫したフォーマットになっていると読みやすくなります。そこでconfigletには、トラックのJSONファイルを正規の形式で書き直す`fmt`コマンドがあります。

`fmt`コマンドは、次のファイルをフォーマットします。

- `config.json`
- `exercises/{concept,practice}/*/.approaches/config.json`
- `exercises/{concept,practice}/*/.articles/config.json`
- `exercises/{concept,practice}/*/.meta/config.json`

## 使い方

`fmt`コマンドは、演習の`.meta/config.json`ファイルをフォーマットします。

```
configlet [global-options] fmt [command-options]

Global options:
  -h, --help                   Show this help message and exit
      --version                Show this tool's version information and exit
  -t, --track-dir <dir>        Specify a track directory to use instead of the current directory
  -v, --verbosity <verbosity>  The verbosity of output. Allowed values: q[uiet], n[ormal], d[etailed]

Options for fmt:
  -e, --exercise <slug>        Only operate on this exercise
  -u, --update                 Prompt to write formatted files
  -y, --yes                    Auto-confirm the prompt from --update
```

オプションを付けずに`configlet fmt`を実行すると、トラックには何も変更を加えず、すべてのコンセプト演習とプラクティス演習の`.meta/config.json`ファイル、そしてトラックの`config.json`ファイルのフォーマットをチェックします。

フォーマット済みの演習用`.meta/config.json`ファイルがまだないパスを一覧表示するには、次のように実行します（フォーマットされていない設定ファイルがない演習が1つでもあれば、終了コードは非ゼロになります）。

```shell
configlet fmt
```

フォーマット済みの設定ファイルを書き込むかどうかを確認するには、`--update`オプション（短縮形は`-u`）を付けます。

```shell
configlet fmt --update
```

確認なしでフォーマット済みの設定ファイルを書き込むには、`--yes`オプション（短縮形は`-y`）を付けます。

```shell
configlet fmt --update --yes
```

1つの演習だけを対象にするには、`--exercise`オプション（短縮形は`-e`）を使います。たとえば、`prime-factors`演習のフォーマット済み設定ファイルを確認なしで書き込むには、次のように実行します。

```shell
configlet fmt -uy -e prime-factors
```

JSONファイルを書き込むとき、`configlet fmt`は次のことをします。

- キーと値のペアを正規の順序で書き込みます。

- インデントにはスペース2つを使います。

- JSON配列の各要素と、JSONオブジェクトの各キーを、それぞれ別の行に書きます。

- 省略可能なキーで値が空のものは、キーと値のペアごと削除します。たとえば、`"source": ""`は削除されます。

- プラクティス演習の設定ファイルから`"test_runner": true`を削除します。これは省略可能なキーです。仕様では、`test_runner`キーを省略すると値は`true`とみなされます。

- あるキー名を持つキーと値のペアがJSONオブジェクトに複数ある場合は、最後の1つだけを残します。

演習の`.meta/config.json`ファイルにおける正規のキー順は、次のとおりです。

```text
- authors
- [contributors]
- files
  - solution
  - test
  - exemplar           (Concept Exercises only)
  - example            (Practice Exercises only)
  - [editor]
  - [invalidator]
- [language_versions]
- [forked_from]        (Concept Exercises only)
- [icon]               (Concept Exercises only)
- [test_runner]        (Practice Exercises only)
- blurb
- [source]
- [source_url]
- [custom]
```

ここで角括弧は、囲まれたキーが省略可能であることを示します。

`configlet fmt`は、トラック直下の`config.json`ファイルに存在する演習だけを対象にすることに注意してください。そのため、トラックに新しい演習を実装していて、その`.meta/config.json`ファイルをフォーマットしたい場合は、まずその演習をトラック直下の`config.json`ファイルに追加してください。まだユーザーに公開する準備ができていない演習であれば、その`status`の値を`wip`にしてください。

configletの終了時に、確認したすべての設定ファイルがフォーマット済みであれば終了コードは0、そうでなければ1になります。
