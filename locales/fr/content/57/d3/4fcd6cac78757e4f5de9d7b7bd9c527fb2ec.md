# Choisis une solution à mentorer

[video:vimeo/595885125]()

La première décision que tu dois prendre en tant que mentor est de choisir quelle solution mentorer.

## Travailler avec la file d'attente

Tu trouveras la liste de toutes les solutions soumises au mentorat dans la [file d'attente de mentorat](/mentoring/queue).
L'interface devrait ressembler à ceci :

![File d'attente de mentorat](https://exercism-static.s3.eu-west-1.amazonaws.com/docs/mentor_queue.png)

En haut du panneau de la file d'attente, tu trouveras un champ de texte qui te permet de filtrer par nom d'apprenant.
À droite de celui-ci, tu peux trier les demandes par ordre chronologique croissant, par ordre chronologique décroissant, par nom d'apprenant ou par nom d'exercice.
Sur le côté droit de l'interface, tu peux filtrer par langage ou par nom d'exercice.
Tu peux aussi choisir de n'afficher que les exercices que tu as toi-même terminés, ce qui est souvent judicieux, car il t'est plus difficile de donner un bon retour si tu ne t'es pas frotté toi-même à la résolution de l'exercice.
La liste des exercices qui ont des demandes de mentorat en attente peut servir à filtrer davantage la liste des demandes.
Pour cela, sélectionne le nom de l'exercice (visible dans la partie en bas à droite de la capture d'écran ci-dessus).

Le tableau principal affiche l'exercice, l'apprenant et la date à laquelle il a demandé un mentorat.
Survoler une ligne te donne plus de détails sur l'apprenant.
Tu peux y voir son nom, sa localisation et sa réputation (un indicateur permettant de savoir s'il est lui-même contributeur ou mentor), ainsi que le nombre de fois où il a déjà été mentoré.
Tu verras aussi une courte présentation qu'il a écrite pour expliquer ce qu'il espère tirer de ce parcours.
Au fur et à mesure que tu mentores des personnes, tu verras également si tu les as déjà mentorées et si tu les as ajoutées à tes favoris.

La présentation de l'infobulle est un premier indicateur pour savoir si cet apprenant te convient.
Ton expertise correspond-elle à ses lacunes ?
S'il dit vouloir progresser en programmation fonctionnelle, peux-tu l'y aider ?
S'il débute dans le langage et cherche à apprendre les bases, alors si tu as **la moindre** expérience réelle, tu pourras probablement l'aider ; en revanche, s'il programme dans ce langage depuis des années et vise un niveau expert, il te faudra toi-même une très bonne maîtrise du langage.

Une fois que tu as trouvé une solution qui semble te convenir pour le mentorat, on peut passer à l'étape suivante et regarder le code.
Clique donc sur cette solution pour accéder à l'interface de discussion de mentorat !

## L'interface de discussion de mentorat

À ce stade, tu regardes la solution de quelqu'un, mais tu ne t'es pas encore engagé à la mentorer.
Tu as d'abord la possibilité de lire son code et d'obtenir d'autres informations avant de commencer.

**Si tu découvres cette interface, elle peut sembler un peu intimidante tant il y a d'informations, mais pas de panique : tu t'y habitueras vite.**

### Le code de l'apprenant

Sur le côté gauche de l'écran, tu verras le code de l'apprenant.
L'interface ressemblera à peu près à ceci :

<img src="https://raw.githubusercontent.com/exercism/docs/main/.imgs/mentor-discussion-area.png" height="100">

1. La majeure partie du côté gauche contient le code de l'apprenant.
   Par défaut, tu vois son itération la plus récente.
   S'il a soumis plusieurs itérations, tu peux passer de l'une à l'autre à l'aide des nombres entourés d'un cercle en bas à gauche, ou des boutons `Previous` et `Next` situés en bas à droite de ce panneau.
   S'il n'a soumis qu'une seule itération, ces icônes n'apparaissent pas.

2. En haut du code de l'apprenant, tu peux utiliser les onglets pour passer du code de l'apprenant aux instructions ou aux tests.
   C'est utile pour te rappeler ce qui a été demandé à l'apprenant dans cet exercice.

3. Tu verras aussi un indicateur indiquant si les tests ont été réussis ou échoués (situé en haut à droite de ce panneau de gauche), ainsi que des boutons pour télécharger le code de l'apprenant ou le copier dans ton presse-papiers.
   En cas d'échec, cliquer sur cet indicateur ouvre une fenêtre modale qui affiche le détail de l'exécution des tests, pour que tu puisses voir ce qui n'allait pas.

Le côté droit de l'écran contient un panneau dédié à l'interaction de mentorat. En haut de ce panneau, tu verras trois onglets.
L'onglet « **Discussion** » contient les informations sur l'utilisateur (nom d'utilisateur, nom, réputation, présentation personnelle).
En dessous se trouve un commentaire dans lequel l'utilisateur explique ce qu'il souhaite apprendre de cette solution en particulier.
(Sur certaines solutions plus anciennes, ce commentaire peut être absent).
C'est un indicateur essentiel pour savoir si cette solution te convient.
Peux-tu répondre à sa question ?
Peux-tu répondre à ses attentes pour cet exercice ?

Le deuxième onglet est ton « **Bloc-notes** ».
Tu peux y écrire du code, pour pouvoir t'y référer dans ton commentaire.
Cela aide à repérer le code qui compte lors de la revue de cet exercice.
Tes explications n'en seront que plus simples et plus claires.
Les notes que tu y écris restent privées, et tu les retrouveras chaque fois que tu mentores la solution de l'exercice en question.

Le troisième onglet s'appelle « **Conseils** ».
Si tu cliques dessus, tu verras des informations qui pourraient t'être utiles :

- **La solution exemplaire** Essaie de guider l'apprenant vers cette solution.
  C'est le meilleur point auquel il peut arriver à ce stade du parcours.
  Il se peut que ton approche soit très différente de la solution exemplaire.
  Cela vient peut-être du fait que tu maîtrises des techniques plus avancées que l'apprenant.
  Garde à l'esprit que tu ne peux pas t'attendre à ce que l'apprenant connaisse d'autres concepts que ceux qu'il a appris en suivant le parcours d'apprentissage jusqu'à l'exercice sur lequel il travaille.
   Tiens compte de ce fait dans ton retour et évite de submerger ton apprenant avec des connaissances pour lesquelles il n'est pas encore prêt.
- **Notes de mentorat :** Ce sont des notes rédigées par la communauté, qui aident les autres mentors à trouver la meilleure façon de mentorer un exercice.
  Nous serions ravis que tu apportes ton expérience à ces notes.
- **Retour automatisé :** C'est un retour que nos analyseurs ont jugé utile de te suggérer pour un apprenant.
  Nous en reparlerons plus tard.
- **Ta solution :** Un lien vers ta propre solution, que tu peux utiliser comme référence pour la façon dont tu as résolu l'exercice.

## Commence à mentorer

Si tu as lu le code, consulté les conseils et que tu te sens utile, il est temps de te lancer !
Clique sur le bouton _« Commencer à mentorer »_ et tu seras invité à écrire ton retour.

Lis maintenant [Comment donner un bon retour](/docs/mentoring/how-to-give-great-feedback) !
