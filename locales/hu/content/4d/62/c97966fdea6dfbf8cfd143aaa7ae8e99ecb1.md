# A témáról

A tárolási osztály megadói ahhoz kapcsolódnak, hogy a változók hogyan tárolódnak a memóriában.
Szorosan összefüggenek egy érték tárolási időtartamával (amit élettartamnak is neveznek).

## auto: a függvény- vagy blokk-scope változók alapértelmezett tárolási osztálya

Mivel a blokkon vagy függvényen belül definiált változók alapértelmezés szerint `auto`-k, nem szokás ezt a megnevezést explicit módon használni.
Az `auto` gyakori kerülésének másik oka, hogy a C++-ban más a jelentése.
A C-t és C++-t ötvöző kódbázisokban kevesebb lehet a félreértés, ha kerüljük az `auto` tárolási osztály megadóját.
Egy `auto` változó élettartama akkor kezdődik, amikor belépünk a blokkjába, és akkor ér véget, amikor kilépünk belőle.
Egy `auto` változónak a blokkba való belépéskor foglalódik memória, _de alapértelmezett érték nélkül_.
Kivételt jelentenek a változó hosszúságú tömbök (VLA-k.)
Egy VLA memóriafoglalása ott történik, ahol a blokkjában deklarálják vagy definiálják, és akkor ér véget, amikor kilépünk a blokkból.
Egy `auto` változó bármilyen érvényes kifejezéssel inicializálható.

## static: a tárolási osztály megadója, amelyet nem szabad összekeverni a statikus kötéstípussal

A blokkon vagy függvényen kívül definiált változó file scope-ban van, és tárolási időtartama mindig statikus.
A file scope azt jelenti, hogy a fájl bármely részéről elérhető.
A statikus tárolás azt jelenti, hogy a program végrehajtásának kezdetétől a végéig létezik.
Hacsak nem inicializáljuk explicit módon, a `static` változó az alapértelmezett nullaértékével inicializálódik.
Ha egy file scope-ban lévő változót a `static` kulcsszóval jelölünk meg, akkor a `static` a kötésére utal.
A `static`-ként megjelölt file scope változó belső kötéssel rendelkezik, ami azt jelenti, hogy csak a fájlon belül érhető el.
Ha egy változó egy függvényen belül vagy egy függvényen belüli blokkban van definiálva, és `static`-ként van megjelölve, akkor `static` tárolási időtartama van.
A `static` változó értéke megmarad a függvény vagy blokk ismételt hívásai között.

A következő példában két `static` változót láthatunk munkában.
Az első `count` változó a `print_stuff` függvényen belül van definiálva, és megőrzi az értékét a függvény ismételt hívásai között.
A második `count` változó egy tetszőleges blokkon belül van definiálva, és elrejti (vagy árnyékolja) az első `count` változót a blokkján belül.
A második `count` változó a blokkba való belépések között önállóan megőrzi az értékét.

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

Ha egy `static` változót explicit módon inicializálunk, azt konstans kifejezéssel kell tenni.
A konstans kifejezés olyan kifejezés, amely fordítási időben kiértékelhető.

## extern: hogyan érhetünk el egy változót egy másik fordítási egységben

A fordítási egység egy forrásfájlból és minden olyan további fájlból áll, amelyet `#include`-ol.
Bár egy file scope-ban lévő változó `extern`-ként deklarálható és inicializálható, az `extern` kulcsszót általában egy már létező változóra való hivatkozásra használjuk, nem új változó definiálására.
A változónak, amelyre az `extern` hivatkozik, file scope-ban kell lennie.
A file scope-ban lévő változó tárolása mindig `static`.
A beillesztett fájlban lévő változónak külső kötéssel kell rendelkeznie ahhoz, hogy a fájl, amely beilleszti, elérhesse.

A következő példában az `extern`-ként deklarált `val` változót használjuk, hogy az a saját file scope-jában definiált `val`-ra hivatkozzon.
Az `extern` mindkét használatát hivatkozó deklarációnak nevezzük, mert egy máshol definiált változóra hivatkoznak.

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

Ha mindkét `extern` kulcsszót eltávolítanánk, a program valami ilyesmit írhatna ki

```
val is 22038
val is 42
```

Az ilyen kimenet azt mutatja, hogy a `val` minden `extern` nélküli deklarációja definiáló deklaráció, és független a `val` többi deklarációjától.
Ha teljesen eltávolítanánk a `val` deklarációit a `set_val` és a `main` függvényből, az fordítási hibát eredményezne: a `val` nem lenne deklarálva a `set_val` és a `main` függvényben.

Ha az `extern`-ként hivatkozott változó ugyanabban a fájlban van, akkor belső vagy külső kötése is lehet.
Ha a `val`-t `static int val;` formában definiálnánk, annak nem lenne hatása a `val` használatára a `set_val` vagy a `main` függvényben, kivéve, hogy a definíciót a fordítás érdekében feljebb kellene mozgatni.
De ha a `val` a függvények fölött lenne definiálva, nem lenne szükség arra, hogy `extern`-ként deklarálják a `val`-t.

A következő működne

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

A `static` eltávolítható a `static int val;` deklarációból, amivel a `val` külső kötést kap, és a `val` továbbra is ugyanúgy működne a `set_val` és a `main` függvényben.
Ha egy másik forrásfájl beillesztené ezt a fájlt, csak akkor használhatná a `val`-t, ha a `val` külső kötéssel rendelkezne (nem `static`-ként van deklarálva), és a másik fájl tartalmazná az `extern int val;` deklarációt.

A változónak, amelyre az `extern` hivatkozik, nemcsak `static` tárolással kell rendelkeznie, hanem file scope-ban is kell lennie.
A következő példa valószínűleg nem fordul le, mert a `val` ugyan `static`, mégsem rendelkezik file scope-pal.

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## register: hogyan gyorsíthatjuk esetleg egy változó elérését

A `register`-ként megjelölt változó a programozó azon szándékát fejezi ki, hogy az érték a gyors elérés érdekében egy regiszterbe kerüljön.
A `register` változó abban hasonlít az `auto` változóhoz, hogy függvény- vagy blokk-scope-ban kell lennie.
Mivel az érték szándék szerint memória helyett egy regiszterbe kerül, a fordítónak meg kellene tiltania a változó címének elérését, hiszen egy regiszter címét nem lehet venni.
Egy memóriacím azonban maga is elhelyezhető egy regiszterben.
A következő példa ezt szemlélteti

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register` lényegében csak egy javaslat, mert a fordítók szabadon eldönthetik, hogy követik-e ezt a megadót vagy sem, így előfordulhat, hogy az érték valójában nem is kerül regiszterbe.

## typedef: a tárolási osztály megadója, amely valójában nem az

A `typedef`-et csak szintaktikai okokból írják le tárolási osztály megadójaként.
Ez azért van, mert egy tárolási osztály megadója nem használható egy másik tárolási osztály megadóval együtt.
Így a `typedef auto int i = 42;` éppolyan illegális, mint a `static auto int i = 42;`.
