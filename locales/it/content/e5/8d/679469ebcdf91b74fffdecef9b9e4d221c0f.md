# Informazioni

TypeScript è JavaScript con una sintassi per i tipi, il che lo rende un linguaggio di programmazione fortemente tipizzato che supporta gli stili orientato agli oggetti, imperativo e dichiarativo (per esempio la programmazione funzionale), offrendoti strumenti migliori a qualsiasi scala.
Ha alcuni [tipi primitivi][mdn-primitive], e tutto il resto è considerato un oggetto.

Mentre JavaScript è il più noto come linguaggio di scripting per le pagine web, anche molti ambienti non browser lo usano, come Node.js.
Il linguaggio è in sviluppo attivo e, grazie alla sua natura multi-paradigma, consente molti stili di programmazione.

TypeScript si basa su tutto questo ed è anch'esso in sviluppo attivo.
In alcune classifiche del 2023 è più popolare di JavaScript nell'uso quotidiano.

Dato che [non puoi imparare TypeScript senza imparare JavaScript][handbook-js-or-ts], parte dei contenuti di questo percorso è incentrata sull'insegnamento di concetti JavaScript, mentre altri concetti si concentrano solo sulle funzionalità specifiche di TypeScript.

## (Ri)assegnazione

In TypeScript ci sono alcuni modi principali per assegnare valori ai nomi: usando variabili o costanti.
Su Exercism, le variabili si scrivono sempre in [camelCase][wiki-camel-case], mentre le costanti si scrivono in [SCREAMING_SNAKE_CASE][wiki-snake-case].
Non esiste una guida ufficiale da seguire, e aziende e organizzazioni diverse hanno guide di stile diverse.
_Sentiti libero di scrivere le variabili come preferisci_.
Il vantaggio di scriverle come sono preparate negli esercizi è che verranno evidenziate in modo diverso nell'interfaccia web e nella maggior parte degli IDE.

In TypeScript, le variabili possono essere definite usando la parola chiave [`const`][mdn-const], [`let`][mdn-let] o [`var`][mdn-var].

Quando si usa `let` o `var`, una variabile può fare riferimento a valori diversi nel corso della sua esistenza.
Per esempio, `myFirstVariable` può essere definita e ridefinita più volte usando l'operatore di assegnazione `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

A differenza di `let` e `var`, le variabili definite con `const` possono essere assegnate una sola volta.
Questo è il meccanismo usato per definire le costanti in TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Poiché TypeScript è in grado di rilevarlo staticamente, anche il compilatore TypeScript produrrà un errore:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Questo significa che non devi eseguire il codice per individuare il `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 In un esercizio di apprendimento successivo esploreremo e spiegheremo la differenza tra l'assegnazione (o il binding) di una _costante_ e il _valore_ costante.
~~~~

## Inferenza dei tipi

Senza addentrarci troppo nell'argomento dell'[inferenza dei tipi][handbook-type-inference], sappi che una variabile a cui viene assegnato un valore ha di solito un tipo inferito, anche in assenza di un'annotazione di tipo.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Questo tipo viene poi imposto in tutto il codice.
Questo significa anche che, mentre il seguente codice è JavaScript valido:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

In TypeScript invece dà errore:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Questa funzionalità garantisce la sicurezza dei tipi anche quando non si usano annotazioni di tipo.

### Assegnazione delle costanti

La parola chiave `const` viene citata _sia_ per le variabili che per le costanti.
Un altro concetto spesso citato a proposito delle costanti è la [(im)mutabilità][wiki-mutability].

La parola chiave `const` rende immutabile solo il _binding_: in pratica, puoi assegnare un valore a una variabile `const` una sola volta.
In TypeScript, solo i valori [primitivi][mdn-primitive] sono immutabili.
I valori [non primitivi][mdn-primitive], invece, possono comunque essere mutati.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Valore costante (immutabilità)

Come regola, su Exercism e in molte altre organizzazioni e guide di stile di progetto, non mutare i valori che hanno l'aspetto di `const SCREAMING_SNAKE_CASE`.
Tecnicamente quei valori _possono_ essere cambiati, ma per chiarezza e per gestire le aspettative su Exercism questo è sconsigliato.
Quando questo _deve_ essere imposto, usa [`Object.freeze(value)`][mdn-object-freeze].

Dove possibile, si possono usare la parola chiave TypeScript `readonly`, `as const` o il tipo generico `Readonly<T>` per imporre l'immutabilità in modo statico.
Approfondirai questo argomento più avanti.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

Nella pratica è improbabile vedere `Object.freeze` sparso per tutto il codice, ma la regola di non mutare mai un valore `SCREAMING_SNAKE_CASE` è una buona regola, spesso imposta tramite analisi automatiche come un linter.

## Dichiarazione di funzioni

In TypeScript, le unità di funzionalità sono incapsulate nelle _funzioni_, che di solito vengono raggruppate nello stesso file se appartengono insieme.
Queste funzioni possono accettare parametri (argomenti) e possono _restituire_ un valore usando la parola chiave `return`.
Le funzioni si chiamano usando la sintassi `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

