# 指令

你將寫一些程式碼，幫助你依照最愛的食譜做出千層麵。

這次一共有五個任務，全都和做出這道料理有關。

## 1. 定義預期的烤箱時間（分鐘）

設定`$Lasagna::ExpectedMinutesInOven`變數，表示千層麵應該在烤箱裡烤幾分鐘。根據食譜，預期的烤箱時間是 40 分鐘：

```perl
$Lasagna::ExpectedMinutesInOven
# => 40
```

## 2. 計算剩餘的烤箱時間（分鐘）

修改`Lasagna::remaining_minutes_in_oven`副常式，它會接受千層麵實際已經在烤箱裡的時間（分鐘）作為引數，並根據上一個任務得到的預期烤箱時間，回傳千層麵還需要繼續待在烤箱裡幾分鐘。

```perl
Lasagna::remaining_minutes_in_oven(30)
# => 10
```

## 3. 計算準備時間（分鐘）

修改`Lasagna::preparation_time_in_minutes`副常式，它會接受你加在千層麵裡的層數作為引數，回傳你準備千層麵花了幾分鐘，假設每一層需要 2 分鐘準備。

```perl
Lasagna::preparation_time_in_minutes(2)
# => 4
```

## 4. 計算總共花費的時間（分鐘）

修改`Lasagna::total_time_in_minutes`副常式，它接受兩個引數：第一個引數是你加在千層麵裡的層數，第二個引數是千層麵已經在烤箱裡的時間（分鐘）。
這個副常式應該回傳你製作千層麵總共花了幾分鐘，也就是準備時間（分鐘）加上千層麵目前已經待在烤箱裡的時間（分鐘）之總和。

```perl
Lasagna::total_time_in_minutes(3, 20)
# => 26
```

## 5. 建立千層麵已經可以吃的通知

修改`Lasagna::oven_alarm`副常式，它不接受任何引數，並回傳一則訊息，表示千層麵已經可以吃了。

```perl
Lasagna::oven_alarm()
# => "Ding!"
```
