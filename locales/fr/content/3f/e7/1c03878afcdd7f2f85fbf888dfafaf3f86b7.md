# À propos de Wren

Wren est un petit langage de script concurrent et orienté classes, rapide. Imagine Smalltalk dans un paquet de la taille de Lua, avec une pointe d'Erlang, le tout enveloppé dans une syntaxe familière et moderne.

- **Petit.** La VM fait moins de 4 000 points-virgules de C lisible et commenté avec amour.

- **Rapide.** Un compilateur intelligent à passe unique produit un bytecode compact et efficace.

- **Orienté classes.** Les classes et les objets sont au premier plan.

- **Concurrent.** Des fibres légères sont intégrées au langage.

- **Script.** Embarquable, sans dépendances, une petite bibliothèque standard et une API C facile à utiliser.


### La VM

Le cœur de Wren, c'est la VM. La machine virtuelle Wren est le cœur du langage et exécute tout le code source Wren. Ce n'est qu'une bibliothèque, pas une application autonome. Elle est conçue pour être embarquée dans une application hôte plus vaste.

On trouve Wren embarqué dans des projets tels que :

* [TIC-80](https://tic80.com) - un ordinateur imaginaire pour créer, jouer et partager de minuscules jeux (similaire à PICO8).
* [DOME](https://domeengine.com) - un framework multiplateforme pour créer des jeux.
* [luxe](https://luxeengine.com) - un moteur de jeu multiplateforme orienté développement rapide.
* [Wren Console][wren-console] - un REPL et une CLI Wren, écrits en grande partie en Wren lui-même.

Tu peux même embarquer Wren dans tes propres projets. Pour les besoins d'Exercism, l'application hôte que nous allons utiliser est [Wren Console][wren-console], ce qui nous permet d'exécuter et de tester nos scripts Wren depuis le terminal.


### Pourquoi Wren ?

Wren a été créé à l'origine par [Bob Nystrom](http://journal.stuffwithstuff.com), connu pour [Crafting Interpreters](http://craftinginterpreters.com). Il a plus d'un langage à son actif, mais il explique précisément ce qui a conduit à la création de Wren :

> Il existe quelques langages de script utilisés pour l'intégration dans des applications. Lua est le principal. TCL l'était autrefois. Il y a aussi Guile, de plus en plus JavaScript, et certaines applications intègrent Python. Je suis un ancien développeur de jeux, donc quand je pense « scripting », j'ai tendance à penser « game scripting ».

> Lua est sympa : il est petit, simple et rapide. Mais (et ce n'est pas une critique) il est aussi bizarre quand on a l'habitude de langages comme C++ et Java. La syntaxe est différente. La sémantique, en particulier le modèle objet, est inhabituelle. Tout le monde peut s'habituer à l'indexation à partir de 1, mais des choses comme les métatables montrent bien que les objets ont été greffés sur Lua après coup.

> Je pense qu'il y a de la place pour un langage aussi simple que Lua, mais qui paraisse naturel à quelqu'un qui a un bagage en POO. Wren est ma tentative en ce sens.

### Essaie-le

Tu peux [l'essayer rapidement][try-it] directement dans ton navigateur web (sans rien installer). Si tu veux expérimenter Wren dans une interface soignée, jette un œil à [Wren Playground][wren-playground].

[wren]: https://wren.io
[wren-console]: https://github.com/joshgoebel/wren-console
[wren-playground]: https://github.com/ninjascl/wren-playground
[try-it]: https://wren.io/try/
