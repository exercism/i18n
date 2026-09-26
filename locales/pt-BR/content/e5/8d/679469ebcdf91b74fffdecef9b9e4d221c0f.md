# Sobre

TypeScript é JavaScript com sintaxe para tipos, o que o torna uma linguagem de programação fortemente tipada, com suporte a estilos orientado a objetos, imperativo e declarativo (por exemplo, programação funcional), e oferece ferramentas melhores em qualquer escala.
A linguagem tem alguns [primitivos][mdn-primitive], e todo o resto é considerado um objeto.

Embora o JavaScript seja mais conhecido como a linguagem de script para páginas Web, muitos ambientes fora do navegador também o usam, como o Node.js.
A linguagem está em desenvolvimento ativo e, por ser multiparadigma, permite muitos estilos de programação.

O TypeScript é construído sobre isso e também está em desenvolvimento ativo.
Em alguns rankings de 2023, ele é mais popular que o JavaScript no uso diário.

Como [não dá para aprender TypeScript sem aprender JavaScript][handbook-js-or-ts], parte do conteúdo desta trilha é focada em ensinar conceitos de JavaScript, e alguns conceitos focam apenas em recursos específicos do TypeScript.

## (Re)Atribuição

Existem algumas formas principais de atribuir valores a nomes em TypeScript: usando variáveis ou constantes.
No Exercism, variáveis são sempre escritas em [camelCase][wiki-camel-case]; constantes são escritas em [SCREAMING_SNAKE_CASE][wiki-snake-case].
Não existe um guia oficial a seguir, e empresas e organizações diferentes têm guias de estilo diferentes.
_Fique à vontade para escrever variáveis do jeito que você quiser_.
A vantagem de escrevê-las do jeito que os exercícios são preparados é que elas aparecem destacadas de forma diferente na interface web e na maioria das IDEs.

Variáveis em TypeScript podem ser definidas com as palavras-chave [`const`][mdn-const], [`let`][mdn-let] ou [`var`][mdn-var].

Uma variável pode referenciar valores diferentes ao longo da sua vida útil quando se usa `let` ou `var`.
Por exemplo, `myFirstVariable` pode ser definida e redefinida várias vezes usando o operador de atribuição `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

Diferente de `let` e `var`, variáveis definidas com `const` só podem receber uma atribuição.
É assim que se definem constantes em TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Como o TypeScript consegue detectar isso estaticamente, o compilador do TypeScript também vai gerar um erro:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Isso significa que você não precisa rodar o código para detectar o `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Em um exercício de aprendizado mais adiante, a diferença entre a atribuição/vinculação de uma _constante_ e o _valor_ constante é explorada e explicada.
~~~~

## Inferência de tipos

Sem entrar muito a fundo no assunto de [inferência de tipos][handbook-type-inference], você deve saber que uma variável atribuída normalmente tem um tipo inferido, mesmo sem uma anotação de tipo.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Esse tipo é então exigido em todo o código.
Isso também significa que, embora o código a seguir seja JavaScript válido:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

o TypeScript reclama:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Esse recurso garante segurança de tipos mesmo quando anotações de tipo não são usadas.

### Atribuição de constantes

A palavra-chave `const` é mencionada _tanto_ para variáveis quanto para constantes.
Outro conceito frequentemente mencionado junto com constantes é a [(im)mutabilidade][wiki-mutability].

A palavra-chave `const` torna imutável apenas a _vinculação_, ou seja, você só pode atribuir um valor a uma variável `const` uma vez.
Em TypeScript, só valores [primitivos][mdn-primitive] são imutáveis.
No entanto, valores [não primitivos][mdn-primitive] ainda podem ser mutados.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Valor constante (imutabilidade)

Como regra, no Exercism e em muitas outras organizações e guias de estilo de projetos, não mute valores que se parecem com `const SCREAMING_SNAKE_CASE`.
Tecnicamente os valores _podem_ ser alterados, mas, por clareza e para alinhar expectativas no Exercism, isso é desencorajado.
Quando isso _precisar_ ser garantido, use [`Object.freeze(value)`][mdn-object-freeze].

