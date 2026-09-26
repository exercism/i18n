# 説明

名前と数値が与えられます。その名前と数値を[序数詞][ordinal-numeral]として使った文を作るのが課題です。
Yaʻqūbは、1から999までの数値を使うことを想定しています。

ルール：

- 1で終わる数値（11で終わる場合を除く）→`"st"`
- 2で終わる数値（12で終わる場合を除く）→`"nd"`
- 3で終わる数値（13で終わる場合を除く）→`"rd"`
- それ以外のすべての数値→`"th"`

例：

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
