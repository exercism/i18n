# Guide de style Rexx

Ce guide décrit le style à employer pour les fichiers de test et d'exemple des exercices du parcours Rexx.

## Norme Rexx

Le code doit être conforme au niveau 5.0 du langage Rexx.

Les extensions de Regina Rexx, ainsi que les fonctions standard SAA pour l'accès aux bibliothèques externes, peuvent être utilisées.

Les extensions AREXX et les routines de manipulation de tampons de CMS ne doivent pas être utilisées.

## Plateforme

L'environnement d'exécution des tests repose sur Linux ; par conséquent, seules les commandes disponibles dans cet environnement peuvent être utilisées dans les invocations de l'instruction ADDRESS. Celles-ci doivent être clairement signalées dans les commentaires du code.

## Noms

### Instructions

Les instructions (mots réservés) doivent être écrites en **_minuscules_**. Ainsi, ce qui suit est conforme aux recommandations du guide de style :

```rexx
do while input \= ''
  parse var input char +1 input
  say char
end
```

tandis qu'aucun des cas suivants n'est conforme et n'est donc recommandé :

```rexx
/* *** Not recommended *** */
Do While input \= ''
  Parse Var input char +1 input
  Say char
End
```

et :

```rexx
/* *** Not recommended *** */
DO WHILE input \= ''
  PARSE VAR input char +1 input
  SAY char
END
```

### Fonctions intégrées (BIFs)

Les BIF doivent être écrites en **_majuscules_**, comme illustré ici :

```rexx
input = 'ABCDE'
say 'Length of input is' LENGTH(input)
say 'First letter of input is' SUBSTR(input, 1, 1)
```

### Étiquettes (fonctions définies par l'utilisateur)

Les noms d'étiquettes doivent être en **_`PascalCase`_**, comme ci-dessous :

```rexx
greeting = MyFuncSayHello()
say greeting

exit 0

MyFuncSayHello : procedure
  hello = 'Hello there!'
return hello
```

### Variables

Les noms de variables doivent commencer par une lettre **_minuscule_**, si bien qu'une variable d'un seul mot sera entièrement en minuscules.

Les variables de plusieurs mots peuvent s'écrire en **_`camelCase`_** ou en **_`snake_case`_**.

La convention adoptée pour ce parcours est d'utiliser le **_`camelCase`_** pour la plupart des variables, et de réserver le `snake_case` aux variables de test. Les variables destinées à être des constantes peuvent, en option, elles aussi être en majuscules.

```rexx
input = 'ABCDE'
i = 0

personName = 'Alice'
test_person_description = 'Brown hair, blue eyes'

TRUE = 1
PI_CONSTANT = 3.14159
```

## Littéraux

Les chaînes peuvent être délimitées par des guillemets simples ou doubles, **`'`** et **`"`** respectivement. Les deux formes suivantes sont équivalentes :

```rexx
say "Hello, world!"

say 'Hello, world!'
```

Chacune peut être incluse dans l'autre sans qu'il soit besoin d'un caractère d'échappement :

```rexx
say "Please don't do that as it's wrong."

say 'He said, "Please sir, may I have more?".'
```

Sauf si les chaînes contiennent des guillemets imbriqués, ce qui oblige à mélanger les types de guillemets, il est préférable de délimiter les chaînes par des **_guillemets simples_**.

### Chaînes hexadécimales et binaires

On peut représenter des valeurs binaires et hexadécimales en ajoutant respectivement un **`B`** ou un **`X`** à la fin d'une chaîne. Exemples :

```rexx
hexvalue = "0A"X

binvalue = "00001010"B
```

Il est recommandé de délimiter ces valeurs par des **_guillemets doubles_**.

Combinée à la recommandation précédente d'utiliser des guillemets simples pour les chaînes ordinaires, cette convention facilite le repérage des chaînes binaires et hexadécimales dans une base de code.

### Terminateur de nouvelle ligne
Dans de nombreux langages UNIX ou influencés par le C, le littéral **_`\n`_** sert de terminateur de **_nouvelle ligne_**. Cet usage est très répandu, et plusieurs exercices de ce parcours impliquent d'utiliser et de manipuler des chaînes contenant ce terminateur.

