# Utasítások

Valósítsd meg a `keep` és `discard` műveletet gyűjteményeken.
Adott egy gyűjtemény és a gyűjtemény elemeire vonatkozó predikátum: a `keep` egy új gyűjteményt ad vissza, amely azokat az elemeket tartalmazza, amelyekre a predikátum igaz, a `discard` pedig egy új gyűjteményt ad vissza, amely azokat az elemeket tartalmazza, amelyekre a predikátum hamis.

Például adott a következő számgyűjtemény:

- 1, 2, 3, 4, 5

És a predikátum:

- páros-e a szám?

Ekkor a keep műveletednek ezt kell eredményeznie:

- 2, 4

A discard műveletednek pedig ezt:

- 1, 3, 5

Figyeld meg, hogy a keep és a discard együttvéve az összes elemet lefedi.

Lehet, hogy a függvényeket `keep` és `discard` néven hívják, de az is lehet, hogy más nevet kell kapniuk, hogy ne ütközzenek a nyelvedben már létező függvényekkel vagy fogalmakkal.

## Megkötések

Ne nyúlj a szabványos könyvtáradban elérhető filter/reject/izé funkcióhoz!
Oldd meg inkább magad, más alapvető eszközökkel.
