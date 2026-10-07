# 补充说明

统计字母，忽略大小写和非字母字符，并返回一个字典，键为小写字母，值为对应的出现次数。

使用 [roc-parallel 平台](https://github.com/ageron/roc-parallel) 提供的`pf.Parallel.map!(items, { workers, task })`，通过一个纯`task`函数，把给定的`items`分发到多个线程（由`workers`指定）上并行处理。所有`items`处理完成后，结果会按输入顺序返回。你只需要编辑`ParallelLetterFrequency.roc`。

提示：我们建议你使用 [Unicode 库](https://github.com/roc-lang/unicode) 来做大小写转换和字母判断。尤其可以看看`unicode.Case.to_lower`、`unicode.GeneralCategory.of_scalar`、`unicode.Scalar.iter`和`unicode.Scalar.to_str`。把字母当作 Unicode 标量值来处理；不需要做 Unicode 规范化。

注意：与大多数其他练习不同，本练习使用的是有副作用的函数。目前，Roc 的`expect`语句还不能调用有副作用的函数，所以本练习的测试完全不使用`expect`或`roc test`。测试改用`roc --opt=speed`运行，Roc 代码返回的任何错误都会由平台以与平时不同的格式报告出来。

你也可以看看`bank-account`练习，它探讨了并发的另一个侧面：如何安全地把更新应用到共享状态。
