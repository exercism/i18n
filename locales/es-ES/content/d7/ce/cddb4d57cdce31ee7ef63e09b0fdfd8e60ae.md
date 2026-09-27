# Introducción

## Interfaces

Una interfaz es un tipo que contiene miembros que definen un grupo de funcionalidad relacionada.
Separa los usos de una clase de la implementación, lo que permite múltiples implementaciones diferentes o dar soporte a algún comportamiento genérico, como el formateo, la comparación o la conversión.

La sintaxis de una interfaz es similar a la de una clase, excepto que los métodos aparecen solo como la firma y no se proporciona un cuerpo.

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

La clase que implementa la interfaz debe implementar todas las operaciones definidas por esta.

Las interfaces suelen contener métodos de instancia.

Un ejemplo de interfaz que se encuentra en la biblioteca de clases de Java, aparte de `Cloneable`, que se ha mostrado anteriormente, es `Comparable<T>`.
La interfaz `Comparable<T>` se puede implementar cuando se requiere un orden de clasificación genérico predeterminado en las colecciones.
