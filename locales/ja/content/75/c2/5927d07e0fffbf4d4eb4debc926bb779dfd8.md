# はじめに

## クラス

いよいよ、C++の中心的なパラダイムのひとつであるオブジェクト指向プログラミング（OOP）に取り組みます。
OOPは`classes`を中心に据えています。`classes`とは、ユーザーが定義するデータ型で、関連する関数をひとまとまりに持つものです。
まずは基本から始め、より発展的なトピックはシラバスツリーをさらに下った先で扱います。

### メンバー

クラスは、**メンバー変数**と**メンバー関数**を持つことができます。
これらにアクセスするには、**メンバー選択**演算子`.`を使います。
`classes`の外にある変数と同じように、メンバー変数も宣言と同時に値を代入して初期化しておくのがよいでしょう。
この値は、このクラスの新しく作られるオブジェクトの既定値になります。

### カプセル化と情報隠蔽

クラスでは、メンバーへのアクセスを制限できます。
基本的な`access specifiers`は`private`と`public`の2つです。
`private`なメンバーは、クラスの外からはアクセスできません。
`public`なメンバーには自由にアクセスできます。
`class`のメンバーは、既定ではすべて`private`です。
`public`と明示したメンバーだけが、クラスの外から自由に使えます。

### 基本的な例

`class`の定義は、次の例のとおりです。
定義のあとにある`;`に注目してください。

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

クラスの内部からは、すべてのメンバー変数にアクセスできます。
`cast_spell`関数の中の`damage`を見てみましょう。
クラスの外から`private`なメンバーを読み取ったり変更したりすることはできません。

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### コンストラクター

コンストラクターを使うと、オブジェクトの生成時にメンバー変数へ値を代入できます。
コンストラクターは`class`と同じ名前で、戻り値の型を持ちません。
クラスは複数のコンストラクターを持てます。
すべての変数を毎回設定する必要がない場合に便利です。
すべては既定のままにして、`name`変数だけを変えたいこともあるでしょう。
重要なWizardの場合には、ダメージも変えたいかもしれません。そのときは`constructors`が2つ必要です。

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

コンストラクターは奥が深く、多くのニュアンスがあります。
`class`に`constructor`を明示的に定義していない場合、そのときに限って、コンパイラーが代わりにその仕事をしてくれます。
これは、上の最初の例でも起こっています。
_silverhand_オブジェクトは、デフォルトコンストラクターを呼び出して作られます。引数は渡していません。
すべての変数は、クラスの定義に書いた値に設定されます。
もし定義で値を何も指定していなければ、変数は初期化されないままになり、意図しない結果を招くおそれがあります。

~~~~exercism/note
## 構造体

構造体は、この言語の源であるCに由来し、C++と同じくらい古いものです。
構造体は、ひとつ重要な例外を除けば、実質的に`classes`と同じものです。
`class`の中身は、既定ですべて`private`です。
一方、構造体は、そう定義しない限り`public`です。
慣習として、`struct`キーワードは**データだけを持つ構造体**によく使われます。
何らかの性質を保証する必要があるオブジェクトには、`class`キーワードのほうが好まれます。
たとえば、`Wizard`という`class`の`damage`が負にならないようにする、といった不変条件が考えられます。
`damage`変数はprivateであり、ダメージを変更する関数はどれもこの不変条件が保たれるようにします。
~~~~
