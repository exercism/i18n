# Introdução

Uma única instrução pode parecer uma ação indivisível, mas não é nada disso.
Veja o caso de somar cinco a um valor na memória:

```x86asm
add qword [rel counter], 5
```

Por baixo dos panos, o processador não tem como somar diretamente à memória.
Ele divide essa única instrução em três passos menores, chamados de **micro-operações**:

1. **ler** o valor atual da memória;
2. **modificar** esse valor em um registrador, somando cinco a ele;
3. **escrever** o resultado de volta.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Esse é um padrão comum chamado **leitura-modificação-escrita (RMW)**.

Repare que a leitura (ou load) e a escrita (ou store) são eventos separados, então existe uma janela de tempo entre eles.
Normalmente não percebemos isso porque, em um único núcleo, cada instrução tem a garantia de produzir seu efeito por completo antes da próxima.
Essa janela, portanto, fica invisível, e o `add` se comporta como uma unidade única.

No entanto, as CPUs modernas raramente têm um único núcleo, e as aplicações costumam rodar em vários núcleos ao mesmo tempo, sem nenhum sequenciamento entre eles.
Com vários núcleos rodando no exato mesmo instante, outro núcleo pode ler ou escrever o `counter` dentro dessa janela, depois do load deste núcleo e antes do seu store.
Duas threads carregam o mesmo valor antigo, cada uma soma cinco e cada uma armazena seu resultado.
Duas somas aconteceram, mas o valor avançou apenas cinco.
Uma atualização se perdeu em silêncio.

Isso é uma **corrida de dados**, e é um problema comum em código multithread.

Nem todo valor fica exposto desse jeito.
Cada thread tem seus próprios registradores e sua própria pilha, então um valor mantido em um registrador, ou uma variável local na pilha de uma thread, é exclusivo daquela thread e não pode sofrer corrida.
Só a memória que as threads compartilham, como o `counter` acima, precisa de proteção.

O x86-64 oferece um conjunto de instruções para resolver esse problema, tornando uma instrução indivisível.
Ela se comporta como uma unidade única não só para o núcleo que a processa, mas também para todos os outros núcleos.
Uma operação que se mantém inteira, que nenhum outro núcleo consegue dividir, é chamada de **atômica**.

~~~~exercism/note
É comum chamar de multithread as aplicações que rodam em vários núcleos.
No entanto, uma **thread** não é a mesma coisa que um núcleo.
Duas threads podem rodar ao mesmo tempo no mesmo núcleo, intercalando-se uma com a outra, ou em paralelo, em núcleos diferentes.

Threads intercaladas já podem sofrer corrida em uma leitura-modificação-escrita se ela for dividida em várias instruções, já que o sistema operacional pode alternar entre threads entre quaisquer duas instruções.
A janela dentro de uma _única_ instrução, porém, só fica exposta por código verdadeiramente paralelo.
Como o sistema operacional só alterna entre threads entre instruções, nunca dentro de uma, uma única instrução é inerentemente segura em um único núcleo.

A atomicidade de verdade entre _vários_ núcleos é o que as instruções abaixo oferecem.
~~~~

## Troca atômica

A instrução `xchg` troca dois operandos.
O operando de destino passa a ser igual ao valor anterior do operando de origem, enquanto o operando de origem passa a ser igual ao valor anterior do operando de destino.
Conceitualmente, dá para pensar nela como duas instruções `mov` acontecendo ao mesmo tempo.

Como de costume, ela pode ser usada com dois operandos de registrador ou com um operando de memória e um operando de registrador:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Quando usada com um operando de memória, a `xchg` é _sempre_ atômica.

~~~~exercism/caution
A `xchg` é automaticamente atômica quando um dos operandos é uma posição de memória.
Isso também significa que a operação é bem mais lenta nessa situação.

Se você não precisa de atomicidade, faça a troca por meio de um registrador livre, com instruções `mov` simples.
~~~~

## O prefixo `lock`

A forma mais comum de tornar uma instrução atômica no x86-64 é adicionar o prefixo `lock`.
Ele funde a leitura, a modificação e a escrita em um único passo indivisível.
Isso significa que o núcleo mantém a memória com exclusividade durante todo o processo, então nenhum outro núcleo consegue ler ou escrever naquela posição no meio do caminho.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

O `lock` só funciona quando o destino é a memória, e só em instruções que fazem leitura-modificação-escrita dessa memória:

1. operações aritméticas, como `add`, `sub`, `inc`, `dec`, `neg`;
2. operações bit a bit, como `and`, `or`, `xor`, `not`;
3. as operações de bits `bts`, `btr`, `btc`;
4. algumas outras instruções dedicadas, como `xadd` e `cmpxchg`, descritas abaixo.

~~~~exercism/caution
Manter uma posição com exclusividade e deixar todos os outros núcleos de fora não sai de graça.
Uma operação com o prefixo `lock` é bem mais lenta que sua forma simples, e mais lenta ainda quando vários núcleos disputam a mesma posição.

Esse prefixo deve ser reservado para memória que se espera que seja alterada por mais de uma thread.
Evite usá-lo se a memória não é compartilhada ou se ela só é lida.
~~~~

## Troca e soma

Um `lock add` simples atualiza a memória, mas joga fora o valor antigo.
Muitas vezes o valor antigo é exatamente o que se quer, por exemplo, para dar a cada thread um número de senha distinto.

