# Sobre

Os especificadores de classe de armazenamento têm a ver com a forma como as variáveis são armazenadas na memória.
Eles estão intimamente relacionados à duração de armazenamento (também chamada de tempo de vida) de um valor.

## auto: a classe de armazenamento padrão para variáveis de escopo de função ou de bloco

Como as variáveis definidas dentro de um bloco ou função são `auto` por padrão, não é comum usar o termo explicitamente.
Outro motivo pelo qual `auto` costuma ser evitado é que ele tem um significado diferente em C++.
Bases de código que combinam C e C++ podem ficar menos confusas se evitarem o especificador de armazenamento `auto`.
O tempo de vida de uma variável `auto` começa quando seu bloco é iniciado e termina quando seu bloco é encerrado.
Uma variável `auto` tem memória alocada para ela, _mas sem valor padrão_, quando seu bloco é iniciado.
Uma exceção são os arrays de tamanho variável (VLAs).
A alocação de um VLA acontece onde ele é declarado ou definido em seu bloco e termina quando seu bloco é encerrado.
Uma variável `auto` pode ser inicializada por qualquer expressão válida.

## static: o especificador de armazenamento que não deve ser confundido com o tipo de ligação static

Uma variável definida fora de um bloco ou função tem escopo de arquivo e sempre tem duração de armazenamento estática.
Escopo de arquivo significa que ela pode ser acessada em qualquer lugar do arquivo.
Armazenamento estático significa que ela existe desde o início da execução do programa até o fim.
A menos que seja inicializada explicitamente, uma variável `static` é inicializada com seu valor padrão zero.
Se uma variável de escopo de arquivo é marcada com `static`, o `static` se refere à sua ligação.
Uma variável de escopo de arquivo marcada como `static` tem ligação interna, o que significa que só pode ser acessada dentro do arquivo.
Se uma variável é definida dentro de uma função ou em um bloco dentro de uma função e é marcada como `static`, ela tem duração de armazenamento `static`.
O valor da variável `static` persiste entre chamadas à função ou ao bloco.

No exemplo a seguir, vemos duas variáveis `static` em ação.
A primeira variável `count` é definida dentro da função `print_stuff` e mantém seu valor entre chamadas à função.
A segunda variável `count` é definida dentro de um bloco arbitrário e esconde (ou sombreia) a primeira variável `count` dentro de seu bloco.
A segunda variável `count` mantém seu valor de forma independente entre entradas no bloco.

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

Se uma variável `static` é inicializada explicitamente, isso deve ser feito com uma expressão constante.
Uma expressão constante é aquela que pode ser avaliada em tempo de compilação.

## extern: como acessar uma variável em outra unidade de tradução

Uma unidade de tradução consiste em um arquivo-fonte e em qualquer outro arquivo que ele inclua por meio de `#include`.
Embora uma variável com escopo de arquivo possa ser declarada e inicializada como `extern`, a palavra-chave `extern` costuma ser usada para se referir a uma variável existente, não para definir uma nova.
A variável referida por `extern` deve ter escopo de arquivo.
Uma variável em escopo de arquivo sempre tem armazenamento `static`.
Uma variável em um arquivo incluído deve ter ligação externa para ser acessada pelo arquivo que a inclui.

No exemplo a seguir, usamos a variável `val` declarada como `extern` para que ela se refira a `val` definida em seu escopo de arquivo.
Ambos os usos de `extern` são chamados de declarações de referência, já que referenciam uma variável definida em outro lugar.

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

Se ambas as palavras-chave `extern` fossem removidas, o programa poderia imprimir algo como

```
val is 22038
val is 42
```

Uma saída como essa demonstra que cada declaração de `val` sem `extern` é uma declaração de definição e é independente das outras declarações de `val`.
Remover completamente as declarações de `val` de `set_val` e `main` resultaria em um erro de compilação dizendo que `val` não foi declarado em `set_val` e `main`.

Se uma variável referida como `extern` estiver no mesmo arquivo, ela pode ter ligação interna ou externa.
Definir `val` como `static int val;` não teria efeito sobre o uso de `val` em `set_val` ou `main`, exceto que a definição precisaria ser movida para cima delas para compilar.
Mas se `val` fosse definida acima das funções, elas não precisariam declarar `val` como `extern`.

O seguinte funcionaria

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

O `static` poderia ser removido de `static int val;`, dando a `val` ligação externa, e `val` ainda funcionaria da mesma forma em `set_val` e `main`.
Se outro arquivo-fonte incluísse este arquivo, ele só poderia usar `val` se `val` tivesse ligação externa (não declarada como `static`) e o outro arquivo declarasse `extern int val;`.

Uma variável referida por `extern` não só deve ter armazenamento `static`, como também deve ter escopo de arquivo.
O exemplo a seguir provavelmente não vai compilar, porque `val`, embora seja `static`, não tem escopo de arquivo.

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

## register: como possivelmente acelerar o acesso a uma variável

Uma variável marcada como `register` expressa o desejo do programador de ter o valor colocado em um registrador para acesso rápido.
Uma variável `register` é como uma variável `auto`, no sentido de que deve estar no escopo de função ou de bloco.
Como o valor deve ser colocado em um registrador em vez da memória, o compilador deve desautorizar o acesso ao endereço da variável, já que não é possível obter o endereço de um registrador.
No entanto, um endereço de memória em si pode ser colocado em um registrador.
O exemplo a seguir demonstra isso

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

`register` é essencialmente uma dica, já que os compiladores são livres para escolher se seguem ou não esse especificador, então o valor pode ou não ser de fato colocado em um registrador.

## typedef: o especificador de classe de armazenamento que na verdade não é

`typedef` é descrito como um especificador de classe de armazenamento apenas por razões sintáticas.
Isso porque um especificador de classe de armazenamento não pode ser usado com outro especificador de classe de armazenamento.
Então, `typedef auto int i = 42;` é tão ilegal quanto `static auto int i = 42;`.
