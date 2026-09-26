# 概要

Coqは、[Curry-Howard対応](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence)に基づくプログラミング言語であり、同時に論理体系でもあります。
意味のある論理体系であるために、Coqで書かれたどんなプログラムも必ず停止することが保証されるように設計されています。
そのため、Coqが汎用的な用途に使われることはほとんどありません。その代わりに、*数学の理論*を展開したり、*検証済みのプログラム*を書いたりすることができます。

Coqは、対話的な証明支援系でもあります。
定理を自動で解くのではなく、タクティクを通して、利用者が証明を組み立てるのを助けます。
タクティク言語（Ltac）はそれ自体がひとつの言語で、証明の一部を自動化できます。
よく書けた証明スクリプトは、文章で書かれた非形式的な証明によく似ています。

Coqを使っている主な応用・研究分野には、次のようなものがあります。

* 数学（数論、集合論、論理学、計算可能性理論、代数学、幾何学など）
* プログラミング言語（コンパイラー、実行モデル、コンパイラー最適化、型システムなど）
* 検証済みアルゴリズム（アルゴリズムの正当性と停止性）と、汎用言語（通常はOcamlやHaskell）への抽出

Coqの代表的な開発成果には、次のようなものがあります。

* [四色問題](https://madiot.fr/coq100/#32)の機械検証された証明
* [CompCert](http://compcert.inria.fr/compcert-C.html)、検証済みのCコンパイラー

Coqに興味があるけれど、まだ学んだことがないという場合は、まず[Software Foundations](https://softwarefoundations.cis.upenn.edu/)シリーズから始めるのがよいとよく言われます。
特に最初のいくつかの章（「IndProp」まで）を読めば、より面白い概念や理論に取り組み始める前に必要な基礎が身につきます。
[その他のリソース](https://coq.inria.fr/documentation)も参考になるかもしれません。

Coqや、Coqを使った開発についての議論は、通常[Reddit /r/coq](https://www.reddit.com/r/Coq/)や[Discourse](https://coq.discourse.group/latest)で行われています。
質問があれば、[StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50)で助けを求めることもできます。その際は、質問に"coq"というタグを付けるのを忘れないでください。