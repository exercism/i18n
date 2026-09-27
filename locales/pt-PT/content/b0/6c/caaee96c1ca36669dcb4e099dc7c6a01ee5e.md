# Introdução

Uma única instrução pode parecer uma ação indivisível sem o ser de todo.
Vejamos o caso de somar cinco a um valor na memória:

```x86asm
add qword [rel counter], 5
```

Por baixo, o processador não tem forma de somar diretamente à memória.
Divide esta única instrução em três passos mais pequenos, chamados **micro-operações**:

1. **ler** o valor atual da memória;
2. **modificar** esse valor num registo, somando-lhe cinco;
3. **escrever** o resultado de volta.

```x86asm
mov rax, qword [rel counter] ; 1. load the current value
add rax, 5                   ; 2. add five
mov qword [rel counter], rax ; 3. store the result back
```

Este é um padrão comum chamado **read-modify-write (RMW)**.

Repara que a leitura (ou load) e a escrita (ou store) são eventos separados, pelo que existe uma janela de tempo entre eles.
Normalmente não damos por isso porque, num único núcleo, está garantido que cada instrução produz o seu efeito por completo antes da seguinte.
Essa janela é, por isso, invisível, e o `add` comporta-se como uma única unidade.

No entanto, os CPUs modernos raramente têm um só núcleo, e as aplicações correm muitas vezes em vários núcleos ao mesmo tempo, sem qualquer sequenciação entre eles.
Com vários núcleos a correr no mesmo instante, outro núcleo pode ler ou escrever o `counter` dentro dessa janela, depois do load deste núcleo e antes do seu store.
Duas threads carregam cada uma o mesmo valor antigo, somam-lhe cinco e guardam o resultado.
Aconteceram duas somas, mas o valor só avançou cinco.
Uma atualização perdeu-se silenciosamente.

Isto é uma **data race**, e é um problema comum em código com várias threads.

Nem todos os valores estão expostos desta forma.
Cada thread tem os seus próprios registos e a sua própria pilha, por isso um valor guardado num registo, ou uma variável local na pilha de uma thread, é exclusivo dessa thread e não pode sofrer uma data race.
Só a memória que as threads partilham, como o `counter` acima, precisa de proteção.

O x86-64 oferece um conjunto de instruções para resolver este problema, tornando uma instrução indivisível.
Ela comporta-se como uma única unidade não só para o núcleo que a processa, mas também para todos os outros núcleos.
Uma operação que se mantém una, que nenhum outro núcleo consegue dividir, chama-se **atómica**.

~~~~exercism/note
É comum chamar multi-thread a aplicações que correm em vários núcleos.
No entanto, uma **thread** não é o mesmo que um núcleo.
Duas threads podem correr em simultâneo no mesmo núcleo, intercalando-se uma com a outra, ou em paralelo em núcleos diferentes.

Threads intercaladas já podem sofrer uma data race num read-modify-write se este estiver dividido em várias instruções, uma vez que o sistema operativo pode alternar entre threads entre duas instruções quaisquer.
A janela dentro de uma _única_ instrução, no entanto, só é exposta por código verdadeiramente paralelo.
Como o sistema operativo só alterna entre threads entre instruções, nunca dentro de uma, uma única instrução é intrinsecamente segura num único núcleo.

A verdadeira atomicidade em _vários_ núcleos é o que as instruções abaixo proporcionam.
~~~~

## Troca Atómica

A instrução `xchg` troca dois operandos.
O operando de destino fica igual ao valor anterior do operando de origem, enquanto o operando de origem fica igual ao valor anterior do operando de destino.
Conceptualmente, pode ser vista como duas instruções `mov` a acontecer ao mesmo tempo.

Como habitualmente, pode ser usada com dois operandos de registo ou com um operando de memória e um operando de registo:

```x86asm
mov  eax, 1
xchg dword [rdi], eax ; [rdi] = 1, eax = the old value of [rdi]
mov ecx, 2
mov edx, 3
xchg edx, ecx         ; edx = 2, ecx = 3
```

