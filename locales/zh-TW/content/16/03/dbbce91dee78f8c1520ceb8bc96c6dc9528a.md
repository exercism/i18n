# 指示

建立仿射密碼的實作，這是一種源自中東的古老加密系統。

仿射密碼是一種單表替換密碼。
每個字元會對應到它的數值，用數學函式加密，然後轉換成與新數值相關的字母。
雖然所有單表替換密碼都很弱，但仿射密碼比埃特巴什密碼強得多，因為它有更多金鑰。

[//]: # " monoalphabetic as spelled by Merriam-Webster, compare to polyalphabetic "

## 加密

加密函式是：

```text
E(x) = (ai + b) mod m
```

其中：

- `i`是字母的索引，從`0`到字母表長度減 1。
- `m`是字母表的長度。
  對拉丁字母而言，`m`是`26`。
- `a`和`b`是整數，它們組成加密金鑰。

`a`和`m`的值必須是_互質_（或稱_互質_），自動解密才能成功，亦即它們唯一的公因數是`1`（更多資訊可以在[關於互質整數的維基百科條目][coprime-integers]中找到）。
如果`a`與`m`不是互質，你的程式應該指出這是錯誤。
否則，它應該使用提供的金鑰進行加密或解密。

就這個練習而言，數字是有效輸入，但不會被加密。
空格和標點字元會被排除。
密文會以固定長度的分組寫出，並以空格分隔，傳統的分組大小是`5`個字母。
這樣做是為了讓別人更難根據單字邊界猜出加密文字。

## 解密

解密函式是：

```text
D(y) = (a^-1)(y - b) mod m
```

其中：

- `y`是加密字母的數值，亦即`y = E(x)`
- 重要的是，`a^-1`是`a mod m`的模反元素（MMI）
- 模反元素只有在`a`和`m`互質時才存在。

`a`的模反元素是這樣的`x`：將`ax`除以`m`後的餘數為`1`：

```text
ax mod m = 1
```

關於如何求得模反元素以及它的意義，更多資訊可以在[相關的維基百科條目][mmi]中找到。

## 一般範例

- 使用金鑰`a = 5`、`b = 7`加密`"test"`會得到`"ybty"`
- 使用金鑰`a = 5`、`b = 7`解密`"ybty"`會得到`"test"`
- 使用錯誤的金鑰`a = 11`、`b = 7`解密`"ybty"`會得到`"lqul"`
- 使用金鑰`a = 19`、`b = 13`解密`"kqlfd jzvgy tpaet icdhm rtwly kqlon ubstx"`會得到`"thequickbrownfoxjumpsoverthelazydog"`
- 使用金鑰`a = 18`、`b = 13`加密`"test"`會是錯誤，因為`18`和`26`不是互質

## 尋找模反元素（MMI）的範例

尋找`a = 15`的模反元素：

- `(15 * x) mod 26 = 1`
- `(15 * 7) mod 26 = 1`，亦即`105 mod 26 = 1`
- `7`是`15 mod 26`的模反元素

[mmi]: https://en.wikipedia.org/wiki/Modular_multiplicative_inverse
[coprime-integers]: https://en.wikipedia.org/wiki/Coprime_integers
