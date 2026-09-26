# Sobre

## Sintaxe geral

O laço `for` é uma das instruções mais usadas para executar uma mesma lógica repetidamente.
Em Go, ele é composto pela palavra-chave `for`, um cabeçalho e um bloco de código que contém o corpo do laço entre chaves.
O cabeçalho é formado por 3 componentes separados por ponto e vírgula `;`: init, condition e post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- O componente **init** é um trecho de código que roda apenas uma vez, antes de o laço começar.
- O componente **condition** deve ser uma expressão que resulta em verdadeiro ou falso e que controla quando o laço deve parar.
  O código dentro do laço roda enquanto essa condição for verdadeira.
  Assim que essa expressão for falsa, nenhuma outra iteração do laço será executada.
- O componente **post** é um trecho de código que roda no final de cada iteração.

**Observação:** Diferente de outras linguagens, não há parênteses `()` em volta dos três componentes do cabeçalho.
Na verdade, inserir esses parênteses é um erro de compilação.
Porém, as chaves `{ }` em volta do corpo do laço são sempre obrigatórias.

## Laços `for` - um exemplo

O componente init geralmente inicializa uma variável contadora, o componente condition verifica se o laço deve continuar ou parar, e o componente post normalmente incrementa o contador no final de cada repetição.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Esse laço imprime os números de `1` a `9` (incluindo o `9`).
A definição do passo costuma ser feita com uma instrução de incremento ou decremento, como no exemplo acima.

## Componentes opcionais do cabeçalho

Os componentes init e post do cabeçalho são opcionais:

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

Ao omitir os componentes init e post em um laço `for` como o mostrado acima, você cria um laço `while` em Go.
Não existe a palavra-chave `while`.
Esse é um exemplo do princípio de Go de que os conceitos devem ser ortogonais.
Como já existe um conceito que dá conta do comportamento de um laço `while`, o laço `for`, `while` não foi adicionado como um conceito extra.

## Break e Continue

Dentro do corpo do laço, você pode usar a palavra-chave `break` para interromper a execução do laço por completo:

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

Já a palavra-chave `continue` interrompe apenas a execução da iteração atual e segue para a próxima:

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

## Laço `for` infinito

A parte da condição no cabeçalho do laço também é opcional.
Na verdade, você pode escrever um laço sem cabeçalho:

```go
for {
  // Endless loop...
}
```

Esse laço só termina se o programa for encerrado ou se houver um `break` no corpo dele.

## Rótulos e goto

Quando usamos `break`, Go para de executar o laço mais interno.
Da mesma forma, quando usamos `continue`, Go executa a próxima iteração do laço mais interno.

Porém, nem sempre é isso o que queremos.
Podemos usar rótulos junto com `break` e `continue` para especificar exatamente de qual laço queremos sair ou continuar, respectivamente.

Neste exemplo, criamos um rótulo `OuterLoop`, que vai se referir ao laço mais externo.
No laço mais interno, para dizer que queremos sair do laço mais externo, usamos `break` seguido do nome do rótulo do laço mais externo:

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Usar rótulos com `continue` também funcionaria; nesse caso, Go continuaria na próxima iteração do laço referenciado pelo rótulo.

Go também tem a palavra-chave `goto`, que funciona de forma parecida e permite pular de um trecho de código para outro trecho marcado com um rótulo.

**Atenção:** Embora Go permita pular para um trecho de código marcado com um rótulo, usar esse recurso da linguagem pode facilmente deixar o código muito difícil de ler.
Por isso, o uso de rótulos muitas vezes não é recomendado.
