1.  熟悉 [PEP 8][pep-8] 中列出的慣例。雖然它們不是「法律」，但它们是 Python 專案本身採用的標準，在大多數程式設計情境中也是很棒的基準。
2.  閱讀並思考 [PEP 20（又名「Python 之禪」）][pep-20] 中列出的理念。就像 PEP 8 一樣，它們不是「法律」，但它们是讓 Python 程式碼更好、更清晰的紮實指導原則。
3.  比起註解，優先選擇清晰、容易理解的程式碼。但在需要釐清時，一定要寫註解。
4.  考慮使用型別提示讓程式碼更清楚。看看型別提示的[文件][type-hint-docs]，以及[為什麼你可能不想用型別提示][type-hint-nos]。
5.  試著遵循 [PEP 257][pep-257] 中列出的 docstring 規範。良好的說明文件很重要。
6.  避免[魔術數字][magic-numbers]。
7.  在同時需要索引和元素的迴圈中，優先使用[`enumerate()`][enumerate-docs]而不是[`range(len())`][range-docs]。
8.  在會對資料結構附加元素的迴圈中，優先使用[推導式][comprehensions]和[產生器運算式][generators]，但不要[過度使用推導式][comprehension-overuse]。
9.  在連接多個子字串或在迴圈中串接時，優先使用[`str.join()`][join]，而不是其他字串串接的方法。
10.  熟悉 Python 豐富的[內建函式][built-in-functions]和[標準函式庫][standard-lib]。到[這裡][standard-lib-overview]看看簡短的導覽和一些有趣的亮點。

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
