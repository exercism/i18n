# 風変わりなパーティーロボット

## ストーリー

昔々、鉄格子の窓がある奇妙な家に住む、風変わりなプログラマーがいました。ある日、彼はオンラインの求人サイトで、パーティーロボットを作る仕事を引き受けました。そのロボットは、人々にあいさつをして、席へ案内するはずのものでした。最初に追加された機能はとても機械的で、プログラマーが人とのやり取りに慣れていないことを物語っていました。そのうちのいくつかは、最終版にもそのまま残りました。

## タスク

- 一人ひとりに次のようにあいさつします。

```
Welcome to my party, <name>!
```

- 今日が誕生日のゲストには、ロボットがゲスト一人ひとりのことを知っていることを示すために、次のようにあいさつします。

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- 席を尋ねた人には、次のようにして自分のテーブルへの道順を伝えます。

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## 実装

- [Go: 文字列][implementation-go]（リファレンス実装）

## リファレンス

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
