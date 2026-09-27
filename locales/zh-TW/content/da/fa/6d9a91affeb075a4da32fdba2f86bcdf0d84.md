# 簡介

在先前的概念中曾提過，區域標籤和函式都只是含有可執行程式碼之區段中的位址，例如`section .text`。

事實上，函式可以像任何記憶體位址一樣被操作，也就是說，它們可以被載入暫存器、四處傳遞，並儲存在記憶體中。
也可以使用`call`或`jmp`，把執行流程轉移到儲存在暫存器或記憶體中的函式：

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

像值一樣被四處傳遞的函式位址，稱為**thunk**。
thunk 是組合語言中**高階程式設計**的基本元件：操作其他程式碼的程式碼。

## 程式碼即資料

函式位址也可以儲存在記憶體中，之後再取用：

```x86asm
section .bss
    cached_fn resq 1

section .text
save_op:
    mov qword [rel cached_fn], rdi
    ret

apply_op:
    ; arguments are already set up according to the ABI
    jmp qword [rel cached_fn] ; tail call
```

`save_op`會將它收到的函式位址寫入`cached_fn`。
這個值在`save_op`回傳之後仍然存在，因此之後任何對`apply_op`的呼叫，都會尾呼叫到最後儲存的那個位址。
這讓我們可以在執行時改變`apply_op`所呼叫的函式。

## 分派表

將函式位址儲存在陣列中，就能依照某個索引（可能取決於執行時期的條件）來選擇不同的函式。
這稱為**分派表**：

```x86asm
section .data
    dispatch_table dq add_op, sub_op, mul_op

section .text
dispatch:
    ; this function takes two arguments in rdi and rsi, and an index in rdx
    ; it then applies the function corresponding to the index in rdx to the arguments
    lea rax, [rel dispatch_table]
    jmp qword [rax + 8*rdx]   ; tail-call the function address for the index
```

## 有狀態的 thunk

若某個 thunk 在呼叫之間會讀取或更新某塊持續存在的記憶體，它的行為就可能因為先前的狀況而有所不同。
它的結果可能不只取決於它的引數。

舉例來說，一個_計數器_會接收一個函式，以目前的計數呼叫它，並在每次呼叫後推進計數：

```x86asm
section .data
    count dq 0

section .text
tick:
    mov rax, rdi               ; saves the function address
    mov rdi, [rel count]       ; loads the current count as the function's argument
    inc qword [rel count]      ; advances the count
    jmp rax                    ; tail-calls the function
```

`tick`會以目前的計數作為引數來呼叫給定的函式，然後推進計數。
所以第一次呼叫`tick(square)`會呼叫`square(0)`，下一次呼叫`tick(square)`會呼叫`square(1)`，再下一次則呼叫`square(2)`，依此類推。

另一個例子是_延遲計算_：

```x86asm
section .bss
    captured_fn resq 1
    argument resq 1

section .text
delay:
    mov qword [rel captured_fn], rdi ; saves the function
    mov qword [rel argument], rsi    ; saves the argument
    lea rax, [rel invoke]            ; returns the `invoke` function
    ret

invoke:
    mov rdi, qword [rel argument]    ; loads the saved argument into `rdi`
    jmp qword [rel captured_fn]      ; tail-calls the saved function
```

`delay`接收一個函式和一個值，將它們儲存起來，並回傳`invoke`。
當`invoke`被呼叫時，它會以儲存的引數執行捕捉到的函式。

高階語言中常見的許多模式，例如回呼、虛擬方法、生成器、柯里化、函式組合等，都建立在 thunk 與持續狀態的搭配之上。
