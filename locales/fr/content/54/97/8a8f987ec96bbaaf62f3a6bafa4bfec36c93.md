# Introduction

Les dictionnaires de Cairo permettent de stocker et de récupérer des paires clé-valeur, comme les tables de hachage ou les dictionnaires d'autres langages.
Cependant, le modèle de mémoire particulier de Cairo et son rôle dans la génération de preuves de calcul font que ces structures fonctionnent de manière très différente en interne : elles proposent des opérations de complexité $O(n)$ et une validation automatique grâce à un processus appelé « squashing ».
Pour écrire des programmes Cairo efficaces, il est essentiel de comprendre en quoi les dictionnaires de Cairo diffèrent de leurs équivalents dans d'autres langages.
