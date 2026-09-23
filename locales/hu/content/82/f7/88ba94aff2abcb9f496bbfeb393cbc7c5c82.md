# Frissítés

Időről időre szükség lehet rá, hogy valamit frissíts.

## Pharo Image

Ha frissíteni szeretnéd a Pharo Exercism image-ben található könyvtárakat, akkor a legjobb, ha előbb beküldöd a folyamatban lévő feladataidat, elmented az image-edet, majd biztonsági másolatot készítesz a Pharo.image és a Pharo.changes fájlról. Amint megvan a biztonságos másolat, értékeld ki (jelöld ki, majd nyomd meg a meta-g-t) az alábbi kódot egy Playgroundban:

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

Előfordulhat, hogy figyelmeztetnek, hogy elveszíted az „ExercismTools” csomag módosításait; ilyenkor válaszd a „Load” lehetőséget, hogy biztosan kompatibilis verziójú eszközökkel dolgozz.

Ha valaha egy konkrét Exercism-verzióra szeretnél frissíteni (vagy visszalépni), a fenti szkriptet módosítva is megadhatsz egy adott verziószámot, mégpedig úgy, hogy a repository útvonalát a következőképpen változtatod meg:

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Ahol a `<versison-tag>` valami ilyesmit jelenthet: `v0.2.3` vagy `master`.

Miután betöltöttél egy adott verziót, előfordulhat, hogy „újra le kell töltened” azokat a meglévő feladatokat, amelyeken tovább szeretnél dolgozni, a szokásos `Exercism | Fetch...` menüpont használatával.

Ritka esetekben (és ha továbbra is problémáid vannak) szükség lehet egy friss Pharo.image fájlra (a legegyszerűbb megoldás, ha egy új könyvtárban újratelepíted a Pharo-t, az oldal tetején található szokásos telepítési útmutatót követve).

## Pharo-feladatok

Néha azzal is szembesülhetsz, hogy egy feladatot frissítettek, mert új teszteket adtak hozzá, vagy új meglátásokat tükröz, miután már megoldottad.

Ilyen esetekben frissítheted a feladat saját példányodat a legújabb verzióra, ami azt jelenti, hogy lehet, módosítanod kell a megoldásodon, hogy a tesztek átmenjenek, majd be is küldheted az új kódodat további áttekintésre.

Ezt az `Exercism | View Track Progress` menü használatával teheted meg, amely egy webböngészőben megnyitja az aktuális kurzushaladásodat. A `Test suite` lapon, az oldal alján található egy `Update exercise to latest version` gomb, ha újabb feladatverziót észlelt a rendszer.

Ha erre a gombra kattintasz, majd a `Copy` gombra is (a „Download your solution” mezőben), akkor ezt az értéket beillesztheted az `Exercism | Fetch new exercise` menü beviteli mezőjébe.

_MEGJEGYZÉS: a 0.2.8-as verziótól kezdve a Pharo Exercism-ben a feladatcsomagok formátuma megváltozott, így a feladatok egy Exercise@<Name> nevű legfelső szintű csomagban jelennek meg (a korábbi Exercism-<Name> nevű tag-csomag helyett). Ha frissíted az image-edet, és vannak régi feladataid, amelyek ebben a korábbi csomagnevezési formátumban jelennek meg, azokat továbbra is be tudod küldeni, de ha a feladat tesztjét is frissíted, át kell mozgatnod a megoldásosztályaidat az új Exercise@<Name> csomagba, ahol az új teszt található._
