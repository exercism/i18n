# 說明

你的一位朋友正在學怎麼解 Killer 數獨（規則如下），但一直搞不清楚哪些數字可以放進籠裡。他請你幫個忙，寫一個小程式，列出指定籠所有有效的組合，以及任何會影響這個籠的限制。

為了讓你程式的輸出容易閱讀，它回傳的組合必須經過排序。

## Killer 數獨規則

- 遵循[標準數獨規則][sudoku-rules]。
- 籠裡的數字通常以虛線標示，加起來會等於寫在籠角落的小數字。
- 每個數字在一個籠裡只能出現一次。

想看更詳細的說明，可以參考[這份指南][killer-guide]。

## 範例 1：只有 1 種可能組合的籠

在一個總和為 7、由 3 個數字組成的籠裡，只有一種有效的組合：124。

- 1 + 2 + 4 = 7
- 任何其他加起來等於 7 的組合，例如 232，都會違反籠內數字不得重複的規則。

![數獨盤面，其中有三個籠被標示為同一組。
第一個籠位於盤面左上角的 3×3 宮裡。
那一宮中間的直行構成這個籠，從上到下的格子依序是：第一格有 1 和鉛筆標記 7，代表籠的總和為 7，第二格有 2，第三格有 5。
這些數字以紅色標示，代表有錯誤。
第二個籠位於盤面正中央的 3×3 宮裡。
那一宮中間的直行構成這個籠，從上到下的格子依序是：第一格有 1 和鉛筆標記 7，代表籠的總和為 7，第二格有 2，第三格有 4。
這個籠裡的數字都沒有被標紅，因此沒有任何錯誤。
第三個籠沿著盤面中央 3×3 宮的外側角落。
它由以下三格組成：籠的左上角那一格有 2，以紅色標示，以及籠的總和 7。
籠的右上角那一格有 3。
籠的右下角那一格有 2，以紅色標示。其他所有格子都是空的。][one-solution-img]

## 範例 2：有數種組合的籠

在一個總和為 10、由 2 個數字組成的籠裡，有 4 種可能的組合：

- 19
- 28
- 37
- 46

![數獨盤面，所有格子都是空的，只有中間第 5 直行填了 8 格。
每相鄰的兩格構成一個籠，並標示為同一組。
從上到下：第一組是有值 1 的格子和標示籠總和為 10 的鉛筆標記、有值 9 的格子。
第二組是有值 2 的格子和鉛筆標記 10、有值 8 的格子。
第三組是有值 3 的格子和鉛筆標記 10、有值 7 的格子。
第四組是有值 4 的格子和鉛筆標記 10、有值 6 的格子。
這一行的最後一格是空的。][four-solutions-img]

## 範例 3：有多種可能組合但受到限制的籠

在一個總和為 10、由 2 個數字組成的籠裡，如果這一行的直行已經有 1 和 4，就只有 2 種可能的組合：

- 28
- 37

根據標準數獨規則，由於這一行的直行裡已經有 1 和 4，所以 19 和 46 都不可能。

![數獨盤面，所有格子都是空的，只有中間第 5 直行填了 8 格。
第一格是 4，第二格是空的，第三格是 1。
這個 1 以紅色標示，代表有錯誤。
這一行的最後 6 格每兩格組成一個籠。
從上到下：第一組是有值 2 的格子和標示籠總和為 10 的鉛筆標記、有值 8 的格子。
第二組是有值 3 的格子和鉛筆標記 10、有值 7 的格子。
第三組是有值 1（以紅色標示）的格子和鉛筆標記 10、有值 9 的格子。][not-possible-img]

## 自己試試看

如果你想試試看一道平易近人的 Killer 數獨，可以挑戰 Clover 設計的[這道謎題][clover-puzzle]，它曾在 2021 年 6 月 21 日由 [Mark Goodliffe 在 Cracking The Cryptic 頻道上介紹][goodliffe-video]。

你也可以在許多報紙，以及數獨 App、書籍和網站上，找到難度各異的 Killer 數獨。

## 致謝

上方的截圖是用 [F-Puzzles.com](https://www.f-puzzles.com/) 製作的，這是 Eric Fox 開發的謎題設計工具。

[sudoku-rules]: https://masteringsudoku.com/sudoku-rules-beginners/
[killer-guide]: https://masteringsudoku.com/killer-sudoku/
[one-solution-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example1.png
[four-solutions-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example2.png
[not-possible-img]: https://assets.exercism.org/images/exercises/killer-sudoku-helper/example3.png
[clover-puzzle]: https://app.crackingthecryptic.com/sudoku/HqTBn3Pr6R
[goodliffe-video]: https://youtu.be/c_NjEbFEeW0?t=1180
