# 説明

ネットボールのシーズンが終わり、どのチームが決勝に進むかを順位表が決めます。

スタブには`TEAM`クラスが用意されています。その下に`FINALS_LADDER`を書いてください。

## 1. どちらが上か？

`higher`は2つのチームを受け取り、1つ目のチームが2つ目より上に来るべきかどうかを答えます。ポイントが多いほうが上です。ポイントが同じチームは得失点差で分け、差が大きいほうを上にします。

```sather
FINALS_LADDER::higher(#TEAM("Vixens", 24, 40), #TEAM("Magpies", 20, 90))
-- => true
```

## 2. 順位表

`ladder`はチームをどのような順序で受け取っても、順位をつけて返します。渡された配列は、元のままにしておかなければなりません。

```sather
FINALS_LADDER::ladder(teams)
-- => the same teams, best first
```

## 3. 順位表を読み上げる

`names`はチームの配列を受け取り、それぞれの名前を`", "`でつないで返します。

```sather
FINALS_LADDER::names(FINALS_LADDER::ladder(teams))
-- => "Vixens, Magpies, Swifts"
```

## 4. 優勝チーム

`premiers`はチームをどのような順序で受け取っても、いちばん上に来るチームの名前を返します。チームが1つもないときは、`""`を返します。

```sather
FINALS_LADDER::premiers(teams)
-- => "Vixens"
```

## 5. まったく別の並び順

`shortest_first`は文字列の配列を受け取り、長さの短い順に並べて返します。同じ長さの文字列は、アルファベット順に並べます。

```sather
FINALS_LADDER::shortest_first(|"Magpies", "Vixens", "Swifts"|)
-- => "Swifts", "Vixens", "Magpies"
```

同着の決め方は、飾りではありません。この並べ替えは安定ではないので、これがなければ、同じ長さの2つの名前がどちらに来るか決まりません。

これは、タスク2と同じ並べ替えルーチンに、別の規則を渡したものです。それこそが、この演習の狙いです。