Quando é usada com um operando de memória, a `xchg` é _sempre_ atómica.

~~~~exercism/caution
A `xchg` é automaticamente atómica quando um dos operandos é uma posição de memória.
Isso também significa que a operação é muito mais lenta nessa situação.

Se não precisares de atomicidade, faz a troca através de um registo livre com instruções `mov` simples.
~~~~

## O prefixo lock

A forma mais comum de tornar uma instrução atómica em x86-64 é acrescentar o prefixo `lock`.
Ele funde a leitura, a modificação e a escrita num único passo indivisível.
Isto significa que o núcleo detém a memória em exclusivo durante todo o processo, pelo que nenhum outro núcleo pode ler ou escrever nessa posição entretanto.

```x86asm
lock add qword [rel counter], 5 ; the read, the modify, and the write are one step
```

O `lock` só funciona quando o destino é memória, e apenas em instruções que fazem read-modify-write a essa memória:

1. operações aritméticas, como `add`, `sub`, `inc`, `dec`, `neg`;
2. operações bit a bit, como `and`, `or`, `xor`, `not`;
3. as operações de bits `bts`, `btr`, `btc`;
4. algumas outras instruções dedicadas, como `xadd` e `cmpxchg`, descritas abaixo.

~~~~exercism/caution
Deter uma posição em exclusivo e manter todos os outros núcleos de fora não sai de graça.
Uma operação com o prefixo `lock` é bastante mais lenta do que a sua forma simples, e ainda mais lenta quando vários núcleos disputam a mesma posição.

Este prefixo deve ser reservado para memória que se espera que seja alterada por mais do que uma thread.
Evita usá-lo se a memória não for partilhada ou se for apenas lida.
~~~~

## Troca e Soma

Um `lock add` simples atualiza a memória mas deita fora o valor antigo.
Muitas vezes o valor antigo é exatamente o que se quer, por exemplo para dar a cada thread um número de senha distinto.

A instrução `xadd` (`x` de exchange) devolve o valor anterior ao mesmo tempo que soma.
Escreve a soma no destino e deixa o valor original do destino no registo de origem.

```x86asm
mov  rax, 1
lock xadd qword [rdi], rax ; [rdi] = [rdi] + rax = [rdi] + 1
                           ; rax = the old value of [rdi]
```

Com o prefixo `lock`, isto é um **fetch-and-add** atómico.
Executado por muitas threads sobre o mesmo contador, cada chamada devolve um valor antigo diferente.

Tal como com o `lock add`, o contador acaba no número exato de chamadas.
No entanto, ao contrário do `lock add`, todos os valores intermédios são também devolvidos, um a cada chamador.

## Comparação e Troca

O `xadd` soma e o `xchg` sobrescreve, mas nenhum deles consegue fazer com que o novo valor dependa do atual e só o aplicar se nada tiver mudado por baixo.
Essa atualização condicional é o que o `cmpxchg`, ou compare-and-exchange, proporciona, e é a mais geral destas primitivas.

O `cmpxchg dest, src` usa o `rax` como acumulador implícito e compara-o com o `dest`:

- Se `dest == rax`, então `dest = src` e `ZF = 1`.
- Se `dest != rax`, então `rax = dest` e `ZF = 0`.

Repara que o `dest` só é atualizado quando é igual ao valor esperado, previamente carregado para o `rax`.
Essa igualdade garante que o `dest` ainda contém o valor a partir do qual o novo foi calculado, pelo que nunca se aplica uma atualização baseada numa leitura desatualizada.
Isso faz do `cmpxchg` a base de uma atualização atómica, também conhecida como **compare-and-swap (CAS)**:

