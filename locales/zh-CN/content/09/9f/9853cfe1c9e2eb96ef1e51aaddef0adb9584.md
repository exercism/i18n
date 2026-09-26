# 提示

## 通用

- `include`放在类里面，通常作为第一行。
- 只有你重命名或省略的部分会改变，其余一切都按原样引入。

## 1. 爵士舞节目

- 在类里面写一行：`include WARM_UP;`
- 不需要别的。类体就只有这一行。

## 2. 踢踏舞节目

- `include WARM_UP describe -> ;`
- `-> ;`中箭头后面什么都不写，就把`describe`省略掉了，这才为你自己写的那个腾出了位置。
- 没有这个箭头，编译器会报错说`describe`被定义了两次。这个错误正是有意为之：Sather 不会悄悄替你选一个。

## 3. 终场

- 一个 include 里写两个条目，用逗号分隔：`include WARM_UP counts -> warm_up_counts, describe -> ;`
- 然后写`counts`，让它返回`warm_up_counts * 2`，再写`describe`。
- `describe`应该调用`counts`，而不是把数字重新算一遍。
- 记住，数字不能直接加字符串，所以描述以文字开头是没问题的：`"Finale: " + counts + " counts"`。