I parametri di una funzione dovrebbero di solito essere annotati con un tipo, usando i due punti (`:`) seguiti dal tipo.
I valori restituiti da una funzione possono essere annotati dopo la chiusura dell'elenco dei parametri, usando i due punti (`:`) seguiti dal tipo.

Se una funzione non ha un'annotazione di tipo per il suo valore restituito, il tipo verrà inferito.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Qui il tipo restituito è stato inferito perché TypeScript sa che il risultato di `number + number` deve sempre essere `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 In TypeScript ci sono _molti_ modi diversi per dichiarare una funzione.
Questi altri modi sono diversi dall'uso della parola chiave `function`.
Il percorso cerca di introdurli gradualmente, ma se li conosci già, sentiti libero di usarne uno qualsiasi.
Nella maggior parte dei casi, usare l'uno o l'altro non è né meglio né peggio.
~~~~

## Annotazioni di tipo

Come mostrato nella dichiarazione della funzione `add`, i parametri hanno un'annotazione di tipo esplicita `: number`.
Le dichiarazioni di variabili, le proprietà delle classi, le dichiarazioni di funzioni e altro ancora supportano tutte le annotazioni di tipo.

Sia le annotazioni di tipo esplicite sia i tipi inferiti vengono verificati dal controllo dei tipi.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Se TypeScript non trova un'annotazione di tipo esplicita e non riesce a inferire il tipo, assegnerà il tipo `any`, che [non dovresti usare][handbook-dont-use-any].
Più avanti conoscerai il tipo `unknown` come buona alternativa.

## Export e import

Le parole chiave `export` e `import` sono strumenti potenti che trasformano un normale file TypeScript in un [modulo TypeScript][mdn-module].
Oltre a permettere al codice di esporre in modo selettivo dei componenti, come funzioni, classi, variabili e costanti, abilitano tutta una serie di altre funzionalità, come:

- [Rinominare export e import][mdn-renaming-modules], che ti permette di evitare conflitti di nomi,
- [Import dinamici][mdn-dynamic-imports], che caricano il codice su richiesta,
- [Tree shaking][blog-tree-shaking], che riduce la dimensione del codice finale eliminando i moduli privi di effetti collaterali e persino i contenuti dei moduli _che non vengono usati_,
- L'esportazione di [_live bindings_][blog-live-bindings], che ti permette di esportare un valore che muta ovunque venga importato, se il valore originale muta.

Un esempio concreto è come funzionano i test nel percorso TypeScript di Exercism.
Ogni esercizio ha almeno un file di implementazione, per esempio `lasagna.ts`, e almeno un file di test, per esempio `lasagna.test.ts`.
Il file di implementazione usa `export` per esporre l'API pubblica, mentre il file di test usa `import` per accedervi, ed è così che può verificare i risultati dell'implementazione.

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
Dato che il compilatore TypeScript _non riscrive i percorsi di import_, gli import dovrebbero essere scritti usando l'estensione `.js` (perché è quello che diventeranno dopo la transpilazione).
Tuttavia, l'opzione `allowImportingTsExtensions` è attiva perché abbiamo un processo che riscrive i percorsi.
Questo permette di importare da `.ts` (oltre che da `.js`).

In codice più vecchio troverai import _senza estensione di file_.
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
