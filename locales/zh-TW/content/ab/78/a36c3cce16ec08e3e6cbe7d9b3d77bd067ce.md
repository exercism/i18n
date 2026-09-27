# 在 Pyret 軌道上測試

## 安裝前置需求

順利下載練習之後，你需要安裝 Node.js 模組才能執行測試：

```sh
cd /path/to/exercise
npm install
```

接著把含有`pyret`命令列工具的目錄加入你的 $PATH

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## 開始使用

練習目錄裡會有幾個檔案，但其中最重要的 2 個是你的解答檔和測試檔。
在下面的範例中，我們下載了閏年練習。

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

要執行測試，如果你已經下載官方的 Exercism CLI，可以使用`exercism test`，或是執行`pyret leap-test.arr`。
Pyret 會執行測試套件，其中包含一連串標記的`check`區塊，這些區塊會用特定的輸入和預期結果來測試你的解答檔。
這個過程中很關鍵的一點，就是明確匯出你部分的程式碼，讓測試套件能看到它們。

## provide

這個軌道上的測試會匯入你的檔案，因此可以存取你程式碼中明確匯出的任何內容。

要匯出變數，你需要在檔案開頭加入 [provide 敘述][provide-statement]。

下面的 2 個片段是匯出 `a`、`b` 和 `c` 的兩種有效方式。

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

第 3 種方法`provide *`是匯出所有頂層綁定的簡寫，但不包含自訂資料型態。不過一般不建議這樣做，因為 Pyret 嚴格禁止[遮蔽][shadowing]。

## provide-types

有些練習會要求匯出[自訂資料型態][data-definition]以供測試使用。
在這種情況下，你可以使用 [provide-types 敘述][provide-types-statement]。
由於資料型態可能還有一些不會被匯出的額外函式，因此建議使用`provide-types *`，即使有遮蔽的顧慮也是一樣。

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

所有練習的起始檔案都會設定好`provide`或`provide-types`敘述供你使用。

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
