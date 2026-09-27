# 소개

## 인터페이스

인터페이스는 관련된 기능들을 정의하는 멤버들을 담고 있는 타입이에요.
인터페이스는 클래스를 사용하는 쪽과 구현을 분리해서, 서로 다른 여러 구현을 허용하거나 서식, 비교, 변환 같은 일반적인 동작을 지원할 수 있게 해줘요.

인터페이스의 문법은 클래스와 비슷하지만, 메서드가 시그니처로만 나타나고 본문은 제공되지 않아요.

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

인터페이스에 정의된 모든 연산은 그 인터페이스를 구현하는 클래스가 반드시 구현해야 해요.

인터페이스는 보통 인스턴스 메서드를 담고 있어요.

자바 클래스 라이브러리에서 찾을 수 있는 인터페이스의 예로는, 위에서 살펴본 `Cloneable` 외에도 `Comparable<T>`가 있어요.
`Comparable<T>` 인터페이스는 컬렉션에서 기본적인 제네릭 정렬 순서가 필요할 때 구현할 수 있어요.
