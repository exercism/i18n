# À propos

Coq est à la fois un langage de programmation et un système logique, fondé sur la [correspondance de Curry-Howard](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence).
Pour qu'un système logique ait un sens, le langage est conçu de telle sorte que tout programme écrit en Coq est garanti de se terminer.
C'est pourquoi Coq est rarement utilisé à des fins générales ; il permet plutôt de développer des *théories mathématiques* et d'écrire des *programmes certifiés*.

Coq est aussi un assistant de preuve interactif.
Il ne résout pas les théorèmes automatiquement, mais aide l'utilisateur à construire des preuves au moyen de tactiques.
Le langage de tactiques (Ltac) est un langage à part entière, qui permet d'automatiser certaines parties des preuves.
Un script de preuve bien écrit ressemble à une preuve informelle rédigée en prose.

Les principaux domaines d'application et de recherche qui utilisent Coq incluent :

* Les mathématiques (théorie des nombres, théorie des ensembles, théorie de la logique, théorie de la calculabilité, algèbre, géométrie, ...)
* Les langages de programmation (compilateurs, modèles d'exécution, optimisations de compilateur, système de types, ...)
* Les algorithmes certifiés (correction et terminaison des algorithmes) et leur extraction vers un langage d'usage général (généralement OCaml ou Haskell)

Parmi les développements notables en Coq, on peut citer :

* La preuve vérifiée par ordinateur du [théorème des quatre couleurs](https://madiot.fr/coq100/#32)
* [CompCert](http://compcert.inria.fr/compcert-C.html), un compilateur C certifié

Si Coq t'intéresse mais que tu ne l'as pas encore appris, il est souvent conseillé de commencer par la série [Software Foundations](https://softwarefoundations.cis.upenn.edu/).
Les premiers chapitres en particulier (jusqu'à « IndProp ») te donneront les bases dont tu as besoin avant de pouvoir t'attaquer à des concepts et à des théories plus intéressants.
Tu trouveras peut-être aussi d'[autres ressources](https://coq.inria.fr/documentation) intéressantes.

Les discussions sur Coq et sur les développements qui l'utilisent se tiennent généralement sur [Reddit /r/coq](https://www.reddit.com/r/Coq/) et [Discourse](https://coq.discourse.group/latest).
Si tu as des questions, tu peux aussi demander de l'aide sur [StackOverflow](https://stackoverflow.com/questions/tagged/coq?sort=newest&pageSize=50) ; n'oublie pas d'étiqueter ta question avec « coq ».