# 关于

存储类说明符涉及变量在内存中的存储方式，与值的存储期（也称生存期）密切相关。

## auto：函数或块作用域变量的默认存储类

由于在块或函数中定义的变量默认就是`auto`，人们通常不会显式写出这个说明符。`auto`常被避开的另一个原因是它在 C++ 中有着不同的含义。C 和 C++ 混用的代码库避开`auto`存储说明符，可以减少混淆。`auto`变量的生存期从进入所属的块开始，到离开该块结束。进入块时，会为`auto`变量分配内存，_但没有默认值_。变长数组（VLA）是个例外。VLA 的分配发生在它在块中被声明或定义的位置，并在离开该块时结束。`auto`变量可以用任何合法的表达式初始化。

## static：不要与静态链接属性混淆的存储说明符

在块或函数之外定义的变量具有文件作用域，并且总是具有静态存储期。文件作用域意味着它可以在文件中的任何位置被访问。静态存储意味着它从程序开始执行起一直存在到程序结束。除非显式初始化，否则`static`变量会被初始化为它的默认零值。如果文件作用域的变量带有`static`标记，这里的`static`指的是它的链接属性。带`static`标记的文件作用域变量具有内部链接，也就是说只能在该文件内访问。如果一个变量定义在函数中，或定义在函数内的某个块中，并带有`static`标记，那么它具有静态存储期。该`static`变量的值在多次调用该函数或多次进入该块之间保持不变。

在下面的例子中，我们能看到两个`static`变量的实际作用。第一个`count`变量定义在`print_stuff`函数中，在多次调用该函数之间保持自己的值。第二个`count`变量定义在任意一个块中，并在自己的块内隐藏（或者说遮蔽）了第一个`count`变量。第二个`count`变量独立地在多次进入该块之间保持自己的值。

```c
#include <stdio.h>

void print_stuff(void) {
    // static variable is initialized to 0
    static int count;
    count++;
    printf("function count is %d\n", count);
    {
        // static variable is initialized to 0
        static int count;
        count++;
        printf("block count is %d\n", count);
    }
}

int main() {
    // prints
    // function count is 1
    // block count is 1
    print_stuff();
    // prints
    // function count is 2
    // block count is 2    
    print_stuff();
}
```

如果显式初始化一个`static`变量，就必须使用常量表达式。常量表达式是指在编译期就能求值的表达式。

## extern：如何访问另一个翻译单元中的变量

一个翻译单元由一个源文件以及它所`#include`的任何其他文件组成。虽然可以用`extern`声明并初始化一个文件作用域的变量，但`extern`关键字通常用于引用一个已经存在的变量，而不是定义一个新变量。被`extern`引用的变量必须具有文件作用域。文件作用域中的变量总是具有静态存储期。被包含文件中的变量必须具有外部链接，才能被包含它的文件访问。

在下面的例子中，我们使用声明为`extern`的变量`val`，让它引用在文件作用域中定义的`val`。这两处`extern`的用法都叫作引用性声明，因为它们引用的是在别处定义的变量。

```c
#include <stdio.h>

void set_val() {
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    // this declares val which is defined elsewhere
    extern int val;
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
// this value could be defined in another source file.
// as a variable with static storage, it is initialized to zero
int val;
```

如果把这两个`extern`关键字都去掉，程序可能会打印出类似这样的内容

```
val is 22038
val is 42
```

这样的输出表明，每个不带`extern`的`val`声明都是定义性声明，并且独立于`val`的其他声明。如果完全移除`set_val`和`main`中对`val`的声明，就会导致编译错误，提示`val`在`set_val`和`main`中未声明。

如果被`extern`引用的变量就在同一个文件中，那么它可以具有内部链接，也可以具有外部链接。把`val`定义为`static int val;`不会影响`set_val`或`main`中对`val`的使用，只不过为了让程序通过编译，这个定义需要移到它们前面。但如果`val`定义在这些函数前面，它们就不需要再把`val`声明为`extern`了。

下面这样是可行的

```c
#include <stdio.h>

// val defining declaration before the function definitions
static int val;

void set_val() {
    val += 42;
    // prints val is 42
    printf("val is %d\n", val);
}

int main() {
    set_val();
    val += 42;
    // prints val is 84
    printf("val is %d\n", val);
}
```

可以把`static`从`static int val;`中删掉，这样`val`就具有外部链接，而`val`在`set_val`和`main`中的表现仍然一样。如果另一个源文件包含了这个文件，那么只有当`val`具有外部链接（未被声明为`static`），并且那个文件声明了`extern int val;`时，它才能使用`val`。

被`extern`引用的变量不仅必须具有静态存储期，还必须具有文件作用域。下面的例子多半无法通过编译，因为`val`虽然是`static`的，却不具有文件作用域。

```c
#include <stdio.h>

void set_val() {
    // defined with static storage, but not in file scope
    static int val;
    val += 42;
    printf("val is %d\n", val);
}

int main() {
    set_val();
    extern int val;
    printf("val is %d\n", val);
}
```

## register：如何尽可能加快对变量的访问

标记为`register`的变量表达了程序员的一种意愿：希望把这个值放进寄存器，以便快速访问。`register`变量和`auto`变量类似，都必须位于函数作用域或块作用域中。由于这个值本意是放进寄存器而不是内存，编译器应当禁止获取该变量的地址，因为寄存器的地址是无法取得的。不过，内存地址本身可以放进寄存器。下面的例子展示了这一点

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

register`本质上只是一种提示，因为编译器可以自行决定是否遵循这个说明符，所以该值实际上可能放进寄存器，也可能没有。

## typedef：并不真的是存储类说明符的存储类说明符

说`typedef`是存储类说明符，仅仅出于语法上的原因。这是因为存储类说明符不能与另一个存储类说明符一起使用。因此，`typedef auto int i = 42;`和`static auto int i = 42;`一样不合法。
