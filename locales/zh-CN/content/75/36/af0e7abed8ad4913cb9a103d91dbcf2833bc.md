1.  了解 [PEP 8][pep-8] 中列出的约定。
    这些约定虽然算不上“法律”，但它们是 Python 项目本身使用的标准，在大多数编码场景中都是很好的基准。
2.  阅读并思考 [PEP 20（也就是“Python 之禅”）][pep-20] 中提出的理念。
    和 PEP 8 一样，它们不是“法律”，但都是写出更好、更清晰的 Python 代码的可靠指导原则。
3.  优先选择清晰、易懂的代码，而不是靠注释来解释。但在确实需要说明清楚的地方，一定要写注释。
4.  可以考虑用类型提示让代码更清晰。
    去看看类型提示的[文档][type-hint-docs]，以及[为什么你可能并不想用类型提示][type-hint-nos]。
5.  尽量遵循 [PEP 257][pep-257] 中给出的文档字符串规范。
    好的文档很重要。
6.  避免[魔法数字][magic-numbers]。
7.  在同时需要下标和元素的循环里，优先使用 [`enumerate()`][enumerate-docs]，而不是 [`range(len())`][range-docs]。
8.  如果需要把结果逐个追加到某个数据结构，优先使用[推导式][comprehensions]和[生成器表达式][generators]，而不是用循环。
    但也别[过度使用推导式][comprehension-overuse]。
9.  拼接多个子字符串，或者在循环中做字符串拼接时，优先使用 [`str.join()`][join]，而不是其他字符串拼接方式。
10.  熟悉 Python 丰富的[内置函数][built-in-functions]和[标准库][standard-lib]。
     想快速浏览一遍并看看一些有趣的亮点，可以[点这里][standard-lib-overview]。

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