```x86asm
    mov rax, qword [rdi]          ; rax = the value we expect to find
.retry:
    lea rcx, [rax + 10]           ; rcx = the new value we want to install
    lock cmpxchg qword [rdi], rcx ; if [rdi] still equals rax, store rcx and set ZF
                                  ; otherwise reload rax with the current value, clear ZF
    jnz  .retry                   ; ZF is cleared, so another thread won the race. Recompute and retry
```

Este **ciclo de repetição** é o coração das atualizações lock-free.
A janela entre a leitura e o compare-and-exchange é exatamente quando outra thread pode intervir, e o `cmpxchg` deteta isso ao recusar guardar um valor calculado a partir de uma leitura desatualizada.

## Ordenação de Memória

Todas as operações até aqui tocaram numa única posição.
Quando as threads coordenam através de mais do que uma posição, surge uma nova questão: por que ordem é que as escritas de uma thread se tornam visíveis para outra.
As regras que respondem a esta questão são a **memory ordering** do processador.

O conceito de branchless code introduziu a ideia de que um núcleo moderno não avança pelas instruções uma a uma.
Mantém muitas em curso ao mesmo tempo e adianta-se onde pode.
Isto significa que uma escrita pode tornar-se visível para os outros núcleos mais tarde do que o programa sugere, enquanto as instruções seguintes já avançaram.

O x86-64 mantém uma **strong memory ordering** entre leituras e escritas normais, de modo que, em cada núcleo:

1. uma leitura nunca é reordenada depois de uma leitura posterior;
2. uma escrita nunca é reordenada depois de uma escrita posterior;
3. uma leitura nunca é reordenada depois de uma escrita posterior.

A única reordenação possível é uma escrita parecer concluir-se depois de uma leitura posterior de um endereço _diferente_.

Uma instrução com o prefixo `lock`, ou uma `xchg` com um operando de memória, é uma barreira completa: nada parece atravessá-la em qualquer dos sentidos.
É por isso que são suficientes para garantir a ordenação completa na maioria das situações.

## Espera ativa e `pause`

As instruções que definem um flag e devolvem também o seu estado anterior são conhecidas como **test-and-set**.
Podem ser usadas como base de um **spinlock**, garantindo que um núcleo tem acesso exclusivo a uma parte do código.

Este é o algoritmo global, usando a instrução `xchg` com um flag binário:

1. O flag começa em `0`.
2. Para adquirir o lock, um núcleo troca o valor do flag com `1`.
3. Se o valor devolvido for `1`, isso significa que o lock está _detido_ por outro núcleo.
   O núcleo atual espera então e tenta adquirir o lock novamente.
4. Se o valor devolvido for `0`, isso significa que o lock estava livre.
   O `xchg` definiu-o agora como `1`, e os outros núcleos vão esperar até este núcleo o libertar.
5. Quando o núcleo atual termina o trabalho, atualizar o flag com `0` liberta o lock.

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

A instrução `pause` no ciclo de espera não altera o que o código calcula.
Dá uma indicação ao processador de que se trata de uma espera ativa.
O CPU pode então reduzir o consumo de energia da thread em espera e ceder a uma thread irmã que partilhe o mesmo núcleo.
Um ciclo de espera ativa sem `pause` continua a ser correto, apenas desperdiça recursos.

Quando a thread termina o seu trabalho, pode libertar o lock com uma escrita simples de `0` usando `mov`.
Não é preciso mais do que um `mov`, porque no x86-64 as leituras e escritas nunca são reordenadas depois de uma escrita posterior.
Diz-se que uma escrita que nunca ultrapassa os acessos anteriores tem **release ordering**, e, no x86, todas as escritas simples a possuem.

~~~~exercism/note
Qualquer instrução que teste e defina atomicamente uma posição de memória pode ser usada num spinlock.
Por exemplo, pode usar-se `lock bts` em vez de `xchg`, para definir um bit específico enquanto se verifica se já estava definido.

Repara que os flags, como o `CF` modificado pelo `bts`, fazem parte de `rflags`, um registo.
Isso significa que são exclusivos de cada thread.
~~~~
