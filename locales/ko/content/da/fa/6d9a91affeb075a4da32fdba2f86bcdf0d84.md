# 소개

이전 개념에서, 로컬 레이블과 함수는 모두 `section .text`처럼 실행 가능한 코드가 담긴 섹션 안의 주소일 뿐이라고 언급했어요.

실제로 함수는 다른 메모리 주소와 똑같은 방식으로 다룰 수 있어요. 즉, 레지스터에 불러오거나, 여기저기 전달하거나, 메모리에 저장할 수 있죠. `call`이나 `jmp`를 사용해 레지스터나 메모리에 저장된 함수로 실행을 옮기는 것도 가능해요:

```x86asm
section .text
sum_op:
    lea rax, [rdi + rsi] ; loads the sum rdi + rsi into rax
    ret

apply_sum:
    lea rax, [rel sum_op]
    jmp rax   ; tail call
```

값처럼 전달되는 함수 주소를 **썽크**라고 해요.
썽크는 어셈블리에서 **고차 프로그래밍**, 즉 다른 코드를 다루는 코드를 만들어 내는 기본 구성 요소예요.

## 데이터로서의 코드

함수 주소는 메모리에 저장했다가 나중에 다시 꺼낼 수도 있어요:

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

`save_op`는 전달받은 함수 주소를 `cached_fn`에 써요.
이 값은 `save_op`가 반환된 뒤에도 남아 있으므로, 나중에 `apply_op`를 호출하면 마지막으로 저장된 주소로 꼬리 점프해요.
덕분에 실행 중에 `apply_op`가 호출할 함수를 바꿀 수 있어요.

## 디스패치 테이블

함수 주소를 배열에 저장하면, 실행 중 조건에 따라 달라질 수도 있는 어떤 인덱스에 따라 서로 다른 함수를 선택할 수 있어요.
이것을 **디스패치 테이블**이라고 해요:

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

## 상태를 지닌 썽크

호출 사이에 어떤 지속되는 메모리를 읽거나 갱신하는 썽크는, 그 앞에 무슨 일이 있었는지에 따라 다르게 동작할 수 있어요.
그 결과는 인자만으로는 결정되지 않을 수 있죠.

예를 들어, 함수를 받아서 현재 카운트와 함께 호출하고 호출할 때마다 카운트를 하나씩 늘리는 _카운터_를 생각해봐요:

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

`tick`은 주어진 함수를 현재 카운트를 인자로 하여 호출한 다음, 카운트를 증가시켜요.
그래서 처음 `tick(square)`를 호출하면 `square(0)`이 호출되고, 다음 `tick(square)`는 `square(1)`을, 그다음은 `square(2)`를 호출하는 식이에요.

또 다른 예로는 _지연 계산_이 있어요:

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

`delay`는 함수와 값을 받아서 저장한 뒤 `invoke`를 반환해요.
`invoke`가 호출되면, 저장해 둔 함수를 저장해 둔 인자와 함께 실행해요.

고수준 언어에서 흔히 쓰이는 콜백, 가상 메서드, 제너레이터, 커링, 함수 합성 등 많은 패턴은 지속 상태와 짝을 이룬 썽크를 바탕으로 만들어져요.
