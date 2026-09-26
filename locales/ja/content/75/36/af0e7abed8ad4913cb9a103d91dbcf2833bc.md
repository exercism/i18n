1.  [PEP 8][pep-8]で示されている規約に慣れましょう。
    これらは「法律」ではありませんが、Pythonプロジェクト自体で使われている標準であり、ほとんどのコーディングの場面で優れた基準になります。
2.  [PEP 20（別名「Pythonの禅」）][pep-20]で示されている考えを読んで、じっくり考えてみましょう。
    PEP 8と同じく、これらは「法律」ではありませんが、より良く、より明確なPythonコードを書くための確かな指針です。
3.  コメントよりも、明確でわかりやすいコードを優先しましょう。ただし、明確にするために必要なところには、必ずコメントを書きましょう。
4.  コードを明確にするために、型ヒントの使用を検討しましょう。
    型ヒントの[ドキュメント][type-hint-docs]と、[型ヒントを使いたくないかもしれない理由][type-hint-nos]を読んでみましょう。
5.  [PEP 257][pep-257]に示されているドキュメント文字列のガイドラインに従ってみましょう。
    良いドキュメントは大切です。
6.  [マジックナンバー][magic-numbers]は避けましょう。
7.  インデックスと要素の両方が必要なループでは、[`range(len())`][range-docs]よりも[`enumerate()`][enumerate-docs]を優先しましょう。
8.  データ構造に追加していくループよりも、[内包表記][comprehensions]や[ジェネレーター式][generators]を優先しましょう。
    ただし、[内包表記を乱用しない][comprehension-overuse]ようにしましょう。
9.  いくつもの部分文字列を連結するときや、ループの中で連結するときは、他の文字列連結の方法よりも[`str.join()`][join]を優先しましょう。
10.  Pythonの豊富な[組み込み関数][built-in-functions]と[標準ライブラリ][standard-lib]に慣れましょう。
     簡単なツアーと興味深い見どころは、[こちら][standard-lib-overview]で紹介されています。

[built-in-functions]: https://docs.python.org/3/library/functions.html
[comprehension-overuse]: https://treyhunner.com/2019/03/abusing-and-overusing-list-comprehensions-in-python/
[comprehensions]: https://treyhunner.com/2015/12/python-list-comprehensions-now-in-color/
[enumerate-docs]: https://docs.python.org/3/library/functions.html#enumerate
[generators]: https://www.pythonmorsels.com/how-write-generator-expression/
[join]: https://docs.python.org/3/library/stdtypes.html#str.join
[magic-numbers]: https://en.wikipedia.org/wiki/Magic_number_(programming)
[pep-20]: https://peps.python.org/pep-0020/
[pep-257]: https://peps.python.org/pep-0257/
[pep-8]: https://peps.python.org/pep-0008/
[range-docs]: https://docs.python.org/3/library/functions.html#func-range
[standard-lib-overview]: https://docs.python.org/3/tutorial/stdlib.html
[standard-lib]: https://docs.python.org/3/library/index.html
[type-hint-docs]: https://typing.python.org/en/latest/index.html
[type-hint-nos]: https://typing.python.org/en/latest/guides/typing_anti_pitch.html
