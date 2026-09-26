# Entendendo recursão em JavaScript

A recursão é um conceito poderoso na programação, que envolve uma função chamar a si mesma.
No começo, pode ser um pouco difícil de entender, mas depois que você entende os fundamentos, ela se torna uma ferramenta valiosa para resolver problemas complexos.
Vamos explorar a recursão em JavaScript com exemplos fáceis de entender.

## O que é recursão?

A recursão acontece quando uma função chama a si mesma, de forma direta ou indireta.
É semelhante a um laço, mas pode envolver dividir um problema em subproblemas menores e mais fáceis de lidar.

### Exemplo 1: contagem regressiva

Vamos começar com um exemplo simples: uma função de contagem regressiva.

```javascript
function countdown(num) {
  // Base case
  if (num <= 0) {
    console.log('Blastoff!');
    return;
  }

  // Recursive case
  console.log(num);
  countdown(num - 1);
}

// Call the function
countdown(5);
```

Neste exemplo:

- **Caso base**: quando `num` fica menor ou igual a 0, a função imprime "Blastoff!" e para de chamar a si mesma.
- **Caso recursivo**: a função imprime o `num` atual e chama a si mesma com `num - 1`.

### Exemplo 2: fatorial

Agora, vamos ver um exemplo clássico de recursão: calcular o fatorial de um número.

```javascript
function factorial(n) {
  // Base case
  if (n === 0 || n === 1) {
    return 1;
  }

  // Recursive case
  return n * factorial(n - 1);
}

// Test the function
console.log(factorial(5)); // Output: 120
```

Neste exemplo:

- **Caso base**: quando `n` é 0 ou 1, a função retorna 1.
- **Caso recursivo**: a função multiplica `n` pelo fatorial de `n - 1`.

## Conceitos principais

### Caso base

Toda função recursiva deve ter pelo menos um caso base, uma condição em que a função para de chamar a si mesma.
Sem um caso base, a recursão continuaria indefinidamente, o que levaria a um estouro de pilha.

### Caso recursivo

O caso recursivo define como a função chama a si mesma com uma versão menor ou mais simples do problema.

## Prós e contras da recursão

**Prós:**

- Solução elegante para certos problemas.
- Imita o conceito de indução matemática.

**Contras:**

- Pode ser menos eficiente que soluções iterativas.
- Pode levar a um estouro de pilha em recursões profundas.

## Conclusão

A recursão é uma técnica valiosa que simplifica problemas complexos dividindo-os em subproblemas menores e mais fáceis de lidar.
Entender os casos base e os casos recursivos é essencial para implementar soluções recursivas eficazes em JavaScript.

**Saiba mais:**

- [MDN: recursão em JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#recursion)
- [Eloquent JavaScript: capítulo 3 - funções](https://eloquentjavascript.net/03_functions.html)
