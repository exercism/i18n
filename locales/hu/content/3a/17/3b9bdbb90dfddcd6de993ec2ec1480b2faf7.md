# Bevezetés

## Szakkifejezések

Már néhány fogalom során használtál és írtál is C++ függvényeket.
Itt az ideje, hogy technikai részletekbe is belemenjünk.
Az alábbi kódrészlet a leggyakoribb szakkifejezéseket mutatja be, hogy könnyen visszakereshesd őket.
Mivel a C++ figyelmen kívül hagyja a szóközöket és a sortöréseket, a formázást úgy alakítottuk át, hogy minden elem egyetlen sorba kerüljön.

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
A deklaráció olyan, mint egy üzenet a fordítónak arról, hogy létezik egy függvény ezzel a névvel, visszatérési típussal és paraméterlistával.
A kód nem fog működni, ha hiányzik a definíció.
A deklarációk nem kötelezőek, akkor van rájuk szükség, ha a függvényt a definíciója előtt használod.
A deklarációk megoldhatnak olyan problémákat, mint a körkörös hivatkozások, és arra is használhatók, hogy elválasszák a felületet a megvalósítástól.
~~~~

## A `const` minősítő

Néha szeretnéd biztosítani, hogy az értékek a kezdőértékük megadása után ne változhassanak meg.
A C++ a `const` kulcsszót használja a konstansok minősítőjeként.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
A konstansokat gyakran _UPPER_SNAKE_CASE_ írásmóddal írják.
Ha nincs más megállapodás, érdemes ezt az írásmódot a makróknak fenntartani.
~~~~

Ha egy konstans változót a beállítása után megpróbálsz megváltoztatni, a kódod nem fog lefordulni.
Ez segít elkerülni a nem szándékolt változtatásokat, ugyanakkor optimalizálási lehetőségeket is nyit a fordító számára.
Emberként is könnyebb átlátni a kódot, ha tudod, hogy bizonyos részek nem változnak meg.

A `const` kulcsszó a függvényparaméterek minősítője is lehet.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

Amikor `const` referenciát adsz át a függvénynek, biztos lehetsz benne, hogy az változatlan marad.
Gyakran látsz majd `const` referenciákat olyan objektumoknál, amelyeket költséges lehet lemásolni, például a hosszabb stringeknél.
A `const` minősítő harmadik felhasználási esete az olyan tagfüggvények, amelyek nem változtatják meg az osztály egy példányát.

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

A `Stubborn` osztály `answer` tagfüggvénye `const string&` referenciát használ paraméterként.
Így elkerülhető az átadott eredeti objektum lemásolása.

## A függvények túlterhelése

Több függvénynek is lehet ugyanaz a neve, ha a paraméterlistájuk eltér.
Ezt nevezik a függvények túlterhelésének, és általában akkor alkalmazzák, ha ezek a függvények nagyon hasonló feladatokat látnak el.

A függvény fejléce a visszatérési típus nélkül a függvény __típusszignatúrája__.
A típusszignatúra megváltozása új függvényt eredményez.

A `play_sound` példában hat különböző túlterhelés található, hogy különböző eseteket lehessen lefedni:

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
A típusszignatúrát a függvény neve, a paraméterek száma, típusuk és minősítőik határozzák meg (a nevük viszont nem).
A visszatérési típus kifejezetten nem része a típusszignatúrának, és fordítási hibát kapsz, ha két függvény csak a visszatérési típusában tér el.
A fordító hibát jelez, mert nem egyértelmű, hogy melyiket kell használni.
~~~~

## Alapértelmezett argumentumok

Egyes függvények nagyon hosszúak lehetnek, és a hívásaik közül sok ugyanazokat az értékeket használhatja a paraméterek többségéhez.
A hívásokban ismétlődő részeket alapértelmezett argumentumokkal lehet elkerülni.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

Mivel a függvény deklarációját gyakran a definíció előtt olvassák, érdemesebb ott megadni az alapértelmezett argumentumokat.
Ha egy paraméternek van alapértelmezett értéke, akkor a tőle jobbra álló összes paraméternek is kell lennie.
Néha a bonyolult függvénytúlterheléseket át lehet alakítani kevesebb függvénnyé alapértelmezett argumentumokkal, hogy javítsák a karbantarthatóságot.
