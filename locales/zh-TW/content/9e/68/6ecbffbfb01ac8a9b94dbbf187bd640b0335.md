# 說明

給定一個名字和一個數字，你的任務是用這個名字和這個數字造出一個句子，其中數字要以[序數詞][ordinal-numeral]的形式呈現。
Yaʻqūb 預期會用到 1 到 999 的數字。

規則：

- 以 1 結尾的數字（結尾是 11 的除外）→ `"st"`
- 以 2 結尾的數字（結尾是 12 的除外）→ `"nd"`
- 以 3 結尾的數字（結尾是 13 的除外）→ `"rd"`
- 其他所有數字 → `"th"`

範例：

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
