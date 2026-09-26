# ヒント

## 全般

## 1. 新品のラジコンカーを買う

- [このページでは、クラスの新しいインスタンスを作成する方法を説明しています][creating-objects]。

## 2. 走行距離を表示する

- 走行距離を[フィールド][fields]に記録しておきましょう。
- フィールドの可視性をどうするか考えてみましょう（クラスの外部から使う必要がありますか？）。
- 戻り値の文字列を整形するには、[文字列補間][string-interpolation]を使うことを考えてみましょう。

## 3. バッテリー残量を表示する

- 初期のバッテリー残量を[フィールド][fields]に記録しておきましょう。
- フィールドを、想定される初期バッテリー残量に対応する特定の値で初期化します。
- フィールドの可視性をどうするか考えてみましょう（クラスの外部から使う必要がありますか？）。
- 戻り値の文字列を整形するには、[文字列補間][string-interpolation]を使うことを考えてみましょう。

## 4. 走行時に、走行したメートル数を更新する

- 走行距離を表すフィールドを更新します。

## 5. 走行時に、バッテリー残量を更新する

- 走行時のバッテリー残量を表すフィールドを更新します。

## 6. バッテリーが切れたときは走行できないようにする

- バッテリーがまだ切れていない場合にのみ、距離とバッテリーを更新する条件分岐を追加します。
- バッテリーが切れた場合は、バッテリー切れのメッセージを表示する条件分岐を追加します。

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
