# 说明

在这个练习中，你将模拟一个基于窗口的计算机系统。你将创建一些可以移动和调整尺寸的窗口。下图展示了下面将要使用的各个值。

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

📣 为了练习你广泛的 JavaScript 技能，**请尝试用原型语法完成任务 1 和 2，其余任务用类语法完成**。

## 1. 定义 Size 用于存储窗口尺寸

定义一个名为 `Size` 的类（构造函数）。它应该有两个字段 `width` 和 `height`，用来存储窗口当前的尺寸。构造函数应该接收这些字段的初始值。第一个形参提供宽度，第二个形参提供高度。宽度和高度的默认值应分别为 `80` 和 `60`。

此外，定义一个方法 `resize(newWidth, newHeight)`，它接收新的宽度和高度作为形参，并修改这些字段以反映新的尺寸。

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

## 2. 定义 Position 用于存储窗口位置

定义一个名为 `Position` 的类（构造函数），它有两个字段 `x` 和 `y`，分别存储窗口左上角当前的水平位置和垂直位置。构造函数应该接收这些字段的初始值。第一个形参提供 `x` 的值，第二个形参提供 `y` 的值。两个字段的默认值都应为 `0`。

位置 (0, 0) 是屏幕的左上角，向右移动时 `x` 值增大，向下移动时 `y` 值增大。

另外定义一个方法 `move(newX, newY)`，它接收新的 x 和 y 形参，并修改属性以反映新的位置。

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

## 3. 定义 ProgramWindow 类

定义一个 `ProgramWindow` 类，包含以下字段：

- `screenSize`：保存一个 `Size` 类型的固定值，`width` 为 800，`height` 为 600
- `size`：保存一个 `Size` 类型的值，初始值为 `Size` 实例的默认值
- `position`：保存一个 `Position` 类型的值，初始值为 `Position` 实例的默认值

窗口被打开（创建）时，一开始总是具有默认的尺寸和位置。

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

补充说明：使用 `ProgramWindow` 这个名字而不是 `Window`，是为了将这个类与浏览器环境中内置的 `Window` 类区分开。

## 4. 添加一个用于调整窗口尺寸的方法

`ProgramWindow` 类应该包含一个方法 `resize`。它应该接收一个 `Size` 类型的形参作为输入，并尝试将窗口调整为指定的尺寸。

不过，新尺寸不能超出特定的边界。

- 允许的最小高度或宽度是 1。请求的高度或宽度小于 1 时会被截断为 1。
- 最大高度和宽度取决于窗口的当前位置，窗口的边缘不能超出屏幕的边缘。超过这些边界的值会被截断为它们能达到的最大尺寸。例如，如果窗口的位置在 `x` = 400、`y` = 300，并且请求调整为 `height` = 400、`width` = 300，那么窗口会被调整为 `height` = 300、`width` = 300，因为在 `y` 方向上屏幕不够大，无法完全满足该请求。

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. 添加一个用于移动窗口的方法

除了调整尺寸的功能外，`ProgramWindow` 类还应该包含一个方法 `move`。它应该接收一个 `Position` 类型的形参作为输入。`move` 方法与 `resize` 类似，不过它调整的是窗口的_位置_，将其设为请求的值，而不是尺寸。

和 `resize` 一样，新位置也不能超出特定的限制。

- `x` 和 `y` 的最小位置都是 0。
- 两个方向上的最大位置取决于窗口当前的尺寸。边缘不能超出屏幕的边缘。超过这些边界的值会被截断为它们能达到的最大值。例如，如果窗口的尺寸在 `x` = 250、`y` = 100，并且请求移动到 `x` = 600、`y` = 200，那么窗口会被移动到 `x` = 550、`y` = 200，因为在 `x` 方向上屏幕不够大，无法完全满足该请求。

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. 修改程序窗口

实现一个 `changeWindow` 函数，它接收一个 `ProgramWindow` 实例作为输入，并将窗口修改为指定的尺寸和位置。在应用更改后，该函数应返回传入的那个 `ProgramWindow` 实例。

窗口应该获得宽度 400、高度 300，并位于 x = 100、y = 150。

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```
