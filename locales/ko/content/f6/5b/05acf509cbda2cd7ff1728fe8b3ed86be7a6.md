# 지침

간단한 수학 문장제 문제를 분석해서 계산하고, 정답을 정수로 반환해요.

## 0단계: 숫자

연산이 없는 문제는 주어진 숫자가 그대로 답이 돼요.

> What is 5?

결과는 5예요.

## 1단계: 덧셈

두 수를 더해요.

> What is 5 plus 13?

결과는 18이에요.

큰 수와 음수도 처리할 수 있어야 해요.

## 2단계: 뺄셈, 곱셈, 나눗셈

이제 나머지 세 가지 연산을 해봐요.

> What is 7 minus 5?

2

> What is 6 multiplied by 4?

24

> What is 25 divided by 5?

5

## 3단계: 여러 연산

여러 연산을 순서대로 처리해요.

이 문제들은 말로 된 문장제이므로, _일반적인 연산 순서는 무시하고_ 식을 왼쪽에서 오른쪽으로 계산해요.

> What is 5 plus 13 plus 6?

24

> What is 3 plus 2 multiplied by 3?

15  (즉, 9가 아니에요)

## 4단계: 오류

파서는 다음을 거부해야 해요:

* 지원하지 않는 연산 ("What is 52 cubed?")
* 수학이 아닌 질문 ("Who is the President of the United States")
* 문법이 잘못된 문장제 문제 ("What is 1 plus plus 2?")

## 보너스: 거듭제곱

원한다면 거듭제곱도 처리해봐요.

> What is 2 raised to the 5th power?

32
