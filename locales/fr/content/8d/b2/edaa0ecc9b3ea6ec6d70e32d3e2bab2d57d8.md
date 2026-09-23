**Important : ces informations sont désormais obsolètes. Consulte notre [nouvel article de blog](https://exercism.org/blog/contribution-guidelines-nov-2023) pour obtenir les détails à jour.**

---

_En bref : nous allons passer quelques mois à repenser notre modèle de bénévolat et à offrir une pause à nos bénévoles clés, loin du travail de relecture des contributions de la communauté.
Si tu utilises Exercism uniquement pour apprendre ou pour mentorer, tu n'as rien besoin de savoir ici (mais lis quand même si ça t'intéresse !).
Si tu es mainteneur d'un parcours, si tu souhaites contribuer à Exercism ou signaler un bug ou un problème, alors considère cette lecture comme essentielle 🙂_

---

Ces six derniers mois, nous avons passé beaucoup de temps à explorer l'avenir d'Exercism, à imaginer à quoi ressemblerait chaque parcours de langage s'il était aussi bon que possible.
Nous sommes incroyablement fiers de ce que nous avons construit jusqu'ici.
Les 85 000 témoignages déposés témoignent du travail remarquable que notre communauté a accompli en construisant nos parcours et, à travers eux, en mentorant autant d'apprenants.
Plus important encore, nous sommes convaincus que nous ne faisons qu'effleurer ce qui est possible.
Nous avons de grandes idées, de grands espoirs et beaucoup d'enthousiasme pour tout ce qu'Exercism peut devenir.
Mais pour y parvenir, nous devons d'abord résoudre quelques problèmes fondamentaux qui persistent sous la surface.

Le principal est la nécessité de relever le défi de faire grandir notre communauté de bénévoles de manière saine et durable.
Exercism s'est construit sur les épaules de centaines de bénévoles dévoués, mais une grande partie d'entre eux se sentent aujourd'hui épuisés, et beaucoup sont partis pour cette raison.
Les raisons sont multiples : certaines sont directement liées à Exercism, d'autres tiennent aux pressions du quotidien, et d'autres encore au contexte de tout ce qui se passe dans le monde en ce moment.
Mais il est devenu très clair pour nous que nous devons concevoir et développer une meilleure façon de construire notre plateforme ensemble.

Historiquement, nous avons essayé de construire Exercism selon un modèle de logiciel open source (OSS, pour _Open Source Software_), où des mainteneurs relisent les contributions de la communauté au sens large.
Cela nous a posé beaucoup de problèmes et a créé de la frustration, tant chez les mainteneurs que chez les contributeurs.
J'entre dans le détail plus bas si tu veux des précisions, mais en bref, nos bénévoles clés passent désormais leur temps à agir en gardiens réactifs plutôt qu'en créateurs innovants.
C'est bien moins amusant pour eux, et cela veut dire qu'Exercism perd la magie que ces personnes apportaient auparavant à la plateforme.

Il y a deux choses que nous devons faire pour régler ça :
1. Nous devons concevoir un nouveau système de bénévolat qui convienne à Exercism mieux que le modèle OSS traditionnel.
  Nous avons déjà dépensé pas mal d'énergie à essayer, sans succès.
  Nous allons donc prendre du temps pour travailler avec nos bénévoles afin de concevoir cela correctement dans les mois à venir.
2. Nous allons dans une large mesure mettre en pause les contributions de la communauté au sens large pendant les prochains mois, pour laisser nos bénévoles clés se concentrer sur la construction et le développement des parcours comme ils l'entendent (ou prendre un congé sabbatique s'ils ont simplement envie de souffler !).

Mon espoir, c'est qu'en prenant du recul et en concevant vraiment bien les choses, tout en menant une collecte de fonds pour élargir notre équipe éducative, nous puissions faire d'Exercism un endroit formidable où être bénévole, et aider à garantir son avenir.
Dans l'intervalle, ces changements devraient permettre aux parcours de s'améliorer et de se développer plus qu'ils n'ont pu le faire cette dernière année, et à nos mainteneurs de cesser de s'épuiser pour se sentir au contraire plus heureux, plus énergiques et plus connectés grâce à leur travail sur Exercism.

## Changements concrets

