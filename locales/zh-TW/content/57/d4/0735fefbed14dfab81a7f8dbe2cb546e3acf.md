# Rexx 風格指南

本指南說明 Rexx track 的練習測試檔與範例檔應遵循的風格。

## Rexx 標準

程式碼應符合 Rexx 語言 5.0 版。

可以使用 Regina Rexx 擴充功能，以及用來存取外部函式庫的 SAA 標準函式。

不應使用 AREXX 擴充功能，以及 CMS 緩衝區操作常式。

## 平台

執行時期的測試環境以 Linux 為基礎，因此在 ADDRESS 指令的呼叫中，只能使用該環境中可用的命令。這些命令應在程式碼註解中清楚標示。

## 命名

### 指令

指令（保留字）應以**_小寫_**呈現。因此，以下寫法符合風格指南的建議：

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

而以下兩者都不符合，因此不建議：

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

以及：

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### 內建函式（BIFs）

BIF 應以**_大寫_**呈現，如下所示：

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### 標籤（使用者自訂函式）

標籤名稱應使用**_Pascal case_**，如下所示：

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### 變數

變數名稱應以**_小寫_**字母開頭，因此單字變數會是全小寫。

多字變數可以用**_camel case_**或**_snake case_**表示。

本 track 採用的慣例是_大多數變數使用 camel case_，而 snake case 保留給測試變數。作為常數使用的變數，也可以選擇使用大寫。

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## 常值

字串可以用單引號或雙引號標示，分別是**`'`**和**`"`**。以下兩者等價：

```rexx
say "Hello, world!"

say 'Hello, world!'
```

兩者可以互相嵌入，不需要逸出字元：

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

除非字串內含引號，必須混用不同的引號，否則建議字串使用**_單引號_**標示。

### 十六進位與二進位字串

二進位值和十六進位值可以分別在字串後加上**`B`**或**`X`**來表示。例如：

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

建議這類值用**_雙引號_**括住。

連同前面建議用單引號表示一般字串，這項慣例應有助於在程式碼基底中辨識二進位與十六進位字串。

### 換行結束字元
在許多 UNIX 或受 C 影響的語言中，常值**_`\n`_**用來作為**_換行_**結束字元。這種用法很普遍，本 track 有幾個練習會使用與操作含有這個結束字元的字串。

Rexx 不支援這個結束字元，也不支援用**_`\`_**（或任何其他字元）作為逸出字元。

Rexx 中對應換行字元的是（依平台而定的）十六進位值；在以 UNIX 為基礎的平台上，它是：

**_`"0A"X`_**

以下這個內嵌換行字元的字串（使用 bash shell）：

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

其 Rexx 對應寫法是：

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

本 track 的練習只有在字串要用於終端機顯示時，才會把**_`\n`_**轉換成**_`"0A"X`_**。否則，**_`\n`_**字串只會被解讀為邏輯上的換行。

## 其他風格建議

縮排可以使用兩個、三個或四個空格字元，不過建議使用_兩個字元_的縮排，並保持一致。

函式中最後一個**_return_**指令應與標籤名稱對齊，清楚標示該函式的結尾，而且_一定要_回傳一個值。

布林 NOT 運算子可以用幾種不同的符號表示。本 track 偏好的符號是**`\`**，而為了與此用法保持一致，關聯性的「不等於」運算子應使用**`\=`**。

布林值**`false`**和**`true`**分別以**`0`**和**`1`**表示。這些值沒有預先定義的常值。

錯誤狀態用回傳值表示，空字串**`''`**或**`-1`**都代表錯誤狀態，視情況而定。

## 標準程式碼風格範例
```rexx
TO DO EXAMPLE
```

## 測試檔結構

每個練習會有一個測試檔，位於練習的最上層目錄，命名為：`<exercise>-check.rexx`

遵循這個慣例，`acronym`練習的測試檔就會命名為：`acronym-check.rexx`

每個練習的測試檔都按一種寬鬆但明確的方式編排，既要幫助學習者了解練習的要求，也要方便貢獻者實作或擴充測試。

以下是 `acronym` 練習測試檔的一部分：

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

這個檔案分成兩個邏輯區段，各自以一行註解標示。

第一區段把**_待測函式_**的名稱（這裡是 `Abbreviate`函式）指定給 `function`變數。這個變數名稱有其描述性，但可任意取用，檔案其餘部分凡是需要待測函式名稱的地方，都會引用它。

這一區段中也有一次對 `context`函式的呼叫，其用途不言而喻。

下一區段包含單元測試。每次呼叫 `check`函式就是一個單元測試。預期的參數如下：

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>**是測試執行時輸出的字串。為了讓它盡可能具有描述性，建議使用由待測函式名稱及傳入的引數組成的字串，如範例所示。

**\<function invocation>**是實際的函式呼叫，也就是把它的回傳值傳給 `check` 進行測試比較。

**\<actual result variable>**是選用參數，若使用的話，它是含有測試比較所用之值的變數名稱。

使用它的原因是，可以檢查_衍生自_待測函式回傳值的結果，而不是回傳值本身。一個明顯的例子是回傳值為數 KB 的字串，如下所示：

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

請注意，\<function invocation> 引數仍然必須傳入。

**\<test comparator>**是描述要執行何種比較的字串。大多數情況下，這個字串會是 'to be'，表示要求進行相等比較。其他比較選項請參閱單元測試框架的說明文件。

**\<expected result>**不言而喻，就是實際結果與之比較的值。

測試檔中可以自由宣告變數（當然是在使用之前），並用它取代常值，作為 `check` 的引數。
