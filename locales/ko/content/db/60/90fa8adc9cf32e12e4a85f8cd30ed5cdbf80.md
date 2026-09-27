# 소개

Python에서 `str`은 [유니코드 코드 포인트][unicode code points]로 이루어진 [불변 시퀀스][text sequence]예요.
글자, 발음 구별 부호, 위치 지정 문자, 숫자, 통화 기호, 이모지, 문장 부호, 공백과 줄 바꿈 문자 등이 모두 포함될 수 있어요.
 `str`은 불변이기 때문에 메모리에서 `str` 객체의 값은 바뀌지 않아요. 문자열을 수정하는 것처럼 보이는 메서드는 그 `str` 객체의 새 복사본이나 인스턴스를 반환해요.


`str` 리터럴은 작은따옴표 `'`나 큰따옴표 `"`로 선언할 수 있어요. 필요할 때는 이스케이프 문자 `\`를 사용할 수 있어요.


```python

>>> single_quoted = 'These allow "double quoting" without "escape" characters.'

>>> double_quoted = "These allow embedded 'single quoting', so you don't have to use an 'escape' character."

>>> escapes = 'If needed, a \'slash\' can be used as an escape character within a string when switching quote styles won\'t work.'
```

여러 줄 문자열은 `'''`나 `"""`로 선언해요.


```python
>>> triple_quoted =  '''Three single quotes or "double quotes" in a row allow for multi-line string literals.
  Line break characters, tabs and other whitespace are fully supported.

  You\'ll most often encounter these as "doc strings" or "doc tests" written just below the first line of a function or class definition.
    They\'re often used with auto documentation ✍ tools.
    '''
```

문자열은 `+` 연산자로 이어 붙일 수 있어요.
 다만 이 방법은 성능이 좋지 않고 유지 보수하기도 쉽지 않으니 아껴서 쓰는 게 좋아요.


```python
language = "Ukrainian"
number = "nine"
word = "дев'ять"

sentence = word + " " + "means" + " " + number + " in " + language + "."

>>> print(sentence)
...
"дев'ять means nine in Ukrainian."
```

`list`, `tuple`, `set` 같이 여러 개별 문자열로 이루어진 컬렉션을 하나의 `str`로 합쳐야 한다면 [`<str>.join(<iterable>)`][str-join]를 쓰는 편이 더 좋아요:


```python
# str.join() makes a new string from the iterables elements.
>>> chickens = ["hen", "egg", "rooster"] # Lists are iterable.
>>> ' '.join(chickens)
'hen egg rooster'

# Any string can be used as the joining element.
>>> ' :: '.join(chickens)
'hen :: egg :: rooster'

>>> ' 🌿 '.join(chickens)
'hen 🌿 egg 🌿 rooster'


# Any iterable can be used as input.
>>> flowers = ("rose", "daisy", "carnation")  # Tuples are iterable.
>>> '*-*'.join(flowers)
'rose*-*daisy*-*carnation'

>>> flowers = {"rose", "daisy", "carnation"}  # Sets are iterable, but output order is not guaranteed.
>>> '*-*'.join(flowers)
'rose*-*carnation*-*daisy'

>>> phrase = "This is my string"  # Strings are iterable, but be careful!
>>> '..'.join(phrase)
'T..h..i..s.. ..i..s.. ..m..y.. ..s..t..r..i..n..g'


# Separators are inserted **between** elements, but can be any string (including spaces).
# This can be exploited for interesting effects.
>>> under_words = ['under', 'current', 'sea', 'pin', 'dog', 'lay']
>>> separator = ' ⤴️ under'
>>> separator.join(under_words)
'under ⤴️ undercurrent ⤴️ undersea ⤴️ underpin ⤴️ underdog ⤴️ underlay'

# The separator can be composed different ways, as long as the result is a string.
>>> upper_words = ['upper', 'crust', 'case', 'classmen', 'most', 'cut']
>>> separator = ' 🌟 ' + upper_words[0]
>>> separator.join(upper_words)
 'upper 🌟 uppercrust 🌟 uppercase 🌟 upperclassmen 🌟 uppermost 🌟 uppercut'
```

`str` 안의 코드 포인트는 왼쪽에서부터 `0-based index` 번호로 가리킬 수 있어요:


```python
creative = '창의적인'

>>> creative[0]
'창'

>>> creative[2]
'적'

>>> creative[3]
'인'
```

인덱싱은 오른쪽에서도 할 수 있는데, 이때는 `-1-based index`부터 시작해요:


```python
creative = '창의적인'

>>> creative[-4]
'창'

>>> creative[-2]
'적'

>>> creative[-1]
'인'

```

Python에는 별도의 "문자"나 "룬" 타입이 없어서, 문자열을 인덱싱하면 길이가 1인 새로운 `str`이 만들어져요:


```python

>>> website = "exercism"
>>> type(website[0])
<class 'str'>

>>> len(website[0])
1

>>> website[0] == website[0:1] == 'e'
True
```

부분 문자열은 _슬라이스 표기법_으로 선택할 수 있어요. [`<str>[<start>:stop:<step>]`][common sequence operations]를 사용하면 새로운 문자열이 만들어져요.
 결과에는 `stop` 인덱스가 포함되지 않아요.
 `start`를 지정하지 않으면 시작 인덱스는 0이 돼요.
 `stop`을 지정하지 않으면 `stop` 인덱스는 문자열의 끝이 돼요.


```python
moon_and_stars = '🌟🌟🌙🌟🌟⭐'
sun_and_moon = '🌞🌙🌞🌙🌞🌙🌞🌙🌞'

>>> moon_and_stars[1:4]
'🌟🌙🌟'

>>> moon_and_stars[:3]
'🌟🌟🌙'

>>> moon_and_stars[3:]
'🌟🌟⭐'

>>> moon_and_stars[:-1]
'🌟🌟🌙🌟🌟'

>>> moon_and_stars[:-3]
'🌟🌟🌙'

>>> sun_and_moon[::2]
'🌞🌞🌞🌞🌞'

>>> sun_and_moon[:-2:2]
'🌞🌞🌞🌞'

>>> sun_and_moon[1:-1:2]
'🌙🌙🌙🌙'
```

문자열은 [`<str>.split(<separator>)`][str-split]로 더 작은 문자열로 나눌 수도 있는데, 이때 부분 문자열의 `list`를 반환해요.
 이 배열은 필요하다면 다시 인덱싱하거나 나눌 수 있어요.
 `<str>.split()`을 인자 없이 사용하면 공백을 기준으로 문자열을 나눠요.


```python
>>> cat_ipsum = "Destroy house in 5 seconds mock the hooman."
>>> cat_ipsum.split()
...
['Destroy', 'house', 'in', '5', 'seconds', 'mock', 'the', 'hooman.']


>>> cat_ipsum.split()[-1]
'hooman.'


>>> cat_words = "feline, four-footed, ferocious, furry"
>>> cat_words.split(', ')
...
['feline', 'four-footed', 'ferocious', 'furry']
```

`<str>.split()`의 구분자는 두 글자 이상일 수도 있어요.
나눌 때는 **문자열 전체**를 기준으로 일치 여부를 판단해요.


```python

>>> colors = """red,
orange,
green,
purple,
yellow"""

>>> colors.split(',\n')
['red', 'orange', 'green', 'purple', 'yellow']
```

문자열은 모든 [공통 시퀀스 연산][common sequence operations]을 지원해요.
 개별 코드 포인트는 `for item in <str>`로 루프를 돌며 반복할 수 있어요.
 인덱스와 항목을 _함께_ 반복하려면 `for index, item in enumerate(<str>)`를 사용해요.


```python

>>> exercise = 'လေ့ကျင့်'

# Note that there are more code points than perceived glyphs or characters
>>> for code_point in exercise:
...    print(code_point)
...
လ
ေ
့
က
ျ
င
်
့

# Using enumerate will give both the value and index position of each element.
>>> for index, code_point in enumerate(exercise):
...    print(index, ": ", code_point)
...
0 :  လ
1 :  ေ
2 :  ့
3 :  က
4 :  ျ
5 :  င
6 :  ်
7 :  ့
```


[common sequence operations]: https://docs.python.org/3/library/stdtypes.html#common-sequence-operations
[str-join]: https://docs.python.org/3/library/stdtypes.html#str.join
[str-split]: https://docs.python.org/3/library/stdtypes.html#str.split
[text sequence]: https://docs.python.org/3/library/stdtypes.html#text-sequence-type-str
[unicode code points]: https://stackoverflow.com/questions/27331819/whats-the-difference-between-a-character-a-code-point-a-glyph-and-a-grapheme
