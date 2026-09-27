# 문자열 포매팅

Python의 내장 `str`은 두 가지 강력한 문자열 서식 지정 방법인 `f-strings`와 `str.format()`을 사용해 초기화할 수 있어요. `f'{variable}'`을 사용한 문자열 보간은 읽기 쉽고 완전하며 매우 빠르기 때문에 선호돼요. 국제화에 친화적이거나 더 유연한 접근이 필요할 때는 `str.format()`으로 필요한 거의 모든 다른 `str` 변형을 만들 수 있어요.

# 리터럴 문자열 보간. f-string

리터럴 문자열 보간은 `f` 접두사와 중괄호 `{object}`를 사용해 표현식을 `str`로 빠르고 효율적으로 서식 지정하고 평가하는 방법이에요. 작은따옴표 `'`, 큰따옴표 `"`, 그리고 여러 줄과 이스케이프를 위한 삼중 따옴표 `'''` 또는 `"""` 등 감싸는 모든 문자열 타입과 함께 사용할 수 있어요.

**f-string**의 이 기본 예제에서는 변수 `name`이 문자열 맨 앞에 렌더링되고, `int` 타입의 변수 `age`가 `str`로 변환되어 `' is '` 뒤에 렌더링돼요.

```python
>>> name, age = 'Artemis', 21
>>> f'{name} is {age} years old.'
'Artemis is 21 years old.'
```

`f-string`이 평가하는 표현식은 거의 무엇이든 될 수 있어요. 그래서 입력을 정화하는 것에 대한 일반적인 주의가 여기에도 적용돼요. 평가할 수 있는 여러 값 중 일부는 `str`, 숫자, 변수, 산술 표현식, 조건 표현식, 내장 타입, 슬라이스, 함수, 또는 `__str__`이나 `__repr__` 메서드가 정의된 객체예요. 몇 가지 예시를 볼까요:

```python
>>> waves = {'water': 1, 'light': 3, 'sound': 5}

>>> f'"A dict can be represented with f-string: {waves}."'
'"A dict can be represented with f-string: {\'water\': 1, \'light\': 3, \'sound\': 5}."'

>>> f'Tenfold the value of "light" is {waves["light"]*10}.'
'Tenfold the value of "light" is 30.'
```

f-string 출력은 `.format()`에 설명된 _너비_, _정렬_, _정밀도_와 같은 동일한 제어 메커니즘을 지원해요. 문자열 보간은 국제화(I18N)와 현지화(L10N)를 위한 GNU gettext API와 함께 사용할 수 없어서, 대신 `str.format()`을 사용해야 해요.

# `str.format()` 메서드

`str.format()`은 텍스트 안의 자리 표시자를 바꿀 수 있게 해줘요. 자리 표시자는 이름이 있는 인덱스 `{price}`, 번호가 있는 인덱스 `{0}`, 또는 빈 자리 표시자 `{}`로 나타내요. 그 값은 `str.format()` 메서드의 매개변수로 지정해요. 예를 들면 이래요:

```python
>>> 'My text: {placeholder1} and {}.'.format(12, placeholder1='value1')
'My text: value1 and 12.'
```

Python `.format()`은 텍스트를 정렬하고 변환하는 등에 사용할 수 있는 [미니 언어 지정자][format-mini-language] 전체를 지원해요.

복잡한 서식 지정자는 `{[<name>][!<conversion>][:<format_specifier>]}`예요:

- `<name>`은 이름이 있는 자리 표시자나 숫자, 또는 비어 있을 수 있어요.
- `!<conversion>`은 선택 사항이며 [`str()`][str-conversion]의 `!s`, [`repr()`][repr-conversion]의 `!r`, [`ascii()`][ascii-conversion]의 `!a` 중 하나여야 해요. 기본값으로는 `str()`이 사용돼요.
- `:<format_specifier>`는 선택 사항이며, [여기에 나열된][format-specifiers] 많은 옵션을 가질 수 있어요.

분음 부호가 붙은 아스키 문자의 변환 예시예요:

```python
>>> '{0!s}'.format('ë')
'ë'
>>> '{0!r}'.format('ë')
"'ë'"
>>> '{0!a}'.format('ë')
"'\\xeb'"

>>> 'She said her name is not {} but {!r}.'.format('Anna', 'Zoë')
"She said her name is not Anna but 'Zoë'."
```

서식 지정자 예시예요. [더 많은 예시는 이 페이지 끝에서 볼 수 있어요][summary-string-format]:

```python
>>> "The number {0:d} has a representation in binary: '{0: >8b}'.".format(42)
"The number 42 has a representation in binary: '  101010'."
```

`str.format()`은 국제화(I18N)와 현지화(L10N)를 위한 [GNU gettext API][gnu-gettext-api]와 함께 사용해야 해요.

[all-about-formatting]: https://realpython.com/python-formatted-output
[difference-formatting]: https://realpython.com/python-string-formatting/#2-new-style-string-formatting-strformat
[printf-style-docs]: https://docs.python.org/3/library/stdtypes.html#printf-style-string-formatting
[tuples]: https://www.w3schools.com/python/python_tuples.asp
[format-mini-language]: https://docs.python.org/3/library/string.html#format-specification-mini-language
[str-conversion]: https://www.w3resource.com/python/built-in-function/str.php
[repr-conversion]: https://www.w3resource.com/python/built-in-function/repr.php
[ascii-conversion]: https://www.w3resource.com/python/built-in-function/ascii.php
[format-specifiers]: https://www.python.org/dev/peps/pep-3101/#standard-format-specifiers
[summary-string-format]: https://www.w3schools.com/python/ref_string_format.asp
[template-string]: https://docs.python.org/3/library/string.html#template-strings
[gnu-gettext-api]: https://docs.python.org/3/library/gettext.html
