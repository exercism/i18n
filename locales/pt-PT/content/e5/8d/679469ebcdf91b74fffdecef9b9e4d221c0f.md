# Sobre

O TypeScript é JavaScript com sintaxe para tipos, o que faz dele uma linguagem de programação fortemente tipada, que suporta estilos orientados a objetos, imperativos e declarativos (por exemplo, programação funcional), dando-te melhores ferramentas a qualquer escala.
Tem alguns [primitivos][mdn-primitive], e tudo o resto é considerado um objeto.

Embora o JavaScript seja mais conhecido como a linguagem de script para páginas Web, muitos ambientes fora do navegador também o usam, como o Node.js.
A linguagem está a ser desenvolvida ativamente e, devido à sua natureza multi-paradigma, permite muitos estilos de programação.

O TypeScript assenta nisto e também está a ser desenvolvido ativamente.
Em algumas classificações de 2023, é mais popular do que o JavaScript no uso diário.

Como [não podes aprender TypeScript sem aprender JavaScript][handbook-js-or-ts], parte do conteúdo deste percurso centra-se no ensino de conceitos de JavaScript e alguns dos conceitos focam-se apenas em funcionalidades específicas do TypeScript.

## (Re-)Atribuição

Há algumas formas principais de atribuir valores a nomes em TypeScript: usar variáveis ou constantes.
No Exercism, as variáveis escrevem-se sempre em [camelCase][wiki-camel-case]; as constantes escrevem-se em [SCREAMING_SNAKE_CASE][wiki-snake-case].
Não há um guia oficial a seguir, e várias empresas e organizações têm guias de estilo diferentes.
_Escreve as variáveis como quiseres_.
A vantagem de as escrever da forma como os exercícios estão preparados é que serão destacadas de forma diferente na interface web e na maioria das IDEs.

Em TypeScript, as variáveis podem ser definidas com a palavra-chave [`const`][mdn-const], [`let`][mdn-let] ou [`var`][mdn-var].

Uma variável pode referenciar valores diferentes ao longo do seu tempo de vida quando usas `let` ou `var`.
Por exemplo, `myFirstVariable` pode ser definida e redefinida muitas vezes com o operador de atribuição `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

Ao contrário de `let` e `var`, as variáveis definidas com `const` só podem ser atribuídas uma vez.
É isso que se usa para definir constantes em TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Como o TypeScript consegue detetar isto estaticamente, o compilador de TypeScript também dá um erro:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Isto significa que não precisas de executar o código para detetar o `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Num exercício de aprendizagem mais adiante, explora-se e explica-se a diferença entre a atribuição/vinculação _constante_ e o valor _constante_.
~~~~

## Inferência de tipos

Sem mergulhar demasiado fundo no tema da [inferência de tipos][handbook-type-inference], deves saber que uma variável atribuída tem normalmente um tipo inferido, mesmo sem uma anotação de tipo.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Esse tipo é depois imposto ao longo de todo o código.
Isto também significa que, embora o código seguinte seja JavaScript válido:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

o TypeScript dá erro quando o usas:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Esta funcionalidade garante segurança de tipos mesmo quando não são usadas anotações de tipo.

### Atribuição de constantes

A palavra-chave `const` é mencionada _tanto_ para variáveis como para constantes.
Outro conceito frequentemente referido a propósito das constantes é a [(im)mutabilidade][wiki-mutability].

A palavra-chave `const` torna imutável apenas a _vinculação_, ou seja, só podes atribuir um valor a uma variável `const` uma vez.
Em TypeScript, só os valores [primitivos][mdn-primitive] são imutáveis.
No entanto, os valores [não primitivos][mdn-primitive] ainda podem ser mutados.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Valor de constante (imutabilidade)

Como regra, no Exercism, e em muitas outras organizações e guias de estilo de projetos, não se mutam valores com o aspeto `const SCREAMING_SNAKE_CASE`.
Tecnicamente, os valores _podem_ ser alterados, mas, por uma questão de clareza e de gestão de expectativas no Exercism, isso é desencorajado.
Quando isso _tiver_ de ser imposto, usa [`Object.freeze(value)`][mdn-object-freeze].

Sempre que possível, podes usar a palavra-chave `readonly` do TypeScript, o `as const` ou o tipo genérico `Readonly<T>` para impor a imutabilidade estaticamente.
Vais aprender mais sobre este assunto mais adiante.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

Na prática, é pouco provável ver `Object.freeze` espalhado por toda uma base de código, mas a regra de nunca mutar um valor `SCREAMING_SNAKE_CASE` é uma boa regra; muitas vezes imposta com análises automatizadas, como um linter.

## Declarações de funções

