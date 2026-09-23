# À propos

## Syntaxe générale

La boucle `for` est l'une des instructions les plus courantes pour exécuter plusieurs fois une même logique.
En Go, elle se compose du mot-clé `for`, d'un en-tête et d'un bloc de code qui contient le corps de la boucle, entouré d'accolades.
L'en-tête se compose de 3 composants séparés par des points-virgules `;` : init, condition et post.

```go
for init; condition; post {
  // loop body - code that is executed repeatedly as long as the condition is true
}
```

- Le composant **init** est du code qui ne s'exécute qu'une seule fois, avant le démarrage de la boucle.
- Le composant **condition** doit être une expression qui s'évalue en un booléen et qui détermine quand la boucle doit s'arrêter.
  Le code à l'intérieur de la boucle s'exécute tant que cette condition est vraie.
  Dès que cette expression devient fausse, plus aucune itération de la boucle ne s'exécute.
- Le composant **post** est du code qui s'exécute à la fin de chaque itération.

**Note :** Contrairement à d'autres langages, les trois composants de l'en-tête ne sont pas entourés de parenthèses `()`.
En fait, insérer de telles parenthèses est une erreur de compilation.
En revanche, les accolades `{ }` qui entourent le corps de la boucle sont toujours obligatoires.

## Les boucles `for` : un exemple

Le composant init initialise généralement une variable compteur, la condition vérifie si la boucle doit continuer ou s'arrêter, et le composant post incrémente généralement le compteur à la fin de chaque répétition.

```go
for i := 1; i < 10; i++ {
  fmt.Println(i)
}
```

Cette boucle affiche les nombres de `1` à `9` (`9` compris).
Définir le pas se fait souvent à l'aide d'une instruction d'incrémentation ou de décrémentation, comme le montre l'exemple ci-dessus.

## Composants facultatifs de l'en-tête

Les composants init et post de l'en-tête sont facultatifs :

```go
var sum = 1
for sum < 1000 {
	sum += sum
}
fmt.Println(sum)
// Output: 1024
```

En omettant les composants init et post dans une boucle `for` comme ci-dessus, on crée une boucle _while_ en Go.
Il n'existe pas de mot-clé `while`.
C'est un exemple du principe de Go selon lequel les concepts doivent être orthogonaux.
Comme il existe déjà un concept qui permet d'obtenir le comportement d'une boucle _while_, à savoir la boucle `for`, `while` n'a pas été ajouté comme concept supplémentaire.

## `break` et `continue`

À l'intérieur du corps d'une boucle, tu peux utiliser le mot-clé `break` pour arrêter complètement l'exécution de la boucle :

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

En revanche, le mot-clé `continue` arrête seulement l'exécution de l'itération en cours et passe à la suivante :

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

## Boucle `for` infinie

La partie condition de l'en-tête de la boucle est elle aussi facultative.
En fait, tu peux écrire une boucle sans en-tête :

```go
for {
  // Endless loop...
}
```

Cette boucle ne se terminera que si le programme s'arrête ou si son corps contient un `break`.

## Étiquettes et `goto`

Quand on utilise `break`, Go arrête d'exécuter la boucle la plus interne.
De même, quand on utilise `continue`, Go passe à l'itération suivante de la boucle la plus interne.

Cependant, ce n'est pas toujours ce que l'on veut.
On peut utiliser des étiquettes avec `break` et `continue` pour préciser exactement de quelle boucle on veut sortir ou dans quelle boucle on veut poursuivre.

Dans cet exemple, on crée une étiquette `OuterLoop`, qui fait référence à la boucle la plus externe.
Dans la boucle la plus interne, pour indiquer que l'on veut sortir de la boucle la plus externe, on utilise `break` suivi du nom de l'étiquette de cette boucle externe :

```go
OuterLoop:
    for i := 0; i < 10; i++ {
        for j := 0; j < 10; j++ {
            // ...
            break OuterLoop
        }
    }
```

Utiliser des étiquettes avec `continue` fonctionnerait aussi, auquel cas Go poursuivrait à l'itération suivante de la boucle référencée par l'étiquette.

Go possède aussi un mot-clé `goto` qui fonctionne de manière similaire et qui permet de sauter d'un morceau de code à un autre morceau de code étiqueté.

**Attention :** Même si Go permet de sauter vers un morceau de code marqué par une étiquette, utiliser cette fonctionnalité du langage peut facilement rendre le code très difficile à lire.
C'est pourquoi l'usage des étiquettes est souvent déconseillé.
