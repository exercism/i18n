# 哪些内容不在 Exercism 的 Rust track 范围内？

本文旨在说明，在 Rust 语言、社区和生态系统的范围内，Exercism 的 Rust track 能教什么、不能教什么。

如果某个练习在 _design.md_ 中已有“超出范围”一节介绍了某部分内容，这里就不再重复，除非认为该主题在其他地方不够突出。

## 网页界面的限制

使用网页界面的学生只能做网页界面和测试运行器允许的事情，因此网页界面的能力实际上就是 Rust track 的外边界。

学生可以：

- 编辑单个 `.rs` 文件
- 接收`stdout`的输出（例如来自`dbg!`的输出）

值得注意的是，这意味着他们不能编辑 Cargo.toml，因此任何依赖外部 crate 的练习都必须提前在 Cargo.toml 中写全所有依赖项。

## Exercism 不涉及什么

Exercism 的目标是让你熟练掌握一门编程语言，而不是教授软件设计、计算机科学这类更抽象的技能。因此，与 Rust 编程语言关系不大的主题，都不属于 Rust track 的范围。

## 被排除的主题示例

被排除的主题包括：

### Cargo

- 编辑 Cargo.toml
- CLI 命令，例如 `new`、`update`、`bench`

### 框架

- Amethyst
- Yew、Iced、Sauron 等

### 互操作

- CFFI
- `asm!`

### 一般来说：

- 文件处理
- 网络
