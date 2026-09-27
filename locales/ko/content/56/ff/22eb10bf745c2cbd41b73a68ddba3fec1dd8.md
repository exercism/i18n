# 개요

배열은 Factor의 고정 길이 시퀀스 타입이에요. 원소는 바꿀 수 있지만 길이는 바꿀 수 없어요.
리터럴은 `{ … }`를 쓰고 원소 사이에 공백을 넣어요. `arrays` 보카불러리는
스택에서 값을 꺼내는 작은 생성자들을 추가해요:

| 워드     | 스택 효과                            |
|----------|-------------------------------------|
| `1array` | `( a     -- { a } )`                |
| `2array` | `( a b   -- { a b } )`              |
| `3array` | `( a b c -- { a b c } )`            |
| `<array>`| `( n elt -- array )`, `elt`를 `n`개 복사한 배열 |
| `array?` | `( obj   -- ? )`, 타입 판별자        |

`sequences`의 [프로토콜][sequence-protocol] 워드 몇 개는 배열과 함께 너무 자주
등장해서, 한 묶음으로 알아 둘 만해요:

| 워드      | 스택 효과                                              |
|-----------|-------------------------------------------------------|
| `concat`  | `( seqs -- seq )`, 시퀀스의 시퀀스를 평탄화            |
| `join`    | `( seqs glue -- seq )`, 구분자로 평탄화                |
| `reverse` | `( seq -- newseq )`                                   |
| `index`   | `( elt seq -- i/f )`, 원소의 인덱스 또는 `f`           |
| `member?` | `( elt seq -- ? )`, 포함 여부 검사                     |

```factor
USING: arrays sequences ;

3 4 2array .                       ! => { 3 4 }
{ { 1 2 } { 3 4 } } concat .       ! => { 1 2 3 4 }
{ 1 2 3 4 } reverse .              ! => { 4 3 2 1 }
"b" { "a" "b" "c" } index .        ! => 1
"b" { "a" "b" "c" } member? .      ! => t
```

[`sets`][sets]의 `all-unique?`와 `members`도 어떤 시퀀스든 받아요. 배열의
원소에서 중복을 없애거나, 해시셋으로 먼저 변환하지 않고 중복을 확인할 때
편리해요.

[sets]: https://docs.factorcode.org/content/vocab-sets.html
[sequence-protocol]: https://docs.factorcode.org/content/article-sequence-protocol.html
