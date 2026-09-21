# Bevezetés

## Metódustúlterhelés

A _metódustúlterhelés_ lehetővé teszi, hogy ugyanabban az osztályban több metódusnak ugyanaz legyen a neve. A túlterhelt metódusoknak különbözniük kell egymástól vagy:

- a paraméterek számában
- a paraméterek típusában

A visszatérési típus alapján nincs metódustúlterhelés.

A fordító automatikusan kikövetkezteti, hogy melyik túlterhelt metódust kell hívni a paraméterek száma és típusa alapján.

## Nevesített argumentumok

Eddig azt láttuk, hogy a metódusnak átadott argumentumok a metódus deklarált paramétereivel pozíció alapján párosulnak. Egy másik megközelítés, különösen amikor egy rutin nagy számú argumentumot vesz át, hogy a hívó a deklarált paraméter azonosítójának megadásával párosíthatja az argumentumokat.

Az alábbi példa szemlélteti a szintaxist:

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## Opcionális paraméterek

Egy metódusparaméter opcionálissá tehető, ha alapértelmezett értéket rendelünk hozzá. Egy opcionális paraméterekkel rendelkező metódus hívásakor a hívónak nem kell értéket átadnia ezeknek a paramétereknek. Ha egy opcionális paraméterhez nem adunk át értéket, az alapértelmezett értékét használja.

Az opcionális paramétereknek a paraméterlista végén _kell_ lenniük; utánuk nem állhat nem opcionális paraméter.

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
