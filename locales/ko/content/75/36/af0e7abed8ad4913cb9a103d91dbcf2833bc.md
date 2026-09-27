1.  [PEP 8][pep-8]에 정리된 규칙에 익숙해져 봐요.
    이것들이 "법"은 아니지만, Python 프로젝트 자체에서 사용하는 표준이고 대부분의 코딩 상황에서 좋은 기준이 돼요.
2.  [PEP 20("The Zen of Python"이라고도 해요)][pep-20]에 담긴 아이디어를 읽고 생각해 봐요.
    PEP 8과 마찬가지로 이것들도 "법"은 아니지만, 더 좋고 명확한 Python 코드를 위한 확고한 지침이에요.
3.  주석보다는 명확하고 따라가기 쉬운 코드를 선호해요. 하지만 명확하게 하기 위해 필요한 곳에는 꼭 주석을 달아요.
4.  코드를 명확하게 하기 위해 타입 힌트를 사용하는 것도 고려해 봐요.
    타입 힌트 [문서][type-hint-docs]와 [타입 힌트를 쓰지 않는 게 좋을 때][type-hint-nos]를 살펴봐요.
5.  [PEP 257][pep-257]에 정리된 독스트링 지침을 따르도록 해봐요.
    좋은 문서화는 중요해요.
6.  [매직 넘버][magic-numbers]는 피해요.
7.  인덱스와 요소가 모두 필요한 반복문에서는 [`range(len())`][range-docs]보다 [`enumerate()`][enumerate-docs]를 선호해요.
8.  데이터 구조에 값을 추가하는 반복문보다는 [컴프리헨션][comprehensions]과 [제너레이터 표현식][generators]을 선호해요.
    하지만 [컴프리헨션을 남용하지는][comprehension-overuse] 마세요.
9.  여러 부분 문자열을 이어 붙이거나 반복문 안에서 문자열을 연결할 때는 다른 문자열 연결 방법보다 [`str.join()`][join]을 선호해요.
10.  Python이 제공하는 다양한 [내장 함수][built-in-functions]와 [표준 라이브러리][standard-lib]에 익숙해져 봐요.
     [여기][standard-lib-overview]에서 간단히 둘러보고 흥미로운 내용도 몇 가지 살펴봐요.

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
