# ポエトリークラブのドアポリシー

## ストーリー

町に新しいポエトリークラブができて、行ってみようかと考えています。以前にいくつか問題が起きたことがあるため、このクラブにはとても独特なドアポリシーがあり、入場を試みる前にそれをマスターする必要があります。

ポエトリークラブには2つのドアがあり、どちらにもガードが立っています。入場するには、その日のパスワードを突き止める必要があります。

### 表のドア

1. ガードが詩を1行ずつ暗唱します。
   - それに対して、適切な文字で応答します。
2. ガードが、これまでに応答した文字をまとめて読み上げます。
   - それらの文字を、先頭を大文字にした単語として整える必要があります。

たとえば、彼らが特に好きな作家の一人にMichael Lockwoodがいます。彼は次のような_アクロスティック_の詩を書きました。アクロスティックとは、それぞれの文の最初の文字をつなげると1つの単語になる詩のことです。

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

ガードが**Stands so high**と暗唱したら**S**と応答し、ガードが**Huge hooves too**と暗唱したら**H**と応答します。

最終的に書き出すパスワードは`Shire`で、これで中に入れます。

### 裏のドア

クラブの奥には、いちばん有名な詩人たちが集まっています。いわばVIPエリアです。誰もが入れる場所ではないので、裏のドアの手順はもう少し込み入っています。

1. ガードが詩を1行ずつ暗唱します。
   - それに対して、適切な文字で応答します。
2. ガードが、これまでに応答した文字をまとめて読み上げます。_ただし、それぞれの文のあとにスペースが入っていることがあります_。
   - それらの文字を、先頭を大文字にした単語として整えます。
   - そして、最後に`, please`を付けて、丁寧にお願いします。

たとえば、先ほどの詩は_テレステイック_でもあります。テレステイックとは、それぞれの文の最後の文字をつなげると1つの単語になる詩のことです。

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

ガードが**Stands so high**と暗唱したら**h**と応答し、ガードが**Huge hooves too**と暗唱したら**o**と応答します。

最終的に書き出すパスワードは`Horse, please`で、これで有名な詩人たちと一緒に楽しめます。

## 実装

- [JavaScript: strings][implementation-javascript]（リファレンス実装）
- [Swift: string-components][implementation-swift]

## 参照

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-javascript]: https://github.com/exercism/javascript/blob/main/exercises/concept/strings/.docs/instructions.md
[implementation-swift]: https://github.com/exercism/swift/blob/main/exercises/concept/poetry-club/.docs/instructions.md
