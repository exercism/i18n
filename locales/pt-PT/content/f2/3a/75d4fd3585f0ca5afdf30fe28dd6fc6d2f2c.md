# Instruções

Como futura ilusionista, a Elyse precisa de praticar o básico.
Tem uma pilha de cartas que quer manipular.

Para facilitar um pouco as coisas, usa apenas as cartas de 1 a 10, para que a sua pilha de cartas possa ser representada por um array de números.
A posição de uma determinada carta corresponde ao índice no array.
Isto significa que a posição 0 corresponde à primeira carta, a posição 1 à segunda carta, e assim por diante.

~~~~exercism/note
Todas as funções devem atualizar o array de cartas e depois devolver o array modificado, uma forma comum de trabalhar conhecida como padrão Builder, que te permite encadear funções umas nas outras de forma harmoniosa.
~~~~

## 1. Recuperar uma carta de uma pilha

Para escolheres uma carta, devolve a carta que está no índice `position` da pilha indicada.

Implementa a função `getCard(at:from:)`, que recebe dois argumentos: `at`, que é a posição da carta na pilha, e `from`, que é a pilha de cartas.
A função deve devolver a carta que está na posição `index` da pilha indicada.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Alterar uma carta na pilha

Faz um pouco de prestidigitação e troca a carta no índice `position` pela carta de substituição indicada.

Implementa a função `setCard(at:in:to)`, que recebe três argumentos: `at`, que é a posição da carta na pilha, `in`, que é a pilha de cartas, e `to`, que é a nova carta que vai substituir a carta na posição `index`.
A função deve devolver uma cópia da pilha com a carta na posição `index` substituída pela nova carta.
Se o `index` indicado não for um índice válido na pilha, deve devolver a pilha original, sem alterações.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Inserir uma carta no topo da pilha

Faz aparecer uma carta, inserindo uma nova carta no topo da pilha.

Implementa a função `insert(_:atTopOf:)`, que recebe dois argumentos: a nova carta a inserir e a pilha de cartas.
A função deve devolver uma cópia da pilha com a nova carta indicada adicionada ao topo da pilha.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Remover uma carta da pilha

Faz desaparecer uma carta, removendo da pilha a carta que está na posição `position` indicada.

Implementa a função `removeCard(at:from:)`, que recebe dois argumentos: `at`, que é a posição da carta na pilha, e `from`, que é a pilha de cartas.
A função deve devolver uma cópia da pilha com a carta na posição `index` removida.
Se o `index` indicado não for um índice válido na pilha, deve devolver a pilha original, sem alterações.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Inserir uma carta na pilha

Faz aparecer uma carta, inserindo uma nova carta na posição `position` indicada na pilha.

Implementa a função `insert(_:at:from:)`, que recebe três argumentos: a nova carta a inserir, a posição na qual a nova carta deve ser inserida e a pilha de cartas.
A função deve devolver uma cópia da pilha com a nova carta indicada adicionada na posição indicada.
Se o `index` indicado não for um índice válido na pilha, deve devolver a pilha original, sem alterações.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Verificar o tamanho da pilha

Verifica se o tamanho da pilha é igual a `stackSize` ou não.

Implementa a função `checkSizeOfStack(_:_:)`, que recebe dois argumentos: `stack`, que é a pilha de cartas, e `stackSize`, que é o tamanho da pilha.
A função deve devolver `true` se o tamanho da pilha for igual a `stackSize` e `false` caso contrário.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
