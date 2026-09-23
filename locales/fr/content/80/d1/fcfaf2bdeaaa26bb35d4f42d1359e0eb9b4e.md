# Instructions

Cet exercice porte sur l'analyse de fichiers de logs.

À la suite d'un récent audit de sécurité, on t'a demandé de nettoyer les fichiers de logs archivés de l'organisation.

Toutes les _strings_ passées aux fonctions sont garanties non nulles et sans espaces au début ni à la fin.

## 1. Identifie les lignes de log corrompues

Tu as besoin de te faire une idée du nombre de lignes de log de ton archive qui ne respectent pas les normes actuelles.
Tu penses qu'un test simple permet de savoir si une ligne de log est valide.
Pour être considérée comme valide, une ligne doit commencer par l'une des _strings_ suivantes :

- [TRC]
- [DBG]
- [INF]
- [WRN]
- [ERR]
- [FTL]

Implémente la fonction `IsValidLine` pour qu'elle renvoie `false` si une _string_ n'est pas valide, et `true` sinon.

```go
IsValidLine("[ERR] A good error here")
// => true
IsValidLine("Any old [ERR] text")
// => false
IsValidLine("[BOB] Any old text")
// => false
```

## 2. Découpe la ligne de log

Une nouvelle équipe a rejoint l'organisation, et tu découvres que ses fichiers de logs utilisent un séparateur étrange pour les « champs ».
Au lieu de quelque chose de raisonnable comme le deux-points « : », ils utilisent une _string_ telle que « <---> » ou « <=> » (parce que c'est plus joli), en fait n'importe quelle _string_ dont le premier caractère est « < », dont le dernier caractère est « > » et qui contient, entre les deux, n'importe quelle combinaison des caractères « ~ », « \* », « = » et « - ».

Implémente la fonction `SplitLogLine` qui prend une ligne et renvoie un tableau de chaînes de caractères contenant chacune un champ.

```go
SplitLogLine("section 1<*>section 2<~~~>section 3")
// => []string{"section 1", "section 2", "section 3"},
```

## 3. Compte le nombre de lignes contenant `password` dans du texte entre guillemets

L'équipe a besoin de connaître les références aux mots de passe dans le texte entre guillemets afin qu'elles puissent être examinées manuellement.

Implémente la fonction `CountQuotedPasswords` pour donner une idée de l'ampleur probable du travail manuel.

Identifie les lignes de log où la _string_ « password », qui peut être écrite dans n'importe quelle combinaison de majuscules et de minuscules, est entourée de guillemets.
Tu dois tenir compte de la possibilité qu'il y ait du contenu supplémentaire entre les guillemets, avant et après « password ».
Chaque ligne contient au plus deux guillemets.

Les lignes passées à la routine peuvent être valides ou non au sens de la tâche 1.
On les traite de la même façon, qu'elles soient valides ou non.

```go
lines := []string{
    `[INF] passWord`, // contains 'password' but not surrounded by quotation marks
    `"passWord"`,  // count this one
    `[INF] User saw error message "Unexpected Error" on page load.`, // does not contain 'password'
    `[INF] The message "Please reset your password" was ignored by the user`, // count this one
}
// => 2
```

## 4. Supprime les artefacts des logs

Tu as découvert qu'un traitement des logs en amont sème un peu partout le texte « end-of-line » suivi d'un numéro de ligne (sans espace entre les deux).

Implémente la fonction `RemoveEndOfLineText` qui prend une _string_, en supprime le texte de fin de ligne et renvoie une _string_ « propre ».

Les lignes qui ne contiennent pas de texte de fin de ligne doivent être renvoyées sans modification.

Supprime uniquement la _string_ de fin de ligne.
N'essaie pas d'ajuster les espaces.

```go
RemoveEndOfLineText("[INF] end-of-line23033 Network Failure end-of-line27")
// => "[INF]  Network Failure "
```

## 5. Étiquette les lignes avec les noms d'utilisateur

Tu as remarqué que certaines lignes de log contiennent des phrases qui font référence à des utilisateurs.
Ces phrases contiennent toujours la _string_ `"User"`, suivie d'un ou plusieurs espaces, puis d'un nom d'utilisateur.
Tu décides d'étiqueter ces lignes.

Implémente une fonction `TagWithUserName` qui traite les lignes de log :

- Les lignes qui ne contiennent pas la _string_ `"User "` restent inchangées.
- Pour les lignes qui contiennent la _string_ `"User "`, préfixe la ligne par `[USR]` suivi du nom d'utilisateur.

Par exemple :

```go
result := TagWithUserName([]string{
    "[WRN] User James123 has exceeded storage space.",
	"[WRN] Host down. User   Michelle4 lost connection.",
	"[INF] Users can login again after 23:00.",
	"[DBG] We need to check that user names are at least 6 chars long.",
})
// => []string {
//  "[USR] James123 [WRN] User James123 has exceeded storage space.",
//  "[USR] Michelle4 [WRN] Host down. User   Michelle4 lost connection.",
//  "[INF] Users can login again after 23:00.",
//  "[DBG] We need to check that user names are at least 6 chars long."
// }
```

Tu peux supposer que :

- Les noms d'utilisateur sont suivis d'au moins un espace dans le log.
- La _string_ `"User "` apparaît au plus une fois par ligne.
- Les noms d'utilisateur sont des _strings_ non vides qui ne contiennent pas d'espace.
