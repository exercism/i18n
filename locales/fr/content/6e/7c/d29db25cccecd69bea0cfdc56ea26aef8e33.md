# Conseils de mentorat

## Les notes de mentorat

L'une des plus grandes aides au mentorat peut être de disposer d'un fichier pour conserver des notes sur chaque exercice que tu mentors.
Tu verras sans doute que beaucoup de solutions tirent profit des mêmes suggestions : en gardant ces notes, tu n'as plus besoin de réécrire les mêmes recommandations de mémoire.
Et en regroupant tes suggestions au même endroit, tu peux les affiner au fil du temps pour les rendre plus claires.

Si tu ne sais pas comment commencer tes notes, tu trouveras peut-être un fichier `mentoring.md` pour l'exercice de ton parcours dans [exercism/website-copy/tracks][website-copy].
S'il existe, il peut contenir des exemples de solutions raisonnables, ainsi que des suggestions courantes et des points de discussion pour alimenter l'échange.
S'il n'existe pas, tu voudras peut-être le créer après avoir constitué ton propre fichier de notes pour cet exercice.

Par ailleurs, même si tu ne mentors qu'un seul langage aujourd'hui, tu en mentoras peut-être d'autres plus tard.
Il peut être utile d'organiser tes notes de mentorat par parcours autant que par nom d'exercice, car des parcours différents demanderont probablement des suggestions différentes pour le même exercice.

Les notes de mentorat sont pratiques, que tu mentors l'exercice souvent ou rarement.
Si tu le mentors souvent, elles t'épargnent beaucoup de frappe, puisque tu peux simplement copier-coller depuis tes notes.
Si tu le mentors rarement, elles te rappellent des suggestions que tu aurais pu oublier depuis les semaines ou les mois qui se sont écoulés.

Il n'y a aucun mal à ce que les notes de mentorat diffèrent d'un mentor à l'autre.
Voici une façon de les structurer, mais ce n'est pas la _seule_.

