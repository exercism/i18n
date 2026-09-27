# 指令

在你的 DNA 研究實驗室裡，你一直在嘗試各種壓縮研究資料的方法，以節省儲存空間。有位隊友建議把 DNA 資料轉換成二進位表示法：

| 核酸     | 編碼  |
| ------------ | ----- |
| Adenine      |  `00` |
| Cytosine     |  `01` |
| Guanine      |  `10` |
| Thymine      |  `11` |

你仔細想了想，這或許能降低所需的資料儲存成本，但代價是犧牲人類可讀性。你決定寫一個模組來編碼與解碼資料，藉此評估能省下多少空間。

## 1. 將核酸編碼為二進位值

實作 `encode_nucleotide`，讓它接受核苷酸，並回傳編碼後代碼的整數值。

```gleam
encode_nucleotide(Cytosine)
// -> 1
// (which is equal to 0b01)
```

## 2. 將二進位值解碼為核酸

實作 `decode_nucleotide`，讓它接受編碼後代碼的整數值，並回傳對應的核苷酸。

```gleam
decode_nucleotide(0b01)
// -> Ok(Cytosine)
```

## 3. 將 DNA 陣列編碼

實作 `encode`，讓它接受由核苷酸組成的陣列，並回傳編碼資料的位元陣列。

```gleam
encode([Adenine, Cytosine, Guanine, Thymine])
// -> <<27>>
```

## 4. 解碼 DNA 位元陣列

實作 `decode`，讓它接受代表核酸的位元陣列，並將解碼後的資料以核苷酸陣列的形式回傳。

```gleam
decode(<<27>>)
// -> Ok([Adenine, Cytosine, Guanine, Thymine])
```
