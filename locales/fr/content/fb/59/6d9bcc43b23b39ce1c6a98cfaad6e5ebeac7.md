# Object Oriented October

## Introduction

Salut tout le monde. J'espère que tout va bien. On a eu un mois de septembre bien chargé. On a publié un tas de nouvelles améliorations et fonctionnalités sur le site, principalement autour du mentorat et des flux qui l'accompagnent. Résultat : on reçoit aujourd'hui deux fois plus de demandes de mentorat qu'il y a 4 semaines, et c'est une excellente nouvelle. Si tu n'as pas encore essayé de faire une revue de code avec un mentor, n'hésite pas, c'est une façon géniale d'apprendre. Et si tu cherches à aider les autres, il y a plein de demandes dans les files d'attente qui n'attendent que toi. Tu peux t'inscrire comme mentor via le lien Mentorat du menu Contribuer ! On a aussi fait une grosse mise à jour de la base de données, de MySQL 5.6 vers MySQL 8, que j'ai filmée et qui est disponible dans la section Insiders, donc si tu es Insider et que tu ne l'as pas encore vue, jette un œil !

Bon, passons à #12in23. Septembre a été un mois intéressant, avec l'exploration de langages concis et laconiques. Ce mois-ci, on part dans l'autre direction, à la rencontre de bêtes bien plus grosses. On se concentre sur les langages orientés objet, et plus précisément C#, Crystal, Java, Pharo, Ruby et PowerShell. On a déjà parlé de Pharo et de Java, en mai et en août respectivement, donc on ne les couvrira pas à nouveau dans cette vidéo, mais n'hésite pas à regarder les vidéos des mois précédents si les présentations de ces langages t'intéressent. Mais dans cette vidéo, on va explorer C#, Crystal, Ruby et PowerShell, et comme d'habitude, Erik va nous expliquer ce qui rend ces langages intéressants et uniques.

## Les badges

Comme toujours, tu peux gagner le badge Object-Oriented October en terminant 5 exercices, au choix, dans ces langages. Il y a aussi le badge Year-Long, et je sais que beaucoup de monde travaille à l'obtenir. Pour cela, il y a 5 exercices phares à terminer, qui se prêtent tous très bien à une résolution orientée objet. Les voici :

- **Arbre binaire de recherche** : insérer et rechercher des nombres dans un arbre binaire
- **Tampon circulaire** : implémenter une structure de données connectée de bout en bout
- **Horloge** : implémenter une horloge qui gère des heures sans dates
- **Matrice** : renvoyer les lignes et les colonnes d'une matrice représentée sous forme de _string_
- **Chiffrement simple** : implémenter un chiffrement par substitution

## Aperçus

