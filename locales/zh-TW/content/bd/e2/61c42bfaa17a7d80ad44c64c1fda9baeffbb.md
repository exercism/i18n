# 關於

詞彙是 Factor 裡的組織單位：一組具名、由詞的定義構成的集合。

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## 檔案與目錄結構

詞彙名稱以`.`分隔，檔案路徑就照著這些點分層：

| 詞彙 | 檔案 |
| --- | --- |
| `greetings` | `greetings/greetings.factor` |
| `greetings.formal` | `greetings/formal/formal.factor` |
| `greetings.casual` | `greetings/casual/casual.factor` |

Factor 的載入器會沿著*詞彙根目錄*（專案根目錄與隨附的 basis 函式庫）逐層尋找詞彙，直到找到名稱與每一段路徑都相符的目錄為止。最後一段會再重複一次，作為檔名。

## `USING:`和`IN:`

`USING:`（以及一次只載入一個詞彙的`USE:`）會把其他詞彙加入目前檔案的搜尋路徑。`IN:`則宣告這個檔案裡定義的詞*屬於*哪個詞彙：它們的完整限定名稱會以該前綴開頭。

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

這裡的`greet-everyone`屬於`greetings`，它呼叫`greetings.formal`裡的`hello`，以及`sequences`裡的`map`。

## 為什麼要把解法拆成多個詞彙

把程式碼拆成多個詞彙，可以讓你：

- 依職責把小型輔助詞分組，與組合它們的高階常式分開。
- 在其他地方重複使用這些輔助詞，而不必把主常式也一起拖進來。
- 把每個檔案讀成單一而連貫的抽象層。

Factor 的載入器夠快也夠惰性，把程式*往下*拆成更小的詞彙成本很低；標準函式庫的慣例，就是盡可能把程式拆解成詞彙。
