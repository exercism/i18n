# 提示

## 一般

- `include`要放在類別裡面，通常放在第一行。
- 只有你重新命名或省略的部分會改變，其他一切都會原樣帶進來。

## 1. 爵士舞碼

- 類別裡只要一行：`include WARM_UP;`
- 不用其他東西。類別主體就只有那一行，沒有別的。

## 2. 踢踏舞碼

- `include WARM_UP describe -> ;`
- `-> ;`箭頭後面什麼都沒有，也就是把 `describe` 省略掉，這樣才空得出位置給你寫的那一個。
- 沒有這樣寫的話，編譯器會抱怨 `describe` 被定義了兩次。這個錯誤正是刻意設計的功能：Sather 不會默默自己挑一個。

## 3. 終場

- 在同一個 include 裡放兩個項目，用逗號分隔：
  `include WARM_UP counts -> warm_up_counts, describe -> ;`
- 接著寫 `counts`，讓它回傳 `warm_up_counts * 2`，再寫 `describe`。
- `describe` 應該呼叫 `counts`，不要自己再把數字算一次。
- 記得數字不能直接加上字串，所以讓描述以文字開頭就可以了：`"Finale: " + counts + " counts"`。
