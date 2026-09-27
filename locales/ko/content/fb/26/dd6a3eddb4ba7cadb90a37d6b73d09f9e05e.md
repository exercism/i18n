# 지침 추가

## Arturo 지침

이 연습 문제에서는 `stringify` 워드를 두 가지 방식으로 호출할 수 있도록 지원해야 해요:

1. `roman` 속성을 사용하는 방식 (예: `stringify.roman 3999`)
2. `roman` 속성을 사용하지 않는 방식 (예: `stringify 3999`)

더 자세한 내용은 [attributes][attributes] 문서와 [`attr`][attr] 문서를 확인해 보세요.

~~~~exercism/caution
`attr` 외에도 `attrs` 함수가 유용해요. 이 함수는 함수 호출의 모든 속성을 딕셔너리로 반환해요.

이 두 함수는 파괴적이라는 점을 주의하세요!

Arturo의 구현은 ["attributes table"][createAttrsStack]을 사용해요.

* `attrs`는 속성을 가져온 뒤 [테이블을 명시적으로 비워요][getAttrsDict].
* `attr`는 테이블에서 속성을 [제거("팝")해요][builtinAttr].

예를 들어 볼까요:

```arturo
showAttributes: function [x][
    print attr 'question
    print attrs
    print attrs
]

showAttributes .question:"6 * 9" .answer:42 'arg
```
출력 결과는 다음과 같아요
```
6 * 9
[answer:42]
[]
```

이렇게 각 단계마다 속성 딕셔너리가 줄어드는 것을 볼 수 있어요.

**결론**: 속성은 한 번만 가져올 수 있다는 점을 알아 두세요.
속성을 다시 참조해야 한다면, 함수 시작 부분에서 속성을 저장해 두세요.

[getAttrsDict]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L187
[builtinAttr]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/library/Reflection.nim#L85
[createAttrsStack]: https://github.com/arturo-lang/arturo/blob/2ef0081570feb6ab752404c32bbf85132df379fb/src/vm/stack.nim#L136
~~~~

[attributes]: https://arturo-lang.io/documentation/language/#attributes
[attr]: https://arturo-lang.io/documentation/library/reflection/attr/
