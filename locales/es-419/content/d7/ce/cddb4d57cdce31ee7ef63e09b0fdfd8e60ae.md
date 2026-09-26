# Introducción

## Interfaces

Una interfaz es un tipo que contiene miembros que definen un grupo de funcionalidad relacionada.
Separa los usos de una clase de la implementación, lo que permite varias implementaciones distintas o admitir algún comportamiento genérico, como el formateo, la comparación o la conversión.

La sintaxis de una interfaz es similar a la de una clase, salvo que los métodos aparecen solo como la firma y no se proporciona un cuerpo.

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

Todas las operaciones definidas por la interfaz deben ser implementadas por la clase que la implementa.

Por lo general, las interfaces contienen métodos de instancia.

Un ejemplo de una interfaz que se encuentra en la Java Class Library, además de `Cloneable`, que se ilustró arriba, es `Comparable<T>`.
La interfaz `Comparable<T>` se puede implementar cuando se requiere un orden de clasificación genérico predeterminado en las colecciones.
