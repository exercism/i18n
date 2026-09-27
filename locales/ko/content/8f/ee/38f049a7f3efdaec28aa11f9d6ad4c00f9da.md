# 소개

파일은 디스크 위에 이름이 붙은 스트림이에요. [`io.files`][io.files] 어휘로 파일을 한 번의 호출로 통째로 읽고 쓸 수도 있고, 스코프가 있는 스트림을 통해 조금씩 읽고 쓸 수도 있어요. 파일을 다루는 단어는 모두 **인코딩**을 받는데, 텍스트라면 거의 항상 `io.encodings.utf8`의 [`utf8`][utf8]을 써요.

## 읽기

```
file-contents   ( path encoding -- str )
file-lines      ( path encoding -- seq )
```

`file-contents`는 파일 전체를 하나의 문자열로 반환해요. `file-lines`는 줄 바꿈을 뺀 각 줄을 배열로 반환해요.

## 쓰기

```
set-file-contents   ( str path encoding -- )
set-file-lines      ( seq path encoding -- )
```

둘 다 파일을 대체하고, 파일이 없으면 새로 만들어요. `set-file-lines`는 한 줄에 원소 하나씩 쓰면서 줄 바꿈도 알아서 넣어줘요.

## 이어 쓰기와 증분 입출력

`with-…` 컴비네이터는 파일을 열어 쿼테이션의 주변 스트림으로 삼고, 끝나면 닫아요. `channel-chatter`의 스트림 컴비네이터와 같은 소멸자 스코프예요.

```
with-file-reader     ( path encoding quot -- )
with-file-writer     ( path encoding quot -- )
with-file-appender   ( path encoding quot -- )
```

```factor
USING: io io.encodings.utf8 io.files ;

"log.txt" utf8 [ "another line" print ] with-file-appender
```

[io.files]: https://docs.factorcode.org/content/vocab-io.files.html
[utf8]: https://docs.factorcode.org/content/vocab-io.encodings.utf8.html
