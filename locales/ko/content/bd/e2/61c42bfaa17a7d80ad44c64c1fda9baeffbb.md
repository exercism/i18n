# 개요

어휘는 Factor에서 코드를 구성하는 단위로, 이름이 붙은 단어 정의들의 묶음이에요.

```factor
USING: kernel ;
IN: greetings.formal

: hello ( name -- str ) "Greetings, " prepend ;
```

## 파일과 디렉터리 구조

어휘 이름은 `.`을 구분자로 써요. 파일 경로도 그 점을 그대로 따라가요.

| 어휘                   | 파일                                       |
| ---                    | ---                                        |
| `greetings`            | `greetings/greetings.factor`               |
| `greetings.formal`     | `greetings/formal/formal.factor`           |
| `greetings.casual`     | `greetings/casual/casual.factor`           |

Factor의 로더는 *어휘 루트*, 즉 프로젝트 루트와 함께 제공되는 basis 라이브러리를 따라가면서 각 경로 조각과 이름이 일치하는 디렉터리를 찾을 때까지 탐색해요. 마지막 조각은 파일 이름으로 다시 쓰여요.

## `USING:`과 `IN:`

`USING:`은 다른 어휘들을 현재 파일의 검색 경로로 불러와요. 어휘 하나만 불러올 때는 `USE:`를 써요. `IN:`은 이 파일에서 정의한 단어들이 *어느 어휘에 속하는지*를 선언해요. 그 단어들의 정규화된 이름은 이 접두사로 시작해요.

```factor
USING: kernel sequences greetings.formal ;
IN: greetings

: greet-everyone ( names -- strs )
    [ hello ] map ;
```

여기서 `greet-everyone`은 `greetings`에 속하고, `greetings.formal`의 `hello`와 `sequences`의 `map`을 호출해요.

## 풀이를 여러 어휘로 나누는 이유

코드를 여러 어휘로 나누면 다음과 같은 장점이 있어요.

- 작은 도우미 단어들을 역할별로 묶어, 그것들을 조합하는 상위 수준 루틴과 분리할 수 있어요.
- 메인 루틴까지 끌고 오지 않고도 도우미 단어들을 다른 곳에서 재사용할 수 있어요.
- 각 파일을 하나의 일관된 추상화 계층으로 읽을 수 있어요.

Factor의 로더는 충분히 빠르고 지연 로딩을 하기 때문에 코드를 더 작은 어휘로 *잘게* 나누는 데 큰 부담이 없어요. 표준 라이브러리에서는 어휘를 적극적으로 나누는 것이 관례예요.
