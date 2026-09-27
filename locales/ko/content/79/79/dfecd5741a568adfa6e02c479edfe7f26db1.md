# 지침 추가


## Python 트랙에서 이 연습 문제를 구현한 방식


이 연습 문제의 테스트는 시계가 Clock `class`로 구현되기를 기대해요.
Python의 클래스가 익숙하지 않다면, [concept:python/classes]()와 [클래스][classes in python] (_Python 문서에서_)부터 시작하는 게 좋아요.


## 클래스 표현하기

[객체][what-is-an-object]를 다루고 디버깅할 때는 그 객체를 잘 표현하는 것이 중요해요.
예를 들어, Python [REPL][REPL] 환경에서 새로운 [`datetime.datetime`][datetime] 객체를 만들면, 그 객체의 [문자열 표현][str-rep-classes]을 볼 수 있어요:


```python
>>> from datetime import datetime
>>> new_date = datetime(2022, 5, 4)
>>> new_date
datetime.datetime(2022, 5, 4, 0, 0)
```

Clock `class`는 날짜 _없이_ 시간을 다루는 사용자 정의 `object`를 만들어야 해요.
이 `class`의 중요한 측면 중 하나는 이것이 _문자열_로 어떻게 표현되는가예요.
Clock `class`로 만든 Clock `objects`를 사용하거나 호출하는 다른 프로그래머들은 디버깅을 비롯한 여러 작업에서 이 문자열 표현을 참고해요.
그런데 사용자 정의 `class`의 기본 표현은 그다지 도움이 되지 않아요:


```python
>>> Clock(12, 34)
<Clock object st 0x102807b20 >
```

더 도움이 되는 표현을 만들려면 `class`에 [`__repr__`][repr-method] [특수 메서드][dunder-methods]를 정의하면 돼요.

이상적으로는 그 `__repr__` 메서드가 [`eval()`][eval-built-in]에 전달했을 때 객체를 다시 만들 수 있는 유효한 Python 코드를 반환해야 해요. 이는 [`__repr__` 메서드 명세][repr-docs]에 나와 있어요.
유효한 Python 코드를 반환하면 다른 개발자가 그 `str`을 코드나 REPL에 바로 복사해서 붙여넣을 수 있어요.
오전 11시 30분을 나타내는 `Clock`은 이렇게 생겼을 수 있어요:

```python
 `Clock(11, 30)`
```

`__repr__` 메서드를 정의하는 것은 모든 사용자 정의 클래스에 좋은 관행이에요.
몇 가지 더 고려할 점이 있어요:

- 이 메서드가 반환하는 정보는 문제를 디버깅할 때 도움이 되어야 해요.
- _이상적으로는_ 이 메서드가 유효한 Python 코드인 문자열을 반환해요. 물론 항상 가능한 것은 아니에요.
- 유효한 Python 코드를 만드는 것이 현실적이지 않다면, 꺾쇠괄호 사이에 설명을 넣어 반환하는 것이 관례예요: `< ...a practical description... >`.


### 문자열 변환

`__repr__` 메서드와 더불어, `class`의 "사람이 읽기 쉬운" 문자열 표현이 따로 필요할 때도 있어요.
이것은 프로그램 출력이나 문서를 위해 객체의 형식을 지정할 때 사용할 수 있어요.
이는 [`__str__`][str-dunder] 특수 메서드를 작성하면 돼요.
`datetime.datetime`을 다시 볼까요:


```python
>>> str(datetime.datetime(2022, 5, 4))
'2022-05-04 00:00:00'
```

`datetime` 객체에게 자신을 문자열 표현으로 변환하라고 하면, [ISO 8601 표준][ISO 8601]에 따라 형식이 지정된 `str`을 반환해요. 대부분의 datetime 라이브러리는 이 문자열을 사람이 읽을 수 있는 날짜와 시간으로 파싱할 수 있어요.

이 연습 문제에서는 Clock을 위한 `__repr__` 메서드뿐 아니라 `__str__` 메서드도 작성할 기회를 얻어요.

```python
>>> str(Clock(11, 30))
'11:30'
```

이 문자열 변환을 지원하려면 `class`에 `__str__` 특수 메서드를 만들어야 해요. 이 메서드는 Clock 시간을 보여 주는, 더 "사람이 읽기 쉬운" 문자열을 반환해요.

`__str__` 메서드를 만들지 않고 클래스에 `str()`을 호출하면, Python은 대체 수단으로 클래스의 `__repr__`을 호출하려고 해요.
따라서 이 두 특수 메서드 중 하나만 구현한다면, `__str__`만 만드는 것보다 `__repr__`을 만드는 게 더 좋아요.


[ISO 8601]: https://www.iso.org/iso-8601-date-and-time-format.html
[REPL]: https://pythonprogramminglanguage.com/repl/
[classes in python]: https://docs.python.org/3/tutorial/classes.html
[datetime]: https://docs.python.org/3/library/datetime.html#available-types
[dunder-methods]: https://www.pythonmorsels.com/every-dunder-method/
[eval-built-in]: https://docs.python.org/3/library/functions.html#eval
[repr-docs]: https://docs.python.org/3/reference/datamodel.html#object.__repr__
[repr-method]: https://docs.python.org/3/library/functions.html#repr
[str-dunder]: https://docs.python.org/3/reference/datamodel.html#object.__str__
[str-rep-classes]: https://www.digitalocean.com/community/tutorials/python-str-repr-functions#introduction
[what-is-an-object]: https://realpython.com/ref/glossary/object/
