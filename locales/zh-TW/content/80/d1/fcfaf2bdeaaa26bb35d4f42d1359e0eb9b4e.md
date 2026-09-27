# 說明

這個練習會帶你解析日誌檔。

在最近一次安全審查之後，你被要求清理組織中封存的日誌檔。

所有傳入函式的字串都保證不是 null，而且沒有開頭與結尾的空白。

## 1. 辨識格式混亂的日誌行

你需要大致了解你的封存檔中有多少日誌行不符合現行標準。
你相信只要簡單測試一下，就能看出某一行日誌是否有效。
若要視為有效，一行必須以下列其中一個字串開頭：

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

實作`IsValidLine`函式，如果字串無效就回傳`false`，否則回傳`true`。

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. 分割日誌行

有一個新團隊加入了組織，而你發現他們的日誌檔使用了奇怪的「欄位」分隔符。
他們不用像冒號「:」這樣合理的字元，而是使用像「<--->」或「<=>」這樣的字串（因為比較好看）。事實上，任何字串只要第一個字元是「<」、最後一個字元是「>」，且中間是「~」、「\*」、「=」和「-」的任意組合都可以。

實作`SplitLogLine`函式，它接收一行並回傳一個字串陣列，其中每個字串各包含一個欄位。

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. 計算引號文字中包含`password`的行數

團隊需要知道引號文字中提及密碼的地方，以便手動檢查。

實作`CountQuotedPasswords`函式，以指出手動檢查可能的規模。

找出字串「password」（可能為任意大小寫組合）被引號包住的日誌行。
你應該考慮引號內在「password」前後可能有其他內容。
每一行最多只會有兩個引號。

傳入此函式的行，可能符合或不符合任務 1 所定義的有效性。
無論它們是否有效，我們都會以相同方式處理。

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. 移除日誌中的殘留文字

你發現某些日誌的上游處理程序會在日誌中四處散布「end-of-line」文字，後面接著行號（中間沒有空格）。

實作`RemoveEndOfLineText`函式，接收一個字串，移除 end-of-line 文字，並回傳一個「乾淨」的字串。

不包含 end-of-line 文字的行應保持原樣回傳。

只需移除 end-of-line 字串。
不要嘗試調整空白字元。

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. 為日誌行標註使用者名稱

你注意到有些日誌行包含提及使用者的句子。
這些句子總是包含字串`"User"`，後面接著一個或多個空白字元，然後是使用者名稱。
你決定為這類行加上標籤。

實作一個函式`TagWithUserName`，用來處理日誌行：

- 不包含字串`"User "`的行保持不變。
- 對於包含字串`"User "`的行，在該行前面加上`[USR]`，後面接著使用者名稱。

例如：

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

你可以假設：

- 在日誌中，使用者名稱後面至少會有一個空白字元。
- 每一行中，字串`"User "`最多只會出現一次。
- 使用者名稱是不含空白字元的非空字串。
