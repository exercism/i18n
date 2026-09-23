# Ruée vers les écrans

Tu travailles dans une entreprise de logiciels appelée ABC Corp, qui emploie 97 personnes. Or, le nouvel espace de bureaux fraîchement loué ne compte que 65 postes de travail. Tous les employés veulent travailler dans le nouveau bureau, car chaque poste est équipé d'écrans dernier cri. Le service RH est débordé par ces demandes et a mis au point, avec l'aide de son équipe d'opérations numériques, un système d'attribution des postes.

Chaque poste de travail s'est vu attribuer un numéro, de 1 à 65. Les employés qui souhaitent travailler dans le nouveau bureau doivent envoyer leur demande d'attribution avant 7 h 30, chaque jour ouvré. Chaque employé ne peut envoyer qu'une seule demande, et chaque demande ne peut porter que sur un seul numéro de poste.

## Énoncé du problème

Pour chaque demande d'attribution, le service RH applique les règles suivantes :

- Si le poste demandé est disponible, il est attribué au demandeur.
- Si le poste demandé est déjà attribué, la demande est rejetée.

Tu fais partie de l'équipe d'opérations numériques et tu es chargé d'automatiser ce processus d'attribution. L'entrée est un `int[]` request contenant toutes les demandes envoyées par les employés avant 7 h 30. Chaque élément du tableau représente un numéro de poste. Ta tâche consiste à renvoyer un `int[]` contenant les numéros des postes attribués. Trie ensuite ces numéros par ordre croissant.

## Contraintes

- 0 <= taille du tableau d'entrée <= 97
- Chaque élément du tableau d'entrée sera compris entre 1 et 65, inclus

## Exemple 1

- Entrée : `65 1 56`
- Sortie : `1 56 65`

## Exemple 2

- Entrée : `5 6 18 56 18 8 1`
- Sortie : `1 5 6 8 18 56`
- Explication : il y a deux demandes pour le poste numéro 18
