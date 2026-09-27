# 소개

## 패턴에 대해 더 알아보기

Fundamentals 개념에서 배웠듯이, AWK 프로그램은 **패턴-동작 쌍**으로 구성돼요.

```awk
pattern1 { action1 }
pattern2 { action2 }
...
```

### "패턴"이란 무엇일까요?

"패턴"은 모든 AWK 표현식이에요.
표현식 결과가 참으로 평가되는지에 따라 동작을 실행할지가 결정돼요.

### 빈 패턴

패턴은 생략할 수 있어요.
이 경우, 모든 레코드에 대해 동작이 수행돼요.

passwd 파일에 있는 모든 사용자 이름을 출력할 수 있어요.

```sh
awk -F: '{print $1}' /etc/passwd
```

### 정규 표현식

AWK는 문자열을 정규 표현식과 비교해서 불리언 결과를 얻을 수 있어요.

특정 필드를 일치시키려면 `~` 정규식 일치 연산자를 사용해요.
이 연산자는 왼쪽 피연산자로 문자열을, 오른쪽 피연산자로 정규 표현식을 받아요.
정규 표현식 리터럴은 `/` 슬래시로 감싸요.

passwd 파일에서 bash로 로그인하는 사용자를 찾으려면:

```sh
awk -F: '$7 ~ /bash/ {print $1}' /etc/passwd
```

`!~`는 정규식이 일치하지 **않음**을 나타내는 연산자예요.

현재 레코드에 정규식을 일치시키려면 `$0 ~ /regex/`라고 쓰면 돼요.
이 표현이 워낙 흔해서 축약형이 있어요. `$0`과 `~`를 생략하고 그냥 `/regex/`라고 쓰면 돼요.

```sh
awk '/regex/' data.txt
```

~~~~exercism/note
이 AWK 한 줄 명령을 그에 해당하는 grep 명령과 비교해 봐요

```sh
grep 'regex' data.txt
```

AWK는 간결함을 포기하지 않으면서도 완전한 프로그래밍 언어를 제공해요.
~~~~

GNU AWK의 정규 표현식 종류에 대해서는 다음 개념에서 더 자세히 다뤄요.

### 표현식

AWK 표현식(산술, 논리 등)은 패턴으로 사용할 수 있어요.

UID가 1000 이상인 모든 사용자를 추출하려면:

```sh
awk -F: '$3 >= 1000' /etc/passwd
```

AWK에서 거짓으로 취급하는 값은 숫자 0과 빈 문자열이고, 그 밖의 모든 숫자나 문자열은 참이라는 점을 기억해요.
숫자나 문자열로 평가되는 표현식은 무엇이든 패턴으로 사용할 수 있어요.

### 함수

어떤 [내장][builtins] 함수나 [사용자 정의][] 함수든 표현식에 사용할 수 있고, 따라서 패턴에도 사용할 수 있어요.
몇 가지 예를 들어 볼게요:

```awk
length($1) {print "first field is not empty"}
```
```awk
toupper(substr($1, 1, 1)) ~ /[AEIOU]/ {print "starts with a vowel"}
```

### 상수 패턴

흔한 AWK 관용구가 있어요:

```sh
{
    xyz()   # some code that transforms each record
}
1
```

`1`은 참으로 평가되는 패턴이고, 연결된 동작이 없어요.
이는 "현재 레코드를 출력하라"는 뜻이에요.

[builtins]: https://www.gnu.org/software/gawk/manual/html_node/Built_002din.html
[user-defined]: https://www.gnu.org/software/gawk/manual/html_node/User_002ddefined.html
