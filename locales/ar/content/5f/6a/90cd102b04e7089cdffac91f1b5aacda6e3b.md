# ملحق التعليمات

## العدسات في Roc

في هذا التمرين، ستتحقق الاختبارات من أن الكود الخاص بك قادر على تعديل أجزاء متداخلة متنوعة من السجل المتداخل التالي:

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
