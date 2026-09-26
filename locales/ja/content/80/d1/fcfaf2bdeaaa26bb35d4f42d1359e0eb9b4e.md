# 説明

この演習では、ログファイルの解析を扱います。

最近のセキュリティレビューを受けて、組織でアーカイブされているログファイルを整理するよう依頼されました。

関数に渡される文字列は、すべてnullではなく、先頭と末尾に空白がないことが保証されています。

## 1. 文字化けしたログ行を特定する

アーカイブ内のログ行のうち、現在の基準に準拠していないものがどれくらいあるのか、おおよその見当をつける必要があります。
簡単なテストで、そのログ行が有効かどうかがわかると考えています。
有効とみなされるには、行が次のいずれかの文字列で始まっている必要があります。

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

文字列が有効でなければ`false`、そうでなければ`true`を返す`IsValidLine`関数を実装しましょう。

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. ログ行を分割する

新しいチームが組織に加わり、そのチームのログファイルでは「フィールド」の区切りに変わった区切り文字が使われていることに気づきます。
コロン「:」のような常識的なものではなく、"<--->"や"<=>"のような文字列を使っているのです（そのほうがきれいだからです）。実際、最初の文字が"<"で最後の文字が">"であり、その間に"~"、"\*"、"="、"-"の任意の組み合わせが入る文字列なら何でも構いません。

行を受け取り、それぞれがフィールドを含む文字列の配列を返す`SplitLogLine`関数を実装しましょう。

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. 引用符で囲まれたテキストに`password`を含む行の数を数える

チームは、引用符で囲まれたテキスト内のパスワードへの言及を把握して、手作業で確認できるようにする必要があります。

手作業がどれくらいの規模になりそうかの目安を示すために、`CountQuotedPasswords`関数を実装しましょう。

"password"という文字列が、大文字と小文字の任意の組み合わせで、引用符で囲まれているログ行を特定します。
"password"の前後で、引用符の内側に追加の内容がある可能性も考慮する必要があります。
各行に含まれる引用符は最大2つです。

この処理に渡される行は、タスク1で定義した有効な行である場合もあれば、そうでない場合もあります。
有効かどうかに関わらず、同じ方法で処理します。

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. ログから不要な文字列を取り除く

ログの上流処理の一部が、"end-of-line"というテキストとそれに続く行番号（間に空白は入りません）をログ全体に散りばめていることに気づきました。

文字列を受け取り、end-of-lineテキストを取り除いて「きれいな」文字列を返す`RemoveEndOfLineText`関数を実装しましょう。

end-of-lineテキストを含まない行は、そのまま返す必要があります。

end-of-line文字列だけを取り除きます。
空白の調整は行わないでください。

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. ユーザー名で行にタグを付ける

ログ行の中には、ユーザーに言及した文が含まれているものがあることに気づきました。
これらの文には、必ず`"User"`という文字列のあとに1つ以上の空白文字、そしてユーザー名が続きます。
そこで、そのような行にタグを付けることにします。

ログ行を処理する`TagWithUserName`関数を実装しましょう。

- `"User "`という文字列を含まない行は、変更されません。
- `"User "`という文字列を含む行には、行の先頭に`[USR]`とユーザー名を付けます。

たとえば、次のようになります。

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

次のことを前提としてかまいません。

- ログ内では、ユーザー名のあとに少なくとも1つの空白文字が続きます。
- 各行に`"User "`という文字列は最大1回しか現れません。
- ユーザー名は空ではなく、空白文字を含まない文字列です。
