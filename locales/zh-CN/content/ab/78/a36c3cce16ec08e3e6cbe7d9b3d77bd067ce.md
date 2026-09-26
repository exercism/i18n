# Pyret track 上的测试

## 安装前提条件

成功下载一个练习后，你需要安装 Node.js 模块才能运行测试：

```sh
cd /path/to/exercise
npm install
```

然后，把包含 `pyret` 命令行工具的目录添加到你的 $PATH 中：

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## 开始使用

练习目录里会有好几个文件，但最重要的是你的解答文件和测试文件。
在下面的例子中，我们下载了 Leap 练习。

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

要运行测试，如果你下载了官方的 Exercism CLI，就用 `exercism test`，否则运行 `pyret leap-test.arr`。
Pyret 会运行整套测试，它由一系列带标签的 `check` 代码块组成，用具体的输入和预期结果来检验你的解答文件。
这个过程的关键一点是：显式导出你的部分代码，让测试能看到它们。

## provide

本 track 的测试会导入你的文件，因此可以访问你代码中显式导出的任何内容。

要导出变量，你需要在文件开头添加一个 [provide 语句][provide-statement]。

下面的代码片段是导出 `a`、`b` 和 `c` 的两种有效方式。

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

第三种方式是 `provide *`，它是导出所有顶层绑定（自定义数据类型除外）的简写形式。
不过，通常不建议这么做，因为 Pyret 对[变量遮蔽][shadowing]有严格限制。

## provide-types

有些练习需要导出[自定义数据类型][data-definition]，以便进行测试。
这种情况下，你可以使用 [provide-types 语句][provide-types-statement]。
由于数据类型附带的一些函数可能不会被导出，因此建议使用 `provide-types *`，尽管有遮蔽方面的顾虑。

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

所有练习的初始代码里都已经为你准备好了 `provide` 或 `provide-types` 语句。

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
