# Tippek

## 1. Egyedi típusok definiálása

Az absztrakt típusokról és a típusöröklésről az [Összetett típusok][composite] fogalomnál volt szó.

## 2. Kérd le a kisállat nevét

- Ez a kutyáknál és a macskáknál triviális, de a fallback metódusok tesztjeihez hasznos.

## 3. Definiáld, mi történik, amikor a macskák és a kutyák találkoznak

- Hány kombinációja van a macska/kutya találkozásoknak?
- Ne feledd, hogy ha egy macska találkozik egy kutyával, az másképp reagál, mint ha egy kutya találkozik egy macskával.
- Az első argumentum válaszára van szükségünk: `a` a `meet(a, b)` hívásban.

## 4. Definiálj egy találkozást két entitás között

- A visszatérési érték hosszabb string, mint a `meet()` esetében.
- Az `encounter()`-hez csak egyetlen metódust használj.
- A [string-interpoláció][interpolation] a barátod, amikor a visszatérési értéket állítod össze.

## 5. Definiálj fallback reakciót a kisállatok közötti találkozásokra

- A második argumentum most egy `Pet`, ami nem `Cat` vagy `Dog`, ezért adj hozzá egy `meet` metódust.
- Kétféleképpen érheted el ezt: deklarálhatsz absztrakt paramétertípusokat, vagy paraméteres metódusokkal szoríthatod meg őket.

## 6. Definiálj fallbacket, ha a kisállat olyasmivel találkozik, amit nem ismer

- A második argumentum most bármi lehet.

## 7. Definiálj egy általános fallbacket

- Most már mindkét argumentum bármi lehet.
- A feladat végére 7 metódusod lesz a `meet`-hez.

[composite]: https://exercism.org/tracks/julia/concepts/composite-types
[interpolation]: https://docs.julialang.org/en/v1/manual/strings/#string-interpolation
