# 힌트

## 일반

- `include`는 클래스 안에, 보통 첫 줄에 들어가요.
- 이름을 바꾸거나 빼놓은 것만 달라져요. 나머지는 모두 원래 그대로 들어와요.

## 1. 재즈 루틴

- 클래스 안에 한 줄: `include WARM_UP;`
- 그게 전부예요. 클래스 본문은 그 한 줄뿐이에요.

## 2. 탭 루틴

- `include WARM_UP describe -> ;`
- 화살표 뒤에 아무것도 없는 `-> ;`는 `describe`를 빼놓는데, 그래야 직접 작성한 것을 넣을 자리가 생겨요.
- 이걸 쓰지 않으면 컴파일러가 `describe`가 두 번 정의되었다고 알려줘요. 그 오류야말로 기능이에요. Sather는 조용히 하나를 골라주지 않아요.

## 3. 피날레

- 하나의 include에 두 항목을 쉼표로 구분해 넣어요: `include WARM_UP counts -> warm_up_counts, describe -> ;`
- 그다음 `warm_up_counts * 2`를 반환하는 `counts`와 `describe`를 작성해요.
- `describe`는 숫자를 다시 계산하지 말고 `counts`를 호출해야 해요.
- 숫자에는 문자열을 더할 수 없다는 점을 기억해요. 그래서 단어로 시작하는 설명은 괜찮아요: `"Finale: " + counts + " counts"`.
