# निर्देशों का परिशिष्ट

## Roc में लेंस

इस अभ्यास में, टेस्ट यह जाँचेंगे कि आपका कोड नीचे दिए गए नेस्टेड रिकॉर्ड के अलग-अलग नेस्टेड हिस्सों को बदल पाता है या नहीं:

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
