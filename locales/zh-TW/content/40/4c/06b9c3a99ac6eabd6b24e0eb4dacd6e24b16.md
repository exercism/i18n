# 簡介

## 關於模式的更多說明

回想一下 Fundamentals 概念，AWK 程式是由**模式與動作的配對**組成的。

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### 所謂的「模式」是什麼？

「模式」可以是任何 AWK 運算式。
運算式結果的真值，決定動作是否會被執行。

### 空模式

模式可以省略。
在這種情況下，動作會對每一筆記錄執行。

我們可以印出 passwd 檔案中所有的使用者名稱。

```sh
awk -F: '{print $1}' /etc/passwd
```

### 正規表示式

AWK 可以將字串與正規表示式比對，以取得布林結果。

使用`~`這個正規表示式比對運算子來比對特定的欄位。
這個運算子的左運算元是字串，右運算元是正規表示式。
正規表示式字面值以一對`/`斜線包住。

如要找出 passwd 檔案中使用 bash 登入的使用者：

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~`是「正規表示式**不**比對」運算子。

要將正規表示式與目前的記錄比對，可以寫成`$0 ~ /regex/`。
這種寫法太常見了，因此有簡寫：可以省略`$0`和`~`，直接寫`/regex/`。

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
把這個 AWK 一行指令與等效的 grep 指令比較一下

```sh
grep 'regex' data.txt
```

AWK 讓你擁有完整的程式語言，又不必犧牲簡潔。
~~~~

之後的概念會更深入介紹 GNU AWK 的正規表示式特色。

### 運算式

AWK 運算式（無論是算術、邏輯或其他類型）都可以當作模式使用。

如要取出所有 UID 大於等於 1000 的使用者：

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

回想一下，AWK 的 false 值是數字 0 和空字串，其他所有數字或字串都是 true。
任何評算出數字或字串的運算式，都可以當作模式使用。

### 函式

任何[內建][builtins]或[自訂][user-defined]函式都可以用在運算式中，因此也能用在模式裡。
以下是幾個例子：

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### 常數模式

常見的 AWK 慣用寫法是：

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1`是一個沒有對應動作的真值模式。
這代表「印出目前的記錄」。

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
