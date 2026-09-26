# Introdução

## Terminologia

Você já usou e escreveu funções em C++ em alguns conceitos.
É hora de entrar na parte técnica.
O trecho de código abaixo mostra os termos mais comuns para facilitar a consulta.
Como C++ ignora espaços em branco, a formatação foi alterada para colocar cada elemento em uma única linha.

```cpp
// Function declaration:
bool                                              // Return type
admin_detected(string user, string password)      // Type signature
;                                                 // Don't forget the ';' for the declaration

// Function definition:
bool                                              // Return type
admin_detected                                    // Function name
(string user, string password)                    // Parameter list
{ return user == "admin" && password == "1234"; } // Function body
```
~~~~exercism/advanced
A declaração funciona como um aviso ao compilador de que existe uma função com aquele nome, tipo de retorno e lista de parâmetros.
O código não vai funcionar se a definição estiver faltando.
As declarações são opcionais; elas são necessárias se você usar a função antes da definição.
As declarações podem resolver problemas como referências cíclicas e podem ser usadas para separar a interface da implementação.
~~~~

## O qualificador const

Às vezes você quer garantir que os valores não possam ser alterados depois de inicializados.
C++ usa a palavra-chave `const` como qualificador para constantes.

```cpp
const int number_of_dragon_balls{7};
number_of_dragon_balls--; // compilation error
```

~~~~exercism/note
Você vai ver constantes escritas em _UPPER_SNAKE_CASE_ com frequência.
É recomendável reservar esse estilo de escrita para macros, caso não haja outra convenção.
~~~~

Se você tentar alterar uma variável constante depois de definida, seu código não vai compilar.
Isso ajuda a evitar alterações acidentais e também abre possibilidades de otimização para o compilador.
Como pessoa, também é mais fácil raciocinar sobre o código quando você sabe que certas partes não serão afetadas.

Você também pode usar `const` como qualificador para parâmetros de função.

```cpp
string guess_number(const int& secret, const int& guess) {
    if (secret < guess) return "lower.";
    if (secret > guess) return "higher.";
    return "exact!";
}
```

Quando você passa uma referência `const` para a função, pode ter certeza de que ela será deixada inalterada.
Você vai ver referências `const` com frequência para objetos que podem ser caros de copiar, como strings mais longas.
Um terceiro caso de uso do qualificador `const` são funções membro que não alteram a instância de uma classe.

```cpp
class Stubborn {
    public:
    Stubborn(string reply) {
        response = reply;
    }
    string answer(const string& question) const {
        if (question.length() == 0) { return ""; }
        return response;
    }
    private:
    string response{};
};
```

A função membro `answer` de `Stubborn` usa uma referência `const string&` como parâmetro.
Isso evita uma operação de cópia do objeto original que foi passado para a função.

## Sobrecarga de funções

Várias funções podem ter o mesmo nome se a lista de parâmetros for diferente.
Isso se chama sobrecarga de funções e normalmente é feito quando essas funções realizam tarefas muito parecidas.

O cabeçalho da função sem o tipo de retorno é a __assinatura de tipo__ da função.
Uma mudança na assinatura de tipo resulta em uma nova função.

O exemplo `play_sound` tem seis sobrecargas diferentes para atender a cenários diferentes:

```cpp
// different argument types:
void play_sound(char note);         // C, D, E, ..., B
void play_sound(string solfege);    // do, re, mi, ..., ti
void play_sound(int jianpu);        // 1, 2, 3, ..., 7

// different number of arguments:
void play_sound(string solfege, double duration);

// different qualifiers:
void play_sound(vector<string>& solfege);
void play_sound(const vector<string>& solfege);
```

~~~~exercism/advanced
A assinatura de tipo é definida pelo nome da função, pelo número de parâmetros, pelos tipos deles e pelos qualificadores deles (mas não pelos nomes).
O tipo de retorno explicitamente não faz parte da assinatura de tipo, e você vai receber erros de compilação se tiver duas funções que diferem apenas no tipo de retorno.
O compilador vai reclamar porque não fica claro qual das duas deve ser usada.
~~~~

## Argumentos padrão

Algumas funções podem ficar muito longas, e muitas das suas chamadas podem usar os mesmos valores para a maioria dos parâmetros.
A repetição nessas chamadas pode ser evitada com argumentos padrão.

```cpp
void record_new_horse_birth(string name, int weight, string color="brown-ish", string dam="Alruccaba", string sire="Poseidon");

record_new_horse_birth("Urban Sea", 130); // color will be brown, dam "Alruccabam", sire "Poseidon"
record_new_horse_birth("Highclere", 175, "off-white", "Fall Aspen");   // sire will be "Poseidon"
```

Como a declaração da função costuma ser lida antes da definição, ela é o melhor lugar para definir os argumentos padrão.
Se um parâmetro tem uma declaração padrão, todos os parâmetros à sua direita também precisam de uma declaração padrão.
Às vezes, sobrecargas complicadas de funções podem ser refatoradas para menos funções com argumentos padrão, a fim de melhorar a manutenibilidade.
