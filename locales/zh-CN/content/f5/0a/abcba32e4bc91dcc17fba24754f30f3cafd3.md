# 补充说明

## 网格格式

网格用一个以空字符结尾的字符串表示，每一行的末尾都有一个换行符。

## 寄存器

| Register | Usage        | Type    | Description                                                               |
| -------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`    | input        | address | null-terminated input string                                              |
| `$a1`    | input/output | address | null-terminated result string, empty if grid dimensions invalid           |
| `$v0`    | output       | integer | grid status (`0` = `ok`, `-1` = `invalid columns`, `-2` = `invalid rows`) |
| `$t0-9`  | temporary    | any     | for temporary storage                                                     |

| 寄存器 | 用途 | 类型 | 说明 |
| -------- | ------------ | ------- | ------------------------------------------------------------------------- |
| `$a0`    | 输入        | 地址 | 以空字符结尾的输入字符串                                              |
| `$a1`    | 输入/输出 | 地址 | 以空字符结尾的结果字符串，如果网格尺寸无效则为空           |
| `$v0`    | 输出       | 整数 | 网格状态（`0` = `ok`，`-1` = `invalid columns`，`-2` = `invalid rows`） |
| `$t0-9`  | 临时    | 任意     | 用于临时存储                                                     |