Nous mettons en place trois changements concrets.

### Utilise le forum, pas les issues GitHub

Nous allons libérer entièrement GitHub pour que nos mainteneurs puissent travailler sur les issues qu'ils ont envie de traiter.
Nous allons fermer un grand nombre d'issues que nous avions créées pour que la communauté travaille dessus (et y ajouter une étiquette afin de pouvoir facilement les rouvrir à l'avenir si nous le souhaitons), tout en n'acceptant plus de nouvelles issues ni de PR non sollicitées dans la majorité des dépôts.
Si tu veux discuter de quelque chose ou le signaler, utilise plutôt le [forum](https://forum.exercism.org).
Si tu ouvres une issue ou une PR non sollicitée, elle sera automatiquement fermée et on te redirigera vers le forum.

### Mets en pause les contributions de la communauté au sens large

Les parcours seront répartis en trois catégories :
- La majorité des parcours ayant des mainteneurs actifs verront les contributions de la communauté mises en pause, pour permettre aux mainteneurs d'être autonomes ou de souffler.
  (Les mainteneurs de ces parcours peuvent demander la suppression de l'obligation d'une relecture.
  Pour cela, contacte Erik sur Slack)
- Certains parcours, dont les mainteneurs actifs souhaitent vraiment continuer à accepter les contributions de la communauté, resteront ouverts (si tu es mainteneur et que tu préfères ce mode au (1), contacte Jonathan Middleton sur Slack pour en discuter).
- Pour les parcours sans mainteneur actif, le développement des parcours sera essentiellement mis en pause pendant cette période.

Dans tous les cas, Erik et moi continuerons à vérifier les PR à destination des dépôts d'outillage avant de les fusionner.

La seule exception : nous continuerons à accepter les PR pour les approches et les articles, et nous mettrons en place, à l'échelle de l'organisation, une politique de fusion optimiste visant à constituer un socle d'approches dans tout Exercism et à permettre des améliorations progressives, selon les règles suivantes :
1. Si le code résout l'exercice et qu'il est idiomatique sur le plan syntaxique et sémantique (autrement dit, s'il ressemble à du code $LANG), il doit être fusionné.
  Sinon, c'est à l'auteur de la PR de le corriger.
2. Si un mainteneur souhaite modifier le contenu (par exemple pour améliorer les conseils, ajuster des détails, mettre en avant de meilleures approches, des alternatives ou des approches plus idiomatiques), cela doit se faire dans une PR de suivi.

### Conçois un nouveau système de bénévolat

Nous allons constituer un Community Board pour co-concevoir un cadre de bénévolat durable et sain pour la suite, qui libère le potentiel d'Exercism.
Si tu crois en l'avenir d'Exercism et que tu veux participer à ce processus, contacte [Jonathan](mailto:jonathan@exercism.org).

Nous allons appliquer ces mesures pendant les prochains mois.
Nous réfléchirons à tout cela tout au long de la période, et prévoyons de prendre de nouvelles décisions d'ici juin 2023.
Si tu as des idées, lance un sujet sur le [forum](https://forum.exercism.org) !

## Post-scriptum : pourquoi notre modèle OSS est cassé

Notre modèle historique s'est construit autour du modèle OSS.
Il reposait sur des bénévoles qui rejoignaient Exercism, faisaient un excellent travail de construction des parcours, puis recevaient des privilèges de mainteneur leur permettant d'accepter les contributions de notre base d'utilisateurs au sens large pour les améliorer.

Même si tout cela semble formidable sur le papier, cela pose quelques problèmes importants.
Le principal, c'est que les personnes qui apportent le plus de magie à Exercism finissent par ne plus avoir de temps pour coder ou créer Exercism, parce que leur temps passe à répondre aux contributions de la communauté.
Ce n'est presque jamais pour cela que les mainteneurs se sont impliqués dans Exercism au départ, et ce n'est pas un travail qu'ils apprécient.
C'est un peu comme quelqu'un qui adore développer et qui se retrouve « promu » chef d'équipe, à gérer des personnes au lieu de coder.
Sur le moment, cela peut ressembler à une belle promotion, mais bien souvent, les gens prennent moitié moins de plaisir à être managers qu'à coder.

Cela repose aussi sur l'hypothèse que la somme des contributions de la communauté au sens large est supérieure à la contribution individuelle qu'un mainteneur donné pourrait apporter autrement.
Mais dans Exercism, ce n'est presque jamais le cas.
Exercism est complexe et l'enseignement est difficile ; ensemble, ils font de la contribution à Exercism une chose complexe et difficile à construire.
Il y a énormément à apprendre et à comprendre, à la fois sur le fonctionnement technique d'Exercism et sur son approche pédagogique, ce qui fait que la plupart des premières contributions sont des gens qui cherchent leurs marques.
Cela veut dire que leurs premières contributions sont relativement modestes, mais aussi qu'elles demandent presque toujours beaucoup de travail de relecture et d'ajustement.
C'est un travail chronophage pour les mainteneurs.
En fait, le temps total passé à relire (sans compter le changement de contexte nécessaire) fait que le mainteneur fournit généralement plus d'efforts pour relire la PR que s'il l'avait simplement écrite lui-même.
Il y a bien sûr quelques exceptions, mais c'est vrai dans 99 % des cas.
Et c'est souvent encore plus pénible pour le mainteneur, car le problème résolu par la PR n'était pas près du sommet de sa liste de priorités, ce qui fait que les choses qu'il sait réellement essentielles ne sont pas faites.

Enfin, le modèle OSS repose sur l'idée que les contributeurs commencent petit à petit, puis finissent par devenir suffisamment compétents et réguliers pour devenir mainteneurs.
Dans les projets OSS comme les bibliothèques logicielles, cela fonctionne plutôt bien (par exemple, quelqu'un utilise une bibliothèque en production et n'arrête pas d'y apporter des améliorations, jusqu'à finir par en connaître autant que le créateur d'origine).
Mais pour Exercism, cela ne s'est tout simplement pas produit.
Malgré la fusion de PR provenant de milliers de contributeurs ces douze derniers mois, seule une toute petite poignée a continué à contribuer régulièrement, et encore moins sont devenus mainteneurs.
Cela tient là encore surtout à la complexité d'Exercism, mais aussi au fait qu'il ne s'agit pas d'un logiciel isolé, où ce modèle fonctionne traditionnellement.

Tout cela est extrêmement démoralisant pour les mainteneurs et préjudiciable à Exercism.

Les parcours se sont enlisés et nos bénévoles clés, qui avaient la passion de construire, ont en grande partie perdu cette passion quand leur travail est devenu celui de relire le travail des autres, de négocier entre des priorités concurrentes et de répondre à des demandes imprévues.
Pendant la construction de la v3, les mainteneurs pouvaient travailler avec une relative autonomie, car leur travail se faisait en grande partie dans l'ombre, ce qui a entraîné une énorme productivité et fait que la majorité des gens prenaient vraiment plaisir à contribuer.
Depuis le lancement de la v3, malgré de nombreux bénévoles consacrant tout autant de temps à Exercism, la période a été bien moins agréable et bien moins productive, en grande partie à cause de l'énergie investie à répondre aux contributions ou aux issues des autres.
Nos bénévoles passent désormais leur temps à agir en gardiens réactifs plutôt qu'en créateurs innovants, et c'est bien moins amusant.

Voilà les défis que nous devons résoudre, et ce ne sont pas des défis faciles.
Nous devons trouver un moyen pour que les personnes qui veulent consacrer des centaines d'heures à construire les parcours de langage d'Exercism puissent le faire, et avec plaisir.
Nous devons trouver un moyen pour que les corrections de bugs et les petites contributions entrent dans notre base de code sans mobiliser l'attention de ces bénévoles clés.
Et nous devons trouver un moyen d'attirer de nouveaux bénévoles vers Exercism, et de les accompagner s'ils choisissent de s'engager dans des contributions régulières.
Nous devons réduire le rôle de gardien en général, tout en respectant le fait que ceux qui ont tant investi dans les parcours ont des opinions fortes et très réfléchies.
Nous devons faire en sorte qu'il soit agréable de gérer et d'animer tout ce dispositif de bénévolat.
Et nous devons aussi résoudre tout un tas d'autres choses.
Cela prendra du temps et représentera un défi, mais quand nous y arriverons, ce sera formidable.
