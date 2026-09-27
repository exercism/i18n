# 古怪的派對機器人

## 故事

從前有一位古怪的程式設計師，住在一棟裝了鐵窗的奇怪房子裡。有一天，他在一個線上求職網站上接下一份工作，要打造一台派對機器人。這台機器人應該要問候賓客，並帶他們入座。第一個版本非常技術導向，也顯露出這位程式設計師缺乏與人互動的經驗。其中有些部分最後也保留到了最終版本。

## 任務

- 用以下內容問候每個人：

```
Welcome to my party, <name>!
```

- 對於今天生日的賓客，則用以下方式問候，以展現這台機器人對每位賓客的了解：

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- 有人詢問自己的座位時，用以下內容告訴他怎麼走到自己的桌子：

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## 實作

- [Go：字串][implementation-go]（參考實作）

## 參考資料

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
