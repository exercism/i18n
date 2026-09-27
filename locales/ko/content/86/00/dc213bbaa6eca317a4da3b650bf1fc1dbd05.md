# 힌트

## 일반

이벤트에 대한 기본 정보를 담은 전단지를 만들 때는 f-string이나 `format()` 메서드만 사용해요.

- [Python 문자열 포매팅 소개][str-f-strings-docs]
- [realpython.com의 글][realpython-article]

## 1. 헤더의 첫 글자를 대문자로 만들기

- `str` 메서드 `capitalize`를 사용해 제목의 첫 글자를 대문자로 만들어요.

## 2. 날짜 포매팅하기

- `date`는 `f''`나 `''.format()`을 사용해 직접 포매팅해야 해요.
- `date`는 'Month day, year' 형식을 사용해야 해요.

## 3. 유니코드 문자를 아이콘으로 렌더링하기

- `format`으로 렌더링하는 한 가지 방법은 유니코드 접두사 `u'{}'`를 사용하는 거예요.

## 4. 완성된 전단지 표시하기

- 별표와 문자를 정렬할 올바른 [format_spec 필드][formatspec-docs]를 찾아보세요.
- 섹션 1은 첫 글자를 대문자로 바꾼 `header` 문자열이에요.
- 섹션 2는 `date`예요.
- 섹션 3은 아티스트 목록이고, 각 아티스트는 같은 인덱스의 유니코드 문자와 연결돼요.
- 각 줄은 20자로 구성되어야 해요.
- 각 섹션 사이에 필요한 빈 줄을 추가하는 간결한 코드를 작성해요.
- 날짜가 주어지지 않으면 빈 줄로 대체해요.

```python
******************** # 20 asterisks
*                  *
*     'Header'     * # capitalized header
*                  *
* Month day, year  * # Optional date
*                  *
* Artist1       ⑴ * # Artist list from 1 to 4
* Artist2       ⑵ *
* Artist3       ⑶ *
* Artist4       ⑷ *
*                  *
********************
```

[str-f-strings-docs]: https://docs.python.org/3/reference/lexical_analysis.html#f-strings
[realpython-article]: https://realpython.com/python-formatted-output/
[formatspec-docs]: https://docs.python.org/3/library/string.html#formatspec
