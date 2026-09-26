# 説明

Blorkemon™️のカードへの懐かしさは、衰える気配がありませんね。また集め始めてしまいましたし、友達も巻き込んで一緒に集めています。

この演習では、`Set`インターフェースを使ってコレクションを管理します。存在するカードをすべて集めることが目標なら、重複したカードは重要ではないからです。

## 1. コレクションを始めましょう

昔集めていたBlorkemon™️のカードの山を、たった今見つけました！
その山には重複したカードがたくさんあるので、重複を取り除いて新しいコレクションを作りましょう。

友達にもBlorkemon™️の楽しさに加わってほしいですよね。その一番の近道は、カードを1枚あげて、友達のコレクションのきっかけを作ることです。

`newCollection`メソッドを実装しましょう。このメソッドは、カードの配列を、新しいコレクションを表す`Set`に変換します。

```java
GottaSnatchEmAll.newCollection(List.of("Newthree", "Newthree", "Newthree"));
// => {"Newthree"}
```

## 2. コレクションを増やしましょう

コレクションができると、それはもう自分だけのものとして、育てていく必要があります。

`addCard`メソッドを実装しましょう。このメソッドは、新しいカードと、現在集めているカードのセットを受け取ります。まだ入っていなければ新しいカードをコレクションに追加し、コレクションが更新されたかどうかを示す`boolean`を返します。

```java
Set<String> collection = GottaSnatchEmAll.newCollection("Newthree");
GottaSnatchEmAll.addCard("Scientuna",collection);
// => true

collection.contains("Scientuna");
// => true
```

## 3. トレードを始めましょう

友達にもBlorkemon™️の楽しさに加わってほしいですよね。そこで、トレードを始めましょう！

友達とトレードするとき、すべてのトレードが価値があるわけでも、そもそも成立するわけでもありません。自分と友達のどちらもが、相手が持っていないカードを持っているときだけトレードしましょう。

`canTrade`メソッドを実装しましょう。このメソッドは、自分の現在のコレクションと、友達のひとりのコレクションを受け取ります。上のルールに従って、トレードが可能かどうかを示す`boolean`を返します。

```java
Set<String> myCollection = Set.of("Newthree");
Set<String> theirCollection = Set.of("Scientuna");
GottaSnatchEmAll.canTrade(myCollection, theirCollection);
// => true
```

## 4. 共通するカードを見つけましょう

Blorkemon™️好きの友達と集まって、どのカードが一番共通しているのか気になりますね。

`commonCards`メソッドを実装しましょう。このメソッドはコレクションの配列を受け取り、すべてのコレクションが持っているカードのコレクションを返します。

```java
GottaSnatchEmAll.commonCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Scientuna"}
```

## 5. すべてのカード

友達と力を合わせれば、Blorkemon™️のカードをすべて持っているのでしょうか？

`allCards`メソッドを実装しましょう。このメソッドはコレクションの配列を受け取り、すべてのコレクションを合わせた、重複のないすべてのカードのコレクションを返します。

```java
GottaSnatchEmAll.allCards(List.of(Set.of("Scientuna"), Set.of("Newthree","Scientuna")));
// => {"Newthree", "Scientuna"}
```
