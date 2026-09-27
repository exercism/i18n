# 關於

Coq 同時是一門程式語言，也是一套邏輯系統，它以 [Curry-Howard 對應](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence) 為基礎。
為了成為一套有意義的邏輯系統，Coq 在設計上保證任何用 Coq 寫成的程式都一定會終止。
因此，Coq 很少用於一般用途，而是讓人用來發展*數學理論*、撰寫*經過驗證的程式*。

Coq 也是一套互動式的證明助理。
它不會自動證明定理，而是透過策略協助使用者建構證明。
策略語言（Ltac）自成一門語言，可以用來自動化證明的部分流程。
寫得好的證明指令碼，讀起來就像用一般文字寫成的非形式化證明。

使用 Coq 的主要應用與研究領域包括：

* 數學（數論、集合論、邏輯理論、可計算性理論、代數、幾何……）
* 程式語言（編譯器、執行模型、編譯器最佳化、型別系統……）
* 經過驗證的演算法（演算法的正確性與終止性），以及把程式萃取成一般用途的語言（通常是 Ocaml 或 Haskell）

知名的 Coq 開發成果包括：

* 由機器檢驗的[四色問題](https://madiot.fr/coq100/#32)證明
* [CompCert](http://compcert.inria.fr/compcert-C.html)，一套經過驗證的 C 編譯器

如果你對 Coq 有興趣，但還沒開始學，通常會建議先從 [Software Foundations](https://softwarefoundations.cis.upenn.edu/) 系列入門。
特別是前幾章（讀到「IndProp」為止），會為你打好必備的基礎，之後才能開始鑽研更有趣的概念與理論。
你也可能會對[其他資源](https://coq.inria.fr/documentation)感興趣喔。

關於 Coq 以及使用 Coq 的開發成果的討論，通常會在 [Reddit /r/coq](https://www.reddit.com/r/Coq/) 和 [Discourse](https://coq.discourse.group/latest) 上進行。
如果你有問題，也可以在 [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50) 上尋求協助；別忘了在你的問題加上「coq」標籤。