# 简介

## 术语

你已经在前几个概念中用过并写过 C++ 函数了。
现在该讲讲技术细节了。
下面的代码片段列出了最常见的术语，方便你随时查阅。
由于 C++ 会忽略空白字符，这里的排版做了调整，把每个元素都单独放在一行。

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
声明就像是给编译器的一条备注，告诉它存在这样一个函数，具有该名称、返回类型和形参列表。
如果缺少定义，代码就无法正常运行。
声明是可选的；只有当你在定义之前就用到该函数时，才需要它。
声明可以解决循环引用之类的问题，也能用来把接口与实现分离开。
~~~~

## const 限定符

有时你希望确保值在初始化之后不能再被修改。
C++ 使用`const`关键字作为常量的限定符。

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
你经常会看到常量写成 _UPPER_SNAKE_CASE_。
如果没有其他约定，建议把这种大小写风格留给宏使用。
~~~~

如果你在常量变量设定之后再试图修改它，代码就无法通过编译。
这有助于避免意外的修改，同时也为编译器带来了优化的可能。
对你来说，如果知道某些部分不会被改动，也更容易理解代码。

你也可以把`const`用作函数形参的限定符。

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

当你向函数传入一个`const`引用时，就能确信它不会被改变。
对于那些复制起来代价较高的对象，比如较长的字符串，你经常会看到`const`引用。
`const`限定符的第三种用法，是不会修改类实例的成员函数。

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

`Stubborn`的成员函数`answer`使用`const string&`引用作为形参。
这样就避免了对传入函数的原始对象进行复制操作。

## 函数重载

只要形参列表不同，多个函数就可以同名。
这称为函数重载，通常在这些函数执行非常相似的任务时使用。

去掉返回类型的函数头部，就是函数的 __类型签名__。
类型签名一变，就是一个新函数。

`play_sound`这个例子有 6 个不同的重载，以应对不同的场景：

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
类型签名由函数名、形参的数量、类型和限定符决定（不过不包括形参的名字）。
返回类型明确不属于类型签名的一部分；如果两个函数只有返回类型不同，就会产生编译错误。
编译器会报错，因为它不清楚该用哪一个。
~~~~

## 默认实参

有些函数会变得很长，而许多调用可能对大部分形参都使用相同的值。
用默认实参可以避免这些调用里的重复。

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

由于函数声明通常先于定义被读到，所以把默认实参放在声明里更合适。
只要有一个形参声明了默认值，它右边的所有形参也都必须声明默认值。
有时可以把复杂的函数重载重构为更少的、带默认实参的函数，以提高可维护性。
