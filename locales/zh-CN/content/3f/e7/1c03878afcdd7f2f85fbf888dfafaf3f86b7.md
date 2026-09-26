# 关于 Wren

Wren 是一门小巧、快速、基于类的并发脚本语言。想象一下：把 Smalltalk 装进 Lua 大小的体量里，再加一点 Erlang 的味道，外面裹上一层熟悉而现代的语法。

- **小巧。** 虚拟机不到 4,000 个分号，全是可读、注释用心的 C 代码。

- **快速。** 智能的单遍编译器生成紧凑、高效的字节码。

- **基于类。** 类和对象是核心。

- **并发。** 语言内置了轻量的纤程。

- **脚本化。** 可嵌入、无依赖、标准库精简，还有易用的 C API。


### 虚拟机

Wren 的核心是虚拟机。Wren 虚拟机是这门语言的心脏，负责执行所有 Wren 源代码。它只是一个库，而不是一个独立应用，设计上就是要嵌入到更大的宿主程序中。

你可以在这些项目里找到嵌入的 Wren：

* [TIC-80](https://tic80.com)：一台用来制作、游玩和分享小型游戏的幻想电脑（类似 PICO8）。
* [DOME](https://domeengine.com)：一个跨平台的游戏制作框架。
* [luxe](https://luxeengine.com)：一个跨平台、可快速开发的游戏引擎，用来制作游戏。
* [Wren Console][wren-console]：一个基本用 Wren 自身写成的 Wren REPL 和 CLI。

你甚至可以把 Wren 嵌入到自己的项目里。在 Exercism 上，我们将使用的宿主程序是 [Wren Console][wren-console]，这样就能在终端里运行和测试我们的 Wren 脚本。


### 为什么选择 Wren？

Wren 最初由 [Bob Nystrom](http://journal.stuffwithstuff.com) 创造，他因 [Crafting Interpreters](http://craftinginterpreters.com) 这本书而闻名。他做过的语言远远不止几个，但他特别解释了是什么促成了 Wren 的诞生：

> 用于嵌入应用的脚本语言有好几种，Lua 是其中的主流。TCL 曾经也是。还有 Guile，以及越来越多被采用的 JavaScript，有些应用还会嵌入 Python。我以前是游戏开发者，所以一提到“脚本”，我脑子里想的往往是“游戏脚本”。

> Lua 很好：小巧、简单、快速。但如果你习惯了 C++ 和 Java 这类语言，它也会显得有点怪，我这么说不是在批评它。语法不一样，语义、尤其是对象模型，也不太寻常。谁都能习惯从 1 开始的下标，但像元表这样的东西，恰恰说明对象是在 Lua 成型之后才硬加上去的。

> 我认为，一门像 Lua 那样简单、但对有面向对象背景的人来说又很自然的语言，是有存在空间的。Wren 就是我为这个目标做的尝试。

### 试一试

你可以在浏览器里[快速试一试][try-it]（什么都不用安装）。如果你想在精美的界面里把玩 Wren，可以看看 [Wren Playground][wren-playground]。

[wren]: https://wren.io
[wren-console]: https://github.com/joshgoebel/wren-console
[wren-playground]: https://github.com/ninjascl/wren-playground
[try-it]: https://wren.io/try/