Rexx ne prend pas en charge ce terminateur, ni **_`\`_** (ni aucun autre caractère) comme caractère d'échappement.

L'équivalent Rexx du caractère de nouvelle ligne est une valeur hexadécimale (dépendante de la plateforme) ; sur les plateformes dérivées d'UNIX, c'est :

**_`"0A"X`_**

L'équivalent Rexx de la chaîne suivante, contenant des nouvelles lignes (avec le shell bash) :

```bash
printf "I have\nthree embedded\nnewlines.\n"
```

est :

```rexx
say 'I have' || "0A"X || 'three embedded' || "0A"X || 'newlines.' || "0A"X
```

Dans ce parcours, les exercices ne convertiront **_`\n`_** en **_`"0A"X`_** que lorsque c'est nécessaire dans une chaîne destinée à l'affichage sur le terminal. Sinon, la chaîne **_`\n`_** sera simplement interprétée comme une nouvelle ligne logique.

## Autres recommandations de style

L'indentation peut utiliser deux, trois ou quatre caractères ESPACE, bien qu'une indentation de _deux caractères_, et une indentation cohérente, soient préférables.

La dernière instruction **_`return`_** d'une fonction doit être alignée sur le nom de l'étiquette, ce qui marque clairement la fin de cette fonction, et elle doit _toujours_ renvoyer une valeur.

L'opérateur booléen NON peut s'écrire avec plusieurs symboles différents. Le symbole privilégié dans ce parcours est **`\`** et, pour rester cohérent avec cet usage, l'opérateur relationnel « différent de » doit être **`\=`**.

Les valeurs booléennes **`false`** et **`true`** sont représentées respectivement par **`0`** et **`1`**. Il n'existe aucun littéral prédéfini pour ces valeurs.

Les états d'erreur sont signalés par les valeurs de retour : soit la chaîne vide, **`''`**, soit **`-1`**, selon le contexte.

## Exemple canonique de style de code
```rexx
TO DO EXAMPLE
```

## Structure du fichier de test

Un exercice possède un seul fichier de test, situé dans le répertoire de premier niveau de l'exercice, nommé : `<exercise>-check.rexx`

Si l'on suit cette convention, le fichier de test de l'exercice `acronym` s'appellera : `acronym-check.rexx`

Le fichier de test de chaque exercice suit une organisation souple mais précise, afin d'aider les apprenants à comprendre les exigences de l'exercice et de faciliter la tâche du contributeur qui doit implémenter ou étendre les tests.

Voici un extrait du fichier de test de l'exercice `acronym` :

```rexx
/* Unit Test Runner: t-rexx */
function = 'Abbreviate'
context('Checking the' function 'function')

/* Unit tests */
check('basic' function||'("Portable Network Graphics")',,
      function||'("Portable Network Graphics")',, 'to be', 'PNG')

check('lowercase words' function||'("Ruby on Rails")',,
      function||'("Ruby on Rails")',, 'to be', 'ROR')
```

Le fichier est divisé en deux sections logiques, chacune identifiée par une ligne de commentaire.

La première section affecte le nom de la **_fonction testée_** (ici la fonction `Abbreviate`) à la variable `function`. Ce nom de variable est descriptif, mais arbitraire ; il est utilisé dans le reste du fichier partout où le nom de la fonction testée est nécessaire.

Cette section contient aussi un appel à la fonction `context`, dont l'objet va de soi.

La section suivante contient les tests unitaires. Chaque invocation de la fonction `check` est un test unitaire. Paramètres attendus :

```rexx
check(<test description>,
      <function invocation>,
      [<actual result variable>],
      <test comparator>,
      <expected result>)
```

**\<test description>** est la chaîne émise lors de l'exécution du test. Pour qu'elle soit aussi descriptive que possible, il est recommandé d'utiliser une chaîne composée du nom de la fonction testée et des arguments qui lui sont passés, comme dans l'exemple.

**\<function invocation>** est l'invocation ou l'appel de fonction proprement dit, qui passe donc sa valeur de retour à `check` pour la comparaison du test.

**\<actual result variable>** est un paramètre facultatif ; s'il est utilisé, il s'agit du nom d'une variable contenant la valeur à employer pour la comparaison du test.

L'intérêt est de pouvoir vérifier des résultats _dérivés de_ la valeur de retour de la fonction testée plutôt que la valeur de retour elle-même. Un exemple évident est celui où la valeur de retour est une chaîne de plusieurs kilo-octets, comme ci-dessous :

```rexx
expected_length = LENGTH(FUT(...))

check('...', FUT(...), expected_length, 'to be', 50)
```

À noter que l'argument \<function invocation> doit quand même être fourni.

**\<test comparator>** est une chaîne décrivant le type de comparaison à effectuer. Dans la plupart des cas, il s'agit de la chaîne « to be », qui demande une comparaison d'égalité. Reporte-toi à la documentation du framework de tests unitaires pour les autres options de comparaison.

**\<expected result>** est, de toute évidence, la valeur à laquelle le résultat réel est comparé.

On peut déclarer librement des variables dans le fichier de test (avant de les utiliser, bien sûr) et s'en servir à la place de littéraux, comme arguments de `check`.
