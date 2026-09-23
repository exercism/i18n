**Attention, spoilers : cet article divulgâche des éléments de l'exercice Grains en général, et plus particulièrement de l'exercice Grains du parcours Bash. Si tu ne l'as pas encore terminé toi-même et que tu ne veux pas qu'on te montre certaines solutions, reviens quand tu l'auras fini !**

C'est ton premier jour dans une nouvelle entreprise. Tu as rempli toute la paperasse, rencontré l'équipe, et il est enfin temps de t'asseoir et de commencer à lire un peu du code sur lequel tu vas travailler. Tu commences à parcourir les différentes fonctions, classes et modules et, au fil de ta lecture, tu te surprends à plisser les yeux devant l'écran, perplexe. Tu continues à lire, et un seul mot s'échappe de ta bouche, à peine prononcé, presque soufflé : « Whaaaaaaaaaat… »[^1] Plus tu avances, plus cela se reproduit, et plus tu es dérouté, voire un peu en colère.

> Mais que se passe-t-il dans ce code ?

Dès que plus d'une personne travaille sur un morceau de code, la quantité de soin et de réflexion nécessaires pour que tout reste gérable augmente *considérablement*. Ce n'est plus le concept qui vit dans ton cerveau et le code qui doit simplement le concrétiser. Désormais, le concept doit vivre *à l'intérieur du code*, là où tous les collaborateurs peuvent le voir et le modifier si besoin.

La *façon* dont tu implémentes quelque chose importe peu pour l'utilisateur final, mais elle devrait dire *beaucoup* à chaque ingénieur qui touche à ton design à un moment ou à un autre. Il existe souvent de nombreuses façons d'obtenir la même fonctionnalité, et chacune des options peut sembler suffisante pour faire le travail. Pourtant, je crois que chaque décision que tu prends devrait avoir une raison (même une petite décision avec une petite raison), et que cette raison devrait exprimer un objectif ou une exigence.

L'idée selon laquelle les détails d'implémentation doivent aider les lecteurs du code à discerner le raisonnement, les objectifs et les priorités s'appelle l'**intention de conception**. La façon dont tu nommes tes variables, les paramètres que prend ta fonction et la manière dont les choses sont abstraites sont autant d'endroits où l'intention de conception peut s'exprimer, bien ou mal.

