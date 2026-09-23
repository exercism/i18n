## Introduction
Salut à toutes et à tous ! J'espère que tout va bien.

Ces dernières semaines ont été vraiment passionnantes chez Exercism, avec le lancement d'Exercism Premium et d'Exercism Insiders. Nous avons aussi eu de super appels communautaires, et de nombreuses améliorations du site ont été déployées ou arrivent bientôt. Il y a beaucoup de quoi se réjouir en ce moment, mais rien de plus enthousiasmant que notre entrée dans le sixième mois de #12in23 ! L'été des S-expressions, ou plus joliment raccourci en Summer of Sexps.

Comme d'habitude, je suis accompagné du sage de la programmation, Erik.

Nous avons donc cinq langages ce mois-ci : Clojure, Common Lisp, Emacs Lisp, Racket et Scheme. Chacun de ces langages est un dialecte de Lisp, et plutôt que de nous concentrer excessivement sur les différences entre ces langages dans cette vidéo, nous allons nous pencher un peu plus sur Lisp lui-même et sur ce qui le rend unique. Nous terminerons ensuite par un bref tour d'horizon de chacun.

Mais avant cela, quelques précisions pratiques ! Pour obtenir le badge Summer of Sexps, il faut terminer cinq exercices, peu importe lesquels, dans l'un de ces langages pendant le mois de juin.

## Les badges

Il y a aussi le badge 12in23, qui dure toute l'année. Pour l'obtenir, il faut résoudre cinq de nos exercices à l'honneur dans le langage. Si tu regardes cette vidéo après juin, tu peux faire cette partie à n'importe quel moment de l'année, donc tu n'as rien manqué. Comme beaucoup de personnes n'ont jamais travaillé avec un Lisp, nous avons essayé de choisir des exercices relativement simples qui te donnent un aperçu de ce à quoi ressemble un langage Lisp.
- **Année bissextile :** travailler avec des conditions booléennes et la notion de véracité (et, en option, la portée lexicale)
- **Two-Fer :** formater une _string_ et manipuler un paramètre optionnel
- **Différence de carrés :** appeler des fonctions définies par l'utilisateur et faire des calculs en notation préfixe
- **Nom du robot :** travailler avec l'aléatoire, les atomes et des données structurées
- **Parenthèses équilibrées :** utiliser la récursion pour valider une _string_

Ces exercices, ainsi que ceux des mois précédents, se trouvent tous sur la page #12in23.

## Vue d'ensemble

Donc, les langages basés sur Lisp. Je pense qu'on devrait commencer par comprendre un peu ce qu'est Lisp. Commençons par une petite introduction à Lisp en général.

### Lisp
- La première chose à noter, c'est que Lisp est l'un des plus anciens langages.
- Il a été créé par John McCarthy au MIT en 1958, à une époque où les ordinateurs occupaient encore des salles entières du sol au plafond 🙂
- Le nom Lisp signifie LISt Processing (ou LISt Processor), ce qui montre l'importance de la structure de données qu'est la liste.
- Il a été conçu dans le but de faire de la recherche en IA.
- Lisp reposait sur le lambda-calcul, inventé par Alonzo Church, un système formel pour décrire le calcul en mathématiques (en simplifié).

