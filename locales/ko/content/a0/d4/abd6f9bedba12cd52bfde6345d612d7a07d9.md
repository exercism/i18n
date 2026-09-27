# 지침 추가

## 예외 메시지

때로는 [예외를 발생시켜야 할 때](https://docs.python.org/3/tutorial/errors.html#raising-exceptions)가 있어요. 이때는 오류의 원인이 무엇인지 알려 주는 **의미 있는 오류 메시지**를 항상 함께 넣어야 해요. 그러면 코드가 더 읽기 쉬워지고 디버깅에 큰 도움이 돼요. 오류 원인이 특정 유형일 것이라고 알고 있는 상황이라면 [내장 오류 유형](https://docs.python.org/3/library/exceptions.html#base-classes) 중 하나를 골라 발생시켜도 되지만, 이때도 의미 있는 메시지를 함께 넣어야 해요.

이 연습 문제에서는 입력한 칸이 범위를 벗어났을 때 `ValueError`를 "던지기" 위해 [raise 문](https://docs.python.org/3/reference/simple_stmts.html#the-raise-statement)을 사용해야 해요. 테스트는 `exception`을 `raise`하고 그와 함께 메시지를 포함할 때만 통과해요.

메시지와 함께 `ValueError`를 발생시키려면, 메시지를 `exception` 타입의 인자로 적어요:

```python
# when the square value is not in the acceptable range        
raise ValueError("square must be between 1 and 64")
```
