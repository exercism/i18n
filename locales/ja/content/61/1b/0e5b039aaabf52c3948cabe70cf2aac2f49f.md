# 説明

ダンス一座は、年末のショーの準備を進めています。ダンサーを何通りに並べられるのか、そして上演時間を各幕にどう振り分けるのかを考えているのです。

5つの課題はすべて`FORMATION_COUNT`クラスに書きます。

## 1. 並べ方は何通り？

`n`人のダンサーがいるとき、並べ方は`n`の階乗通りあります。先頭は`n`通り、その次は`n-1`通り、以降も同じように選べます。これを`INTI`として返します。ダンサーが0人のときも並べ方はちょうど1通り、つまり空の並びです。

```sather
FORMATION_COUNT::line_ups(5)
-- => 120
FORMATION_COUNT::line_ups(20)
-- => 2432902008176640000
```

## 2. 文字列で書き出す

同じ数を、1桁1桁まで文字列として返します。

```sather
FORMATION_COUNT::line_ups_text(25)
-- => "15511210043330985984000000"
```

`INT`ではその数を保持できません。そこがこの課題のポイントです。

## 3. 1幕分の取り分

`acts`幕が等しい長さのショーでは、各幕は上演時間の`1/acts`になります。これを`RAT`として返します。

```sather
FORMATION_COUNT::share(3)
-- => 1/3
```

## 4. 2幕を合わせる

2つの取り分を足して、その合計を正確に返します。

```sather
FORMATION_COUNT::combined(FORMATION_COUNT::share(2), FORMATION_COUNT::share(3))
-- => 5/6
```

## 5. ショー全体を埋める？

ある取り分がちょうどショー全体、つまりちょうど1になっているかどうかを答えます。

```sather
FORMATION_COUNT::covers_whole_show(#RAT(3, 3))
-- => true
FORMATION_COUNT::covers_whole_show(#RAT(2, 3))
-- => false
```
