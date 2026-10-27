# Προσθήκη οδηγιών

## Φακοί στη Roc

Σε αυτή την άσκηση, τα τεστ θα ελέγξουν ότι ο κώδικάς σου μπορεί να τροποποιήσει διάφορα εμφωλευμένα μέρη της παρακάτω εμφωλευμένης καταγραφής:

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
