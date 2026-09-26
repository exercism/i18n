# Introdução

Em um conceito anterior, foi mencionado que tanto rótulos locais quanto funções são apenas endereços em uma seção com código executável, como `section .text`.

Na verdade, funções podem ser manipuladas da mesma forma que qualquer endereço de memória, ou seja, podem ser carregadas em registradores, passadas adiante e armazenadas na memória.
Também é possível usar `call` ou `jmp` para transferir a execução para uma função armazenada em um registrador ou na memória:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Um endereço de função que é passado adiante como um valor é chamado de **thunk**.
Thunks são um bloco de construção da **programação de ordem superior** em assembly: código que opera sobre outro código.

## Código como dados

Endereços de função também podem ser armazenados na memória e recuperados depois:

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

`save_op` grava em `cached_fn` o endereço de função que recebe.
O valor persiste depois que `save_op` retorna, então qualquer chamada posterior a `apply_op` faz um tail call para o endereço que foi armazenado por último.
Isso torna possível mudar qual função `apply_op` invoca em tempo de execução.

## Tabelas de despacho

Armazenar endereços de função em um array torna possível selecionar funções diferentes de acordo com algum índice, possivelmente dependente de uma condição de tempo de execução.
Isso é chamado de **tabela de despacho**:

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

## Thunks com estado

Um thunk que lê ou atualiza alguma memória persistente entre chamadas pode se comportar de forma diferente dependendo do que veio antes.
Seu resultado pode depender de mais do que apenas seus argumentos.

Por exemplo, um _contador_ que recebe uma função e a invoca com a contagem atual, avançando a contagem a cada vez:

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

`tick` invoca a função dada com a contagem atual como argumento e depois avança a contagem.
Assim, uma primeira chamada `tick(square)` invoca `square(0)`, a chamada seguinte `tick(square)` invoca `square(1)`, a próxima `square(2)`, e assim por diante.

Outro exemplo seria uma _computação adiada_:

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

`delay` recebe uma função e um valor, armazena ambos e retorna `invoke`.
Quando `invoke` é chamada, ela executa a função capturada com o argumento salvo.

Muitos dos padrões comuns em linguagens de nível mais alto, como callbacks, métodos virtuais, geradores, currying, composição de funções e vários outros, baseiam-se em thunks combinados com estado persistente.
