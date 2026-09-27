# About

Speicherklassen-Spezifizierer bestimmen, wie Variablen im Speicher abgelegt werden.
Sie hängen eng mit der Speicherdauer (auch als Lebensdauer bezeichnet) eines Werts zusammen.

## auto: die Standard-Speicherklasse für Variablen im Funktions- oder Block-Gültigkeitsbereich

Da Variablen, die innerhalb eines Blocks oder einer Funktion definiert werden, standardmäßig `auto` sind, wird der Begriff selten explizit verwendet.
Ein weiterer Grund, `auto` oft zu vermeiden, ist, dass es in C++ eine andere Bedeutung hat.
In Codebasen, die C und C++ kombinieren, stiftet es möglicherweise weniger Verwirrung, den `auto`-Speicherklassen-Spezifizierer zu vermeiden.
Die Lebensdauer einer `auto`-Variablen beginnt, wenn ihr Block betreten wird, und endet, wenn ihr Block verlassen wird.
Für eine `auto`-Variable wird beim Betreten ihres Blocks Speicher reserviert, _jedoch ohne Standardwert_.
Eine Ausnahme bilden Arrays mit variabler Länge (VLAs).
Die Allokation eines VLA erfolgt an der Stelle, an der es in seinem Block deklariert oder definiert wird, und endet, wenn sein Block verlassen wird.
Eine `auto`-Variable kann durch jeden gültigen Ausdruck initialisiert werden.

## static: der Speicherklassen-Spezifizierer, der nicht mit der statischen Bindungsart verwechselt werden darf

Eine Variable, die außerhalb eines Blocks oder einer Funktion definiert wird, hat Dateigültigkeitsbereich und immer statische Speicherdauer.
Dateigültigkeitsbereich bedeutet, dass von überall in der Datei darauf zugegriffen werden kann.
Statischer Speicher bedeutet, dass sie vom Beginn der Programmausführung bis zu deren Ende existiert.
Sofern sie nicht explizit initialisiert wird, wird eine `static`-Variable mit ihrem Standardwert Null initialisiert.
Wenn eine Variable mit Dateigültigkeitsbereich mit `static` gekennzeichnet ist, bezieht sich `static` auf ihre Bindung.
Eine mit `static` gekennzeichnete Variable mit Dateigültigkeitsbereich hat interne Bindung, das heißt, auf sie kann nur innerhalb der Datei zugegriffen werden.
Wenn eine Variable innerhalb einer Funktion oder in einem Block innerhalb einer Funktion definiert und mit `static` gekennzeichnet ist, hat sie `static`-Speicherdauer.
Der Wert der `static`-Variablen bleibt zwischen Aufrufen der Funktion oder des Blocks erhalten.

Im folgenden Beispiel sehen wir zwei `static`-Variablen in Aktion.
Die erste `count`-Variable ist innerhalb der Funktion `print_stuff` definiert und behält ihren Wert zwischen Aufrufen der Funktion.
Die zweite `count`-Variable ist innerhalb eines beliebigen Blocks definiert und verdeckt (beschattet) die erste `count`-Variable innerhalb ihres Blocks.
Die zweite `count`-Variable behält ihren Wert unabhängig davon zwischen den Eintritten in den Block.

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

Wenn eine `static`-Variable explizit initialisiert wird, muss dies mit einem konstanten Ausdruck geschehen.
Ein konstanter Ausdruck ist einer, der zur Compile-Zeit ausgewertet werden kann.

## extern: wie du auf eine Variable in einer anderen Übersetzungseinheit zugreifst

