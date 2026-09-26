# 说明

给定一个名字和一个数字，你的任务是使用这个名字和数字造一个句子，其中数字要写成[序数词][ordinal-numeral]。
Yaʻqūb 期望使用的数字范围是 1 到 999。

规则：

- 以 1 结尾的数字（除非以 11 结尾） → `"st"`
- 以 2 结尾的数字（除非以 12 结尾） → `"nd"`
- 以 3 结尾的数字（除非以 13 结尾） → `"rd"`
- 所有其他数字 → `"th"`

示例：

- `"Mary", 1` → `"Mary, you are the 1st customer we serve today. Thank you!"`
- `"John", 12` → `"John, you are the 12th customer we serve today. Thank you!"`
- `"Dahir", 162` → `"Dahir, you are the 162nd customer we serve today. Thank you!"`

[ordinal-numeral]: https://en.wikipedia.org/wiki/Ordinal_numeral