Félicite l'apprenant d'avoir réussi les tests (s'il les a réussis).

Si l'exercice traîne dans la file d'attente depuis quelques jours, tu peux éventuellement le mentionner, par exemple :

>Désolé, il a fallu un moment avant que quelqu'un te réponde.
>Il y a actuellement une pénurie de mentors JavaScript actifs pour `Resistor Color Duo`.

Énumère ce qui te plaît dans la solution de l'apprenant.
Par exemple :

- J'aime le fait que cette solution soit concise et lisible.

- J'aime l'utilisation de `indexOf`.

- J'aime le fait que cette solution emploie l'approche `(first * 10) + second` pour éviter de convertir un nombre en _string_ puis de nouveau en nombre.

- J'aime le fait que cette solution n'utilise ni boucle ni itération.

- J'aime le paramètre déstructuré.

Viennent ensuite tes suggestions habituelles.

~~~~exercism/note
Il peut être très utile pour l'apprenant d'avoir un lien pour chaque nouvelle fonctionnalité du langage que tu présentes.
Par exemple :

>Ce n'est pas nécessaire pour cet exercice, mais tu peux envisager de convertir la fonction en [fonction fléchée](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).
~~~~

Même si on ne veut pas donner la solution, il arrive qu'un apprenant apprenne mieux par l'exemple.
Placer un extrait de code dans une section de détails repliable peut fournir cet exemple, que l'apprenant choisira de déplier ou non.
Par exemple :

&lt;details&gt;&lt;summary&gt;Exemple spoiler&lt;/summary&gt;

&lt;pre&gt;

export const decodedValue = ([firstColor, secondColor]) =>
  COLORS.indexOf(firstColor) * 10 + COLORS.indexOf(secondColor)

&lt;/pre&gt;

&lt;/details&gt;

Vers la fin de tes notes, tu peux ajouter un lien vers une solution publiée qui illustre pleinement tes suggestions.

Tout en bas de tes notes, tu peux regrouper les explications détaillées que les apprenants demandent parfois.
Ces explications ne reviennent pas souvent, mais il reste utile de les noter la première fois que tu les utilises : ainsi, la fois suivante, qui peut être des semaines ou des mois plus tard, tu n'auras pas à réinventer l'explication de zéro.
Par exemple, il arrive qu'un apprenant demande comment l'approche par multiplication fonctionnerait pour Duo de couleurs de résistance si le noir était le premier anneau, pour un zéro en tête :

>Le noir en premier anneau est un bon point à examiner, alors regardons-le.
>La couleur d'un anneau de résistance sert à représenter la valeur en ohms de la résistance,
>et on n'utiliserait pas de zéro en tête pour une résistance à plusieurs anneaux.
>Le noir ne serait donc pas un premier anneau.
>D'ailleurs, `parseInt` ou `Number` suppriment aussi le zéro en tête.

Une catégorie facultative de données à conserver dans tes notes de mentorat est un relevé des benchmarks de diverses solutions ou approches.

## Réaliser des benchmarks

Une préoccupation fréquente chez les apprenants est la performance de leur solution.
C'est particulièrement le cas pour les langages « bas niveau » comme C, C++, Go et Rust.
Outre le caractère idiomatique de leur code, les apprenants d'autres langages se préoccupent aussi souvent de son efficacité.

~~~~exercism/note
Réaliser des benchmarks n'est pas quelque chose qu'un mentor est _censé_ faire.
Cependant, les apprenants sont souvent particulièrement impressionnés de voir comment le benchmark de leur solution se compare à d'autres approches.
~~~~

Go est un parcours particulièrement accueillant pour les benchmarks, car ceux-ci sont souvent inclus dans le fichier de tests.
Pour d'autres langages, il faudra peut-être chercher un peu pour déterminer quelle méthode te conviendra le mieux.
Par exemple, si tu utilises uniquement l'éditeur en ligne, tu chercheras un endroit où lancer des benchmarks en ligne.
Ainsi, [JSBench.me][jsbench-me] est un outil de benchmark en ligne pour JavaScript.

Si tu exécutes le code en local, tu peux télécharger un logiciel de benchmark à faire tourner sur ta machine.
Par exemple, Rust peut utiliser [Criterion][criterion], ou [cargo bench][cargo-bench] avec les [tests de benchmark][rust-benchmark-tests].

Il existe au moins deux façons de suivre les benchmarks.
L'une consiste à tenir une liste continue de toutes les solutions que tu as benchmarkées, mais elle peut devenir ingérable si elle s'allonge.
L'autre consiste à tenir une liste de benchmarks représentatifs pour différentes approches.
Les apprenants veulent souvent voir le code des approches plus rapides ; si une approche plus rapide est publiée, fournir le lien vers celle-ci sera probablement très apprécié.

~~~~exercism/caution
Si tu fournis un lien vers une solution que tu as benchmarkée, veille bien à donner le lien de la solution publiée et non celui de la discussion de mentorat.
Toutes les solutions mentorées ne sont pas publiées.
~~~~

## Les notes de mentorat qui ne sont pas propres à un exercice

Il se peut que tu abordes certaines fonctionnalités du langage pour plusieurs exercices.
Quand tu t'apprêtes à copier-coller une suggestion d'un fichier à un autre, envisage plutôt de lui consacrer son propre fichier.
Là encore, garder une suggestion au même endroit permet de l'affiner plus facilement au fil du temps.
Cela facilite aussi sa recherche lorsque tu l'utilises pour un exercice où tu ne l'as jamais employée.
Au lieu d'essayer de te rappeler dans quel exercice tu avais déjà abordé cette suggestion, tu peux aller directement au fichier qui lui est consacré.

## Quand un apprenant pose une question

On encourage les apprenants à préciser ce qu'ils attendent de la discussion de mentorat.
Ils le formulent souvent sous forme de question.
Si tu ne connais pas la réponse à la question et qu'elle ne t'intéresse pas, tu peux laisser la demande de mentorat à un autre mentor.

Si tu ne connais pas la réponse mais que tu veux la trouver, il vaut mieux ne pas prendre la demande de mentorat avant de l'avoir apprise.
Si la demande de mentorat a disparu entre-temps, tu auras au moins appris quelque chose sans avoir fait attendre l'apprenant.

Une exception possible : si la demande de mentorat est déjà dans la file d'attente de mentorat depuis plusieurs jours, ou plus.
Dans ce cas, tu peux prendre la demande et donner le retour que tu peux, en prévenant l'apprenant que tu reviendras vers lui au sujet de sa question.
Bien sûr, il est important de donner suite, que ce soit pour communiquer la réponse à l'apprenant ou pour lui dire que tu ne l'as pas trouvée.
Si tu n'as pas trouvé la réponse, décrire les pistes que tu as suivies peut être utile à l'apprenant.
L'apprenant pourra peut-être proposer d'autres pistes.
La réponse peut émerger de cet échange.

Si tu as épuisé toutes les pistes que tu connais, tu peux suggérer à l'apprenant de clôturer la discussion et de soumettre à nouveau sa demande, au cas où un autre mentor apporterait la réponse.
S'il le souhaite, l'apprenant peut publier un message sur la discussion clôturée pour te transmettre la réponse une fois qu'il l'aura apprise.
Et réciproquement, si tu découvres la réponse plus tard, tu peux revenir sur la discussion clôturée pour en informer l'apprenant.

Si tu connais la réponse et que tu veux la traiter, un bon endroit pour le faire est entre le moment où tu dis à l'apprenant ce qui te plaît dans sa solution et celui où tu proposes d'autres approches.

### Le code qui échoue

Un code peut échouer soit parce qu'il ne passe pas tous les tests, soit parce qu'il ne compile pas ou ne satisfait pas l'interprète.

Les mentors n'ont pas tous la même envie ni la même patience face à du code qui échoue, et cela dépend en partie de la façon dont il est présenté, car ce code n'est pas toujours présenté de la même manière.

Il arrive qu'un apprenant explique qu'il a essayé une autre approche, que ça n'a pas marché, et demande pourquoi.
Le code peut même ne pas être fourni, ou être collé dans un commentaire pratiquement illisible plutôt que dans une itération.

Une solution testée dans l'éditeur en ligne ne peut être soumise pour une demande de mentorat que si elle a passé tous les tests.
L'une des raisons est de permettre au mentor de se concentrer sur des améliorations ou d'autres approches du code qui fonctionne déjà.
_Déboguer_ du code n'est pas forcément ce qu'un mentor souhaite faire, ni ce qu'on attend de lui.
En revanche, une solution qui échoue, soumise via la CLI, peut faire l'objet d'une demande de mentorat, l'apprenant demandant alors de l'aide pour la résoudre.

Si le code qui échoue n'a pas été fourni et que l'approche décrite ne semble pas bonne, il peut suffire de suggérer une troisième voie, différente à la fois de l'approche qui a échoué et de celle qui a passé les tests.
Ou il peut suffire d'expliquer pourquoi l'approche retenue est meilleure que celle qui a échoué, sans entrer dans le détail du bug qui l'affectait.

Par exemple, il est fréquent que des apprenants rencontrent des difficultés avec Nom de robot.
Soit les tests expirent, soit la génération de noms n'en produit pas assez, et ils veulent savoir comment corriger cela.
Si tu en as l'envie et la patience, tu peux tout à fait analyser leur code et proposer une solution au problème.
Ou tu peux expliquer que vérifier des noms générés aléatoirement provoque de plus en plus de collisions à mesure que les noms sont générés, et suggérer de générer les noms de façon séquentielle puis de les mélanger.

Si le code qui échoue a été collé dans un commentaire pratiquement illisible, tu peux donner le retour que tu peux sur la solution qui passe, et suggérer à l'apprenant de soumettre le code du commentaire comme nouvelle itération.
Tu peux aussi lui suggérer de consulter les erreurs de l'itération qui échoue pour repérer l'endroit du problème.

Si le code se trouve dans une itération qui échoue, il peut être utile d'indiquer à l'apprenant de consulter les erreurs de l'exécution des tests.
Certains langages demandent un peu plus d'accompagnement que d'autres pour lire les erreurs ou les résultats de tests.
Il peut être utile de citer un ou plusieurs passages des erreurs et d'expliquer à l'apprenant ce qu'ils signifient.

En fin de compte, ce n'est pas au mentor de corriger le code qui échoue de l'apprenant, mais s'il le souhaite, il peut lui suggérer des pistes pour le corriger lui-même.

## Gérer le flux de la file d'attente

Il peut arriver que tu t'inscrives pour mentorer un parcours sans jamais voir d'exercice dans sa file d'attente de mentorat.
Tu peux croire qu'il y a un problème, mais il y a au moins deux explications possibles.
La première est que personne ne demande de mentorat sur ce parcours pour le moment.
Un parcours peut connaître des périodes d'inactivité.
La seconde est que d'autres mentors prennent les demandes avant que tu ne les voies.
C'est probablement le cas d'un parcours populaire qui compte de nombreux mentors actifs.

Si la file d'attente contient de nombreuses demandes, plusieurs façons de les traiter s'offrent à toi.
Tu peux commencer par les plus anciennes pour finir par les plus récentes, afin que ceux qui attendent depuis le plus longtemps soient traités en premier.
Ou tu peux choisir de partir des plus récentes, surtout si les plus anciennes attendent déjà depuis longtemps.
Ainsi, les personnes récemment actives n'ont pas à attendre que tout l'arriéré soit traité.

S'il y a plusieurs demandes pour le même exercice, tu peux les traiter par lots du même exercice pour rester concentré, plutôt que de passer de l'exercice A à l'exercice B puis de revenir à l'exercice A.

Il se peut qu'une demande portant sur un exercice qui ne t'intéresse pas traîne là depuis des jours ou des semaines.
Tu peux choisir de ne pas t'en occuper en espérant qu'un autre mentor la prenne, ou elle peut te motiver à essayer l'exercice toi-même.
Une chose peut t'aider : regarder la solution soumise.
Elle utilise peut-être une approche à laquelle tu n'avais pas pensé, et cette approche peut rendre l'exercice plus attrayant à tes yeux.
Mais si, après avoir regardé le code, tu n'as toujours pas envie de faire l'exercice, aucun mal n'est fait.
Ce n'est pas parce que tu regardes une demande de mentorat que tu dois cliquer sur le bouton _« Commencer le mentorat »_.

[website-copy]: https://github.com/exercism/website-copy/tree/main/tracks
[jsbench-me]: https://jsbench.me/
[criterion]: https://crates.io/crates/criterion
[cargo-bench]: https://doc.rust-lang.org/cargo/commands/cargo-bench.html
[rust-benchmark-tests]: https://doc.rust-lang.org/unstable-book/library-features/test.html
