# 说明

**注意：本练习已废弃。**

更多背景请查看 [https://github.com/exercism/problem-specifications/issues/80](https://github.com/exercism/problem-specifications/issues/80) 中的讨论。

---

为一个统计行数、字母数和字符数的工具设计一套测试套件。

这是一道特殊的练习。你不必编写代码去配合现有的测试套件，而是由你来定义测试套件。为了帮助你，我们提供了被测代码的几个变体。你的测试套件至少应该能够检测出它们存在的问题（或不存在问题）。

被测系统应该是一个统计所提供字符串中行数、字母数和总字符数的系统。它的思路是：多次执行“add string”操作，每次传入字符串，然后调用“lines”、“letters”和“characters”函数来获取总数。
