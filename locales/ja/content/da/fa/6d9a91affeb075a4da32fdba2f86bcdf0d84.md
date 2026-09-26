# はじめに

以前の概念で、ローカルラベルも関数も、`section .text`のような実行可能なコードを含むセクション内の単なるアドレスにすぎないという話をしました。

実際、関数は他のメモリアドレスと同じように扱うことができます。つまり、レジスタに読み込んだり、受け渡したり、メモリに保存したりできるのです。`call`や`jmp`を使って、レジスタやメモリに保存された関数へ実行を移すこともできます。

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

値として受け渡される関数のアドレスを**サンク**と呼びます。サンクは、アセンブリにおける**高階プログラミング**、つまり他のコードを操作するコードの構成要素です。

## データとしてのコード

関数のアドレスは、メモリに保存して後から取り出すこともできます。

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

`save_op`は、受け取った関数のアドレスを`cached_fn`に書き込みます。この値は`save_op`が戻ったあとも残るので、その後`apply_op`を呼び出すと、最後に保存されたアドレスへ末尾ジャンプします。これにより、`apply_op`が実行時に呼び出す関数を切り替えられるようになります。

## ディスパッチテーブル

関数のアドレスを配列に保存すると、何らかのインデックスに応じて異なる関数を選べるようになります。インデックスは実行時の条件によって決まることもあります。これを**ディスパッチテーブル**と呼びます。

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

## 状態を持つサンク

呼び出しの合間に何らかの永続的なメモリを読み書きするサンクは、それまでの経過によって動作が変わることがあります。その結果は、引数だけでは決まらない場合があります。

たとえば、関数を受け取って現在のカウントを引数に呼び出し、呼び出すたびにカウントを進める_カウンター_はどうでしょうか。

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

`tick`は、与えられた関数を現在のカウントを引数として呼び出し、その後カウントを進めます。つまり、最初の`tick(square)`の呼び出しは`square(0)`を呼び出し、次の`tick(square)`は`square(1)`、その次は`square(2)`、というふうになります。

もう一つの例は、_遅延計算_です。

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

`delay`は関数と値を受け取り、それらを保存して`invoke`を返します。`invoke`が呼び出されると、捕まえた関数を保存しておいた引数で実行します。

高水準言語でよく見られるパターンの多く、たとえばコールバック、仮想メソッド、ジェネレーター、カリー化、関数合成などは、永続的な状態と組み合わせたサンクの上に成り立っています。
