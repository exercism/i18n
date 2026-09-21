# Tippek

## Általános

- Próbáld meg a problémát egy alapesetre és egy rekurzív esetre bontani. Tegyük fel például, hogy rekurzív módszerrel szeretnéd megszámolni, hány süti van a sütisdobozban. Az alapeset az üres doboz, abban nulla süti van. Ha a doboz nem üres, akkor a dobozban lévő sütik száma egy sütivel egyenlő, plusz a dobozban lévő sütik száma, miután kivettél egy sütit.

## 1. A pizzatípusok és az opciók meghatározása

- A `Pizza` típus rekurzív típus, amelynek `ExtraSauce` és `ExtraToppings` esetei egy `Pizza`-t tartalmaznak.

## 2. A pizza árának kiszámítása

- Ahhoz, hogy kezeld, hogy a `Pizza` típus rekurzív, definiálj egy rekurzív függvényt.

## 3. A rendelés árának kiszámítása

- A lista pontos hosszát mintaillesztéssel is megvizsgálhatod, hogy eldöntsd, alkalmazni kell-e a felárat.
- Használj farokrekurziót, hogy a rendelés árának kiszámításakor ne fogyjon túl sok memória.
