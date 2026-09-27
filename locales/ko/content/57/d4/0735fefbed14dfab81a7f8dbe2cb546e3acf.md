# Rexx 스타일 가이드

이 가이드는 Rexx 트랙의 연습 문제 테스트 파일과 예제 파일에 사용할 스타일을 설명해요.

## Rexx 표준

코드는 Rexx 언어 레벨 5.0을 따라야 해요.

Regina Rexx 확장 기능과 외부 라이브러리 접근을 위한 SAA 표준 함수는 사용해도 돼요.

AREXX 확장 기능과 CMS 버퍼 조작 루틴은 사용하면 안 돼요.

## 플랫폼

런타임 테스트 환경은 Linux 기반이에요. 따라서 ADDRESS 명령어를 호출할 때는 그 환경에서 사용할 수 있는 명령어만 써야 해요. 이런 명령어는 코드 주석에 분명히 표시해야 해요.

## 이름

### 명령어

명령어(예약어)는 **_소문자_**로 표기해요. 따라서 다음은 스타일 가이드 권장 사항을 따르는 예예요:

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

반면 다음 두 가지는 어느 쪽도 권장 사항을 따르지 않으므로 권장하지 않아요:

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

그리고:

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### 내장 함수(BIF)

BIF는 다음 예시처럼 **_대문자_**로 표기해요:

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### 레이블(사용자 정의 함수)

레이블 이름은 다음 예시처럼 **_파스칼 케이스_**로 써요:

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### 변수

변수 이름은 **_소문자_**로 시작해야 하므로, 한 단어짜리 변수는 소문자로 써요.

여러 단어로 된 변수는 **_카멜 케이스_** 또는 **_스네이크 케이스_**로 표현할 수 있어요.

이 트랙에서 채택한 관례는 _대부분의 변수에 카멜 케이스를 사용하고_, 테스트 변수에는 스네이크 케이스를 쓰는 거예요. 상수로 쓰려는 변수는 선택적으로 대문자로 써도 돼요.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## 리터럴

문자열은 각각 작은따옴표 **`'`**와 큰따옴표 **`"`**로 나타낼 수 있어요. 다음 두 가지는 서로 같아요:

```rexx
say "Hello, world!"

say 'Hello, world!'
```

각각은 이스케이프 문자 없이 서로 안에 넣을 수 있어요:

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

문자열 안에 따옴표가 들어 있어 따옴표를 섞어 써야 하는 경우가 아니라면, 문자열은 **_작은따옴표_**로 나타내는 걸 권장해요.

### 16진수 및 2진수 문자열

2진수 값과 16진수 값은 각각 문자열 뒤에 **`B`** 또는 **`X`**를 붙여 나타낼 수 있어요. 예를 들면:

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

이런 값은 **_큰따옴표_**로 감싸는 걸 권장해요.

일반 문자열을 나타낼 때 작은따옴표를 쓰라는 앞의 권장 사항과 함께, 이 관례는 코드베이스에서 2진수와 16진수 문자열을 알아보기 쉽게 해줘요.

### 줄 바꿈 종결자
많은 UNIX 계열 언어나 C의 영향을 받은 언어에서는 리터럴 **_`\n`_**을 **_줄 바꿈_** 종결자로 써요. 이런 사용법은 아주 널리 퍼져 있고, 이 트랙의 여러 연습 문제에서 이 종결자가 들어간 문자열을 사용하고 다뤄요.

