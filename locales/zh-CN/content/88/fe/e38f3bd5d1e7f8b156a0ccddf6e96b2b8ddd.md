# 提示

## 概述

## 1. 买一辆全新的遥控车

- [这个页面展示了如何创建类的新实例][creating-objects]。

## 2. 显示行驶的距离

- 用一个[字段][fields]记录行驶的距离。
- 考虑该字段使用什么可见性（需要在类外使用它吗？）。
- 考虑使用[字符串插值][string-interpolation]来格式化要返回的字符串。

## 3. 显示电量百分比

- 用一个[字段][fields]记录初始电量。
- 把该字段初始化为与预期初始电量对应的具体值。
- 考虑该字段使用什么可见性（需要在类外使用它吗？）。
- 考虑使用[字符串插值][string-interpolation]来格式化要返回的字符串。

## 4. 行驶时更新行驶的米数

- 更新表示行驶距离的字段。

## 5. 行驶时更新电量百分比

- 更新表示电量百分比的字段。

## 6. 电量耗尽时阻止行驶

- 添加一个条件，只在电量尚未耗尽时更新距离和电量。
- 添加一个条件，在电量耗尽时显示电量耗尽的提示信息。

[creating-objects]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/classes#creating-objects
[fields]: https://docs.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/fields
[string-interpolation]: https://christianfindlay.com/2019/10/04/c-string-interpolation/
