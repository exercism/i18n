# 지침

이 연습 문제는 로그 파일 파싱을 다뤄요.

최근 보안 검토를 거친 뒤, 조직에서 보관 중인 로그 파일을 정리해 달라는 요청을 받았어요.

함수에 전달되는 모든 문자열은 null이 아니며 앞뒤에 공백이 없다고 보장돼요.

## 1. 깨진 로그 줄 식별하기

보관된 로그 줄 중 얼마나 많은 줄이 현재 표준을 따르지 않는지 대략 알고 있어야 해요.
간단한 검사만으로 로그 줄이 유효한지 알아낼 수 있다고 생각해요.
유효한 줄로 인정되려면 다음 문자열 중 하나로 시작해야 해요:

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

`IsValidLine` 함수를 구현해서 문자열이 유효하지 않으면 `false`를, 그렇지 않으면 `true`를 반환하게 해요.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. 로그 줄 나누기

새로운 팀이 조직에 합류했는데, 그 팀의 로그 파일은 "필드"를 구분할 때 이상한 구분자를 사용하고 있어요.
콜론 ":"처럼 합리적인 문자 대신 "<--->"나 "<=>" 같은 문자열을 써요(더 예쁘다는 이유로요). 사실 첫 문자가 "<"이고 마지막 문자가 ">"이며, 그 사이에 "~", "\*", "=", "-"가 어떤 조합으로든 들어가는 문자열이라면 뭐든 괜찮아요.

`SplitLogLine` 함수를 구현해요. 이 함수는 줄을 받아서 각각 하나의 필드를 담은 문자열 배열을 반환해요.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. 따옴표 안에 `password`가 포함된 줄 세기

팀은 따옴표 안에서 비밀번호를 언급한 부분을 알아야 직접 검토할 수 있어요.

수동 작업의 규모가 어느 정도일지 가늠할 수 있도록 `CountQuotedPasswords` 함수를 구현해요.

대소문자가 어떤 조합으로든 섞일 수 있는 문자열 "password"가 따옴표로 둘러싸인 로그 줄을 찾아내요.
따옴표 안에서 "password" 앞뒤에 다른 내용이 있을 수도 있다는 점을 고려해야 해요.
각 줄에는 따옴표가 많아야 두 개 있어요.

이 루틴에 전달되는 줄은 1번 작업에서 정의한 대로 유효할 수도 있고 아닐 수도 있어요.
유효하든 아니든 똑같은 방식으로 처리해요.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. 로그에서 부산물 제거하기

로그를 처리하는 상위 단계 어딘가에서 "end-of-line"이라는 텍스트와 그 뒤에 줄 번호가 (사이에 공백 없이) 로그 전체에 흩뿌려지고 있다는 걸 발견했어요.

`RemoveEndOfLineText` 함수를 구현해서 문자열을 받아 "end-of-line" 텍스트를 제거하고 "깨끗한" 문자열을 반환하게 해요.

"end-of-line" 텍스트가 없는 줄은 그대로 반환해야 해요.

"end-of-line" 문자열만 제거해요.
공백은 그대로 두면 돼요.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. 사용자 이름으로 줄에 태그 달기

일부 로그 줄에 사용자를 언급하는 문장이 포함되어 있다는 걸 알아차렸어요.
이런 문장에는 항상 `"User"`라는 문자열이 있고, 그 뒤에 하나 이상의 공백 문자, 그다음에 사용자 이름이 와요.
그래서 그런 줄에는 태그를 달기로 해요.

로그 줄을 처리하는 `TagWithUserName` 함수를 구현해요:

- `"User "` 문자열이 없는 줄은 그대로 둬요.
- `"User "` 문자열이 있는 줄은 줄 앞에 `[USR]`과 사용자 이름을 붙여요.

예를 들어:

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

다음과 같이 가정할 수 있어요:

- 로그에서 사용자 이름 뒤에는 공백 문자가 하나 이상 와요.
- 각 줄에는 `"User "` 문자열이 많아야 한 번 나와요.
- 사용자 이름은 공백을 포함하지 않는 비어 있지 않은 문자열이에요.