Sempre que possível, pode-se usar a palavra-chave `readonly`, o `as const` ou o tipo genérico `Readonly<T>` do TypeScript para garantir a imutabilidade estaticamente.
Você vai aprender mais sobre esse assunto depois.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

No mundo real, é pouco provável ver `Object.freeze` por toda uma base de código, mas a regra de nunca mutar um valor `SCREAMING_SNAKE_CASE` é uma boa regra, muitas vezes garantida por análise automatizada, como um linter.

## Declarações de função

Em TypeScript, unidades de funcionalidade são encapsuladas em _funções_, geralmente agrupando funções no mesmo arquivo quando elas pertencem juntas.
Essas funções podem receber parâmetros (argumentos) e podem _retornar_ um valor usando a palavra-chave `return`.
As funções são chamadas usando a sintaxe `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Os parâmetros de uma função normalmente devem ser anotados com um tipo, usando dois-pontos (`:`) seguidos do tipo.
O valor de retorno de uma função pode ser anotado depois de fechar a lista de parâmetros, usando dois-pontos (`:`) seguidos do tipo.

Se uma função não tiver uma anotação de tipo para o valor de retorno, o tipo será inferido.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Aqui o tipo de retorno foi inferido porque o TypeScript sabe que o resultado de `number + number` é sempre `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Em TypeScript há _muitas_ formas diferentes de declarar uma função.
Essas outras formas são diferentes de usar a palavra-chave `function`.
A trilha tenta apresentá-las aos poucos, mas, se você já as conhece, fique à vontade para usar qualquer uma delas.
Na maioria dos casos, usar uma ou outra não é melhor nem pior.
~~~~

## Anotações de tipo

Como mostra a declaração da função `add`, os parâmetros têm uma anotação de tipo explícita `: number`.
Declarações de variáveis, propriedades de classe, declarações de função e muito mais suportam anotações de tipo.

Tanto as anotações de tipo explícitas quanto os tipos inferidos são exigidos pelo verificador de tipos.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Se o TypeScript não encontrar uma anotação de tipo explícita e não conseguir inferir o tipo, ele atribuirá o tipo `any`, que [você não deve usar][handbook-dont-use-any].
Mais adiante você vai conhecer o tipo `unknown` como uma boa alternativa.

## Exportação e importação

As palavras-chave `export` e `import` são ferramentas poderosas que transformam um arquivo TypeScript comum em um [módulo TypeScript][mdn-module].
Além de permitir que o código exponha components seletivamente, como funções, classes, variáveis e constantes, isso também habilita uma série de outros recursos, como:

- [Renomear exportações e importações][mdn-renaming-modules], o que permite evitar conflitos de nomes,
- [Importações dinâmicas][mdn-dynamic-imports], que carregam código sob demanda,
- [Tree shaking][blog-tree-shaking], que reduz o tamanho do código final ao eliminar módulos sem efeitos colaterais e até conteúdos de módulos _que não são usados_,
- Exportar [_live bindings_][blog-live-bindings], o que permite exportar um valor que muda em todos os lugares onde foi importado, caso o valor original mude.

Um exemplo concreto é como os testes funcionam na trilha de TypeScript do Exercism.
Cada exercício tem pelo menos um arquivo de implementação, por exemplo `lasagna.ts`, e cada exercício tem pelo menos um arquivo de teste, por exemplo `lasagna.test.ts`.
O arquivo de implementação usa `export` para expor a API pública, e o arquivo de teste usa `import` para acessá-la, e é assim que ele consegue testar os resultados da implementação.

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
Como o compilador do TypeScript _não reescreve os caminhos de importação_, as importações devem ser escritas com a extensão `.js` (já que é nisso que elas se tornarão após a transpilação).
Porém, a opção `allowImportingTsExtensions` está ativada porque temos um processo que reescreve os caminhos.
Isso permite importar de `.ts` (assim como de `.js`).

Em código mais antigo, você vai encontrar importações _sem extensão de arquivo_.
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
