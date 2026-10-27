# নির্দেশনার সংযোজন

## Roc-এ লেন্স

এই অনুশীলনীতে, টেস্টগুলো যাচাই করবে যে আপনার কোড নিচের নেস্টেড রেকর্ডটির বিভিন্ন নেস্টেড অংশ পরিবর্তন করতে পারে কি না:

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