Je suis intimement convaincu que l'intention de conception est l'une des choses les plus importantes à prendre en compte lorsqu'on réalise une conception d'ingénierie. C'est l'un des éléments qui distinguent le génie logiciel de la programmation.

 > Le génie logiciel, c'est ce qui arrive à la programmation quand on y ajoute du temps et d'autres programmeurs.
 >
 > [Russ Cox](https://research.swtch.com/vgo-eng)

## L'intention de conception est transdisciplinaire

Je travaille comme ingénieur mécanique et je conçois des [moules d'injection](https://youtu.be/WHwTHarf8Ck?t=51), principalement pour des dispositifs médicaux. Une fois terminés, tous mes designs partent directement à l'atelier d'usinage, où l'on commence à fabriquer toutes les pièces et à les assembler. Comme les machinistes ne savent pas tout ce qui m'a traversé l'esprit pendant que je créais chaque design, je dois trouver un moyen de *montrer* mon intention à travers le design lui-même.

Souvent, certaines caractéristiques sont particulièrement critiques. Soit le client a dit qu'il a besoin de tolérances serrées particulières à cet endroit, soit la façon dont le moule s'assemble exige une précision extrême pour une raison ou une autre. Alors, pour aider les machinistes à fabriquer les pièces en donnant la priorité à la précision sur les parties importantes, je dois laisser des zones bien d'équerre ou faciles à serrer d'une manière précise dans un étau. Ainsi, le chemin le plus facile pour eux donne les meilleurs résultats pour moi.

Il y a aussi des endroits où les dimensions sont moins critiques. Par exemple, si je prévois dans le design un trou qui ne sert qu'à l'évacuation d'air, je lui donne une taille courante et bien ronde, comme 6 mm. Quand ils usinent ce trou et qu'ils mesurent le résultat, s'ils voient un nombre comme 5,99 mm, ils se diront : « OK, c'était probablement censé faire 6 mm, je suis donc assez proche », et ils n'auront même pas besoin de revérifier les dimensions sur la CAO ou sur le dessin de définition. Au contraire, si je lui donnais une valeur inhabituelle, comme 5,87 mm, ils le regarderaient et auraient cette réaction initiale :

1. Mince, est-ce que j'ai usiné vachement trop petit ? C'était censé faire 6 mm ?
2. (Ils vont vérifier la CAO et constatent que leur trou est bon et que c'est simplement une taille inhabituelle.)
3. Hmmm. Ce trou a sûrement une taille inhabituelle pour une bonne raison. Peut-être qu'il est vraiment important, ou que le client a demandé un trou spécial ici. Il va falloir que j'aille parler à Ryan pour voir ce que ce trou a de si important.
4. (BANG ! Ils posent délicatement le bloc d'aluminium sur mon bureau.)
5. (Ils découvrent que ce trou n'a rien d'important, que j'ai juste choisi une taille bizarre, et que tout ce travail et ce souci supplémentaires étaient inutiles.)
6. Bon sang, ce Ryan, quel numéro. (grommelle, juron, grommelle)

Tout cela se produit parce que chaque décision de mon design communique quelque chose aux autres personnes qui le regardent et qui travaillent dessus, que je le veuille ou non. Ils *doivent* y voir un sens, car c'est la seule information dont ils disposent ! Il est donc bien préférable que je prenne le temps de mettre dans mon design des informations *porteuses de sens* et **intentionnelles**.

## Grains : une introduction

Voyons maintenant comment l'intention de conception peut se communiquer dans le code, à travers un exemple tiré de l'un des exercices d'Exercism. J'ai récemment travaillé avec un apprenant sur sa solution de l'exercice *Grains* du parcours Bash. *Grains* est un exercice qui aborde le [problème du blé et de l'échiquier](https://en.wikipedia.org/wiki/Wheat_and_chessboard_problem). En bref, on dépose un grain de blé sur la première case d'un échiquier. Deux grains sur la case suivante. Quatre grains sur la suivante. Et ainsi de suite, chaque case contenant le double de grains de la précédente. On demande aux apprenants de trouver un moyen de calculer la valeur de chaque case individuelle ainsi que le nombre total de grains sur l'échiquier.

Cet apprenant en particulier a trouvé une façon plutôt astucieuse de calculer le total.

```bash
bc <<< 'ibase=16;FFFFFFFFFFFFFFFF'
```

`bc` est une calculatrice en ligne de commande. On peut lui passer des chaînes d'opérations arithmétiques et il les évalue, même pour de très grands entiers et des nombres décimaux. Il existe d'autres façons de faire des calculs sans `bc` en Bash, mais, par souci de simplicité, on va examiner comment l'intention peut se communiquer, ou pas, avec `bc`.

Cette solution fonctionne parce que tout l'exercice tourne autour des puissances de deux, et là où il y a des puissances de deux, il y a du binaire, et là où il y a du binaire, il y a de l'hexadécimal[^2] !

C'est une solution astucieuse, mais que nous dit le code ? Que l'hexadécimal est important ici ? Que le problème tourne fondamentalement autour de 16 ? Après avoir relu l'énoncé du problème, il est assez clair que ni l'un ni l'autre n'est le cas. L'apprenant et moi avons réfléchi à des idées pour communiquer l'intention plus clairement. Voici quelques pistes que nous avons trouvées :

### Première option : le binaire

Comme tout un tas de choses doublent (et donc, tout un tas de puissances de 2), regardons ce qui se passe en binaire pour voir si cela peut nous aider.

---

La première case contient 1 grain. En binaire, cela s'écrit aussi `0b1` (le `0b` signifiant simplement « ceci est un nombre binaire », le nombre réel étant `1`).

La deuxième case contient 2 grains. En binaire, `0b10`. Le total jusqu'ici est 3 (soit `0b11`).

La troisième case contient 4 grains (`0b100`). Total jusqu'ici : 7 (`0b111`).

La quatrième case contient 8 grains (`0b1000`). Total jusqu'ici : 15 (`0b1111`).

---

Tu vois le motif ?

Chaque case représente un chiffre binaire de plus, et les additionner tous ensemble ne donne rien d'autre qu'une suite de 1.

Dans la solution de l'apprenant, on pourrait remplacer les F par 64 1 (un par case) !

```bash
bc <<< "ibase=2;1111111111111111111111111111111111111111111111111111111111111111"
```

Plus intentionnel, parce que cela correspond davantage à ce que le problème nous donne. Mais on ne parle pas robot. Une longue suite de 1 pratiquement impossible à compter n'est peut-être pas une amélioration.

### Deuxième option : le calcul par force brute

Bon, abandonnons peut-être complètement les systèmes de numération non décimaux. Pourquoi ne pas faire en sorte que le code corresponde à la façon dont on totaliserait à la main le nombre de grains sur un échiquier, en comptant les grains de chaque case ?

```bash
total=0
current_grains=1
for square in {1..64}; do
  total=$( bc <<< "$total + $current_grains" )
  current_grains=$( bc <<< "$current_grains * 2" )
done
echo "$total"
```

C'est bien plus lisible et compréhensible. Le code montre clairement que le nombre de cases de l'échiquier est un facteur déterminant, tout comme l'effet de doublement à chaque case. Je trouve cela meilleur que la solution initiale.

Cependant.

C'est lent. Boucler, additionner et appeler sans cesse une commande externe ? Tout cela finit par donner un temps d'exécution plutôt lent. Est-ce dramatique ? Non. Si tu écris ce script en Bash, tu as probablement déjà accepté de ne pas avoir de contraintes de vitesse. Mais est-ce que ça pourrait être mieux ? Oui.

### Troisième option : le calcul direct

Alors, comment additionner tout ça sans itérer ?

Prenons une version *plus petite* du même problème : un échiquier de 5 cases[^3].

Les cinq cases contiendraient le nombre de grains suivant :

```txt
---------------------
| 1 | 2 | 4 | 8 |16 |
---------------------
```

Et le total ici serait : 1 + 2 + 4 + 8 + 16 = 31. Hmm. 31 ne me crie encore rien d'évident. Voyons un peu plus grand.

Bon, et un échiquier de 6 cases ? Cette fois, je vais indiquer le total cumulé sous chaque case pour nous aider à l'additionner.

```txt
-------------------------
| 1 | 2 | 4 | 8 |16 |32 |
|   | 3 | 7 |15 |31 |63 |
-------------------------
```

Et la somme : 1 + 2 + 4 + 8 + 16 + 32 = 63. Hmm… je commence en fait à entrevoir un motif, mais faisons-en un de plus pour être sûr.

7 cases :

```txt
-----------------------------
| 1 | 2 | 4 | 8 |16 |32 |64 |
|   | 3 | 7 |15 |31 |63 |127|
-----------------------------
```

1 + 2 + 4 + 8 + 16 + 32 + 64 = 127. Tu le vois ? Les valeurs 31, 63, 127 te disent quelque chose ?

Ce sont *presque* des puissances de 2. En fait, elles valent *une unité de moins* que la puissance de deux *suivante*.

Un dernier exemple, pour bien enfoncer le clou. Imagine un échiquier de 12 cases. C'est un, doublé 11 fois (ce qui, dans le milieu des maths, s'écrit 2^11) : 2048. Double encore, et tu obtiens 4096 (2^12). Donc… si on a bien compris le motif, le total cumulé serait *à une unité* de 4096, autrement dit 4095. Et si on compte, c'est exactement ce qu'on obtient : 1 + 2 + 4 + 8 + 16 + 32 + 64 + 128 + 256 + 512 + 1024 + 2048 = 4095.

> Autrement dit, pour trouver le total des `n` cases, il faut monter d'une puissance de deux et soustraire 1 au résultat.

Le nombre de grains sur la case 64 est 2^63 (indexation à partir de zéro, rappelle-toi). Doooonc, si on veut calculer le total des grains sur toutes les cases jusqu'à la case 64 incluse, il faut calculer 2^64 et soustraire 1.

Et voilà !

En Bash, cela ressemble à ceci :

```bash
bc <<< "2^64 - 1"
```

Cela devient logique quand on vérifie ce qui se passe en binaire. En binaire, quel était le total des 64 cases ?

```txt
0b1111...  # 64 ones
```

Quel est le nombre de grains sur la 65e case théorique ?

```txt
0b10000... # 1 and 64 zeros
```

Comment passer de 1 suivi de 64 zéros à 64 uns ? Tu soustrais 1.

Et quel avantage supplémentaire cela nous apporte-t-il ? Eh bien, on a maintenant une expression claire et lisible pour le total. Elle n'itère pas, donc les performances sont bonnes. Et elle contient le nombre 64, qui est le nombre de cases d'un échiquier, ce qui est un bon exemple d'**intention de conception** bien signalée. Si, pour une raison ou une autre, dans 1000 ans, le monde entier s'accorde sur un échiquier 7x7, cet ingénieur du futur (qui utilisera probablement Bash 6.1) examinera le script, comprendra ce que tu visais et remplacera le 64 par un 49. Impeccable !

## Restons intentionnels, les amis

Quand on élabore une implémentation, il est facile de partir dans tous les sens et de s'accrocher à la première solution qui fonctionne. C'est très bien pendant qu'on explore le problème, mais une fois qu'on comprend bien les composants critiques, et si on a le temps de peaufiner les choses correctement, il faut s'assurer que chaque algorithme, chaque nom de variable et même les espaces dessinent un tableau du problème, des exigences critiques et de la façon dont toutes les pièces s'assemblent.

[^1]: Voir aussi [la BD de Thom Holwerda.](https://www.osnews.com/story/19266/wtfsm/)
[^2]: Si tu te sens un peu rouillé sur le comptage binaire et hexadécimal, @kytrinyx recommande le livre [How to Count](https://www.amazon.com/Count-Programming-Mere-Mortals-Book-ebook/dp/B005DPIKPE). Et comme je n'ai aucune honte à faire de la pub, j'ai récemment écrit [quelques articles de blog sur le binaire et l'hexadécimal aussi.](https://www.assertnotmagic.com/2018/09/10/binary-hexadecimal-part-1/)
[^3]: Je ne sais pas comment ça marcherait. On pourrait peut-être juste faire jouter les pions les uns contre les autres.
