# ヒント

## 全般

- 1日あたりの鳥の数は、`birdsPerDay`という[フィールド][fields]に保存されています。
- 1日あたりの鳥の数は、ちょうど7つの整数を含む配列です。

## 1. 先週の数を確認する

- このメソッドは現在の週の数に依存し_ない_ため、[`static`メソッド][static-members]として定義されています。
- 配列を定義する方法は[いくつかあります][single-dimensional-arrays]。

## 2. 今日訪れた鳥の数を確認する

- 数は日ごとに古い日から直近の日へと並んでおり、最後の要素が今日を表すことを覚えておきましょう。
- 最後の要素にアクセスするには、（固定の）インデックスを使う（0から数え始めることを忘れないようにしましょう）か、[配列のサイズ][array-length]を使ってインデックスを計算します。

## 3. 今日の数を増やす

- 今日の数を表す要素に、今日の数と1を足した値を設定します。

## 4. 鳥が1羽も訪れなかった日があったか確認する

- `Array`クラスには、要素が見つかった最初のインデックスを返す[組み込みメソッド][array-indexof]があります。一致する要素が見つからなかった場合は-1を返します。

## 5. 最初の数日間について訪れた鳥の数を計算する

- 訪れた鳥の数を保持するために変数を使うことができます。
- [`for`ループ][for-statement]を使って配列を繰り返し処理できます。
- ループの中で変数を更新できます。
- 覚えておきましょう。配列のインデックスは`0`から始まります。

## 6. 忙しい日の数を計算する

- 忙しい日の数を保持するために変数を使うことができます。
- [`foreach`ループ][array-foreach]を使って配列を繰り返し処理できます。
- ループの中で変数を更新できます。
- ループの中で[条件文][if-statement]を使うことができます。

[array-foreach]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/using-foreach-with-arrays
[single-dimensional-arrays]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/arrays/single-dimensional-arrays
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[static-members]: https://www.oreilly.com/library/view/programming-c/0596001177/ch04s03.html
[array-indexof]: https://docs.microsoft.com/en-us/dotnet/api/system.array.indexof
[if-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/if-else
[array-length]: https://docs.microsoft.com/en-us/dotnet/api/system.array.length
[for-statement]: https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/for
