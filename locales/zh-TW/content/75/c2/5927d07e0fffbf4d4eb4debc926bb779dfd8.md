# 簡介

## 類別

該來認識 C++ 的核心典範之一了：物件導向程式設計（OOP）。
物件導向程式設計的核心是`classes`，也就是由使用者定義、自帶一組相關函式的資料型態。
我們會從基礎開始，之後在課程後續的內容裡再深入探討更進階的主題。

### 成員

類別可以擁有**成員變數**和**成員函式**。
透過**成員選取**運算子 `.` 就能存取它們。
就像`classes`之外的變數一樣，成員變數最好在宣告時就初始化。
這個值之後會成為這個類別新建物件時的預設值。

### 封裝與資訊隱藏

類別可以限制外界對其成員的存取。
兩個基本的`access specifiers`是`private`和`public`。
`private`成員無法從類別外部存取。
`public`成員則可以自由存取。
一個`class`的所有成員預設都是`private`。
只有明確標記為`public`的成員，才能在類別外部自由使用。

### 基本範例

下面的範例展示了`class`的定義方式。
請注意定義結尾的`;`：

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

在類別內部可以存取所有成員變數。
看看`cast_spell`函式裡的`damage`。
在類別外部則無法讀取或修改`private`成員：

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

### 建構子

建構子可以在建立物件時，為成員變數指定值。
建構子的名稱和`class`相同，而且沒有回傳型別。
一個類別可以有好幾個建構子。
如果你不總是需要設定所有變數，這就很方便。
有時你可能想讓其他部分保持預設，只修改`name`變數。
如果遇到的是一位實力不凡的 Wizard，你可能也想調整傷害值，那就需要兩個`constructors`。

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

建構子是個大主題，有許多細節。
如果你沒有為`class`明確定義`constructor`，那麼編譯器就會替你代勞，而且也只有在那種情況下才會。
上面的第一個範例就是這種情況。
_silverhand_物件是透過呼叫預設建構子建立的，沒有傳入任何引數。
所有變數都會被設為類別定義中所指定的值。
如果你在定義中沒有給定任何值，這些變數可能就未經初始化，進而導致意料之外的後果。

~~~~exercism/note
## 結構

結構源自這門語言最早的 C 血統，和 C++ 本身一樣古老。
它們基本上和`classes`是同一回事，只有一個重要的例外。
預設情況下，`class`裡的一切都是`private`。
結構則相反，除非另行指定，否則都是`public`。
依照慣例，`struct`關鍵字常用於**只存放資料的結構**。
而需要確保某些特性的物件，則偏好使用`class`關鍵字。
這樣的不變量可能是：你的`Wizard` `class`的`damage`不能變成負值。
`damage`變數是私有的，任何會修改 damage 的函式都能確保這個不變量得以維持。
~~~~
