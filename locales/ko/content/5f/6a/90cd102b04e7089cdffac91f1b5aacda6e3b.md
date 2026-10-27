# 지시 사항 부록

## Roc에서의 렌즈

이 연습 문제에서 테스트는 코드가 다음 중첩 레코드의 여러 중첩된 부분을 잘 수정할 수 있는지 확인해요:

```roc
test_person : Person
test_person = {
	name: { forenames: "Jane Joanna", surname: "Doe" },
	birth: {
		born_at: { street: "Longway", house_number: 1024, place: "Springfield", country: "United States" },
		born_on: { year: 1984, month: 4, day: 12 },
	},
	address: { street: "Shortlane", house_number: 2, place: "Fallmeadow", country: "Canada" },
}
```
