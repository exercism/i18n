# 조건문

```sather
   if score >= 5 then
      return "Recalled";
   else
      return "Thank you";
   end;
```

`if`와 `then` 사이에 오는 질문은 반드시 `BOOL`이어야 해요. Sather는 그 자리에 숫자를 받아들이지 않아요. 그래서 0을 거짓으로 취급하는 C 스타일의 습관은 없어요.

## 형태

```sather
   if first_question then
      ...
   elsif second_question then
      ...
   elsif third_question then
      ...
   else
      ...
   end;
```

질문은 위에서 아래로 확인하고, 처음으로 참이라고 답한 질문이 이겨요. 그 아래에 있는 것은 살펴보지도 않고 건너뛰죠. 그래서 이어지는 조건은 가장 구체적인 검사에서 가장 포괄적인 검사 순서로 가야 해요. `score >= 5`를 `score >= 8`보다 위에 두면 두 번째 조건에는 절대 도달하지 못해요.

`else`는 선택 사항이에요. `elsif`는 필요한 만큼 여러 번 반복할 수 있어요.

## 조건문은 값이 아니라 문이에요

`if` 자체는 값을 내놓지 않아요. 그래서 다음은 Sather가 아니에요.

```sather
   -- wrong
   grade := if score > 5 then "pass" else "fail" end;
```

각 분기 안에서 값을 반환하거나, 각 분기 안에서 변수에 값을 할당해야 해요.

## 쓰지 말아야 할 때

질문에 답하는 루틴이라면 그 질문 자체를 반환해야 해요.

```sather
   -- say this
   old_enough(age : INT) : BOOL is
      return age >= 13;
   end;

   -- not this
   old_enough(age : INT) : BOOL is
      if age >= 13 then return true; else return false; end;
   end;
```

두 번째는 첫 번째가 이미 말하는 것 외에 아무것도 말하지 않으면서 길이는 세 배나 돼요.

## 중첩

`if` 안에 또 다른 `if`를 넣을 수 있어요. 하지만 꼭 그럴 필요는 없는 경우가 많죠. 둘 다 참이어야 하는 두 질문은 대신 `and`로 이어 붙일 수 있고, 그쪽이 더 읽기 좋아요.

```sather
   if score >= 8 and sings then
      return "Lead";
   end;
```
