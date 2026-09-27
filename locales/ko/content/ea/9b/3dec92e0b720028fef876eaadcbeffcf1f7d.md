# 소개

Factor에서 *스트림*은 바이트를 읽어 들이거나 바이트를 써 내보낼 수 있는 모든 것을 말해요. 파일, 소켓, 메모리 내 버퍼, 직접 만든 커스텀 래퍼까지 모두 [`io`][io]가 제공하는 작은 [프로토콜][stream-protocol] 하나를 함께 따라요.

이 프로토콜은 두 개의 믹스인으로 이루어져 있어요. 읽어 들이는 대상에는 `input-stream`, 써 내보내는 대상에는 `output-stream`이에요. 클래스는 `INSTANCE: <class> input-stream`으로 둘 중 하나(또는 둘 다)에 참여해요.

## 읽기와 쓰기

```
stream-read1         ( stream -- elt/f )
stream-read          ( n stream -- seq/f )
stream-write1        ( elt stream -- )
stream-write         ( seq stream -- )
stream-flush         ( stream -- )
stream-element-type  ( stream -- type )
```

`stream-read1`은 다음 바이트를 반환해요(스트림의 끝에서는 `f`). `stream-read`는 최대 `n`바이트를 읽어요. `stream-write1`과 `stream-write`는 출력 쪽에서 같은 역할을 해요. `stream-flush`는 버퍼에 쌓인 출력을 밀어내요. `stream-element-type`은 스트림이 원시 바이트(`+byte+`)를 다루는지 문자(`+character+`)를 다루는지 알려줘요.

## `disposable`로 정리하기

스트림은 OS 리소스를 붙들고 있어서, 이 프로토콜은 [`destructors`][destructors] 보캐뷸러리와 짝을 이뤄요. 커스텀 스트림은 `disposable` 부모 클래스를 확장해요.

```factor
! DOCTEST: SKIP   (illustrative class definition; no runnable assertion)
USING: accessors destructors io kernel ;

TUPLE: my-stream < disposable underlying ;
INSTANCE: my-stream output-stream

: <my-stream> ( underlying -- s )
    my-stream new-disposable swap >>underlying ;

M: my-stream dispose* underlying>> dispose ;
```

`destructors`에 있는 `new-disposable`이 팩토리예요. 튜플을 할당하고 소멸자 프레임워크에 등록해서, 예외가 생겨도 리소스가 새지 않게 해줘요. `M: <class> dispose*`는 *어떻게* 정리할지를 정의해요. 사용자 코드는 공개 워드인 `dispose`를 호출하는데, 이건 객체를 폐기된 것으로 표시한 다음 `dispose*`를 실행해요.

## 스코프 안에서 사용하기

`with-disposal`, `with-input-stream`, `with-output-stream`은 리소스를 열어 둔 채 쿼테이션을 실행하고, 빠져나올 때 리소스를 폐기해요.

```factor
USING: io io.streams.string ;

"hello" <string-reader> [ read-contents . ] with-input-stream
! => "hello"   (the reader is disposed before this line returns)
```

[io]: https://docs.factorcode.org/content/vocab-io.html
[destructors]: https://docs.factorcode.org/content/vocab-destructors.html
[stream-protocol]: https://docs.factorcode.org/content/article-stream-protocol.html
