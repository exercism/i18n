# 指令

在這個練習中，你將模擬一套以視窗為基礎的電腦系統。
你會建立一些可以移動和調整大小的視窗。
下圖呈現了你在下面會用到的各種值。

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 為了練習你在 JavaScript 上的廣泛技能，**試著用原型語法解出第 1 和第 2 個任務，其餘任務則用類別語法吧**。

## 1. 定義 Size 來儲存視窗的尺寸

定義一個名為`Size`的類別（建構函式）。
它有兩個欄位`width`和`height`，用來儲存視窗目前的尺寸。
建構函式應該接受這些欄位的初始值。
寬度以第一個參數傳入，高度則以第二個參數傳入。
預設的寬度和高度分別是`80`和`60`。

此外，定義一個方法`resize(newWidth, newHeight)`，它接受新的寬度和高度作為參數，並變更欄位以反映新的尺寸。

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. 定義 Position 來儲存視窗位置

定義一個名為`Position`的類別（建構函式），它有兩個欄位`x`和`y`，分別儲存視窗左上角目前的水平和垂直位置。
建構函式應該接受這些欄位的初始值。
`x`的值以第一個參數傳入，`y`的值則以第二個參數傳入。
兩個欄位的預設值都是`0`。

位置（0, 0）是螢幕的左上角，往右移動時`x`值會變大，往下移動時`y`值會變大。

另外定義一個方法`move(newX, newY)`，它接受新的 x 和 y 參數，並變更屬性以反映新的位置。

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. 定義 ProgramWindow 類別

定義一個`ProgramWindow`類別，包含下列欄位：

- `screenSize`：保存一個固定值，型別為`Size`，其`width`為 800、`height`為 600
- `size`：保存一個型別為`Size`的值，初始值為`Size`實例的預設值
- `position`：保存一個型別為`Position`的值，初始值為`Position`實例的預設值

視窗開啟（建立）時，一開始一律具有預設的尺寸和位置。

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

附註：使用`ProgramWindow`這個名稱而不是`Window`，是為了將這個類別與瀏覽器環境中內建的`Window`類別區分開來。

## 4. 新增一個方法來調整視窗大小

`ProgramWindow`類別應該包含一個方法`resize`。
它應該接受一個型別為`Size`的參數作為輸入，並嘗試將視窗調整為指定的尺寸。

不過，新的尺寸不能超出某些界限。

- 允許的最小高度或寬度是 1。
  小於 1 的要求高度或寬度都會被截為 1。
- 最大高度和寬度取決於視窗目前的位置，視窗的邊緣不能超出螢幕的邊緣。
  大於這些界限的值都會被截為它們能取的最大尺寸。
  例如，如果視窗的位置在`x` = 400、`y` = 300，而要求調整為`height` = 400、`width` = 300，那麼視窗會被調整為`height` = 300、`width` = 300，因為螢幕在`y`方向上不夠大，無法完全容納這個要求。

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. 新增一個方法來移動視窗

除了調整大小的功能之外，`ProgramWindow`類別也應該包含一個方法`move`。
它應該接受一個型別為`Position`的參數作為輸入。
`move`方法和`resize`類似，不過這個方法調整的是視窗的*位置*，而不是尺寸。

和`resize`一樣，新的位置不能超出某些限制。

- `x`和`y`的最小位置都是 0。
- 任一方向的最大位置取決於視窗目前的尺寸。
  邊緣不能超出螢幕的邊緣。
  大於這些界限的值都會被截為它們能取的最大尺寸。
  例如，如果視窗的尺寸在`x` = 250、`y` = 100，而要求移動到`x` = 600、`y` = 200，那麼視窗會被移動到`x` = 550、`y` = 200，因為螢幕在`x`方向上不夠大，無法完全容納這個要求。

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. 變更程式視窗

實作一個`changeWindow`函式，它接受一個`ProgramWindow`實例作為輸入，並將視窗變更為指定的尺寸和位置。
這個函式在套用變更之後，應該回傳傳入的`ProgramWindow`實例。

視窗的寬度應該是 400、高度是 300，並定位在 x = 100、y = 150。

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```
