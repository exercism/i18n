# 説明

簡単な数学の文章題を解析して評価し、答えを整数として返します。

## 繰り返し0：数値

演算を含まない問題は、単に与えられた数値と評価されます。

> What is 5?

5と評価されます。

## 繰り返し1：足し算

2つの数値を足し算します。

> What is 5 plus 13?

18と評価されます。

大きな数値と負の数値を扱います。

## 繰り返し2：引き算、掛け算、割り算

次に、残りの3つの演算を行います。

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## 繰り返し3：複数の演算

一連の演算を順番に処理します。

これらは言葉による文章題なので、式を左から右へ評価します。_通常の計算の順序は無視します。_

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15（つまり、9ではありません）

## 繰り返し4：エラー

パーサーは以下を拒否します：

* サポートされていない演算（"What is 52 cubed?"）
* 数学ではない質問（"Who is the President of the United States"）
* 構文が無効な文章題（"What is 1 plus plus 2?"）

## おまけ：累乗

よろしければ、累乗を扱ってみましょう。

> What is 2 raised to the 5th power?

32
