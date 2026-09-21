# Utasítások

Ebben a feladatban egy ablakkezelésre épülő számítógépes rendszert szimulálsz.
Létrehozol néhány ablakot, amelyeket mozgatni és átméretezni lehet.
A következő ábra szemlélteti azokat az értékeket, amelyekkel az alábbiakban dolgozni fogsz.

```text
                  <--------------------- screenSize.width --------------------->

       ^          ┌────────────────────────────────────────────────────────────┐
       |          │                                                            │
       |          │         position.x, _                                      │
       |          │         position.y   \                                     │
       |          │                       \<----- size.width ----->            │
       |          │                 ^      *──────────────────────┐            │
       |          │                 |      │        title         │            │
       |          │                 |      ├──────────────────────┤            │
screenSize.height │                 |      │                      │            │
       |          │            size.height │                      │            │
       |          │                 |      │       contents       │            │
       |          │                 |      │                      │            │
       |          │                 |      │                      │            │
       |          │                 v      └──────────────────────┘            │
       |          │                                                            │
       |          │                                                            │
       v          └────────────────────────────────────────────────────────────┘
```

📣 Hogy gyakorolhasd a JavaScript széles körű ismereteit, **próbáld meg az 1. és 2. részfeladatot prototípus-szintaxissal, a többi részfeladatot pedig class szintaxissal megoldani**.

## 1. Definiáld a Size-t az ablak méreteinek tárolására

Definiálj egy `Size` nevű osztályt (konstruktorfüggvényt).
Két mezője legyen, `width` és `height`, amelyek az ablak aktuális méreteit tárolják.
A konstruktorfüggvény fogadjon el kezdőértékeket ezekhez a mezőkhöz.
A szélességet első paraméterként, a magasságot pedig másodikként kapja.
Az alapértelmezett szélesség és magasság `80`, illetve `60` legyen.

Ezenfelül definiálj egy `resize(newWidth, newHeight)` metódust, amely új szélességet és magasságot vesz át paraméterként, majd úgy módosítja a mezőket, hogy tükrözzék az új méretet.

```javascript
const size = new Size(1080, 764);
size.width;
// => 1080
size.height;
// => 764

size.resize(1920, 1080);
size.width;
// => 1920
size.height;
// => 1080
```

## 2. Definiáld a Position-t egy ablak pozíciójának tárolására

Definiálj egy `Position` nevű osztályt (konstruktorfüggvényt) két mezővel, `x` és `y`, amelyek az ablak bal felső sarkának aktuális vízszintes és függőleges pozícióját tárolják.
A konstruktorfüggvény fogadjon el kezdőértékeket ezekhez a mezőkhöz.
Az `x` értékét első paraméterként, az `y` értékét pedig másodikként kapja.
Mindkét mező alapértelmezett értéke `0` legyen.

A (0, 0) pozíció a képernyő bal felső sarka; az `x` értéke jobbra haladva nő, az `y` értéke pedig lefelé haladva nő.

Definiálj egy `move(newX, newY)` metódust is, amely új x és y paramétereket vesz át, és úgy módosítja a tulajdonságokat, hogy tükrözzék az új pozíciót.

```javascript
const point = new Position();
point.x;
// => 0
point.y;
// => 0

point.move(100, 200);
point.x;
// => 100
point.y;
// => 200
```

## 3. Definiáld a ProgramWindow osztályt

Definiálj egy `ProgramWindow` osztályt a következő mezőkkel:

- `screenSize`: egy rögzített `Size` típusú értéket tárol, amelynek `width` értéke 800, `height` értéke pedig 600
- `size`: egy `Size` típusú értéket tárol, kezdőértéke a `Size` példány alapértelmezett értéke
- `position`: egy `Position` típusú értéket tárol, kezdőértéke a `Position` példány alapértelmezett értéke

Amikor az ablak megnyílik (létrejön), a kezdetekor mindig az alapértelmezett mérettel és pozícióval rendelkezik.

```javascript
const programWindow = new ProgramWindow();
programWindow.screenSize.width;
// => 800

// Similar for the other fields.
```

Megjegyzés: a `ProgramWindow` nevet a `Window` helyett használjuk, hogy megkülönböztessük az osztályt a böngészőkörnyezetekben létező beépített `Window` osztálytól.

## 4. Adj hozzá egy metódust az ablak átméretezéséhez

A `ProgramWindow` osztálynak tartalmaznia kell egy `resize` metódust.
Ez egy `Size` típusú paramétert vesz át bemenetként, és megpróbálja az ablakot a megadott méretre átméretezni.

Az új méret azonban nem léphet túl bizonyos korlátokat.

- A megengedett legkisebb magasság vagy szélesség 1.
  Az 1-nél kisebb kért magasságokat vagy szélességeket 1-re vágjuk le.
- A legnagyobb magasság és szélesség az ablak aktuális pozíciójától függ, és az ablak szélei nem léphetnek túl a képernyő szélein.
  A korlátoknál nagyobb értékeket a lehető legnagyobb méretre vágjuk le.
  Például ha az ablak pozíciója `x` = 400, `y` = 300, és egy `height` = 400, `width` = 300 méretre történő átméretezést kérsz, az ablak `height` = 300, `width` = 300 méretre lesz átméretezve, mivel a képernyő az `y` irányban nem elég nagy ahhoz, hogy a kérést teljesen befogadja.

```javascript
const programWindow = new ProgramWindow();

const newSize = new Size(600, 400);
programWindow.resize(newSize);
programWindow.size.width;
// => 600
programWindow.size.height;
// => 400
```

## 5. Adj hozzá egy metódust az ablak mozgatásához

Az átméretezés funkción kívül a `ProgramWindow` osztálynak tartalmaznia kell egy `move` metódust is.
Ez egy `Position` típusú paramétert vesz át bemenetként.
A `move` metódus hasonlít a `resize` metódushoz, ez a metódus azonban az ablak _pozícióját_ állítja be a kért értékre a méret helyett.

Ahogy a `resize` esetében, az új pozíció sem léphet túl bizonyos korlátokat.

- A legkisebb pozíció `x` és `y` esetében is 0.
- A legnagyobb pozíció mindkét irányban az ablak aktuális méretétől függ.
  A szélek nem léphetnek túl a képernyő szélein.
  A korlátoknál nagyobb értékeket a lehető legnagyobb méretre vágjuk le.
  Például ha az ablak mérete `x` = 250, `y` = 100, és egy `x` = 600, `y` = 200 pozícióra történő mozgatást kérsz, az ablak `x` = 550, `y` = 200 pozícióra kerül, mivel a képernyő az `x` irányban nem elég nagy ahhoz, hogy a kérést teljesen befogadja.

```javascript
const programWindow = new ProgramWindow();

const newPosition = new Position(50, 100);
programWindow.move(newPosition);
programWindow.position.x;
// => 50
programWindow.position.y;
// => 100
```

## 6. Módosíts egy programablakot

Valósíts meg egy `changeWindow` függvényt, amely egy `ProgramWindow` példányt vesz át bemenetként, és az ablakot a megadott méretre és pozícióra változtatja.
A függvény a módosítások alkalmazása után adja vissza a kapott `ProgramWindow` példányt.

Az ablak szélessége 400, magassága 300 legyen, és az x = 100, y = 150 pozícióba kerüljön.

```javascript
const programWindow = new ProgramWindow();
changeWindow(programWindow);
programWindow.size.width;
// => 400

// Similar for the other fields.
```
