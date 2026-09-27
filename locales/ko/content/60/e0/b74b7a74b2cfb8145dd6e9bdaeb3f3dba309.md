# 추가 지침

## 예외 메시지

때로는 [예외를 발생시키는](https://docs.python.org/3/tutorial/errors.html#raising-exceptions) 것이 필요해요. 이때는 오류의 원인이 무엇인지 알려주는 **의미 있는 오류 메시지**를 항상 포함해야 해요. 이렇게 하면 코드를 더 읽기 쉽게 만들고 디버깅에도 큰 도움이 돼요. 오류 원인이 특정 유형일 것이라고 아는 상황이라면 [내장 오류 유형](https://docs.python.org/3/library/exceptions.html#base-classes) 중 하나를 발생시켜도 되지만, 그래도 의미 있는 메시지는 포함해야 해요.

이 연습 문제에서는 `prime()` 함수가 잘못된 입력을 받았을 때 [raise 문](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)을 사용해 `ValueError`를 "던져야" 해요. 이 연습 문제는 _양수_만 다루기 때문에, 1보다 작은 수는 모두 잘못된 입력이에요.  `exception`을 `raise`하면서 그와 함께 메시지도 포함해야만 테스트를 통과할 수 있어요.

메시지와 함께 `ValueError`를 발생시키려면, 메시지를 `exception` 유형의 인자로 작성해요:

```python
# when the prime function receives malformed input
raise ValueError('there is no zeroth prime')
```
