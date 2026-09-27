# 지침 추가

## DSL에 대한 설명

이 DSL에서 그래프는 `Graph` 타입의 객체예요. 이 객체는 다음을 설명하는 하나 이상의 튜플로 이루어진 `list`를 받아요:

+ attributes
+ `Nodes`
+ `Edges`

`Node`와 `Edge`의 구현은 `dot_dsl.py`에 들어 있어요.

DSL이 기대하는 설계와 기대하는 오류 타입, 오류 메시지에 대한 자세한 내용은 `dot_dsl_test.py`의 테스트 케이스를 살펴봐요.


## 예외 메시지

때로는 [예외를 발생시켜야](https://docs.python.org/3/tutorial/errors.html#raising-exceptions) 할 때가 있어요. 이럴 때는 오류의 원인이 무엇인지 알려 주는 **의미 있는 오류 메시지**를 항상 함께 넣어야 해요. 그래야 코드를 더 읽기 쉽게 만들고 디버깅에도 큰 도움이 돼요. 오류의 원인이 어떤 타입이라는 걸 아는 상황이라면 [내장 오류 타입](https://docs.python.org/3/library/exceptions.html#base-classes) 중 하나를 발생시켜도 되지만, 그래도 의미 있는 메시지는 함께 넣어야 해요.

이 연습 문제에서는 `Graph`가 잘못된 경우 `TypeError`를, `Edge`나 `Node`, `attribute`가 잘못된 경우 `ValueError`를 "throw"하기 위해 [raise 문](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)을 사용해야 해요. `exception`을 `raise`하면서 그와 함께 메시지도 넣어야만 테스트를 통과할 수 있어요.

메시지와 함께 오류를 발생시키려면, 메시지를 `exception` 타입의 인자로 써요:

```python
# Graph is malformed
raise TypeError("Graph data malformed")

# Edge has incorrect values
raise ValueError("EDGE malformed")
```
