# Bevezetés

## Osztályok

Eljött az idő, hogy megismerkedjünk a C++ egyik alappillérével: az objektumorientált programozással (OOP).
Az OOP középpontjában a `classes` állnak: ezek felhasználó által definiált adattípusok, amelyeknek saját, összetartozó függvényeik vannak.
Az alapokkal kezdjük, a haladóbb témákra pedig a tanterv további szintjein térünk majd rá.

### Tagok

Az osztályoknak lehetnek **tagváltozóik** és **tagfüggvényeik**.
Ezeket a `.` **tagkiválasztó** operátorral éred el.
Ahogy az `classes`-en kívüli változóknál is szokás, érdemes a tagváltozókat már a deklarációkor értékkel inicializálni.
Ez az érték lesz aztán az adott osztály újonnan létrehozott objektumainak az alapértelmezett értéke.

### Egységbezárás és információelrejtés

Az osztályok lehetővé teszik, hogy korlátozd a tagjaik elérését.
A két alapvető `access specifiers` a `private` és a `public`.
A `private` tagok az osztályon kívülről nem érhetők el.
A `public` tagok szabadon elérhetők.
Egy `class` minden tagja alapértelmezés szerint `private`.
Csak azok a tagok használhatók szabadon az osztályon kívül, amelyeket kifejezetten `public`-ként jelöltél meg.

### Alapvető példa

Az alábbi példában egy `class` definícióját láthatod.
Figyeld meg a definíció után álló `;`-t:

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

Az osztályon belülről minden tagváltozóhoz hozzáférsz.
Nézd meg a `damage`-t a `cast_spell` függvényen belül!
Az osztályon kívülről viszont a `private` tagokat sem olvasni, sem módosítani nem tudod:

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### Konstruktorok

A konstruktorok lehetővé teszik, hogy már az objektum létrehozásakor értéket adj a tagváltozóknak.
Nevük megegyezik a `class` nevével, és nincs visszatérési típusuk.
Egy osztálynak több konstruktora is lehet.
Ez akkor hasznos, ha nem mindig kell az összes változót beállítanod.
Néha lehet, hogy mindent az alapértelmezett értéken szeretnél hagyni, és csak a `name` változót módosítanád.
Egy jelentős varázsló esetében viszont a sebzést is módosítanád, ezért két `constructors`-ra lesz szükséged.

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

A konstruktorok nagy téma, sok apró részlettel.
Ha nem definiálsz kifejezetten `constructor`-t a `class`-hez, akkor (és csakis akkor) a fordító elvégzi helyetted a munkát.
Ez történt a fenti első példában is.
A _silverhand_ objektum az alapértelmezett konstruktor meghívásával jön létre, argumentumok átadása nélkül.
Minden változó azt az értéket kapja, amelyet az osztály definíciójában megadtál.
Ha a definícióban nem adtál volna meg értékeket, előfordulhat, hogy a változók inicializálatlanok maradnak, aminek nem várt következményei lehetnek.

~~~~exercism/note
## Struktúrák

A struktúrák a nyelv eredeti, C-ből származó gyökereiből erednek, és ugyanolyan régi, mint maga a C++.
Lényegében ugyanazok, mint a `classes`, egy fontos kivétellel.
Egy `class`-ben alapértelmezés szerint minden `private`.
A struktúrák viszont mindaddig `public`-ok, amíg másként nem rendelkezel.
A megszokás szerint a `struct` kulcsszót gyakran **csak adatot tároló struktúrákra** használjuk.
A `class` kulcsszót viszont olyan objektumoknál részesítjük előnyben, amelyeknek bizonyos tulajdonságokat garantálniuk kell.
Ilyen invariáns lehet például az, hogy a `Wizard` `class` `damage` értéke nem válhat negatívvá.
A `damage` változó privát, és minden függvény, amely a sebzést módosítja, gondoskodna arról, hogy az invariáns megmaradjon.
~~~~
