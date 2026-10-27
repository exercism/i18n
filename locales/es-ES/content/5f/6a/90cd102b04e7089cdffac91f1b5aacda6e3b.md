# Apéndice de instrucciones

## Lentes en Roc

En este ejercicio, los tests comprobarán que tu código es capaz de modificar diversas partes anidadas del siguiente registro anidado:

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
