# 古怪的派对机器人

## 故事

从前有一位古怪的程序员，住在一栋装着铁窗的怪房子里。有一天，他从一个在线招聘网站上接了一份工作：造一个派对机器人。机器人要负责迎接客人，并带他们入座。他最先加上的那部分功能非常技术化，暴露出这位程序员不擅长与人打交道。其中一些功能还保留到了最终版本里。

## 任务

- 用下面这句话迎接每个人：

```
Welcome to my party, <name>!
```

- 如果某位客人今天过生日，就用下面这种方式迎接他，好炫耀一下机器人对每位客人的了解：

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- 如果有人问自己的座位在哪里，就用下面这段话告诉他怎么走到自己那一桌：

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## 实现

- [Go: strings][implementation-go]（参考实现）

## 参考

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
