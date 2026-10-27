# پیوست دستورالعمل

## لنز در Roc

در این تمرین، تست‌ها بررسی می‌کنند که کد شما بتواند بخش‌های تودرتوی مختلفی از رکورد تودرتوی زیر را تغییر دهد:

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
