# Acerca de

TypeScript es JavaScript con sintaxis para tipos, lo que lo convierte en un lenguaje de programación fuertemente tipado que admite estilos orientados a objetos, imperativos y declarativos (por ejemplo, la programación funcional), y te ofrece mejores herramientas a cualquier escala.
Tiene unos cuantos [primitivos][mdn-primitive], y todo lo demás se considera un objeto.

Aunque JavaScript es más conocido como el lenguaje de scripting de las páginas web, muchos entornos que no son navegadores también lo usan, como Node.js.
El lenguaje está en desarrollo activo y, gracias a su naturaleza multiparadigma, admite muchos estilos de programación.

TypeScript se construye sobre esto y también tiene un desarrollo activo.
En algunas clasificaciones de 2023 es más popular que JavaScript en el uso diario.

Como [no puedes aprender TypeScript sin aprender JavaScript][handbook-js-or-ts], parte del contenido de este track se centra en enseñar conceptos de JavaScript y algunos de los conceptos se centran solo en funcionalidades específicas de TypeScript.

## (Re)Asignación

Hay varias formas principales de asignar valores a nombres en TypeScript: usar variables o constantes.
En Exercism, las variables siempre se escriben en [camelCase][wiki-camel-case]; las constantes se escriben en [SCREAMING_SNAKE_CASE][wiki-snake-case].
No hay una guía oficial que seguir, y distintas empresas y organizaciones tienen distintas guías de estilo.
_Siéntete libre de escribir las variables como quieras_.
La ventaja de escribirlas tal como se preparan en los ejercicios es que se resaltarán de forma diferente en la interfaz web y en la mayoría de los IDE.

Las variables en TypeScript se pueden definir con la palabra clave [`const`][mdn-const], [`let`][mdn-let] o [`var`][mdn-var].

Una variable puede hacer referencia a distintos valores a lo largo de su vida cuando usas `let` o `var`.
Por ejemplo, `myFirstVariable` se puede definir y redefinir muchas veces con el operador de asignación `=`:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
myFirstVariable = new SomeComplexClass()
```

A diferencia de `let` y `var`, las variables que se definen con `const` solo se pueden asignar una vez.
Así es como se definen las constantes en TypeScript.

```typescript
const MY_FIRST_CONSTANT = 10

// Can not be re-assigned.
MY_FIRST_CONSTANT = 20
// => TypeError: Assignment to constant variable.
```

Como TypeScript puede detectar esto de forma estática, el compilador de TypeScript también dará un error:

```typescript
// ^? Cannot assign to 'MY_FIRST_CONSTANT' because it is a constant.(2588)
```

Esto significa que no necesitas ejecutar el código para detectar el `TypeError`.

<!--prettier-ignore -->
~~~~exercism/note
💡 En un ejercicio de aprendizaje posterior se explora y explica la diferencia entre la asignación o vinculación de una _constante_ y el valor _constante_.
~~~~

## Inferencia de tipos

Sin profundizar demasiado en el tema de la [inferencia de tipos][handbook-type-inference], debes saber que una variable asignada normalmente tiene un tipo inferido, incluso sin una anotación de tipo.

```typescript
const MY_FIRST_CONSTANT = 10
// ^? const MY_FIRST_CONSTANT: number
```

Ese tipo se aplica después en todo el código.
Esto también significa que, aunque el siguiente código es JavaScript válido:

```javascript
let myFirstVariable = 1
myFirstVariable = 'Some string'
```

se queja al usar TypeScript:

```typescript
let myFirstVariable = 1
myFirstVariable = 'Some string'
// ^? Type 'string' is not assignable to type 'number'.(2322)
```

Esta funcionalidad garantiza la seguridad de tipos incluso cuando no se usan anotaciones de tipo.

### Asignación de constantes

La palabra clave `const` se menciona _tanto_ para variables como para constantes.
Otro concepto que suele mencionarse en relación con las constantes es la [(in)mutabilidad][wiki-mutability].

La palabra clave `const` solo hace inmutable la _vinculación_, es decir, solo puedes asignar un valor a una variable `const` una vez.
En TypeScript, solo los valores [primitivos][mdn-primitive] son inmutables.
Sin embargo, los valores [no primitivos][mdn-primitive] sí se pueden mutar.

```typescript
const MY_MUTABLE_VALUE_CONSTANT = { food: 'apple' }

// This is possible
MY_MUTABLE_VALUE_CONSTANT.food = 'pear'

