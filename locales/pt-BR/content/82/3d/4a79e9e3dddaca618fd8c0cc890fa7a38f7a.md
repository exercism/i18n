# Introdução

## Sobrecarga de métodos

A _sobrecarga de métodos_ permite que vários métodos da mesma classe tenham o mesmo nome. Métodos sobrecarregados precisam ser diferentes entre si por:

- A quantidade de parâmetros
- O tipo dos parâmetros

Não existe sobrecarga de métodos com base no tipo de retorno.

O compilador vai inferir automaticamente qual método sobrecarregado chamar, com base na quantidade de parâmetros e no tipo deles.

## Argumentos nomeados

Até agora vimos que os argumentos passados para um método são associados aos parâmetros declarados pelo método conforme a posição. Existe uma alternativa, especialmente quando uma rotina recebe muitos argumentos: quem chama pode associar os argumentos especificando o identificador do parâmetro declarado.

Veja a sintaxe a seguir:

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

Um parâmetro de método pode se tornar opcional se você atribuir a ele um valor padrão. Ao chamar um método com parâmetros opcionais, quem chama não precisa passar um valor para eles. Se nenhum valor for passado para um parâmetro opcional, o valor padrão dele será usado.

Parâmetros opcionais _precisam_ ficar no final da lista de parâmetros; eles não podem ser seguidos por parâmetros não opcionais.

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
