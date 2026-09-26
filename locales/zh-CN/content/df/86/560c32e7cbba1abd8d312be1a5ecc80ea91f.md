# 操作说明

在你的 DNA 研究实验室里，你一直在研究各种压缩研究数据以节省存储空间的方法。一位队友建议把 DNA 数据转换成二进制表示：

| 核酸 | 编码  |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

你仔细考虑了一下，这样做有可能降低所需的数据存储成本，但代价是可读性变差。你决定写一个模块来编码和解码数据，以便衡量节省了多少空间。

## 1. 将核酸编码为二进制值

实现 `encode_nucleotide`，接受一个核苷酸，并返回其编码对应的整数值。

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. 将二进制值解码为核酸

实现 `decode_nucleotide`，接受编码的整数值，并返回对应的核苷酸。

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. 编码 DNA 列表

实现 `encode`，接受一个核苷酸列表，并返回编码后数据的位数组。

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. 解码 DNA 位数组

实现 `decode`，接受一个表示核酸的位数组，并以核苷酸列表的形式返回解码后的数据。

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
