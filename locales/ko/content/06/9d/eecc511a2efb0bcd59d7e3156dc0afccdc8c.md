# 지침 추가

## 힌트

`diamond` 함수를 구현해야 해요. 이 함수는 `A`에서 시작하고, 가장 넓은 지점에 주어진 문자가 오는 다이아몬드를 출력해요. 타입이 확실하지 않다면 제공된 시그니처를 사용해도 되지만, 그것 때문에 창의성을 제한하지는 마세요:

```haskell
diamond :: Char -> Maybe [String]
```

이 연습 문제는 텍스트 데이터를 다뤄요. 역사적인 이유로 Haskell의 `String` 타입은 문자들의 리스트인 `[Char]`와 같은 의미예요. 텍스트 데이터를 더 효율적으로 다루려면 `Text` 타입을 사용할 수 있어요.

이 연습 문제의 선택적 확장으로, 다음을 해볼 수 있어요.

- Haskell의 [문자열 타입](https://haskell-lang.org/tutorial/string-types)에 대해 읽어봐요.
- package.yaml의 의존성 목록에 `- text`를 추가해요.
- [다음 방식](https://hackernoon.com/4-steps-to-a-better-imports-list-in-haskell-43a3d868273c)으로 `Data.Text`를 임포트해요:

```haskell
import qualified Data.Text as T
import           Data.Text (Text)
```

- 이제 예를 들어 `diamond :: Char -> Maybe [Text]`처럼 작성하고, `Data.Text`의 함수를 `T.pack`처럼 참조할 수 있어요,
- [`Data.Text`](https://hackage.haskell.org/package/text/docs/Data-Text.html) 문서를 찾아봐요,
- 그런 다음 Diamond.hs에서 `String`이 나오는 곳을 모두 `Text`로 바꾸면 돼요:

```haskell
diamond :: Char -> Maybe [Text]
```

이 부분은 전적으로 선택 사항이에요.