### C#
- Développé par Anders Hejlsberg chez Microsoft en 2000
- Le langage et la machine virtuelle disposent de spécifications officielles. Ils sont devenus une norme ECMA officielle en 2002, puis une norme ISO en 2003
- Le compilateur, le .NET Framework (bibliothèque standard) et Visual Studio (éditeur) étaient tous à code source fermé au départ, mais le compilateur et le .NET Framework ont été publiés en open source en 2014
- Bien qu'il partage beaucoup de syntaxe avec Java (sorti quelques années plus tôt), C# n'était pas une copie exacte de Java (par exemple, la prise en charge des propriétés et des types valeur, et l'absence d'exceptions vérifiées)
- Se compile en bytecode, la compilation en code machine étant prise en charge depuis .NET 7 (et toujours en cours d'amélioration)
- Utilisé dans une immense quantité de logiciels, des sites web aux systèmes embarqués, et des applications (Xamarin) aux jeux vidéo (Unity)

### Crystal
- Crystal a été développé par Ary Borenszweig (qui a un compte sur Exercism), Juan Wajnerman et Brian Cardiff (à l'origine nommé Joy, mais renommé Crystal 3 jours plus tard :))
- Conçu pour avoir l'élégance et la productivité de Ruby, mais avec la vitesse, l'efficacité et la sûreté de typage d'un langage compilé moderne.
- Langage open source développé par l'organisation Manas.
- La version 1.0 est sortie en 2021.
- Se compile en code machine via LLVM (comme Rust)
- Le compilateur a d'abord été écrit en Ruby, avant d'être converti en une version auto-hébergée
- Utilisé par le constructeur de camions Nikola, Manas et d'autres, principalement pour des sites web, mais aussi pour des services cloud, des applications en ligne de commande et des scripts

### PowerShell
- Créé par une équipe dirigée par Jeffrey Snover chez Microsoft, sorti pour la première fois en 2006.
- Le développement a été déclenché par Intel, qui voulait déplacer ses scripts KornShell de Sun RISC vers une autre plateforme, pour faciliter le développement de ses processeurs. Finalement, Intel a choisi une autre plateforme, mais Microsoft a continué à travailler sur son nouveau shell, PowerShell, car il offrait la possibilité d'améliorer l'administration système de Windows (qui n'était pas particulièrement brillante à l'époque, nécessitant souvent des interfaces graphiques)
- La syntaxe s'inspire de KornShell, mais aussi de PHP, de Perl et d'autres
- La première version ne tournait que sur .NET Framework, donc uniquement sous Windows. Mais PowerShell 6.0 (sorti en 2018) tournait sur .NET Core, qui est multiplateforme et open source.
- Principalement utilisé pour l'administration système, mais aussi pour fournir des utilitaires en ligne de commande ou des surcouches autour d'autres outils. On l'a énormément utilisé pour travailler en masse sur les dépôts Exercism

### Ruby
- Développé par Yukihiro Matsumoto (alias Matz), sorti pour la première fois en 1995
- Matz voulait travailler avec un vrai langage de script orienté objet, mais les options existantes (comme Perl et Python) ne lui plaisaient pas, alors il a créé un nouveau langage : Ruby
- Matz décrit Ruby comme un langage Lisp simple dans son essence, avec un système d'objets semblable à celui de Smalltalk, des blocs inspirés des fonctions d'ordre supérieur, et une utilité pratique proche de celle de Perl.
- Généralement interprété, mais peut aussi être compilé juste-à-temps en code machine
- Outre l'interprète officiel, il existe des implémentations alternatives, comme JRuby (qui tourne sur la JVM), Rubinius (qui utilise LLVM) et YJIT, un compilateur juste-à-temps livré avec le paquet d'installation officiel
- Surtout utilisé pour des sites web (avec Ruby on Rails), par exemple GitHub, Stripe, Shopify et bien d'autres (dont Exercism et le forum d'Exercism !). Ruby sert aussi à l'automatisation

## Et du point de vue de la programmation, en quoi diffèrent-ils ?

Ce sont tous des langages orientés objet, même s'ils ne l'implémentent pas tous de la même façon (par exemple, Crystal et Ruby utilisent le modèle d'envoi de messages de Smalltalk pour appeler des méthodes).

### C#
- Fortement et statiquement typé
- Prend aussi en charge les paradigmes impératif et déclaratif, et devient de plus en plus fonctionnel

### Crystal
- Fortement et statiquement typé (contrairement à Ruby)
- Prend aussi en charge la programmation fonctionnelle et impérative

### PowerShell
- Fortement typé
- Prend aussi en charge la programmation impérative, fonctionnelle et basée sur des pipelines.

### Ruby
- Typage dynamique
- Prend aussi en charge la programmation fonctionnelle et impérative

Cela dit, tous ces langages sont avant tout des langages orientés objet.

## Qu'est-ce qui rend ces langages géniaux ?

### C#
- Tourne (presque) partout, y compris dans des applications via Xamarin. À l'origine, il ne tournait que sous Windows, ce qui a donné naissance à Mono, une implémentation libre et open source d'un compilateur et d'un runtime C# multiplateforme. En 2015, .NET Core a été introduit, entièrement multiplateforme et open source.
- Polyvalent : peut servir à presque toutes les charges de travail, y compris les applications, les sites web et les jeux
- Expressif : on peut faire beaucoup avec relativement peu de code C#. LINQ en particulier est un formidable gain de productivité et très agréable à utiliser
- D'excellents outils, à la fois pour les IDE et pour d'autres outils comme les systèmes de build. Visual Studio est réservé à Windows, mais JetBrains Rider et VS Code sont multiplateformes
- La .NET Compiler Platform (souvent appelée Roslyn) est un excellent moyen d'analyser, de transformer et de générer du code C# (on l'utilise énormément dans l'exécuteur de tests, l'analyseur et le representer C#)
- La documentation est abondante, détaillée et bien écrite
- Une grande communauté : de nombreuses ressources disponibles, dont des blogs, des forums et bien plus

### Crystal
- Une syntaxe élégante et lisible, qui rend le code Crystal facile à lire et à écrire
- Expressif. Comme Ruby, Crystal est très expressif : on peut faire beaucoup avec peu de code. Cela tient en partie à sa bibliothèque standard excellente et très complète.
- Rapide. Le typage statique permet de compiler en code machine efficace via LLVM, avec une gestion mémoire simple grâce à un ramasse-miettes.
- Une formidable implémentation orientée objet. Tout est objet, y compris les classes et les types primitifs comme les nombres et les booléens
- Tout est inclus : une grande bibliothèque standard, un formateur intégré, un moteur de templates, un framework de tests et plus encore
- Interopérabilité. Interopérabilité facile avec les bibliothèques C
- Multiplateforme : tourne sous Linux, macOS et Windows, même si Windows n'est pas encore un citoyen de première classe

### PowerShell
- Puissant : PowerShell est un outil puissant pour les administrateurs. Il s'intègre bien à de nombreux autres systèmes, comme le système d'exploitation Windows (composants, services et paramètres), d'autres produits Microsoft comme Exchange, SharePoint, Azure, etc. Il peut aussi interagir avec de nombreuses autres technologies, comme les API REST, les bases de données, les services web et bien plus.
- Disponibilité : PowerShell est préinstallé sur tous les systèmes Windows modernes et peut s'installer sur tout système qui exécute .NET (ce qui inclut macOS, Linux et de nombreux systèmes Unix)
- Sécurité : PowerShell inclut des fonctionnalités pour sécuriser les scripts et restreindre leur exécution à partir de scripts signés et de politiques d'exécution. C'est essentiel pour garantir la sécurité de tes processus d'automatisation.
- Interface graphique : tu peux le combiner avec d'autres frameworks comme Windows Forms ou Windows Presentation Foundation pour concevoir et créer des interfaces graphiques pour tes scripts PowerShell et les rendre plus conviviaux.
- Pipeline : comme Bash sur les systèmes Unix, PowerShell permet d'enchaîner des cmdlets pour réaliser des opérations et des tâches complexes, en passant la sortie d'une cmdlet en entrée d'une autre

### Ruby
- Une syntaxe élégante et lisible, qui rend le code Ruby facile à lire et à écrire
- Expressif. Ruby est un langage très expressif : on peut faire beaucoup avec peu de code. Cela tient en partie à sa bibliothèque standard excellente et très complète
- Un énorme écosystème, avec un nombre massif de bibliothèques disponibles (les gems)
- Une formidable implémentation orientée objet. Tout est objet, y compris les classes et les types primitifs comme les nombres et les booléens.
- Pragmatique. Ruby et la plupart de ses bibliothèques sont très pragmatiques, avec l'accent sur la résolution de problèmes concrets.
- Interopérabilité. Interopérabilité facile avec les bibliothèques C, souvent utilisée quand la performance est particulièrement importante. Par exemple, la gem Nokogiri permet de travailler avec du XML de manière très performante, en s'appuyant sur des bibliothèques C pour faire le gros du travail
- Beaucoup d'innovation est en cours. Par exemple, Stripe a créé Sorbet, un vérificateur de types pour Ruby ; Shopify a développé YJIT, un compilateur juste-à-temps pour Ruby (inclus dans Ruby 3.1+) ; et la prise en charge de WASM est en cours de développement

## Fonctionnalités marquantes

### C#
- D'excellentes performances, surtout pour un langage managé. Le langage comme le runtime regorgent de fonctionnalités pour améliorer les performances, par exemple le type Span<T> et l'accès aux instructions intrinsèques du processeur (comme les instructions AVX). La CLR est une machine virtuelle mature, stable et très performante, qui est améliorée en continu
- Un énorme écosystème, avec un nombre massif de bibliothèques disponibles. Ces bibliothèques sont, comme C#, matures, stables et complètes
- Moderne et en constante évolution : le langage et le runtime évoluent encore, avec des mises à jour très régulières du langage pour le rendre plus moderne. Par exemple :
- async/await pour une concurrence facile
- span<T> pour une utilisation efficace de la mémoire
- Les types de référence nullables (corrigeant l'erreur à un milliard de dollars)
- Le runtime est aussi mis à jour régulièrement, par exemple .NET AOT pour compiler directement en code machine
- Moins d'alternatives que dans beaucoup d'autres langages ou écosystèmes. Dans la plupart des cas, on peut se contenter des solutions par défaut fournies par Microsoft, qui incluent souvent l'IDE aussi. On pourrait aussi y voir un inconvénient, mais c'est souvent un atout, surtout quand on débute avec un langage

### Crystal
- Le meilleur des deux mondes. La combinaison de l'inférence de types globale et des types union donne à Crystal l'air d'un langage à typage dynamique, où il y a souvent peu de types à préciser, tout en conservant les performances et les garanties de sécurité supplémentaires (notamment la vérification de nil à la compilation) d'un langage à typage statique
- Métaprogrammation. Au lieu de la métaprogrammation dynamique à l'exécution de Ruby, Crystal dispose de macros, qui s'exécutent à la compilation. Les macros opèrent sur des nœuds de l'AST et produisent du code. Elles sont assez faciles à définir et à utiliser. Embedded Crystal (ECR) est un moteur de templates intégré qui utilise des macros pour intégrer du code Crystal dans d'autres textes
- Excellente concurrence. La concurrence est simple à utiliser grâce à un modèle proche de celui de Go, qui repose sur des fibers (des unités d'exécution légères) qui communiquent via des channels
- Productif et amusant. Ruby est connu pour être conçu pour la productivité et le bonheur des développeurs, avec une syntaxe élégante et lisible et une excellente ergonomie. Comme la syntaxe et le design de Crystal sont très proches de Ruby, cela vaut aussi pour Crystal (anecdote : pas mal de code Ruby est du code Crystal valide).

### PowerShell

- Cmdlets : PowerShell utilise les cmdlets (prononcées « command-lets ») comme briques de base. Ce sont de petites commandes orientées tâche qui encapsulent des fonctionnalités existantes, offrant une interface cohérente (par exemple Get-Help pour afficher l'aide de n'importe quelle cmdlet) et conviviale pour les administrateurs système. Il existe des cmdlets pour toute une variété de « backends », comme toutes les classes .NET, Windows Management Instrumentation, Azure, et bien d'autres. Les cmdlets peuvent être définies dans n'importe quel langage .NET et le sont de manière très déclarative, avec les paramètres, leur validation, leurs contraintes (required _true_/_false_), leurs noms alternatifs (switch), etc. faciles à définir.
- Orienté objet : presque tout dans PowerShell est un objet avec de nombreuses propriétés. Les fichiers, les processus, les clés de registre et même les types de données simples comme les _strings_ et les nombres sont tous traités comme des objets ; cette approche simplifie la façon dont on travaille et interagit avec différents types de données et de services. Ce sera très familier à quiconque a travaillé avec .NET
- Gestion à distance : il prend en charge la gestion à distance des serveurs et systèmes Windows, et même des ressources cloud sur Azure, AWS et GCP, ce qui est essentiel pour gérer l'automatisation et les déploiements à grande échelle.
- Extensible : il dispose d'un excellent système de modules intégré, permet de créer des cmdlets, des fonctions et des modules personnalisés, et de travailler avec d'autres langages de programmation et bibliothèques pour étendre encore ses capacités selon les besoins.

### Ruby

- Productif et amusant. Ruby est connu pour être conçu pour la productivité et le bonheur des développeurs. Même si c'est difficile à quantifier, l'enthousiasme des personnes qui ont utilisé Ruby en dit long
- Métaprogrammation. Ruby est très dynamique et permet la métaprogrammation à l'exécution. Qu'il s'agisse de monkey-patcher des classes existantes ou d'ajouter ou d'appeler des méthodes dynamiquement, Ruby a ce qu'il faut
- Ruby on Rails est un framework fantastique et complet pour créer des sites web. D'origine, il contient un système de templates, du cache, ActiveRecord (une façon d'interagir avec une base de données via des objets), les migrations, le scaffolding, les WebSockets et bien plus encore.

## Lequel choisir

- Si tu connais la programmation orientée objet mais que tu veux en voir une autre approche, essaie Pharo
- Si tu connais Java ou C# mais que tu ne les as pas touchés depuis un moment, redonne-leur une chance. Les deux langages ont beaucoup évolué, alors va voir ces nouvelles fonctionnalités toutes brillantes !
- C# et Java (et Ruby dans une moindre mesure) sont aussi d'excellentes options si tu cherches du travail, car ce sont parmi les langages les plus demandés par les employeurs
- Si tu connais Ruby, essaie Crystal pour voir à quoi ressemblerait un Ruby à typage statique
- Si tu aimes les langages dynamiques mais que tu veux aussi d'excellentes performances, va voir du côté de Crystal
- Si tu connais Bash ou les fichiers batch Windows, essaie PowerShell pour une approche différente, orientée objet, du scripting shell
- Si les langages de script t'intéressent en général, Ruby, Crystal et PowerShell sont tous de bons choix
- Pharo, Crystal et Ruby sont parfaits si tu veux faire de la métaprogrammation (C# commence aussi à recevoir des fonctionnalités de métaprogrammation)
- Si tu veux découvrir ce que c'est que de programmer dans un langage qui ne repose pas sur des fichiers texte, essaie Pharo et son IDE unique et puissant
- Si tu aimes créer des sites web, Ruby et son framework Ruby on Rails valent le coup d'essai
