# ヒント

## 全般

- ここでは、以前に学んだ[構造体][structs]、[マップ][maps]、[メソッド][methods]の概念が役立ちます。


## 1. 参加者の記録

- [型定義][type definition]の概念では、新しい型を定義する方法を説明しています。
- 新しい`map`のインスタンスを作るには、`make()`を使います。
- マップに値を追加するには、`struct{}{}`で空の`struct{}`のインスタンスを作ります。

## 2. 参加者の確認

- 要素がマップに含まれていれば、その集合はその値を持っています。
- [2値代入][two value assignment]を使うと、マップに項目が含まれているかどうかを確認できます。

## 3. 参加者の比較

- それぞれの集合のすべての値がもう一方の集合に含まれていれば、2つの集合は同じです。
- `range`を使うと、集合のすべての要素を確認できます。

[maps]: https://exercism.org/tracks/go/concepts/maps
[methods]: https://exercism.org/tracks/go/concepts/methods
[structs]: https://exercism.org/tracks/go/concepts/structs
[two value assignment]: https://go.dev/tour/moretypes/22
[type definition]: https://exercism.org/tracks/go/concepts/type-definitions
