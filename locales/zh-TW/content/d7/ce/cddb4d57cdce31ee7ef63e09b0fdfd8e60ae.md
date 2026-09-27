# 介紹

## 介面

介面是一種型別，包含定義一組相關功能的成員。它將類別的使用與實作分離，允許多種不同的實作，或支援某些泛型行為，例如格式化、比較或轉換。

介面的語法與類別相似，差別在於方法只以簽章的形式出現，不提供主體。

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

介面定義的所有操作，都必須由實作類別實作。

介面通常包含實例方法。

除了上面示例的`Cloneable`之外，Java 類別庫中還有一個介面的例子是`Comparable<T>`。當集合中需要預設的泛型排序順序時，可以實作`Comparable<T>`介面。
