# Introdução

## Classes

Chegou a hora de conhecer um dos paradigmas centrais do C++: a programação orientada a objetos (POO).
A POO gira em torno de `classes`, tipos de dados definidos pelo usuário com seu próprio conjunto de funções relacionadas.
Vamos começar pelo básico e, mais adiante na árvore do programa de estudos, vamos cobrir tópicos mais avançados.

### Membros

As classes podem ter **variáveis membro** e **funções membro**.
Elas são acessadas pelo operador de **seleção de membro** `.`.
Assim como as variáveis fora das `classes`, é recomendável inicializar as variáveis membro com um valor no momento da declaração.
Esse valor passa a ser o padrão para os objetos recém-criados dessa classe.

### Encapsulamento e ocultação de informação

As classes oferecem a opção de restringir o acesso aos seus membros.
Os dois `access specifiers` básicos são `private` e `public`.
Membros `private` não são acessíveis de fora da classe.
Membros `public` podem ser acessados livremente.
Todos os membros de uma `class` são `private` por padrão.
Só os membros marcados explicitamente com `public` são livremente utilizáveis fora da classe.

### Exemplo básico

A definição de uma `class` pode ser vista no exemplo a seguir.
Repare no `;` depois da definição:

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

Você pode acessar todas as variáveis membro de dentro da classe.
Dê uma olhada em `damage` dentro da função `cast_spell`.
Você não pode ler nem alterar membros `private` fora da classe:

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

Os construtores oferecem a possibilidade de atribuir valores às variáveis membro no momento da criação do objeto.
Eles têm o mesmo nome da `class` e não têm tipo de retorno.
Uma classe pode ter vários construtores.
Isso é útil quando você nem sempre precisa definir todas as variáveis.
Às vezes você pode querer manter tudo no padrão, mas mudar a variável `name`.
No caso de um Wizard importante, talvez você queira mudar o dano também, então precisa de dois `constructors`.

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

Construtores são um assunto extenso e cheio de nuances.
Se você não definir explicitamente um `constructor` para a sua `class`, aí sim o compilador faz o trabalho por você.
Foi o que aconteceu no primeiro exemplo acima.
O objeto _silverhand_ é criado chamando o construtor padrão, sem passar argumentos.
Todas as variáveis recebem o valor declarado na definição da classe.
Se você não tivesse dado nenhum valor nessa definição, as variáveis poderiam ficar sem inicialização, o que pode ter consequências indesejadas.

~~~~exercism/note
## Structs

Os structs vêm das raízes originais da linguagem no C e são tão antigos quanto o próprio C++.
Eles são, na prática, a mesma coisa que `classes`, com uma exceção importante.
Por padrão, tudo em uma `class` é `private`.
Já os structs são `public` até que se defina o contrário.
Por convenção, a palavra-chave `struct` costuma ser usada para **estruturas que só carregam dados**.
A palavra-chave `class` é preferida para objetos que precisam garantir certas propriedades.
Um desses invariantes poderia ser que o `damage` da sua `class` `Wizard` não possa ficar negativo.
A variável `damage` é privada, e qualquer função que altere o dano garantiria que o invariante fosse preservado.
~~~~
