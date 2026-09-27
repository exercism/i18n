# Einführung

## Klassen

Es ist Zeit für eines der Kernparadigmen von C++: die objektorientierte Programmierung (OOP).
Bei der OOP dreht sich alles um `classes`, also benutzerdefinierte Datentypen mit ihren eigenen zugehörigen Funktionen.
Wir fangen mit den Grundlagen an und behandeln weiter unten im Lehrplan fortgeschrittenere Themen.

### Member

Klassen können **Membervariablen** und **Memberfunktionen** haben.
Zugriff darauf bekommst du über den Operator `.` für die **Memberauswahl**.
Wie bei Variablen außerhalb von `classes` ist es ratsam, Membervariablen bei der Deklaration mit einem Wert zu initialisieren.
Dieser Wert wird dann zum Standard für neu erzeugte Objekte dieser Klasse.

### Kapselung und Informationsverbergung

Klassen bieten die Möglichkeit, den Zugriff auf ihre Member einzuschränken.
Die beiden grundlegenden `access specifiers` sind `private` und `public`.
Auf `private`-Member kann von außerhalb der Klasse nicht zugegriffen werden.
Auf `public`-Member kannst du frei zugreifen.
Alle Member einer `class` sind standardmäßig `private`.
Nur Member, die ausdrücklich als `public` markiert sind, lassen sich außerhalb der Klasse frei verwenden.

### Ein einfaches Beispiel

Die Definition einer `class` siehst du im folgenden Beispiel.
Achte auf das `;` nach der Definition:

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

Innerhalb der Klasse kannst du auf alle Membervariablen zugreifen.
Schau dir `damage` in der Funktion `cast_spell` an.
`private`-Member kannst du von außerhalb der Klasse weder lesen noch ändern:

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

### Konstruktoren

Konstruktoren ermöglichen es, Membervariablen bei der Erzeugung eines Objekts Werte zuzuweisen.
Sie haben denselben Namen wie die `class` und keinen Rückgabetyp.
Eine Klasse kann mehrere Konstruktoren haben.
Das ist praktisch, wenn du nicht immer alle Variablen setzen musst.
Manchmal möchtest du alles bei den Standardwerten lassen und nur die Variable `name` ändern.
Bei einem mächtigen Wizard möchtest du vielleicht auch den Schaden ändern, also brauchst du zwei `constructors`.

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

Konstruktoren sind ein großes Thema mit vielen Feinheiten.
Wenn du keinen `constructor` für deine `class` ausdrücklich definierst, dann, und nur dann, erledigt der Compiler die Arbeit für dich.
Genau das ist im ersten Beispiel oben passiert.
Das Objekt _silverhand_ wird durch den Aufruf des Standardkonstruktors erzeugt, es wurden keine Argumente übergeben.
Alle Variablen werden auf den Wert gesetzt, der in der Definition der Klasse angegeben wurde.
Hättest du in dieser Definition keine Werte angegeben, könnten die Variablen uninitialisiert sein, was unerwünschte Folgen haben kann.

~~~~exercism/note
## Structs

Structs stammen aus den ursprünglichen C-Wurzeln der Sprache und sind so alt wie C++ selbst.
Sie sind praktisch dasselbe wie `classes`, mit einer wichtigen Ausnahme.
Standardmäßig ist in einer `class` alles `private`.
Bei Structs hingegen ist alles `public`, solange nichts anderes definiert ist.
Üblicherweise wird das Schlüsselwort `struct` oft für **reine Datenstrukturen** verwendet.
Das Schlüsselwort `class` bevorzugt man für Objekte, die bestimmte Eigenschaften sicherstellen müssen.
Eine solche Invariante könnte sein, dass der `damage` deiner `Wizard`-`class` nicht negativ werden kann.
Die Variable `damage` ist privat, und jede Funktion, die den Schaden ändert, würde dafür sorgen, dass die Invariante erhalten bleibt.
~~~~
