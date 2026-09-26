# ヒント

## 全般

- [csharp.netによる日付と時刻のチュートリアル][csharp.net-datetimes-working-with-datetimes-time]

## 1. 予約日時を解析する

- `DateTime`クラスには、`string`を`DateTime`に[解析][docs.microsoft.com_parsing-date]するためのメソッドがいくつかあります。

## 2. 予約日時が過ぎているかどうかを確認する

- `DateTime`オブジェクトは、既定の[比較演算子][docs.microsoft.com_datetime-operators]を使って比較できます。
- 現在の日付と時刻を取得するための[プロパティ][docs.microsoft.com_datetime-properties]があります。

## 3. 予約が午後かどうかを確認する

- `DateTime`オブジェクトの時刻の部分には、その[プロパティ][docs.microsoft.com_datetime-properties]の1つからアクセスできます。

## 4. 予約の時刻と日付を表す

- テストは、アメリカ合衆国にあるマシンで実行されているものとして動きます。つまり、`DateTime`を`string`に変換すると、日付と時刻はアメリカの形式で返ります。
- `DateTime`インスタンスを`string`に変換するときは、[標準書式指定文字列][docs.microsoft.com_standard-date-and-time-format-strings]か[カスタム書式指定文字列][docs.microsoft.com_custom-date-and-time-format-strings]のどちらかを使えます。

## 5. 記念日の日付を返す

- 新しい`DateTime`インスタンスを作るには、`DateTime`のさまざまな[コンストラクター][constructors]の1つを使います。
- 現在の日時の[プロパティ][docs.microsoft.com_datetime-properties]の1つを使って、現在の年を取得できます。

[docs.microsoft.com_parsing-date]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/parsing-datetime
[docs.microsoft.com_datetime-operators]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_datetime-properties]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
[docs.microsoft.com_standard-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/standard-date-and-time-format-strings
[docs.microsoft.com_custom-date-and-time-format-strings]: https://docs.microsoft.com/en-us/dotnet/standard/base-types/custom-date-and-time-format-strings
[csharp.net-datetimes-working-with-datetimes-time]: https://csharp.net-tutorials.com/data-types/working-with-dates-time//
[constructors]: https://docs.microsoft.com/en-us/dotnet/api/system.datetime
