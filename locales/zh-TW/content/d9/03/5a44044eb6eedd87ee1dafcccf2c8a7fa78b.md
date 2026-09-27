# 說明

你的社區協會請你管理花園的圃地登記。狀態存放在兩個動態變數裡：

- `registrations`，目前指派給某個人的 `plot` 元組向量。
- `next-id`，下一次登記要使用的整數。

`plot` 元組有兩個欄位：

| 欄位            | 型別     |
| --------------- | -------- |
| `id`            | 整數     |
| `registered-to` | 字串     |

## 1. 開啟花園並列出登記資料

定義 `open-garden` 來初始化動態變數：`registrations` 用空向量，`next-id` 用 `1`。接著定義 `list-registrations`，回傳目前的圃地向量。

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. 登記一塊圃地

定義 `register`：從堆疊取出一個名字，用下一個可用的 id 建立一個新的 `plot`，將它附加到 `registrations` 向量，把 `next-id` 加一，然後回傳這個新的圃地。

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

圃地 id 必須唯一，而且即使在釋放之後也要持續遞增，`next-id` 絕不應該重複使用同一個值。

## 3. 釋放圃地

定義 `release`：接收一個 id，並從 `registrations` 移除相符的項目。釋放未知的 id 不會有任何作用。

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. 取得已登記的圃地

定義 `get-registration`：接收一個 id，回傳相符的圃地；如果沒有圃地使用該 id，則回傳符號 `not-found`。

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. 依名字尋找圃地

定義 `find-by-name`：接收一個名字，回傳目前登記在該人名下的所有圃地的向量。

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
