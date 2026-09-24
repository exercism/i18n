# Ексцентричний робот для вечірок

## Історія

Колись жив собі ексцентричний програміст у дивному будинку з ґратами на вікнах. Якось він узяв замовлення з онлайн-дошки вакансій — збудувати робота для вечірок. Робот мав вітати людей і проводжати їх до їхніх місць. Перше доповнення було дуже технічним і виказувало брак навичок спілкування з людьми у програміста. Деякі з тих рис також потрапили до фінальної версії.

## Завдання

- Вітати кожну людину так:

```
Welcome to my party, <name>!
```

- Гостя, у якого сьогодні день народження, вітають так, щоб похвалитися обізнаністю робота про кожного гостя:

```
Happy birthday <name>! You are now <age> years old!
Welcome to my party!
```

- Тому, хто запитає про своє місце, робот підказує дорогу до столика так:

```
Welcome to my party, <name>!
You have been assigned to table <table-number-in-hex>. Your table is <direction>, exactly <distance-float> meters from here.
You will be sitting next to <neighbour-name>!
```

## Реалізації

- [Go: strings][implementation-go] (еталонна реалізація)

## Довідка

- [`types/string`][types-string]

[types-string]: https://github.com/exercism/v3/blob/main/reference/types/string.md
[implementation-go]: https://github.com/exercism/go/blob/main/exercises/concept/strings/.docs/instructions.md
