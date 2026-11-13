# Sobre

Os dois tipos principais de propriedades são:

1. Propriedades auto-implementadas, em que os acessadores `get` e `set` não têm corpo.
   Elas podem ou não ser inicializadas explicitamente.
   Por exemplo:

   ```csharp
   public int MyProperty { get; set; } = 42;
   ```

2. Aquelas em que os acessadores avaliam expressões e executam instruções.
   O código pode ser tão simples quanto retornar ou atribuir um campo de apoio.
   Por exemplo:

   ```csharp
   private int myField;
   public int MyProperty
   {
     get { return myField; }
     set { myField = value; }
   }
   ```

Há uma sobreposição considerável de comportamento e de poder entre propriedades e métodos.
Quando não são auto-implementadas, as propriedades podem conter qualquer instrução ou expressão
que possa aparecer dentro do escopo da classe. Num caso comum, costuma-se dizer que elas
encapsulam um campo de apoio.
Embora na maioria das vezes seja óbvio se o comportamento deve ser codificado como propriedade ou como método num caso
específico, muitas vezes é uma decisão de julgamento de quem escreve o código, em especial quanto de código deve ser
executado dentro dos acessadores. Validação num acessador set e um cálculo ou uma formatação simples num
acessador get são coisas comuns de se encontrar:

```csharp
private float fraction;
public float Percentage
{
  get { return fraction * 100; }
  set
  {
    if (value < 0 || value > 100)
    {
      throw new ArgumentException("Percentage must be between 0 and 100");
    }
    fraction = value / 100;
  }
}
```

De modo semelhante a outros membros da classe, as propriedades podem ter níveis de acesso.
Na maioria das vezes, as propriedades terão um nível de acesso não privado, em linha com
seu propósito essencial. Às vezes um dos acessadores terá
um nível de acesso diferente da propriedade. No caso de `TareWeight`,
sob a restrição de "segurança" um tanto artificial, havia a oportunidade
de ter uma propriedade pública com um getter privado. Isso significa que o código externo
à classe pode definir o valor da propriedade, mas ela só pode ser lida (get) por código dentro
da classe.

```csharp
public int ConfidentialValueUsedInternally { private get; set; }
```

Acessadores set não públicos também são suportados, mas um caso mais comum é aquele em que
o acessador set pode ser omitido completamente. Isso pode ser
o valor da propriedade é definido no construtor da classe.

```csharp
class MyClass
{
  public MyClass(int importantValue)
  {
    ConstructedValue = importantValue;
  }
  public int ConstructedValue { get; }
}
```

Este exercício tratou do uso básico de propriedades. Você vai encontrar tópicos
mais avançados em outros exercícios:

- propriedades com corpo de expressão, acessadores get e acessadores set (abordados em [membros com corpo de expressão][[concept-expression-bodied-members]])
- propriedades em interfaces (abordadas em [Interfaces][concept-interfaces])
- propriedades/propriedades abstratas em classes abstratas (abordadas em [Herança][concept-inheritance])
- uso da palavra-chave `readonly` com propriedades (abordado em [Coleções somente leitura][concept-readonly-collections])
- propriedades estáticas (abordadas em Statics)
- indexadores (abordados em [Indexers][concept-indexers])

[concept-expression-bodied-members]: https://exercism.org/tracks/csharp/concepts/expression-bodied-members
[concept-interfaces]: https://exercism.org/tracks/csharp/concepts/interfaces
[concept-inheritance]: https://exercism.org/tracks/csharp/concepts/inheritance
[concept-readonly-collections]: https://exercism.org/tracks/csharp/concepts/readonly-collections
[concept-indexers]: https://exercism.org/tracks/csharp/concepts/indexers
