# 詩社門禁規則

## 故事

鎮上開了一間新的詩社，你正考慮要不要參加。因為過去曾經發生過一些狀況，這間詩社有一套非常特別的門禁規則，你得先學會這套規則，才能試著進門。

詩社有兩道門，兩道都有警衛看守。想進門的話，你得先解出當天的密碼：

### 前門

1. 警衛會朗誦一首詩，一次一行；
   - 你要用對應的字母回應。
2. 警衛會把你回應過的所有字母一次告訴你；
   - 你要把這些字母排成一個首字母大寫的單字。

舉例來說，他們最喜歡的作家之一是 Michael Lockwood，他寫過下面這首_藏頭詩_，也就是每個句子的第一個字母會組成一個單字：

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

當警衛唸出 **Stands so high** 時，你要回應 **S**；當警衛唸出 **Huge hooves too** 時，你要回應 **H**。

最後你寫下的密碼是 `Shire`，這樣就能進去了。

### 後門

在詩社的後方，你會遇到最有名的詩人，那裡就像是 VIP 區。因為這不是每個人都能進去的，所以後門的流程稍微複雜一點。

1. 警衛會朗誦一首詩，一次一行；
   - 你要用對應的字母回應。
2. 警衛會把你回應過的所有字母一次告訴你，_但句子之間有時會有空格_：
   - 你要把這些字母排成一個首字母大寫的單字
   - 而且要有禮貌地問，在後面加上 `, please`

舉例來說，前面提到的那首詩同時也是_藏尾詩_，也就是每個句子的最後一個字母會組成一個單字：

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

當警衛唸出 **Stands so high** 時，你要回應 **h**；當警衛唸出 **Huge hooves too** 時，你要回應 **o**。

最後你寫下的密碼是 `Horse, please`，這樣你就能和那些知名詩人一起同樂了。

## 實作

- [JavaScript：字串][implementation-javascript]（參考實作）
- [Swift：字串元件][implementation-swift]

## 參考

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-javascript]: https://github.com/exercism/javascript/blob/main/exercises/concept/strings/.docs/instructions.md
[implementation-swift]: https://github.com/exercism/swift/blob/main/exercises/concept/poetry-club/.docs/instructions.md
