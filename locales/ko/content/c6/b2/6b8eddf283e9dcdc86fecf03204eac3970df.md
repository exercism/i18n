# 힌트

## 일반

- Kotlin은 문자열을 다루기 위한 다양한 [함수][ref-strings]를 제공해요. `Members & Extensions` 탭을 꼭 확인해 봐요!

## 1. 로그 줄에서 메시지 가져오기

- 주어진 구분자 뒤에 오는 `String` 부분을 추출하는 [함수][ref-string-substringAfter]가 있어요.
- `String`에서 공백을 제거하는 방법은 [Kotlin에서 문자열의 모든 공백 제거하기][tutorial-trim-white-space]에서 다뤄요.

## 2. 로그 줄에서 로그 레벨 가져오기

- 주어진 구분자 _앞_에 있는 `String` 부분을 추출하는 [함수][ref-string-substringBefore]도 있어요.
- `String`을 소문자로 바꾸는 [방법][ref-string-lowercase]도 있어요.

## 3. 로그 줄 형식 바꾸기

- [문자열 템플릿][docs-string-template]은 [여러 줄 문자열][docs-string-multiline]로 만들 수 있어요.

[docs-string-multiline]: https://kotlinlang.org/docs/strings.html#multiline-strings
[docs-string-template]: https://kotlinlang.org/docs/strings.html#string-templates
[ref-strings]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/
[ref-string-indexOf]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-537588047%2FFunctions%2F-1430298843
[ref-string-lowercase]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#-648004414%2FFunctions%2F-956074838
[ref-string-substringAfter]: https://kotlinlang.org/api/core/kotlin-stdlib/kotlin/-string/#1564391517%2FFunctions%2F-1430298843
[tutorial-search-text-in-string]: https://javarevisited.blogspot.com/2016/10/how-to-check-if-string-contains-another-substring-in-java-indexof-example.html
[tutorial-trim-white-space]: https://www.baeldung.com/kotlin/string-remove-whitespace
