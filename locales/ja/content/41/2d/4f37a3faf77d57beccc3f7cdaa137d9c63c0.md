# 説明

エレナは新聞工場の新しい品質管理責任者です。
ちょうど入社したばかりなので、工場のいくつかの工程を見直して、改善できるところがないか確かめることにしました。
調べてみると、技術者たちが多くの品質チェックを手作業で行っていることがわかります。自動化の好機だと感じたエレナは、フリーランスのエンジニアであるあなたに、いくつかの機械を監視するソフトウェアの開発を頼みます。

## 1. 部屋の湿度レベルを確認する

最初のミッションは、生産室の湿度レベルを監視するソフトウェアを書くことです。すでにセンサーが会社のソフトウェアに接続されていて、部屋の湿度のパーセントを定期的に返してくれます。

湿度が高すぎる場合にエラーを投げる関数を、ソフトウェアに実装する必要があります。
湿度が許容範囲内であれば、Infoログが追加されます。
関数の名前は`humiditycheck`とし、湿度のパーセントを引数として受け取ります。

パーセントが70%を超える場合は、`ErrorException`で停止してください（メッセージの内容そのものは重要ではありませんが、測定された湿度を含める必要があります）。
そうでなければ、メッセージ`"humidity level check passed: h%"`のInfoログを追加してください。ここで`h`は湿度のパーセントです。

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. 過熱をチェックする

エレナは最初の仕事にとても満足していて、次は機械の温度の監視を任せたいと考えています。
技術者のグレッグと雑談していると、機械の温度が500°Cを超えると技術者たちは過熱を心配し始める、と教えてくれます。

機械には、内部温度を測るセンサーが付いています。
このセンサーはとても繊細で、よく壊れてしまうことを知っておいてください。
壊れた場合は、技術者が交換する必要があります。

あなたの仕事は、温度を引数に取る関数`temperaturecheck`を実装することです。この関数は、問題がなければログを追加し、センサーが壊れている場合や機械が過熱し始めた場合にはエラーを投げます。
あとでエラーの種類に応じて違う対応をする必要があるので、2種類のエラーを区別する仕組みが要ります。

- センサーが壊れていると、温度は`nothing`になります。
  この場合は、`ArgumentError`で停止してください（メッセージは重要ではありません）。
- センサーが正常に動いているとき、温度が500°Cを超えていれば、測定された温度を含む`DomainError`を投げてください。
- それ以外は問題がないので、メッセージ`"temperature check passed: t °C"`のInfoログを追加してください。ここで`t`は温度です。

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. 独自のエラーを定義する

次のタスクでは、より一般的な、どんなエラーも受け止めるエラーを定義する必要があります。
エラーであることと、名前が`MachineError`であること以外に、実装の詳細は重要ではありません。
フィールドやメッセージは、役に立つと思うものを自由に含めてかまいません。

## 4. 機械を監視する

機械がエラーを検知できるようになり、独自のマシンエラーも定義できたので、全体がどう動いているかを報告するラッパー関数を追加します。
このラッパーは、これまでの関数からのログを返すだけでなく、発生した不具合の種類に応じてログを追加する必要もあります。

- 湿度と温度を確認します。
- 湿度チェックが`ErrorException`を投げた場合は、メッセージ`"humidity level check failed: h%"`のErrorログを追加します。ここで`h`は湿度のパーセントです。
- 温度チェックが`ArgumentError`を投げた場合は、メッセージ`"sensor is broken"`のWarnログを追加します。
- 温度チェックが`DomainError`を投げた場合は、メッセージ`"overheating detected: t °C"`のErrorログを追加します。ここで`t`は温度です。
- どちらか、または両方のチェックが失敗した場合は、ログを追加したあとに`MachineError`を1つ投げます。
- すべて問題がなければ、`humiditycheck`と`temperaturecheck`からのログだけが追加されます。

湿度と温度を引数に取る関数`machinemonitor()`を実装してください。

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
