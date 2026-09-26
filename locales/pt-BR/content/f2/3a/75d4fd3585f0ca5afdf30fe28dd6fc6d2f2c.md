# Instruções

Como uma futura maga, Elyse precisa praticar alguns fundamentos.
Ela tem uma pilha de cartas que quer manipular.

Para facilitar um pouco as coisas, ela usa apenas as cartas de 1 a 10, então a pilha de cartas dela pode ser representada por um array de números.
A posição de uma carta corresponde ao índice no array.
Isso significa que a posição 0 se refere à primeira carta, a posição 1 à segunda, e assim por diante.

~~~~exercism/note
Todas as funções devem atualizar o array de cartas e então retornar o array modificado, uma forma comum de trabalhar conhecida como padrão Builder, que permite encadear funções de forma elegante.
~~~~

## 1. Recupere uma carta de uma pilha

Para pegar uma carta, retorne a carta no índice `position` da pilha fornecida.

Implemente a função `getCard(at:from:)` que recebe dois argumentos: `at`, que é a posição da carta na pilha, e `from`, que é a pilha de cartas.
A função deve retornar a carta na posição `index` da pilha fornecida.

```swift
let index = 2
getCard(at: index, from: [1, 2, 4, 1])
// returns 4
```

## 2. Troque uma carta na pilha

Faça um truque de mágica e troque a carta no índice `position` pela carta de substituição fornecida.

Implemente a função `setCard(at:in:to)` que recebe três argumentos: `at`, que é a posição da carta na pilha, `in`, que é a pilha de cartas, e `to`, que é a nova carta que substitui a carta na posição `index`.
A função deve retornar uma cópia da pilha com a carta na posição `index` substituída pela nova carta.
Se o `index` fornecido não for um índice válido na pilha, a pilha original deve ser retornada, sem alterações.

```swift
let index = 2
let newCard = 6
setCard(at: index, in: [1, 2, 4, 1], to: newCard)
// returns [1, 2, 6, 1]
```

## 3. Insira uma carta no topo da pilha

Faça uma carta aparecer inserindo uma nova carta no topo da pilha.

Implemente a função `insert(_:atTopOf:)` que recebe dois argumentos: a nova carta a ser inserida e a pilha de cartas.
A função deve retornar uma cópia da pilha com a nova carta fornecida adicionada ao topo da pilha.

```swift
let newCard = 8
insert(newCard, atTopOf: [5, 9, 7, 1])
// returns [5, 9, 7, 1, 8]
```

## 4. Remova uma carta da pilha

Faça uma carta desaparecer removendo da pilha a carta na `position` fornecida.

Implemente a função `removeCard(at:from:)` que recebe dois argumentos: `at`, que é a posição da carta na pilha, e `from`, que é a pilha de cartas.
A função deve retornar uma cópia da pilha com a carta na posição `index` removida.
Se o `index` fornecido não for um índice válido na pilha, a pilha original deve ser retornada, sem alterações.

```swift
let index = 2
removeCard(at: index, from: [3, 2, 6, 4, 8])
// returns [3, 2, 4, 8]
```

## 5. Insira uma carta na pilha

Faça uma carta aparecer inserindo uma nova carta na `position` fornecida na pilha.

Implemente a função `insert(_:at:from:)` que recebe três argumentos: a nova carta a ser inserida, a posição em que a nova carta deve ser inserida e a pilha de cartas.
A função deve retornar uma cópia da pilha com a nova carta fornecida adicionada na posição indicada.
Se o `index` fornecido não for um índice válido na pilha, a pilha original deve ser retornada, sem alterações.

```swift
let newCard = 8
insert(newCard, at: 2, from: [5, 9, 7, 1])
// returns [5, 9, 8, 7, 1]
```

## 6. Verifique o tamanho da pilha

Verifique se o tamanho da pilha é igual a `stackSize` ou não.

Implemente a função `checkSizeOfStack(_:_:)` que recebe dois argumentos: `stack`, que é a pilha de cartas, e `stackSize`, que é o tamanho da pilha.
A função deve retornar `true` se o tamanho da pilha for igual a `stackSize` e `false` caso contrário.

```swift
let stackSize = 4
checkSizeOfStack([3, 2, 6, 4, 8], stackSize)
// returns false
```
