# Bevezetés

## Interfészek

Az interfész egy olyan típus, amelynek tagjai egy összetartozó funkciókészletet definiálnak.
Elválasztja az osztály használatát a megvalósítástól, ami lehetővé teszi több különböző
implementációt, vagy támogatja az olyan általános viselkedést, mint a formázás, az
összehasonlítás vagy a konverzió.

Az interfész szintaxisa hasonló az osztályéhoz, azzal a különbséggel, hogy itt a metódusok
csak szignatúraként jelennek meg, törzs nélkül.

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

Az interfész által definiált összes műveletet meg kell valósítania az implementáló
osztálynak.

Az interfészek általában példánymetódusokat tartalmaznak.

A Java osztálykönyvtárban található interfészekre példa a fent bemutatott `Cloneable` mellett
a `Comparable<T>`. A `Comparable<T>` interfészt ott érdemes megvalósítani, ahol a
gyűjteményekben alapértelmezett általános rendezési sorrendre van szükség.
