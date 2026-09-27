# 指示

你的朋友 Li Mei 經營一家果汁吧，販售美味的綜合果汁。
你是她店裡的常客，也發現自己可以讓朋友的生活輕鬆一些。
你決定運用你的程式設計技能，幫 Li Mei 分擔她的工作。

## 1. 判斷調製一杯果汁需要多久時間

Li Mei 喜歡事先告訴客人，他們從菜單上點的果汁需要等多久。
她很難記住確切的數字，因為每種果汁調製所需的時間都不一樣。
`"Pure Strawberry Joy"`需要 0.5 分鐘，`"Energizer"`和 `"Green Garden"`各需要 1.5 分鐘，`"Tropical Island"`需要 3 分鐘，而 `"All or Nothing"`需要 5 分鐘。
至於其他所有飲品（例如特價品），可以假設製作時間是 2.5 分鐘。

為了幫你的朋友，請寫一個 `time_to_mix_juice` 函式，它接受菜單上的一種果汁作為引數，並回傳調製該杯果汁所需的分鐘數。

```julia-repl
julia> time_to_mix_juice("Tropical Island")
3

julia> time_to_mix_juice("Berries & Lime")
2.5
```

## 2. 補充萊姆角存量

Li Mei 的許多作品都會用到萊姆角，不論是當作材料，還是作為裝飾的一部分。
所以每天早上開始上班時，她都得確認萊姆角盒是滿的，足以應付接下來的一天。

實作 `limes_to_cut` 函式，它接受 Li Mei 需要切的萊姆角數量，以及一個代表她手邊整顆萊姆存量的陣列。
一顆 `"small"` 萊姆可以切出 6 個萊姆角，一顆 `"medium"` 萊姆可以切出 8 個，一顆 `"large"` 萊姆則可以切出 10 個。
她總是照著清單中的順序切萊姆，從第一顆開始。
她會一直切下去，直到切足所需的萊姆角數量，或是萊姆用完為止。

Li Mei 想事先知道自己需要切幾顆萊姆。
`limes_to_cut` 函式應該回傳需要切的萊姆數量。

```julia-repl
julia> limes_to_cut(25, ["small", "small", "large", "medium", "small"])
4
```

## 3. 列出佇列中每筆訂單的調製時間

Li Mei 喜歡掌握顧客正在等待的訂單各需要多久的調製時間。

實作 `order_times` 函式，它接受一個訂單佇列，並回傳一個調製時間的向量。

```julia-repl
julia> order_times(["Energizer", "Tropical Island"])
[1.5, 3.0]
```

## 4. 結束輪班

Li Mei 總是工作到下午 3 點。
之後由她的員工 Dmitry 接手。
Li Mei 的班結束時，常常還有已經點好、但還沒調製的飲品。
Dmitry 會接著調製剩下的果汁。

為了讓交接更順利，請實作 `remaining_orders` 函式，它接受 Li Mei 這班剩下的分鐘數，以及一個裝著已點但還沒調製的果汁陣列。
這個函式應該回傳 Li Mei 在下班前無法開始調製的訂單。

這班剩下的時間永遠大於 0。
要調製的果汁陣列永遠不會是空的。
此外，訂單會按照它們在陣列中出現的順序調製。
如果 Li Mei 開始調製某杯果汁，即使得多工作一會兒，她也一定會把它調完。
如果沒有剩下任何需要 Dmitry 處理的訂單，則應回傳一個空向量。

```julia-repl
julia> remaining_orders(5, ["Energizer", "All or Nothing", "Green Garden"])
["Green Garden"]
```
