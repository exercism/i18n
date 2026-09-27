# Sobre

## Sintaxe geral

O ciclo for é uma das instruções mais usadas para executar alguma lógica repetidamente.
Em Go, é composto pela palavra-chave `for`, por um cabeçalho e por um bloco de código que contém o corpo do ciclo entre chavetas.
O cabeçalho é composto por 3 componentes separados por pontos e vírgulas `;`: a inicialização, a condição e o pós.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- O componente de **inicialização** é algum código que é executado apenas uma vez, antes de o ciclo começar.
- O componente de **condição** tem de ser uma expressão que resulte num valor booleano e que controla quando o ciclo deve parar.
  O código dentro do ciclo será executado enquanto esta condição for verdadeira.
  Assim que esta expressão for falsa, o ciclo deixa de executar mais iterações.
- O componente de **pós** é algum código que será executado no fim de cada iteração.

**Nota:** Ao contrário de outras linguagens, não há parênteses `()` a rodear os três componentes do cabeçalho.
Na verdade, inserir esses parênteses é um erro de compilação.
No entanto, as chavetas `{ }` que rodeiam o corpo do ciclo são sempre obrigatórias.

## Ciclos for: um exemplo

O componente de inicialização costuma preparar uma variável contadora, a condição verifica se o ciclo deve continuar ou parar e o componente de pós costuma incrementar o contador no fim de cada repetição.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Este ciclo imprime os números de `1` a `9` (incluindo o `9`).
Definir o passo é muitas vezes feito com uma instrução de incremento ou de decremento, como mostra o exemplo acima.

## Componentes opcionais do cabeçalho

Os componentes de inicialização e de pós do cabeçalho são opcionais:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Ao omitir os componentes de inicialização e de pós num ciclo for como o mostrado acima, crias um ciclo while em Go.
Não existe a palavra-chave `while`.
Isto é um exemplo do princípio de Go de que os conceitos devem ser ortogonais.
Como já existe um conceito para obter o comportamento de um ciclo while, nomeadamente o ciclo for, `while` não foi adicionado como conceito adicional.

## Break e Continue

Dentro do corpo de um ciclo, podes usar a palavra-chave `break` para parar a execução do ciclo por completo:

```go
for n := 0; n <= 5; n++ {
  if n == 3 {
    break
  }
  fmt.Println(n)
}
// Output:
// 0
// 1
// 2
```

Em contrapartida, a palavra-chave `continue` apenas para a execução da iteração atual e passa à seguinte:

```go
for n := 0; n <= 5; n++ {
  if n%2 == 0 {
    continue
  }
  fmt.Println(n)
}
// Output:
// 1
// 3
// 5
```

## Ciclo for infinito

A parte da condição do cabeçalho do ciclo também é opcional.
Na verdade, podes escrever um ciclo sem cabeçalho:

```go
for {
  // Endless loop...
}
```

Este ciclo só termina se o programa sair ou se tiver um `break` no seu corpo.

## Rótulos e goto

Quando usamos `break`, o Go para de executar o ciclo mais interior.
Da mesma forma, quando usamos `continue`, o Go executa a iteração seguinte do ciclo mais interior.

No entanto, isto nem sempre é desejável.
Podemos usar rótulos juntamente com `break` e `continue` para especificar exatamente de que ciclo queremos sair ou continuar, respetivamente.

Neste exemplo, criamos um rótulo `OuterLoop`, que se refere ao ciclo mais exterior.
No ciclo mais interior, para indicar que queremos sair do ciclo mais exterior, usamos `break` seguido do nome do rótulo do ciclo mais exterior:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Usar rótulos com `continue` também funcionaria; nesse caso, o Go continuaria na iteração seguinte do ciclo referenciado pelo rótulo.

O Go também tem uma palavra-chave `goto` que funciona de forma semelhante e nos permite saltar de um pedaço de código para outro pedaço de código marcado com um rótulo.

**Aviso:** Apesar de o Go permitir saltar para um pedaço de código marcado com um rótulo, usar esta funcionalidade da linguagem pode facilmente tornar o código muito difícil de ler.
Por esta razão, o uso de rótulos muitas vezes não é recomendado.
