# Pyret 트랙에서 테스트하기

## 사전 준비 사항 설치하기

연습 문제를 내려받았다면, 테스트를 실행하기 위해 Node.js 모듈을 설치해야 해요:

```sh
cd /path/to/exercise
npm install
```

그다음 `pyret` 명령줄 도구가 있는 디렉터리를 $PATH에 추가해요

```sh
# bash
PATH="./node_modules/.bin:$PATH"

# zsh
path=(./node_modules/.bin $path)

# fish
fish_add_path ./node_modules/.bin
```

## 시작하기

연습 문제 디렉터리에는 여러 파일이 있지만, 가장 중요한 두 파일은 풀이 파일과 테스트 파일이에요.
다음 예시에서는 Leap 연습 문제를 내려받았어요.

```bash
leap/
├── leap.arr       # Solution file - your code goes here
├── leap-test.arr  # Test cases for the exercise
```

테스트를 실행하려면, 공식 Exercism CLI를 내려받았다면 `exercism test`를 사용하고, 아니라면 `pyret leap-test.arr` 명령을 실행해요.
Pyret은 테스트 스위트를 실행하는데, 이는 특정 입력과 기대 결과에 대해 풀이 파일을 검사하는, 라벨이 붙은 일련의 `check` 블록으로 이루어져 있어요.
이 과정에서 중요한 부분은 테스트 스위트가 여러분의 코드를 볼 수 있도록 코드의 일부를 명시적으로 내보내는 것이에요.

## provide

이 트랙의 테스트는 여러분의 파일을 불러와서, 코드에서 명시적으로 내보낸 것은 무엇이든 접근할 수 있어요.

변수를 내보내려면 파일 맨 앞에 [provide 문][provide-statement]을 추가해야 해요.

다음 코드 조각은 `a`, `b`, `c`를 내보내는 두 가지 올바른 방법이에요.

```pyret
# using a list of bindings
provide a, b, c end
```

```pyret
# using an object literal
provide {
  a: a,
  b: b,
  c: c
}
end
```

세 번째 방법인 `provide *`는 사용자 정의 데이터 타입을 제외한 모든 최상위 바인딩을 내보내는 축약형이에요.
하지만 Pyret은 [섀도잉][shadowing]을 엄격하게 허용하지 않기 때문에, 일반적으로 권장되지 않아요.

## provide-types

일부 연습 문제는 테스트를 위해 [사용자 정의 데이터 타입][data-definition]을 내보내야 해요.
그런 경우에는 [provide-types 문][provide-types-statement]을 사용할 수 있어요.
데이터 타입에는 내보내지 않을 수도 있는 추가 함수가 있기 때문에, 섀도잉 문제에도 불구하고 `provide-types *`를 사용하는 것이 좋아요.

```pyret
provide-types *

data MyPoint:
  | two-dim(x, y)
  | three-dim(x, y, z)
end
```

모든 연습 문제 스텁에는 사용할 수 있도록 `provide` 또는 `provide-types` 문이 준비되어 있어요.

[provide-statement]: https://pyret.org/docs/latest/Provide_Statements.html
[shadowing]: https://pyret.org/docs/latest/Bindings.html#%28part._s~3ashadowing%29
[data-definition]: https://pyret.org/docs/latest/s_declarations.html#%28elem._%28bnf-prod._%28.Pyret._data-decl%29%29%29
[provide-types-statement]: https://pyret.org/docs/latest/Provide_Statements.html
