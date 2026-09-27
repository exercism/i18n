# Sobre

Os especificadores de classe de armazenamento dizem respeito à forma como as variáveis são armazenadas na memória.
Estão intimamente ligados à duração de armazenamento (também designada por tempo de vida) de um valor.

## auto: a classe de armazenamento predefinida para variáveis de âmbito de função ou de bloco

Como as variáveis definidas dentro de um bloco ou de uma função são `auto` por predefinição, não é comum usar o termo de forma explícita.
Outra razão pela qual o `auto` é muitas vezes evitado é o facto de ter um significado diferente em C++.
Bases de código que combinam C e C++ podem tornar-se menos confusas se evitarem o especificador de armazenamento `auto`.
O tempo de vida de uma variável `auto` começa quando se entra no seu bloco e termina quando se sai dele.
Quando se entra no bloco de uma variável `auto`, é-lhe atribuída memória, _mas sem qualquer valor predefinido_.
Uma exceção são os arrays de comprimento variável (VLAs).
A alocação de um VLA acontece no ponto do bloco onde é declarado ou definido e termina quando se sai desse bloco.
Uma variável `auto` pode ser inicializada com qualquer expressão válida.

## static: o especificador de armazenamento que não se deve confundir com o tipo de ligação static

Uma variável definida fora de um bloco ou de uma função tem âmbito de ficheiro e tem sempre duração de armazenamento estática.
Âmbito de ficheiro significa que pode ser acedida em qualquer ponto do ficheiro.
Armazenamento estático significa que existe desde o início da execução do programa até ao fim.
A menos que seja inicializada explicitamente, uma variável `static` é inicializada com o seu valor zero predefinido.
Se uma variável de âmbito de ficheiro estiver marcada com `static`, o `static` refere-se à sua ligação.
Uma variável de âmbito de ficheiro marcada com `static` tem ligação interna, o que significa que só pode ser acedida dentro do ficheiro.
Se uma variável for definida dentro de uma função, ou num bloco dentro de uma função, e estiver marcada com `static`, tem duração de armazenamento `static`.
O valor da variável `static` mantém-se entre chamadas à função ou ao bloco.

No exemplo seguinte vemos duas variáveis `static` em ação.
A primeira variável `count` é definida dentro da função `print_stuff` e conserva o seu valor entre chamadas à função.
A segunda variável `count` é definida dentro de um bloco arbitrário e oculta (ou sombreia) a primeira variável `count` dentro do seu bloco.
A segunda variável `count` conserva o seu valor de forma independente entre entradas no bloco.

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

Se uma variável `static` for inicializada explicitamente, isso tem de ser feito com uma expressão constante.
Uma expressão constante é aquela que pode ser avaliada em tempo de compilação.

## extern: como aceder a uma variável noutra unidade de tradução

Uma unidade de tradução é constituída por um ficheiro de código-fonte e por qualquer outro ficheiro que este inclua com `#include`.
Embora uma variável com âmbito de ficheiro possa ser declarada e inicializada como `extern`, a palavra-chave `extern` é normalmente usada para referir uma variável já existente, e não para definir uma nova.
A variável referida por `extern` tem de ter âmbito de ficheiro.
Uma variável com âmbito de ficheiro tem sempre armazenamento `static`.
Uma variável num ficheiro incluído tem de ter ligação externa para poder ser acedida pelo ficheiro que a inclui.

No exemplo seguinte usamos a variável `val` declarada como `extern`, para que se refira à `val` definida no seu âmbito de ficheiro.
Ambos os usos de `extern` se chamam declarações de referência, uma vez que referem uma variável definida noutro local.

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

Uma saída destas demonstra que cada declaração de `val` sem `extern` é uma declaração de definição e é independente das outras declarações de `val`.
Remover por completo as declarações de `val` de `set_val` e de `main` daria origem a um erro de compilação, indicando que `val` não está declarada em `set_val` e em `main`.

Se uma variável referida como `extern` estiver no mesmo ficheiro, pode ter ligação interna ou externa.
Definir `val` como `static int val;` não teria qualquer efeito no uso de `val` em `set_val` ou `main`, exceto que a definição teria de ser movida para cima destas para compilar.
Mas se `val` fosse definida acima das funções, estas não precisariam de declarar `val` como `extern`.

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

O `static` poderia ser removido de `static int val;`, dando a `val` ligação externa, e `val` continuaria a funcionar da mesma forma em `set_val` e `main`.
Se outro ficheiro de código-fonte incluísse este ficheiro, só poderia usar `val` se `val` tivesse ligação externa (não declarada como `static`) e o outro ficheiro declarasse `extern int val;`.

Uma variável referida por `extern` não só tem de ter armazenamento `static`, como também tem de ter âmbito de ficheiro.
O exemplo seguinte muito provavelmente não compilará, porque a `val`, embora seja `static`, não tem âmbito de ficheiro.

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

Uma variável marcada como `register` expressa o desejo do programador de que o valor seja colocado num registo, para um acesso rápido.
Uma variável `register` é como uma variável `auto`, no sentido em que tem de estar no âmbito de uma função ou de um bloco.
Como o valor se destina a ser colocado num registo em vez de na memória, o compilador deve proibir o acesso ao endereço da variável, já que não é possível obter o endereço de um registo.
No entanto, um endereço de memória pode ele próprio ser colocado num registo.
O exemplo seguinte demonstra isso

```c
#include <stdio.h>

int main() {
    int i = 42;
    register int *i_ptr = &i;
    // prints i is 42, i_ptr is 0x7ffd0c2055c4 (or some other address)
    printf("i is %d, i_ptr is %p", i, i_ptr);
}
```

`register` é essencialmente uma sugestão, uma vez que os compiladores são livres de escolher se seguem ou não este especificador, pelo que o valor pode ou não acabar por ser colocado num registo.

## typedef: o especificador de classe de armazenamento que não é bem um

O `typedef` é descrito como um especificador de classe de armazenamento apenas por razões sintáticas.
Isto deve-se ao facto de um especificador de classe de armazenamento não poder ser usado com outro especificador de classe de armazenamento.
Por isso, `typedef auto int i = 42;` é tão ilegal como `static auto int i = 42;`.