A instrução `xadd` (o `x` de exchange) retorna o valor anterior enquanto soma.
Ela escreve a soma no destino e deixa o valor original do destino no registrador de origem.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Com o prefixo `lock`, isso é um **fetch-and-add** atômico.
Executada por muitas threads no mesmo contador, cada chamada retorna um valor antigo diferente.

Assim como no `lock add`, o contador termina no número exato de chamadas.
Porém, ao contrário do `lock add`, todo valor intermediário também é retornado, um para cada chamador.

## Comparação e troca

O `xadd` soma e o `xchg` sobrescreve, mas nenhum dos dois consegue fazer o novo valor depender do atual e aplicá-lo só se nada mudou por baixo.
Essa atualização condicional é o que o `cmpxchg`, compare-and-exchange, oferece, e é a mais geral dessas primitivas.

`cmpxchg dest, src` usa o `rax` como acumulador implícito e o compara com `dest`:

- Se `dest == rax`, `dest = src` e `ZF = 1`.
- Se `dest != rax`, `rax = dest` e `ZF = 0`.

Repare que `dest` só é atualizado quando é igual ao valor esperado, previamente carregado no `rax`.
Essa igualdade garante que `dest` ainda contém o valor a partir do qual o novo foi calculado, então uma atualização baseada em uma leitura desatualizada nunca é aplicada.
Isso faz do `cmpxchg` a peça fundamental de uma atualização atômica, também conhecida como **compare-and-swap (CAS)**:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Esse **laço de repetição** é o coração das atualizações lock-free.
A janela entre a leitura e a comparação e troca é exatamente quando outra thread pode interferir, e o `cmpxchg` percebe isso ao se recusar a armazenar um valor calculado a partir de uma leitura desatualizada.

## Ordenação de memória

Toda operação até aqui tocou uma única posição.
Quando as threads se coordenam por meio de mais de uma posição, surge uma nova pergunta: em que ordem as escritas de uma thread se tornam visíveis para outra.
As regras que respondem a essa pergunta são a **ordenação de memória** do processador.

O conceito de código sem ramificações apresentou a ideia de que um núcleo moderno não executa as instruções uma a uma, devagar.
Ele mantém muitas em execução ao mesmo tempo e avança adiante sempre que pode.
Isso significa que uma escrita pode se tornar visível para os outros núcleos mais tarde do que o programa sugere, enquanto as instruções seguintes já foram adiante.

O x86-64 mantém uma **ordenação de memória forte** entre loads e stores comuns, de modo que, em cada núcleo:

1. um load nunca é reordenado depois de um load posterior;
2. um store nunca é reordenado depois de um store posterior;
3. um load nunca é reordenado depois de um store posterior.

A única reordenação possível é um store parecer se completar depois de um load posterior de um endereço _diferente_.

Uma instrução com o prefixo `lock`, ou uma `xchg` com um operando de memória, é uma barreira completa: nada parece atravessá-la em nenhuma direção.
É por isso que elas bastam para garantir a ordenação completa na maioria das situações.

## Espera ocupada e `pause`

As instruções que definem uma flag e também retornam seu estado anterior são conhecidas como **test-and-set**.
Elas podem servir de base para um **spinlock**, garantindo que um núcleo tenha acesso exclusivo a alguma parte do código.

Este é o algoritmo geral, usando a instrução `xchg` com uma flag binária:

1. A flag começa em `0`.
2. Para adquirir o lock, um núcleo troca o valor da flag por `1`.
3. Se o valor retornado for `1`, isso significa que o lock está _em uso_ por outro núcleo.
   O núcleo atual então espera e tenta adquirir o lock de novo.
4. Se o valor retornado for `0`, isso significa que o lock estava livre.
   A `xchg` agora o definiu como `1`, e os outros núcleos vão esperar até este núcleo liberá-lo.
5. Quando o núcleo atual termina o trabalho, atualizar a flag com `0` libera o lock.

```x86asm
acquire:
    mov  eax, 1
    xchg dword [rdi], eax ; try to take the lock; eax = its old value
    test eax, eax
    jnz  .held            ; old value was 1: someone else holds it
    ret                   ; old value was 0: the lock is ours
.held:
    pause                 ; wait before trying again
    jmp  acquire
```

A instrução `pause` no laço de espera não muda o que o código calcula.
Ela dá uma dica ao processador de que se trata de uma espera ocupada.
A CPU pode então reduzir o consumo de energia na thread que espera e ceder a vez para uma thread irmã que compartilha o mesmo núcleo.
Um laço de espera ocupada sem `pause` continua correto, só é desperdício.

Quando a thread termina seu trabalho, ela pode liberar o lock com um store simples de `0` usando `mov`.
Nada além de um `mov` é necessário, porque no x86-64 loads e stores nunca são reordenados depois de um store posterior.
Diz-se que um store que nunca ultrapassa os acessos anteriores tem **ordenação de liberação**, e no x86 todo store simples a carrega.

~~~~exercism/note
Qualquer instrução que testa e define atomicamente uma posição de memória pode ser usada para um spinlock.
Por exemplo, `lock bts` pode ser usado em vez de `xchg`, para definir um bit específico enquanto verifica se ele já estava definido.

Repare que as flags, como a `CF` modificada pelo `bts`, fazem parte do `rflags`, um registrador.
Isso significa que elas são exclusivas de cada thread.
~~~~
