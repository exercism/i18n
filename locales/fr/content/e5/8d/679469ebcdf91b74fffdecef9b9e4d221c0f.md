# À propos

TypeScript est JavaScript avec une syntaxe pour les types, ce qui en fait un langage de programmation fortement typé. Il prend en charge les styles orienté objet, impératif et déclaratif (par exemple la programmation fonctionnelle) et offre un meilleur outillage à toutes les échelles.
Il possède quelques [primitives][mdn-primitive], et tout le reste est considéré comme un objet.

Si JavaScript est surtout connu comme le langage de script des pages web, de nombreux environnements hors navigateur l'utilisent aussi, comme Node.js.
Le langage est activement développé et, grâce à sa nature multi-paradigmes, il autorise de nombreux styles de programmation.

TypeScript s'appuie sur cette base et il est lui aussi activement développé.
Dans certains classements de 2023, il est plus populaire que JavaScript en usage quotidien.

Comme [on ne peut pas apprendre TypeScript sans apprendre JavaScript][handbook-js-or-ts], une partie du contenu de ce parcours porte sur l'enseignement de concepts JavaScript, tandis que d'autres concepts se concentrent uniquement sur des fonctionnalités propres à TypeScript.

## (Ré-)affectation

Il existe quelques façons principales d'affecter des valeurs à des noms en TypeScript : avec des variables ou des constantes.
Sur Exercism, les variables s'écrivent toujours en [`camelCase`][wiki-camel-case] ; les constantes s'écrivent en [`SCREAMING_SNAKE_CASE`][wiki-snake-case].
Il n'existe pas de guide officiel à suivre, et les entreprises comme les organisations ont chacune leurs propres guides de style.
_Tu peux écrire les variables comme tu veux_.
L'avantage d'écrire les variables comme les exercices les préparent, c'est qu'elles seront mises en évidence différemment dans l'interface web et dans la plupart des IDE.

En TypeScript, les variables peuvent être définies avec le mot-clé [`const`][mdn-const], [`let`][mdn-let] ou [`var`][mdn-var].

Avec `let` ou `var`, une variable peut référencer différentes valeurs au cours de son existence.
Par exemple, `myFirstVariable` peut être définie et redéfinie plusieurs fois avec l'opérateur d'affectation `=` :

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

Contrairement à `let` et `var`, une variable définie avec `const` ne peut être affectée qu'une seule fois.
C'est ainsi que l'on définit des constantes en TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Comme TypeScript peut le détecter statiquement, le compilateur TypeScript produit lui aussi une erreur :

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Tu n'as donc pas besoin d'exécuter le code pour détecter la `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 Dans un prochain exercice d'apprentissage, la différence entre l'affectation / la liaison _constante_ et la valeur _constante_ est explorée et expliquée.
~~~~

## Inférence de type

Sans entrer trop profondément dans le sujet de l'[inférence de type][handbook-type-inference], sache qu'une variable affectée possède généralement un type inféré, même sans annotation de type.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Ce type est ensuite imposé dans tout le code.
Cela signifie aussi que si le code suivant est du JavaScript valide :

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

TypeScript, lui, proteste :

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Cette fonctionnalité garantit la sûreté de typage même sans annotations de type.

### Affectation de constante

Le mot-clé `const` est mentionné _à la fois_ pour les variables et pour les constantes.
Un autre concept souvent évoqué à propos des constantes est l'[(im)mutabilité][wiki-mutability].

Le mot-clé `const` rend immuable uniquement la _liaison_, c'est-à-dire qu'on ne peut affecter une valeur à une variable `const` qu'une seule fois.
En TypeScript, seules les valeurs [primitives][mdn-primitive] sont immuables.
En revanche, les valeurs [non primitives][mdn-primitive] peuvent toujours être mutées.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Valeur constante (immuabilité)

En règle générale, sur Exercism comme dans de nombreuses autres organisations et dans les guides de style de nombreux projets, on ne mute pas les valeurs qui ressemblent à `const SCREAMING_SNAKE_CASE`.
Techniquement, ces valeurs _peuvent_ être modifiées, mais par souci de clarté et pour gérer les attentes sur Exercism, c'est déconseillé.
Quand cela _doit_ être imposé, utilise [`Object.freeze(value)`][mdn-object-freeze].

Dans la mesure du possible, le mot-clé TypeScript `readonly`, `as const` ou le type générique `Readonly<T>` peuvent être utilisés pour imposer l'immuabilité statiquement.
Tu en apprendras davantage sur ce sujet plus tard.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

Dans la nature, il est peu probable de voir `Object.freeze` partout dans une base de code, mais la règle qui consiste à ne jamais muter une valeur `SCREAMING_SNAKE_CASE` est une bonne règle ; elle est souvent imposée par une analyse automatisée comme un linter.

## Déclarations de fonctions

En TypeScript, les unités de fonctionnalité sont encapsulées dans des _fonctions_, que l'on regroupe généralement dans le même fichier lorsqu'elles vont ensemble.
Ces fonctions peuvent prendre des paramètres (arguments) et peuvent _renvoyer_ une valeur avec le mot-clé `return`.
Les fonctions s'appellent avec la syntaxe `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Les paramètres d'une fonction devraient généralement être annotés avec un type, à l'aide d'un deux-points (`:`) suivi du type.
Les valeurs de retour d'une fonction peuvent être annotées après la fermeture de la liste de paramètres, à l'aide d'un deux-points (`:`) suivi du type.

