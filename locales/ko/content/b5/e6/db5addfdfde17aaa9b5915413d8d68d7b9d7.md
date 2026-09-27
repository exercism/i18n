# 힌트

## 1. 기가초 기념일 날짜 계산하기

- 유니버설 타임은 에포크 이후 경과한 초 단위의 숫자예요.
- Common Lisp에는 유니버설 타임을 인코딩하거나 디코딩할 수 있는 함수가 두 개 있어요.
- 함수가 반환하는 여러 값은 알맞은 매크로를 사용하면 배열로 담을 수 있어요.
- [`decode-universal-time`][hyperspec-decode-universal-time]과 [`encode-universal-time`][hyperspec-encode-universla-time]의 시간대 매개변수는 선택 사항이지만 아주 중요해요. 두 함수의 기본값은 무엇일까요?

[hyperspec-decode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_dec_un.htm#decode-universal-time
[hyperspec-encode-universal-time]: http://www.lispworks.com/documentation/HyperSpec/Body/f_encode.htm#encode-universal-time
