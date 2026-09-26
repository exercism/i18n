# 简介

在之前的概念里提到过，局部标签和函数都只是可执行代码段中的地址，比如`section .text`。

事实上，函数可以像任何内存地址一样被操作，也就是说，它们可以加载到寄存器中、四处传递，也可以存储到内存里。
同样，可以用`call`或`jmp`把执行权交给存放在寄存器或内存中的函数：

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

像值一样被传递的函数地址称为**thunk**。
在汇编中，thunk 是**高阶编程**的基石：对代码进行操作的代码。

## 代码即数据

函数地址也可以存进内存，以后再取出来：

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

`save_op`会把它收到的函数地址写入`cached_fn`。
这个值在`save_op`返回后依然存在，因此之后任何对`apply_op`的调用都会尾跳转到最近一次存入的地址。
这样就可以在运行时改变`apply_op`调用的是哪个函数。

## 分派表

把函数地址存进数组，就可以根据某个下标选择不同的函数，这个下标甚至可以取决于运行时的条件。
这称为**分派表**：

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

## 有状态的 thunk

如果 thunk 在多次调用之间读取或更新某块持久内存，它的行为就可能因为之前发生过什么而不同。
它的结果可能不只取决于它的实参。

例如，下面这个_计数器_接收一个函数，用当前计数调用它，并每次都推进计数：

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

`tick`用当前计数作为实参调用给定的函数，然后推进计数。
所以第一次调用`tick(square)`会调用`square(0)`，下一次调用`tick(square)`会调用`square(1)`，再下一次是`square(2)`，以此类推。

另一个例子是_延迟计算_：

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

`delay`接收一个函数和一个值，把它们存储起来，然后返回`invoke`。
当`invoke`被调用时，它会用保存下来的实参运行被捕获的函数。

高级语言中常见的许多模式，比如回调、虚方法、生成器、柯里化、函数组合等等，都建立在与持久状态配对的 thunk 之上。
