# 简介

## 接口

接口是一种类型，它包含的成员定义了一组相关的功能。它把类的使用与实现分离开来，从而允许存在多种不同的实现，或支持某些通用的行为，比如格式化、比较或转换。

接口的语法与类相似，区别在于方法只以签名出现，不提供方法体。

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

接口定义的所有操作都必须由实现它的类来实现。

接口通常包含实例方法。

除了上面演示的 `Cloneable`，Java 类库中还能找到另一个接口的例子：`Comparable<T>`。当集合中需要默认的泛型排序顺序时，就可以实现 `Comparable<T>` 接口。
