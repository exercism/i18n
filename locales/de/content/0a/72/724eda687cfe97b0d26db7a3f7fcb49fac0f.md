# Exzentrischer Partyroboter

## Story

Es war einmal ein exzentrischer Programmierer, der in einem seltsamen Haus mit vergitterten Fenstern wohnte. Eines Tages nahm er über eine Online-Jobbörse einen Auftrag an: Er sollte einen Partyroboter bauen. Der Roboter soll die Gäste begrüßen und ihnen zu ihren Plätzen verhelfen. Die erste Fassung war sehr technisch und verriet, dass es dem Programmierer an menschlicher Interaktion mangelte. Einiges davon schaffte es auch in die finale Edition.

## Tasks

- Begrüße jede Person mit:

```
Welcome to my party, <name>!
```

- Ein Gast, der heute Geburtstag hat, wird auf folgende Weise begrüßt, um zu zeigen, dass der Roboter über jeden Gast Bescheid weiß:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Wer nach seinem Platz fragt, bekommt den Weg zu seinem Tisch so beschrieben:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Implementations

- [Go: strings][implementation-go] (Referenzimplementierung)

## Reference

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
