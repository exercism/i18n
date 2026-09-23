# Introduction

## Interfaces

Une interface est un type dont les membres définissent un ensemble de fonctionnalités liées.
Elle sépare les usages d'une classe de l'implémentation, ce qui permet plusieurs implémentations différentes ou la prise en charge d'un comportement générique tel que le formatage, la comparaison ou la conversion.

La syntaxe d'une interface est similaire à celle d'une classe, à ceci près que les méthodes n'apparaissent que sous forme de signature et qu'aucun corps n'est fourni.

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

Toutes les opérations définies par l'interface doivent être implémentées par la classe qui l'implémente.

Les interfaces contiennent généralement des méthodes d'instance.

Un exemple d'interface que l'on trouve dans la bibliothèque de classes Java, outre `Cloneable`, illustrée ci-dessus, est `Comparable<T>`.
L'interface `Comparable<T>` peut être implémentée lorsqu'un ordre de tri générique par défaut est nécessaire dans les collections.