Rexx는 이 종결자를 지원하지 않고, **_`\`_** (또는 다른 어떤 문자든)을 이스케이프 문자로도 지원하지 않아요.

줄 바꿈 문자에 해당하는 Rexx의 값은 (플랫폼에 따라 다른) 16진수 값이에요. UNIX 계열 플랫폼에서는 다음과 같아요:

**_`"0A"X`_**

다음은 줄 바꿈이 들어간 문자열(bash 셸 사용)에 해당하는 Rexx 표현이에요:

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

즉:

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

이 트랙의 연습 문제에서는 터미널에 표시할 문자열에 필요할 때만 **_`\n`_**을 **_`"0A"X`_**로 바꿔요. 그 외의 경우 **_`\n`_** 문자열은 그냥 논리적인 줄 바꿈으로 해석돼요.

## 그 밖의 스타일 권장 사항

들여쓰기는 스페이스 두 칸, 세 칸, 네 칸 중 아무거나 써도 되지만, _두 칸_ 들여쓰기와 일관된 들여쓰기를 권장해요.

함수의 마지막 **_return_** 명령어는 레이블 이름과 나란히 맞춰서 그 함수의 끝을 분명히 표시해야 하고, _항상_ 값을 반환해야 해요.

불리언 NOT 연산자는 여러 기호로 나타낼 수 있어요. 이 트랙에서 선호하는 기호는 **`\`**이고, 이 사용법과 일관성을 유지하기 위해 관계형 '같지 않음' 연산자는 **`\=`**를 써요.

불리언 값 **`false`**와 **`true`**는 각각 **`0`**과 **`1`**로 나타내요. 이 값들을 위한 미리 정의된 리터럴은 없어요.

오류 상태는 반환 값으로 나타내는데, 문맥에 따라 빈 문자열 **`''`** 또는 **`-1`**로 오류 상태를 표시해요.

## 표준 코드 스타일 예시
```rexx
TO DO EXAMPLE
```

## 테스트 파일 구성

연습 문제마다 최상위 연습 문제 디렉터리에 테스트 파일이 하나 있고, 이름은 `<exercise>-check.rexx`예요.

이 관례를 따르면 `acronym` 연습 문제의 테스트 파일 이름은 `acronym-check.rexx`가 돼요.

각 연습 문제의 테스트 파일은 학습자가 연습 문제 요구 사항을 이해하도록 돕고, 기여자가 테스트를 구현하거나 확장하는 작업을 수월하게 하기 위해, 느슨하지만 일정한 방식으로 구성돼 있어요.

다음은 `acronym` 연습 문제의 테스트 파일 중 일부예요:

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

파일은 두 개의 논리적인 부분으로 나뉘고, 각 부분은 주석 줄로 구분돼요.

첫 번째 부분은 **_테스트 대상 함수_**의 이름(여기서는 `Abbreviate` 함수)을 `function` 변수에 대입해요. 이 변수 이름은 의미를 잘 드러내지만 임의로 정한 것이고, 파일의 나머지 부분에서 테스트 대상 함수의 이름이 필요할 때마다 이 변수를 참조해요.

이 부분에는 `context` 함수 호출도 있는데, 그 목적은 보면 바로 알 수 있어요.

다음 부분에는 단위 테스트가 들어 있어요. `check` 함수를 호출할 때마다 단위 테스트 하나가 돼요. 예상 매개변수는 다음과 같아요:

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>**는 테스트가 실행될 때 출력되는 문자열이에요. 최대한 설명적으로 만들기 위해, 예시처럼 테스트 대상 함수의 이름과 그 함수에 전달되는 인자로 이루어진 문자열을 쓰는 걸 권장해요.

**\<function invocation>**은 실제 함수 호출이고, 그 반환 값이 테스트 비교를 위해 `check`에 전달돼요.

**\<actual result variable>**은 선택적 매개변수이고, 사용한다면 테스트 비교에 쓸 값을 담고 있는 변수의 이름이에요.

이걸 쓰는 이유는 테스트 대상 함수의 반환 값 자체가 아니라 그 반환 값에서 _파생된_ 결과를 검사할 수 있게 하려는 거예요. 반환 값이 몇 KB짜리 문자열일 때가 대표적인 예인데, 다음과 같아요:

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

\<function invocation> 인자는 그래도 전달해야 한다는 점에 유의해요.

**\<test comparator>**는 수행할 비교의 종류를 설명하는 문자열이에요. 대부분의 경우 'to be'라는 문자열이 쓰이는데, 이는 같은지 비교하라는 뜻이에요. 다른 비교 옵션은 단위 테스트 프레임워크 문서를 참고해요.

**\<expected result>**는 말 그대로 실제 결과와 비교하는 기준 값이에요.

테스트 파일 안에서는 변수를 자유롭게 선언하고(물론 사용하기 전에), 리터럴 대신 `check`의 인자로 쓸 수 있어요.
