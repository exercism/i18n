# Introducción

En un concepto anterior se mencionó que tanto las etiquetas locales como las funciones no son más que direcciones dentro de una sección con código ejecutable, como `section .text`.

De hecho, las funciones se pueden manipular igual que cualquier dirección de memoria: se pueden cargar en registros, pasar de un lado a otro y guardar en memoria.
También es posible usar `call` o `jmp` para transferir la ejecución a una función que está guardada en un registro o en memoria:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

Una dirección de función que se pasa de un lado a otro como un valor se llama **thunk**.
Los thunks son un componente básico de la **programación de orden superior** en ensamblador: código que opera sobre otro código.

## El código como datos

Las direcciones de funciones también se pueden guardar en memoria y recuperar más tarde:

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

`save_op` escribe en `cached_fn` la dirección de la función que recibe.
El valor sigue ahí después de que `save_op` termina, así que cualquier llamada posterior a `apply_op` salta de cola a la dirección que se haya guardado por última vez.
Esto hace posible cambiar qué función invoca `apply_op` en tiempo de ejecución.

## Tablas de despacho

Guardar direcciones de funciones en un array permite seleccionar distintas funciones según un índice, que puede depender de una condición en tiempo de ejecución.
Esto se llama **tabla de despacho**:

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

## Thunks con estado

Un thunk que lee o actualiza cierta memoria persistente entre llamadas puede comportarse de forma distinta según lo que haya pasado antes.
Su resultado puede depender de algo más que sus argumentos.

Por ejemplo, un _contador_ que toma una función y la invoca con el recuento actual, avanzando el recuento cada vez:

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

`tick` invoca la función dada con el recuento actual como su argumento y luego avanza el recuento.
Así, una primera llamada `tick(square)` invoca `square(0)`, la siguiente llamada `tick(square)` invoca `square(1)`, la siguiente `square(2)`, y así sucesivamente.

Otro ejemplo sería un _cálculo diferido_:

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

`delay` toma una función y un valor, los guarda y devuelve `invoke`.
Cuando se llama a `invoke`, esta ejecuta la función capturada con el argumento guardado.

Muchos de los patrones comunes en lenguajes de más alto nivel, como callbacks, métodos virtuales, generadores, currificación, composición de funciones y muchos otros, se construyen sobre thunks combinados con estado persistente.
