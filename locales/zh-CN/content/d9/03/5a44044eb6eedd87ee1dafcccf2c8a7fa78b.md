# 说明

你的社区协会请你管理花园的地块登记。状态保存在两个动态变量中：

- `registrations`，一个由 `plot`元组构成的向量，表示当前分配给某个人的地块。
- `next-id`，下一次登记要使用的整数。

`plot`元组有两个槽位：

| 槽位            | 类型     |
| --------------- | -------- |
| `id`            | 整数     |
| `registered-to` | 字符串   |

## 1. 打开花园并列出其中的登记

定义 `open-garden` 来初始化这两个动态变量：把 `registrations`设为一个空向量，把 `next-id`设为 `1`。然后定义 `list-registrations`，让它返回当前的地块向量。

```factor
open-garden
list-registrations .
! => V{ }
```

## 2. 登记一个地块

定义 `register`：从栈上取出一个姓名，用下一个可用的 id 构造一个新的 `plot`，把它追加到 `registrations`向量中，把 `next-id`加一，然后返回这个新地块。

```factor
open-garden
"Emma Balan" register .
! => T{ plot { id 1 } { registered-to "Emma Balan" } }

list-registrations .
! => V{ T{ plot { id 1 } { registered-to "Emma Balan" } } }
```

地块 id 必须唯一，而且即使在释放之后也保持递增，`next-id`绝不能重复使用同一个值。

## 3. 释放一个地块

定义 `release`：接收一个 id，并从 `registrations`中删除匹配的条目。释放未知的 id 是无操作。

```factor
open-garden
"Emma" register drop
1 release
list-registrations .
! => V{ }
```

## 4. 获取一个已登记的地块

定义 `get-registration`：接收一个 id，返回匹配的地块；如果没有地块拥有这个 id，就返回符号 `not-found`。

```factor
open-garden
"Emma" register drop
1 get-registration .
! => T{ plot { id 1 } { registered-to "Emma" } }

7 get-registration .
! => not-found
```

## 5. 按姓名查找地块

定义 `find-by-name`：接收一个姓名，返回当前登记在该人名下的所有地块组成的向量。

```factor
open-garden
"Emma" register drop
"Bob" register drop
"Emma" register drop
"Emma" find-by-name .
! => V{ T{ plot { id 1 } { registered-to "Emma" } }
        T{ plot { id 3 } { registered-to "Emma" } } }
```
