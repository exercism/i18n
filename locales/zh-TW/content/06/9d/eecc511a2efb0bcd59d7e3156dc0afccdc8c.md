# 指令補充

## 提示

你需要實作`diamond`函式，它會印出一個菱形，這個菱形從`A`開始，並在最寬處使用指定的字元。如果你不確定型別，可以使用提供的簽名，但別讓它限制了你的創意：

```haskell
diamond :: Char -> Maybe [String]
```

這個練習處理的是文字資料。基於歷史因素，Haskell 的`String`型別與`[Char]`同義，也就是字元陣列。若要更有效率地處理文字資料，可以使用`Text`型別。

作為這個練習的選用延伸，你可以

- 閱讀 Haskell 的[字串型別](https://haskell-lang.org/tutorial/string-types)。
- 在 package.yaml 的相依清單中加入`- text`。
- 依照[下列方式](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c)匯入`Data.Text`：

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- 現在你可以寫出例如`diamond :: Char -> Maybe [Text]`，並用例如`T.pack`來取用`Data.Text`的組合子，
- 查閱[`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html)的文件，
- 接著你可以在 Diamond.hs 中，把所有`String`的出現位置替換成`Text`：

```haskell
diamond :: Char -> Maybe [Text]
```

這部分完全是選用的喔。
