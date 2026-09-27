# Einführung

## Interfaces

Ein Interface ist ein Typ, der Member enthält, die eine Gruppe zusammengehöriger Funktionalität definieren. Es trennt die Verwendung einer Klasse von der Implementierung und ermöglicht so mehrere unterschiedliche Implementierungen oder die Unterstützung eines generischen Verhaltens wie Formatierung, Vergleich oder Konvertierung.

Die Syntax eines Interfaces ähnelt der einer Klasse, außer dass Methoden nur als Signatur erscheinen und kein Rumpf angegeben wird.

```java
public interface Language {
    String getLanguageName();
    String speak();
}

public class ItalianTraveller implements Language, Cloneable {

    // from Language interface
    public String getLanguageName() {
        return "Italiano";
    }

    // from Language interface
    public String speak() {
        return "Ciao mondo";
    }

    // from Cloneable interface
    public Object clone() {
        ItalianTraveller it = new ItalianTraveller();
        return it;
    }
}
```

Alle Operationen, die das Interface definiert, müssen von der implementierenden Klasse implementiert werden.

Interfaces enthalten normalerweise Instanzmethoden.

Ein Beispiel für ein Interface in der Java-Klassenbibliothek, neben dem oben gezeigten `Cloneable`, ist `Comparable<T>`. Das `Comparable<T>`-Interface kann implementiert werden, wenn eine standardmäßige generische Sortierreihenfolge für Sammlungen erforderlich ist.
