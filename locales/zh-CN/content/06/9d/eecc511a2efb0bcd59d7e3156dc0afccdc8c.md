# 补充说明

## 提示

你需要实现 `diamond` 函数，它会打印一个菱形：从 `A` 开始，最宽处为给定的字符。如果不确定类型，可以使用提供的签名，但别让它限制你的创造力：

```haskell
diamond :: Char -> Maybe [String]
```

本练习处理的是文本数据。由于历史原因，Haskell 的 `String` 类型等同于 `[Char]`，也就是一个字符数组。若要更高效地处理文本数据，可以使用 `Text` 类型。

作为本练习的可选扩展，你可以

- 阅读 Haskell 中关于[字符串类型](https://haskell-lang.org/tutorial/string-types)的内容。
- 在 package.yaml 的依赖列表中加入 `- text`。
- 按[下面的方式](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c)导入 `Data.Text`：

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- 现在你可以写 `diamond :: Char -> Maybe [Text]` 这样的代码，并以 `T.pack` 这样的方式引用 `Data.Text` 的组合子，
- 查阅 [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) 的文档，
- 然后你就可以在 Diamond.hs 中把所有 `String` 都替换成 `Text`：

```haskell
diamond :: Char -> Maybe [Text]
```

这部分完全是可选的。
