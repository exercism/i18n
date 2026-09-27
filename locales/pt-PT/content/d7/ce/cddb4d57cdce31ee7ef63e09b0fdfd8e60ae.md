# Introdução

## Interfaces

Uma interface é um tipo que contém membros que definem um conjunto de funcionalidades relacionadas.
Afasta a utilização de uma classe da implementação, permitindo várias implementações diferentes ou o suporte de um comportamento genérico, como formatação, comparação ou conversão.

A sintaxe de uma interface é semelhante à de uma classe, exceto que os métodos aparecem apenas como assinatura e não têm corpo.

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

Todas as operações definidas pela interface têm de ser implementadas pela classe que a implementa.

As interfaces contêm normalmente métodos de instância.

Um exemplo de interface da Biblioteca de Classes do Java, além de `Cloneable`, ilustrada acima, é `Comparable<T>`.
A interface `Comparable<T>` pode ser implementada quando é necessária uma ordem de ordenação genérica predefinida em coleções.
