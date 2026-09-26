# 介绍

## 类

现在该接触 C++ 的核心范式之一了：面向对象编程（OOP）。OOP 的核心是`classes`，也就是用户自定义的数据类型，它们带有自己的一组相关函数。我们会从基础讲起，之后再沿着教学大纲往下，讨论更进阶的主题。

### 成员

类可以有**成员变量**和**成员函数**，通过**成员选择**运算符`.`来访问它们。就像`classes`之外的变量一样，成员变量最好在声明时就初始化一个值。这个值会成为该类新建对象的默认值。

### 封装与信息隐藏

类可以选择限制对其成员的访问。两个基本的`access specifiers`是`private`和`public`。`private`成员无法从类外部访问，`public`成员则可以自由访问。默认情况下，`class`的所有成员都是`private`的。只有显式标记为`public`的成员，才能在类外部自由使用。

### 基本示例

下面这个例子展示了一个`class`的定义。注意定义末尾的`;`：

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

在类内部，你可以访问所有成员变量。看看`cast_spell`函数里的`damage`。在类外部，你无法读取或修改`private`成员：

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

### 构造函数

构造函数可以在创建对象时为成员变量赋值。它们的名字与`class`相同，而且没有返回类型。一个类可以有多个构造函数。如果你并不是每次都需要设置所有变量，这就很有用。有时你可能想保留其余部分的默认值，只修改`name`变量。如果遇到一位厉害的 Wizard，你可能还想修改 damage，这时就需要两个`constructors`。

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

构造函数是个大话题，有许多细节。如果你没有为`class`显式定义`constructor`，那么（也只有这时）编译器会替你完成这项工作。上面第一个例子就是这种情况。_silverhand_ 对象是通过调用默认构造函数创建的，没有传入任何参数。所有变量都会被设为类定义中写明的那个值。如果你在定义里没有给任何值，这些变量可能就未初始化，从而带来意想不到的后果。

~~~~exercism/note
## 结构体

结构体源自这门语言最初的 C 根基，和 C++ 本身一样古老。它们实际上和`classes`是同一回事，只有一个重要的区别。默认情况下，`class`中的所有内容都是`private`的，而结构体在另行定义之前都是`public`的。按照惯例，`struct`关键字常用于**只存放数据的结构**，而需要保证某些性质的对象则更推荐使用`class`关键字。这样一个不变式可以是：你的`Wizard` `class`的`damage`不能变成负数。`damage`变量是私有的，任何修改 damage 的函数都会确保这个不变式得到保持。
~~~~