Si une fonction n'a pas d'annotation de type pour sa valeur de retour, le type sera inféré.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Ici, le type de retour a été inféré parce que TypeScript sait que le résultat de `number + number` est toujours `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 En TypeScript, il existe _de nombreuses_ façons de déclarer une fonction.
Ces autres façons sont différentes de l'utilisation du mot-clé `function`.
Le parcours essaie de les introduire progressivement, mais si tu les connais déjà, n'hésite pas à en utiliser une.
Dans la plupart des cas, utiliser l'une ou l'autre n'est ni mieux ni pire.
~~~~

## Annotations de type

Comme le montre la déclaration de la fonction `add`, les paramètres ont une annotation de type explicite `: number`.
Les déclarations de variables, les propriétés de classe, les déclarations de fonctions et bien d'autres choses prennent en charge les annotations de type.

Les annotations de type explicites comme les types inférés sont vérifiés par le vérificateur de types.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Si TypeScript ne trouve pas d'annotation de type explicite et ne peut pas inférer le type, il attribue le type `any`, que [tu ne devrais pas utiliser][handbook-dont-use-any].
Tu découvriras plus tard le type `unknown`, une bonne alternative.

## Export et import

Les mots-clés `export` et `import` sont des outils puissants qui transforment un simple fichier TypeScript en [module TypeScript][mdn-module].
En plus de permettre au code d'exposer sélectivement des composants, comme des fonctions, des classes, des variables et des constantes, ils activent toute une série d'autres fonctionnalités, notamment :

- [le renommage des exports et des imports][mdn-renaming-modules], qui permet d'éviter les conflits de noms,
- les [imports dynamiques][mdn-dynamic-imports], qui chargent du code à la demande,
- le [_tree shaking_][blog-tree-shaking], qui réduit la taille du code final en éliminant les modules sans effet de bord et même le contenu des modules _qui ne sont pas utilisés_,
- l'export de [_live bindings_][blog-live-bindings], qui permet d'exporter une valeur dont les modifications se propagent partout où elle est importée si la valeur d'origine est modifiée.

Un exemple concret est le fonctionnement des tests sur le parcours TypeScript d'Exercism.
Chaque exercice possède au moins un fichier d'implémentation, par exemple `lasagna.ts`, et chaque exercice possède au moins un fichier de test, par exemple `lasagna.test.ts`.
Le fichier d'implémentation utilise `export` pour exposer l'API publique, et le fichier de test utilise `import` pour y accéder, ce qui lui permet de tester les résultats de l'implémentation.

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
Comme le compilateur TypeScript _ne réécrit pas les chemins d'import_, les imports doivent être écrits avec l'extension `.js` (puisque c'est ce qu'ils deviendront après la transpilation).
Cependant, l'option `allowImportingTsExtensions` est activée parce que nous avons un processus qui réécrit les chemins.
Cela permet d'importer depuis `.ts` (ainsi que depuis `.js`).

Dans du code plus ancien, tu trouveras des imports _sans extension de fichier_.
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