- C'est un langage incroyablement influent, pour plusieurs raisons :
- C'est le deuxième plus ancien langage de programmation de haut niveau encore couramment utilisé (après Fortran)
- C'est le premier langage de programmation fonctionnel de haut niveau et il a introduit beaucoup de fonctionnalités que l'on associe aujourd'hui à la programmation fonctionnelle.
- À noter que Lisp prenait aussi en charge la programmation impérative
- C'est le tout premier langage doté d'un ramasse-miettes, ce qui libère celui qui écrit le code de la gestion manuelle de la mémoire
- Sa syntaxe comparativement réduite et sa sémantique relativement simple en font un excellent choix pour l'enseignement.
- Lisp (ou plutôt : l'un de ses dialectes) est donc souvent utilisé pour enseigner la programmation
- Il a engendré (et engendre encore !) un très grand nombre de dialectes (parmi lesquels nous parlerons de ceux pris en charge par Exercism).
- Autrement dit, dans l'arbre des langages de programmation, il existe une branche distincte pour les langages de type Lisp (tout comme il existe une branche pour les langages de type C).

Quand j'ai parlé récemment à Simon Peyton Jones, l'un des créateurs de Haskell, il évoquait la différence entre les langages construits autour des machines de Turing et ceux construits autour du lambda-calcul. Ça vaut le coup de regarder cette interview si tu veux en savoir plus à ce sujet.

### Les parenthèses

Il y a beaucoup de parenthèses dans les Lisp, mais ce n'est pas forcément une mauvaise chose (tout comme avoir beaucoup d'accolades n'est pas forcément mauvais dans les langages de type C).
Les Lisp sont construits autour de ce qu'on appelle des S-expressions.
Une S-expression (abréviation de symbolic expression, elle-même abrégée en sexpr ou sexp, d'où le nom du défi de ce mois-ci) est une expression qui sert à représenter des données. Elles ont été inventées pour le langage Lisp d'origine et popularisées par lui.
Une S-expression peut prendre l'une de deux formes :

- Un atome (par exemple ‘x’). Vois-les comme des « valeurs » non imbriquées ou comme les feuilles de l'arbre
- Une expression x . y, où x et y sont des S-expressions. Vois-les comme des paires, où y peut être l'élément suivant de la liste (s'il existe) ou un nœud dans un arbre. À noter qu'il s'agit d'une définition récursive, qui se termine au niveau des feuilles. En général, on utilise des parenthèses pour ce type de S-expression.


### Les S-expressions
Les S-expressions servent à représenter à la fois des données et des listes en Lisp.
Donc, chaque fois que tu définis une liste, tu utilises des parenthèses.
Si on combine ça avec le fait que :
la liste est la structure de données centrale de Lisp (d'où son nom),
dans certains Lisp, c'est la seule structure de données,
on se retrouve avec beaucoup de parenthèses.
Pour montrer à quel point les listes sont centrales : si tu veux appeler une fonction en Lisp, tu le fais en créant une liste.

Fait intéressant, le premier élément de la liste (la tête) représente la fonction appelée, et les autres éléments (la queue) sont passés comme arguments.
C'est ce qu'on appelle la notation préfixe (où l'opérateur précède les opérandes), ce qui peut sembler un peu bizarre au début, mais qui est en fait très utile :
- Tu peux appliquer un opérateur à plusieurs arguments sans avoir à le répéter (par exemple (+ 1 2 3))
- La priorité des opérateurs devient explicite, puisqu'il faut de toute façon définir une nouvelle S-expression pour appeler un autre opérateur

Curieusement, les listes servent même à représenter le code source, mais nous y reviendrons plus tard.

En général, la plupart des Lisp ont une syntaxe assez minimale et une sémantique relativement simple, ce qui les rend relativement faciles à apprendre, et rend aussi la compréhension du code plus simple.
Cette syntaxe minimale ne les rend pas moins puissants pour autant !
La combinaison de ces deux aspects (syntaxe minimale + sémantique simple) rend les Lisp idéaux pour écrire des compilateurs et des interprètes.
Si un jour tu veux construire ton propre compilateur, construire un Lisp est une bonne option !

### Les fonctionnalités intéressantes de Lisp

Comme mentionné plus haut, les Lisp utilisent en interne les mêmes types et structures de données pour représenter le code.
Cette propriété s'appelle l'homoïconicité (ou homoïconique).
Autrement dit, un langage est homoïconique si un programme écrit dans ce langage peut être manipulé comme des données à l'aide du langage lui-même, et si sa représentation interne peut donc être déduite simplement en lisant le programme.
On résume souvent cette propriété en disant que le langage traite le code comme des données.

## Les langages

### Scheme
- Créé dans les années 1970 par Guy Steele et Gerald Sussman au MIT AI Lab.
- Il est né d'une tentative de comprendre le modèle d'acteurs de Carl Hewitt à travers un minuscule interprète Lisp.
- Le langage lui-même a été présenté dans une série de notes de recherche (AI Memos), collectivement appelées les Lambda Papers.
- Premier dialecte Lisp à utiliser la portée lexicale (une valeur n'est visible que là où elle est définie) et l'un des premiers langages à prendre en charge les continuations de première classe.
- Une norme IEEE officielle, plus une norme de facto appelée le Revised Report on the Algorithmic Language Scheme (RnRS).
- De nombreuses implémentations : ChezScheme, Guile (toutes deux prises en charge sur Exercism), MIT/GNU Scheme et Racket
- Un langage très minimal, avec peu de syntaxe, mais ce n'était pas intentionnel.
- Ses auteurs voulaient construire quelque chose de compliqué, mais ont fini par concevoir quelque chose de bien plus simple que prévu
- Récursion terminale propre. La façon idiomatique d'itérer passe par la récursion.
- Scheme optimise les appels récursifs terminaux afin de ne pas consommer d'espace de pile ni d'autres ressources. La récursion peut donc s'utiliser sur des données arbitrairement grandes ou pour un calcul arbitrairement long
- Des types numériques puissants, notamment les nombres rationnels et complexes
- L'évaluation différée, qui ressemble aux promesses.
- Un système de macros puissant.
- Les macros hygiéniques réduisent le risque de résultats inattendus lors de la définition de macros.

### Common Lisp
- Le travail sur Common Lisp a commencé en 1981, à l'initiative de Bob Engelmore, responsable à l'ARPA, pour développer un dialecte Lisp standard unique pour la communauté, car les dialectes alors utilisés étaient souvent incompatibles, ce qui empêchait le partage de code et de connaissances
- La première norme a été publiée en 1984 et la dernière en 1994 (une spécification très stable)
- Comme il s'agit d'une norme, il en existe différentes implémentations, comme Steel Bank Common Lisp (celle par défaut sur Exercism) et CLisp.
- Il existe aussi des implémentations commerciales, comme Allegro CL et LispWorks, ainsi qu'ECL (Embeddable Common Lisp), qui peut être intégré à des programmes C, et ABCL, qui tourne sur la machine virtuelle Java.
- Défini par une norme (ANSI INCITS 226-1994), si bien que du code écrit il y a 30 ans fonctionne toujours aujourd'hui
- Un système de types riche et extensible
- Conçu pour le développement à base d'images et de REPL, donc très introspectable.

### Emacs Lisp
- Développé en 1985 dans le but de disposer d'un langage efficace pour étendre un éditeur de texte
- À typage dynamique
- Environ 80 % d'Emacs est écrit en Emacs Lisp (20 % en C pour des raisons de performance)
- Un peu différent des autres Lisp :
- Non normalisé, il évolue encore lentement
- Pas d'élimination automatique des appels terminaux ; prise en charge via la macro named-let (qui se transforme en boucle while)
- Portée dynamique par défaut, portée lexicale recommandée pour le code nouveau
- Une bonne documentation directement dans l'éditeur
- Multiplateforme (fonctionne partout où Emacs fonctionne)
- On apprend le langage en lisant le code des fonctionnalités qu'on utilise au quotidien (cœur d'Emacs + paquets)
- Un sous-ensemble de Common Lisp est disponible via le paquet cl-lib. Là où Emacs Lisp est assez minimaliste, Common Lisp est bien plus complet. Le paquet cl-lib rend disponible un sous-ensemble de CL

### Racket
- Matthias Felleisen a fondé PLT Inc., qui a décidé en janvier 1995 de développer un environnement de programmation pédagogique basé sur Scheme. D'abord nommé PLT Scheme, il a ensuite été renommé Racket.
- En plus d'être un environnement de programmation pédagogique, il a été conçu comme une plateforme pour la conception et l'implémentation de langages de programmation.
- Un LISP moderne, descendant de Scheme
- Il prend en charge la programmation logique !
- Une syntaxe simple et expressive, à la fois idéale pour les débutants et puissante entre les mains des experts
- Il prend en charge de nombreux paradigmes de programmation : programmation fonctionnelle, orientée objet, conception par contrat, programmation logique, métaprogrammation
- Une bibliothèque standard complète
- Livré avec DrRacket, un IDE complet conçu pour apprendre et explorer avec un minimum de tracas
- Une excellente documentation, avec beaucoup de contexte et d'exemples

### Clojure
- Développé par Rich Hickey dans le but d'avoir un LISP moderne qui tourne sur la JVM et avec une excellente gestion de la concurrence
- Un dialecte de LISP, mais aussi un peu différent des autres LISP : il ne prend pas en charge la récursion terminale implicite (pas d'inquiétude si tu ne sais pas ce que c'est) et propose d'autres structures de données que les listes : les maps, les ensembles et les vecteurs. Chacune de ces structures a sa propre syntaxe littérale.
- Elles sont également toutes immuables, tout en offrant d'excellentes performances avec une recherche en O(log32 n), ce qui correspond « en pratique » à un temps constant
- Du polymorphisme à l'exécution via les multiméthodes et les protocoles
- Une excellente interopérabilité avec la JVM
- Le système de spécification de données Clojure Spec (à l'exécution, pas à la compilation), qui permet de définir la structure des données, de générer des données, de faire des tests basés sur les propriétés, et bien plus encore

## Cas d'utilisation

### Scheme
- Utilisé dans l'enseignement pour aider à enseigner l'informatique (le très influent Structure and Interpretation of Computer Programs utilise Scheme).
- Utilisé en IA. Utilisé comme langage de script, par exemple dans GIMP (éditeur graphique), les outils de CAO (conception assistée par ordinateur) et même au cinéma, avec les scripts de gestion du moteur de rendu de Final Fantasy : Les Créatures de l'esprit

### Common Lisp
- Common Lisp est utilisé dans de nombreux domaines, par exemple l'intelligence artificielle et la recherche, mais aussi dans des applications commerciales : la NASA a écrit le logiciel de pilotage automatique de la sonde Deep Space One en Common Lisp, Viaweb a été écrit en Common Lisp puis racheté par Yahoo et rebaptisé Yahoo Store!, et la première version de Reddit

### Emacs Lisp
- Emacs Lisp est utilisé dans... Emacs, évidemment !
- Au fond, Emacs est un interprète pour Emacs Lisp, un dialecte de Lisp, mais avec des extensions supplémentaires pour la manipulation de texte

### Racket
- Utilisé dans l'enseignement, car Racket a été conçu en mettant l'accent sur la création, la simplification et l'analyse de langages.
- Utilisé dans la recherche, car sa syntaxe et sa sémantique extensibles le rendent adapté à la conception et au prototypage de nouveaux langages et de nouvelles fonctionnalités de langage.
- Utilisé dans le jeu vidéo, par exemple par John Carmack (rendu célèbre par Doom) pour un environnement de script interactif destiné à la VR, et le studio Naughty Dog l'a utilisé pour scripter (par exemple dans Uncharted). Hacker News est écrit en Arc, un autre Lisp, lui-même écrit en Racket.

### Clojure
- Clojure sert à beaucoup de choses différentes ; entre autres, Docker a racheté Atomist en 2022, une plateforme de sécurité et d'automatisation de conteneurs implémentée en Clojure.
- Le plus grand utilisateur de Clojure au monde est Nubank, une banque récente, qui l'a racheté il y a quelques années et emploie désormais l'équipe principale de Clojure.
- Il est très utilisé pour le prototypage rapide, car il est dynamique et très interactif.

## Point de vue de la programmation
Tous ces langages prennent en charge les paradigmes fonctionnel, impératif et symbolique.
Certains prennent aussi en charge la POO, en particulier Common Lisp.

Les Lisp sont pour la plupart des langages dynamiques, bien que Racket prenne en charge le typage statique.

Cela ne veut pas dire qu'ils sont tous interprétés, car on trouve un mélange de plusieurs approches : interprété (sans aucune étape de compilation), compilé en bytecode puis interprété, et compilé directement en code machine.

### Scheme
- Minimaliste, avec une sémantique claire et simple et peu de façons différentes de former des expressions.
- Cela rend le langage facile à apprendre et le code facile à comprendre.
- C'est pourquoi Scheme est aussi souvent utilisé dans de nombreux cours d'introduction à l'informatique
- Des continuations de première classe.
- Une continuation est une représentation de l'état d'un programme.
- Les continuations peuvent servir à modéliser le flux de contrôle (par exemple une construction `return`) ou des coroutines (qui permettent le multitâche)

### Common Lisp
- Un système orienté objet extensible, avec des combinaisons de méthodes programmables (à la fois dans la façon dont les méthodes de sous-classes et de super-classes sont combinées, et via des méthodes before, after et around, qui permettent d'étendre un système sans le modifier)
- Un système de conditions programmable (un sur-ensemble des « exceptions »), qui permet de découpler la détection d'une condition du choix de la façon de la traiter. Le système de conditions est plus flexible que les systèmes d'exceptions, car au lieu de diviser le travail en deux parties (le code qui signale une erreur et le code qui la traite), il répartit les responsabilités en trois : signaler une condition, la traiter et redémarrer.
- Les macros permettent d'étendre la syntaxe du langage, pas seulement de générer du code répétitif. Cela aide à construire un langage adapté au domaine, plutôt que l'inverse.

### Emacs Lisp
- Un excellent support et une bonne intégration dans l'éditeur
- Peut servir à personnaliser Emacs pendant qu'il tourne (« comme se faire une opération du cerveau soi-même » :))
- Peut être utilisé en mode batch, où toutes les capacités de traitement de texte de l'éditeur sont à ta disposition (comme les buffers et les commandes de déplacement)

### Racket
- Un système de macros puissant. Les sucres syntaxiques comme les threading macros reposent dessus. Les macros sont aussi hygiéniques, ce qui répond à une question simple : une macro génère du code qui va être déposé ailleurs. Quand ce code est évalué, comment déterminer les liaisons des identifiants qu'il contient ? Les macros hygiéniques réduisent le risque de résultats inattendus lors de la définition de macros.
- Orienté langage.
- Racket fournit les outils pour écrire ton propre langage de programmation ou DSL, construits sur les macros de Racket.
- Plusieurs langages intégrés, comme typed Racket (qui prend en charge des annotations de type vérifiées statiquement), datalog (un langage proche de Prolog), pris en charge par l'IDE DrRacket, et scribble, un outil pour créer des documents textuels au format HTML ou PDF
- Le REPL est au cœur du flux de développement, pas seulement pour tester des choses ou consulter la documentation

### Clojure
- Un système de macros puissant.
- Les sucres syntaxiques comme les threading macros reposent dessus
- Le REPL est au cœur du flux de développement, pas seulement pour tester des choses ou consulter la documentation

## Lequel essayer

- Si tu n'as jamais essayé un Lisp, Scheme et Racket sont d'excellents choix, car tous deux ont une syntaxe très minimale.
- Cela dit, Common Lisp et Clojure ont tous deux un mode apprentissage, ce sont donc probablement les meilleurs pour apprendre sur Exercism.
- Si tu utilises déjà Emacs, Emacs Lisp est un choix naturel.
- De même, si tu utilises un langage de la JVM, Clojure est une option naturelle.
- Emacs Lisp (via Emacs), Clojure (via IntelliJ) et Racket (via DrRacket) bénéficient tous d'un excellent support IDE.
- Il existe bien sûr aussi de bons IDE pour Common Lisp et Scheme.
- Si tu veux un Lisp vraiment complet, Common Lisp, Clojure et Racket sont très riches
- Si tu veux un Lisp un peu différent, Clojure a une syntaxe assez unique pour un Lisp.
- Si les macros et la métaprogrammation t'intéressent, ils sont tous globalement de bons choix ! Mais si tu veux construire de nouveaux langages, Racket est particulièrement bien adapté

Bien sûr, si tu as le temps, je te recommande d'en essayer quelques-uns !
Et n'aie pas peur des parenthèses ! Je sais que c'était mon cas, et c'est d'ailleurs pour ça que j'ai repoussé l'apprentissage de Lisp pendant un bon moment.
Tu t'y habitueras vite, et tu apprendras peut-être même à les apprécier, comme moi.
En fait, j'adore aujourd'hui les langages Lisp, avec leur syntaxe minimale et leur sémantique simple, tout en restant très expressifs.
