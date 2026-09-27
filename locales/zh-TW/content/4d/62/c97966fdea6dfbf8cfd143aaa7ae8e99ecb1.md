# 關於

儲存類別指定詞與變數在記憶體中的儲存方式有關。
它們和值的儲存期（也稱為生命週期）密切相關。

## `auto`：函式或區塊作用域變數的預設儲存類別

由於在區塊或函式中定義的變數預設就是`auto`，因此很少會明確寫出這個詞。
另一個經常避免使用`auto`的原因，是它在 C++ 中有不同的意義。
同時混合 C 與 C++ 的程式碼庫，避免使用`auto`儲存類別指定詞可以減少混淆。
`auto`變數的生命週期從進入它的區塊開始，到離開該區塊時結束。
進入區塊時，`auto`變數會配置到記憶體，_但沒有預設值_。
可變長度陣列（VLA）是例外。
VLA 的配置發生在它於區塊中被宣告或定義的位置，並在離開該區塊時結束。
`auto`變數可以用任何有效的運算式初始化。

## `static`：別和 static 連結性搞混的儲存類別指定詞

在區塊或函式之外定義的變數具有檔案作用域，而且一律具有靜態儲存期。
檔案作用域表示在檔案中的任何地方都可以存取它。
靜態儲存表示它從程式開始執行時就存在，一直到程式結束。
除非明確初始化，否則`static`變數會以預設的零值初始化。
如果一個檔案作用域的變數被標記為`static`，這裡的`static`指的是它的連結性。
被標記為`static`的檔案作用域變數具有內部連結性，意思是他只能在檔案內存取。
如果變數定義在函式內，或函式中的某個區塊內，並被標記為`static`，它就具有靜態儲存期。
`static`變數的值會在多次呼叫該函式或進入該區塊之間保留下來。

在下面的範例中，我們會看到兩個`static`變數的實際運作。
第一個`count`變數定義在`print_stuff`函式中，並在多次呼叫該函式之間保留它的值。
第二個`count`變數定義在一個任意的區塊中，並在它的區塊內遮蔽第一個`count`變數。
第二個`count`變數會獨立地在每次進入該區塊之間保留它的值。

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

如果`static`變數要明確初始化，就必須用常數運算式來初始化。
常數運算式是指可以在編譯時期求值的運算式。

## `extern`：如何存取另一個編譯單元中的變數

一個編譯單元由一個原始碼檔，以及它用`#include`納入的任何其他檔案組成。
雖然具有檔案作用域的變數可以宣告並初始化為`extern`，但`extern`關鍵字通常用來參照一個已存在的變數，而不是定義新的變數。
被`extern`參照的變數必須具有檔案作用域。
位於檔案作用域的變數一律具有靜態儲存。
被`#include`進來的檔案中的變數，必須具有外部連結性，才能被那個引入它的檔案存取。

在下面的範例中，我們使用宣告為`extern`的變數`val`，讓它參照在檔案作用域中定義的`val`。
這兩處使用`extern`的地方都稱為參照式宣告，因為它們參照的是在別處定義的變數。

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

如果把兩個`extern`關鍵字都移除，程式可能印出類似這樣的結果

```
val is 22038
val is 42
```

這樣的輸出顯示，每個沒有`extern`的`val`宣告都是定義式宣告，而且和其他的`val`宣告彼此獨立。
如果完全移除`set_val`和`main`中對`val`的宣告，會產生編譯錯誤，指出`val`在`set_val`和`main`中未宣告。

如果被`extern`參照的變數就在同一個檔案中，它可以是內部連結或外部連結。
把`val`定義為`static int val;`對`set_val`或`main`中使用`val`的方式沒有影響，只是這個定義必須移到它們前面才能通過編譯。
但如果`val`定義在那些函式之前，它們就不需要把`val`宣告為`extern`。

下面這樣可以運作

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

可以把`static int val;`中的`static`移除，讓`val`變成外部連結，而`val`在`set_val`和`main`中的行為仍然相同。
如果另一個原始碼檔引入了這個檔案，它只有在`val`具有外部連結（也就是沒有宣告為`static`），而且該檔案也宣告了`extern int val;`的情況下，才能使用`val`。

被`extern`參照的變數不僅必須具有靜態儲存，還必須具有檔案作用域。
下面的範例很可能無法編譯，因為`val`雖然是`static`，卻沒有檔案作用域。

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

## register：如何可能加快變數的存取速度

標記為`register`的變數，表達了程式設計師希望把值放在暫存器中，以便快速存取。
`register`變數和`auto`變數很像，都必須位於函式或區塊作用域中。
由於值的用意是放在暫存器而不是記憶體中，編譯器應該不允許存取這種變數的位址，因為暫存器的位址無法取得。
不過，記憶體位址本身可以放進暫存器。
下面的範例示範了這一點

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

`register`本質上只是一種提示，因為編譯器可以自由選擇是否遵循這個指定詞，所以值不一定會真的放進暫存器。

## `typedef`：算不上是儲存類別指定詞的儲存類別指定詞

`typedef`之所以被描述為儲存類別指定詞，純粹是語法上的原因。
這是因為一個儲存類別指定詞不能和另一個儲存類別指定詞一起使用。
所以，`typedef auto int i = 42;`和`static auto int i = 42;`一樣都是不合法的。
