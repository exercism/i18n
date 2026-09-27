# Introdução

## Classes

Está na altura de abordar um dos paradigmas centrais do C++: a programação orientada a objetos (POO).
A POO gira em torno das `classes`: tipos de dados definidos pelo utilizador, com o seu próprio conjunto de funções relacionadas.
Vamos começar pelo básico e abordar tópicos mais avançados mais adiante na árvore do currículo.

### Membros

As classes podem ter **variáveis membro** e **funções membro**.
O acesso faz-se com o operador de **seleção de membro** `.`.
Tal como acontece com as variáveis fora das `classes`, é aconselhável inicializar as variáveis membro com um valor na sua declaração.
Esse valor passa então a ser o predefinido para os objetos recém-criados desta classe.

### Encapsulamento e ocultação de informação

As classes permitem restringir o acesso aos seus membros.
Os dois `access specifiers` básicos são `private` e `public`.
Os membros `private` não são acessíveis a partir do exterior da classe.
Acede-se livremente aos membros `public`.
Por predefinição, todos os membros de uma `class` são `private`.
Só os membros marcados explicitamente como `public` podem ser usados livremente fora da classe.

### Exemplo básico

A definição de uma `class` pode ver-se no exemplo seguinte.
Repara no `;` depois da definição:

```cpp
class Wizard {
  public:               // from here on all members are publicly accessible
    int cast_spell() {  // defines the public member function cast_spell
      return damage;
    }
    std::string name{}; // defines the public member variable `name`
  private:              // from here on all members are private
    int damage{5};      // defines the private member variable `damage`
};

```

Podes aceder a todas as variáveis membro a partir de dentro da classe.
Repara em `damage` dentro da função `cast_spell`.
Não podes ler nem alterar membros `private` fora da classe:

```cpp
Wizard silverhand{};
// calling the `cast_spell` function is okay, it is public:
silverhand.cast_spell();
// => 5

// name is public and can be changed:
silverhand.name = "Laeral";

// damage is private:
silverhand.damage = 500;
 // => Compilation error
```

### Construtores

Os construtores permitem atribuir valores às variáveis membro no momento da criação do objeto.
Têm o mesmo nome que a `class` e não têm tipo de retorno.
Uma classe pode ter vários construtores.
Isto é útil quando nem sempre precisas de definir todas as variáveis.
Às vezes podes querer manter tudo nos valores predefinidos e mudar apenas a variável `name`.
No caso de um Wizard poderoso, podes querer alterar também o dano, por isso precisas de dois `constructors`.

```cpp
class Wizard {
  public:
    Wizard(std::string new_name) {
      name = new_name;
    }
    Wizard(std::string new_name, int new_damage) {
      name = new_name;
      damage = new_damage;
    }
    int cast_spell() {
      return damage;
    }
    std::string name{};
  private:
    int damage{5};
};

Wizard el{"Eleven"};       // deals  5 damage
Wizard vecna{"Vecna", 50}; // deals 50 damage
```

Os construtores são um tema vasto e têm muitas nuances.
Se não definires explicitamente um `constructor` para a tua `class`, então (e só então) o compilador faz esse trabalho por ti.
Foi o que aconteceu no primeiro exemplo acima.
O objeto _silverhand_ é criado através da chamada ao construtor predefinido, sem passar argumentos.
Todas as variáveis ficam com o valor indicado na definição da classe.
Se não tiveres indicado nenhum valor nessa definição, as variáveis podem ficar não inicializadas, o que pode ter consequências indesejadas.

~~~~exercism/note
## Estruturas

As estruturas vêm das raízes originais da linguagem em C e são tão antigas como o próprio C++.
Na prática, são a mesma coisa que as `classes`, com uma exceção importante.
Por predefinição, tudo numa `class` é `private`.
As estruturas, por outro lado, são `public` até serem definidas de outra forma.
Por convenção, a palavra-chave `struct` é frequentemente usada para **estruturas apenas com dados**.
A palavra-chave `class` é preferida para objetos que precisam de garantir certas propriedades.
Um desses invariantes pode ser que o valor de `damage` na tua `class` `Wizard` não possa ficar negativo.
A variável `damage` é private e qualquer função que altere o dano garantiria que o invariante se mantém.
~~~~