Eine Übersetzungseinheit besteht aus einer Quelldatei und jeder anderen Datei, die sie mit `#include` einbindet.
Obwohl eine Variable mit Dateigültigkeitsbereich als `extern` deklariert und initialisiert werden kann, wird das Schlüsselwort `extern` normalerweise verwendet, um auf eine vorhandene Variable zu verweisen, nicht um eine neue zu definieren.
Die Variable, auf die `extern` verweist, muss Dateigültigkeitsbereich haben.
Eine Variable im Dateigültigkeitsbereich hat immer statischen Speicher.
Eine Variable in einer eingebundenen Datei muss externe Bindung haben, damit die Datei, die sie einbindet, auf sie zugreifen kann.

Im folgenden Beispiel verwenden wir die als `extern` deklarierte Variable `val`, damit sie auf das im Dateigültigkeitsbereich definierte `val` verweist.
Beide Verwendungen von `extern` heißen referenzierende Deklarationen, da sie auf eine anderswo definierte Variable verweisen.

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

Wenn beide `extern`-Schlüsselwörter entfernt würden, gäbe das Programm möglicherweise etwa Folgendes aus

```
val is 22038
val is 42
```

Eine solche Ausgabe zeigt, dass jede Deklaration von `val` ohne `extern` eine definierende Deklaration ist und von den anderen Deklarationen von `val` unabhängig ist.
Würde man die Deklarationen von `val` aus `set_val` und `main` ganz entfernen, gäbe es einen Compile-Fehler, dass `val` in `set_val` und `main` nicht deklariert ist.

Wenn eine als `extern` referenzierte Variable in derselben Datei liegt, kann sie entweder interne oder externe Bindung haben.
Würde man `val` als `static int val;` definieren, hätte das keine Auswirkung auf die Verwendung von `val` in `set_val` oder `main`, außer dass die Definition darüber verschoben werden müsste, damit es kompiliert.
Wäre `val` jedoch über den Funktionen definiert, müssten sie `val` nicht als `extern` deklarieren.

Folgendes würde funktionieren

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

Das `static` könnte aus `static int val;` entfernt werden, wodurch `val` externe Bindung erhält, und `val` würde in `set_val` und `main` weiterhin gleich funktionieren.
Wenn eine andere Quelldatei diese Datei einbindet, könnte sie `val` nur verwenden, wenn `val` externe Bindung hätte (nicht als `static` deklariert) und die andere Datei `extern int val;` deklarierte.

Eine durch `extern` referenzierte Variable muss nicht nur statischen Speicher haben, sondern auch Dateigültigkeitsbereich.
Das folgende Beispiel wird sich höchstwahrscheinlich nicht kompilieren lassen, weil `val` zwar `static` ist, aber keinen Dateigültigkeitsbereich hat.

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

## register: wie du den Zugriff auf eine Variable möglicherweise beschleunigst

Eine als `register` gekennzeichnete Variable drückt den Wunsch des Programmierers aus, den Wert für einen schnellen Zugriff in einem Register abzulegen.
Eine `register`-Variable ist wie eine `auto`-Variable darin, dass sie sich im Funktions- oder Block-Gültigkeitsbereich befinden muss.
Da der Wert in einem Register statt im Speicher abgelegt werden soll, sollte der Compiler den Zugriff auf die Adresse der Variablen nicht zulassen, da die Adresse eines Registers nicht gebildet werden kann.
Eine Speicheradresse selbst kann jedoch in einem Register abgelegt werden.
Das folgende Beispiel zeigt das

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register` ist im Wesentlichen ein Hinweis, da es Compilern freisteht, zu entscheiden, ob sie diesem Spezifizierer folgen oder nicht, der Wert wird also möglicherweise tatsächlich in einem Register abgelegt oder auch nicht.

## typedef: der Speicherklassen-Spezifizierer, der eigentlich keiner ist

`typedef` wird nur aus syntaktischen Gründen als Speicherklassen-Spezifizierer beschrieben.
Das liegt daran, dass ein Speicherklassen-Spezifizierer nicht zusammen mit einem anderen Speicherklassen-Spezifizierer verwendet werden kann.
Also ist `typedef auto int i = 42;` genauso unzulässig wie `static auto int i = 42;`.
