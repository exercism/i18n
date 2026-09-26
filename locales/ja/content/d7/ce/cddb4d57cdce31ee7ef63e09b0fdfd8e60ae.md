# はじめに

## インターフェース

インターフェースとは、関連する機能をひとまとめにしたメンバーを持つ型です。クラスの使われ方と実装を切り離すことで、複数の異なる実装を可能にしたり、書式設定・比較・変換といった汎用的な振る舞いをサポートしたりできます。

インターフェースの構文はクラスの構文とよく似ていますが、メソッドはシグネチャーだけを書き、本体は書かない点が異なります。

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

インターフェースで定義されたすべての操作は、それを実装するクラスで実装しなければなりません。

インターフェースには通常、インスタンスメソッドが含まれます。

Javaクラスライブラリにあるインターフェースの例としては、上で示した`Cloneable`のほかに`Comparable<T>`があります。
`Comparable<T>`インターフェースは、コレクションで汎用的な並べ替え順序が必要なときに実装します。
