# Introduction

En Swift, l'instruction `guard` sert à sortir plus tôt d'une fonction, d'une boucle ou d'une méthode lorsqu'une condition nécessaire n'est pas remplie :

```swift
guard myValue >= 0 else { return 0 }
let root = myValue.squareRoot()
```

Dans l'exemple ci-dessus, `guard` évalue l'expression booléenne qui suit le mot-clé `guard`.
Si la condition est `true`, le traitement se poursuit avec le code qui suit l'instruction `guard`.
Si la condition est `false`, c'est le code du bloc `else` qui sera exécuté.

Contrairement à une instruction `if` :

- Une instruction `guard` **doit** comporter une clause `else`.
- La clause `else` **doit** transférer le contrôle pour sortir de la portée englobante (par exemple, en utilisant `return`, `continue`, `break`, ou en levant une erreur).

On utilise souvent `guard` pour valider proprement des préconditions.
Prenons l'exemple de la fonction sinc ($\text{sinc}(x) = \frac{\sin(x)}{x}$, avec $\text{sinc}(0) = 1$ pour éviter une division par zéro) :

```swift
func sinc(_ x: Double) -> Double {
    guard x != 0 else { return 1 }
    return sin(x) / x
}

sinc(0)             // returns 1
sinc(Double.pi / 2) // returns 0.6366197723675814
```
