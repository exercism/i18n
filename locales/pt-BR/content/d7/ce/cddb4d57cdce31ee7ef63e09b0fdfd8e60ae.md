# Introdução

## Interfaces

Uma interface é um tipo que contém membros que definem um grupo de funcionalidades relacionadas. Ela distancia os usos de uma classe da implementação, permitindo várias implementações diferentes ou o suporte a algum comportamento genérico, como formatação, comparação ou conversão.

A sintaxe de uma interface é parecida com a de uma classe, exceto que os métodos aparecem apenas como assinatura, sem corpo.

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

Todas as operações definidas pela interface precisam ser implementadas pela classe que a implementa.

Interfaces geralmente contêm métodos de instância.

Um exemplo de interface da biblioteca de classes do Java, além de `Cloneable` ilustrada acima, é `Comparable<T>`. A interface `Comparable<T>` pode ser implementada quando é necessária uma ordem de classificação genérica padrão em coleções.