Em TypeScript, as unidades de funcionalidade são encapsuladas em _funções_, agrupando normalmente no mesmo ficheiro as funções que pertencem umas às outras.
Estas funções podem receber parâmetros (argumentos) e podem _devolver_ um valor com a palavra-chave `return`.
As funções são invocadas com a sintaxe `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Normalmente, os parâmetros de uma função devem ser anotados com um tipo, usando dois pontos (`:`) seguidos do tipo.
O valor devolvido por uma função pode ser anotado depois de fechar a lista de parâmetros, usando dois pontos (`:`) seguidos do tipo.

Se uma função não tiver uma anotação de tipo para o seu valor devolvido, o tipo será inferido.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Aqui, o tipo devolvido foi inferido porque o TypeScript sabe que o resultado de `number + number` tem de ser sempre `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Em TypeScript, há _muitas_ formas diferentes de declarar uma função.
Estas outras formas são diferentes de usar a palavra-chave `function`.
O percurso tenta introduzi-las gradualmente, mas, se já as conheces, usa à vontade qualquer uma delas.
Na maioria dos casos, usar uma ou outra não é melhor nem pior.
~~~~

## Anotações de tipo

Como se mostra na declaração da função `add`, os parâmetros têm uma anotação de tipo explícita `: number`.
Declarações de variáveis, propriedades de classes, declarações de funções e muito mais suportam anotações de tipo.

Tanto as anotações de tipo explícitas como os tipos inferidos são impostos pelo verificador de tipos.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Se o TypeScript não encontrar uma anotação de tipo explícita e não conseguir inferir o tipo, atribui o tipo `any`, que [não deves usar][handbook-dont-use-any].
Mais adiante vais aprender a usar o tipo `unknown` como boa alternativa.

## Exportação e importação

As palavras-chave `export` e `import` são ferramentas poderosas que transformam um ficheiro TypeScript normal num [módulo TypeScript][mdn-module].
Além de permitirem que o código exponha seletivamente components, como funções, classes, variáveis e constantes, também possibilitam toda uma série de outras funcionalidades, como:

- [Renomear exportações e importações][mdn-renaming-modules], o que te permite evitar conflitos de nomes,
- [Importações dinâmicas][mdn-dynamic-imports], que carregam código a pedido,
- [Tree shaking][blog-tree-shaking], que reduz o tamanho do código final ao eliminar módulos sem efeitos secundários e até conteúdo de módulos _que não é usado_,
- Exportar [_live bindings_][blog-live-bindings], o que te permite exportar um valor que se altera em todo o lado onde é importado, caso o valor original se altere.

Um exemplo concreto é como funcionam os testes do percurso de TypeScript do Exercism.
Cada exercício tem pelo menos um ficheiro de implementação, por exemplo `lasagna.ts`, e cada exercício tem pelo menos um ficheiro de testes, por exemplo `lasagna.test.ts`.
O ficheiro de implementação usa `export` para expor a API pública e o ficheiro de testes usa `import` para aceder a ela, e é assim que consegue testar os resultados da implementação.

```typescript
// file.js
export const MY_VALUE = 10

export function add(num1, num2) {
  return num1 + num2
}

// file.spec.js
import { MY_VALUE, add } from './file.js'

add(MY_VALUE, 5)
// => 15
```

<!--prettier-ignore -->
~~~~exercism/advanced
Como o compilador de TypeScript _não reescreve os caminhos de importação_, as importações devem ser escritas com a extensão `.js` (uma vez que é isso que se torna após a transpilação).
No entanto, a opção `allowImportingTsExtensions` está ativada porque temos um processo que reescreve os caminhos.
Isto permite importar a partir de `.ts` (bem como de `.js`).

Em código mais antigo, encontras importações _sem extensão de ficheiro_.
~~~~

[blog-live-bindings]: https://2ality.com/2015/07/es6-module-exports.html#es6-modules-export-immutable-bindings
[blog-tree-shaking]: https://bitsofco.de/what-is-tree-shaking/
[mdn-const]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
[mdn-dynamic-imports]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports
[mdn-let]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
[mdn-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[mdn-object-freeze]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
[mdn-primitive]: https://developer.mozilla.org/en-US/docs/Glossary/Primitive
[mdn-renaming-modules]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#Renaming_imports_and_exports
[mdn-var]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var
[handbook-dont-use-any]: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#any
[handbook-js-or-ts]: https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#learning-javascript-and-typescript
[handbook-type-inference]: https://www.typescriptlang.org/docs/handbook/type-inference.html
[wiki-mutability]: https://en.wikipedia.org/wiki/Immutable_object
[wiki-camel-case]: https://en.wikipedia.org/wiki/Camel_case
[wiki-snake-case]: https://en.wikipedia.org/wiki/Snake_case
