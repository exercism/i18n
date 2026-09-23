# Вступ

## Інтерфейси

Інтерфейс - це тип, що містить члени, які визначають групу повʼязаної функціональності.
Він відділяє використання класу від реалізації, що дозволяє мати кілька різних реалізацій або підтримувати якусь узагальнену поведінку, як-от форматування, порівняння чи перетворення.

Синтаксис інтерфейсу подібний до синтаксису класу, за винятком того, що методи подаються лише як сигнатури, а їхнє тіло не наводиться.

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

Усі операції, визначені інтерфейсом, має реалізувати клас, який його реалізує.

Зазвичай інтерфейси містять методи екземпляра.

Прикладом інтерфейсу з бібліотеки класів Java, крім `Cloneable`, показаного вище, є `Comparable<T>`.
Інтерфейс `Comparable<T>` можна реалізувати там, де потрібен типовий узагальнений порядок сортування в колекціях.
