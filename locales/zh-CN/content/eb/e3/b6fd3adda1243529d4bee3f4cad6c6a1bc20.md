# 提示

## 通用

- 本练习的所有部分都依赖位运算。
  - Exercism 的[学习大纲][concept-bitwise-operations]提供了循序渐进的入门介绍。
  - Julia 手册里列出了[位运算符][ref-bitwise-operators]。
  - `Base`中包含各种有用的位相关函数，包括[`count_ones()`][count_ones]和[`trailing_zeros()`][trailing_zeros]。
- 测试尽量不对类型做限定，但本练习处理的是无符号字节，[`UInt8`][uint8]值相对容易推理。
  - 参数和返回值都是`Vector{UInt8}`，
  - `UInt8`值适合用来做位掩码和中间值。
- 十进制数字会让人分心，所以`UInt8`字面量最好用十六进制（`0xFF`）或二进制（`0b11111111`）。
  - [`bitstring()`][bitstring]函数在调试时很有用，它会输出人类可读的二进制格式。
- 原始消息以 8 位块组成的数组形式传入，需要转换成放在高位的 7 位块，外加一个作为最低有效位的奇偶校验位。
  - 用位掩码配合`&`或`|`来分离出需要的位。
  - 左移（`<<`）和逻辑右移（`>>>`）运算符很重要。
  - 想好如何把多余的位带到下一轮处理中。
  - 因为有这些要传递的位，很难彼此独立地处理各个输入字节，所以用循环（或者递归）可能比硬套高阶函数更简单。
  - 编码后的消息通常比原始消息更长（字节数更多），因为每个字节都要容纳一个奇偶校验位。


  [concept-bitwise-operations]: https://exercism.org/tracks/julia/concepts/bitwise-operations
  [ref-bitwise-operators]: https://docs.julialang.org/en/v1/manual/mathematical-operations/#Bitwise-Operators
  [count_ones]: https://docs.julialang.org/en/v1/base/numbers/#Base.count_ones
  [trailing_zeros]: https://docs.julialang.org/en/v1/base/numbers/#Base.trailing_zeros
  [uint8]: https://docs.julialang.org/en/v1/base/numbers/#Core.UInt8
  [bitstring]: https://docs.julialang.org/en/v1/base/numbers/#Base.bitstring
