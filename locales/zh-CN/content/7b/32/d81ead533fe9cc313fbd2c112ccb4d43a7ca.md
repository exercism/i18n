# 诗歌俱乐部入场规则

## 故事

镇上新开了一家诗歌俱乐部，你正想着去看看。因为以前出过一些事，这家俱乐部有一套非常特别的进门规则，想进去之前，你得先把它弄清楚。

诗歌俱乐部有两扇门，都有门卫把守。想进门，你得先推算出当天的暗号：

### 前门

1. 门卫会念一首诗，一次念一句；
   - 你要回应相应的字母。
2. 门卫会把你回应过的所有字母一次性告诉你；
   - 你需要把这些字母组成一个首字母大写的单词。

比如，他们最喜欢的作家之一是 Michael Lockwood，他写过下面这首*藏头诗*，也就是说，每句话的第一个字母能拼成一个单词：

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

当门卫念出**Stands so high**时，你要回应**S**；当门卫念出**Huge hooves too**时，你要回应**H**。

最后你写下的暗号就是`Shire`，这样就能进去了。

### 后门

俱乐部的后面聚集着最负盛名的诗人，那里就像 VIP 区。因为不是谁都能进，所以后门的流程要绕一些。

1. 门卫会念一首诗，一次念一句；
   - 你要回应相应的字母。
2. 门卫会把你回应过的所有字母一次性告诉你，*但每句话后面有时会多出空格*：
   - 你需要把这些字母组成一个首字母大写的单词
   - 还要礼貌地请求，在末尾加上`, please`

比如，前面提到的那首诗同时也是*藏尾诗*，也就是说，每句话的最后一个字母能拼成一个单词：

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

当门卫念出**Stands so high**时，你要回应**h**；当门卫念出**Huge hooves too**时，你要回应**o**。

最后你写下的暗号就是`Horse, please`，这样就能和最负盛名的诗人一起狂欢了。

## 实现

- [JavaScript: strings][implementation-javascript]（参考实现）
- [Swift: string-components][implementation-swift]

## 参考

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-javascript]: https://github.com/exercism/javascript/blob/main/exercises/concept/strings/.docs/instructions.md
[implementation-swift]: https://github.com/exercism/swift/blob/main/exercises/concept/poetry-club/.docs/instructions.md
