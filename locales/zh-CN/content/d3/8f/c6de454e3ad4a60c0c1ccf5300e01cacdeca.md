# 关于

Coq 既是一种编程语言，也是一个逻辑系统，它基于[柯里-霍华德对应](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence)。
为了成为一个有意义的逻辑系统，这门语言的设计目标是：任何用 Coq 编写的程序都保证会终止。
因此，Coq 很少用于通用编程；相反，它允许人们*发展数学理论*，并编写*经过验证的程序*。

Coq 还是一个交互式证明助手。
它不会自动求解定理，而是通过策略帮助用户构建证明。
策略语言（Ltac）本身就是一种语言，可以用来自动化部分证明。
写得好的证明脚本，读起来就像用自然语言写成的非形式化证明。

使用 Coq 的主要应用/研究领域包括：

* 数学（数论、集合论、逻辑理论、可计算性理论、代数、几何……）
* 编程语言（编译器、执行模型、编译器优化、类型系统……）
* 经过验证的算法（算法的正确性和终止性）以及提取到通用语言（通常是 OCaml 或 Haskell）

著名的 Coq 开发项目包括：

* [四色问题](https://madiot.fr/coq100/#32)的机器验证证明
* [CompCert](http://compcert.inria.fr/compcert-C.html)，一个经过验证的 C 编译器

如果你对 Coq 感兴趣但还没有学过它，通常建议从 [Software Foundations](https://softwarefoundations.cis.upenn.edu/) 系列开始。
尤其是前几章（直到“IndProp”）会为你打下必要的基础，让你可以开始研究更有趣的概念和理论。
你可能也会对[其他资源](https://coq.inria.fr/documentation)感兴趣。

关于 Coq 以及使用 Coq 的开发项目的讨论，通常在 [Reddit /r/coq](https://www.reddit.com/r/Coq/) 和 [Discourse](https://coq.discourse.group/latest) 上进行。
如果你有问题，也可以在 [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50) 上寻求帮助；别忘了给问题加上“coq”标签。