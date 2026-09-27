# Einführung

## Terminologie

Du hast bereits in einigen Konzepten C++-Funktionen verwendet und geschrieben.
Jetzt wird es technisch.
Der folgende Codeausschnitt zeigt die gebräuchlichsten Begriffe zur einfachen Referenz.
Da C++ Leerzeichen ignoriert, wurde die Formatierung geändert, um jedes Element in eine einzige Zeile zu setzen.

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
Die Deklaration funktioniert wie eine Notiz an den Compiler, dass es eine Funktion mit diesem Namen, Rückgabetyp und Parameterliste gibt.
Der Code wird nicht funktionieren, wenn die Definition fehlt.
Deklarationen sind optional, sie werden benötigt, wenn du die Funktion vor ihrer Definition verwendest.
Deklarationen können Probleme wie zyklische Referenzen lösen und sie können verwendet werden, um die Schnittstelle von der Implementierung zu trennen.
~~~~

## Der const-Qualifizierer

Manchmal möchtest du sicherstellen, dass Werte nach ihrer Initialisierung nicht mehr geändert werden können.
C++ verwendet das Schlüsselwort `const` als Qualifizierer für Konstanten.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
Du wirst oft sehen, dass Konstanten in _UPPER_SNAKE_CASE_ geschrieben werden.
Es wird empfohlen, diese Schreibweise für Makros zu reservieren, wenn es keine andere Konvention gibt.
~~~~

Wenn du versuchst, eine konstante Variable nach ihrer Festlegung zu ändern, wird dein Code nicht kompilieren.
Das hilft, unbeabsichtigte Änderungen zu vermeiden, eröffnet aber auch Optimierungsmöglichkeiten für den Compiler.
Als Mensch ist es auch einfacher, den Code nachzuvollziehen, wenn du weißt, dass bestimmte Teile nicht betroffen sein werden.

Du kannst `const` auch als Qualifizierer für Funktionsparameter verwenden.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

Wenn du eine `const`-Referenz an die Funktion übergibst, kannst du sicher sein, dass sie unverändert bleibt.
Du wirst oft `const`-Referenzen für Objekte sehen, deren Kopie teuer sein könnte, wie längere Strings.
Ein dritter Anwendungsfall für den `const`-Qualifizierer sind Memberfunktionen, die die Instanz einer Klasse nicht ändern.

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

Die Memberfunktion `answer` von `Stubborn` verwendet eine `const string&`-Referenz als Parameter.
Das vermeidet eine Kopieroperation des ursprünglichen Objekts, das an die Funktion übergeben wurde.

## Funktionsüberladung

Mehrere Funktionen können denselben Namen haben, wenn die Parameterliste unterschiedlich ist.
Das nennt man Funktionsüberladung, und sie wird normalerweise angewendet, wenn diese Funktionen sehr ähnliche Aufgaben erfüllen.

Der Funktionskopf ohne den Rückgabetyp ist die __Typsignatur__ der Funktion.
Eine Änderung der Typsignatur ergibt eine neue Funktion.

Das Beispiel `play_sound` hat sechs verschiedene Überladungen, um unterschiedliche Szenarien abzudecken:

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
Die Typsignatur wird durch den Namen der Funktion, die Anzahl der Parameter, ihre Typen und ihre Qualifizierer definiert (aber nicht ihre Namen).
Der Rückgabetyp ist ausdrücklich nicht Teil der Typsignatur, und du erhältst Kompilierungsfehler, wenn du zwei Funktionen hast, die sich nur in ihrem Rückgabetyp unterscheiden.
Der Compiler wird sich beschweren, weil nicht klar ist, welche der beiden verwendet werden soll.
~~~~

## Standardargumente

Manche Funktionen können sehr lang werden, und viele ihrer Aufrufe verwenden möglicherweise dieselben Werte für die meisten Parameter.
Die Wiederholung in diesen Aufrufen kann mit Standardargumenten vermieden werden.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

Da die Funktionsdeklaration oft vor der Definition gelesen wird, ist sie der bessere Ort, um die Standardargumente festzulegen.
Wenn ein Parameter eine Standarddeklaration hat, benötigen alle Parameter zu seiner Rechten ebenfalls eine Standarddeklaration.
Manchmal können komplizierte Funktionsüberladungen zu weniger Funktionen mit Standardargumenten umgestaltet werden, um die Wartbarkeit zu verbessern.