MY_MUTABLE_VALUE_CONSTANT
// => { food: "pear" }
```

### Valor constante (inmutabilidad)

Por regla general, en Exercism, y en muchas otras organizaciones y guías de estilo de proyectos, no mutes los valores que se ven como `const SCREAMING_SNAKE_CASE`.
Técnicamente los valores _se pueden_ cambiar, pero por claridad y para gestionar las expectativas en Exercism, esto no se recomienda.
Cuando esto _deba_ aplicarse, usa [`Object.freeze(value)`][mdn-object-freeze].

Cuando sea posible, se puede usar la palabra clave `readonly` de TypeScript, `as const` o el tipo genérico `Readonly<T>` para aplicar la inmutabilidad de forma estática.
Aprenderás más sobre este tema más adelante.

```typescript
const MY_VALUE_CONSTANT = Object.freeze({ food: 'apple' })

MY_VALUE_CONSTANT.food = 'pear'
// ^? Cannot assign to 'food' because it is a read-only property.(2540)

MY_VALUE_CONSTANT
// => { food: "apple" }
```

En la práctica, es poco probable ver `Object.freeze` por todo un código base, pero la regla de no mutar nunca un valor `SCREAMING_SNAKE_CASE` es una buena regla; a menudo se aplica con análisis automatizado, como un linter.

## Declaraciones de funciones

En TypeScript, las unidades de funcionalidad se encapsulan en _funciones_, que normalmente se agrupan en el mismo archivo si van juntas.
Estas funciones pueden recibir parámetros (argumentos) y pueden _devolver_ un valor con la palabra clave `return`.
Las funciones se invocan con la sintaxis `()`.

```typescript
function add(num1: number, num2: number): number {
  return num1 + num2
}

add(1, 3)
// => 4
```

Los parámetros de las funciones normalmente se deben anotar con un tipo usando dos puntos (`:`) seguidos del tipo.
Los valores de retorno de las funciones se pueden anotar después de cerrar la lista de parámetros usando dos puntos (`:`) seguidos del tipo.

Si una función no tiene una anotación de tipo para su valor de retorno, el tipo se inferirá.

```typescript
function add(num1: number, num2: number) {
  return num1 + num2
}

add(1, 3)
// ^? function add(num1: number, num2: number): number
```

Aquí se infirió el tipo de retorno porque TypeScript sabe que el resultado de `number + number` siempre debe ser `number`.

<!--prettier-ignore -->
~~~~exercism/note
💡 En TypeScript hay _muchas_ formas distintas de declarar una función.
Esas otras formas se ven diferentes de usar la palabra clave `function`.
El track intenta presentarlas poco a poco, pero si ya las conoces, siéntete libre de usar cualquiera de ellas.
En la mayoría de los casos, usar una u otra no es mejor ni peor.
~~~~

## Anotaciones de tipo

Como se muestra en la declaración de la función `add`, los parámetros tienen una anotación de tipo explícita `: number`.
Las declaraciones de variables, las propiedades de clase, las declaraciones de funciones y más admiten anotaciones de tipo.

Tanto las anotaciones de tipo explícitas como los tipos inferidos los aplica el verificador de tipos.

```typescript
add('foo', 3)
// ^? Argument of type 'string' is not assignable to parameter of type 'number'.(2345)
```

Si TypeScript no encuentra una anotación de tipo explícita y no puede inferir el tipo, le asignará el tipo `any`, que [no deberías usar][handbook-dont-use-any].
Más adelante aprenderás sobre el tipo `unknown` como una buena alternativa.

## Exportar e importar

Las palabras clave `export` e `import` son herramientas potentes que convierten un archivo de TypeScript común en un [módulo de TypeScript][mdn-module].
Además de permitir que el código exponga de forma selectiva componentes, como funciones, clases, variables y constantes, también habilita toda una serie de otras funcionalidades, como:

- [Renombrar exportaciones e importaciones][mdn-renaming-modules], lo que te permite evitar conflictos de nombres,
- [Importaciones dinámicas][mdn-dynamic-imports], que carga código a demanda,
- [Tree shaking][blog-tree-shaking], que reduce el tamaño del código final al eliminar módulos sin efectos secundarios e incluso el contenido de módulos _que no se usan_,
- Exportar [_vinculaciones en vivo_][blog-live-bindings], lo que te permite exportar un valor que se muta en todos los lugares donde se importa si el valor original se muta.

Un ejemplo concreto es cómo funcionan las pruebas en el track de TypeScript de Exercism.
Cada ejercicio tiene al menos un archivo de implementación, por ejemplo `lasagna.ts`, y cada ejercicio tiene al menos un archivo de prueba, por ejemplo `lasagna.test.ts`.
El archivo de implementación usa `export` para exponer la API pública y el archivo de prueba usa `import` para acceder a ella, que es como puede probar los resultados de la implementación.

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
Como el compilador de TypeScript _no reescribe las rutas de importación_, las importaciones se deben escribir con la extensión `.js` (ya que es lo que serán después de la transpilación).
Sin embargo, la opción `allowImportingTsExtensions` está activada porque tenemos un proceso que reescribe las rutas.
Esto permite importar desde `.ts` (y también desde `.js`).

En código más antiguo encontrarás importaciones _sin extensión de archivo_.
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
