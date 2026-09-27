1.  تعرّف على الأعراف الواردة في [PEP 8][pep-8].
    صحيح أنها ليست "قانونًا"، لكنها المعيار المتّبع في مشروع Python نفسه، وهي نقطة انطلاق ممتازة في معظم حالات البرمجة.
2.  اقرأ الأفكار الواردة في [PEP 20 (المعروف باسم "The Zen of Python")][pep-20] وفكّر فيها.
    وكما في PEP 8، ليست هذه "قوانين"، لكنها مبادئ توجيهية متينة لكود Python أوضح وأفضل.
3.  فضّل الكود الواضح والسهل المتابعة على التعليقات. لكن أضف التعليقات حيث تحتاج إليها للوضوح.
4.  فكّر في استخدام تلميحات الأنواع لتوضيح الكود.
    اطّلع على [التوثيق][type-hint-docs] الخاص بتلميحات الأنواع، وعلى [لماذا قد لا ترغب في استخدام تلميحات الأنواع][type-hint-nos].
5.  حاول اتباع إرشادات `docstring` الواردة في [PEP 257][pep-257].
    التوثيق الجيد مهم.
6.  تجنّب [الأرقام السحرية][magic-numbers].
7.  فضّل [`enumerate()`][enumerate-docs] على [`range(len())`][range-docs] في الحلقات التي تحتاج إلى فهرس وعنصر معًا.
8.  فضّل [استيعابات القوائم][comprehensions] و[تعبيرات المولّد][generators] على الحلقات التي تُضيف عناصر إلى بنية بيانات.
    لكن لا [تُفرِط في استخدام الاستيعابات][comprehension-overuse].
9.  عند ضم أكثر من عدد قليل من السلاسل النصية الفرعية، أو عند الربط داخل حلقة، فضّل [`str.join()`][join] على الطرق الأخرى لربط السلاسل النصية.
10.  تعرّف على المجموعة الغنية من [الدوال المدمجة][built-in-functions] في Python و[المكتبة القياسية][standard-lib].
     اذهب [هنا][standard-lib-overview] لجولة موجزة وبعض الملامح المثيرة للاهتمام.

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
