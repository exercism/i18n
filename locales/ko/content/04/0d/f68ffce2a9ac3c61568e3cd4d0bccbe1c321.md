# 더미 헤더

## 함수 라이브러리

이번 연습 문제는 우리가 작성하는 해답이 "main" 스크립트가 아닌 첫 사례예요. 우리는 다른 스크립트에서 "source"해 우리 함수를 호출할 수 있도록 라이브러리를 작성하고 있어요.

### Bash nameref

이 연습 문제에서는 `nameref` 변수를 사용해야 해요. 그러려면 bash 버전이 최소 4.0 이상이어야 하죠. MacOS의 기본 bash를 사용하고 있다면 다른 버전을 설치해야 해요. [Bash 설치하기](https://exercism.io/tracks/bash/installation)를 참고하세요.

nameref는 변수를 함수에 _참조_로 전달하는 방법이에요. 이렇게 하면 함수 안에서 변수를 수정할 수 있고, 갱신된 값이 함수를 호출한 스코프에서도 그대로 반영돼요. 다음은 예시예요:
```bash
prependElements() {
    local -n __array=$1
    shift
    __array=( "$@" "${__array[@]}" )
}

my_array=( a b c )
echo "before: ${my_array[*]}"    # => before: a b c

prependElements my_array d e f
echo "after: ${my_array[*]}"     # => after: d e f a b c
```
