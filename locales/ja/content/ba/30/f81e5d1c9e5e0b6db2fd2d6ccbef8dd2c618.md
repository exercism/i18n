# ヒント

## 全般

- Factorでは、文字は整数（Unicodeコードポイント）です。そのため、数値用の`<`、`>`、`=`がそのまま使えます。
- 述語と大文字・小文字の変換は、[`unicode`][unicode]にあります。
- 返すシンボル（`less`、`big`、`alpha`、...）は、使う前に宣言する必要があります。`SYMBOLS: ... ;`でまとめて宣言しましょう。

## 1. 2つの文字を比較する

- [`math`][math]の`<`と`>`を使います。
- 3つのケースは、[`combinators`][combinators]の`cond`でまとめます。

## 2. 文字の大小を判定する

- `LETTER?`が大文字を判定する述語で、`letter?`が小文字を判定する述語です。

## 3. 文字の大小を変換する

- `ch>upper`と`ch>lower`は、1文字ずつ変換するためのものです（文字列用の`>upper`/`>lower`もありますが、ここで扱うのは1文字だけです）。

## 4. 文字の種類を判定する

- `cond`では順番が大切です。`Letter?`は大文字*または*小文字にマッチするので、大文字・小文字を個別に判定するテストより先に実行する必要があります。

[unicode]: https://docs.factorcode.org/content/vocab-unicode.html
[math]: https://docs.factorcode.org/content/vocab-math.html
[combinators]: https://docs.factorcode.org/content/vocab-combinators.html
