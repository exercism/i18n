# Introdução

## Sobrecarga de métodos

_A sobrecarga de métodos_ permite que vários métodos na mesma classe tenham o mesmo nome. Os métodos sobrecarregados têm de ser diferentes entre si, quer pelo:

- Número de parâmetros
- Tipo dos parâmetros

Não existe sobrecarga de métodos com base no tipo de retorno.

O compilador infere automaticamente qual o método sobrecarregado a chamar, com base no número de parâmetros e no tipo desses parâmetros.

## Argumentos nomeados

Até agora, vimos que os argumentos passados a um método são associados aos parâmetros declarados do método com base na posição. Uma abordagem alternativa, sobretudo quando uma rotina recebe um grande número de argumentos, permite que quem chama associe os argumentos especificando o identificador do parâmetro declarado.

O seguinte ilustra a sintaxe:

```csharp
class Card
{
    static string NewYear(int year, int month, int day)
    {
        return $"Happy {year}-{month}-{day}!";
    }
}

Card.NewYear(month: 1, day: 1, year: 2020);  // => "Happy 2020-1-1!"
```

## Parâmetros opcionais

É possível tornar opcional um parâmetro de um método atribuindo-lhe um valor predefinido. Ao chamar um método com parâmetros opcionais, quem chama não precisa de passar um valor para eles. Se não for passado nenhum valor para um parâmetro opcional, é usado o seu valor predefinido.

Os parâmetros opcionais _têm de_ ficar no fim da lista de parâmetros; não podem ser seguidos de parâmetros não opcionais.

```csharp
class Card
{
    static string NewYear(int year = 2020)
    {
        return $"Happy {year}!";
    }
}

Card.NewYear();     // => "Happy 2020!"
Card.NewYear(1999); // => "Happy 1999!"
```
