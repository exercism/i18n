# 힌트

## 일반

- 문자열에 대해 알아보려면 공식 [문자열 타입 문서][string-type-documentation]를 읽어보세요.
- 문자열에 쓸 수 있는 내장 연산을 알아보려면 [사용 가능한 _문자열 함수_][string-functions]를 살펴보세요.

## 1. 이름의 첫 글자 가져오기

- 문자열에서 첫 번째 문자를 가져오는 [내장 함수][string-substr]가 있어요.
- 문자열의 앞, 뒤, 또는 앞뒤의 공백을 제거하는 [내장 함수][string-trim]가 여러 개 있어요.

## 2. 첫 글자를 이니셜로 만들기

- 문자열의 모든 문자를 대문자로 바꾸는 [내장 함수][string-upcase]가 있어요.
- 두 문자열을 이어 붙이는 [연산자][concat-operator]가 있어요.

## 3. 전체 이름을 이름과 성으로 나누기

- 다른 문자열을 기준으로 문자열을 나누는 [내장 함수][string-explode]가 있어요.
- 배열의 처음 몇 개 원소는 배열에 대한 패턴 매칭으로 변수에 할당할 수 있어요.

## 4. 하트 안에 이니셜 넣기

- 문자열 안에서 [변수를 확장하는][string-variables] 특별한 문법이 있어요.
- 줄바꿈을 이스케이프할 필요 없이 [여러 줄 문자열][heredoc-syntax]을 작성하는 특별한 문법이 있어요.

[string-type-documentation]: https://www.php.net/manual/en/language.types.string.php
[string-functions]: https://www.php.net/manual/en/ref.strings.php 
[string-substr]: https://www.php.net/manual/en/function.substr.php 
[string-trim]: https://www.php.net/manual/en/function.trim.php 
[string-upcase]: https://www.php.net/manual/en/function.strtoupper.php
[string-explode]: https://www.php.net/manual/en/function.explode.php
[string-variables]: https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing 
[concat-operator]: https://www.php.net/manual/en/language.operators.string.php
[heredoc-syntax]: https://www.php.net/manual/en/language.types.string.php#language.types.string.syntax.heredoc
