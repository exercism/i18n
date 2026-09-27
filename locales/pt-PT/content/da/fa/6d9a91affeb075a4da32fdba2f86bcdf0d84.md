# Introdução

Num conceito anterior, foi mencionado que tanto os rótulos locais como as funções são apenas endereços numa secção com código executável, como `section .text`.

De facto, as funções podem ser manipuladas da mesma forma que qualquer endereço de memória, ou seja, podem ser carregadas para registos, passadas de um lado para o outro e guardadas na memória.
Também é possível usar `call` ou `jmp` para transferir a execução para uma função guardada num registo ou na memória:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Um endereço de função que é passado de um lado para o outro como valor chama-se **thunk**.
Os thunks são um bloco de construção da **programação de ordem superior** em assembly: código que opera sobre outro código.

## Código como dados

Os endereços de função também podem ser guardados na memória e recuperados mais tarde:

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

O `save_op` escreve o endereço de função que recebe em `cached_fn`.
O valor persiste depois de o `save_op` devolver, por isso qualquer chamada posterior a `apply_op` faz um salto em cauda para o último endereço que foi guardado.
Isto torna possível mudar a função que o `apply_op` invoca em tempo de execução.

## Tabelas de despacho

Guardar endereços de função num array torna possível selecionar funções diferentes de acordo com um determinado índice, que pode depender de uma condição determinada em tempo de execução.
Isto chama-se uma **tabela de despacho**:

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

Um thunk que lê ou atualiza memória persistente entre chamadas pode comportar-se de forma diferente consoante o que aconteceu antes.
O seu resultado pode depender de mais do que apenas os seus argumentos.

Por exemplo, um _contador_ que recebe uma função e a invoca com a contagem atual, avançando a contagem de cada vez:

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

O `tick` invoca a função dada com a contagem atual como argumento e depois avança a contagem.
Assim, uma primeira chamada `tick(square)` invoca `square(0)`, a chamada seguinte `tick(square)` invoca `square(1)`, a seguinte `square(2)`, e assim por diante.

Outro exemplo seria um _cálculo adiado_:

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

O `delay` recebe uma função e um valor, guarda-os e devolve o `invoke`.
Quando o `invoke` é chamado, executa a função capturada com o argumento guardado.

Muitos dos padrões comuns em linguagens de nível mais alto, como callbacks, métodos virtuais, geradores, currying, composição de funções e muitos outros, assentam em thunks associados a estado persistente.
