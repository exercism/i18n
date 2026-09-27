# 시 동아리 출입 정책

## 스토리

마을에 새로 시 동아리가 문을 열었어요. 한번 가볼까 생각 중이죠. 그런데 예전에 몇 번 탈이 있었던 탓에, 이 동아리는 아주 까다로운 출입 정책을 두고 있어요. 들어가려면 먼저 이 정책을 완벽하게 익혀야 해요.

시 동아리에는 문이 두 개 있고, 둘 다 문지기가 지키고 있어요. 들어가려면 그날의 암호를 알아내야 해요.

### 정문

1. 문지기가 시를 한 줄씩 읊어요.
   - 그럼 그 줄에 맞는 알파벳으로 대답해야 해요.
2. 문지기가 대답한 알파벳을 한꺼번에 알려줘요.
   - 알파벳들을 첫 글자가 대문자인 한 단어로 만들어야 해요.

예를 들어, 동아리가 아끼는 작가 중 한 명인 Michael Lockwood는 다음과 같은 _아크로스틱_ 시를 썼어요. 각 문장의 첫 글자를 모으면 하나의 단어가 되는 형식이에요.

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

문지기가 **Stands so high**를 읊으면 **S**라고 대답하고, **Huge hooves too**를 읊으면 **H**라고 대답해요.

마지막으로 적어 내는 암호는 `Shire`이고, 그러면 들어갈 수 있어요.

### 뒷문

동아리 뒤쪽에는 가장 유명한 시인들이 모여 있어요. VIP 구역 같은 곳이죠. 아무나 갈 수 있는 곳이 아니다 보니, 뒷문 절차는 조금 더 복잡해요.

1. 문지기가 시를 한 줄씩 읊어요.
   - 그럼 그 줄에 맞는 알파벳으로 대답해야 해요.
2. 문지기가 대답한 알파벳을 한꺼번에 알려주는데, _때로는 문장마다 뒤에 공백이 있기도 해요_:
   - 알파벳들을 첫 글자가 대문자인 한 단어로 만들고
   - `, please`를 붙여서 정중하게 부탁해야 해요.

예를 들어, 앞에서 언급한 시는 _텔레스틱_이기도 해요. 각 문장의 마지막 글자를 모으면 하나의 단어가 되는 형식이에요.

```text
Stands so high
Huge hooves too
Impatiently waits for
Reins and harness
Eager to leave
```

문지기가 **Stands so high**를 읊으면 **h**라고 대답하고, **Huge hooves too**를 읊으면 **o**라고 대답해요.

마지막으로 적어 내는 암호는 `Horse, please`이고, 그러면 유명한 시인들과 함께 파티를 즐길 수 있어요.

## 구현

- [JavaScript: strings][implementation-javascript] (참조 구현)
- [Swift: string-components][implementation-swift]

## 참고

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-javascript]: https://github.com/exercism/javascript/blob/main/exercises/concept/strings/.docs/instructions.md
[implementation-swift]: https://github.com/exercism/swift/blob/main/exercises/concept/poetry-club/.docs/instructions.md
