# Kiegészítés az utasításokhoz

## Lencsék a Rocban

Ebben a feladatban a tesztek azt ellenőrzik majd, hogy a kódod képes-e módosítani a következő egymásba ágyazott rekord különféle beágyazott részeit:

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
