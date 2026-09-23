# Mise à niveau

De temps en temps, il se peut que nous ayons besoin que tu mettes quelque chose à jour.

## L'image Pharo

Si tu as besoin de mettre à jour les bibliothèques de ton image Pharo Exercism, le mieux est de commencer par t'assurer que tu as soumis tous les exercices en cours, sauvegardé ton image, puis fait une copie de sauvegarde des fichiers Pharo.image et Pharo.changes. Une fois que tu disposes d'une sauvegarde sûre, évalue (sélectionne le code, puis appuie sur meta-g) tout le code suivant dans un Playground :

 ```smalltalk

 './pharo-local/iceberg/exercism' asFileReference deleteAll.
 './pharo-local/package-cache' asFileReference deleteAll.

 IceRepository reset.

 Metacello new
  baseline: 'Exercism';
  repository: 'github://exercism/pharo-smalltalk:main/releases/latest';
  onConflict: [ :ex | ex allow ];
  load.

 #ExercismManager asClass upgrade.
 ```

Une boîte de dialogue peut t'avertir que tu risques de perdre les modifications apportées au paquet « ExercismTools » ; tu dois alors choisir « Load » pour t'assurer de disposer d'une version compatible des outils.

S'il t'arrive un jour de devoir passer à une version spécifique d'Exercism (ou de revenir à une version antérieure), tu peux aussi modifier le script ci-dessus pour préciser un numéro de version particulier en changeant le chemin du dépôt comme suit :

```smalltalk
 ...
  repository: 'github://exercism/pharo-smalltalk:<version-tag>';
 ...
 ```

Où `<versison-tag>` peut être quelque chose comme `v0.2.3` ou `master`.

Une fois que tu as chargé une version spécifique, il se peut aussi que tu doives « récupérer à nouveau » les exercices existants sur lesquels tu veux continuer à travailler, en passant par l'élément de menu habituel `Exercism | Fetch...`.

Dans de rares cas (et si tu continues à rencontrer des problèmes), il se peut que tu doives te procurer un nouveau fichier Pharo.image (le plus simple est de réinstaller Pharo dans un répertoire vide en suivant les instructions d'installation habituelles en haut de cette page).

## Les exercices Pharo

Il peut aussi t'arriver de constater qu'un exercice a été mis à jour pour ajouter de nouveaux tests ou refléter de nouvelles idées, alors que tu l'as déjà résolu.

Dans ce cas, tu peux choisir de mettre à jour ta copie de l'exercice vers la dernière version, ce qui signifie que tu devras peut-être adapter ta solution pour que les tests passent, puis soumettre ton nouveau code pour une nouvelle revue.

Pour cela, utilise le menu `Exercism | View Track Progress`, qui ouvrira un navigateur web sur la progression actuelle de ton parcours. Dans l'onglet `Test suite`, en bas de la page, se trouve un bouton `Update exercise to latest version` si une version plus récente de l'exercice a été détectée.

Si tu cliques sur ce bouton, puis sur le bouton `Copy` (dans la zone _Download your solution_), tu peux alors coller cette valeur dans l'invite du menu `Exercism | Fetch new exercise`.

_REMARQUE : à partir de la version 0.2.8, le format des paquets d'exercices de Pharo Exercism a été modifié, de sorte que les exercices apparaissent dans un paquet de premier niveau nommé Exercise@<Name> (au lieu d'un paquet tag appelé Exercism-<Name>). Si tu mets ton image à jour et que tu as d'anciens exercices dans ce précédent format de nommage, tu peux toujours les soumettre, mais si tu mets aussi à jour le test de l'exercice, tu devras déplacer les classes de ta solution vers le nouveau paquet Exercise@<Name>, où le nouveau test a été enregistré._
