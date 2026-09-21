# A Wrenről

A Wren egy kicsi, gyors, osztályalapú, konkurens szkriptnyelv. Gondolj a Smalltalkra egy Lua méretű csomagban, egy csipetnyi Erlangel, ismerős, modern szintaxisba csomagolva.

- **Kicsi.** A VM kevesebb mint 4000 pontosvesszőnyi olvasható, szeretettel kommentelt C.

- **Gyors.** Egy okos, egymenetes fordító tömör, hatékony bytecode-ot állít elő.

- **Osztályalapú.** Az osztályok és az objektumok állnak a középpontban.

- **Konkurens.** Könnyűsúlyú fiberek épültek be a nyelvbe.

- **Szkriptnyelv.** Beágyazható, nincsenek függőségei, kicsi a szabványos könyvtára, és könnyen használható a C API-ja.


### A VM

A Wren szíve a VM. A Wren virtuális gép a nyelv magja, és minden Wren-forráskódot végrehajt. Ez csupán egy könyvtár, nem önálló alkalmazás. Úgy tervezték, hogy egy nagyobb gazdaalkalmazásba ágyazható legyen.

A Wren többek között az alábbi projektekbe ágyazva bukkan fel:

* [TIC-80](https://tic80.com) - egy fantasy számítógép apró játékok készítéséhez, játékához és megosztásához (a PICO8-hoz hasonlóan).
* [DOME](https://domeengine.com) - egy többplatformos keretrendszer játékok készítéséhez.
* [luxe](https://luxeengine.com) - egy többplatformos, gyors fejlesztésű játékmotor játékok készítéséhez.
* [Wren Console][wren-console] - egy Wren REPL és CLI, nagyrészt magában a Wrenben megírva.

A Wrent akár a saját projektjeidbe is beágyazhatod. Az Exercismnél a használt gazdaalkalmazás a [Wren Console][wren-console] lesz, amivel a terminálból futtathatjuk és tesztelhetjük a Wren-szkriptjeinket.


### Miért a Wren?

A Wrent eredetileg [Bob Nystrom](http://journal.stuffwithstuff.com) alkotta meg, aki a [Crafting Interpreters](http://craftinginterpreters.com) című könyvéről híres. Több nyelv is van a háta mögött, de pontosan elmagyarázza, mi vezetett a Wren megalkotásához:

> Van néhány szkriptnyelv, amit alkalmazásokba való beágyazásra használnak. A fő ezek közül a Lua. Régebben a TCL volt az. Ott van még a Guile, egyre inkább a JavaScript, és néhány alkalmazás Pythont ágyaz be. Ex-játékfejlesztő vagyok, úgyhogy amikor a „szkriptelésre” gondolok, hajlamos vagyok a „játék-szkriptelésre” gondolni.

> A Lua szép: kicsi, egyszerű és gyors. De, és ezt nem kritikaként mondom, furcsa is, ha olyan nyelvekhez szoktál, mint a C++ és a Java. A szintaxis más. A szemantika, különösen az objektummodell, szokatlan. Az 1-alapú indexeléshez bárki hozzászokik, de az olyan dolgok, mint a metatáblák, igazán megmutatják, hogy az objektumokat utólag csavarozták rá a Luára.

> Szerintem van helye egy olyan egyszerű nyelvnek, mint a Lua, amely viszont természetesnek hat valakinek, aki objektumorientált háttérrel rendelkezik. A Wren az én kísérletem erre.

### Kipróbálás

Gyorsan [ki is próbálhatod][try-it] a webböngésződben (anélkül, hogy bármit telepítened kellene). Ha egy csinos felületbe csomagolt Wrennel szeretnél kísérletezni, vess egy pillantást a [Wren Playground][wren-playground] oldalra.

[wren]: https://wren.io
[wren-console]: https://github.com/joshgoebel/wren-console
[wren-playground]: https://github.com/ninjascl/wren-playground
[try-it]: https://wren.io/try/
