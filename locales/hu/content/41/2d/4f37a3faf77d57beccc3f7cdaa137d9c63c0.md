# Utasítások

Elena egy újságüzemben az új minőségügyi vezető.
Mivel épp most érkezett a céghez, úgy döntött, hogy átnézi a gyár néhány folyamatát, hogy lássa, min lehetne javítani.
Felfedezte, hogy a technikusok rengeteg minőségellenőrzést végeznek kézzel. Úgy látja, jó lehetőség kínálkozik az automatizálásra, ezért megkér téged, egy szabadúszó fejlesztőt, hogy fejlessz egy szoftvert néhány gép felügyeletére.

## 1. Ellenőrizd a helyiség páratartalmát

Az első feladatod, hogy írj egy szoftvert, amely a gyártóterem páratartalmát felügyeli. A cég szoftveréhez már csatlakozik egy érzékelő, amely rendszeresen visszaadja a helyiség páratartalmát százalékban.

A szoftverben meg kell valósítanod egy függvényt, amely hibát dob, ha a páratartalom túl magas.
Ha a páratartalom elfogadható szinten van, egy Info naplóbejegyzés kerül hozzáadásra.
A függvény neve `humiditycheck` legyen, és argumentumként a páratartalmat kapja meg.

Ha a százalék meghaladja a 70%-ot, állj le egy ErrorException hibával (a pontos üzenet nem fontos, de tartalmaznia kell a mért páratartalmat).
Egyébként adj hozzá egy Info naplóbejegyzést a `"humidity level check passed: h%"` üzenettel, ahol a `h` a páratartalom százaléka.

```julia-repl
julia> humiditycheck(60)
[ Info: humidity level check passed: 60%
```

```julia-repl
julia> humiditycheck(100)
ERROR: humidity check failed: 100%
```

## 2. Ellenőrizd a túlmelegedést

Elena nagyon elégedett az első feladatoddal, és megkér, hogy foglalkozz a gépek hőmérsékletének felügyeletével.
Miközben egy technikussal, Greggel beszélgetsz, megtudod, hogy ha egy gép hőmérséklete meghaladja az 500 °C-ot, a technikusok aggódni kezdenek a túlmelegedés miatt.

A gépet egy érzékelővel szerelték fel, amely a belső hőmérsékletét méri.
Tudd, hogy az érzékelő nagyon érzékeny, és gyakran elromlik.
Ilyenkor a technikusoknak ki kell cserélniük.

A feladatod, hogy megvalósíts egy `temperaturecheck` függvényt, amely argumentumként a hőmérsékletet kapja, és vagy naplóbejegyzést ad hozzá, ha minden rendben van, vagy hibát dob, ha az érzékelő elromlott, illetve ha a gép túlmelegedni kezd.
Mivel később a hiba típusától függően másképp kell majd reagálnod, szükséged lesz egy mechanizmusra, amellyel meg tudod különböztetni a kétféle hibát.

- Ha az érzékelő elromlott, a hőmérséklet `nothing` lesz.
  Ebben az esetben állj le egy `ArgumentError` hibával (az üzenet nem fontos).
- Ha az érzékelő működik, és a hőmérséklet meghaladja az 500 °C-ot, dobj egy `DomainError` hibát, amely tartalmazza a mért hőmérsékletet.
- Egyébként minden rendben van, ezért adj hozzá egy Info naplóbejegyzést a `"temperature check passed: t °C"` üzenettel, ahol a `t` a hőmérséklet.

```julia-repl
julia> temperaturecheck(nothing)
ERROR: ArgumentError: sensor is broken

julia> temperaturecheck(800)
ERROR: DomainError with 800:
"overheating detected"

julia> temperaturecheck(500)
[ Info: temperature check passed: 500 °C
```

## 3. Definiálj egyéni hibát

A következő feladathoz definiálnod kell egy általánosabb, mindent elkapó hibát.
A megvalósítás részletei nem fontosak azon túl, hogy hiba legyen, és hogy a neve `MachineError` legyen.
Nyugodtan adhatsz hozzá mezőket és üzeneteket, ha az segít.

## 4. Felügyeld a gépet

Most, hogy a géped fel tudja ismerni a hibákat, és van egy egyéni `MachineError` hibád, hozzáadsz egy burkolófüggvényt, amely beszámol róla, hogy minden hogyan működik.
Amellett, hogy visszaadja a korábbi függvények naplóbejegyzéseit, ennek a burkolófüggvénynek a fellépő hiba típusától (típusaitól) függően további naplóbejegyzéseket is hozzá kell adnia.

- Ellenőrizd a páratartalmat és a hőmérsékletet.
- Ha a páratartalom-ellenőrzés `ErrorException` hibát dob, egy Error naplóbejegyzést kell hozzáadni a `"humidity level check failed: h%"` üzenettel, ahol a `h` a páratartalom százaléka.
- Ha a hőmérséklet-ellenőrzés `ArgumentError` hibát dob, egy Warn naplóbejegyzést kell hozzáadni a `"sensor is broken"` üzenettel.
- Ha a hőmérséklet-ellenőrzés `DomainError` hibát dob, egy Error naplóbejegyzést kell hozzáadni a `"overheating detected: t °C"` üzenettel, ahol a `t` a hőmérséklet.
- Ha az egyik vagy mindkét ellenőrzés sikertelen, a naplóbejegyzések hozzáadása után egyetlen `MachineError` hibát kell dobni.
- Ha minden rendben van, csak a `humiditycheck` és a `temperaturecheck` naplóbejegyzései kerülnek hozzáadásra.

Valósítsd meg a `machinemonitor()` függvényt, amely argumentumként a páratartalmat és a hőmérsékletet kapja.

```julia-repl
julia> machinemonitor(42, 450)
[ Info: humidity level check passed: 42%
[ Info: temperature check passed: 450 °C

julia> machinemonitor(42, 550)
[ Info: humidity level check passed: 42%
┌ Error: overheating detected: 550 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(82, 521)
┌ Error: humidity level check failed: 82%
└ @ Main # output truncated
┌ Error: overheating detected: 521 °C
└ @ Main # output truncated

Error: MachineError

julia> machinemonitor(42, nothing)
[ Info: humidity level check passed: 42%
┌ Warning: sensor is broken
└ @ Main # output truncated

Error: MachineError
```
