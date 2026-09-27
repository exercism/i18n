# Introduzione

## Le interfacce

Un'interfaccia è un tipo che contiene membri che definiscono un gruppo di funzionalità correlate.
Tiene separati gli usi di una classe dall'implementazione, permettendo più implementazioni diverse o il supporto di un comportamento generico come la formattazione, il confronto o la conversione.

La sintassi di un'interfaccia è simile a quella di una classe, con la differenza che i metodi compaiono solo come firma e non ne viene fornito il corpo.

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

Tutte le operazioni definite dall'interfaccia devono essere implementate dalla classe che la implementa.

Le interfacce di solito contengono metodi di istanza.

Un esempio di interfaccia presente nella libreria di classi di Java, oltre a `Cloneable` illustrata sopra, è `Comparable<T>`.
L'interfaccia `Comparable<T>` può essere implementata quando è richiesto un ordinamento generico predefinito nelle collezioni.
